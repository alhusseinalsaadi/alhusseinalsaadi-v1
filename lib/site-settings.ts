import { prisma } from "@/lib/db";

export const SETTING_DEFAULTS: Record<string, string> = {
  officeName:    "مكتب الحسين بن أحمد بن حسين السعدي للمحاماة",
  phone1:        "0555545533",
  phone2:        "0122635336",
  email:         "alhusseinalmojan@gmail.com",
  address:       "جدة - شارع التحلية خلف مبنى الرياض بلازا",
  whatsapp:      "966555545533",
  twitter:       "",
  linkedin:      "",
  siteUrl:       process.env.NEXT_PUBLIC_SITE_URL ?? "https://alhusseinalsaadi.sa",
  ogImage:       "",
  workingHours:  "الأحد – الخميس: 9 صباحاً – 5 مساءً\nالجمعة – السبت: مغلق",
  mapUrl:        "https://maps.google.com/?q=جدة+شارع+التحلية+مكتب+السعدي+للمحاماة",
};

export async function getSiteSettings(): Promise<Record<string, string>> {
  // Skip database query if DATABASE_URL is not set or in build environment
  if (!process.env.DATABASE_URL || process.env.VERCEL_ENV === "production" && !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return { ...SETTING_DEFAULTS };
  }

  try {
    // Set a 5 second timeout for database query
    const queryPromise = prisma.siteSetting.findMany();
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Database query timeout")), 5000)
    );

    const rows = await Promise.race([queryPromise, timeoutPromise]) as any[];
    const fromDb: Record<string, string> = {};
    rows.forEach((r: any) => { fromDb[r.key] = r.value; });
    return { ...SETTING_DEFAULTS, ...fromDb };
  } catch {
    // Return defaults on any database error
    return { ...SETTING_DEFAULTS };
  }
}
