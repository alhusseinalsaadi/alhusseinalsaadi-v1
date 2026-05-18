"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Users, FileText, Newspaper,
  Settings, Globe, LogOut, Menu, X, ExternalLink,
  BookOpen, CalendarDays,
} from "lucide-react";

const nav = [
  { label: "الرئيسية",          href: "/admin/dashboard",    icon: LayoutDashboard },
  { label: "الاستشارات",        href: "/admin/leads",        icon: Users },
  { label: "المواعيد",          href: "/admin/appointments", icon: CalendarDays },
  { label: "مصادر سالم",        href: "/admin/knowledge",    icon: BookOpen },
  { label: "المدونة",           href: "/admin/posts",        icon: FileText },
  { label: "الأخبار",          href: "/admin/news",         icon: Newspaper },
  { label: "الصفحات القانونية", href: "/admin/pages",        icon: Globe },
  { label: "الإعدادات",        href: "/admin/settings",     icon: Settings },
];

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const [sideOpen, setSideOpen] = useState(false);

  const logout = async () => {
    await fetch("/api/auth", { method: "DELETE" });
    window.location.href = "/admin/login";
  };

  const Sidebar = ({ mobile = false }: { mobile?: boolean }) => (
    <aside
      style={{
        width: mobile ? "100%" : "240px",
        background: "#0F1B35",
        display: "flex",
        flexDirection: "column",
        flexShrink: 0,
        height: mobile ? "auto" : "100vh",
        position: mobile ? "relative" : "sticky",
        top: 0,
      }}
    >
      {/* Logo */}
      <div style={{ padding: "24px 20px 20px", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
        <Link href="/admin/dashboard" onClick={() => setSideOpen(false)} style={{ textDecoration: "none", display: "block" }}>
          <img
            src="/logo.png"
            alt="مكتب السعدي للمحاماة"
            style={{ height: "48px", width: "auto", filter: "brightness(0) invert(1)", opacity: 0.9 }}
          />
          <div style={{ marginTop: "8px", fontSize: "11px", color: "rgba(201,168,76,0.7)", letterSpacing: "0.5px" }}>
            لوحة إدارة المكتب
          </div>
        </Link>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: "12px 10px", display: "flex", flexDirection: "column", gap: "2px" }}>
        {nav.map(({ label, href, icon: Icon }) => {
          const active = path === href || (href !== "/admin/dashboard" && path.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              onClick={() => setSideOpen(false)}
              style={{
                display: "flex", alignItems: "center", gap: "10px",
                padding: "10px 14px", borderRadius: "10px",
                textDecoration: "none", fontSize: "14px", fontWeight: active ? 700 : 500,
                color: active ? "#C9A84C" : "rgba(255,255,255,0.65)",
                background: active ? "rgba(201,168,76,0.12)" : "transparent",
                transition: "all 0.15s",
              }}
            >
              <Icon size={17} />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div style={{ padding: "12px 10px", borderTop: "1px solid rgba(255,255,255,0.07)", display: "flex", flexDirection: "column", gap: "4px" }}>
        <a
          href="/"
          target="_blank"
          style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px 14px", borderRadius: "10px", color: "rgba(255,255,255,0.5)", textDecoration: "none", fontSize: "13px" }}
        >
          <ExternalLink size={15} /> عرض الموقع
        </a>
        <button
          onClick={logout}
          style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px 14px", borderRadius: "10px", background: "rgba(220,38,38,0.1)", border: "none", color: "#FCA5A5", cursor: "pointer", fontSize: "13px", fontFamily: "'IBM Plex Arabic', sans-serif", width: "100%" }}
        >
          <LogOut size={15} /> تسجيل الخروج
        </button>
      </div>
    </aside>
  );

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#F5F5F3", direction: "rtl" }}>
      {/* Desktop sidebar */}
      <div className="admin-sidebar-desktop">
        <Sidebar />
      </div>

      {/* Main */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        {/* Mobile topbar */}
        <div
          className="admin-topbar-mobile"
          style={{
            background: "#0F1B35", padding: "12px 16px",
            display: "flex", alignItems: "center", justifyContent: "space-between",
            borderBottom: "1px solid rgba(201,168,76,0.15)",
          }}
        >
          <img src="/logo.png" alt="" style={{ height: "36px", filter: "brightness(0) invert(1)", opacity: 0.9 }} />
          <button
            onClick={() => setSideOpen(!sideOpen)}
            style={{ background: "none", border: "none", color: "white", cursor: "pointer", padding: "6px" }}
          >
            {sideOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile sidebar drawer */}
        {sideOpen && (
          <div className="admin-topbar-mobile">
            <Sidebar mobile />
          </div>
        )}

        <main style={{ flex: 1, padding: "0" }}>
          {children}
        </main>
      </div>

      <style>{`
        .admin-sidebar-desktop { display: flex; }
        .admin-topbar-mobile   { display: none; }
        @media (max-width: 768px) {
          .admin-sidebar-desktop { display: none !important; }
          .admin-topbar-mobile   { display: flex !important; flex-direction: column; }
        }
      `}</style>
    </div>
  );
}
