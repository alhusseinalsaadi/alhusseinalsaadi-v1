import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

function requireAdmin(req: NextRequest) {
  const session = req.cookies.get("admin-session")?.value;
  if (session !== "authenticated") {
    return NextResponse.json({ error: "غير مصرح" }, { status: 401 });
  }
  return null;
}

export async function GET(req: NextRequest) {
  const deny = requireAdmin(req);
  if (deny) return deny;

  try {
    const now = new Date();
    const sevenDaysAgo = new Date(now);
    sevenDaysAgo.setDate(now.getDate() - 6);
    sevenDaysAgo.setHours(0, 0, 0, 0);

    const thirtyDaysAgo = new Date(now);
    thirtyDaysAgo.setDate(now.getDate() - 29);
    thirtyDaysAgo.setHours(0, 0, 0, 0);

    const [
      totalLeads,
      newLeads,
      contactedLeads,
      closedLeads,
      totalPosts,
      totalAppointments,
      bookedAppointments,
      leadStatusBreakdownRaw,
      recentLeads,
      serviceBreakdownRaw,
      leadsThisMonth,
      leadsLastMonth,
    ] = await Promise.all([
    prisma.lead.count(),
    prisma.lead.count({ where: { status: "new" } }),
    prisma.lead.count({ where: { status: "contacted" } }),
    prisma.lead.count({ where: { status: "closed" } }),
    prisma.post.count({ where: { published: true } }),
    prisma.appointment.count(),
    prisma.appointment.count({ where: { available: false } }),
    prisma.lead.groupBy({ by: ["status"], _count: { id: true } }),
    prisma.lead.findMany({
      where: { createdAt: { gte: sevenDaysAgo } },
      select: { createdAt: true },
      orderBy: { createdAt: "asc" },
    }),
    prisma.lead.groupBy({ by: ["service"], _count: { id: true } }),
    prisma.lead.count({ where: { createdAt: { gte: new Date(now.getFullYear(), now.getMonth(), 1) } } }),
    prisma.lead.count({ where: { createdAt: { gte: new Date(now.getFullYear(), now.getMonth() - 1, 1), lt: new Date(now.getFullYear(), now.getMonth(), 1) } } }),
  ]);

  // Build last-7-days array
  const dayMap: Record<string, number> = {};
  for (let i = 6; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(now.getDate() - i);
    const key = d.toISOString().slice(0, 10);
    dayMap[key] = 0;
  }
  for (const lead of recentLeads) {
    const key = lead.createdAt.toISOString().slice(0, 10);
    if (key in dayMap) dayMap[key]++;
  }
  const leadsLast7Days = Object.entries(dayMap).map(([date, count]) => ({ date, count }));

  const leadStatusBreakdown = leadStatusBreakdownRaw.map((r: typeof leadStatusBreakdownRaw[number]) => ({
    status: r.status,
    count: r._count.id,
  }));

  const serviceBreakdown = serviceBreakdownRaw
    .filter((s: any) => s.service)
    .map((r: typeof serviceBreakdownRaw[number]) => ({
      service: r.service,
      count: r._count.id,
    }))
    .sort((a: any, b: any) => b.count - a.count)
    .slice(0, 5);

  const conversionRate = totalLeads > 0 ? Math.round((closedLeads / totalLeads) * 100) : 0;
  const responseRate = newLeads > 0 ? Math.round(((contactedLeads + closedLeads) / totalLeads) * 100) : 0;
  const monthGrowth = leadsLastMonth > 0 ? Math.round(((leadsThisMonth - leadsLastMonth) / leadsLastMonth) * 100) : 0;

    return NextResponse.json({
      totalLeads,
      newLeads,
      contactedLeads,
      closedLeads,
      totalPosts,
      totalAppointments,
      bookedAppointments,
      leadsLast7Days,
      leadStatusBreakdown,
      serviceBreakdown,
      conversionRate,
      responseRate,
      monthGrowth,
      leadsThisMonth,
      leadsLastMonth,
    });
  } catch (error) {
    console.error("Analytics error:", error);
    // جاري الرد بقيم افتراضية إذا فشلت قاعدة البيانات
    return NextResponse.json({
      totalLeads: 0,
      newLeads: 0,
      contactedLeads: 0,
      closedLeads: 0,
      totalPosts: 0,
      totalAppointments: 0,
      bookedAppointments: 0,
      leadsLast7Days: [],
      leadStatusBreakdown: [],
      serviceBreakdown: [],
      conversionRate: 0,
      responseRate: 0,
      monthGrowth: 0,
      leadsThisMonth: 0,
      leadsLastMonth: 0,
    });
  }
}
