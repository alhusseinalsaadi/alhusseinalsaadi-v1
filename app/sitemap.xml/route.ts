import { NextResponse } from "next/server";
import { getAllBlogPosts } from "@/lib/supabase-client";

export const dynamic = "force-dynamic";

export async function GET() {
  const SITE_URL = "https://alhusseinalsaadi.sa";

  // Get all blog posts
  const posts = process.env.SUPABASE_SERVICE_ROLE_KEY ? await getAllBlogPosts() : [];

  // Generate sitemap
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0">
  <!-- Homepage -->
  <url>
    <loc>${SITE_URL}</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>

  <!-- Blog List -->
  <url>
    <loc>${SITE_URL}/blog</loc>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>

  <!-- Blog Posts -->
  ${posts
    .map(
      (post: any) => `
  <url>
    <loc>${SITE_URL}/blog/${post.slug}</loc>
    <lastmod>${new Date(post.updatedAt).toISOString().split("T")[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
    ${post.coverImage ? `<image:image><image:loc>${post.coverImage}</image:loc><image:title>${post.title}</image:title></image:image>` : ""}
  </url>
  `
    )
    .join("")}

  <!-- Services Pages -->
  <url>
    <loc>${SITE_URL}/services</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>

  <!-- Contact -->
  <url>
    <loc>${SITE_URL}/contact</loc>
    <changefreq>yearly</changefreq>
    <priority>0.7</priority>
  </url>
</urlset>`;

  return new NextResponse(sitemap, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
