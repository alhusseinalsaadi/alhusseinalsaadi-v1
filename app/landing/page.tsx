export const dynamic = "force-dynamic";
import type { Metadata } from "next";
import HeroSection from "@/components/landing/HeroSection";
import PainSection from "@/components/landing/PainSection";
import StatsSection from "@/components/landing/StatsSection";
import ServicesSection from "@/components/landing/ServicesSection";
import WhyUsSection from "@/components/landing/WhyUsSection";
import ProcessSection from "@/components/landing/ProcessSection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import FAQSection from "@/components/landing/FAQSection";
import FinalCTASection from "@/components/landing/FinalCTASection";
import ContactFormSection from "@/components/landing/ContactFormSection";
import Footer from "@/components/landing/Footer";
import StickyFloatingButtons from "@/components/landing/StickyFloatingButtons";
import BookingModal from "@/components/landing/BookingModal";
import CookieConsent from "@/components/ui/CookieConsent";

export const metadata: Metadata = {
  title: "استشارة قانونية مجانية — محامي جدة | الحسين بن أحمد السعدي للمحاماة",
  description:
    "لا تتأخر في حماية حقوقك. مكتب محاماة معتمد في جدة — 300+ عميل راضٍ، 98% نسبة نجاح، استشارة قانونية مجانية خلال ساعتين.",
  keywords: [
    "محامي",
    "محامي جدة",
    "استشارة قانونية مجانية",
    "محامي السعودية",
    "مكتب محاماة جدة",
  ],
  robots: { index: false, follow: false },
};

export default async function LandingPage() {
  let whatsappNumber = "966555545533";
  let phone1 = "0555545533";
  let phone2 = "0122635336";
  let email = "info@alhusseinalsaadi.sa";
  let address = "جدة - شارع التحلية خلف مبنى الرياض بلازا";
  let officeName = "مكتب الحسين بن أحمد بن حسين السعدي للمحاماة";
  try {
    const { getSiteSettings } = await import("@/lib/site-settings");
    const settings = await getSiteSettings();
    if (settings.whatsapp) whatsappNumber = settings.whatsapp;
    if (settings.phone1) phone1 = settings.phone1;
    if (settings.phone2) phone2 = settings.phone2;
    if (settings.email) email = settings.email;
    if (settings.address) address = settings.address;
    if (settings.officeName) officeName = settings.officeName;
  } catch {
    /* use defaults */
  }

  return (
    <>
      <main>
        <HeroSection phone1={phone1} officeName={officeName} />
        <PainSection />
        <StatsSection />
        <ServicesSection />
        <WhyUsSection />
        <ProcessSection />
        <TestimonialsSection />
        <FAQSection />
        <FinalCTASection whatsappNumber={whatsappNumber} phoneNumber={phone1} />
        <ContactFormSection />
      </main>
      <Footer phone1={phone1} phone2={phone2} email={email} address={address} />
      <StickyFloatingButtons whatsappNumber={whatsappNumber} phoneNumber={phone1} />
      <BookingModal />
      <CookieConsent />
    </>
  );
}
