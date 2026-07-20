import type { MetadataRoute } from "next";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://alhusseinalsaadi.sa";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL,                                    lastModified: new Date(), changeFrequency: "weekly",  priority: 1.0 },
    { url: `${SITE_URL}/about`,                         lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/contact`,                       lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/blog`,                          lastModified: new Date(), changeFrequency: "daily",   priority: 0.8 },
    { url: `${SITE_URL}/news`,                          lastModified: new Date(), changeFrequency: "daily",   priority: 0.7 },
    { url: `${SITE_URL}/services`,                      lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/services/legal-consulting`,     lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/services/contract-review`,      lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/services/dispute-resolution`,   lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/services/real-estate-law`,      lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/services/compliance`,           lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/services/deal-closing`,         lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/privacy-policy`,                lastModified: new Date(), changeFrequency: "yearly",  priority: 0.3 },
    { url: `${SITE_URL}/terms`,                         lastModified: new Date(), changeFrequency: "yearly",  priority: 0.3 },
  ];

  let dynamicPages: MetadataRoute.Sitemap = [];
  try {
    const posts = await prisma.post.findMany({
      where: { published: true },
      select: { slug: true, category: true, publishedAt: true, updatedAt: true },
      orderBy: { publishedAt: "desc" },
    });

    dynamicPages = posts.map((post: any) => ({
      url: `${SITE_URL}/${post.category === "news" ? "news" : "blog"}/${post.slug}`,
      lastModified: post.updatedAt,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));
  } catch {
    // DB unavailable during build — dynamic pages will be omitted
  }

  return [...staticPages, ...dynamicPages];
}
