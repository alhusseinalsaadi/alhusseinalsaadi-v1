import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AIChatWidget from "@/components/ai/AIChatWidget";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import CookieConsent from "@/components/ui/CookieConsent";
import { Calendar, Clock, ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "المدونة القانونية",
  description: "مقالات وتحليلات قانونية متخصصة في القانون السعودي من مكتب الحسين بن أحمد بن حسين السعدي للمحاماة.",
};

// Static posts for SSG — in production these come from DB
const posts = [
  {
    slug: "nazam-almuamalat-almdaniya",
    title: "نظام المعاملات المدنية 1444هـ — ما الذي تغيّر في عقودك؟",
    excerpt: "صدر نظام المعاملات المدنية السعودي عام 1444هـ ليكون منظوماً قانونياً شاملاً ينظم العلاقات المدنية. تعرف على أبرز التغييرات التي تؤثر على عقودك التجارية.",
    date: "12 مايو 2026",
    category: "قانون الأعمال",
    readTime: "5 دقائق",
  },
  {
    slug: "vision-2030-business",
    title: "رؤية 2030 وفرص الاستثمار — الإطار القانوني للمستثمرين",
    excerpt: "كيف تستفيد من فرص رؤية 2030؟ دليل قانوني شامل للإجراءات والتراخيص والفرص الاستثمارية المتاحة للمواطنين والمقيمين والمستثمرين الأجانب.",
    date: "5 مايو 2026",
    category: "الاستثمار",
    readTime: "7 دقائق",
  },
  {
    slug: "ejarat-wafi-guide",
    title: "منصة إيجار ووافي — دليلك القانوني لعقود الإيجار السعودية",
    excerpt: "كل ما تحتاج معرفته عن منصتي إيجار ووافي وكيف تحمي حقوقك كمالك أو مستأجر في ظل الأنظمة العقارية السعودية المحدّثة.",
    date: "28 أبريل 2026",
    category: "العقارات",
    readTime: "6 دقائق",
  },
  {
    slug: "labor-law-updates-2025",
    title: "أبرز تعديلات نظام العمل السعودي — ما يجب أن يعرفه كل صاحب عمل",
    excerpt: "تعديلات جوهرية طالت نظام العمل السعودي تؤثر على عقود التوظيف وإجازات الأمومة والآجال الزمنية لتسوية النزاعات. إليك الملخص الشامل.",
    date: "20 أبريل 2026",
    category: "قانون العمل",
    readTime: "8 دقائق",
  },
  {
    slug: "zatca-vat-compliance",
    title: "الامتثال لضريبة القيمة المضافة — دليل عملي لتجنب الغرامات",
    excerpt: "مع تصاعد نشاط هيئة الزكاة والضريبة والجمارك في التدقيق، كيف تضمن امتثال شركتك الكامل لمتطلبات ضريبة القيمة المضافة؟",
    date: "10 أبريل 2026",
    category: "الضرائب",
    readTime: "6 دقائق",
  },
  {
    slug: "arbitration-saudi-guide",
    title: "التحكيم في السعودية — متى تلجأ إليه وكيف تستفيد منه؟",
    excerpt: "دليل شامل لنظام التحكيم السعودي، مزاياه مقارنة بالتقاضي، وكيف تصيغ بند التحكيم في عقودك لضمان أسرع حل لنزاعاتك.",
    date: "1 أبريل 2026",
    category: "حل النزاعات",
    readTime: "7 دقائق",
  },
];

const categoryColors: Record<string, string> = {
  "قانون الأعمال": "#1A2744",
  "الاستثمار": "#C9A84C",
  "العقارات": "#2A5F4A",
  "قانون العمل": "#7C3AED",
  "الضرائب": "#DC2626",
  "حل النزاعات": "#D97706",
};

export default function BlogPage() {
  return (
    <>
      <Header />
      <main style={{ paddingTop: "72px" }}>
        {/* Hero */}
        <section className="gradient-hero" style={{ padding: "72px 24px", textAlign: "center" }}>
          <div style={{ maxWidth: "600px", margin: "0 auto" }}>
            <p style={{ color: "#C9A84C", fontWeight: 600, fontSize: "14px", letterSpacing: "2px", marginBottom: "12px" }}>
              المعرفة القانونية
            </p>
            <h1 style={{ fontFamily: "'Noto Kufi Arabic', serif", fontSize: "44px", fontWeight: 900, color: "white", marginBottom: "16px" }}>
              المدونة القانونية
            </h1>
            <p style={{ fontSize: "17px", color: "rgba(255,255,255,0.7)", lineHeight: "1.8" }}>
              مقالات متخصصة وتحليلات معمّقة في القانون السعودي من مكتب السعدي للمحاماة
            </p>
          </div>
        </section>

        {/* Posts Grid */}
        <section style={{ background: "#FAFAF8", padding: "80px 24px" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "24px" }}>
              {posts.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`} style={{ textDecoration: "none" }}>
                  <article
                    className="card"
                    style={{ height: "100%", display: "flex", flexDirection: "column", gap: "14px", cursor: "pointer" }}
                  >
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <span style={{
                        background: categoryColors[post.category] || "#1A2744",
                        color: "white", fontSize: "12px", fontWeight: 600,
                        padding: "4px 12px", borderRadius: "999px",
                      }}>
                        {post.category}
                      </span>
                      <span style={{ fontSize: "12px", color: "#6B6B6B", display: "flex", alignItems: "center", gap: "4px" }}>
                        <Clock size={12} /> {post.readTime}
                      </span>
                    </div>
                    <h2 style={{ fontFamily: "'Noto Kufi Arabic', serif", fontSize: "19px", fontWeight: 700, color: "#1A2744", lineHeight: "1.5" }}>
                      {post.title}
                    </h2>
                    <p style={{ fontSize: "14px", color: "#6B6B6B", lineHeight: "1.7", flex: 1 }}>
                      {post.excerpt}
                    </p>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: "12px", borderTop: "1px solid #E5E5E0" }}>
                      <span style={{ fontSize: "13px", color: "#6B6B6B", display: "flex", alignItems: "center", gap: "6px" }}>
                        <Calendar size={13} /> {post.date}
                      </span>
                      <span style={{ color: "#C9A84C", fontSize: "13px", fontWeight: 600, display: "flex", alignItems: "center", gap: "4px" }}>
                        اقرأ المزيد <ArrowLeft size={13} style={{ transform: "scaleX(-1)" }} />
                      </span>
                    </div>
                  </article>
                </Link>
              ))}
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
