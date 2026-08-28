import type { Metadata } from "next";
import CraftSubPage from "@/components/CraftSubPage";

export const metadata: Metadata = {
  title: "Hardware",
  description:
    "Bespoke hardware for luxury leather goods — crafted finishes that complement every MYBIRKIN piece.",
};

export default function Page() {
  return <CraftSubPage pageKey="hardware" />;
}
