import type { Metadata } from "next";

import { ContactPage } from "@/components/contact-page";

export const metadata: Metadata = {
  title: "Contact Zezo Web",
  description:
    "Reach Zezo Web to discuss redesigns, business websites, SEO upgrades, and launch-ready digital experiences.",
};

export default function Page() {
  return <ContactPage />;
}
