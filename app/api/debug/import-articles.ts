import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// Sample articles data - hardcoded to avoid file system issues
const articlesData = [
  {
    title: "أفضل محامي جدة للقضايا المدنية والتجارية 2024",
    slug: "best-lawyer-jeddah-civil-commercial",
    category: "blog",
    excerpt: "اكتشف أفضل محامي في جدة لقضاياك المدنية والتجارية. مكتب الحسين السعدي للمحاماة - خبرة 15+ سنة",
    content: "محتوى المقالة الكاملة...",
  },
  {
    title: "محامي تجاري جدة - تمثيل قانوني متخصص للشركات 2024",
    slug: "commercial-lawyer-jeddah",
    category: "blog",
    excerpt: "محامي تجاري متخصص في جدة. استشارات قانونية، تمثيل أمام المحاكم، حماية حقوق الشركات",
    content: "محتوى المقالة الكاملة...",
  },
  {
    title: "تأسيس الشركات في جدة - دليل قانوني شامل 2024",
    slug: "company-establishment-jeddah-guide",
    category: "blog",
    excerpt: "دليل شامل لتأسيس الشركات في جدة. مراحل التأسيس، المستندات، الرسوم، والدعم القانوني",
    content: "محتوى المقالة الكاملة...",
  },
  {
    title: "محامي عقارات جدة - الحماية القانونية الكاملة للعقارات",
    slug: "real-estate-lawyer-jeddah",
    category: "blog",
    excerpt: "محامي عقارات متخصص في جدة. استشارات قانونية، تحرير العقود، حل النزاعات العقارية",
    content: "محتوى المقالة الكاملة...",
  },
  {
    title: "محامي أحوال شخصية جدة - حقوقك في الطلاق والحضانة والنفقة",
    slug: "family-law-jeddah",
    category: "blog",
    excerpt: "محامي أحوال شخصية متخصص. قضايا الطلاق والخلع والحضانة والميراث والنفقة",
    content: "محتوى المقالة الكاملة...",
  },
  {
    title: "محامي قضايا عمالية جدة - حماية حقوق العمال والموظفين",
    slug: "labor-lawyer-jeddah",
    category: "blog",
    excerpt: "محامي متخصص في القضايا العمالية. حماية الموظفين، استحقاقات الموظف، فصل غير قانوني",
    content: "محتوى المقالة الكاملة...",
  },
  {
    title: "محامي جنائي جدة - الدفاع القانوني في القضايا الجنائية",
    slug: "criminal-lawyer-jeddah",
    category: "blog",
    excerpt: "محامي جنائي متخصص. دفاع قانوني في قضايا السرقة والاحتيال والمخدرات",
    content: "محتوى المقالة الكاملة...",
  },
  {
    title: "محامي تحصيل ديون جدة - استرجع أموالك بطرق قانونية",
    slug: "debt-collection-lawyer-jeddah",
    category: "blog",
    excerpt: "محامي متخصص في تحصيل الديون. استرجاع الأموال المستحقة بطرق قانونية فعالة",
    content: "محتوى المقالة الكاملة...",
  },
  {
    title: "محامي عقود جدة - صياغة وتحرير العقود بدقة قانونية",
    slug: "contracts-lawyer-jeddah",
    category: "blog",
    excerpt: "محامي متخصص في صياغة العقود. عقود تجارية، عقود عمل، عقود إيجار",
    content: "محتوى المقالة الكاملة...",
  },
  {
    title: "استشارات قانونية جدة - حل قانوني سريع وموثوق",
    slug: "legal-consultations-jeddah",
    category: "blog",
    excerpt: "استشارات قانونية متخصصة. حل سريع لجميع مشاكلك القانونية من قبل محامين خبراء",
    content: "محتوى المقالة الكاملة...",
  },
  {
    title: "محامي طلاق جدة - استشارات متخصصة وحماية حقوقك",
    slug: "divorce-lawyer-jeddah",
    category: "blog",
    excerpt: "محامي طلاق متخصص. دفاع قانوني شامل في قضايا الطلاق والخلع",
    content: "محتوى المقالة الكاملة...",
  },
  {
    title: "محامي حضانة جدة - حماية حقوق أطفالك الأسرية",
    slug: "custody-lawyer-jeddah",
    category: "blog",
    excerpt: "محامي متخصص في قضايا الحضانة. حماية حقوقك والدفاع عن مصلحة الأطفال",
    content: "محتوى المقالة الكاملة...",
  },
  {
    title: "محامي نفقة جدة - استحقاقات الأطفال والزوجة المطلقة",
    slug: "alimony-lawyer-jeddah",
    category: "blog",
    excerpt: "محامي متخصص في قضايا النفقة. الحصول على النفقة المستحقة للزوجة والأطفال",
    content: "محتوى المقالة الكاملة...",
  },
];

export async function POST() {
  try {
    let created = 0;
    let skipped = 0;

    for (const article of articlesData) {
      const exists = await prisma.post.findUnique({
        where: { slug: article.slug },
      });

      if (exists) {
        skipped++;
      } else {
        await prisma.post.create({
          data: {
            ...article,
            published: true,
            publishedAt: new Date(),
          },
        });
        created++;
      }
    }

    const total = await prisma.post.count();

    return NextResponse.json({
      success: true,
      message: "تم استيراد المقالات بنجاح",
      stats: {
        totalArticles: total,
        newArticles: created,
        skippedArticles: skipped,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}
