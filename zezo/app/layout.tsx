import type { Metadata } from "next";

import { SiteProvider } from "@/components/site-context";
import { SiteShell } from "@/components/site-shell";

import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Zezo Web",
    template: "%s | Zezo Web",
  },
  description:
    "Zezo Web is a premium startup-style business website experience built with responsive layouts, smooth interactions, and SEO-aware structure.",
  keywords: [
    "business website",
    "startup website",
    "web development",
    "SEO",
    "SaaS design",
    "Zezo Web",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <SiteProvider>
          <SiteShell>{children}</SiteShell>
        </SiteProvider>
      </body>
    </html>
  );
}
