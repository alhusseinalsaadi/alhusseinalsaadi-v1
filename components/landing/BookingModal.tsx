"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import ContactForm from "@/components/contact/ContactForm";

export const OPEN_BOOKING_MODAL_EVENT = "open-consultation-modal";

export function openBookingModal() {
  window.dispatchEvent(new Event(OPEN_BOOKING_MODAL_EVENT));
}

export default function BookingModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener(OPEN_BOOKING_MODAL_EVENT, handler);
    return () => window.removeEventListener(OPEN_BOOKING_MODAL_EVENT, handler);
  }, []);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      onClick={() => setOpen(false)}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(15, 27, 53, 0.75)",
        backdropFilter: "blur(4px)",
        zIndex: 2000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        animation: "modalFadeIn 0.25s ease",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#FAFAF8",
          borderRadius: "20px",
          maxWidth: "960px",
          width: "100%",
          maxHeight: "90vh",
          overflowY: "auto",
          position: "relative",
          padding: "40px 32px 32px",
          boxShadow: "0 24px 64px rgba(0,0,0,0.4)",
          animation: "modalSlideUp 0.3s ease",
        }}
      >
        <button
          onClick={() => setOpen(false)}
          aria-label="إغلاق"
          style={{
            position: "absolute",
            top: "16px",
            left: "16px",
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            border: "none",
            background: "rgba(26,39,68,0.08)",
            color: "#1A2744",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
        >
          <X size={18} />
        </button>

        <div style={{ textAlign: "center", marginBottom: "28px" }}>
          <h2
            style={{
              fontFamily: "'Noto Kufi Arabic', serif",
              fontSize: "clamp(22px, 3.5vw, 30px)",
              fontWeight: 900,
              color: "#1A2744",
              marginBottom: "8px",
            }}
          >
            احجز استشارتك المجانية الآن
          </h2>
          <p style={{ fontSize: "15px", color: "#6B6B6B" }}>
            عبّئ النموذج وسنتواصل معك خلال ساعة واحدة — بدون أي التزام مالي
          </p>
        </div>

        <ContactForm />
      </div>

      <style>{`
        @keyframes modalFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes modalSlideUp {
          from { opacity: 0; transform: translateY(24px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
}
