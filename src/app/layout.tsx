import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import FloatingContact from "@/components/FloatingContact";
import { CartProvider } from "@/components/CartContext";

export const metadata: Metadata = {
  title: {
    default: "MYBIRKIN | Bespoke Leather Atelier",
    template: "%s | MYBIRKIN",
  },
  description:
    "Handcrafted luxury leather goods. Bespoke handbags, pet accessories, and leather charms — made to order with Italian full-grain leather.",
  openGraph: {
    title: "MYBIRKIN | Bespoke Leather Atelier",
    description: "Handcrafted luxury leather goods, made to order.",
    url: "https://mybirkin.com",
    siteName: "MYBIRKIN",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
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
