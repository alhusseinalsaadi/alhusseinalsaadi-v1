export const dynamic = "force-dynamic";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AdminShell from "@/components/admin/AdminShell";
import { prisma } from "@/lib/db";
import DashboardClient from "./DashboardClient";

async function requireAuth() {
  const cookieStore = await cookies();
  if (!cookieStore.get("admin-session")?.value) redirect("/admin/login");
}

export default async function DashboardPage() {
  await requireAuth();

  let recentLeads = [];
  try {
    const leads = await prisma.lead.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
      select: { id: true, name: true, phone: true, service: true, status: true, createdAt: true },
    });

    recentLeads = leads.map((l: { createdAt: Date; [key: string]: any }) => ({
      ...l,
      createdAt: l.createdAt.toISOString(),
    }));
  } catch (error) {
    console.error("Dashboard database error:", error);
    // جاري المتابعة بقائمة فارغة إذا فشلت قاعدة البيانات
  }

  return (
    <AdminShell>
      <DashboardClient recentLeads={recentLeads} />
    </AdminShell>
  );
}
