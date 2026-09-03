export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import FloatingContact from "@/components/FloatingContact";
import { CartProvider } from "@/components/CartContext";

const SITE_URL = "https://www.mybirkin.com";
const GA_MEASUREMENT_ID = "G-0Z3S1046DD";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "MYBIRKIN | Bespoke Leather Atelier",
    template: "%s | MYBIRKIN",
  },
  description:
    "Handcrafted luxury leather goods. Bespoke handbags, pet accessories, and leather charms — made to order with Italian full-grain leather.",
  keywords: ["luxury leather goods", "bespoke handbags", "handmade leather bags", "custom leather bag", "leather charms", "pet leather accessories", "Hermès style handbag"],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "MYBIRKIN",
    title: "MYBIRKIN | Bespoke Leather Atelier",
    description: "Handcrafted luxury leather goods, made to order with Italian full-grain leather.",
  },
  twitter: {
    card: "summary_large_image",
    title: "MYBIRKIN | Bespoke Leather Atelier",
    description: "Handcrafted luxury leather goods, made to order.",
  },
  verification: {
    google: "soOE5sHsNPv9Pdr-EG2jFupawOfoqma4yhHQTjVjPgU",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": SITE_URL + "/#org",
      name: "MYBIRKIN",
      url: SITE_URL,
      description: "Bespoke luxury leather atelier. Handmade handbags, charms and pet accessories crafted to order.",
    },
    {
      "@type": "WebSite",
      "@id": SITE_URL + "/#website",
      url: SITE_URL,
      name: "MYBIRKIN",
      publisher: { "@id": SITE_URL + "/#org" },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <CartProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <CartDrawer />
          <FloatingContact />
        </CartProvider>
      </body>
    </html>
  );
}
