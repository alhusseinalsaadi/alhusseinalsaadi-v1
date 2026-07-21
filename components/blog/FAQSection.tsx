"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  faqs: FAQItem[];
}

export default function FAQSection({ faqs }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section style={{ marginTop: "60px", marginBottom: "40px" }}>
      <div style={{ marginBottom: "40px" }}>
        <h2 style={{ fontFamily: "'Noto Kufi Arabic', serif", fontSize: "32px", fontWeight: 700, color: "#1A2744", marginBottom: "12px", paddingBottom: "12px", borderBottom: "3px solid #C9A84C" }}>
          الأسئلة الشائعة
        </h2>
        <p style={{ color: "#666", fontSize: "16px", lineHeight: "1.6" }}>
          إجابات على أكثر الأسئلة التي يطرحها الموظفون والعمال
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {faqs.map((item, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #E5E5E0",
              borderRadius: "12px",
              overflow: "hidden",
              transition: "all 0.3s ease",
              boxShadow: openIndex === index ? "0 8px 20px rgba(26,39,68,0.12)" : "0 2px 8px rgba(0,0,0,0.05)",
            }}
          >
            {/* Question */}
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              style={{
                width: "100%",
                padding: "20px 24px",
                background: openIndex === index ? "#F9F7F4" : "white",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "16px",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                if (openIndex !== index) {
                  e.currentTarget.style.background = "#FAFAF8";
                }
              }}
              onMouseLeave={(e) => {
                if (openIndex !== index) {
                  e.currentTarget.style.background = "white";
                }
              }}
            >
              <span style={{ fontFamily: "'Noto Kufi Arabic', serif", fontSize: "17px", fontWeight: 700, color: "#1A2744", textAlign: "right", flex: 1 }}>
                {item.question}
              </span>
              <ChevronDown
                size={24}
                color="#C9A84C"
                style={{
                  transition: "transform 0.3s ease",
                  transform: openIndex === index ? "rotate(180deg)" : "rotate(0deg)",
                  flexShrink: 0,
                }}
              />
            </button>

            {/* Answer */}
            {openIndex === index && (
              <div
                style={{
                  padding: "24px",
                  background: "white",
                  borderTop: "1px solid #E5E5E0",
                  animation: "slideDown 0.3s ease",
                }}
              >
                <p style={{ fontSize: "16px", lineHeight: "1.8", color: "#333", margin: 0, textAlign: "justify" }}>
                  {item.answer}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      <style>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}
