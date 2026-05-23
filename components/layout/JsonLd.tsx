import { getSiteSettings } from "@/lib/site-settings";

export default async function JsonLd() {
  const s = await getSiteSettings();

  const schema = {
    "@context": "https://schema.org",
    "@type": ["LegalService", "LocalBusiness"],
    name: s.officeName,
    description: "مكتب محاماة متخصص في القانون السعودي في جدة",
    url: s.siteUrl,
    telephone: [s.phone1, s.phone2].filter(Boolean),
    email: s.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: s.address,
      addressLocality: "جدة",
      addressCountry: "SA",
    },
    ...(s.mapUrl ? { hasMap: s.mapUrl } : {}),
    areaServed: "SA",
    priceRange: "$$",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "300",
    },
    ...(s.ogImage ? { image: s.ogImage } : {}),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
