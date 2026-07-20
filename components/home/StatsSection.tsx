"use client";

import { useEffect, useRef, useState } from "react";

const stats = [
  { end: 300, suffix: "+", label: "موكل راضٍ", sublabel: "خدمنا أكثر من 300 عميل" },
  { end: 17, suffix: "", label: "سنة في القانون", sublabel: "خبرة متراكمة منذ 2008" },
  { end: 6, suffix: "+", label: "تخصصات قانونية", sublabel: "نغطي كل احتياجاتك" },
  { end: 98, suffix: "%", label: "نسبة الرضا", sublabel: "وفق استطلاعات العملاء" },
];

function CountUp({ end, suffix, duration = 2000 }: { end: number; suffix: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const startTime = performance.now();
          const step = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * end));
            if (progress < 1) requestAnimationFrame(step);
            else setCount(end);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function StatsSection() {
  return (
    <section style={{ background: "#1A2744", padding: "72px 24px" }}>
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "40px",
        }}
      >
        {stats.map((stat: any) => (
          <div
            key={stat.label}
            style={{
              textAlign: "center",
              padding: "32px 20px",
              borderRadius: "16px",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(201,168,76,0.15)",
              transition: "all 0.3s",
            }}
          >
            <div
              style={{
                fontFamily: "'Noto Kufi Arabic', serif",
                fontSize: "52px",
                fontWeight: 900,
                color: "#C9A84C",
                lineHeight: 1,
                marginBottom: "8px",
              }}
            >
              <CountUp end={stat.end} suffix={stat.suffix} />
            </div>
            <div
              style={{
                fontSize: "18px",
                fontWeight: 700,
                color: "white",
                marginBottom: "6px",
                fontFamily: "'Noto Kufi Arabic', serif",
              }}
            >
              {stat.label}
            </div>
            <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.45)" }}>
              {stat.sublabel}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
