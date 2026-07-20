"use client";

import { MessageSquare, Search, Briefcase, FileCheck, CheckCircle } from "lucide-react";

export default function ProcessSection() {
  const steps = [
    {
      number: 1,
      icon: MessageSquare,
      title: "الاتصال الأول",
      description: "تواصل معنا عبر WhatsApp أو الهاتف أو استمارة التواصل",
      time: "فوري",
    },
    {
      number: 2,
      icon: Search,
      title: "تقييم الحالة",
      description: "نقيّم حالتك بعمق ونفهم كل التفاصيل بسرية تامة",
      time: "ساعة واحدة",
    },
    {
      number: 3,
      icon: Briefcase,
      title: "الاستراتيجية القانونية",
      description: "نطور خطة قانونية مخصصة تناسب وضعك تماماً",
      time: "3 أيام",
    },
    {
      number: 4,
      icon: FileCheck,
      title: "التمثيل القانوني",
      description: "نمثلك أمام المحاكم والجهات المختصة بكفاءة واحترافية",
      time: "مستمر",
    },
    {
      number: 5,
      icon: CheckCircle,
      title: "المتابعة والإنجاز",
      description: "نتابع القضية حتى الانتهاء ونضمن حقوقك بالكامل",
      time: "نهائي",
    },
  ];

  return (
    <section style={{ padding: "80px 24px", background: "#FFFFFF" }}>
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
            <CheckCircle size={13} color="#C9A84C" />
            <span style={{ color: "#C9A84C", fontSize: "12px", fontWeight: 600 }}>
              العملية بسيطة وواضحة
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
            كيف نعمل معك؟
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
            عملية واضحة وسهلة من الاتصال الأول إلى الانتهاء من قضيتك
          </p>
        </div>

        <div style={{ position: "relative", padding: "40px 0" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "24px",
              position: "relative",
              zIndex: 1,
            }}
          >
            {steps.map((step: any, index: any) => {
              const Icon = step.icon;
              return (
                <div key={index} style={{ textAlign: "center" }}>
                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "80px",
                      height: "80px",
                      background: "linear-gradient(135deg, rgba(201,168,76,0.2) 0%, rgba(201,168,76,0.1) 100%)",
                      border: "2px solid rgba(201,168,76,0.5)",
                      borderRadius: "50%",
                      margin: "0 auto 20px",
                      position: "relative",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "column",
                        zIndex: 1,
                      }}
                    >
                      <Icon size={32} color="#C9A84C" />
                      <span
                        style={{
                          fontWeight: 700,
                          color: "#C9A84C",
                          fontSize: "12px",
                          marginTop: "4px",
                        }}
                      >
                        الخطوة {step.number}
                      </span>
                    </div>
                  </div>

                  <h3
                    style={{
                      fontFamily: "'Noto Kufi Arabic', serif",
                      fontSize: "18px",
                      fontWeight: 700,
                      color: "#1A2744",
                      marginBottom: "8px",
                    }}
                  >
                    {step.title}
                  </h3>
                  <p
                    style={{
                      color: "#6B6B6B",
                      fontSize: "14px",
                      lineHeight: "1.6",
                      marginBottom: "12px",
                    }}
                  >
                    {step.description}
                  </p>
                  <div
                    style={{
                      display: "inline-block",
                      background: "rgba(201,168,76,0.1)",
                      padding: "4px 12px",
                      borderRadius: "20px",
                      fontSize: "12px",
                      color: "#9C7A2E",
                      fontWeight: 600,
                    }}
                  >
                    {step.time}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
