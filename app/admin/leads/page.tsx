import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { Phone, Mail, User, MessageSquare } from "lucide-react";
import AdminShell from "@/components/admin/AdminShell";

async function requireAuth() {
  const cookieStore = await cookies();
  if (!cookieStore.get("admin-session")?.value) redirect("/admin/login");
}

const statusColors: Record<string, { bg: string; text: string; label: string }> = {
  new: { bg: "#FEF3C7", text: "#D97706", label: "جديد" },
  contacted: { bg: "#DBEAFE", text: "#2563EB", label: "تم التواصل" },
  closed: { bg: "#D1FAE5", text: "#059669", label: "مُغلق" },
};

export default async function LeadsPage() {
  await requireAuth();
  const leads = await prisma.lead.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <AdminShell>
      <div style={{ padding: "32px 24px", maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "16px", marginBottom: "28px" }}>
          <div>
            <h1 style={{ fontFamily: "'Noto Kufi Arabic', serif", fontSize: "26px", fontWeight: 900, color: "#1A2744" }}>
              الاستشارات الواردة
            </h1>
            <p style={{ color: "#6B6B6B", marginTop: "4px" }}>{leads.length} استشارة</p>
          </div>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {Object.entries(statusColors).map(([k, v]) => (
              <span key={k} style={{ background: v.bg, color: v.text, padding: "4px 14px", borderRadius: "999px", fontSize: "12px", fontWeight: 600 }}>
                {v.label}: {leads.filter(l => l.status === k).length}
              </span>
            ))}
          </div>
        </div>

        {leads.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 0", color: "#6B6B6B" }}>
            <MessageSquare size={48} style={{ margin: "0 auto 16px", opacity: 0.3 }} />
            <p style={{ fontSize: "18px" }}>لا توجد استشارات بعد</p>
            <p style={{ fontSize: "14px", marginTop: "8px" }}>ستظهر هنا الاستشارات الواردة من الموقع</p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {leads.map((lead) => {
              const status = statusColors[lead.status] || statusColors.new;
              const convo = (() => { try { return JSON.parse(lead.conversation); } catch { return null; } })();
              return (
                <div key={lead.id} style={{ background: "white", borderRadius: "16px", padding: "24px", boxShadow: "0 4px 24px rgba(26,39,68,0.06)", border: "1px solid #E5E5E0" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "12px", marginBottom: "16px" }}>
                    <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", alignItems: "center" }}>
                      {lead.name && (
                        <span style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "15px", fontWeight: 700, color: "#1A2744" }}>
                          <User size={15} color="#C9A84C" /> {lead.name}
                        </span>
                      )}
                      {lead.service && (
                        <span style={{ background: "#F3F4F6", border: "1px solid #E5E5E0", padding: "3px 10px", borderRadius: "999px", fontSize: "12px", color: "#1A2744" }}>
                          {lead.service}
                        </span>
                      )}
                    </div>
                    <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                      <span style={{ background: status.bg, color: status.text, padding: "4px 12px", borderRadius: "999px", fontSize: "12px", fontWeight: 600 }}>
                        {status.label}
                      </span>
                      <span style={{ fontSize: "12px", color: "#6B6B6B" }}>
                        {new Date(lead.createdAt).toLocaleDateString("ar-SA")}
                      </span>
                    </div>
                  </div>

                  {/* Contact actions */}
                  <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "14px" }}>
                    {lead.phone && (
                      <>
                        <a
                          href={`tel:${lead.phone}`}
                          style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "#DBEAFE", color: "#2563EB", padding: "8px 16px", borderRadius: "8px", textDecoration: "none", fontSize: "13px", fontWeight: 600 }}
                        >
                          <Phone size={13} /> {lead.phone}
                        </a>
                        <a
                          href={`https://wa.me/${(lead.phone ?? "").replace(/^0/, "966").replace(/\D/g, "")}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "#D1FAE5", color: "#059669", padding: "8px 16px", borderRadius: "8px", textDecoration: "none", fontSize: "13px", fontWeight: 600 }}
                        >
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                          واتساب
                        </a>
                      </>
                    )}
                    {lead.email && (
                      <a href={`mailto:${lead.email}`} style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "#F3F4F6", color: "#6B6B6B", padding: "8px 16px", borderRadius: "8px", textDecoration: "none", fontSize: "13px", fontWeight: 600 }}>
                        <Mail size={13} /> {lead.email}
                      </a>
                    )}
                  </div>

                  {/* Conversation preview */}
                  {convo?.messages?.length > 0 && (
                    <div style={{ background: "#FAFAF8", borderRadius: "10px", padding: "12px 16px", maxHeight: "120px", overflowY: "auto", marginBottom: "14px" }}>
                      {convo.messages.slice(-3).map((m: { role: string; content: string }, i: number) => (
                        <div key={i} style={{ fontSize: "13px", color: m.role === "user" ? "#1A2744" : "#6B6B6B", marginBottom: "6px" }}>
                          <strong>{m.role === "user" ? "العميل:" : "سالم:"}</strong> {m.content.slice(0, 100)}{m.content.length > 100 ? "..." : ""}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Status buttons */}
                  <div style={{ display: "flex", gap: "8px" }}>
                    {["new", "contacted", "closed"].map((s) => (
                      <LeadStatusButton key={s} leadId={lead.id} status={s} current={lead.status} label={statusColors[s].label} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </AdminShell>
  );
}

function LeadStatusButton({ leadId, status, current, label }: { leadId: string; status: string; current: string; label: string }) {
  const isActive = current === status;
  return (
    <form action={async () => {
      "use server";
      const { prisma } = await import("@/lib/db");
      await prisma.lead.update({ where: { id: leadId }, data: { status } });
      const { revalidatePath } = await import("next/cache");
      revalidatePath("/admin/leads");
    }}>
      <button
        type="submit"
        style={{
          background: isActive ? "#1A2744" : "transparent",
          color: isActive ? "white" : "#6B6B6B",
          border: "1px solid " + (isActive ? "#1A2744" : "#E5E5E0"),
          padding: "6px 14px", borderRadius: "8px", fontSize: "12px", fontWeight: 600,
          cursor: "pointer", fontFamily: "'IBM Plex Arabic', sans-serif",
        }}
      >
        {label}
      </button>
    </form>
  );
}
