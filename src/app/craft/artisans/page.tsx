import type { Metadata } from "next";
import CraftSubPage from "@/components/CraftSubPage";

export const metadata: Metadata = {
  title: "Master Artisans",
  description:
    "Meet the master artisans behind MYBIRKIN. Every piece is handcrafted to order by a single artisan.",
};

export default function Page() {
  return <CraftSubPage pageKey="artisans" />;
}
