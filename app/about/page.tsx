import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/HeaderServer";
import Footer from "@/components/layout/Footer";
import AIChatWidget from "@/components/ai/AIChatWidget";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import CookieConsent from "@/components/ui/CookieConsent";
import { Award, Users, Shield, Target } from "lucide-react";

export const metadata: Metadata = {
  title: "من نحن",
  description: "تعرف على مكتب الحسين بن أحمد بن حسين السعدي للمحاماة — قصتنا وخدماتنا القانونية في جدة.",
};

const values = [
  { icon: Shield, title: "شفافية بلا سقف", desc: "لا نُخفي شيئاً عن موكلنا. تعرف ما يجري في ملفك لحظة بلحظة — لأن ثقتك أثمن من أي قضية." },
  { icon: Award, title: "لا مكان للتهاون", desc: "كل تفصيلة في ملفك تُعامَل بجدية تامة. الإهمال ليس خياراً — لأن خسارتك تعني إخفاقنا." },
  { icon: Users, title: "أنت تقرر، نحن ننفّذ", desc: "القرار النهائي يبقى بين يديك دائماً. نُقدم الخيارات بوضوح، ونُنفّذ ما تختاره بكل احترافية." },
  { icon: Target, title: "النتيجة لا الوعد", desc: "لا نُكثر من الكلام قبل المعركة. نتحدث بالأرقام والأحكام بعدها — هذا ما يهم فعلاً." },
];

export default function AboutPage() {
  return (
    <>
      <Header />
      <main style={{ paddingTop: "72px" }}>
        {/* Hero */}
        <section className="gradient-hero" style={{ padding: "80px 24px", textAlign: "center" }}>
          <div style={{ maxWidth: "800px", margin: "0 auto" }}>
            <h1 style={{ fontFamily: "'Noto Kufi Arabic', serif", fontSize: "48px", fontWeight: 900, color: "white", marginBottom: "20px" }}>
              من نحن
            </h1>
            <p style={{ fontSize: "18px", color: "rgba(255,255,255,0.75)", lineHeight: "1.8" }}>
              مكتب الحسين بن أحمد بن حسين السعدي للمحاماة — شريكك القانوني الموثوق في جدة
            </p>
          </div>
        </section>

        {/* Story */}
        <section style={{ background: "#FAFAF8", padding: "80px 24px" }}>
          <div className="grid-2col" style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <div>
              <p style={{ color: "#C9A84C", fontWeight: 600, fontSize: "14px", letterSpacing: "2px", marginBottom: "12px" }}>مكتب قانوني متخصص في جدة</p>
              <h2 style={{ fontFamily: "'Noto Kufi Arabic', serif", fontSize: "36px", fontWeight: 900, color: "#1A2744", marginBottom: "20px", lineHeight: "1.3" }}>
                مكتب الحسين بن أحمد بن حسين السعدي للمحاماة
              </h2>
              <div className="gold-divider-right" />
              <p style={{ fontSize: "16px", color: "#6B6B6B", lineHeight: "1.9", marginTop: "20px", marginBottom: "16px" }}>
                نُدير قضاياك بشفافية كاملة وتحديث مستمر — لن تحتاج أن تسأل، لأننا نُبقيك في صورة كل خطوة قبل أن تطرح السؤال. لا غموض، لا تأخير، ولا قرارات تُتخذ دون علمك.
              </p>
              <p style={{ fontSize: "16px", color: "#6B6B6B", lineHeight: "1.9", marginBottom: "16px" }}>
                ملفك القانوني لا يتوقف ولا يُترك دون رقابة. نلتزم بسرعة استجابة ومتابعة دقيقة تضمن أن كل إجراء يُتخذ في وقته، وأن حقوقك لا تضيع بين الإجراءات الروتينية.
              </p>
              <p style={{ fontSize: "16px", color: "#1A2744", fontWeight: 600, lineHeight: "1.9", marginBottom: "16px" }}>
                كل عميل يحصل على تقارير واضحة أثناء سير القضية — ليبقى القرار دائماً بين يديك أنت، لا بين يدي أحد آخر.
              </p>
              <p style={{ fontSize: "16px", color: "#6B6B6B", lineHeight: "1.9", marginBottom: "32px" }}>
                إن كنت تبحث عن وضوح حقيقي في تعاملك القانوني، فالتواصل معنا هو الخطوة الأولى لحماية موقفك — <strong style={{ color: "#1A2744" }}>قبل فوات الأوان.</strong>
              </p>
              <Link href="/contact" className="btn-primary">
                تحدث مع المكتب
              </Link>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
              {[
                { num: "17", label: "تخصصاً قانونياً" },
                { num: "300+", label: "عميل راضٍ" },
                { num: "جدة", label: "شارع التحلية" },
                { num: "98%", label: "رضا العملاء" },
              ].map(({ num, label }) => (
                <div key={label} style={{ background: "white", borderRadius: "16px", padding: "28px 20px", textAlign: "center", boxShadow: "0 4px 24px rgba(26,39,68,0.08)", border: "1px solid #E5E5E0" }}>
                  <div style={{ fontFamily: "'Noto Kufi Arabic', serif", fontSize: "36px", fontWeight: 900, color: "#C9A84C", marginBottom: "8px" }}>{num}</div>
                  <div style={{ fontSize: "14px", color: "#6B6B6B" }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Values */}
        <section style={{ background: "#1A2744", padding: "80px 24px" }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto", textAlign: "center" }}>
            <h2 style={{ fontFamily: "'Noto Kufi Arabic', serif", fontSize: "36px", fontWeight: 900, color: "white", marginBottom: "48px" }}>قيمنا الأساسية</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "24px" }}>
              {values.map(({ icon: Icon, title, desc }) => (
                <div key={title} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(201,168,76,0.2)", borderRadius: "16px", padding: "32px 24px" }}>
                  <div style={{ width: "56px", height: "56px", background: "rgba(201,168,76,0.15)", borderRadius: "14px", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
                    <Icon size={26} color="#C9A84C" />
                  </div>
                  <h3 style={{ fontFamily: "'Noto Kufi Arabic', serif", fontSize: "20px", fontWeight: 700, color: "#C9A84C", marginBottom: "10px" }}>{title}</h3>
                  <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.65)", lineHeight: "1.7" }}>{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Info */}
        <section style={{ background: "#FAFAF8", padding: "80px 24px" }}>
          <div style={{ maxWidth: "900px", margin: "0 auto", textAlign: "center" }}>
            <h2 style={{ fontFamily: "'Noto Kufi Arabic', serif", fontSize: "36px", fontWeight: 900, color: "#1A2744", marginBottom: "8px" }}>تواصل معنا</h2>
            <div className="gold-divider" />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "24px", marginTop: "40px" }}>
              {[
                { label: "الهاتف", value: "0555545533", sub: "0122635336" },
                { label: "البريد الإلكتروني", value: "alhusseinalmojan@gmail.com", sub: "" },
                { label: "العنوان", value: "جدة - شارع التحلية", sub: "خلف مبنى الرياض بلازا" },
              ].map(({ label, value, sub }) => (
                <div key={label} style={{ background: "white", borderRadius: "16px", padding: "32px 24px", boxShadow: "0 4px 24px rgba(26,39,68,0.08)", border: "1px solid #E5E5E0" }}>
                  <p style={{ fontSize: "13px", color: "#C9A84C", fontWeight: 700, marginBottom: "8px", letterSpacing: "1px" }}>{label}</p>
                  <p style={{ fontFamily: "'Noto Kufi Arabic', serif", fontSize: "17px", fontWeight: 700, color: "#1A2744" }}>{value}</p>
                  {sub && <p style={{ fontSize: "15px", color: "#6B6B6B", marginTop: "4px" }}>{sub}</p>}
                </div>
              ))}
            </div>
            <div style={{ marginTop: "40px" }}>
              <Link href="/contact" className="btn-primary" style={{ fontSize: "16px" }}>
                احجز استشارة مجانية
              </Link>
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
