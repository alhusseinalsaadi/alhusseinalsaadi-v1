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
  // Skip database query if DATABASE_URL is not set
  if (!process.env.DATABASE_URL) {
    return { ...SETTING_DEFAULTS };
  }

  try {
    const rows = await prisma.siteSetting.findMany();
    const fromDb: Record<string, string> = {};
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    rows.forEach((r: any) => { fromDb[r.key] = r.value; });
    return { ...SETTING_DEFAULTS, ...fromDb };
  } catch {
    return { ...SETTING_DEFAULTS };
  }
}
