"use client";

import { Scale, FileText, Handshake, Gavel, CheckSquare, Building2, Users, BookOpen, Briefcase, Shield, Globe, Heart, Search, ArrowLeft } from "lucide-react";
import { openBookingModal } from "@/components/landing/BookingModal";

const services = [
  { icon: Briefcase, title: "القضايا التجارية", desc: "تمثيل قانوني في جميع النزاعات التجارية أمام المحاكم السعودية وهيئات التحكيم.", color: "#1A2744" },
  { icon: Users, title: "تقسيم التركات", desc: "إدارة وتوزيع التركات وفق أحكام الشريعة الإسلامية والأنظمة السعودية بشفافية تامة.", color: "#C9A84C" },
  { icon: Gavel, title: "المنازعات التنفيذية", desc: "متابعة تنفيذ الأحكام القضائية واسترداد الحقوق عبر القنوات التنفيذية الرسمية.", color: "#1A2744" },
  { icon: Shield, title: "القانون الجنائي", desc: "الدفاع القانوني في القضايا الجنائية وتقديم الاستشارات في مجال القانون الجزائي السعودي.", color: "#C9A84C" },
  { icon: Heart, title: "الثروات العائلية", desc: "حماية وإدارة الثروات العائلية والأصول من خلال هياكل قانونية متينة ومستدامة.", color: "#1A2744" },
  { icon: Globe, title: "الملكية الفكرية", desc: "تسجيل وحماية العلامات التجارية وحقوق النشر وبراءات الاختراع وفق الأنظمة السعودية والدولية.", color: "#C9A84C" },
  { icon: Building2, title: "الأنظمة العقارية", desc: "استشارات قانونية في بيع وشراء وتأجير العقارات وفق أنظمة الهيئة العامة للعقار.", color: "#1A2744" },
  { icon: Briefcase, title: "خدمات الشركات", desc: "تأسيس الشركات وصياغة عقود الشراكة وإعادة الهيكلة وفق نظام الشركات السعودي.", color: "#C9A84C" },
  { icon: FileText, title: "التوثيق القانوني", desc: "توثيق العقود والوثائق القانونية وتصديقها أمام الجهات الرسمية والسفارات.", color: "#1A2744" },
  { icon: Scale, title: "العقود والأنظمة التجارية", desc: "صياغة ومراجعة وتحليل جميع أنواع العقود التجارية وفق المعايير القانونية السعودية.", color: "#C9A84C" },
  { icon: Handshake, title: "التحكيم وحل النزاعات", desc: "تمثيل العملاء في جلسات التحكيم التجاري والوساطة للوصول إلى تسويات عادلة.", color: "#1A2744" },
  { icon: BookOpen, title: "الاستشارات القانونية", desc: "استشارات قانونية شاملة ومتخصصة في جميع المجالات لأفراد والشركات.", color: "#C9A84C" },
  { icon: Gavel, title: "التحكيم والتسويات", desc: "خبرة واسعة في إجراءات التحكيم المحلي والدولي وصياغة اتفاقيات التسوية.", color: "#1A2744" },
  { icon: Users, title: "نظام العمل والعلاقات العمالية", desc: "حل نزاعات العمل وصياغة عقود التوظيف والتعامل مع وزارة الموارد البشرية.", color: "#C9A84C" },
  { icon: Search, title: "دراسة القضايا", desc: "تحليل قانوني معمّق للقضايا وتقييم فرص النجاح وإعداد استراتيجية الدفاع المناسبة.", color: "#1A2744" },
  { icon: CheckSquare, title: "القضاء الإداري — ديوان المظالم", desc: "الطعن في القرارات الإدارية والتظلم أمام ديوان المظالم وهيئاته القضائية المتخصصة.", color: "#C9A84C" },
  { icon: Heart, title: "قضايا الأحوال الشخصية", desc: "الطلاق، الحضانة، النفقة، الميراث وجميع قضايا الأسرة وفق أحكام الشريعة الإسلامية.", color: "#1A2744" },
];

export default function ServicesSection() {
  return (
    <section style={{ background: "#FAFAF8", padding: "96px 24px" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "64px" }}>
          <p style={{ color: "#C9A84C", fontWeight: 600, fontSize: "14px", textTransform: "uppercase", letterSpacing: "2px", marginBottom: "12px" }}>
            خدماتنا القانونية
          </p>
          <h2 style={{ fontFamily: "'Noto Kufi Arabic', serif", fontSize: "42px", fontWeight: 900, color: "#1A2744", marginBottom: "16px" }}>
            نغطي كل احتياجاتك القانونية
          </h2>
          <div className="gold-divider" />
          <p style={{ fontSize: "18px", color: "#6B6B6B", maxWidth: "600px", margin: "0 auto" }}>
            17 تخصصاً قانونياً تحت سقف واحد — فريق متكامل جاهز لتقديم أفضل الحلول لمشكلتك
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(300px, 100%), 1fr))",
            gap: "20px",
          }}
        >
          {services.map((service: any, idx: any) => {
            const Icon = service.icon;
            return (
              <div
                key={idx}
                className="card"
                onClick={openBookingModal}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") openBookingModal(); }}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "14px",
                  position: "relative",
                  overflow: "hidden",
                  cursor: "pointer",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    width: "4px",
                    height: "100%",
                    background: service.color === "#C9A84C" ? "#C9A84C" : "#1A2744",
                  }}
                />
                <div
                  style={{
                    width: "52px",
                    height: "52px",
                    background: service.color === "#C9A84C" ? "rgba(201,168,76,0.1)" : "rgba(26,39,68,0.08)",
                    borderRadius: "12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Icon size={24} color={service.color} />
                </div>
                <h3 style={{ fontFamily: "'Noto Kufi Arabic', serif", fontSize: "18px", fontWeight: 700, color: "#1A2744" }}>
                  {service.title}
                </h3>
                <p style={{ color: "#6B6B6B", fontSize: "14px", lineHeight: "1.7", flex: 1 }}>
                  {service.desc}
                </p>
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    color: service.color,
                    fontWeight: 600,
                    fontSize: "13px",
                    marginTop: "4px",
                  }}
                >
                  احجز استشارة
                  <ArrowLeft size={13} style={{ transform: "scaleX(-1)" }} />
                </span>
              </div>
            );
          })}
        </div>

        <div style={{ textAlign: "center", marginTop: "48px" }}>
          <button onClick={openBookingModal} className="btn-primary">
            تحتاج استشارة في أحد هذه المجالات؟ تواصل معنا
          </button>
        </div>
      </div>
    </section>
  );
}
