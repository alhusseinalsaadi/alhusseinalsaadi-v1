import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";
import { getSiteSettings } from "@/lib/site-settings";

const services = [
  { label: "القضايا التجارية",       href: "/services/legal-consulting" },
  { label: "تقسيم التركات",          href: "/services/legal-consulting" },
  { label: "القانون الجنائي",        href: "/services/legal-consulting" },
  { label: "الأنظمة العقارية",       href: "/services/real-estate-law" },
  { label: "الأحوال الشخصية",        href: "/services/legal-consulting" },
  { label: "نظام العمل",            href: "/services/compliance" },
  { label: "العقود والتوثيق",        href: "/services/contract-review" },
  { label: "التحكيم وحل النزاعات",   href: "/services/dispute-resolution" },
];

const quickLinks = [
  { label: "من نحن",            href: "/about" },
  { label: "المدونة القانونية", href: "/blog" },
  { label: "الأخبار",          href: "/news" },
  { label: "تواصل معنا",       href: "/contact" },
  { label: "سياسة الخصوصية",   href: "/privacy-policy" },
  { label: "الشروط والأحكام",  href: "/terms" },
];

export default async function Footer() {
  const s = await getSiteSettings();
  const year = new Date().getFullYear();

  return (
    <footer style={{ background: "#0F1B35", color: "rgba(255,255,255,0.8)" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "64px 24px 40px" }}>
        <div className="footer-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "40px" }}>

          {/* Brand */}
          <div>
            <div style={{ marginBottom: "20px" }}>
              <img src="/logo.png" alt={s.officeName} style={{ height: "56px", width: "auto", objectFit: "contain", display: "block", filter: "brightness(0) invert(1)", opacity: 0.9 }} />
            </div>
            <p style={{ fontSize: "14px", lineHeight: "1.8", color: "rgba(255,255,255,0.65)", marginBottom: "24px" }}>
              مكتب متخصص في القانون السعودي، نقدم خدمات قانونية متكاملة في جدة للأفراد والشركات.
            </p>
            <div style={{ display: "flex", gap: "12px" }}>
              {s.twitter && (
                <a href={s.twitter} target="_blank" rel="noopener noreferrer" style={{ width: "40px", height: "40px", background: "rgba(201,168,76,0.15)", border: "1px solid rgba(201,168,76,0.3)", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", color: "#C9A84C", textDecoration: "none", fontSize: "13px", fontWeight: 700 }}>
                  X
                </a>
              )}
              {s.linkedin && (
                <a href={s.linkedin} target="_blank" rel="noopener noreferrer" style={{ width: "40px", height: "40px", background: "rgba(201,168,76,0.15)", border: "1px solid rgba(201,168,76,0.3)", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", color: "#C9A84C", textDecoration: "none", fontSize: "11px", fontWeight: 700 }}>
                  in
                </a>
              )}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 style={{ fontFamily: "'Noto Kufi Arabic', serif", fontSize: "18px", fontWeight: 700, color: "#C9A84C", marginBottom: "20px" }}>خدماتنا</h3>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "10px" }}>
              {services.map((sv) => (
                <li key={sv.href}>
                  <Link href={sv.href} style={{ color: "rgba(255,255,255,0.65)", textDecoration: "none", fontSize: "14px" }}>{sv.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 style={{ fontFamily: "'Noto Kufi Arabic', serif", fontSize: "18px", fontWeight: 700, color: "#C9A84C", marginBottom: "20px" }}>روابط سريعة</h3>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "10px" }}>
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} style={{ color: "rgba(255,255,255,0.65)", textDecoration: "none", fontSize: "14px" }}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 style={{ fontFamily: "'Noto Kufi Arabic', serif", fontSize: "18px", fontWeight: 700, color: "#C9A84C", marginBottom: "20px" }}>تواصل معنا</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {s.phone1 && (
                <a href={`tel:${s.phone1}`} style={{ display: "flex", alignItems: "center", gap: "10px", color: "rgba(255,255,255,0.65)", textDecoration: "none", fontSize: "14px" }}>
                  <Phone size={16} style={{ color: "#C9A84C", flexShrink: 0 }} />{s.phone1}
                </a>
              )}
              {s.phone2 && (
                <a href={`tel:${s.phone2}`} style={{ display: "flex", alignItems: "center", gap: "10px", color: "rgba(255,255,255,0.65)", textDecoration: "none", fontSize: "14px" }}>
                  <Phone size={16} style={{ color: "#C9A84C", flexShrink: 0 }} />{s.phone2}
                </a>
              )}
              {s.email && (
                <a href={`mailto:${s.email}`} style={{ display: "flex", alignItems: "center", gap: "10px", color: "rgba(255,255,255,0.65)", textDecoration: "none", fontSize: "14px" }}>
                  <Mail size={16} style={{ color: "#C9A84C", flexShrink: 0 }} />{s.email}
                </a>
              )}
              {s.address && (
                <div style={{ display: "flex", alignItems: "flex-start", gap: "10px", color: "rgba(255,255,255,0.65)", fontSize: "14px" }}>
                  <MapPin size={16} style={{ color: "#C9A84C", flexShrink: 0, marginTop: "2px" }} />
                  <span>{s.address}</span>
                </div>
              )}
            </div>
            <div style={{ marginTop: "24px" }}>
              <Link href="/contact" style={{ display: "inline-block", background: "#C9A84C", color: "#1A2744", fontWeight: 700, padding: "12px 24px", borderRadius: "10px", textDecoration: "none", fontSize: "14px" }}>
                احجز استشارة مجانية
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", padding: "20px 24px" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
          <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.4)" }}>
            © {year} {s.officeName}. جميع الحقوق محفوظة.
          </p>
          <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.4)" }}>
            مرخص من هيئة المحامين السعوديين | رقم الترخيص: 421848
          </p>
        </div>
      </div>
    </footer>
  );
}
