import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Craft",
  description:
    "Discover the MYBIRKIN atelier: Italian full-grain leather, bespoke hardware, master artisans and a fully handcrafted process.",
};

export default function CraftLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
