"use client";

import { Share2 } from "lucide-react";

interface ShareButtonsProps {
  title: string;
  url: string;
}

export default function ShareButtons({ title, url }: ShareButtonsProps) {
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title, url }).catch(() => {});
    } else {
      navigator.clipboard?.writeText(url);
    }
  };

  return (
    <div style={{ marginTop: "48px", padding: "24px", background: "#F9F7F4", borderRadius: "12px", textAlign: "center" }}>
      <p style={{ color: "#6B6B6B", marginBottom: "16px", fontSize: "14px" }}>شارك هذه المقالة</p>
      <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
        <button
          onClick={handleShare}
          style={{ background: "#1A2744", color: "white", border: "none", padding: "10px 20px", borderRadius: "8px", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px", fontSize: "14px", fontWeight: 600 }}
        >
          <Share2 size={16} /> شارك
        </button>
        <a
          href={`https://wa.me/?text=${encodeURIComponent(title + " " + url)}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{ background: "#25D366", color: "white", padding: "10px 20px", borderRadius: "8px", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "8px", fontSize: "14px", fontWeight: 600 }}
        >
          واتس آب
        </a>
        <a
          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{ background: "#1DA1F2", color: "white", padding: "10px 20px", borderRadius: "8px", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "8px", fontSize: "14px", fontWeight: 600 }}
        >
          تويتر
        </a>
      </div>
    </div>
  );
}
