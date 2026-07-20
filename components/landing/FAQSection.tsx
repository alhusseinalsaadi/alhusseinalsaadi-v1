"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "ما هي تكلفة الاستشارة القانونية الأولى؟",
      answer:
        "الاستشارة الأولى مجانية تماماً. نقيّم حالتك، نفهم احتياجاتك، ونقدم لك خطة عمل واضحة بدون أي التزام مالي. فقط بعدها تقرر إذا كنت تريد العمل معنا.",
    },
    {
      question: "كم تستغرق عملية تقييم الحالة؟",
      answer:
        "نرد فوراً على رسائل واتساب والمكالمات، وخلال ساعة واحدة على طلبات النماذج. بعدها نحدد لقاء الاستشارة الأولى معك في نفس اليوم.",
    },
    {
      question: "هل معلومات حالتي آمنة وسرية؟",
      answer:
        "نعم تماماً. نحترم السرية التامة لكل عميل. كل المعلومات محفوظة بسرية عميقة وفقاً للقوانين السعودية. هذا واحد من أهم التزاماتنا المهنية.",
    },
    {
      question: "هل تتعاملون مع جميع أنواع القضايا القانونية؟",
      answer:
        "نتخصص في 17 مجالاً قانونياً مختلفاً: قانون جنائي، قضايا تجارية، عقارات، ملكية فكرية، عقود، قضايا أسرية، وغيرها. إذا كانت حالتك خارج تخصصنا، نوجهك للمحامي المناسب.",
    },
    {
      question: "كم عدد الحالات التي تعاملتم معها؟",
      answer:
        "تعاملنا مع أكثر من 300 حالة قضائية ناجحة. نسبة نجاحنا تبلغ 98%، وهذا يعكس خبرتنا وكفاءتنا في التعامل مع القضايا المعقدة.",
    },
    {
      question: "ما هي خبرة فريقك القانوني؟",
      answer:
        "فريقنا يتكون من محامين معتمدين من هيئة المحامين السعوديين بخبرة تزيد عن 15 سنة في القانون السعودي. كل عضو متخصص في مجال معين.",
    },
    {
      question: "هل يمكنكم تمثيلي أمام المحاكم العليا؟",
      answer:
        "نعم. نحن مرخصون للتمثيل أمام جميع المحاكم السعودية بما فيها محكمة التمييز وديوان المظالم والمحاكم الشرعية والمتخصصة.",
    },
    {
      question: "هل تقدمون استشارات قانونية للشركات؟",
      answer:
        "نعم، نقدم استشارات شاملة للشركات: تأسيس الشركات، صياغة العقود، مراجعة الأنظمة، حل النزاعات، الملكية الفكرية، والقضايا التجارية المعقدة.",
    },
    {
      question: "كيف أتواصل معكم في حالات الطوارئ؟",
      answer:
        "يمكنك التواصل معنا عبر WhatsApp أو الهاتف 24/7. نضمن الرد في أقرب وقت. للحالات الطارئة، نتوفر لمناقشة المسألة فوراً.",
    },
    {
      question: "هل يمكنكم التعامل مع قضايا معقدة متعددة الأطراف؟",
      answer:
        "نعم، نتخصص في القضايا المعقدة. لدينا خبرة في التعامل مع القضايا التي تشمل عدة أطراف وتفاصيل قانونية معقدة.",
    },
    {
      question: "ماذا إذا خسرت القضية؟",
      answer:
        "نناقش كل احتمالات القضية معك من البداية. ندافع عن مصلحتك بأفضل طريقة ممكنة. إذا كانت القضية قابلة للاستئناف، نستعرض الخيارات معك.",
    },
    {
      question: "كم تستغرق القضايا عادة للانتهاء؟",
      answer:
        "المدة تختلف حسب نوع القضية ودرجة تعقيدها. القضايا البسيطة قد تستغرق شهوراً، والقضايا المعقدة قد تستغرق سنوات. نعطيك توقعاً واقعياً منذ البداية.",
    },
    {
      question: "هل لديكم فروع في مدن أخرى بالسعودية؟",
      answer:
        "مقرنا الرئيسي في جدة (شارع التحلية). نتعامل مع قضايا في جميع أنحاء السعودية. يمكننا التعامل مع معظم الحالات عن بُعد عبر الاتصالات الرسمية.",
    },
    {
      question: "كيف تضمنون نتائج إيجابية؟",
      answer:
        "لا أحد يستطيع ضمان النتيجة 100%، لكننا نضمن: تمثيلاً احترافياً كاملاً، استراتيجية قانونية مدروسة، ومتابعة دقيقة لكل تفصيل.",
    },
    {
      question: "هل تقدمون استشارات عن بُعد؟",
      answer:
        "نعم. يمكنك التشاور معنا عبر الهاتف أو الفيديو. الكثير من عملائنا يتعاملون معنا عن بُعد بنجاح كامل.",
    },
    {
      question: "ما هي الخطوة الأولى لبدء العمل معكم؟",
      answer:
        "كل ما عليك هو التواصل معنا: عبر WhatsApp، الهاتف، أو استمارة التواصل. سنرتب لك لقاء استشاري مجاني لتقييم حالتك.",
    },
    {
      question: "هل يمكن التعاقد معكم لقضايا طويلة الأجل؟",
      answer:
        "نعم. نقدم خدمات استشارة قانونية مستمرة للعملاء المؤسسيين والأفراد الذين يحتاجون إلى دعم قانوني مستمر.",
    },
    {
      question: "كم تكلفة الخدمات القانونية بعد الاستشارة المجانية؟",
      answer:
        "بعد الاستشارة المجانية الأولى، نقدم لك عرض رسوم مكتوباً وواضحاً قبل بدء أي عمل — بعض الحالات برسوم ثابتة، وأخرى برسوم مرتبطة بالنتائج. لا يُحتسب عليك ريال واحد قبل موافقتك الكتابية على العرض، ولا توجد أي رسوم مخفية.",
    },
    {
      question: "هل أنتم أعضاء في جمعيات مهنية؟",
      answer:
        "نعم. نحن أعضاء نشطون في هيئة المحامين السعوديين وجمعيات متخصصة أخرى. هذا يعكس التزامنا بمعايير المهنة العالية.",
    },
  ];

  return (
    <section style={{ padding: "80px 24px", background: "#FFFFFF" }}>
      <div style={{ maxWidth: "896px", margin: "0 auto" }}>
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
            <span style={{ color: "#C9A84C", fontSize: "12px", fontWeight: 600 }}>
              ؟ الأسئلة الشائعة
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
            الأسئلة التي يطرحها عملاؤنا دائماً
          </h2>
          <p style={{ fontSize: "18px", color: "#6B6B6B", lineHeight: "1.8" }}>
            إذا لم تجد إجابة لسؤالك، تواصل معنا مباشرة
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {faqs.map((faq: any, index: any) => (
            <div
              key={index}
              style={{
                border: "1px solid rgba(201,168,76,0.25)",
                borderRadius: "12px",
                overflow: "hidden",
                background: openIndex === index ? "rgba(201,168,76,0.06)" : "#FFFFFF",
                transition: "all 0.3s ease",
              }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                style={{
                  width: "100%",
                  padding: "20px",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  justifyContent: "space-between",
                }}
              >
                <h3
                  style={{
                    fontFamily: "'Noto Kufi Arabic', serif",
                    fontSize: "16px",
                    fontWeight: 700,
                    color: "#1A2744",
                    textAlign: "right",
                    flex: 1,
                  }}
                >
                  {faq.question}
                </h3>
                <ChevronDown
                  size={20}
                  color="#C9A84C"
                  style={{
                    transform: openIndex === index ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 0.3s ease",
                    flexShrink: 0,
                  }}
                />
              </button>

              {openIndex === index && (
                <div
                  style={{
                    padding: "0 20px 20px 20px",
                    borderTop: "1px solid rgba(201,168,76,0.2)",
                    animation: "slideDown 0.3s ease",
                  }}
                >
                  <p style={{ color: "#6B6B6B", fontSize: "15px", lineHeight: "1.8" }}>
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div
          style={{
            marginTop: "32px",
            padding: "28px",
            background: "rgba(201,168,76,0.06)",
            border: "1px solid rgba(201,168,76,0.2)",
            borderRadius: "16px",
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontFamily: "'Noto Kufi Arabic', serif",
              fontSize: "17px",
              fontWeight: 700,
              color: "#1A2744",
            }}
          >
            لم تجد إجابة لسؤالك؟ <span style={{ color: "#C9A84C" }}>تواصل معنا مباشرة</span>
          </p>
        </div>
      </div>

      <style>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
