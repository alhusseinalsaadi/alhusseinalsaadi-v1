import { Shield, Clock, Users, BookOpen, Award, Headphones } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "سريتك خط أحمر",
    desc: "ما تقوله في مكتبنا يبقى في مكتبنا — بلا استثناء. ثقتك أمانة نحملها بكامل المسؤولية المهنية والأخلاقية.",
  },
  {
    icon: Clock,
    title: "لا وقت ضائع",
    desc: "نرد في غضون ساعة. لأننا نعرف أن في القانون، التأخير قد يعني الفرق بين حق محفوظ وحق ضائع.",
  },
  {
    icon: Users,
    title: "خبرة لا تُشترى",
    desc: "سنوات من العمل الميداني في المحاكم السعودية تعني أننا لا نخمّن — نعرف كيف تسير الأمور فعلياً.",
  },
  {
    icon: BookOpen,
    title: "نظام متغير، نحن ثابتون",
    desc: "الأنظمة السعودية تتطور باستمرار. نحن نتابع كل تحديث حتى لا تدفع أنت ثمن جهل شخص آخر.",
  },
  {
    icon: Award,
    title: "اعتماد رسمي، راحة بال حقيقية",
    desc: "مرخصون من هيئة المحامين السعوديين ومعتمدون لدى كل المحاكم. ملفك في يد من يُؤتمن.",
  },
  {
    icon: Headphones,
    title: "أنت لست رقم قضية",
    desc: "نتابع ملفك بشكل شخصي ونُبقيك على اطلاع دائم. لأن هدوءك أثناء القضية جزء من انتصارك.",
  },
];

export default function WhyUsSection() {
  return (
    <section style={{ background: "#FAFAF8", padding: "96px 24px" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "80px",
            alignItems: "center",
          }}
        >
          {/* Left — Text */}
          <div>
            <p style={{ color: "#C9A84C", fontWeight: 600, fontSize: "14px", letterSpacing: "2px", marginBottom: "12px" }}>
              لماذا نحن
            </p>
            <h2
              style={{
                fontFamily: "'Noto Kufi Arabic', serif",
                fontSize: "38px",
                fontWeight: 900,
                color: "#1A2744",
                marginBottom: "16px",
                lineHeight: "1.35",
              }}
            >
              حين يكون القرار مصيرياً،<br />من تثق به؟
            </h2>
            <div className="gold-divider-right" />
            <p style={{ fontSize: "17px", color: "#6B6B6B", lineHeight: "1.9", marginBottom: "12px" }}>
              في اللحظات الحرجة، لا مكان للتجربة والخطأ. أنت لا تحتاج محامياً — أنت تحتاج شريكاً يفهم وضعك،
              يُصارحك بالحقيقة، ويقاتل من أجل مصلحتك حتى آخر سطر في الحكم.
            </p>
            <p style={{ fontSize: "16px", color: "#1A2744", fontWeight: 600, lineHeight: "1.8", marginBottom: "32px" }}>
              أكثر من 300 عميل اختاروا مكتبنا — ليس لأننا الأرخص، بل لأننا الأجدر بثقتهم.
            </p>

            <div
              style={{
                background: "#1A2744",
                borderRadius: "16px",
                padding: "24px 28px",
                display: "flex",
                alignItems: "center",
                gap: "16px",
              }}
            >
              <div
                style={{
                  width: "56px",
                  height: "56px",
                  background: "#C9A84C",
                  borderRadius: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <span
                  style={{
                    fontFamily: "'Noto Kufi Arabic', serif",
                    fontSize: "22px",
                    fontWeight: 900,
                    color: "#1A2744",
                  }}
                >
                  س
                </span>
              </div>
              <div>
                <div
                  style={{
                    color: "white",
                    fontWeight: 700,
                    fontSize: "16px",
                    marginBottom: "4px",
                  }}
                >
                  لديك سؤال قانوني الآن؟
                </div>
                <div style={{ color: "rgba(255,255,255,0.6)", fontSize: "14px" }}>
                  سالم يجيبك فوراً — مجاناً، وبدون التزام
                </div>
              </div>
            </div>
          </div>

          {/* Right — Features Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "20px",
            }}
          >
            {features.map((feature: any) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  style={{
                    background: "white",
                    borderRadius: "16px",
                    padding: "24px",
                    boxShadow: "0 4px 24px rgba(26,39,68,0.06)",
                    transition: "all 0.3s",
                    border: "1px solid #E5E5E0",
                  }}
                >
                  <div
                    style={{
                      width: "44px",
                      height: "44px",
                      background: "rgba(201,168,76,0.1)",
                      borderRadius: "10px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: "12px",
                    }}
                  >
                    <Icon size={22} color="#C9A84C" />
                  </div>
                  <h3
                    style={{
                      fontFamily: "'Noto Kufi Arabic', serif",
                      fontSize: "16px",
                      fontWeight: 700,
                      color: "#1A2744",
                      marginBottom: "8px",
                    }}
                  >
                    {feature.title}
                  </h3>
                  <p style={{ fontSize: "13px", color: "#6B6B6B", lineHeight: "1.7" }}>
                    {feature.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          section > div > div {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
