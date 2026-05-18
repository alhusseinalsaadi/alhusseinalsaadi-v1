import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { cookies } from "next/headers";
import {
  rateLimiters, getIP, tooManyRequests,
  sanitizeText, sanitizeSlug, PostSchema,
} from "@/lib/security";

async function isAdmin(): Promise<boolean> {
  const cookieStore = await cookies();
  return cookieStore.get("admin-session")?.value === "authenticated";
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category  = sanitizeText(searchParams.get("category") ?? "blog", 20);
  const pubParam  = searchParams.get("published");
  const published = pubParam !== "false";

  const validCategories = ["blog", "news"];
  const safeCategory = validCategories.includes(category) ? category : "blog";

  const posts = await prisma.post.findMany({
    where:   { category: safeCategory, ...(published ? { published: true } : {}) },
    orderBy: { publishedAt: "desc" },
    select:  { id: true, title: true, slug: true, excerpt: true, category: true, published: true, publishedAt: true, createdAt: true },
  });

  return NextResponse.json(posts);
}

export async function POST(req: NextRequest) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "غير مصرح" }, { status: 401 });
  }

  const ip = getIP(req);
  const rl = rateLimiters.posts(ip);
  if (!rl.allowed) return tooManyRequests();

  let body: unknown;
  try { body = await req.json(); }
  catch { return NextResponse.json({ error: "طلب غير صالح" }, { status: 400 }); }

  const parsed = PostSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message }, { status: 422 });
  }

  const d = parsed.data;
  const post = await prisma.post.create({
    data: {
      title:       sanitizeText(d.title, 300),
      slug:        sanitizeSlug(d.slug ?? d.title),
      content:     sanitizeText(d.content, 50000),
      excerpt:     sanitizeText(d.excerpt ?? d.content.slice(0, 200), 500),
      category:    d.category,
      published:   d.published,
      publishedAt: d.published ? new Date() : null,
    },
  });

  return NextResponse.json(post, { status: 201 });
}
