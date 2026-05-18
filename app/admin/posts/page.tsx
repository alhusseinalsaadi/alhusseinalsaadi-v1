import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { Plus, Pencil, Trash2, Eye, EyeOff } from "lucide-react";
import AdminShell from "@/components/admin/AdminShell";

async function requireAuth() {
  const cookieStore = await cookies();
  if (!cookieStore.get("admin-session")?.value) redirect("/admin/login");
}

export default async function PostsAdminPage({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
  await requireAuth();
  const { category = "blog" } = await searchParams;
  const posts = await prisma.post.findMany({ where: { category }, orderBy: { createdAt: "desc" } });

  return (
    <AdminShell>
      <div style={{ padding: "32px 24px", maxWidth: "1000px", margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px", marginBottom: "24px" }}>
          <div>
            <h1 style={{ fontFamily: "'Noto Kufi Arabic', serif", fontSize: "26px", fontWeight: 900, color: "#1A2744" }}>
              {category === "blog" ? "إدارة المدونة" : "إدارة الأخبار"}
            </h1>
            <p style={{ color: "#6B6B6B", marginTop: "4px" }}>{posts.length} {category === "blog" ? "مقال" : "خبر"}</p>
          </div>
          <Link
            href={`/admin/posts/new?category=${category}`}
            style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#C9A84C", color: "#1A2744", fontWeight: 700, padding: "12px 24px", borderRadius: "10px", textDecoration: "none", fontSize: "14px" }}
          >
            <Plus size={16} /> {category === "blog" ? "مقال جديد" : "خبر جديد"}
          </Link>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: "8px", marginBottom: "24px" }}>
          {[{ label: "المدونة", value: "blog" }, { label: "الأخبار", value: "news" }].map(({ label, value }) => (
            <Link
              key={value}
              href={`/admin/posts?category=${value}`}
              style={{ padding: "8px 20px", borderRadius: "8px", textDecoration: "none", fontSize: "14px", fontWeight: 600, background: category === value ? "#1A2744" : "white", color: category === value ? "white" : "#6B6B6B", border: "1px solid " + (category === value ? "#1A2744" : "#E5E5E0") }}
            >
              {label}
            </Link>
          ))}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {posts.length === 0 ? (
            <div style={{ textAlign: "center", padding: "60px 0", color: "#6B6B6B" }}>
              <p style={{ fontSize: "16px" }}>لا توجد منشورات بعد</p>
              <Link href={`/admin/posts/new?category=${category}`} style={{ color: "#C9A84C", textDecoration: "none", marginTop: "8px", display: "inline-block", fontWeight: 600 }}>
                أضف أول منشور
              </Link>
            </div>
          ) : posts.map((post) => (
            <div key={post.id} style={{ background: "white", borderRadius: "12px", padding: "20px 24px", boxShadow: "0 4px 24px rgba(26,39,68,0.06)", border: "1px solid #E5E5E0", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>
              <div style={{ flex: 1, minWidth: "200px" }}>
                <div style={{ display: "flex", gap: "8px", alignItems: "center", marginBottom: "6px" }}>
                  <span style={{ fontSize: "11px", fontWeight: 600, padding: "2px 8px", borderRadius: "999px", background: post.published ? "#D1FAE5" : "#F3F4F6", color: post.published ? "#059669" : "#6B6B6B" }}>
                    {post.published ? "منشور" : "مسودة"}
                  </span>
                </div>
                <h3 style={{ fontFamily: "'Noto Kufi Arabic', serif", fontSize: "16px", fontWeight: 700, color: "#1A2744", marginBottom: "4px" }}>{post.title}</h3>
                <p style={{ fontSize: "12px", color: "#6B6B6B" }}>/{category}/{post.slug} · {new Date(post.createdAt).toLocaleDateString("ar-SA")}</p>
              </div>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                <TogglePublishButton postId={post.id} published={post.published} />
                <Link href={`/admin/posts/${post.id}/edit`} style={{ display: "flex", alignItems: "center", gap: "6px", background: "#F3F4F6", color: "#1A2744", padding: "8px 16px", borderRadius: "8px", textDecoration: "none", fontSize: "13px", fontWeight: 600 }}>
                  <Pencil size={13} /> تعديل
                </Link>
                <DeleteButton postId={post.id} category={category} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminShell>
  );
}

function TogglePublishButton({ postId, published }: { postId: string; published: boolean }) {
  return (
    <form action={async () => {
      "use server";
      const { prisma } = await import("@/lib/db");
      await prisma.post.update({ where: { id: postId }, data: { published: !published, publishedAt: !published ? new Date() : null } });
      const { revalidatePath } = await import("next/cache");
      revalidatePath("/admin/posts");
    }}>
      <button type="submit" style={{ display: "flex", alignItems: "center", gap: "6px", background: published ? "#FEF3C7" : "#D1FAE5", color: published ? "#D97706" : "#059669", padding: "8px 14px", borderRadius: "8px", border: "none", fontSize: "13px", fontWeight: 600, cursor: "pointer", fontFamily: "'IBM Plex Arabic', sans-serif" }}>
        {published ? <><EyeOff size={13} /> إخفاء</> : <><Eye size={13} /> نشر</>}
      </button>
    </form>
  );
}

function DeleteButton({ postId, category }: { postId: string; category: string }) {
  return (
    <form action={async () => {
      "use server";
      const { prisma } = await import("@/lib/db");
      await prisma.post.delete({ where: { id: postId } });
      const { revalidatePath } = await import("next/cache");
      revalidatePath("/admin/posts");
    }}>
      <input type="hidden" name="category" value={category} />
      <button type="submit" style={{ display: "flex", alignItems: "center", gap: "6px", background: "#FEF2F2", color: "#DC2626", padding: "8px 14px", borderRadius: "8px", border: "none", fontSize: "13px", fontWeight: 600, cursor: "pointer", fontFamily: "'IBM Plex Arabic', sans-serif" }}>
        <Trash2 size={13} /> حذف
      </button>
    </form>
  );
}
