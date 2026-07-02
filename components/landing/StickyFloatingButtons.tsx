"use client";

import { useState, useEffect } from "react";
import { MessageCircle, Phone, Calendar, X } from "lucide-react";
import { openBookingModal } from "@/components/landing/BookingModal";

export default function StickyFloatingButtons({
  whatsappNumber = "966555545533",
  phoneNumber = "0555545533",
}: {
  whatsappNumber?: string;
  phoneNumber?: string;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [showCallout, setShowCallout] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const calloutTimer = setTimeout(() => setShowCallout(true), 10000);
    return () => clearTimeout(calloutTimer);
  }, []);

  if (!isVisible) return null;

  const buttons = [
    {
      icon: MessageCircle,
      label: "WhatsApp",
      iconColor: "#25D366",
      href: `https://wa.me/${whatsappNumber.replace(/\D/g, "")}`,
      action: "whatsapp",
    },
    {
      icon: Phone,
      label: "اتصل الآن",
      iconColor: "#C9A84C",
      href: `tel:${phoneNumber}`,
      action: "call",
    },
    {
      icon: Calendar,
      label: "احجز استشارة مجانية",
      iconColor: "#1A2744",
      href: undefined,
      action: "book",
    },
  ];

  const sharedButtonStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    background: "#FFFFFF",
    border: "1px solid rgba(201,168,76,0.3)",
    color: "#1A2744",
    padding: "12px 18px",
    borderRadius: "10px",
    textDecoration: "none",
    fontWeight: 600,
    fontSize: "14px",
    transition: "all 0.3s ease",
    cursor: "pointer",
    whiteSpace: "nowrap",
    boxShadow: "0 4px 16px rgba(26,39,68,0.15)",
  };

  const handleHoverIn = (e: React.MouseEvent) => {
    const el = e.currentTarget as HTMLElement;
    el.style.background = "#C9A84C";
    el.style.borderColor = "#C9A84C";
    el.style.transform = "translateX(8px)";
  };
  const handleHoverOut = (e: React.MouseEvent) => {
    const el = e.currentTarget as HTMLElement;
    el.style.background = "#FFFFFF";
    el.style.borderColor = "rgba(201,168,76,0.3)";
    el.style.transform = "translateX(0)";
  };

  return (
    <div
      style={{
        position: "fixed",
        bottom: "24px",
        right: "24px",
        zIndex: 999,
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        alignItems: "flex-end",
      }}
    >
      {expanded && (
        <div style={{ display: "flex", flexDirection: "column", gap: "12px", animation: "slideUpLanding 0.3s ease" }}>
          {buttons.map((button, index) => {
            const Icon = button.icon;
            if (button.action === "book") {
              return (
                <button
                  key={index}
                  onClick={() => {
                    openBookingModal();
                    setExpanded(false);
                  }}
                  style={sharedButtonStyle}
                  onMouseEnter={handleHoverIn}
                  onMouseLeave={handleHoverOut}
                >
                  {button.label}
                  <Icon size={18} color={button.iconColor} />
                </button>
              );
            }
            return (
              <a
                key={index}
                href={button.href}
                target={button.action === "whatsapp" ? "_blank" : undefined}
                rel={button.action === "whatsapp" ? "noopener noreferrer" : undefined}
                style={sharedButtonStyle}
                onMouseEnter={handleHoverIn}
                onMouseLeave={handleHoverOut}
              >
                {button.label}
                <Icon size={18} color={button.iconColor} />
              </a>
            );
          })}
        </div>
      )}

      <div style={{ position: "relative" }}>
        {showCallout && (
          <div
            style={{
              position: "absolute",
              bottom: "80px",
              right: "70px",
              background: "rgba(201, 168, 76, 0.95)",
              color: "#0f172a",
              padding: "12px 16px",
              borderRadius: "8px",
              fontSize: "13px",
              fontWeight: 600,
              whiteSpace: "nowrap",
              animation: "slideUpLanding 0.4s ease",
              boxShadow: "0 4px 16px rgba(0, 0, 0, 0.3)",
              zIndex: 1000,
            }}
            onAnimationEnd={() => {
              setTimeout(() => setShowCallout(false), 4000);
            }}
          >
            تواصل معنا الآن!
          </div>
        )}

        <button
          onClick={() => setExpanded(!expanded)}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "60px",
            height: "60px",
            background: "linear-gradient(135deg, #C9A84C 0%, #D4B85F 100%)",
            color: "#0f172a",
            border: "none",
            borderRadius: "50%",
            cursor: "pointer",
            fontSize: "28px",
            transition: "all 0.3s ease",
            boxShadow: "0 6px 20px rgba(201, 168, 76, 0.4)",
            animation: expanded ? "none" : "pulseLanding 2s infinite",
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.transform = "scale(1.1)";
            el.style.boxShadow = "0 8px 28px rgba(201, 168, 76, 0.6)";
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.transform = "scale(1)";
            el.style.boxShadow = "0 6px 20px rgba(201, 168, 76, 0.4)";
          }}
        >
          {expanded ? <X size={28} /> : "💬"}
        </button>
      </div>

      <style>{`
        @keyframes slideUpLanding {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulseLanding {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
      `}</style>
    </div>
  );
}
