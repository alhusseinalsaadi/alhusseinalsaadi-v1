import Link from "next/link";
import { Phone, MessageCircle } from "lucide-react";

export default function CTASection() {
  return (
    <section
      style={{
        background: "linear-gradient(135deg, #C9A84C 0%, #A8882E 100%)",
        padding: "80px 24px",
        textAlign: "center",
      }}
    >
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <h2
          style={{
            fontFamily: "'Noto Kufi Arabic', serif",
            fontSize: "40px",
            fontWeight: 900,
            color: "#1A2744",
            marginBottom: "16px",
          }}
        >
          هل تحتاج استشارة قانونية الآن؟
        </h2>
        <p
          style={{
            fontSize: "18px",
            color: "rgba(26,39,68,0.8)",
            lineHeight: "1.7",
            marginBottom: "40px",
          }}
        >
          فريقنا من المختصين القانونيين جاهز لمساعدتك. احصل على استشارتك الأولى مجاناً.
        </p>
        <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
          <Link
            href="/contact"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "#1A2744",
              color: "white",
              fontWeight: 700,
              padding: "16px 36px",
              borderRadius: "12px",
              textDecoration: "none",
              fontSize: "16px",
              transition: "all 0.3s",
            }}
          >
            <Phone size={18} />
            احجز استشارة مجانية
          </Link>
          <a
            href="https://wa.me/966500000000?text=مرحباً، أريد استشارة قانونية"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "#25D366",
              color: "white",
              fontWeight: 700,
              padding: "16px 36px",
              borderRadius: "12px",
              textDecoration: "none",
              fontSize: "16px",
              transition: "all 0.3s",
            }}
          >
            <MessageCircle size={18} />
            واتساب مباشر
          </a>
        </div>
      </div>
    </section>
  );
}
