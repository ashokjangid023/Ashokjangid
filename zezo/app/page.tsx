import type { Metadata } from "next";

import { HomePage } from "@/components/home-page";

export const metadata: Metadata = {
  title: "Premium Business Websites for Modern Growth",
  description:
    "Zezo Web builds responsive, conversion-focused business websites with premium UI, modern interactions, and launch-ready performance.",
};

export default function Page() {
  return <HomePage />;
}
