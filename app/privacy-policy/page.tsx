import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "سياسة الخصوصية",
  description: "سياسة خصوصية مكتب الحسين بن أحمد بن حسين السعدي للمحاماة وكيفية حماية بياناتك الشخصية.",
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <Header />
      <main style={{ paddingTop: "72px" }}>
        <section className="gradient-hero" style={{ padding: "60px 24px", textAlign: "center" }}>
          <h1 style={{ fontFamily: "'Noto Kufi Arabic', serif", fontSize: "40px", fontWeight: 900, color: "white" }}>سياسة الخصوصية</h1>
          <p style={{ color: "rgba(255,255,255,0.65)", marginTop: "12px" }}>آخر تحديث: مايو 2026 — وفق نظام حماية البيانات الشخصية السعودي 1445هـ</p>
        </section>
        <section style={{ background: "white", padding: "64px 24px" }}>
          <div style={{ maxWidth: "800px", margin: "0 auto", fontSize: "16px", lineHeight: "1.9", color: "#1C1C1E" }}>
            {[
              { title: "1. المعلومات التي نجمعها", body: "نجمع المعلومات التي تقدمها طوعاً عند التواصل معنا، بما تشمل: الاسم، رقم الجوال، البريد الإلكتروني، وطبيعة الاستشارة القانونية المطلوبة. كما نجمع بيانات تقنية مجهولة الهوية مثل نوع المتصفح ووقت الزيارة." },
              { title: "2. كيف نستخدم معلوماتك", body: "نستخدم بياناتك حصراً لتقديم الخدمات القانونية المطلوبة، والتواصل معك بشأن طلبك، وتحسين جودة خدماتنا. لا نشارك بياناتك مع أطراف ثالثة دون موافقتك الصريحة، إلا ما تستلزمه الإجراءات القانونية." },
              { title: "3. السرية المهنية", body: "جميع المعلومات التي تشاركها معنا في سياق الاستشارة القانونية تخضع للسرية المهنية المكفولة بنظام المحاماة السعودي ولا يمكن الإفصاح عنها في أي ظرف إلا بموافقتك." },
              { title: "4. حقوقك وفق النظام السعودي", body: "وفق نظام حماية البيانات الشخصية السعودي 1445هـ، لديك الحق في: الاطلاع على بياناتك المحفوظة لدينا، طلب تصحيحها أو حذفها، الاعتراض على معالجتها، وسحب موافقتك في أي وقت." },
              { title: "5. ملفات تعريف الارتباط (Cookies)", body: "نستخدم ملفات تعريف الارتباط لتحسين تجربتك في الموقع وقياس الأداء التقني. يمكنك رفضها من إعدادات متصفحك مع العلم أن ذلك قد يؤثر على بعض وظائف الموقع." },
              { title: "6. التواصل معنا", body: "لأي استفسار حول سياسة الخصوصية أو لممارسة حقوقك، تواصل معنا على: alhusseinalmojan@gmail.com أو على هاتف 0555533554." },
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
