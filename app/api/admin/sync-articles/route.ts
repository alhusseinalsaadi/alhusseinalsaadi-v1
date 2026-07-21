import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    // Check existing posts
    const existing = await prisma.post.count();

    // If articles already exist, return success
    if (existing > 0) {
      return NextResponse.json({
        success: true,
        message: "المقالات موجودة بالفعل",
        articlesCount: existing,
      });
    }

    // Create articles if they don't exist
    const articles = [
      {
        title: "أفضل محامي جدة للقضايا المدنية والتجارية 2024",
        slug: "best-lawyer-jeddah-civil-commercial",
        category: "blog",
        excerpt: "اكتشف أفضل محامي في جدة لقضاياك المدنية والتجارية",
        content: "محتوى المقالة",
        published: true,
      },
      {
        title: "محامي تجاري جدة - تمثيل قانوني متخصص",
        slug: "commercial-lawyer-jeddah",
        category: "blog",
        excerpt: "محامي تجاري متخصص في جدة",
        content: "محتوى المقالة",
        published: true,
      },
      {
        title: "تأسيس الشركات في جدة - دليل قانوني شامل",
        slug: "company-establishment-jeddah-guide",
        category: "blog",
        excerpt: "دليل شامل لتأسيس الشركات",
        content: "محتوى المقالة",
        published: true,
      },
      {
        title: "محامي عقارات جدة - الحماية القانونية",
        slug: "real-estate-lawyer-jeddah",
        category: "blog",
        excerpt: "محامي عقارات متخصص",
        content: "محتوى المقالة",
        published: true,
      },
      {
        title: "محامي أحوال شخصية جدة - الطلاق والحضانة",
        slug: "family-law-jeddah",
        category: "blog",
        excerpt: "محامي أحوال شخصية",
        content: "محتوى المقالة",
        published: true,
      },
      {
        title: "محامي قضايا عمالية جدة - حقوق العمال",
        slug: "labor-lawyer-jeddah",
        category: "blog",
        excerpt: "محامي قضايا عمالية",
        content: "محتوى المقالة",
        published: true,
      },
      {
        title: "محامي جنائي جدة - الدفاع القانوني",
        slug: "criminal-lawyer-jeddah",
        category: "blog",
        excerpt: "محامي جنائي متخصص",
        content: "محتوى المقالة",
        published: true,
      },
      {
        title: "محامي تحصيل ديون جدة - استرجع أموالك",
        slug: "debt-collection-lawyer-jeddah",
        category: "blog",
        excerpt: "محامي تحصيل ديون",
        content: "محتوى المقالة",
        published: true,
      },
      {
        title: "محامي عقود جدة - صياغة العقود",
        slug: "contracts-lawyer-jeddah",
        category: "blog",
        excerpt: "محامي متخصص في صياغة العقود",
        content: "محتوى المقالة",
        published: true,
      },
      {
        title: "استشارات قانونية جدة - حل سريع",
        slug: "legal-consultations-jeddah",
        category: "blog",
        excerpt: "استشارات قانونية متخصصة",
        content: "محتوى المقالة",
        published: true,
      },
      {
        title: "محامي طلاق جدة - الاستشارات المتخصصة",
        slug: "divorce-lawyer-jeddah",
        category: "blog",
        excerpt: "محامي طلاق متخصص",
        content: "محتوى المقالة",
        published: true,
      },
      {
        title: "محامي حضانة جدة - حماية الأطفال",
        slug: "custody-lawyer-jeddah",
        category: "blog",
        excerpt: "محامي متخصص في الحضانة",
        content: "محتوى المقالة",
        published: true,
      },
      {
        title: "محامي نفقة جدة - الحقوق المالية",
        slug: "alimony-lawyer-jeddah",
        category: "blog",
        excerpt: "محامي متخصص في النفقة",
        content: "محتوى المقالة",
        published: true,
      },
    ];

    const created = await prisma.post.createMany({
      data: articles,
      skipDuplicates: true,
    });

    return NextResponse.json({
      success: true,
      message: "تم إضافة المقالات بنجاح",
      created: created.count,
    });
  } catch (error: any) {
    console.error("Sync error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}
