import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  const c = await cookies();
  if (c.get("admin-session")?.value !== "authenticated") {
    return NextResponse.json({ error: "غير مصرح" }, { status: 401 });
  }
  return NextResponse.json({ ok: true });
}
