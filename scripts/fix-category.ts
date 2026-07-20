import { prisma } from "@/lib/db";

async function fixCategory() {
  const updated = await prisma.post.updateMany({
    where: { category: "خدمات المحاماة" },
    data: { category: "blog" },
  });

  console.log(`✅ تم تحديث ${updated.count} مقالة`);
  
  const posts = await prisma.post.findMany({
    select: { title: true, category: true },
    take: 5,
  });
  
  console.log("\n✅ التحديث:");
  posts.forEach((p: typeof posts[0]) => console.log(`- ${p.title} (${p.category})`));
  
  await prisma.$disconnect();
}

fixCategory().catch(console.error);
