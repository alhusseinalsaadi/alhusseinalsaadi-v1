import Link from "next/link";
import { ArrowLeft, Calendar } from "lucide-react";

const posts = [
  {
    slug: "nazam-almuamalat-almdaniya",
    title: "نظام المعاملات المدنية 1444هـ — ما الذي تغيّر في عقودك؟",
    excerpt:
      "صدر نظام المعاملات المدنية السعودي عام 1444هـ ليكون منظوماً قانونياً شاملاً ينظم العلاقات المدنية. تعرف على أبرز التغييرات التي تؤثر على عقودك التجارية.",
    date: "12 مايو 2026",
    category: "قانون الأعمال",
    readTime: "5 دقائق",
  },
  {
    slug: "vision-2030-business",
    title: "رؤية 2030 وفرص الاستثمار — الإطار القانوني للمستثمرين",
    excerpt:
      "كيف تستفيد من فرص رؤية 2030؟ دليل قانوني شامل للإجراءات والتراخيص والفرص الاستثمارية المتاحة للمواطنين والمقيمين والمستثمرين الأجانب.",
    date: "5 مايو 2026",
    category: "الاستثمار",
    readTime: "7 دقائق",
  },
  {
    slug: "ejarat-wafi-guide",
    title: "منصة إيجار ووافي — دليلك القانوني لعقود الإيجار السعودية",
    excerpt:
      "كل ما تحتاج معرفته عن منصتي إيجار ووافي وكيف تحمي حقوقك كمالك أو مستأجر في ظل الأنظمة العقارية السعودية المحدّثة.",
    date: "28 أبريل 2026",
    category: "العقارات",
    readTime: "6 دقائق",
  },
];

const categoryColors: Record<string, string> = {
  "قانون الأعمال": "#1A2744",
  "الاستثمار": "#C9A84C",
  "العقارات": "#2A5F4A",
};

export default function BlogPreviewSection() {
  return (
    <section style={{ background: "#FAFAF8", padding: "96px 24px" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "48px",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          <div>
            <p style={{ color: "#C9A84C", fontWeight: 600, fontSize: "14px", letterSpacing: "2px", marginBottom: "8px" }}>
              المدونة القانونية
            </p>
            <h2
              style={{
                fontFamily: "'Noto Kufi Arabic', serif",
                fontSize: "36px",
                fontWeight: 900,
                color: "#1A2744",
              }}
            >
              آخر المقالات والتحديثات القانونية
            </h2>
          </div>
          <Link
            href="/blog"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              color: "#C9A84C",
              fontWeight: 600,
              textDecoration: "none",
              fontSize: "15px",
            }}
          >
            عرض الكل
            <ArrowLeft size={16} style={{ transform: "scaleX(-1)" }} />
          </Link>
        </div>

        {/* Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "24px",
          }}
        >
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              style={{ textDecoration: "none" }}
            >
              <article
                className="card"
                style={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                  cursor: "pointer",
                }}
              >
                {/* Category */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span
                    style={{
                      background: categoryColors[post.category] || "#1A2744",
                      color: "white",
                      fontSize: "12px",
                      fontWeight: 600,
                      padding: "4px 12px",
                      borderRadius: "999px",
                    }}
                  >
                    {post.category}
                  </span>
                  <span style={{ fontSize: "12px", color: "#6B6B6B" }}>{post.readTime} قراءة</span>
                </div>

                {/* Title */}
                <h3
                  style={{
                    fontFamily: "'Noto Kufi Arabic', serif",
                    fontSize: "18px",
                    fontWeight: 700,
                    color: "#1A2744",
                    lineHeight: "1.5",
                  }}
                >
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p
                  style={{
                    fontSize: "14px",
                    color: "#6B6B6B",
                    lineHeight: "1.7",
                    flex: 1,
                  }}
                >
                  {post.excerpt}
                </p>

                {/* Date */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    color: "#6B6B6B",
                    fontSize: "13px",
                    paddingTop: "12px",
                    borderTop: "1px solid #E5E5E0",
                  }}
                >
                  <Calendar size={14} />
                  {post.date}
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
