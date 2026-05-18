import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ServicesSection from "@/components/home/ServicesSection";
import CTASection from "@/components/home/CTASection";
import AIChatWidget from "@/components/ai/AIChatWidget";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import CookieConsent from "@/components/ui/CookieConsent";

export const metadata: Metadata = {
  title: "خدماتنا القانونية",
  description: "خدمات قانونية متكاملة في المملكة العربية السعودية — استشارات، عقود، نزاعات، تراخيص، عقارات.",
};

export default function ServicesPage() {
  return (
    <>
      <Header />
      <main style={{ paddingTop: "72px" }}>
        <section className="gradient-hero" style={{ padding: "80px 24px", textAlign: "center" }}>
          <div style={{ maxWidth: "700px", margin: "0 auto" }}>
            <p style={{ color: "#C9A84C", fontWeight: 600, fontSize: "14px", letterSpacing: "2px", marginBottom: "12px" }}>
              ما نقدمه
            </p>
            <h1 style={{ fontFamily: "'Noto Kufi Arabic', serif", fontSize: "48px", fontWeight: 900, color: "white", marginBottom: "20px" }}>
              خدماتنا القانونية
            </h1>
            <p style={{ fontSize: "18px", color: "rgba(255,255,255,0.75)", lineHeight: "1.8" }}>
              نغطي طيفاً واسعاً من الخدمات القانونية المتخصصة في السوق السعودي، مع فريق من المحامين المعتمدين ذوي الخبرة العميقة.
            </p>
          </div>
        </section>
        <ServicesSection />
        <CTASection />
      </main>
      <Footer />
      <AIChatWidget />
      <WhatsAppButton />
      <CookieConsent />
    </>
  );
}
