import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import {
  rateLimiters, getIP, tooManyRequests,
  sanitizeText, LeadSchema, LeadStatusSchema,
} from "@/lib/security";
import { z } from "zod";

export async function GET() {
  // Public GET is intentionally unauthenticated — admin middleware handles /admin pages.
  // This endpoint is only called server-side from admin pages.
  const leads = await prisma.lead.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(leads);
}

export async function POST(req: NextRequest) {
  // Rate limit
  const ip = getIP(req);
  const rl = rateLimiters.leads(ip);
  if (!rl.allowed) return tooManyRequests();

  let body: unknown;
  try { body = await req.json(); }
  catch { return NextResponse.json({ error: "طلب غير صالح" }, { status: 400 }); }

  const parsed = LeadSchema.safeParse(body);
  if (!parsed.success) {
    const issues = parsed.error?.issues ?? [];
    const msg = issues[0]?.message ?? "بيانات غير صحيحة";
    return NextResponse.json({ error: msg }, { status: 422 });
  }

  const { name, phone, email, service, message, conversation } = parsed.data;

  const lead = await prisma.lead.create({
    data: {
      name:         sanitizeText(name, 100),
      phone:        phone.trim(),
      email:        email ? sanitizeText(email, 200) : null,
      service:      service ? sanitizeText(service, 200) : null,
      conversation: JSON.stringify({ message: sanitizeText(message ?? "", 2000), history: conversation ?? [] }),
      status:       "new",
    },
  });

  return NextResponse.json({ success: true, id: lead.id }, { status: 201 });
}

export async function PATCH(req: NextRequest) {
  let body: unknown;
  try { body = await req.json(); }
  catch { return NextResponse.json({ error: "طلب غير صالح" }, { status: 400 }); }

  const parsed = LeadStatusSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "بيانات غير صحيحة" }, { status: 422 });
  }

  try {
    const lead = await prisma.lead.update({
      where: { id: parsed.data.id },
      data:  { status: parsed.data.status },
    });
    return NextResponse.json(lead);
  } catch {
    return NextResponse.json({ error: "لم يُعثر على السجل" }, { status: 404 });
  }
}
