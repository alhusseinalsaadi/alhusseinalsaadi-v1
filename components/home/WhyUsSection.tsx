import { Shield, Clock, Users, BookOpen, Award, Headphones } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "سرية تامة",
    desc: "نضمن حماية كاملة لمعلوماتك وأسرار علاقتك القانونية وفق أعلى معايير الأمان المهني.",
  },
  {
    icon: Clock,
    title: "استجابة سريعة",
    desc: "فريقنا متاح للرد على استفساراتك في غضون ساعة واحدة خلال أوقات العمل.",
  },
  {
    icon: Users,
    title: "فريق متخصص",
    desc: "محامون معتمدون بخبرات متنوعة في جميع تخصصات القانون السعودي والدولي.",
  },
  {
    icon: BookOpen,
    title: "إلمام بالأنظمة",
    desc: "متابعة دائمة لأحدث الأنظمة واللوائح السعودية لضمان أفضل تمثيل قانوني لمصلحتك.",
  },
  {
    icon: Award,
    title: "مكتب معتمد",
    desc: "مرخص رسمياً من هيئة المحامين السعوديين ومعتمد لدى جميع المحاكم والجهات الحكومية.",
  },
  {
    icon: Headphones,
    title: "دعم مستمر",
    desc: "متابعة دورية لملفاتك القانونية وتحديثات منتظمة بكل ما يخص قضاياك وعقودك.",
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
                fontSize: "40px",
                fontWeight: 900,
                color: "#1A2744",
                marginBottom: "16px",
                lineHeight: "1.3",
              }}
            >
              لماذا يختارنا عملاؤنا مراراً وتكراراً؟
            </h2>
            <div className="gold-divider-right" />
            <p style={{ fontSize: "17px", color: "#6B6B6B", lineHeight: "1.8", marginBottom: "32px" }}>
              نؤمن بأن الخدمة القانونية الممتازة تبنى على الثقة والشفافية والنتائج الملموسة.
              أكثر من 300 عميل وثقوا بنا خلال 15 عاماً.
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
                  ابدأ باستشارة مجانية مع سالم
                </div>
                <div style={{ color: "rgba(255,255,255,0.6)", fontSize: "14px" }}>
                  مستشارنا الذكي متاح الآن — اطرح سؤالك القانوني واحصل على إجابة فورية
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
            {features.map((feature) => {
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
