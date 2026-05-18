import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    template: "%s | مكتب الحسين بن أحمد بن حسين السعدي للمحاماة",
    default: "مكتب الحسين بن أحمد بن حسين السعدي للمحاماة — استشارات قانونية متخصصة في جدة",
  },
  description:
    "مكتب محاماة متخصص في القانون السعودي — استشارات قانونية، قضايا تجارية، تركات، عقارات، قانون جنائي، وأحوال شخصية. في جدة - شارع التحلية.",
  keywords: [
    "محامي جدة",
    "استشارة قانونية جدة",
    "محامي السعدي",
    "قضايا تجارية",
    "تقسيم تركات",
    "قانون جنائي سعودي",
    "أحوال شخصية",
    "محامي شارع التحلية",
  ],
  openGraph: {
    locale: "ar_SA",
    type: "website",
    siteName: "مكتب الحسين بن أحمد بن حسين السعدي للمحاماة",
  },
  alternates: {
    languages: { "ar-SA": "/" },
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Kufi+Arabic:wght@300;400;500;600;700;800;900&family=IBM+Plex+Arabic:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": ["LegalService", "LocalBusiness"],
              name: "مكتب الحسين بن أحمد بن حسين السعدي للمحاماة",
              description: "مكتب محاماة متخصص في القانون السعودي في جدة",
              telephone: ["+966555533554", "+96612635336"],
              email: "alhusseinalmojan@gmail.com",
              address: {
                "@type": "PostalAddress",
                streetAddress: "شارع التحلية خلف مبنى الرياض بلازا",
                addressLocality: "جدة",
                addressCountry: "SA",
              },
              areaServed: "SA",
              priceRange: "$$",
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.9",
                reviewCount: "300",
              },
            }),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col" style={{ fontFamily: "'IBM Plex Arabic', sans-serif" }}>
        {children}
      </body>
    </html>
  );
}
