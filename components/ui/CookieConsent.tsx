"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) setVisible(true);
  }, []);

  const accept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        right: 0,
        left: 0,
        background: "#1A2744",
        borderTop: "2px solid #C9A84C",
        padding: "20px 24px",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: "16px",
      }}
    >
      <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "14px", flex: 1, minWidth: "260px" }}>
        نستخدم ملفات تعريف الارتباط لتحسين تجربتك. بالاستمرار في تصفح الموقع، توافق على{" "}
        <Link href="/privacy-policy" style={{ color: "#C9A84C" }}>
          سياسة الخصوصية
        </Link>
        . (وفق نظام حماية البيانات الشخصية السعودي 1445هـ)
      </p>
      <div style={{ display: "flex", gap: "12px", flexShrink: 0 }}>
        <Link
          href="/privacy-policy"
          style={{
            border: "1px solid rgba(255,255,255,0.3)",
            color: "rgba(255,255,255,0.7)",
            padding: "10px 20px",
            borderRadius: "8px",
            textDecoration: "none",
            fontSize: "14px",
            fontWeight: 500,
          }}
        >
          إعدادات
        </Link>
        <button
          onClick={accept}
          style={{
            background: "#C9A84C",
            color: "#1A2744",
            border: "none",
            padding: "10px 24px",
            borderRadius: "8px",
            fontWeight: 700,
            fontSize: "14px",
            cursor: "pointer",
            fontFamily: "'IBM Plex Arabic', sans-serif",
          }}
        >
          أوافق
        </button>
      </div>
    </div>
  );
}
