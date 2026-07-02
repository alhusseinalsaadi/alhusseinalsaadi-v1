"use client";

import { Phone, Mail, MapPin, Shield } from "lucide-react";

export default function Footer({
  phone1 = "0555545533",
  phone2 = "0122635336",
  email = "alhusseinalmojan@gmail.com",
  address = "جدة - شارع التحلية خلف مبنى الرياض بلازا",
}: {
  phone1?: string;
  phone2?: string;
  email?: string;
  address?: string;
}) {
  return (
    <footer style={{ background: "#0F1B35", padding: "48px 24px 24px" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto", textAlign: "center" }}>
        <img
          src="/h_logo.png"
          alt="مكتب الحسين بن أحمد بن حسين السعدي للمحاماة"
          style={{ height: "60px", width: "auto", objectFit: "contain", margin: "0 auto 20px", filter: "brightness(0) invert(1)", opacity: 0.85 }}
        />

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "24px",
            marginBottom: "24px",
            color: "rgba(255,255,255,0.7)",
            fontSize: "14px",
          }}
        >
          <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
            <Phone size={14} color="#C9A84C" /> {phone1}
          </span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
            <Phone size={14} color="#C9A84C" /> {phone2}
          </span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
            <Mail size={14} color="#C9A84C" /> {email}
          </span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
            <MapPin size={14} color="#C9A84C" /> {address}
          </span>
        </div>

        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            marginBottom: "20px",
            color: "rgba(201,168,76,0.9)",
            fontSize: "13px",
          }}
        >
          <Shield size={13} />
          مرخص من هيئة المحامين السعوديين | رقم الترخيص: 421848
        </div>

        <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "12px", borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "16px" }}>
          © {new Date().getFullYear()} مكتب الحسين بن أحمد بن حسين السعدي للمحاماة — جميع الحقوق محفوظة
        </p>
      </div>
    </footer>
  );
}
