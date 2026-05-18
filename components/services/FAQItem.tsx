"use client";

interface FAQ {
  q: string;
  a: string;
}

export default function FAQItem({ faq }: { faq: FAQ }) {
  return (
    <details
      style={{
        background: "white",
        borderRadius: "12px",
        border: "1px solid #E5E5E0",
        overflow: "hidden",
        cursor: "pointer",
      }}
    >
      <summary
        style={{
          padding: "20px 24px",
          fontWeight: 700,
          fontSize: "16px",
          color: "#1A2744",
          listStyle: "none",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontFamily: "'Noto Kufi Arabic', serif",
          cursor: "pointer",
        }}
      >
        {faq.q}
        <span style={{ color: "#C9A84C", fontSize: "20px", flexShrink: 0 }}>+</span>
      </summary>
      <div
        style={{
          padding: "16px 24px 20px",
          fontSize: "15px",
          color: "#6B6B6B",
          lineHeight: "1.8",
          borderTop: "1px solid #E5E5E0",
        }}
      >
        {faq.a}
      </div>
    </details>
  );
}
