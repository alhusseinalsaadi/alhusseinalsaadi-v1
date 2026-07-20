"use client";

import { useEffect, useRef, useState } from "react";
import { Users, Trophy, Briefcase, Award } from "lucide-react";

const AnimatedCounter = ({
  target,
  duration = 2000,
  suffix = "",
}: {
  target: number;
  duration?: number;
  suffix?: string;
}) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const hasStarted = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !hasStarted.current) {
        hasStarted.current = true;
        const startTime = Date.now();

        const animate = () => {
          const elapsed = Date.now() - startTime;
          const progress = Math.min(elapsed / duration, 1);
          setCount(Math.floor(target * progress));

          if (progress < 1) {
            requestAnimationFrame(animate);
          } else {
            setCount(target);
          }
        };

        animate();
      }
    });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [target, duration]);

  return <div ref={ref}>{count}{suffix}</div>;
};

export default function StatsSection() {
  const stats = [
    { icon: Users, number: 300, suffix: "+", label: "عميل راضي", description: "موكل استفادوا من خدماتنا", color: "#C9A84C" },
    { icon: Trophy, number: 98, suffix: "%", label: "نسبة نجاح", description: "معدل نجاحنا في القضايا", color: "#C9A84C" },
    { icon: Briefcase, number: 17, suffix: "+", label: "تخصص قانوني", description: "مجالات متخصصة نغطيها", color: "#C9A84C" },
    { icon: Award, number: 15, suffix: "+", label: "سنة خبرة", description: "في المجال القانوني السعودي", color: "#C9A84C" },
  ];

  return (
    <section className="gradient-hero" style={{ padding: "80px 24px" }}>
      <div style={{ maxWidth: "1152px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "24px" }}>
          {stats.map((stat: any, index: any) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                style={{
                  background: "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)",
                  border: `1px solid ${stat.color}33`,
                  borderRadius: "16px",
                  padding: "32px",
                  textAlign: "center",
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = `${stat.color}66`;
                  el.style.background = `${stat.color}08`;
                  el.style.transform = "translateY(-8px)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = `${stat.color}33`;
                  el.style.background =
                    "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)";
                  el.style.transform = "translateY(0)";
                }}
              >
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "60px",
                    height: "60px",
                    background: `${stat.color}15`,
                    borderRadius: "12px",
                    marginBottom: "16px",
                  }}
                >
                  <Icon size={28} color={stat.color} />
                </div>

                <div
                  style={{
                    fontFamily: "'Noto Kufi Arabic', serif",
                    fontSize: "clamp(32px, 6vw, 42px)",
                    fontWeight: 900,
                    color: stat.color,
                    marginBottom: "8px",
                    lineHeight: 1,
                  }}
                >
                  <AnimatedCounter target={stat.number} suffix={stat.suffix} />
                </div>

                <h3
                  style={{
                    fontFamily: "'Noto Kufi Arabic', serif",
                    fontSize: "18px",
                    fontWeight: 700,
                    color: "white",
                    marginBottom: "8px",
                  }}
                >
                  {stat.label}
                </h3>

                <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "13px", lineHeight: "1.6" }}>
                  {stat.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
