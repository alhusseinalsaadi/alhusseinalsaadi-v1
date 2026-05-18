import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { cookies } from "next/headers";

async function isAdmin() {
  const c = await cookies();
  return c.get("admin-session")?.value === "authenticated";
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdmin())) return NextResponse.json({ error: "غير مصرح" }, { status: 401 });
  const { id } = await params;
  await prisma.appointment.delete({ where: { id } }).catch(() => null);
  return NextResponse.json({ success: true });
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdmin())) return NextResponse.json({ error: "غير مصرح" }, { status: 401 });
  const { id } = await params;
  const data = await req.json().catch(() => ({}));
  const slot = await prisma.appointment.update({ where: { id }, data });
  return NextResponse.json(slot);
}
