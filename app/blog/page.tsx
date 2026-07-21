import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/HeaderServer";
import Footer from "@/components/layout/Footer";
import AIChatWidget from "@/components/ai/AIChatWidget";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import CookieConsent from "@/components/ui/CookieConsent";
import { Calendar, ArrowLeft, BookOpen, ChevronRight, ChevronLeft, Zap, Award } from "lucide-react";
import { getBlogPosts } from "@/lib/supabase-client";
import { getSiteSettings } from "@/lib/site-settings";
import { SITE_URL, SITE_NAME } from "@/lib/metadata";

export const metadata: Metadata = {
  title: "المدونة القانونية — تحليلات وخبرات في القانون السعودي",
  description: "مقالات وتحليلات قانونية متخصصة — قانون الشركات، العمل، العقود، العقارات، التحكيم. نصائح قانونية من محامين معتمدين.",
  keywords: [
    "المدونة القانونية",
    "مقالات قانونية",
    "تحليلات قانونية",
    "القانون السعودي",
    "نصائح قانونية",
    "أخبار قانونية",
  ],
  openGraph: {
    title: "المدونة القانونية — خبرات وتحليلات",
    description: "اقرأ آخر المقالات القانونية والتحليلات المتخصصة",
    type: "website",
  },
};

export const dynamic = "force-dynamic";

const PER_PAGE = 6;

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const settings = await getSiteSettings();
  const whatsappPhone = settings.whatsapp ?? "966555545533";
  const page = Math.max(1, parseInt(params.page ?? "1", 10));
  const skip = (page - 1) * PER_PAGE;

  let posts = [];
  let total = 0;

  try {
    // Skip fetch if API key not available (during build)
    if (process.env.SUPABASE_SERVICE_ROLE_KEY) {
      console.log("[Blog] Query start - using Supabase REST API, page=" + page + ", skip=" + skip + ", take=" + PER_PAGE);

      const result = await getBlogPosts(page, PER_PAGE);
      posts = result.posts;
      total = result.total;

      console.log("[Blog] Query success - found " + posts.length + " posts, total count: " + total);
    } else {
      console.log("[Blog] Skipping query during build (no API key)");
    }
  } catch (error: any) {
    console.error("[Blog] Query error:", error.message);
  }

  const totalPages = Math.max(1, Math.ceil(total / PER_PAGE));

  // Schema markup for Blog Collection
  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "المدونة القانونية",
    description: "مقالات وتحليلات قانونية متخصصة في القانون السعودي",
    url: `${SITE_URL}/blog`,
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }} />
      <Header />
      <main style={{ paddingTop: "72px" }}>
        {/* Hero */}
        <section className="gradient-hero" style={{ padding: "80px 24px", textAlign: "center", background: "linear-gradient(135deg, #1A2744 0%, #2D3E5F 100%)" }}>
          <div style={{ maxWidth: "700px", margin: "0 auto" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(201, 168, 76, 0.2)", color: "#C9A84C", padding: "8px 16px", borderRadius: "20px", marginBottom: "20px", fontSize: "13px", fontWeight: 600 }}>
              <Zap size={14} /> مقالات قانونية متخصصة
            </div>
            <h1 style={{ fontFamily: "'Noto Kufi Arabic', serif", fontSize: "clamp(36px, 5vw, 52px)", fontWeight: 900, color: "white", marginBottom: "16px", lineHeight: "1.2", letterSpacing: "-1px" }}>
              المدونة القانونية
            </h1>
            <p style={{ fontSize: "18px", color: "rgba(255,255,255,0.8)", lineHeight: "1.8", marginBottom: "24px" }}>
              مقالات وتحليلات معمّقة في القانون السعودي — من خبرة أكثر من 15 سنة في الممارسة القانونية
            </p>
            <div style={{ display: "flex", gap: "20px", justifyContent: "center", flexWrap: "wrap", fontSize: "14px", color: "rgba(255,255,255,0.7)" }}>
              <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <Award size={14} /> {total} مقالة متخصصة
              </span>
              <span>•</span>
              <span>تحديث مستمر</span>
            </div>
          </div>
        </section>

        {/* Posts Grid */}
        <section style={{ background: "#FAFAF8", padding: "80px 24px" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            {posts.length === 0 ? (
              <div style={{ textAlign: "center", padding: "80px 0", color: "#6B6B6B" }}>
                <BookOpen size={48} style={{ margin: "0 auto 16px", opacity: 0.3 }} />
                <p style={{ fontSize: "18px", fontWeight: 600 }}>لا توجد مقالات منشورة بعد</p>
                <p style={{ fontSize: "14px", marginTop: "8px", opacity: 0.7 }}>تابعنا قريباً لأحدث المقالات القانونية</p>
              </div>
            ) : (
              <>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "28px" }}>
                  {posts.map((post: any, index: number) => {
                    const date = post.publishedAt ?? post.createdAt;
                    return (
                      <Link key={post.slug} href={`/blog/${post.slug}`} style={{ textDecoration: "none" }}>
                        <article
                          style={{
                            height: "100%",
                            display: "flex",
                            flexDirection: "column",
                            overflow: "hidden",
                            borderRadius: "16px",
                            background: "white",
                            border: "1px solid #E5E5E0",
                            transition: "all 0.3s ease",
                            boxShadow: "0 4px 12px rgba(26,39,68,0.08)",
                            cursor: "pointer"
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.boxShadow = "0 12px 32px rgba(26,39,68,0.15)";
                            e.currentTarget.style.transform = "translateY(-4px)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.boxShadow = "0 4px 12px rgba(26,39,68,0.08)";
                            e.currentTarget.style.transform = "translateY(0)";
                          }}
                        >
                          {/* Cover Image */}
                          <div style={{ position: "relative", overflow: "hidden", height: "200px", background: "#F0EDE6" }}>
                            {post.coverImage && (
                              <img
                                src={post.coverImage}
                                alt={post.title}
                                loading="lazy"
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  objectFit: "cover",
                                  transition: "transform 0.4s ease"
                                }}
                                onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                                onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                              />
                            )}
                            {/* Badge */}
                            <div style={{ position: "absolute", top: "12px", right: "12px", background: "#C9A84C", color: "white", padding: "6px 12px", borderRadius: "20px", fontSize: "11px", fontWeight: 700 }}>
                              مقالة قانونية
                            </div>
                          </div>

                          {/* Content */}
                          <div style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "16px", flex: 1 }}>
                            {/* Title */}
                            <h2 style={{ fontFamily: "'Noto Kufi Arabic', serif", fontSize: "18px", fontWeight: 700, color: "#1A2744", lineHeight: "1.5", margin: 0 }}>
                              {post.title}
                            </h2>

                            {/* Excerpt */}
                            {post.excerpt && (
                              <p style={{ fontSize: "14px", color: "#666", lineHeight: "1.7", margin: 0, flex: 1 }}>
                                {post.excerpt.slice(0, 150)}{post.excerpt.length > 150 ? "..." : ""}
                              </p>
                            )}

                            {/* Footer */}
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: "12px", borderTop: "1px solid #E5E5E0" }}>
                              <span style={{ fontSize: "12px", color: "#6B6B6B", display: "flex", alignItems: "center", gap: "4px" }}>
                                <Calendar size={12} />
                                {new Date(date).toLocaleDateString("ar-SA", { month: "short", day: "numeric" })}
                              </span>
                              <span style={{ color: "#C9A84C", fontSize: "12px", fontWeight: 700, display: "flex", alignItems: "center", gap: "4px", transition: "gap 0.2s" }}>
                                اقرأ <ArrowLeft size={12} />
                              </span>
                            </div>
                          </div>
                        </article>
                      </Link>
                    );
                  })}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "16px", marginTop: "48px" }}>
                    {/* Previous */}
                    {page > 1 ? (
                      <Link
                        href={`/blog?page=${page - 1}`}
                        style={{
                          display: "flex", alignItems: "center", gap: "6px",
                          padding: "10px 20px", borderRadius: "10px",
                          background: "#1A2744", color: "white",
                          textDecoration: "none", fontSize: "14px", fontWeight: 600,
                        }}
                      >
                        <ChevronRight size={16} />
                        السابق
                      </Link>
                    ) : (
                      <span style={{ display: "flex", alignItems: "center", gap: "6px", padding: "10px 20px", borderRadius: "10px", background: "#E5E5E0", color: "#9CA3AF", fontSize: "14px", fontWeight: 600 }}>
                        <ChevronRight size={16} />
                        السابق
                      </span>
                    )}

                    {/* Page indicator */}
                    <span style={{ fontSize: "14px", color: "#6B6B6B", fontWeight: 500 }}>
                      صفحة {page} من {totalPages}
                    </span>

                    {/* Next */}
                    {page < totalPages ? (
                      <Link
                        href={`/blog?page=${page + 1}`}
                        style={{
                          display: "flex", alignItems: "center", gap: "6px",
                          padding: "10px 20px", borderRadius: "10px",
                          background: "#1A2744", color: "white",
                          textDecoration: "none", fontSize: "14px", fontWeight: 600,
                        }}
                      >
                        التالي
                        <ChevronLeft size={16} />
                      </Link>
                    ) : (
                      <span style={{ display: "flex", alignItems: "center", gap: "6px", padding: "10px 20px", borderRadius: "10px", background: "#E5E5E0", color: "#9CA3AF", fontSize: "14px", fontWeight: 600 }}>
                        التالي
                        <ChevronLeft size={16} />
                      </span>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </section>
      </main>
      <Footer />
      <AIChatWidget />
      <WhatsAppButton phone={whatsappPhone} />
      <CookieConsent />
    </>
  );
}
