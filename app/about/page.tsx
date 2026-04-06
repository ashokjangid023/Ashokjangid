import type { Metadata } from "next";

import { AboutPage } from "@/components/about-page";

export const metadata: Metadata = {
  title: "About Zezo Web",
  description:
    "Learn how Zezo Web combines strategy, product design, development, and growth thinking to craft premium business websites.",
};

export default function Page() {
  return <AboutPage />;
}
