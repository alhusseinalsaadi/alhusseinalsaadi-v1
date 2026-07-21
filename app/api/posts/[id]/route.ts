import { NextRequest, NextResponse } from "next/server";
import { getPostById, updatePost, deletePost } from "@/lib/supabase-client";
import { cookies } from "next/headers";
import { sanitizeText, sanitizeSlug, PostSchema } from "@/lib/security";

async function isAdmin(): Promise<boolean> {
  const cookieStore = await cookies();
  return cookieStore.get("admin-session")?.value === "authenticated";
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "غير مصرح" }, { status: 401 });
  }

  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return NextResponse.json({ error: "خادم البيانات غير متاح" }, { status: 503 });
  }

  const { id } = await params;
  try {
    const post = await getPostById(id);
    if (!post) {
      return NextResponse.json({ error: "لم يُعثر على المنشور" }, { status: 404 });
    }
    return NextResponse.json(post);
  } catch {
    return NextResponse.json({ error: "لم يُعثر على المنشور" }, { status: 404 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "غير مصرح" }, { status: 401 });
  }

  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return NextResponse.json({ error: "خادم البيانات غير متاح" }, { status: 503 });
  }

  const { id } = await params;
  if (!id || typeof id !== "string" || id.length > 100) {
    return NextResponse.json({ error: "معرّف غير صالح" }, { status: 400 });
  }

  let body: unknown;
  try { body = await req.json(); }
  catch { return NextResponse.json({ error: "طلب غير صالح" }, { status: 400 }); }

  const parsed = PostSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message }, { status: 422 });
  }

  const d = parsed.data;
  try {
    const post = await updatePost(id, {
      title:       sanitizeText(d.title, 300),
      slug:        d.slug ? sanitizeSlug(d.slug) : undefined,
      content:     sanitizeText(d.content, 50000),
      excerpt:     d.excerpt ? sanitizeText(d.excerpt, 500) : undefined,
      category:    d.category,
      coverImage:  d.coverImage !== undefined ? (d.coverImage || null) : undefined,
      published:   d.published,
    });

    if (!post) {
      return NextResponse.json({ error: "لم يُعثر على المنشور" }, { status: 404 });
    }

    return NextResponse.json(post);
  } catch {
    return NextResponse.json({ error: "لم يُعثر على المنشور" }, { status: 404 });
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "غير مصرح" }, { status: 401 });
  }

  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return NextResponse.json({ error: "خادم البيانات غير متاح" }, { status: 503 });
  }

  const { id } = await params;
  if (!id || typeof id !== "string" || id.length > 100) {
    return NextResponse.json({ error: "معرّف غير صالح" }, { status: 400 });
  }

  try {
    const success = await deletePost(id);
    if (!success) {
      return NextResponse.json({ error: "لم يُعثر على المنشور" }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "لم يُعثر على المنشور" }, { status: 404 });
  }
}
