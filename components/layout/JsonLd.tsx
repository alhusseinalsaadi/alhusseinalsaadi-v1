import { getSiteSettings } from "@/lib/site-settings";

export default async function JsonLd() {
  const s = await getSiteSettings();

  const openingHours = [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
      opens: "09:00",
      closes: "17:00",
    },
  ];

  const schema = {
    "@context": "https://schema.org",
    "@type": ["LegalService", "LocalBusiness", "ProfessionalService"],
    name: s.officeName,
    description: "مكتب محاماة متخصص في القانون السعودي — استشارات قانونية، قضايا تجارية، عقارات، تحكيم",
    url: s.siteUrl,
    telephone: [s.phone1, s.phone2].filter(Boolean),
    email: s.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: s.address,
      addressLocality: "جدة",
      addressRegion: "Mecca",
      postalCode: "23442",
      addressCountry: "SA",
    },
    ...(s.mapUrl ? { hasMap: s.mapUrl } : {}),
    areaServed: ["SA"],
    priceRange: "$$",
    openingHoursSpecification: openingHours,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "300",
      bestRating: "5",
      worstRating: "1",
    },
    sameAs: [s.twitter, s.linkedin].filter(Boolean),
    ...(s.ogImage ? { image: s.ogImage } : {}),
    knowsAbout: [
      "قانون الشركات السعودي",
      "قانون العمل السعودي",
      "القانون المدني السعودي",
      "قانون العقارات",
      "الاستثمار الأجنبي",
      "التحكيم التجاري",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
