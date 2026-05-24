import { Metadata } from 'next';
import InvitationClient from '@/components/InvitationClient';

// Dynamic metadata generation for social sharing (Messenger, Zalo, Slack, etc.)
export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}): Promise<Metadata> {
  const resolvedParams = await searchParams;
  const to = typeof resolvedParams.to === 'string' ? decodeURIComponent(resolvedParams.to) : 'Special Guest';
  const isVIP = resolvedParams.vip === 'true';

  const titleText = isVIP
    ? `⚜️ VIP PASS: Exclusive Invitation for ${to} | INNOIR`
    : `✉️ Special Invitation for ${to} | INNOIR Grand Opening`;

  const descText = isVIP
    ? `⚜️ You have been granted a VIP Access Pass. Join Phu, Luc, and Tai on June 3rd, 2026 at 19:00 for the exclusive INNOIR Grand Opening streetwear experience.`
    : `✉️ You are cordially invited to the INNOIR Grand Opening. Join us on June 3rd, 2026 at 19:00 at D13 An Thuong 34, Da Nang for a premium streetwear event.`;

  return {
    title: titleText,
    description: descText,
    openGraph: {
      title: titleText,
      description: descText,
      url: `https://www.innoir.site/invitation?to=${encodeURIComponent(to)}&vip=${isVIP ? 'true' : 'false'}`,
      siteName: "INNOIR Streetwear",
      locale: "en_US",
      type: "website",
      images: [
        {
          url: '/photo/grandopening.jpg',
          width: 1200,
          height: 630,
          alt: `INNOIR Grand Opening Invitation for ${to}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: titleText,
      description: descText,
      images: ['/photo/grandopening.jpg'],
    },
  };
}

export default async function InvitationPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const resolvedParams = await searchParams;
  const to = typeof resolvedParams.to === 'string' ? decodeURIComponent(resolvedParams.to) : 'Special Guest';
  const isVIP = resolvedParams.vip === 'true';

  return (
    <main className="min-h-screen w-full bg-black flex flex-col items-center justify-center font-sans overflow-y-auto">
      <InvitationClient guestName={to} isVIP={isVIP} />
    </main>
  );
}
