"use client";

import { ArrowLeft, Phone, MessageCircle, CheckCircle } from "lucide-react";
import { openBookingModal } from "@/components/landing/BookingModal";

export default function FinalCTASection({
  whatsappNumber = "966555545533",
  phoneNumber = "0555545533",
}: {
  whatsappNumber?: string;
  phoneNumber?: string;
}) {
  return (
    <section
      className="gradient-hero"
      style={{
        padding: "128px 24px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(circle at 20% 80%, rgba(201,168,76,0.08) 0%, transparent 60%), radial-gradient(circle at 80% 20%, rgba(201,168,76,0.05) 0%, transparent 40%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: "896px", margin: "0 auto", position: "relative", zIndex: 10 }}>
        <div style={{ textAlign: "center", marginBottom: "64px" }}>
          <h2
            style={{
              fontFamily: "'Noto Kufi Arabic', serif",
              fontSize: "clamp(32px, 5vw, 52px)",
              fontWeight: 900,
              color: "white",
              lineHeight: "1.25",
              marginBottom: "20px",
            }}
          >
            لا تتركها تتفاقم
            <br />
            <span style={{ color: "#C9A84C" }}>تصرف اليوم</span>
          </h2>
          <p
            style={{
              fontSize: "18px",
              color: "rgba(255,255,255,0.65)",
              lineHeight: "1.8",
              marginBottom: "32px",
              maxWidth: "600px",
              margin: "0 auto 32px",
            }}
          >
            كل يوم تنتظره يزيد من تعقيد الوضع والتكاليف المالية والقانونية. احصل على استشارة مجانية من محام متخصص الآن.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "16px",
            marginBottom: "40px",
          }}
        >
          {[
            { icon: CheckCircle, text: "مجاني 100%" },
            { icon: CheckCircle, text: "بدون التزام" },
            { icon: CheckCircle, text: "سري تماماً" },
            { icon: CheckCircle, text: "رد فوري على واتساب" },
          ].map((badge: any, i: any) => {
            const Icon = badge.icon;
            return (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  background: "rgba(201,168,76,0.1)",
                  padding: "12px 16px",
                  borderRadius: "8px",
                  justifyContent: "center",
                }}
              >
                <Icon size={16} color="#C9A84C" />
                <span style={{ color: "#C9A84C", fontSize: "14px", fontWeight: 600 }}>{badge.text}</span>
              </div>
            );
          })}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "500px", margin: "0 auto 48px" }}>
          <button
            onClick={openBookingModal}
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              background: "linear-gradient(135deg, #C9A84C 0%, #D4B85F 100%)",
              color: "#1a1a1a",
              padding: "16px 32px",
              borderRadius: "12px",
              textDecoration: "none",
              fontSize: "16px",
              fontWeight: 700,
              transition: "all 0.3s ease",
              border: "none",
              cursor: "pointer",
              boxShadow: "0 8px 24px rgba(201,168,76,0.3)",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.transform = "translateY(-2px)";
              el.style.boxShadow = "0 12px 32px rgba(201,168,76,0.4)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.transform = "translateY(0)";
              el.style.boxShadow = "0 8px 24px rgba(201,168,76,0.3)";
            }}
          >
            احجز استشارة مجانية الآن
            <ArrowLeft size={18} style={{ transform: "scaleX(-1)" }} />
          </button>

          <div style={{ display: "flex", gap: "12px" }}>
            <a
              href={`https://wa.me/${whatsappNumber.replace(/\D/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                border: "2px solid rgba(201,168,76,0.4)",
                color: "#C9A84C",
                padding: "14px 24px",
                borderRadius: "10px",
                textDecoration: "none",
                fontSize: "15px",
                fontWeight: 600,
                background: "rgba(201,168,76,0.08)",
                transition: "all 0.3s ease",
                flex: 1,
              }}
            >
              <MessageCircle size={16} />
              WhatsApp
            </a>
            <a
              href={`tel:${phoneNumber}`}
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                border: "2px solid rgba(201,168,76,0.4)",
                color: "#C9A84C",
                padding: "14px 24px",
                borderRadius: "10px",
                textDecoration: "none",
                fontSize: "15px",
                fontWeight: 600,
                background: "rgba(201,168,76,0.08)",
                transition: "all 0.3s ease",
                flex: 1,
              }}
            >
              <Phone size={16} />
              اتصل الآن
            </a>
          </div>
        </div>

        <div
          style={{
            background: "rgba(201,168,76,0.08)",
            border: "1px solid rgba(201,168,76,0.3)",
            borderRadius: "12px",
            padding: "24px",
            textAlign: "center",
          }}
        >
          <p style={{ color: "#C9A84C", fontSize: "14px", fontWeight: 600, marginBottom: "8px" }}>
            معلومة نظامية:
          </p>
          <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "15px", lineHeight: "1.7" }}>
            بعض الحقوق في الأنظمة السعودية ترتبط بمهل زمنية محددة للمطالبة بها. استشارة مبكرة — ولو بسؤال واحد على واتساب — تحفظ لك خياراتك كاملة.
          </p>
        </div>

        <p style={{ marginTop: "32px", textAlign: "center", color: "rgba(255,255,255,0.45)", fontSize: "14px" }}>
          أكثر من 300 عميل اختاروا الثقة في حماية حقوقهم. كن أنت الجزء التالي من قصص النجاح.
        </p>
      </div>
    </section>
  );
}
