"use client";

import { Star, Quote } from "lucide-react";
import { useState, useEffect } from "react";

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      name: "أحمد السلطاني",
      role: "صاحب شركة",
      city: "جدة",
      image: "👨‍💼",
      rating: 5,
      text: "تعاملت معهم في قضية تجارية معقدة. كانوا محترفين جداً، اتبعوا استراتيجية ذكية، وحصلت على أفضل نتيجة ممكنة. اوصي بهم بشدة.",
      verified: true,
    },
    {
      name: "فاطمة العمري",
      role: "معلمة",
      city: "جدة",
      image: "👩‍🏫",
      rating: 5,
      text: "كنت قلقة جداً من قضايا الملكية. المحامي استمع لي بعناية، طمأنني بخطة واضحة، وأنهى الموضوع بسرعة. شكراً لهم.",
      verified: true,
    },
    {
      name: "محمد الهاشمي",
      role: "رجل أعمال",
      city: "الرياض",
      image: "👨‍💼",
      rating: 5,
      text: "الخدمة المتميزة والاحترافية. تعاملوا مع قضيتي بشفافية تامة. كل خطوة تمت بوضوح. هذا ما نبحث عنه.",
      verified: true,
    },
    {
      name: "سارة المطيري",
      role: "مستثمرة",
      city: "جدة",
      image: "👩‍💼",
      rating: 5,
      text: "استشرتهم في عقد استثماري معقد. النصيحة القانونية وفرت لي الكثير من المشاكل المستقبلية. استثمار ذكي في الاستشارة.",
      verified: true,
    },
    {
      name: "علي الزهراني",
      role: "صاحب متجر",
      city: "جدة",
      image: "👨‍💼",
      rating: 5,
      text: "تعاملوا مع مشكلة عقارية عائلية كان لازم حل. الحمد لله انتهت بسلام. تعاملهم احترافي وودود.",
      verified: true,
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <section style={{ padding: "80px 24px", background: "#FAFAF8" }}>
      <div style={{ maxWidth: "1152px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "64px" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "rgba(201,168,76,0.12)",
              border: "1px solid rgba(201,168,76,0.35)",
              borderRadius: "999px",
              padding: "6px 16px",
              marginBottom: "20px",
            }}
          >
            <Star size={13} color="#C9A84C" />
            <span style={{ color: "#C9A84C", fontSize: "12px", fontWeight: 600 }}>
              تقييمات عملاؤنا
            </span>
          </div>
          <h2
            style={{
              fontFamily: "'Noto Kufi Arabic', serif",
              fontSize: "clamp(28px, 4vw, 44px)",
              fontWeight: 900,
              color: "#1A2744",
              lineHeight: "1.25",
              marginBottom: "16px",
            }}
          >
            ماذا يقول عملاؤنا؟
          </h2>
          <p
            style={{
              fontSize: "18px",
              color: "#6B6B6B",
              lineHeight: "1.8",
            }}
          >
            أصوات حقيقية من عملاء حقيقيين غيرنا حياتهم القانونية
          </p>
        </div>

        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <div style={{ display: "flex", justifyContent: "center", gap: "4px", marginBottom: "12px" }}>
            {[1, 2, 3, 4, 5].map((i: any) => (
              <Star key={i} size={24} fill="#C9A84C" color="#C9A84C" />
            ))}
          </div>
          <p
            style={{
              fontFamily: "'Noto Kufi Arabic', serif",
              fontSize: "24px",
              fontWeight: 700,
              color: "#1A2744",
              marginBottom: "6px",
            }}
          >
            4.9 من 5 نجوم
          </p>
          <p style={{ color: "#6B6B6B", fontSize: "14px", marginBottom: "10px" }}>
            بناءً على 300+ تقييم من عملاء حقيقيين
          </p>
          <a
            href="https://maps.google.com/?q=جدة+شارع+التحلية+مكتب+السعدي+للمحاماة"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              color: "#C9A84C",
              fontSize: "13px",
              fontWeight: 600,
              textDecoration: "underline",
              textUnderlineOffset: "3px",
            }}
          >
            تحقق من تقييماتنا على خرائط جوجل بنفسك ↗
          </a>
        </div>

        <div style={{ position: "relative", marginBottom: "40px", perspective: "1000px", overflow: "hidden" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr" }}>
            {testimonials.map((testimonial: any, index: any) => (
              <div
                key={index}
                style={{
                  gridColumn: "1",
                  gridRow: "1",
                  opacity: currentIndex === index ? 1 : 0,
                  transform:
                    currentIndex === index ? "translateX(0) scale(1)" : "translateX(100px) scale(0.95)",
                  transition: "opacity 0.5s ease, transform 0.5s ease",
                  pointerEvents: currentIndex === index ? "auto" : "none",
                }}
              >
                <div
                  style={{
                    background: "#FFFFFF",
                    border: "1px solid rgba(201,168,76,0.2)",
                    borderRadius: "16px",
                    padding: "40px",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    boxShadow: "0 4px 24px rgba(26,39,68,0.08)",
                  }}
                >
                  <Quote size={32} color="rgba(201,168,76,0.4)" style={{ marginBottom: "12px" }} />

                  <p
                    style={{
                      color: "#1A2744",
                      fontSize: "18px",
                      lineHeight: "1.8",
                      marginBottom: "24px",
                      flex: 1,
                    }}
                  >
                    "{testimonial.text}"
                  </p>

                  <div>
                    <div style={{ display: "flex", gap: "12px", alignItems: "center", marginBottom: "12px" }}>
                      <div
                        style={{
                          width: "48px",
                          height: "48px",
                          background: "rgba(201,168,76,0.15)",
                          borderRadius: "50%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "24px",
                        }}
                      >
                        {testimonial.image}
                      </div>
                      <div>
                        <p style={{ color: "#1A2744", fontWeight: 700, marginBottom: "2px" }}>
                          {testimonial.name}
                          {testimonial.verified && (
                            <span style={{ marginLeft: "6px", color: "#16A34A", fontSize: "12px" }}>✓</span>
                          )}
                        </p>
                        <p style={{ color: "#6B6B6B", fontSize: "13px" }}>
                          {testimonial.role} • {testimonial.city}
                        </p>
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: "2px" }}>
                      {[...Array(testimonial.rating)].map((_: any, i: any) => (
                        <Star key={i} size={14} fill="#C9A84C" color="#C9A84C" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "center", gap: "12px", marginBottom: "40px" }}>
          {testimonials.map((_: any, index: any) => (
            <button
              key={index}
              onClick={() => goToTestimonial(index)}
              style={{
                width: currentIndex === index ? "28px" : "10px",
                height: "10px",
                background: currentIndex === index ? "#C9A84C" : "rgba(201,168,76,0.3)",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
