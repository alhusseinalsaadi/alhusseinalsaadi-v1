import Link from "next/link";
import Header from "@/components/layout/HeaderServer";
import Footer from "@/components/layout/Footer";
import AIChatWidget from "@/components/ai/AIChatWidget";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import { getSiteSettings } from "@/lib/site-settings";
import CookieConsent from "@/components/ui/CookieConsent";
import { ChevronLeft, CheckCircle2, ArrowLeft, MessageCircle } from "lucide-react";
import FAQItem from "@/components/services/FAQItem";

interface FAQ {
  q: string;
  a: string;
}

interface Step {
  num: string;
  title: string;
  desc: string;
}

interface ServicePageProps {
  title: string;
  subtitle: string;
  heroDesc: string;
  icon: string;
  whatWeOffer: string[];
  steps: Step[];
  laws: string[];
  faqs: FAQ[];
}

export default async function ServicePageLayout({
  title,
  subtitle,
  heroDesc,
  icon,
  whatWeOffer,
  steps,
  laws,
  faqs,
}: ServicePageProps) {
  const s = await getSiteSettings();
  const waLink = `https://wa.me/${s.whatsapp}?text=${encodeURIComponent("مرحباً، أريد استشارة قانونية")}`;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq: any) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Header />
      <main style={{ paddingTop: "72px" }}>
        {/* Hero */}
        <section
          className="gradient-hero"
          style={{ padding: "80px 24px 100px", textAlign: "center", position: "relative" }}
        >
          <div style={{ maxWidth: "800px", margin: "0 auto", position: "relative", zIndex: 1 }}>
            {/* Breadcrumb */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                marginBottom: "24px",
                fontSize: "14px",
                color: "rgba(255,255,255,0.6)",
              }}
            >
              <Link href="/" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none" }}>
                الرئيسية
              </Link>
              <ChevronLeft size={14} style={{ transform: "scaleX(-1)" }} />
              <Link href="/services" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none" }}>
                الخدمات
              </Link>
              <ChevronLeft size={14} style={{ transform: "scaleX(-1)" }} />
              <span style={{ color: "#C9A84C" }}>{title}</span>
            </div>

            <div style={{ fontSize: "56px", marginBottom: "20px" }}>{icon}</div>
            <p style={{ color: "#C9A84C", fontWeight: 600, fontSize: "14px", letterSpacing: "2px", marginBottom: "12px" }}>
              {subtitle}
            </p>
            <h1
              style={{
                fontFamily: "'Noto Kufi Arabic', serif",
                fontSize: "clamp(32px, 5vw, 52px)",
                fontWeight: 900,
                color: "white",
                marginBottom: "20px",
              }}
            >
              {title}
            </h1>
            <p style={{ fontSize: "18px", color: "rgba(255,255,255,0.75)", lineHeight: "1.8", marginBottom: "36px" }}>
              {heroDesc}
            </p>
            <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/contact" className="btn-primary">
                <MessageCircle size={18} />
                احجز استشارة مجانية
              </Link>
              <a href={waLink} target="_blank" rel="noopener noreferrer" className="btn-outline">
                تواصل عبر واتساب
              </a>
            </div>
          </div>
        </section>

        {/* What We Offer */}
        <section style={{ background: "#FAFAF8", padding: "80px 24px" }}>
          <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
            <h2 style={{ fontFamily: "'Noto Kufi Arabic', serif", fontSize: "32px", fontWeight: 900, color: "#1A2744", marginBottom: "8px" }}>
              ما نقدمه لك
            </h2>
            <div className="gold-divider-right" />
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "16px",
                marginTop: "32px",
              }}
            >
              {whatWeOffer.map((item: any, i: any) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "12px",
                    background: "white",
                    borderRadius: "12px",
                    padding: "20px",
                    boxShadow: "0 4px 24px rgba(26,39,68,0.06)",
                    border: "1px solid #E5E5E0",
                  }}
                >
                  <CheckCircle2 size={20} color="#C9A84C" style={{ flexShrink: 0, marginTop: "2px" }} />
                  <span style={{ fontSize: "15px", color: "#1C1C1E", lineHeight: "1.6" }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section style={{ background: "#1A2744", padding: "80px 24px" }}>
          <div style={{ maxWidth: "900px", margin: "0 auto", textAlign: "center" }}>
            <h2 style={{ fontFamily: "'Noto Kufi Arabic', serif", fontSize: "32px", fontWeight: 900, color: "white", marginBottom: "8px" }}>
              كيف نعمل معك
            </h2>
            <div className="gold-divider" />
            <div
              className="grid-3col"
              style={{ marginTop: "48px" }}
            >
              {steps.map((step: any) => (
                <div key={step.num} style={{ textAlign: "center" }}>
                  <div
                    style={{
                      width: "64px",
                      height: "64px",
                      background: "#C9A84C",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 16px",
                      fontFamily: "'Noto Kufi Arabic', serif",
                      fontSize: "24px",
                      fontWeight: 900,
                      color: "#1A2744",
                    }}
                  >
                    {step.num}
                  </div>
                  <h3 style={{ fontFamily: "'Noto Kufi Arabic', serif", fontSize: "18px", fontWeight: 700, color: "#C9A84C", marginBottom: "8px" }}>
                    {step.title}
                  </h3>
                  <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.65)", lineHeight: "1.7" }}>
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </section>

        {/* Saudi Laws */}
        <section style={{ background: "white", padding: "80px 24px" }}>
          <div style={{ maxWidth: "900px", margin: "0 auto" }}>
            <h2 style={{ fontFamily: "'Noto Kufi Arabic', serif", fontSize: "32px", fontWeight: 900, color: "#1A2744", marginBottom: "8px" }}>
              الأنظمة واللوائح ذات الصلة
            </h2>
            <div className="gold-divider-right" />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                marginTop: "32px",
              }}
            >
              {laws.map((law: any, i: any) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: "16px 20px",
                    background: "#FAFAF8",
                    borderRadius: "10px",
                    border: "1px solid #E5E5E0",
                    borderRight: "4px solid #C9A84C",
                  }}
                >
                  <span
                    style={{
                      width: "28px",
                      height: "28px",
                      background: "#C9A84C",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "12px",
                      fontWeight: 700,
                      color: "#1A2744",
                      flexShrink: 0,
                    }}
                  >
                    {i + 1}
                  </span>
                  <span style={{ fontSize: "15px", color: "#1C1C1E" }}>{law}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section style={{ background: "#FAFAF8", padding: "80px 24px" }}>
          <div style={{ maxWidth: "900px", margin: "0 auto" }}>
            <h2 style={{ fontFamily: "'Noto Kufi Arabic', serif", fontSize: "32px", fontWeight: 900, color: "#1A2744", marginBottom: "8px" }}>
              أسئلة شائعة
            </h2>
            <div className="gold-divider-right" />
            <div style={{ marginTop: "32px", display: "flex", flexDirection: "column", gap: "12px" }}>
              {faqs.map((faq: any, i: any) => (
                <FAQItem key={i} faq={faq} />
              ))}
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section
          style={{
            background: "linear-gradient(135deg, #C9A84C, #A8882E)",
            padding: "64px 24px",
            textAlign: "center",
          }}
        >
          <h2 style={{ fontFamily: "'Noto Kufi Arabic', serif", fontSize: "32px", fontWeight: 900, color: "#1A2744", marginBottom: "16px" }}>
            مستعد للبدء؟ تحدث معنا الآن
          </h2>
          <p style={{ fontSize: "16px", color: "rgba(26,39,68,0.8)", marginBottom: "32px" }}>
            استشارتك الأولى مجانية — فريقنا جاهز للمساعدة
          </p>
          <Link
            href="/contact"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "#1A2744",
              color: "white",
              fontWeight: 700,
              padding: "16px 36px",
              borderRadius: "12px",
              textDecoration: "none",
              fontSize: "16px",
            }}
          >
            تواصل مع فريقنا
            <ArrowLeft size={18} style={{ transform: "scaleX(-1)" }} />
          </Link>
        </section>
      </main>
      <Footer />
      <AIChatWidget />
      <WhatsAppButton phone={s.whatsapp} />
      <CookieConsent />
    </>
  );
}

