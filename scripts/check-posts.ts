import { prisma } from "@/lib/db";

async function checkPosts() {
  const posts = await prisma.post.findMany({
    select: { slug: true, title: true, published: true },
    orderBy: { createdAt: "desc" },
    take: 15,
  });

  console.log(`\n📊 إجمالي المقالات: ${posts.length}`);
  console.log(`✅ المقالات المنشورة:`);
  posts.forEach((p, i) => {
    const status = p.published ? "✅" : "❌";
    console.log(`${i + 1}. ${status} ${p.slug} - ${p.title}`);
  });

  await prisma.$disconnect();
}

checkPosts().catch(console.error);
