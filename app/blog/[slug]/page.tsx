import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AIChatWidget from "@/components/ai/AIChatWidget";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import CookieConsent from "@/components/ui/CookieConsent";
import { Calendar, Clock, ArrowRight, MessageCircle } from "lucide-react";

const posts: Record<string, { title: string; date: string; category: string; readTime: string; content: string }> = {
  "nazam-almuamalat-almdaniya": {
    title: "نظام المعاملات المدنية 1444هـ — ما الذي تغيّر في عقودك؟",
    date: "12 مايو 2026",
    category: "قانون الأعمال",
    readTime: "5 دقائق",
    content: `
صدر نظام المعاملات المدنية السعودي بالمرسوم الملكي عام 1444هـ ليُشكّل منظومة قانونية متكاملة تُنظّم العلاقات المدنية والتجارية في المملكة.

## أبرز التغييرات التي تؤثر على عقودك

### 1. تحديد مفهوم العقد وشروط انعقاده
حدّد النظام بوضوح متطلبات الإيجاب والقبول ومبدأ حرية التعاقد، مع استثناءات تتعلق بالنظام العام والآداب.

### 2. ضمانات حماية الطرف الأضعف
أضاف النظام حمايات صريحة ضد البنود التعسفية والشروط المُجحفة، خاصة في العقود الاستهلاكية.

### 3. أحكام الإخلال بالعقود والتعويض
نظّم النظام آليات واضحة لتقدير التعويض عن الإخلال التعاقدي بما يشمل الأضرار المباشرة وما فات من كسب.

### 4. تأثير القوة القاهرة
أحكام جديدة تنظّم تأثير الظروف الاستثنائية على الالتزامات التعاقدية.

## توصياتنا

✅ راجع عقودك الحالية مع محامٍ متخصص للتأكد من توافقها مع النظام الجديد.
✅ أدرج بنوداً صريحة للتحكيم وتحديد القانون الواجب التطبيق.
✅ تأكد من وضوح شروط إنهاء العقد والتعويضات المترتبة.

**هل تريد مراجعة عقودك وفق النظام الجديد؟** [تواصل مع فريقنا القانوني اليوم](/contact).
    `,
  },
  "vision-2030-business": {
    title: "رؤية 2030 وفرص الاستثمار — الإطار القانوني للمستثمرين",
    date: "5 مايو 2026",
    category: "الاستثمار",
    readTime: "7 دقائق",
    content: `
رؤية 2030 أطلقت موجة تحرر اقتصادي واسعة في المملكة، فتحت أمام المستثمرين فرصاً استثنائية في قطاعات لم تكن مفتوحة من قبل.

## الإطار القانوني الجديد للاستثمار

### هيئة الاستثمار (MISA) — بوابة المستثمر
وفّرت MISA منصة إلكترونية لإصدار تراخيص الاستثمار خلال أيام، مع رفع نسبة الملكية الأجنبية في كثير من القطاعات إلى 100%.

### قطاعات الاستثمار المفتوحة
- التجزئة والتوزيع
- السياحة والترفيه
- الرعاية الصحية والتعليم
- تقنية المعلومات والذكاء الاصطناعي
- الخدمات المالية (بضوابط من ساما)

### الحوافز الضريبية والجمركية
مناطق اقتصادية خاصة توفر إعفاءات ضريبية لمدة 50 سنة وحوافز مالية للمستثمرين.

## خطوات الاستثمار القانونية

1. اختيار الكيان القانوني المناسب (LLC / Branch / Joint Venture)
2. الحصول على ترخيص MISA
3. تسجيل السجل التجاري ووزارة التجارة
4. استيفاء متطلبات ZATCA والتسجيل الضريبي
5. تأهيل الموظفين وفق متطلبات نطاقات

**هل تفكر في الاستثمار في السعودية؟** فريقنا يرافقك في كل خطوة — [ابدأ استشارتك المجانية](/contact).
    `,
  },
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = posts[slug];
  return {
    title: post?.title || "مقال",
    description: post?.content.slice(0, 150) || "",
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = posts[slug];

  if (!post) {
    return (
      <>
        <Header />
        <main style={{ paddingTop: "72px", minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ textAlign: "center" }}>
            <h1 style={{ fontFamily: "'Noto Kufi Arabic', serif", fontSize: "32px", color: "#1A2744", marginBottom: "16px" }}>
              المقال غير موجود
            </h1>
            <Link href="/blog" style={{ color: "#C9A84C", textDecoration: "none", fontWeight: 600 }}>
              العودة للمدونة
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const paragraphs = post.content.trim().split("\n");

  return (
    <>
      <Header />
      <main style={{ paddingTop: "72px" }}>
        {/* Hero */}
        <section className="gradient-hero" style={{ padding: "64px 24px" }}>
          <div style={{ maxWidth: "800px", margin: "0 auto" }}>
            <Link href="/blog" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none", fontSize: "14px", display: "inline-flex", alignItems: "center", gap: "6px", marginBottom: "20px" }}>
              <ArrowRight size={14} />
              العودة للمدونة
            </Link>
            <div style={{ display: "flex", gap: "12px", alignItems: "center", marginBottom: "16px" }}>
              <span style={{ background: "#C9A84C", color: "#1A2744", padding: "4px 14px", borderRadius: "999px", fontSize: "13px", fontWeight: 600 }}>
                {post.category}
              </span>
            </div>
            <h1 style={{ fontFamily: "'Noto Kufi Arabic', serif", fontSize: "clamp(28px,4vw,42px)", fontWeight: 900, color: "white", lineHeight: "1.4", marginBottom: "20px" }}>
              {post.title}
            </h1>
            <div style={{ display: "flex", gap: "20px", color: "rgba(255,255,255,0.6)", fontSize: "14px" }}>
              <span style={{ display: "flex", alignItems: "center", gap: "6px" }}><Calendar size={14} /> {post.date}</span>
              <span style={{ display: "flex", alignItems: "center", gap: "6px" }}><Clock size={14} /> {post.readTime} قراءة</span>
            </div>
          </div>
        </section>

        {/* Content */}
        <section style={{ background: "white", padding: "64px 24px" }}>
          <div style={{ maxWidth: "760px", margin: "0 auto" }}>
            <div style={{ fontSize: "17px", lineHeight: "1.9", color: "#1C1C1E" }}>
              {paragraphs.map((p, i) => {
                if (p.startsWith("## ")) return <h2 key={i} style={{ fontFamily: "'Noto Kufi Arabic', serif", fontSize: "24px", fontWeight: 700, color: "#1A2744", margin: "32px 0 12px" }}>{p.replace("## ", "")}</h2>;
                if (p.startsWith("### ")) return <h3 key={i} style={{ fontFamily: "'Noto Kufi Arabic', serif", fontSize: "19px", fontWeight: 700, color: "#1A2744", margin: "24px 0 8px" }}>{p.replace("### ", "")}</h3>;
                if (p.startsWith("✅")) return <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "8px", margin: "8px 0", color: "#1C1C1E" }}>✅ <span>{p.replace("✅ ", "")}</span></div>;
                if (p.match(/^\d+\./)) return <div key={i} style={{ margin: "8px 0", paddingRight: "16px", color: "#1C1C1E" }}>{p}</div>;
                if (p.startsWith("- ")) return <div key={i} style={{ margin: "6px 0", paddingRight: "16px", color: "#1C1C1E" }}>• {p.replace("- ", "")}</div>;
                if (p.startsWith("**")) return <p key={i} style={{ margin: "16px 0", fontWeight: 600, color: "#1A2744" }}>{p.replace(/\*\*/g, "")}</p>;
                if (p.trim() === "") return <div key={i} style={{ height: "12px" }} />;
                return <p key={i} style={{ margin: "12px 0" }}>{p}</p>;
              })}
            </div>

            {/* CTA */}
            <div style={{ marginTop: "48px", background: "#FAFAF8", borderRadius: "16px", padding: "32px", textAlign: "center", border: "1px solid #E5E5E0" }}>
              <h3 style={{ fontFamily: "'Noto Kufi Arabic', serif", fontSize: "22px", fontWeight: 700, color: "#1A2744", marginBottom: "12px" }}>
                هل تحتاج استشارة قانونية؟
              </h3>
              <p style={{ color: "#6B6B6B", marginBottom: "20px" }}>
                فريقنا جاهز لمساعدتك — الاستشارة الأولى مجانية
              </p>
              <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
                <Link href="/contact" className="btn-primary" style={{ fontSize: "15px" }}>
                  احجز استشارة مجانية
                </Link>
                <Link href="/blog" style={{ display: "inline-flex", alignItems: "center", gap: "6px", color: "#C9A84C", fontWeight: 600, textDecoration: "none", fontSize: "15px" }}>
                  <MessageCircle size={16} />
                  قرأ مقالات أخرى
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
