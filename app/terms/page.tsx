import type { Metadata } from "next";
import Header from "@/components/layout/HeaderServer";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "الشروط والأحكام",
  description: "شروط وأحكام استخدام خدمات مكتب الحسين بن أحمد بن حسين السعدي للمحاماة.",
};

export default function TermsPage() {
  return (
    <>
      <Header />
      <main style={{ paddingTop: "72px" }}>
        <section className="gradient-hero" style={{ padding: "60px 24px", textAlign: "center" }}>
          <h1 style={{ fontFamily: "'Noto Kufi Arabic', serif", fontSize: "40px", fontWeight: 900, color: "white" }}>الشروط والأحكام</h1>
          <p style={{ color: "rgba(255,255,255,0.65)", marginTop: "12px" }}>آخر تحديث: مايو 2026</p>
        </section>
        <section style={{ background: "white", padding: "64px 24px" }}>
          <div style={{ maxWidth: "800px", margin: "0 auto", fontSize: "16px", lineHeight: "1.9", color: "#1C1C1E" }}>
            {[
              { title: "1. قبول الشروط", body: "باستخدامك لموقع مكتب الحسين بن أحمد بن حسين السعدي للمحاماة أو خدماته، فإنك تقر بموافقتك على هذه الشروط والأحكام. إن لم توافق على أي من هذه الشروط، يرجى التوقف عن استخدام الموقع." },
              { title: "2. طبيعة الخدمات", body: "يقدم المكتب استشارات قانونية مهنية وفق نظام المحاماة السعودي. المحتوى المتاح على الموقع للأغراض المعلوماتية العامة فقط ولا يُعد استشارة قانونية مُلزِمة. الاستشارة القانونية الرسمية تتطلب تعاقداً مباشراً مع المكتب." },
              { title: "3. المسؤولية المهنية", body: "يلتزم المكتب بأعلى معايير المهنة القانونية وفق ما تنص عليه الأنظمة السعودية. تسري على الخدمات القانونية أحكام نظام المحاماة السعودي ولوائحه التنفيذية." },
              { title: "4. السرية", body: "جميع المعلومات التي يقدمها العميل في سياق التعاقد مع المكتب تخضع لالتزامات السرية المهنية الصارمة وفق نظام المحاماة السعودي." },
              { title: "5. حقوق الملكية الفكرية", body: "جميع محتويات الموقع من نصوص وتصاميم ومقالات وشعارات هي ملكية حصرية لمكتب الحسين بن أحمد بن حسين السعدي للمحاماة، محمية بأنظمة الملكية الفكرية السعودية. يُحظر نسخها أو توزيعها دون إذن خطي مسبق." },
              { title: "6. القانون المطبق", body: "تخضع هذه الشروط لأحكام القانون السعودي، وتختص المحاكم السعودية بالفصل في أي نزاع ينشأ عنها." },
            ].map(({ title, body }) => (
              <div key={title} style={{ marginBottom: "40px" }}>
                <h2 style={{ fontFamily: "'Noto Kufi Arabic', serif", fontSize: "22px", fontWeight: 700, color: "#1A2744", marginBottom: "12px", paddingBottom: "8px", borderBottom: "2px solid #C9A84C" }}>
                  {title}
                </h2>
                <p style={{ color: "#4B4B4B" }}>{body}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
