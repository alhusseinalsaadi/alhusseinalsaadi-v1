"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Save } from "lucide-react";
import AdminShell from "@/components/admin/AdminShell";

function NewPostForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const category = searchParams.get("category") || "blog";

  const [form, setForm] = useState({ title: "", slug: "", content: "", excerpt: "", published: false });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const autoSlug = (title: string) =>
    title.replace(/\s+/g, "-").replace(/[^؀-ۿa-zA-Z0-9-]/g, "").toLowerCase();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, category }),
      });
      if (res.ok) {
        router.push(`/admin/posts?category=${category}`);
      } else {
        const data = await res.json();
        setError(data.error || "حدث خطأ");
      }
    } catch {
      setError("حدث خطأ في الاتصال");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    width: "100%", border: "1px solid #E5E5E0", borderRadius: "10px",
    padding: "12px 16px", fontSize: "15px",
    fontFamily: "'IBM Plex Arabic', sans-serif",
    outline: "none", direction: "rtl",
  };

  return (
    <AdminShell>
      <div style={{ padding: "32px 24px", maxWidth: "900px", margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "24px", fontSize: "14px" }}>
          <Link href={`/admin/posts?category=${category}`} style={{ color: "#6B6B6B", textDecoration: "none", display: "flex", alignItems: "center", gap: "4px" }}>
            <ArrowRight size={14} /> {category === "blog" ? "المدونة" : "الأخبار"}
          </Link>
          <span style={{ color: "#D1D5DB" }}>›</span>
          <span style={{ color: "#1A2744", fontWeight: 600 }}>منشور جديد</span>
        </div>

        <h1 style={{ fontFamily: "'Noto Kufi Arabic', serif", fontSize: "26px", fontWeight: 900, color: "#1A2744", marginBottom: "28px" }}>
          {category === "blog" ? "مقال جديد" : "خبر جديد"}
        </h1>

        {error && (
          <div style={{ background: "#FEF2F2", border: "1px solid #FCA5A5", borderRadius: "10px", padding: "12px 16px", color: "#DC2626", marginBottom: "20px" }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div style={{ background: "white", borderRadius: "16px", padding: "28px", boxShadow: "0 4px 24px rgba(26,39,68,0.06)", display: "flex", flexDirection: "column", gap: "16px" }}>
            <div>
              <label style={{ display: "block", fontSize: "14px", fontWeight: 600, color: "#1A2744", marginBottom: "6px" }}>العنوان *</label>
              <input
                type="text" required value={form.title}
                onChange={(e) => {
                  const val = e.target.value;
                  setForm({ ...form, title: val, slug: autoSlug(val) });
                }}
                style={inputStyle}
                placeholder="عنوان المقال أو الخبر"
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "14px", fontWeight: 600, color: "#1A2744", marginBottom: "6px" }}>الرابط (Slug)</label>
              <input
                type="text" value={form.slug}
                onChange={(e) => setForm({ ...form, slug: e.target.value })}
                style={{ ...inputStyle, direction: "ltr" }}
                placeholder="article-slug"
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "14px", fontWeight: 600, color: "#1A2744", marginBottom: "6px" }}>ملخص قصير</label>
              <input
                type="text" value={form.excerpt}
                onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                style={inputStyle}
                placeholder="2-3 جمل تلخص المحتوى..."
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "14px", fontWeight: 600, color: "#1A2744", marginBottom: "6px" }}>المحتوى *</label>
              <textarea
                required rows={16} value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
                style={{ ...inputStyle, resize: "vertical", lineHeight: "1.7" }}
                placeholder="اكتب محتوى المقال هنا..."
              />
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <input
                type="checkbox" id="published" checked={form.published}
                onChange={(e) => setForm({ ...form, published: e.target.checked })}
                style={{ width: "18px", height: "18px", accentColor: "#C9A84C" }}
              />
              <label htmlFor="published" style={{ fontSize: "15px", fontWeight: 600, color: "#1A2744", cursor: "pointer" }}>
                نشر فوراً
              </label>
            </div>
          </div>

          <div style={{ display: "flex", gap: "12px" }}>
            <button type="submit" disabled={loading} style={{ display: "flex", alignItems: "center", gap: "8px", background: "#C9A84C", color: "#1A2744", fontWeight: 700, padding: "14px 28px", borderRadius: "10px", border: "none", fontSize: "15px", cursor: loading ? "default" : "pointer", fontFamily: "'IBM Plex Arabic', sans-serif", opacity: loading ? 0.7 : 1 }}>
              <Save size={16} /> {loading ? "جارٍ الحفظ..." : "حفظ المنشور"}
            </button>
            <Link href={`/admin/posts?category=${category}`} style={{ display: "flex", alignItems: "center", gap: "8px", background: "white", color: "#6B6B6B", fontWeight: 600, padding: "14px 28px", borderRadius: "10px", border: "1px solid #E5E5E0", textDecoration: "none", fontSize: "15px" }}>
              إلغاء
            </Link>
          </div>
        </form>
      </div>
    </AdminShell>
  );
}

export default function NewPostPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>جارٍ التحميل...</div>}>
      <NewPostForm />
    </Suspense>
  );
}
