import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

const prisma = new PrismaClient();

async function importArticles() {
  try {
    const blogsDir = "\\tmp\\seo-content\\blog";

    if (!fs.existsSync(blogsDir)) {
      console.log("❌ مجلد المقالات غير موجود");
      return;
    }

    const files = fs.readdirSync(blogsDir).filter((f) => f.endsWith(".md"));
    console.log(`📚 عدد المقالات المكتشفة: ${files.length}`);

    for (const file of files) {
      const filePath = path.join(blogsDir, file);
      const fileContent = fs.readFileSync(filePath, "utf-8");

      // Parse front matter
      const { data, content } = matter(fileContent);

      const post = {
        title: data.title || file,
        slug: data.slug || file.replace(".md", ""),
        content: content,
        excerpt: data.metaDescription || content.substring(0, 200),
        category: data.category || "blog",
        coverImage: data.imageUrl || null,
        published: true,
        publishedAt: new Date(data.date || new Date()),
      };

      // Check if post exists
      const existing = await prisma.post.findUnique({
        where: { slug: post.slug },
      });

      if (existing) {
        // Update
        await prisma.post.update({
          where: { slug: post.slug },
          data: post,
        });
        console.log(`✏️ تحديث: ${post.title}`);
      } else {
        // Create
        await prisma.post.create({ data: post });
        console.log(`✅ إنشاء: ${post.title}`);
      }
    }

    console.log("\n✨ تم استيراد جميع المقالات بنجاح!");
  } catch (error) {
    console.error("❌ خطأ:", error);
  } finally {
    await prisma.$disconnect();
  }
}

importArticles();
