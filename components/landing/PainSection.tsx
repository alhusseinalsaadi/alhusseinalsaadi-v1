"use client";

import { AlertTriangle, TrendingDown, Clock, DollarSign } from "lucide-react";

export default function PainSection() {
  const pains = [
    {
      icon: TrendingDown,
      title: "التكاليف تتراكم",
      description:
        "كلما طال أمد النزاع القانوني، زادت الرسوم والالتزامات المترتبة عليه. المعالجة المبكرة توفر عليك الكثير.",
      cost: "معالجة مبكرة",
      costLabel: "توفير في التكاليف",
    },
    {
      icon: Clock,
      title: "المهل النظامية محدودة",
      description:
        "بعض الحقوق ترتبط بمهل نظامية محددة في الأنظمة السعودية. معرفة موقفك القانوني مبكراً تحفظ خياراتك كاملة.",
      cost: "مهل محددة",
      costLabel: "وفق الأنظمة السعودية",
    },
    {
      icon: AlertTriangle,
      title: "راحة البال لها قيمة",
      description:
        "وجود خطة قانونية واضحة يريحك من القلق المستمر ويتيح لك التركيز على عملك وعائلتك.",
      cost: "خطة واضحة",
      costLabel: "بدل القلق المستمر",
    },
    {
      icon: DollarSign,
      title: "القرار المدروس أفضل",
      description:
        "التصرف بدون رأي قانوني متخصص قد يعقّد موقفك. استشارة واحدة مبكرة تجنّبك خطوات يصعب تصحيحها.",
      cost: "استشارة واحدة",
      costLabel: "تجنّبك تعقيدات لاحقة",
    },
  ];

  return (
    <section className="gradient-hero" style={{ padding: "80px 24px" }}>
      <div style={{ maxWidth: "1152px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "64px" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "rgba(239,68,68,0.12)",
              border: "1px solid rgba(239,68,68,0.35)",
              borderRadius: "999px",
              padding: "6px 16px",
              marginBottom: "20px",
            }}
          >
            <AlertTriangle size={13} color="#EF4444" />
            <span style={{ color: "#EF4444", fontSize: "12px", fontWeight: 600 }}>
              التوقيت مهم في القانون
            </span>
          </div>
          <h2
            style={{
              fontFamily: "'Noto Kufi Arabic', serif",
              fontSize: "clamp(28px, 4vw, 44px)",
              fontWeight: 900,
              color: "white",
              lineHeight: "1.25",
              marginBottom: "16px",
            }}
          >
            <span style={{ color: "#EF4444" }}>لماذا التبكير</span> في الاستشارة القانونية يصب في مصلحتك؟
          </h2>
          <p
            style={{
              fontSize: "18px",
              color: "rgba(255,255,255,0.65)",
              lineHeight: "1.8",
              maxWidth: "600px",
              margin: "0 auto",
            }}
          >
            من واقع خبرة 15+ سنة: أفضل النتائج القانونية تبدأ بخطوة مبكرة — والاستشارة الأولى مجانية.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(280px, 100%), 1fr))",
            gap: "24px",
            marginBottom: "40px",
          }}
        >
          {pains.map((pain: any, index: any) => {
            const Icon = pain.icon;
            return (
              <div
                key={index}
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(239,68,68,0.2)",
                  borderRadius: "16px",
                  padding: "28px",
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                  position: "relative",
                  overflow: "hidden",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "rgba(239,68,68,0.5)";
                  el.style.background = "rgba(239,68,68,0.08)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "rgba(239,68,68,0.2)";
                  el.style.background = "rgba(255,255,255,0.03)";
                }}
              >
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "48px",
                    height: "48px",
                    background: "rgba(239,68,68,0.15)",
                    borderRadius: "12px",
                    marginBottom: "16px",
                  }}
                >
                  <Icon size={24} color="#EF4444" />
                </div>
                <h3
                  style={{
                    fontFamily: "'Noto Kufi Arabic', serif",
                    fontSize: "18px",
                    fontWeight: 700,
                    color: "white",
                    marginBottom: "12px",
                  }}
                >
                  {pain.title}
                </h3>
                <p
                  style={{
                    color: "rgba(255,255,255,0.65)",
                    fontSize: "15px",
                    lineHeight: "1.7",
                    marginBottom: "16px",
                  }}
                >
                  {pain.description}
                </p>
                <div
                  style={{
                    borderTop: "1px solid rgba(239,68,68,0.2)",
                    paddingTop: "16px",
                  }}
                >
                  <div
                    style={{
                      color: "#EF4444",
                      fontSize: "22px",
                      fontWeight: 900,
                      fontFamily: "'Noto Kufi Arabic', serif",
                      marginBottom: "4px",
                    }}
                  >
                    {pain.cost}
                  </div>
                  <div
                    style={{
                      color: "rgba(255,255,255,0.45)",
                      fontSize: "12px",
                    }}
                  >
                    {pain.costLabel}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ textAlign: "center" }}>
          <div
            style={{
              display: "inline-block",
              background: "rgba(201,168,76,0.15)",
              borderRadius: "12px",
              padding: "24px 32px",
              border: "1px solid rgba(201,168,76,0.3)",
            }}
          >
            <p
              style={{
                color: "rgba(255,255,255,0.65)",
                fontSize: "15px",
                marginBottom: "12px",
              }}
            >
              الحل بسيط:
            </p>
            <p
              style={{
                fontFamily: "'Noto Kufi Arabic', serif",
                fontSize: "22px",
                fontWeight: 700,
                color: "#C9A84C",
              }}
            >
              تواصل معنا اليوم للحصول على استشارة قانونية متخصصة مجاناً
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
