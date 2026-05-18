"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { Save, ArrowRight } from "lucide-react";
import AdminShell from "@/components/admin/AdminShell";

function EditPostForm() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [form, setForm] = useState({ title: "", slug: "", content: "", excerpt: "", published: false, category: "blog" });
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`/api/posts/${id}`)
      .then(r => r.json())
      .then(data => {
        if (data.error) { setError(data.error); return; }
        setForm({
          title: data.title || "",
          slug: data.slug || "",
          content: data.content || "",
          excerpt: data.excerpt || "",
          published: data.published || false,
          category: data.category || "blog",
        });
      })
      .catch(() => setError("حدث خطأ في تحميل المنشور"))
      .finally(() => setFetching(false));
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/posts/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        router.push(`/admin/posts?category=${form.category}`);
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
        {/* Breadcrumb */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "24px", fontSize: "14px" }}>
          <Link href={`/admin/posts?category=${form.category}`} style={{ color: "#6B6B6B", textDecoration: "none", display: "flex", alignItems: "center", gap: "4px" }}>
            <ArrowRight size={14} /> {form.category === "blog" ? "المدونة" : "الأخبار"}
          </Link>
          <span style={{ color: "#D1D5DB" }}>›</span>
          <span style={{ color: "#1A2744", fontWeight: 600 }}>تعديل المنشور</span>
        </div>

        <h1 style={{ fontFamily: "'Noto Kufi Arabic', serif", fontSize: "26px", fontWeight: 900, color: "#1A2744", marginBottom: "28px" }}>
          تعديل المنشور
        </h1>

        {error && (
          <div style={{ background: "#FEF2F2", border: "1px solid #FCA5A5", borderRadius: "10px", padding: "12px 16px", color: "#DC2626", marginBottom: "20px" }}>
            {error}
          </div>
        )}

        {fetching ? (
          <div style={{ textAlign: "center", padding: "60px 0", color: "#6B6B6B" }}>جارٍ التحميل...</div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div style={{ background: "white", borderRadius: "16px", padding: "28px", boxShadow: "0 4px 24px rgba(26,39,68,0.06)", display: "flex", flexDirection: "column", gap: "16px" }}>
              {/* Category */}
              <div>
                <label style={{ display: "block", fontSize: "14px", fontWeight: 600, color: "#1A2744", marginBottom: "6px" }}>التصنيف</label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  style={{ ...inputStyle, cursor: "pointer" }}
                >
                  <option value="blog">مدونة</option>
                  <option value="news">أخبار</option>
                </select>
              </div>

              {/* Title */}
              <div>
                <label style={{ display: "block", fontSize: "14px", fontWeight: 600, color: "#1A2744", marginBottom: "6px" }}>العنوان *</label>
                <input
                  type="text" required value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  style={inputStyle}
                />
              </div>

              {/* Slug */}
              <div>
                <label style={{ display: "block", fontSize: "14px", fontWeight: 600, color: "#1A2744", marginBottom: "6px" }}>الرابط (Slug)</label>
                <input
                  type="text" value={form.slug}
                  onChange={(e) => setForm({ ...form, slug: e.target.value })}
                  style={{ ...inputStyle, direction: "ltr" }}
                />
              </div>

              {/* Excerpt */}
              <div>
                <label style={{ display: "block", fontSize: "14px", fontWeight: 600, color: "#1A2744", marginBottom: "6px" }}>ملخص قصير</label>
                <input
                  type="text" value={form.excerpt}
                  onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                  style={inputStyle}
                  placeholder="2-3 جمل تلخص المحتوى..."
                />
              </div>

              {/* Content */}
              <div>
                <label style={{ display: "block", fontSize: "14px", fontWeight: 600, color: "#1A2744", marginBottom: "6px" }}>المحتوى *</label>
                <textarea
                  required rows={18} value={form.content}
                  onChange={(e) => setForm({ ...form, content: e.target.value })}
                  style={{ ...inputStyle, resize: "vertical", lineHeight: "1.7" }}
                  placeholder="اكتب محتوى المقال هنا..."
                />
              </div>

              {/* Published */}
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <input
                  type="checkbox" id="published" checked={form.published}
                  onChange={(e) => setForm({ ...form, published: e.target.checked })}
                  style={{ width: "18px", height: "18px", accentColor: "#C9A84C" }}
                />
                <label htmlFor="published" style={{ fontSize: "15px", fontWeight: 600, color: "#1A2744", cursor: "pointer" }}>
                  منشور (مرئي للزوار)
                </label>
              </div>
            </div>

            <div style={{ display: "flex", gap: "12px" }}>
              <button type="submit" disabled={loading} style={{ display: "flex", alignItems: "center", gap: "8px", background: "#C9A84C", color: "#1A2744", fontWeight: 700, padding: "14px 28px", borderRadius: "10px", border: "none", fontSize: "15px", cursor: loading ? "default" : "pointer", fontFamily: "'IBM Plex Arabic', sans-serif", opacity: loading ? 0.7 : 1 }}>
                <Save size={16} /> {loading ? "جارٍ الحفظ..." : "حفظ التعديلات"}
              </button>
              <Link href={`/admin/posts?category=${form.category}`} style={{ display: "flex", alignItems: "center", gap: "8px", background: "white", color: "#6B6B6B", fontWeight: 600, padding: "14px 28px", borderRadius: "10px", border: "1px solid #E5E5E0", textDecoration: "none", fontSize: "15px" }}>
                إلغاء
              </Link>
            </div>
          </form>
        )}
      </div>
    </AdminShell>
  );
}

export default function EditPostPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>جارٍ التحميل...</div>}>
      <EditPostForm />
    </Suspense>
  );
}
