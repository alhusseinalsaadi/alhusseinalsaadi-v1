"use client";

import {
  Shield,
  Clock,
  Users,
  Lock,
  BadgeCheck,
  HeartHandshake,
  CheckCircle,
  Star,
} from "lucide-react";

export default function WhyUsSection() {
  const reasons = [
    {
      icon: BadgeCheck,
      title: "مرخص ومعتمد رسمياً",
      description:
        "مرخص من هيئة المحامين السعوديين برقم 421848 — يمكنك التحقق من الترخيص بنفسك.",
      highlight: "ترخيص رقم 421848",
    },
    {
      icon: Users,
      title: "فريق متخصص محترف",
      description:
        "محامون معتمدون من هيئة المحامين السعوديين بخبرة 15+ سنة في القانون السعودي.",
      highlight: "15+ سنة خبرة",
    },
    {
      icon: Shield,
      title: "سرية تامة لحالتك",
      description:
        "كل حالة يتم التعامل معها بسرية كاملة وفق أعلى معايير المهنة القانونية.",
      highlight: "سرية 100%",
    },
    {
      icon: Clock,
      title: "سرعة استجابة فائقة",
      description:
        "رد فوري على واتساب والاتصال، وخلال ساعة واحدة على النماذج. لا تنتظر أياماً.",
      highlight: "رد فوري على واتساب",
    },
    {
      icon: Lock,
      title: "شفافية في الرسوم",
      description:
        "نخبرك بالتكاليف مقدماً كتابياً قبل بدء أي عمل. لا توجد رسوم مخفية أو مفاجآت.",
      highlight: "بدون مفاجآت",
    },
    {
      icon: HeartHandshake,
      title: "متابعة حتى الإنجاز",
      description:
        "نتابع قضيتك خطوة بخطوة حتى الانتهاء ونبقيك على اطلاع بكل تحديث — لست وحيداً.",
      highlight: "دعم مستمر",
    },
  ];

  return (
    <section
      style={{
        padding: "80px 24px",
        background: "#FFFFFF",
      }}
    >
      <div style={{ maxWidth: "1152px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "64px" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "rgba(201,168,76,0.12)",
              border: "1px solid rgba(201,168,76,0.35)",
              borderRadius: "999px",
              padding: "6px 16px",
              marginBottom: "20px",
            }}
          >
            <Star size={13} color="#C9A84C" />
            <span style={{ color: "#C9A84C", fontSize: "12px", fontWeight: 600 }}>
              لماذا نحن؟
            </span>
          </div>
          <h2
            style={{
              fontFamily: "'Noto Kufi Arabic', serif",
              fontSize: "clamp(28px, 4vw, 44px)",
              fontWeight: 900,
              color: "#1A2744",
              lineHeight: "1.25",
              marginBottom: "16px",
            }}
          >
            <span style={{ color: "#C9A84C" }}>الاختيار الموثوق</span> للعملاء الذين
            يريدون الأفضل
          </h2>
          <p
            style={{
              fontSize: "18px",
              color: "#6B6B6B",
              lineHeight: "1.8",
              maxWidth: "600px",
              margin: "0 auto",
            }}
          >
            أكثر من 300 موكل اختاروا الثقة في قدرتنا على حماية حقوقهم.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(360px, 100%), 1fr))",
            gap: "28px",
            marginBottom: "48px",
          }}
        >
          {reasons.map((reason: any, index: any) => {
            const Icon = reason.icon;
            return (
              <div
                key={index}
                style={{
                  position: "relative",
                  padding: "32px 28px",
                  background: "#FFFFFF",
                  border: "1px solid rgba(201,168,76,0.25)",
                  borderRadius: "16px",
                  boxShadow: "0 4px 24px rgba(26,39,68,0.06)",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "rgba(201,168,76,0.6)";
                  el.style.boxShadow = "0 8px 32px rgba(26,39,68,0.12)";
                  el.style.transform = "translateY(-4px)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "rgba(201,168,76,0.25)";
                  el.style.boxShadow = "0 4px 24px rgba(26,39,68,0.06)";
                  el.style.transform = "translateY(0)";
                }}
              >
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "52px",
                    height: "52px",
                    background: "rgba(201,168,76,0.15)",
                    borderRadius: "12px",
                    marginBottom: "16px",
                  }}
                >
                  <Icon size={26} color="#C9A84C" />
                </div>
                <h3
                  style={{
                    fontFamily: "'Noto Kufi Arabic', serif",
                    fontSize: "20px",
                    fontWeight: 700,
                    color: "#1A2744",
                    marginBottom: "12px",
                  }}
                >
                  {reason.title}
                </h3>
                <p
                  style={{
                    color: "#6B6B6B",
                    fontSize: "15px",
                    lineHeight: "1.8",
                    marginBottom: "16px",
                  }}
                >
                  {reason.description}
                </p>
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    background: "rgba(201,168,76,0.1)",
                    padding: "6px 12px",
                    borderRadius: "8px",
                  }}
                >
                  <CheckCircle size={14} color="#C9A84C" />
                  <span
                    style={{
                      color: "#C9A84C",
                      fontSize: "12px",
                      fontWeight: 600,
                    }}
                  >
                    {reason.highlight}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
