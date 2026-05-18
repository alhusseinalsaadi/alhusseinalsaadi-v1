import Link from "next/link";
import { Phone, Mail, MapPin, Share2 } from "lucide-react";

const services = [
  { label: "القضايا التجارية", href: "/services/legal-consulting" },
  { label: "تقسيم التركات", href: "/services/legal-consulting" },
  { label: "القانون الجنائي", href: "/services/legal-consulting" },
  { label: "الأنظمة العقارية", href: "/services/real-estate-law" },
  { label: "الأحوال الشخصية", href: "/services/legal-consulting" },
  { label: "نظام العمل", href: "/services/compliance" },
  { label: "العقود والتوثيق", href: "/services/contract-review" },
  { label: "التحكيم وحل النزاعات", href: "/services/dispute-resolution" },
];

const quickLinks = [
  { label: "من نحن", href: "/about" },
  { label: "المدونة القانونية", href: "/blog" },
  { label: "الأخبار", href: "/news" },
  { label: "تواصل معنا", href: "/contact" },
  { label: "سياسة الخصوصية", href: "/privacy-policy" },
  { label: "الشروط والأحكام", href: "/terms" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer style={{ background: "#0F1B35", color: "rgba(255,255,255,0.8)" }}>
      {/* Main footer */}
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "64px 24px 40px" }}>
        <div className="footer-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "40px" }}>
          {/* Brand */}
          <div>
            <div style={{ marginBottom: "20px" }}>
              <img
                src="/logo.png"
                alt="المحامي الحسين أحمد حسين السعدي"
                style={{
                  height: "56px",
                  width: "auto",
                  objectFit: "contain",
                  display: "block",
                  filter: "brightness(0) invert(1)",
                  opacity: 0.9,
                }}
              />
            </div>
            <p style={{ fontSize: "14px", lineHeight: "1.8", color: "rgba(255,255,255,0.65)", marginBottom: "24px" }}>
              مكتب متخصص في القانون السعودي، نقدم خدمات قانونية متكاملة في جدة لأفراد والشركات في جميع مجالات القانون.
            </p>
            <div style={{ display: "flex", gap: "12px" }}>
              {[
                { Icon: Share2, href: "#", label: "سوشيال ميديا" },
              ].map(({ Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  style={{
                    width: "40px",
                    height: "40px",
                    background: "rgba(201,168,76,0.15)",
                    border: "1px solid rgba(201,168,76,0.3)",
                    borderRadius: "10px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#C9A84C",
                    transition: "all 0.3s",
                    textDecoration: "none",
                  }}
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 style={{ fontFamily: "'Noto Kufi Arabic', serif", fontSize: "18px", fontWeight: 700, color: "#C9A84C", marginBottom: "20px" }}>
              خدماتنا
            </h3>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "10px" }}>
              {services.map((s, i) => (
                <li key={i}>
                  <Link href={s.href} style={{ color: "rgba(255,255,255,0.65)", textDecoration: "none", fontSize: "14px", transition: "color 0.2s" }}>
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 style={{ fontFamily: "'Noto Kufi Arabic', serif", fontSize: "18px", fontWeight: 700, color: "#C9A84C", marginBottom: "20px" }}>
              روابط سريعة
            </h3>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "10px" }}>
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} style={{ color: "rgba(255,255,255,0.65)", textDecoration: "none", fontSize: "14px", transition: "color 0.2s" }}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 style={{ fontFamily: "'Noto Kufi Arabic', serif", fontSize: "18px", fontWeight: 700, color: "#C9A84C", marginBottom: "20px" }}>
              تواصل معنا
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <a href="tel:0555533554" style={{ display: "flex", alignItems: "center", gap: "10px", color: "rgba(255,255,255,0.65)", textDecoration: "none", fontSize: "14px" }}>
                <Phone size={16} style={{ color: "#C9A84C", flexShrink: 0 }} />
                0555533554
              </a>
              <a href="tel:0122635336" style={{ display: "flex", alignItems: "center", gap: "10px", color: "rgba(255,255,255,0.65)", textDecoration: "none", fontSize: "14px" }}>
                <Phone size={16} style={{ color: "#C9A84C", flexShrink: 0 }} />
                0122635336
              </a>
              <a href="mailto:alhusseinalmojan@gmail.com" style={{ display: "flex", alignItems: "center", gap: "10px", color: "rgba(255,255,255,0.65)", textDecoration: "none", fontSize: "14px" }}>
                <Mail size={16} style={{ color: "#C9A84C", flexShrink: 0 }} />
                alhusseinalmojan@gmail.com
              </a>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "10px", color: "rgba(255,255,255,0.65)", fontSize: "14px" }}>
                <MapPin size={16} style={{ color: "#C9A84C", flexShrink: 0, marginTop: "2px" }} />
                <span>جدة، المملكة العربية السعودية<br />شارع التحلية خلف مبنى الرياض بلازا</span>
              </div>
            </div>

            {/* CTA */}
            <div style={{ marginTop: "24px" }}>
              <Link
                href="/contact"
                style={{
                  display: "inline-block",
                  background: "#C9A84C",
                  color: "#1A2744",
                  fontWeight: 700,
                  padding: "12px 24px",
                  borderRadius: "10px",
                  textDecoration: "none",
                  fontSize: "14px",
                  transition: "all 0.3s",
                }}
              >
                احجز استشارة مجانية
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          borderTop: "1px solid rgba(255,255,255,0.1)",
          padding: "20px 24px",
        }}
      >
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.4)" }}>
            © {year} مكتب الحسين بن أحمد بن حسين السعدي للمحاماة. جميع الحقوق محفوظة.
          </p>
          <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.4)" }}>
            مرخص من هيئة المحامين السعوديين • رقم الترخيص: 12345
          </p>
        </div>
      </div>
    </footer>
  );
}
