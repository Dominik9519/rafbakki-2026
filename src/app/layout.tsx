import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Head from "next/head";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  // pełna domena dla absolutnych ścieżek w Open Graph i social media
  metadataBase: new URL("https://www.rafbakki.is"),
  title: "Rafbakki slf.",
  description: "Rafmagn, snjallt heimili, CCTV, net – hönnun, uppsetning, þjónusta.",

  openGraph: {
    type: "website",
    url: "https://www.rafbakki.is",
    siteName: "Rafbakki",
    title: "Rafbakki slf.",
    description: "Rafmagn, snjallt heimili, CCTV, net – hönnun, uppsetning, þjónusta.",
    images: [
      {
        url: "/og/rafbakki-og.jpg",
        width: 1200,
        height: 630,
        alt: "Rafbakki – rafmagns- og snjallkerfi",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Rafbakki slf.",
    description: "Rafmagn, snjallt heimili, CCTV, net – hönnun, uppsetning, þjónusta.",
    images: ["/og/rafbakki-og.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="is">
      <Head>
        {/* JSON-LD dane strukturalne dla Google */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Electrician",
              "name": "Rafbakki slf.",
              "url": "https://www.rafbakki.is",
              "logo": "https://www.rafbakki.is/logo1.png",
              "image": "https://www.rafbakki.is/logo1.png",
              "areaServed": [
                {
                  "@type": "Place",
                  "address": {
                    "@type": "PostalAddress",
                    "addressLocality": "Stykkishólmur",
                    "postalCode": "340",
                    "addressCountry": "IS",
                  },
                },
                {
                  "@type": "Place",
                  "address": {
                    "@type": "PostalAddress",
                    "addressLocality": "Hveragerði",
                    "postalCode": "810",
                    "addressCountry": "IS",
                  },
                },
              ],
              "contactPoint": [
                {
                  "@type": "ContactPoint",
                  "telephone": "+354 848 0153",
                  "contactType": "þjónustuver",
                  "email": "geiri@rafbakki.is",
                },
                {
                  "@type": "ContactPoint",
                  "telephone": "+354 765 5233",
                  "contactType": "þjónustuver",
                  "email": "dominik@rafbakki.is",
                },
              ],
              "description":
                "Rafbakki slf. býður upp á raflagnir, sjálfvirkni fyrir heimili og fyrirtæki, uppsetningu á LAN/Wi-Fi netum, öryggiskerfi, vöktun og snjallheimila lausnir.",
            }),
          }}
        />
      </Head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
