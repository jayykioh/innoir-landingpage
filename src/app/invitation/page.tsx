import { Metadata } from 'next';
import InvitationClient from '@/components/InvitationClient';

// Dynamic metadata generation for social sharing
export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}): Promise<Metadata> {
  const resolvedParams = await searchParams;
  const to = typeof resolvedParams.to === 'string' ? decodeURIComponent(resolvedParams.to) : 'Special Guest';
  
  return {
    title: `You're Invited, ${to}! | INNOIR Grand Opening`,
    description: `INNOIR Grand Opening Invitation for ${to}. Join us on June 3rd, 2026 at D13 An Thuong 34, Da Nang.`,
    openGraph: {
      title: `You're Invited, ${to}! | INNOIR Grand Opening`,
      description: `INNOIR Grand Opening Invitation for ${to}. Join us on June 3rd, 2026 at D13 An Thuong 34, Da Nang.`,
      images: [
        {
          url: '/photo/grandopening.jpg',
          width: 1200,
          height: 630,
          alt: 'INNOIR Grand Opening',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `You're Invited, ${to}! | INNOIR`,
      description: `Join us for the INNOIR Grand Opening at D13 An Thuong 34, Da Nang.`,
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
