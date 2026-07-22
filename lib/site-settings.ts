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
  // In serverless environments (Vercel), always use defaults
  // Prisma direct connections don't work with ephemeral containers
  return { ...SETTING_DEFAULTS };
}
