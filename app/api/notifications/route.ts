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
    const { searchParams } = new URL(req.url);
    const limit = parseInt(searchParams.get("limit") ?? "20", 10);
    const unreadOnly = searchParams.get("unread") === "true";

    const notifications = await prisma.notification.findMany({
      where: unreadOnly ? { read: false } : {},
      orderBy: { createdAt: "desc" },
      take: limit,
    });

    const unreadCount = await prisma.notification.count({
      where: { read: false },
    });

    return NextResponse.json({ notifications, unreadCount });
  } catch (error) {
    return NextResponse.json({ error: "خطأ في جلب الإخطارات" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  const deny = requireAdmin(req);
  if (deny) return deny;

  try {
    const body = await req.json();
    const { id, read } = body;

    if (!id) {
      return NextResponse.json({ error: "معرّف الإخطار مطلوب" }, { status: 400 });
    }

    const notification = await prisma.notification.update({
      where: { id },
      data: { read },
    });

    return NextResponse.json(notification);
  } catch (error) {
    return NextResponse.json({ error: "خطأ في تحديث الإخطار" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const deny = requireAdmin(req);
  if (deny) return deny;

  try {
    const body = await req.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json({ error: "معرّف الإخطار مطلوب" }, { status: 400 });
    }

    await prisma.notification.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "خطأ في حذف الإخطار" }, { status: 500 });
  }
}
