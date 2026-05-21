export const dynamic = "force-dynamic";
import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { FileText, Newspaper, Users, Settings, Plus, TrendingUp } from "lucide-react";
import AdminShell from "@/components/admin/AdminShell";
import { prisma } from "@/lib/db";

async function requireAuth() {
  const cookieStore = await cookies();
  if (!cookieStore.get("admin-session")?.value) redirect("/admin/login");
}

export default async function DashboardPage() {
  await requireAuth();

  const [totalLeads, newLeads, totalPosts, totalNews] = await Promise.all([
    prisma.lead.count(),
    prisma.lead.count({ where: { status: "new" } }),
    prisma.post.count({ where: { category: "blog" } }),
    prisma.post.count({ where: { category: "news" } }),
  ]);

  const recentLeads = await prisma.lead.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
    select: { id: true, name: true, phone: true, service: true, status: true, createdAt: true },
  });

  const stats = [
    { icon: Users, label: "إجمالي الاستشارات", value: totalLeads, sub: `${newLeads} جديدة`, color: "#1A2744", href: "/admin/leads" },
    { icon: FileText, label: "مقالات المدونة", value: totalPosts, sub: "مقال منشور", color: "#C9A84C", href: "/admin/posts" },
    { icon: Newspaper, label: "الأخبار", value: totalNews, sub: "خبر منشور", color: "#2A5F4A", href: "/admin/posts?category=news" },
    { icon: TrendingUp, label: "طلبات جديدة", value: newLeads, sub: "بانتظار المتابعة", color: "#DC2626", href: "/admin/leads" },
  ];

  const statusColors: Record<string, { bg: string; text: string; label: string }> = {
    new: { bg: "#FEF3C7", text: "#D97706", label: "جديد" },
    contacted: { bg: "#DBEAFE", text: "#2563EB", label: "تم التواصل" },
    closed: { bg: "#D1FAE5", text: "#059669", label: "مُغلق" },
  };

  return (
    <AdminShell>
      <div style={{ padding: "32px 24px", maxWidth: "1200px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ marginBottom: "32px" }}>
          <h1 style={{ fontFamily: "'Noto Kufi Arabic', serif", fontSize: "28px", fontWeight: 900, color: "#1A2744", marginBottom: "6px" }}>
            لوحة إدارة المكتب
          </h1>
          <p style={{ color: "#6B6B6B", fontSize: "15px" }}>مرحباً بك — هنا نظرة عامة على نشاط الموقع</p>
        </div>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px", marginBottom: "32px" }}>
          {stats.map(({ icon: Icon, label, value, sub, color, href }) => (
            <Link key={label} href={href} style={{ textDecoration: "none" }}>
              <div style={{ background: "white", borderRadius: "16px", padding: "24px", boxShadow: "0 4px 24px rgba(26,39,68,0.06)", border: "1px solid #E5E5E0", transition: "transform 0.2s", cursor: "pointer" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
                  <div style={{ width: "44px", height: "44px", background: `${color}15`, borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Icon size={22} color={color} />
                  </div>
                  <span style={{ fontSize: "32px", fontWeight: 900, color: "#1A2744" }}>{value}</span>
                </div>
                <div style={{ fontSize: "14px", fontWeight: 600, color: "#1A2744" }}>{label}</div>
                <div style={{ fontSize: "12px", color: "#6B6B6B", marginTop: "2px" }}>{sub}</div>
              </div>
            </Link>
          ))}
        </div>

        {/* Quick actions */}
        <div style={{ display: "flex", gap: "12px", marginBottom: "32px", flexWrap: "wrap" }}>
          <Link href="/admin/posts/new" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#C9A84C", color: "#1A2744", fontWeight: 700, padding: "12px 24px", borderRadius: "10px", textDecoration: "none", fontSize: "14px" }}>
            <Plus size={16} /> مقال جديد
          </Link>
          <Link href="/admin/posts/new?category=news" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#1A2744", color: "white", fontWeight: 700, padding: "12px 24px", borderRadius: "10px", textDecoration: "none", fontSize: "14px" }}>
            <Plus size={16} /> خبر جديد
          </Link>
          <Link href="/admin/leads" style={{ display: "inline-flex", alignItems: "center", gap: "8px", border: "1.5px solid #C9A84C", color: "#C9A84C", fontWeight: 600, padding: "12px 24px", borderRadius: "10px", textDecoration: "none", fontSize: "14px", background: "white" }}>
            <Users size={16} /> الاستشارات الجديدة {newLeads > 0 && <span style={{ background: "#DC2626", color: "white", borderRadius: "999px", padding: "1px 7px", fontSize: "11px" }}>{newLeads}</span>}
          </Link>
        </div>

        {/* Recent leads */}
        {recentLeads.length > 0 && (
          <div style={{ background: "white", borderRadius: "16px", padding: "24px 28px", boxShadow: "0 4px 24px rgba(26,39,68,0.06)", border: "1px solid #E5E5E0" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <h2 style={{ fontFamily: "'Noto Kufi Arabic', serif", fontSize: "18px", fontWeight: 700, color: "#1A2744" }}>
                آخر الاستشارات
              </h2>
              <Link href="/admin/leads" style={{ fontSize: "13px", color: "#C9A84C", textDecoration: "none", fontWeight: 600 }}>
                عرض الكل
              </Link>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {recentLeads.map((lead) => {
                const status = statusColors[lead.status] || statusColors.new;
                return (
                  <div key={lead.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: "1px solid #F3F4F6" }}>
                    <div>
                      <span style={{ fontWeight: 600, color: "#1A2744", fontSize: "15px" }}>{lead.name || "—"}</span>
                      {lead.service && <span style={{ fontSize: "12px", color: "#6B6B6B", marginRight: "10px" }}>{lead.service}</span>}
                    </div>
                    <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                      {lead.phone && (
                        <a href={`tel:${lead.phone}`} style={{ fontSize: "13px", color: "#1A2744", textDecoration: "none" }}>{lead.phone}</a>
                      )}
                      <span style={{ background: status.bg, color: status.text, padding: "3px 10px", borderRadius: "999px", fontSize: "11px", fontWeight: 600 }}>
                        {status.label}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </AdminShell>
  );
}
