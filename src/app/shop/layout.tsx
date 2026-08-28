import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop All",
  description:
    "Shop handcrafted luxury leather handbags, charms and pet accessories. Every MYBIRKIN piece is made to order by a single artisan.",
  alternates: { canonical: "https://www.mybirkin.com/shop" },
};

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
