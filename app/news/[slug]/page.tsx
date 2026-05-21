import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AIChatWidget from "@/components/ai/AIChatWidget";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import CookieConsent from "@/components/ui/CookieConsent";
import { Calendar, ArrowRight, MessageCircle } from "lucide-react";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await prisma.post.findFirst({ where: { slug, published: true, category: "news" } });
  if (!post) return { title: "خبر غير موجود" };
  return {
    title: post.title,
    description: post.excerpt || post.content.slice(0, 160),
  };
}

export default async function NewsPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await prisma.post.findFirst({ where: { slug, published: true, category: "news" } });

  if (!post) notFound();

  const paragraphs = post.content.trim().split("\n");
  const date = post.publishedAt ?? post.createdAt;

  return (
    <>
      <Header />
      <main style={{ paddingTop: "72px" }}>
        <section className="gradient-hero" style={{ padding: "64px 24px" }}>
          <div style={{ maxWidth: "800px", margin: "0 auto" }}>
            <Link href="/news" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none", fontSize: "14px", display: "inline-flex", alignItems: "center", gap: "6px", marginBottom: "20px" }}>
              <ArrowRight size={14} /> العودة للأخبار
            </Link>
            <h1 style={{ fontFamily: "'Noto Kufi Arabic', serif", fontSize: "clamp(28px,4vw,42px)", fontWeight: 900, color: "white", lineHeight: "1.4", marginBottom: "20px" }}>
              {post.title}
            </h1>
            <div style={{ display: "flex", gap: "20px", color: "rgba(255,255,255,0.6)", fontSize: "14px" }}>
              <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <Calendar size={14} />
                {new Date(date).toLocaleDateString("ar-SA", { year: "numeric", month: "long", day: "numeric" })}
              </span>
            </div>
          </div>
        </section>

        <section style={{ background: "white", padding: "64px 24px" }}>
          <div style={{ maxWidth: "760px", margin: "0 auto" }}>
            <div style={{ fontSize: "17px", lineHeight: "1.9", color: "#1C1C1E" }}>
              {paragraphs.map((p, i) => {
                if (p.startsWith("## ")) return <h2 key={i} style={{ fontFamily: "'Noto Kufi Arabic', serif", fontSize: "24px", fontWeight: 700, color: "#1A2744", margin: "32px 0 12px" }}>{p.replace("## ", "")}</h2>;
                if (p.startsWith("### ")) return <h3 key={i} style={{ fontFamily: "'Noto Kufi Arabic', serif", fontSize: "19px", fontWeight: 700, color: "#1A2744", margin: "24px 0 8px" }}>{p.replace("### ", "")}</h3>;
                if (p.startsWith("- ")) return <div key={i} style={{ margin: "6px 0", paddingRight: "16px" }}>• {p.replace("- ", "")}</div>;
                if (p.trim() === "") return <div key={i} style={{ height: "12px" }} />;
                return <p key={i} style={{ margin: "12px 0" }}>{p}</p>;
              })}
            </div>

            <div style={{ marginTop: "48px", background: "#FAFAF8", borderRadius: "16px", padding: "32px", textAlign: "center", border: "1px solid #E5E5E0" }}>
              <h3 style={{ fontFamily: "'Noto Kufi Arabic', serif", fontSize: "22px", fontWeight: 700, color: "#1A2744", marginBottom: "12px" }}>
                هل تحتاج استشارة قانونية؟
              </h3>
              <p style={{ color: "#6B6B6B", marginBottom: "20px" }}>فريقنا جاهز لمساعدتك — الاستشارة الأولى مجانية</p>
              <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
                <Link href="/contact" className="btn-primary" style={{ fontSize: "15px" }}>احجز استشارة مجانية</Link>
                <Link href="/news" style={{ display: "inline-flex", alignItems: "center", gap: "6px", color: "#C9A84C", fontWeight: 600, textDecoration: "none", fontSize: "15px" }}>
                  <MessageCircle size={16} /> أخبار أخرى
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
