import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/layout/HeaderServer";
import Footer from "@/components/layout/Footer";
import AIChatWidget from "@/components/ai/AIChatWidget";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import CookieConsent from "@/components/ui/CookieConsent";
import { Calendar, ArrowRight, MessageCircle, Share2, Clock, Eye, ThumbsUp } from "lucide-react";
import { getBlogPostBySlug, getAllBlogPosts } from "@/lib/supabase-client";
import { buildPageMeta, SITE_URL, SITE_NAME, DEFAULT_OG_IMAGE } from "@/lib/metadata";
import MarkdownIt from "markdown-it";
import FAQSection from "@/components/blog/FAQSection";
import { enhanceMarkdownHTML } from "@/components/blog/ContentProcessor";

// Extract FAQs from markdown content
function extractFAQs(content: string): Array<{ question: string; answer: string }> {
  const faqs: Array<{ question: string; answer: string }> = [];

  // Look for FAQ section
  const faqMatch = content.match(/الأسئلة الشائعة\s*\{#faq\}([\s\S]*?)(?=^---|$)/m);
  if (!faqMatch) return faqs;

  const faqContent = faqMatch[1];

  // Match Q&A pairs: س: question ج: answer
  const qaRegex = /س:\s*(.+?)\n\*\*ج:\*\*\s*(.+?)(?=\n\ns:|$)/gs;
  let match;

  while ((match = qaRegex.exec(faqContent)) !== null) {
    faqs.push({
      question: match[1].trim(),
      answer: match[2].trim(),
    });
  }

  return faqs;
}

export const dynamic = "force-dynamic";

// Calculate reading time
function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
}

// Extract headings from markdown for TOC
function extractHeadings(content: string): Array<{ level: number; text: string; id: string }> {
  const headings: Array<{ level: number; text: string; id: string }> = [];
  const lines = content.split("\n");

  lines.forEach((line) => {
    const match = line.match(/^(#{1,3})\s+(.+?)(?:\s*\{#([^}]+)\})?$/);
    if (match) {
      const level = match[1].length;
      const text = match[2];
      const id = match[3] || text.toLowerCase().replace(/\s+/g, "-");
      headings.push({ level, text, id });
    }
  });

  return headings;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;

  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return { title: "جاري التحميل" };
  }

  const post = await getBlogPostBySlug(slug);
  if (!post) return { title: "مقال غير موجود" };

  const readingTime = calculateReadingTime(post.content);

  return {
    ...buildPageMeta({
      title: post.title,
      description: post.excerpt || post.content.slice(0, 160),
      path: `/blog/${slug}`,
      ogImage: post.coverImage,
      type: "article",
      publishedTime: post.publishedAt ? new Date(post.publishedAt).toISOString() : new Date(post.createdAt).toISOString(),
      modifiedTime: new Date(post.updatedAt).toISOString(),
    }),
    keywords: ["محامي", "جدة", "قانون", "استشارات قانونية", post.title],
    authors: [{ name: SITE_NAME }],
    openGraph: {
      type: "article",
      publishedTime: post.publishedAt ? new Date(post.publishedAt).toISOString() : undefined,
      modifiedTime: new Date(post.updatedAt).toISOString(),
      authors: [SITE_NAME],
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  let post = null;
  if (process.env.SUPABASE_SERVICE_ROLE_KEY) {
    post = await getBlogPostBySlug(slug);
  }

  if (!post) notFound();

  const md = new MarkdownIt({ html: true, linkify: true, typographer: true });
  const date = post.publishedAt ? new Date(post.publishedAt) : new Date(post.createdAt);
  const readingTime = calculateReadingTime(post.content);
  const headings = extractHeadings(post.content);
  const faqs = extractFAQs(post.content);

  // Remove FAQ section from content before rendering
  const contentWithoutFAQ = post.content.replace(/الأسئلة الشائعة\s*\{#faq\}[\s\S]*?(?=^---|$)/m, "").trim();
  const htmlContent = md.render(contentWithoutFAQ);

  // Get related posts
  const allPosts = process.env.SUPABASE_SERVICE_ROLE_KEY ? await getAllBlogPosts() : [];
  const relatedPosts = allPosts
    .filter((p: any) => p.slug !== slug)
    .slice(0, 3);

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

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <Header />
      <main style={{ paddingTop: "72px" }}>
        {/* Hero Section */}
        <section className="gradient-hero" style={{ padding: "60px 24px", background: "linear-gradient(135deg, #1A2744 0%, #2D3E5F 100%)" }}>
          <div style={{ maxWidth: "900px", margin: "0 auto" }}>
            <nav aria-label="breadcrumb" style={{ marginBottom: "16px", display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
              <Link href="/" style={{ color: "rgba(255,255,255,0.7)", textDecoration: "none", fontSize: "13px", display: "inline-flex", alignItems: "center", gap: "4px", transition: "all 0.3s" }}>
                الرئيسية
              </Link>
              <span style={{ color: "rgba(255,255,255,0.4)" }}>/</span>
              <Link href="/blog" style={{ color: "rgba(255,255,255,0.7)", textDecoration: "none", fontSize: "13px", display: "inline-flex", alignItems: "center", gap: "4px", transition: "all 0.3s" }}>
                المدونة
              </Link>
              <span style={{ color: "rgba(255,255,255,0.4)" }}>/</span>
              <span style={{ color: "rgba(255,255,255,0.9)", fontSize: "13px" }}>{post.title.slice(0, 40)}...</span>
            </nav>

            <h1 style={{ fontFamily: "'Noto Kufi Arabic', serif", fontSize: "clamp(32px, 5vw, 48px)", fontWeight: 900, color: "white", lineHeight: "1.3", marginBottom: "24px", letterSpacing: "-0.5px" }}>
              {post.title}
            </h1>

            <p style={{ fontSize: "18px", color: "rgba(255,255,255,0.8)", lineHeight: "1.7", marginBottom: "24px", maxWidth: "700px" }}>
              {post.excerpt || post.content.slice(0, 150)}
            </p>

            {/* Meta Info */}
            <div style={{ display: "flex", gap: "24px", color: "rgba(255,255,255,0.7)", fontSize: "14px", flexWrap: "wrap" }}>
              <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <Calendar size={16} />
                {date.toLocaleDateString("ar-SA", { year: "numeric", month: "long", day: "numeric" })}
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <Clock size={16} />
                وقت القراءة: {readingTime} دقيقة
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <Eye size={16} />
                محدث: {new Date(post.updatedAt).toLocaleDateString("ar-SA")}
              </span>
            </div>
          </div>
        </section>

        {/* Cover Image */}
        {post.coverImage && (
          <div style={{ background: "white", padding: "0 24px" }}>
            <div style={{ maxWidth: "900px", margin: "0 auto" }}>
              <img
                src={post.coverImage}
                alt={post.title}
                loading="lazy"
                style={{ width: "100%", height: "420px", objectFit: "cover", borderRadius: "12px", marginTop: "-60px", boxShadow: "0 10px 40px rgba(26,39,68,0.15)", marginBottom: "40px" }}
              />
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <section style={{ background: "white", padding: "40px 24px 60px" }}>
          <div style={{ maxWidth: "900px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 300px", gap: "40px" }}>
            {/* Article Content */}
            <div>
              {/* Table of Contents */}
              {headings.length > 2 && (
                <div style={{ background: "#F9F7F4", border: "2px solid #E5E5E0", borderRadius: "12px", padding: "24px", marginBottom: "40px" }}>
                  <h2 style={{ fontFamily: "'Noto Kufi Arabic', serif", fontSize: "18px", fontWeight: 700, color: "#1A2744", marginBottom: "16px" }}>محتويات المقالة</h2>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                    {headings.map((h, i) => (
                      <li key={i} style={{ marginBottom: "8px", paddingRight: h.level > 2 ? "20px" : "0" }}>
                        <a href={`#${h.id}`} style={{ color: "#C9A84C", textDecoration: "none", fontSize: "14px", display: "block", padding: "6px 0", transition: "all 0.2s", lineHeight: "1.6" }}>
                          {h.text}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Article Content */}
              <div
                style={{ fontSize: "17px", lineHeight: "1.9", color: "#2C2C2C" }}
                dangerouslySetInnerHTML={{
                  __html: enhanceMarkdownHTML(htmlContent),
                }}
              />

              {/* FAQ Section */}
              {faqs.length > 0 && <FAQSection faqs={faqs} />}

              {/* Share Buttons */}
              <div style={{ marginTop: "48px", padding: "24px", background: "#F9F7F4", borderRadius: "12px", textAlign: "center" }}>
                <p style={{ color: "#6B6B6B", marginBottom: "16px", fontSize: "14px" }}>شارك هذه المقالة</p>
                <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
                  <button style={{ background: "#1A2744", color: "white", border: "none", padding: "10px 20px", borderRadius: "8px", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px", fontSize: "14px", fontWeight: 600 }} onClick={() => navigator.share?.({ title: post.title, url: `${SITE_URL}/blog/${slug}` })}>
                    <Share2 size={16} /> شارك
                  </button>
                  <a href={`https://wa.me/?text=${encodeURIComponent(post.title + " " + SITE_URL + "/blog/" + slug)}`} target="_blank" rel="noopener noreferrer" style={{ background: "#25D366", color: "white", padding: "10px 20px", borderRadius: "8px", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "8px", fontSize: "14px", fontWeight: 600 }}>
                    واتس آب
                  </a>
                  <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(SITE_URL + "/blog/" + slug)}`} target="_blank" rel="noopener noreferrer" style={{ background: "#1DA1F2", color: "white", padding: "10px 20px", borderRadius: "8px", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "8px", fontSize: "14px", fontWeight: 600 }}>
                    تويتر
                  </a>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div style={{ position: "sticky", top: "100px", height: "fit-content" }}>
              {/* CTA Box */}
              <div style={{ background: "linear-gradient(135deg, #C9A84C 0%, #D4B957 100%)", borderRadius: "16px", padding: "28px 24px", color: "white", marginBottom: "24px", boxShadow: "0 10px 30px rgba(201, 168, 76, 0.2)" }}>
                <h3 style={{ fontFamily: "'Noto Kufi Arabic', serif", fontSize: "20px", fontWeight: 700, marginBottom: "12px" }}>استشارة قانونية</h3>
                <p style={{ fontSize: "14px", lineHeight: "1.6", marginBottom: "16px", opacity: 0.95 }}>احصل على استشارة متخصصة من أفضل المحاميين</p>
                <Link href="/contact" style={{ display: "block", background: "white", color: "#1A2744", padding: "12px 20px", borderRadius: "8px", textAlign: "center", textDecoration: "none", fontWeight: 700, fontSize: "14px", transition: "all 0.3s" }}>
                  تواصل معنا الآن
                </Link>
              </div>

              {/* Article Stats */}
              <div style={{ background: "#F9F7F4", borderRadius: "12px", padding: "20px", marginBottom: "24px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
                  <div style={{ background: "#C9A84C", width: "40px", height: "40px", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Clock size={20} color="white" />
                  </div>
                  <div>
                    <div style={{ fontSize: "12px", color: "#6B6B6B" }}>وقت القراءة</div>
                    <div style={{ fontSize: "16px", fontWeight: 700, color: "#1A2744" }}>{readingTime} دقيقة</div>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div style={{ background: "#2D3E5F", width: "40px", height: "40px", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Eye size={20} color="white" />
                  </div>
                  <div>
                    <div style={{ fontSize: "12px", color: "#6B6B6B" }}>الفئة</div>
                    <div style={{ fontSize: "16px", fontWeight: 700, color: "#1A2744" }}>مقالة قانونية</div>
                  </div>
                </div>
              </div>

              {/* Related Posts */}
              {relatedPosts.length > 0 && (
                <div style={{ background: "#F9F7F4", borderRadius: "12px", padding: "20px" }}>
                  <h3 style={{ fontFamily: "'Noto Kufi Arabic', serif", fontSize: "18px", fontWeight: 700, color: "#1A2744", marginBottom: "16px" }}>مقالات ذات صلة</h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    {relatedPosts.map((p: any) => (
                      <Link key={p.slug} href={`/blog/${p.slug}`} style={{ display: "block", padding: "12px", background: "white", borderRadius: "8px", textDecoration: "none", fontSize: "13px", color: "#1A2744", fontWeight: 500, border: "1px solid #E5E5E0", transition: "all 0.3s", lineHeight: "1.6" }}>
                        {p.title}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section style={{ background: "linear-gradient(135deg, #1A2744 0%, #2D3E5F 100%)", padding: "60px 24px" }}>
          <div style={{ maxWidth: "700px", margin: "0 auto", textAlign: "center", color: "white" }}>
            <h2 style={{ fontFamily: "'Noto Kufi Arabic', serif", fontSize: "36px", fontWeight: 900, marginBottom: "16px" }}>تحتاج إلى مساعدة قانونية؟</h2>
            <p style={{ fontSize: "18px", lineHeight: "1.8", marginBottom: "28px", opacity: 0.9 }}>فريقنا المتخصص جاهز لمساعدتك في جميع القضايا القانونية — الاستشارة الأولى مجانية بالكامل</p>
            <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/contact" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#C9A84C", color: "#1A2744", padding: "14px 32px", borderRadius: "10px", textDecoration: "none", fontWeight: 700, fontSize: "16px", transition: "all 0.3s" }}>
                <ThumbsUp size={18} /> احجز استشارتك الآن
              </Link>
              <a href="https://wa.me/966555545533" target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(255,255,255,0.2)", color: "white", padding: "14px 32px", borderRadius: "10px", textDecoration: "none", fontWeight: 700, fontSize: "16px", border: "2px solid white", transition: "all 0.3s" }}>
                واتس آب
              </a>
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
