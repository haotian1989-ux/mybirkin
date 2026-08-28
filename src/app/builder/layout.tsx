import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Custom Bespoke Builder",
  description:
    "Design your own bespoke leather piece. Choose leather, color, hardware, silhouette and artisan — handmade to order.",
  alternates: { canonical: "https://www.mybirkin.com/builder" },
};

export default function BuilderLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
