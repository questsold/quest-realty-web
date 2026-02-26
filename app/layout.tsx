import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const baseUrl = "https://questsold.com";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Quest Realty | Metro Detroit Real Estate Experts",
    template: "%s | Quest Realty"
  },
  description: "The most current real estate listings and detailed neighborhood information for the greater Michigan region. Specialist in Oakland, Macomb, and Wayne counties.",
  keywords: ["Metro Detroit Real Estate", "Homes for sale Michigan", "Oakland County Realtors", "Quest Realty", "Michigan Property Search"],
  authors: [{ name: "Ali Berry" }],
  creator: "Quest Realty",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: baseUrl,
    siteName: "Quest Realty",
    title: "Quest Realty | Metro Detroit Real Estate Experts",
    description: "Your premier resource for Metro Detroit Real Estate and luxury listings.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Quest Realty Real Estate",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Quest Realty | Metro Detroit Real Estate Experts",
    description: "Your premier resource for Metro Detroit Real Estate.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${outfit.variable} antialiased font-sans flex flex-col min-h-screen overflow-x-hidden w-full`}>
        {process.env.NEXT_PUBLIC_GA_ID && (
          <GoogleAnalytics ga_id={process.env.NEXT_PUBLIC_GA_ID} />
        )}
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

