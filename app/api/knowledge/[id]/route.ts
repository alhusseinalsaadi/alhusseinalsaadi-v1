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
  await prisma.knowledgeSource.delete({ where: { id } }).catch(() => null);
  return NextResponse.json({ success: true });
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdmin())) return NextResponse.json({ error: "غير مصرح" }, { status: 401 });
  const { id } = await params;
  const body = await req.json().catch(() => ({}));
  const data: Record<string, unknown> = {};
  if (typeof body.active  === "boolean") data.active  = body.active;
  if (typeof body.title   === "string")  data.title   = body.title.trim();
  if (typeof body.content === "string")  data.content = body.content.trim();
  const source = await prisma.knowledgeSource.update({ where: { id }, data });
  return NextResponse.json(source);
}
