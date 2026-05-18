import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { cookies } from "next/headers";
import { z } from "zod";

async function isAdmin() {
  const c = await cookies();
  return c.get("admin-session")?.value === "authenticated";
}

const Schema = z.object({
  title:   z.string().min(1).max(200),
  content: z.string().min(1).max(20000),
  active:  z.boolean().default(true),
});

export async function GET() {
  if (!(await isAdmin())) return NextResponse.json({ error: "غير مصرح" }, { status: 401 });
  const sources = await prisma.knowledgeSource.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(sources);
}

export async function POST(req: NextRequest) {
  if (!(await isAdmin())) return NextResponse.json({ error: "غير مصرح" }, { status: 401 });
  const body = await req.json().catch(() => null);
  const parsed = Schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "بيانات غير صالحة" }, { status: 422 });
  const source = await prisma.knowledgeSource.create({ data: parsed.data });
  return NextResponse.json(source, { status: 201 });
}
