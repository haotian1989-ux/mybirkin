import type { Metadata } from "next";
import CraftSubPage from "@/components/CraftSubPage";

export const metadata: Metadata = {
  title: "Italian Leather",
  description:
    "Full-grain and top-grain hides sourced from family-owned tanneries in Tuscany, vegetable-tanned with traditional methods.",
};

export default function Page() {
  return <CraftSubPage pageKey="leather" />;
}
