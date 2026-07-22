"use client";

import { useState } from "react";

interface ArticleCoverProps {
  src: string;
  alt: string;
}

const PLACEHOLDER = "/images/blog/placeholder.svg";

export default function ArticleCover({ src, alt }: ArticleCoverProps) {
  const [imgSrc, setImgSrc] = useState(src || PLACEHOLDER);

  return (
    <div className="article-cover-wrap">
      <img
        src={imgSrc}
        alt={alt}
        loading="eager"
        className="article-cover-img"
        onError={() => {
          if (imgSrc !== PLACEHOLDER) setImgSrc(PLACEHOLDER);
        }}
      />
      <style>{`
        .article-cover-wrap {
          background: white;
          padding: 0 24px;
        }
        .article-cover-wrap > * + * { margin: 0; }
        .article-cover-img {
          display: block;
          width: 100%;
          max-width: 900px;
          height: 420px;
          object-fit: cover;
          border-radius: 12px;
          margin: -60px auto 40px;
          box-shadow: 0 10px 40px rgba(26,39,68,0.15);
          background: linear-gradient(135deg, #1A2744 0%, #2D3E5F 100%);
        }
        @media (max-width: 768px) {
          .article-cover-wrap { padding: 0 16px; }
          .article-cover-img {
            height: 220px;
            margin: -30px auto 24px;
            border-radius: 10px;
          }
        }
        @media (max-width: 480px) {
          .article-cover-img { height: 180px; }
        }
      `}</style>
    </div>
  );
}
