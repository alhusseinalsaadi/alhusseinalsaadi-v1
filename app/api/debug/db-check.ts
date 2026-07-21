import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    // Test connection
    const postCount = await prisma.post.count();
    const posts = await prisma.post.findMany({
      select: { id: true, title: true, slug: true, published: true, category: true },
      take: 5,
    });

    return NextResponse.json({
      success: true,
      database: {
        connected: true,
        totalPosts: postCount,
        samplePosts: posts,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message,
        database: {
          connected: false,
        },
      },
      { status: 500 }
    );
  }
}
