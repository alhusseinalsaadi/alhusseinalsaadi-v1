import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const diagnostics: any = {
    timestamp: new Date().toISOString(),
    environment: {
      hasDatabase: !!process.env.DATABASE_URL,
      databaseUrl: process.env.DATABASE_URL ? "***" : "MISSING",
      nodeEnv: process.env.NODE_ENV,
      vercelEnv: process.env.VERCEL_ENV,
    },
    prismaTests: {},
    results: [],
  };

  try {
    // Test 1: Import Prisma
    const { prisma } = await import("@/lib/db");
    diagnostics.prismaTests.imported = true;
    diagnostics.results.push("✓ Prisma imported successfully");

    // Test 2: Get post count
    try {
      const count = await prisma.post.count();
      diagnostics.prismaTests.countTest = {
        success: true,
        totalPosts: count,
      };
      diagnostics.results.push(`✓ Total posts in DB: ${count}`);
    } catch (e: any) {
      diagnostics.prismaTests.countTest = {
        success: false,
        error: e.message,
      };
      diagnostics.results.push(`✗ Count query failed: ${e.message}`);
    }

    // Test 3: Query for published blog posts
    try {
      const blogPosts = await prisma.post.findMany({
        where: { category: "blog", published: true },
        select: { id: true, title: true, category: true, published: true },
      });
      diagnostics.prismaTests.blogQuery = {
        success: true,
        count: blogPosts.length,
        posts: blogPosts.slice(0, 3),
      };
      diagnostics.results.push(`✓ Blog query returned: ${blogPosts.length} posts`);
    } catch (e: any) {
      diagnostics.prismaTests.blogQuery = {
        success: false,
        error: e.message,
      };
      diagnostics.results.push(`✗ Blog query failed: ${e.message}`);
    }

    // Test 4: Query all posts regardless of category/status
    try {
      const allPosts = await prisma.post.findMany({
        select: { id: true, title: true, category: true, published: true },
      });
      diagnostics.prismaTests.rawQuery = {
        success: true,
        count: allPosts.length,
        byCategory: allPosts.reduce((acc: any, p: any) => {
          acc[p.category] = (acc[p.category] || 0) + 1;
          return acc;
        }, {}),
        byStatus: {
          published: allPosts.filter((p: any) => p.published).length,
          unpublished: allPosts.filter((p: any) => !p.published).length,
        },
      };
      diagnostics.results.push(`✓ Raw query returned: ${allPosts.length} total posts`);
    } catch (e: any) {
      diagnostics.prismaTests.rawQuery = {
        success: false,
        error: e.message,
      };
      diagnostics.results.push(`✗ Raw query failed: ${e.message}`);
    }

    // Test 5: Test Prisma connection directly
    try {
      await prisma.$queryRaw`SELECT 1 as connection_test`;
      diagnostics.prismaTests.directConnection = {
        success: true,
      };
      diagnostics.results.push("✓ Direct database connection successful");
    } catch (e: any) {
      diagnostics.prismaTests.directConnection = {
        success: false,
        error: e.message,
      };
      diagnostics.results.push(`✗ Direct connection failed: ${e.message}`);
    }

  } catch (error: any) {
    diagnostics.fatalError = error.message;
    diagnostics.results.push(`✗ FATAL: ${error.message}`);
  }

  return NextResponse.json(diagnostics, { status: 200 });
}
