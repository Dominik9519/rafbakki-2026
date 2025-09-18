import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
      { url: "/og/rafbakki-og.jpg", width: 1200, height: 630, alt: "Rafbakki – rafmagns- og snjallkerfi" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rafbakki slf.",
    description: "Rafmagn, snjallt heimili, CCTV, net – hönnun, uppsetning, þjónusta.",
    images: ["/og/rafbakki-og.jpg"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="is">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
