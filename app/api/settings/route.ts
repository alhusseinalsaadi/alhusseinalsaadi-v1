import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { cookies } from "next/headers";

async function isAdmin() {
  const c = await cookies();
  return c.get("admin-session")?.value === "authenticated";
}

const ALLOWED_KEYS = [
  "officeName", "phone1", "phone2", "email",
  "address", "whatsapp", "twitter", "linkedin",
];

export async function GET() {
  if (!(await isAdmin())) return NextResponse.json({ error: "غير مصرح" }, { status: 401 });
  const rows = await prisma.siteSetting.findMany();
  const settings: Record<string, string> = {};
  rows.forEach((r) => { settings[r.key] = r.value; });
  return NextResponse.json(settings);
}

export async function POST(req: NextRequest) {
  if (!(await isAdmin())) return NextResponse.json({ error: "غير مصرح" }, { status: 401 });
  const body = await req.json().catch(() => ({}));

  const upserts = ALLOWED_KEYS
    .filter((k) => typeof body[k] === "string")
    .map((k) =>
      prisma.siteSetting.upsert({
        where: { key: k },
        create: { key: k, value: body[k] },
        update: { value: body[k] },
      })
    );

  await Promise.all(upserts);
  return NextResponse.json({ success: true });
}
