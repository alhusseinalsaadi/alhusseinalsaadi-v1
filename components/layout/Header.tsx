"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Phone, ChevronDown } from "lucide-react";

const navLinks = [
  { label: "الرئيسية", href: "/" },
  {
    label: "خدماتنا",
    href: "/services",
    children: [
      { label: "الاستشارات القانونية", href: "/services/legal-consulting" },
      { label: "مراجعة العقود", href: "/services/contract-review" },
      { label: "إغلاق الصفقات", href: "/services/deal-closing" },
      { label: "حل النزاعات", href: "/services/dispute-resolution" },
      { label: "الامتثال والتراخيص", href: "/services/compliance" },
      { label: "قانون العقارات", href: "/services/real-estate-law" },
    ],
  },
  { label: "من نحن", href: "/about" },
  { label: "المدونة", href: "/blog" },
  { label: "الأخبار", href: "/news" },
  { label: "تواصل معنا", href: "/contact" },
];

interface HeaderProps {
  phone1?: string;
  phone2?: string;
}

export default function Header({ phone1 = "0555545533", phone2 = "0122635336" }: HeaderProps) {
  const [scrolled, setScrolled]           = useState(false);
  const [mobileOpen, setMobileOpen]       = useState(false);
  const [servicesOpen, setServicesOpen]   = useState(false);
  const [mobileServices, setMobileServices] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <style>{`
        /* ── desktop nav ──────────────────────── */
        .hdr-desktop { display: flex; align-items: center; gap: 2px; }
        .hdr-hamburger { display: none; }

        @media (max-width: 900px) {
          .hdr-desktop   { display: none !important; }
          .hdr-hamburger { display: flex !important; align-items: center; justify-content: center;
                           background: none; border: none; color: white; cursor: pointer;
                           padding: 8px; border-radius: 8px; }
        }

        /* nav link hover */
        .hdr-link:hover { color: #C9A84C !important; background: rgba(201,168,76,0.1) !important; }

        /* dropdown item hover */
        .hdr-drop-item:hover { background: #F5F4F0 !important; }

        /* mobile menu slide */
        .hdr-mobile-menu {
          position: fixed; top: 64px; right: 0; left: 0; bottom: 0;
          background: #0B1628;
          overflow-y: auto;
          z-index: 999;
          display: flex; flex-direction: column;
        }

        /* mobile row */
        .hdr-mob-row {
          display: flex; align-items: center; justify-content: space-between;
          padding: 15px 20px;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          color: rgba(255,255,255,0.88);
          text-decoration: none;
          font-size: 16px; font-weight: 500;
          font-family: 'IBM Plex Arabic', sans-serif;
          cursor: pointer; background: none; border-left: none; border-right: none; border-top: none; width: 100%;
        }
        .hdr-mob-row:active { background: rgba(255,255,255,0.04); }

        /* mobile sub-item */
        .hdr-mob-sub {
          display: block;
          padding: 12px 20px 12px 32px;
          color: rgba(255,255,255,0.55);
          text-decoration: none;
          font-size: 14px;
          border-bottom: 1px solid rgba(255,255,255,0.04);
          font-family: 'IBM Plex Arabic', sans-serif;
        }
        .hdr-mob-sub:active { background: rgba(255,255,255,0.05); }

        /* mobile CTA buttons */
        .hdr-cta-call {
          display: flex; align-items: center; justify-content: center; gap: 8px;
          padding: 15px; border-radius: 12px;
          font-size: 16px; font-weight: 700;
          font-family: 'IBM Plex Arabic', sans-serif;
          text-decoration: none; cursor: pointer;
          border: 1.5px solid rgba(201,168,76,0.45);
          background: rgba(201,168,76,0.08);
          color: #C9A84C;
          transition: all 0.2s;
        }
        .hdr-cta-call:active { background: rgba(201,168,76,0.18); }

        .hdr-cta-book {
          display: flex; align-items: center; justify-content: center; gap: 8px;
          padding: 15px; border-radius: 12px;
          font-size: 16px; font-weight: 700;
          font-family: 'IBM Plex Arabic', sans-serif;
          text-decoration: none; cursor: pointer;
          background: #C9A84C; color: #1A2744; border: none;
          box-shadow: 0 4px 20px rgba(201,168,76,0.35);
          transition: all 0.2s;
        }
        .hdr-cta-book:active { background: #A8882E; }
      `}</style>

      <header
        style={{
          position: "fixed",
          top: 0, right: 0, left: 0,
          zIndex: 1000,
          height: "64px",
          display: "flex",
          alignItems: "center",
          background: scrolled ? "rgba(15,23,42,0.97)" : "rgba(11,22,40,0.88)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          borderBottom: scrolled ? "1px solid rgba(201,168,76,0.18)" : "1px solid transparent",
          transition: "background 0.3s, border-color 0.3s",
        }}
      >
        <div
          style={{
            maxWidth: "1280px",
            width: "100%",
            margin: "0 auto",
            padding: "0 20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "12px",
          }}
        >
          {/* Logo */}
          <Link href="/" style={{ textDecoration: "none", flexShrink: 0 }}>
            <img
              src="/logo.png"
              alt="مكتب السعدي للمحاماة"
              style={{ height: "58px", width: "auto", objectFit: "contain", display: "block" }}
            />
          </Link>

          {/* ── Desktop nav ── */}
          <nav className="hdr-desktop">
            {navLinks.map((link: any) =>
              link.children ? (
                <div
                  key={link.label}
                  style={{ position: "relative" }}
                  onMouseEnter={() => setServicesOpen(true)}
                  onMouseLeave={() => setServicesOpen(false)}
                >
                  <button
                    className="hdr-link"
                    style={{
                      background: "none", border: "none",
                      color: "rgba(255,255,255,0.82)",
                      fontSize: "14px", fontWeight: 500,
                      padding: "7px 11px", borderRadius: "8px",
                      cursor: "pointer", display: "flex", alignItems: "center", gap: "4px",
                      fontFamily: "'IBM Plex Arabic', sans-serif",
                      transition: "color 0.2s, background 0.2s", whiteSpace: "nowrap",
                    }}
                  >
                    {link.label}
                    <ChevronDown
                      size={13}
                      style={{ transition: "transform 0.2s", transform: servicesOpen ? "rotate(180deg)" : "none" }}
                    />
                  </button>

                  {servicesOpen && (
                    <div
                      style={{
                        position: "absolute", top: "calc(100% + 6px)", right: 0,
                        background: "white", borderRadius: "14px",
                        boxShadow: "0 12px 48px rgba(26,39,68,0.22)",
                        padding: "8px", minWidth: "210px", zIndex: 300,
                        border: "1px solid rgba(26,39,68,0.06)",
                      }}
                    >
                      {link.children.map((child: any, i: any) => (
                        <Link
                          key={i}
                          href={child.href}
                          className="hdr-drop-item"
                          style={{
                            display: "block", padding: "10px 14px",
                            color: "#1A2744", textDecoration: "none",
                            fontSize: "13px", fontWeight: 500, borderRadius: "8px",
                            transition: "background 0.15s",
                          }}
                        >
                          {child.label}
                        </Link>
                      ))}
                      <div style={{ borderTop: "1px solid #EBEBEB", margin: "6px 8px" }} />
                      <Link
                        href="/services"
                        style={{
                          display: "block", padding: "9px 14px",
                          color: "#C9A84C", textDecoration: "none",
                          fontSize: "13px", fontWeight: 700, borderRadius: "8px",
                        }}
                      >
                        عرض جميع الخدمات →
                      </Link>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className="hdr-link"
                  style={{
                    color: "rgba(255,255,255,0.82)",
                    textDecoration: "none", fontSize: "14px", fontWeight: 500,
                    padding: "7px 11px", borderRadius: "8px",
                    transition: "color 0.2s, background 0.2s", whiteSpace: "nowrap",
                  }}
                >
                  {link.label}
                </Link>
              )
            )}

            {/* phone */}
            <a
              href={`tel:${phone1}`}
              style={{
                marginRight: "8px", display: "flex", alignItems: "center", gap: "6px",
                background: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.3)",
                color: "#C9A84C", padding: "7px 14px", borderRadius: "10px",
                textDecoration: "none", fontSize: "13px", fontWeight: 600, whiteSpace: "nowrap",
              }}
            >
              <Phone size={14} /> اتصل بنا
            </a>

            {/* CTA */}
            <Link
              href="/contact"
              className="btn-primary"
              style={{ padding: "8px 18px", fontSize: "13px", whiteSpace: "nowrap" }}
            >
              استشارة مجانية
            </Link>
          </nav>

          {/* ── Hamburger ── */}
          <button
            className="hdr-hamburger"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "إغلاق القائمة" : "فتح القائمة"}
          >
            {mobileOpen
              ? <X size={26} strokeWidth={2} />
              : <Menu size={26} strokeWidth={2} />}
          </button>
        </div>
      </header>

      {/* ── Mobile menu ── */}
      {mobileOpen && (
        <div className="hdr-mobile-menu">
          {/* Nav links */}
          <div style={{ flex: 1 }}>
            {navLinks.map((link: any) => (
              <div key={link.label}>
                {link.children ? (
                  <>
                    <button
                      className="hdr-mob-row"
                      onClick={() => setMobileServices(!mobileServices)}
                      style={{ color: "rgba(255,255,255,0.88)" }}
                    >
                      <span>{link.label}</span>
                      <ChevronDown
                        size={17}
                        color="#C9A84C"
                        style={{ transition: "transform 0.25s", transform: mobileServices ? "rotate(180deg)" : "none", flexShrink: 0 }}
                      />
                    </button>

                    {mobileServices && (
                      <div style={{ background: "rgba(0,0,0,0.2)" }}>
                        {link.children.map((child: any, i: any) => (
                          <Link
                            key={i}
                            href={child.href}
                            className="hdr-mob-sub"
                            onClick={() => setMobileOpen(false)}
                          >
                            {child.label}
                          </Link>
                        ))}
                        <Link
                          href="/services"
                          className="hdr-mob-sub"
                          onClick={() => setMobileOpen(false)}
                          style={{ color: "#C9A84C", fontWeight: 700 }}
                        >
                          جميع الخدمات ←
                        </Link>
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={link.href}
                    className="hdr-mob-row"
                    onClick={() => setMobileOpen(false)}
                    style={{ display: "flex" } as React.CSSProperties}
                  >
                    {link.label}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Bottom CTAs */}
          <div
            style={{
              padding: "20px 16px 36px",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              borderTop: "1px solid rgba(201,168,76,0.15)",
              background: "rgba(0,0,0,0.15)",
            }}
          >
            {/* primary call number */}
            <a href={`tel:${phone1}`} className="hdr-cta-call">
              <Phone size={18} />
              <span>اتصل بنا — {phone1}</span>
            </a>

            {/* secondary number */}
            <a
              href={`tel:${phone2}`}
              style={{
                display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                padding: "11px", borderRadius: "10px", fontSize: "14px", fontWeight: 600,
                color: "rgba(201,168,76,0.7)", textDecoration: "none",
                border: "1px solid rgba(201,168,76,0.2)", fontFamily: "'IBM Plex Arabic', sans-serif",
              }}
            >
              <Phone size={15} /> {phone2}
            </a>

            {/* book CTA */}
            <Link
              href="/contact"
              className="hdr-cta-book"
              onClick={() => setMobileOpen(false)}
            >
              احجز استشارة مجانية
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
