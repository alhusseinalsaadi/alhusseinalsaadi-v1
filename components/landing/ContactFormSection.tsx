"use client";

import ContactForm from "@/components/contact/ContactForm";

export default function ContactFormSection() {
  return (
    <section id="contact-form" style={{ background: "#FAFAF8", padding: "80px 24px" }}>
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <h2
            style={{
              fontFamily: "'Noto Kufi Arabic', serif",
              fontSize: "clamp(28px, 4vw, 40px)",
              fontWeight: 900,
              color: "#1A2744",
              marginBottom: "16px",
            }}
          >
            احجز استشارتك المجانية الآن
          </h2>
          <p style={{ fontSize: "17px", color: "#6B6B6B", maxWidth: "560px", margin: "0 auto" }}>
            عبّئ النموذج وسنتواصل معك خلال ساعة واحدة — بدون أي التزام مالي
          </p>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}
