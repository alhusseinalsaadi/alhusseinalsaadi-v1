export const dynamic = "force-dynamic";
import type { Metadata } from "next";
import Header from "@/components/layout/HeaderServer";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import StatsSection from "@/components/home/StatsSection";
import ServicesSection from "@/components/home/ServicesSection";
import WhyUsSection from "@/components/home/WhyUsSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import CTASection from "@/components/home/CTASection";
import AIChatWidget from "@/components/ai/AIChatWidget";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import CookieConsent from "@/components/ui/CookieConsent";
import BlogPreviewSection from "@/components/home/BlogPreviewSection";

export const metadata: Metadata = {
  title: "محامي السعودية — الحسين بن أحمد السعدي للمحاماة جدة",
  description:
    "مكتب محاماة متخصص في جدة — استشارات قانونية، مراجعة عقود، قضايا تجارية، عقارات، تحكيم. محامون معتمدون بخبرة 15+ سنة في القانون السعودي. استشارة مجانية.",
  keywords: [
    "محامي",
    "محامي جدة",
    "محامي السعودية",
    "استشارة قانونية",
    "مكتب محاماة",
    "قضايا تجارية",
    "محامي عقارات",
    "محامي استثمار",
  ],
};

export default async function HomePage() {
  let whatsappNumber = "966555545533";
  let phone1 = "0555545533";
  try {
    const { getSiteSettings } = await import("@/lib/site-settings");
    const settings = await getSiteSettings();
    if (settings.whatsapp) whatsappNumber = settings.whatsapp;
    if (settings.phone1) phone1 = settings.phone1;
  } catch { /* use default */ }

  return (
    <>
      <Header />
      <main>
        <HeroSection phone1={phone1} />
        <StatsSection />
        <ServicesSection />
        <WhyUsSection />
        <TestimonialsSection />
        <BlogPreviewSection />
        <CTASection />
      </main>
      <Footer />
      <AIChatWidget />
      <WhatsAppButton phone={whatsappNumber} />
      <CookieConsent />
    </>
  );
}
