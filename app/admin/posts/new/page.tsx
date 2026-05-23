"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Save, Image as ImageIcon } from "lucide-react";
import AdminShell from "@/components/admin/AdminShell";

function toAsciiSlug(title: string): string {
  const map: Record<string, string> = {
    'ا':'a','أ':'a','إ':'a','آ':'a','ب':'b','ت':'t','ث':'th','ج':'j','ح':'h','خ':'kh',
    'د':'d','ذ':'th','ر':'r','ز':'z','س':'s','ش':'sh','ص':'s','ض':'d','ط':'t','ظ':'z',
    'ع':'a','غ':'gh','ف':'f','ق':'q','ك':'k','ل':'l','م':'m','ن':'n','ه':'h','و':'w',
    'ي':'y','ى':'a','ة':'h','ء':'','ئ':'y','ؤ':'w','لا':'la',
  };
  let result = title;
  for (const [ar, en] of Object.entries(map)) result = result.replaceAll(ar, en);
  return result.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '').replace(/-+/g, '-').slice(0, 120);
}

function NewPostForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [form, setForm] = useState({
    title: "",
    slug: "",
    content: "",
    excerpt: "",
    category: searchParams.get("category") || "blog",
    coverImage: "",
    published: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [slugEdited, setSlugEdited] = useState(false);

  const handleTitleChange = (val: string) => {
    setForm(f => ({ ...f, title: val, slug: slugEdited ? f.slug : toAsciiSlug(val) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/posts", {
        method: "POST",
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
    outline: "none", direction: "rtl", boxSizing: "border-box",
  };

  return (
    <AdminShell>
      <div style={{ padding: "32px 24px", maxWidth: "900px", margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "24px", fontSize: "14px" }}>
          <Link href={`/admin/posts?category=${form.category}`} style={{ color: "#6B6B6B", textDecoration: "none", display: "flex", alignItems: "center", gap: "4px" }}>
            <ArrowRight size={14} /> {form.category === "blog" ? "المدونة" : "الأخبار"}
          </Link>
          <span style={{ color: "#D1D5DB" }}>›</span>
          <span style={{ color: "#1A2744", fontWeight: 600 }}>منشور جديد</span>
        </div>

        <h1 style={{ fontFamily: "'Noto Kufi Arabic', serif", fontSize: "26px", fontWeight: 900, color: "#1A2744", marginBottom: "28px" }}>
          {form.category === "blog" ? "مقال جديد" : "خبر جديد"}
        </h1>

        {error && (
          <div style={{ background: "#FEF2F2", border: "1px solid #FCA5A5", borderRadius: "10px", padding: "12px 16px", color: "#DC2626", marginBottom: "20px" }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div style={{ background: "white", borderRadius: "16px", padding: "28px", boxShadow: "0 4px 24px rgba(26,39,68,0.06)", display: "flex", flexDirection: "column", gap: "16px" }}>

            {/* Category */}
            <div>
              <label style={{ display: "block", fontSize: "14px", fontWeight: 600, color: "#1A2744", marginBottom: "6px" }}>التصنيف *</label>
              <select
                value={form.category}
                onChange={(e) => setForm(f => ({ ...f, category: e.target.value }))}
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
                onChange={(e) => handleTitleChange(e.target.value)}
                style={inputStyle}
                placeholder="عنوان المقال أو الخبر"
              />
            </div>

            {/* Slug */}
            <div>
              <label style={{ display: "block", fontSize: "14px", fontWeight: 600, color: "#1A2744", marginBottom: "4px" }}>
                رابط المقال (Slug) <span style={{ fontWeight: 400, fontSize: "12px", color: "#9CA3AF" }}>— يُملأ تلقائياً، يُفضّل إبقاؤه بالإنجليزية</span>
              </label>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ fontSize: "13px", color: "#9CA3AF", whiteSpace: "nowrap" }}>
                  /{form.category}/
                </span>
                <input
                  type="text" value={form.slug}
                  onChange={(e) => { setSlugEdited(true); setForm(f => ({ ...f, slug: e.target.value })); }}
                  style={{ ...inputStyle, direction: "ltr", flex: 1 }}
                  placeholder="article-slug-here"
                />
              </div>
            </div>

            {/* Excerpt */}
            <div>
              <label style={{ display: "block", fontSize: "14px", fontWeight: 600, color: "#1A2744", marginBottom: "6px" }}>ملخص قصير</label>
              <input
                type="text" value={form.excerpt}
                onChange={(e) => setForm(f => ({ ...f, excerpt: e.target.value }))}
                style={inputStyle}
                placeholder="2-3 جمل تلخص المحتوى..."
              />
            </div>

            {/* Cover Image */}
            <div>
              <label style={{ display: "block", fontSize: "14px", fontWeight: 600, color: "#1A2744", marginBottom: "6px" }}>
                <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}><ImageIcon size={14} /> رابط الصورة الرئيسية (اختياري)</span>
              </label>
              <input
                type="url" value={form.coverImage}
                onChange={(e) => setForm(f => ({ ...f, coverImage: e.target.value }))}
                style={{ ...inputStyle, direction: "ltr" }}
                placeholder="https://example.com/image.jpg"
              />
              {form.coverImage && (
                <div style={{ marginTop: "10px", borderRadius: "10px", overflow: "hidden", maxHeight: "200px" }}>
                  <img src={form.coverImage} alt="preview" style={{ width: "100%", height: "200px", objectFit: "cover" }} onError={(e) => (e.currentTarget.style.display = "none")} />
                </div>
              )}
            </div>

            {/* Content */}
            <div>
              <label style={{ display: "block", fontSize: "14px", fontWeight: 600, color: "#1A2744", marginBottom: "6px" }}>
                المحتوى * <span style={{ fontWeight: 400, fontSize: "12px", color: "#9CA3AF" }}>— يدعم ## عنوان فرعي، ### عنوان أصغر، - نقطة</span>
              </label>
              <textarea
                required rows={18} value={form.content}
                onChange={(e) => setForm(f => ({ ...f, content: e.target.value }))}
                style={{ ...inputStyle, resize: "vertical", lineHeight: "1.7" }}
                placeholder="اكتب محتوى المقال هنا..."
              />
            </div>

            {/* Published */}
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <input
                type="checkbox" id="published" checked={form.published}
                onChange={(e) => setForm(f => ({ ...f, published: e.target.checked }))}
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
            <Link href={`/admin/posts?category=${form.category}`} style={{ display: "flex", alignItems: "center", gap: "8px", background: "white", color: "#6B6B6B", fontWeight: 600, padding: "14px 28px", borderRadius: "10px", border: "1px solid #E5E5E0", textDecoration: "none", fontSize: "15px" }}>
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
