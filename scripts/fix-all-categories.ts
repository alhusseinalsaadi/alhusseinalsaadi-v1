import { prisma } from "@/lib/db";

async function fixAllCategories() {
  // Fix all non-blog categories
  const updated = await prisma.post.updateMany({
    where: { category: { not: "blog" } },
    data: { category: "blog" },
  });

  console.log(`✅ تم تحديث ${updated.count} مقالة إضافية`);
  
  // Verify all posts
  const allPosts = await prisma.post.findMany({
    select: { title: true, category: true, published: true },
    orderBy: { createdAt: "desc" },
  });
  
  console.log(`\n📊 إجمالي: ${allPosts.length} مقالة`);
  console.log(`✅ في blog: ${allPosts.filter(p => p.category === "blog").length}`);
  console.log(`✅ منشورة: ${allPosts.filter(p => p.published).length}`);
  
  await prisma.$disconnect();
}

fixAllCategories().catch(console.error);
