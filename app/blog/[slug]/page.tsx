import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/layout/HeaderServer";
import Footer from "@/components/layout/Footer";
import AIChatWidget from "@/components/ai/AIChatWidget";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import CookieConsent from "@/components/ui/CookieConsent";
import { Calendar, ArrowRight, MessageCircle } from "lucide-react";
import { getBlogPostBySlug } from "@/lib/supabase-client";
import { buildPageMeta, SITE_URL, SITE_NAME, DEFAULT_OG_IMAGE } from "@/lib/metadata";
import MarkdownIt from "markdown-it";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;

  // Skip metadata generation during build if API key not available
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return { title: "جاري التحميل" };
  }

  const post = await getBlogPostBySlug(slug);
  if (!post) return { title: "مقال غير موجود" };

  return buildPageMeta({
    title: post.title,
    description: post.excerpt || post.content.slice(0, 160),
    path: `/blog/${slug}`,
    ogImage: post.coverImage,
    type: "article",
    publishedTime: post.publishedAt ? new Date(post.publishedAt).toISOString() : new Date(post.createdAt).toISOString(),
    modifiedTime: new Date(post.updatedAt).toISOString(),
  });
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  // Skip fetching during build if API key not available
  let post = null;
  if (process.env.SUPABASE_SERVICE_ROLE_KEY) {
    post = await getBlogPostBySlug(slug);
  }

  if (!post) notFound();

  // Parse markdown content
  const md = new MarkdownIt({ html: true, linkify: true, typographer: true });
  const htmlContent = md.render(post.content);
  const date = post.publishedAt ? new Date(post.publishedAt) : new Date(post.createdAt);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt || post.content.slice(0, 160),
    image: post.coverImage || DEFAULT_OG_IMAGE,
    datePublished: new Date(post.publishedAt ?? post.createdAt).toISOString(),
    dateModified: new Date(post.updatedAt).toISOString(),
    author: { "@type": "Organization", name: SITE_NAME },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.png` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/blog/${slug}` },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "الرئيسية", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "المدونة", item: `${SITE_URL}/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: `${SITE_URL}/blog/${slug}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Header />
      <main style={{ paddingTop: "72px" }}>
        {/* Hero */}
        <section className="gradient-hero" style={{ padding: "64px 24px" }}>
          <div style={{ maxWidth: "800px", margin: "0 auto" }}>
            <nav aria-label="breadcrumb" style={{ marginBottom: "16px" }}>
              <Link href="/blog" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none", fontSize: "14px", display: "inline-flex", alignItems: "center", gap: "6px" }}>
                <ArrowRight size={14} /> المدونة القانونية
              </Link>
            </nav>
            <h1 style={{ fontFamily: "'Noto Kufi Arabic', serif", fontSize: "clamp(28px,4vw,42px)", fontWeight: 900, color: "white", lineHeight: "1.4", marginBottom: "20px" }}>
              {post.title}
            </h1>
            <div style={{ display: "flex", gap: "20px", color: "rgba(255,255,255,0.6)", fontSize: "14px" }}>
              <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <Calendar size={14} />
                <time dateTime={date.toISOString()}>
                  {new Date(date).toLocaleDateString("ar-SA", { year: "numeric", month: "long", day: "numeric" })}
                </time>
              </span>
            </div>
          </div>
        </section>

        {/* Cover image */}
        {post.coverImage && (
          <div style={{ background: "white", padding: "0 24px" }}>
            <div style={{ maxWidth: "800px", margin: "0 auto" }}>
              <img
                src={post.coverImage}
                alt={post.title}
                style={{ width: "100%", maxHeight: "420px", objectFit: "cover", borderRadius: "16px", marginTop: "32px" }}
              />
            </div>
          </div>
        )}

        {/* Content */}
        <section style={{ background: "white", padding: "64px 24px" }}>
          <div style={{ maxWidth: "760px", margin: "0 auto" }}>
            <div
              style={{ fontSize: "17px", lineHeight: "1.9", color: "#1C1C1E" }}
              dangerouslySetInnerHTML={{
                __html: htmlContent.replace(/<h2/g, '<h2 style="font-family: \'Noto Kufi Arabic\', serif; font-size: 24px; font-weight: 700; color: #1A2744; margin: 32px 0 12px;"').replace(/<h3/g, '<h3 style="font-family: \'Noto Kufi Arabic\', serif; font-size: 19px; font-weight: 700; color: #1A2744; margin: 24px 0 8px;"').replace(/<p/g, '<p style="margin: 12px 0;"').replace(/<a/g, '<a style="color: #C9A84C; text-decoration: underline;"').replace(/<li/g, '<li style="margin: 6px 0; padding-right: 16px;"'),
              }}
            />

            {/* CTA */}
            <div style={{ marginTop: "48px", background: "#FAFAF8", borderRadius: "16px", padding: "32px", textAlign: "center", border: "1px solid #E5E5E0" }}>
              <h3 style={{ fontFamily: "'Noto Kufi Arabic', serif", fontSize: "22px", fontWeight: 700, color: "#1A2744", marginBottom: "12px" }}>
                هل تحتاج استشارة قانونية؟
              </h3>
              <p style={{ color: "#6B6B6B", marginBottom: "20px" }}>فريقنا جاهز لمساعدتك — الاستشارة الأولى مجانية</p>
              <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
                <Link href="/contact" className="btn-primary" style={{ fontSize: "15px" }}>احجز استشارة مجانية</Link>
                <Link href="/blog" style={{ display: "inline-flex", alignItems: "center", gap: "6px", color: "#C9A84C", fontWeight: 600, textDecoration: "none", fontSize: "15px" }}>
                  <MessageCircle size={16} /> مقالات أخرى
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <AIChatWidget />
      <WhatsAppButton />
      <CookieConsent />
    </>
  );
}
