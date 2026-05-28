import type { Metadata } from "next";
import { routes, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Create Invitation | INNOIR",
  description: "Private INNOIR invitation creator.",
  alternates: {
    canonical: routes.invitationCreate,
  },
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "Create Invitation | INNOIR",
    description: "Private INNOIR invitation creator.",
    url: routes.invitationCreate,
    siteName: siteConfig.name,
    images: [siteConfig.ogImage],
  },
};

export default function CreateInvitationLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
