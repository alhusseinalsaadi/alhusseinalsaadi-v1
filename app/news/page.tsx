import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AIChatWidget from "@/components/ai/AIChatWidget";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import CookieConsent from "@/components/ui/CookieConsent";
import { Calendar, ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "الأخبار القانونية",
  description: "آخر الأخبار والتحديثات القانونية في المملكة العربية السعودية.",
};

const newsItems = [
  { slug: "misa-updates-2026", title: "هيئة الاستثمار تُطلق حزمة تحفيزية جديدة للمستثمرين الأجانب", date: "14 مايو 2026", category: "تحديثات تنظيمية" },
  { slug: "zatca-new-rules", title: "ZATCA تُصدر لوائح جديدة للفوترة الإلكترونية المرحلة الثالثة", date: "10 مايو 2026", category: "الضرائب" },
  { slug: "commercial-court-2026", title: "المحكمة التجارية تُقر إجراءات مُسرَّعة للنزاعات التجارية الصغيرة", date: "5 مايو 2026", category: "القضاء" },
  { slug: "labor-reform-2026", title: "تعديلات نظام العمل الجديدة وأثرها على عقود التوظيف", date: "28 أبريل 2026", category: "قانون العمل" },
];

export default function NewsPage() {
  return (
    <>
      <Header />
      <main style={{ paddingTop: "72px" }}>
        <section className="gradient-hero" style={{ padding: "72px 24px", textAlign: "center" }}>
          <div style={{ maxWidth: "600px", margin: "0 auto" }}>
            <h1 style={{ fontFamily: "'Noto Kufi Arabic', serif", fontSize: "44px", fontWeight: 900, color: "white", marginBottom: "16px" }}>
              الأخبار القانونية
            </h1>
            <p style={{ fontSize: "17px", color: "rgba(255,255,255,0.7)" }}>
              آخر المستجدات والتحديثات في المنظومة القانونية السعودية
            </p>
          </div>
        </section>
        <section style={{ background: "#FAFAF8", padding: "64px 24px" }}>
          <div style={{ maxWidth: "900px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "16px" }}>
            {newsItems.map((item) => (
              <Link key={item.slug} href={`/news/${item.slug}`} style={{ textDecoration: "none" }}>
                <div className="card" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "20px", cursor: "pointer" }}>
                  <div style={{ flex: 1 }}>
                    <span style={{ background: "#1A2744", color: "white", fontSize: "11px", fontWeight: 600, padding: "3px 10px", borderRadius: "999px", display: "inline-block", marginBottom: "10px" }}>
                      {item.category}
                    </span>
                    <h2 style={{ fontFamily: "'Noto Kufi Arabic', serif", fontSize: "18px", fontWeight: 700, color: "#1A2744", marginBottom: "8px" }}>
                      {item.title}
                    </h2>
                    <span style={{ fontSize: "13px", color: "#6B6B6B", display: "flex", alignItems: "center", gap: "6px" }}>
                      <Calendar size={13} /> {item.date}
                    </span>
                  </div>
                  <ArrowLeft size={18} color="#C9A84C" style={{ transform: "scaleX(-1)", flexShrink: 0 }} />
                </div>
              </Link>
            ))}
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
