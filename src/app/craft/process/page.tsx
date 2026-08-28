import type { Metadata } from "next";
import CraftSubPage from "@/components/CraftSubPage";

export const metadata: Metadata = {
  title: "The Process",
  description:
    "From the first cut of leather to the final stitch — discover the fully handcrafted MYBIRKIN process.",
};

export default function Page() {
  return <CraftSubPage pageKey="process" />;
}
