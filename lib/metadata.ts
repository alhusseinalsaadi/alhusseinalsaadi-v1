import type { Metadata } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://alhusseinalsaadi.sa";
const SITE_NAME = "مكتب الحسين بن أحمد بن حسين السعدي للمحاماة";
const DEFAULT_OG_IMAGE = `${SITE_URL}/logo.png`;

interface PageMetaOptions {
  title: string;
  description: string;
  path: string;
  ogImage?: string | null;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
}

export function buildPageMeta({
  title,
  description,
  path,
  ogImage,
  type = "website",
  publishedTime,
  modifiedTime,
}: PageMetaOptions): Metadata {
  const url = `${SITE_URL}${path}`;
  const image = ogImage || DEFAULT_OG_IMAGE;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      locale: "ar_SA",
      type,
      images: [{ url: image, width: 1200, height: 630, alt: title }],
      ...(publishedTime ? { publishedTime } : {}),
      ...(modifiedTime ? { modifiedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export { SITE_URL, SITE_NAME, DEFAULT_OG_IMAGE };
