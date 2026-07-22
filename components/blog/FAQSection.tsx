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
    <section className="faq-section">
      <div className="faq-header">
        <h2 className="faq-title">الأسئلة الشائعة</h2>
        <p className="faq-lead">إجابات على أكثر الأسئلة التي يطرحها الموظفون والعمال</p>
      </div>

      <div className="faq-list">
        {faqs.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <div key={index} className={`faq-item${isOpen ? " open" : ""}`}>
              <button
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="faq-question"
                aria-expanded={isOpen}
              >
                <span className="faq-question-text">{item.question}</span>
                <ChevronDown
                  size={22}
                  color="#C9A84C"
                  className="faq-chevron"
                  style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                />
              </button>
              {isOpen && (
                <div className="faq-answer">
                  <p>{item.answer}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <style>{`
        .faq-section { margin: 60px 0 40px; }
        .faq-header  { margin-bottom: 32px; }
        .faq-title {
          font-family: 'Noto Kufi Arabic', serif;
          font-size: 30px;
          font-weight: 700;
          color: #1A2744;
          margin: 0 0 10px;
          padding-bottom: 12px;
          border-bottom: 3px solid #C9A84C;
        }
        .faq-lead { color: #666; font-size: 16px; line-height: 1.6; margin: 0; }
        .faq-list { display: flex; flex-direction: column; gap: 14px; }
        .faq-item {
          border: 1px solid #E5E5E0;
          border-radius: 12px;
          overflow: hidden;
          transition: box-shadow 0.3s ease;
          box-shadow: 0 2px 8px rgba(0,0,0,0.05);
          background: white;
        }
        .faq-item.open { box-shadow: 0 8px 20px rgba(26,39,68,0.12); }
        .faq-question {
          width: 100%;
          padding: 18px 20px;
          background: white;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 14px;
          transition: background 0.2s ease;
          text-align: right;
        }
        .faq-item.open .faq-question { background: #F9F7F4; }
        .faq-question:hover { background: #FAFAF8; }
        .faq-question-text {
          font-family: 'Noto Kufi Arabic', serif;
          font-size: 16px;
          font-weight: 700;
          color: #1A2744;
          text-align: right;
          flex: 1;
          line-height: 1.5;
        }
        .faq-chevron { transition: transform 0.3s ease; flex-shrink: 0; }
        .faq-answer {
          padding: 20px;
          background: white;
          border-top: 1px solid #E5E5E0;
          animation: slideDown 0.3s ease;
        }
        .faq-answer p {
          font-size: 15px;
          line-height: 1.8;
          color: #333;
          margin: 0;
          text-align: justify;
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 768px) {
          .faq-section { margin: 40px 0 24px; }
          .faq-header  { margin-bottom: 24px; }
          .faq-title { font-size: 22px; }
          .faq-lead  { font-size: 14px; }
          .faq-question { padding: 14px 16px; gap: 10px; }
          .faq-question-text { font-size: 15px; }
          .faq-answer { padding: 16px; }
          .faq-answer p { font-size: 14px; line-height: 1.7; }
        }
      `}</style>
    </section>
  );
}
