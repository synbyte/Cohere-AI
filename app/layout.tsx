import './globals.css';
import type { Metadata } from 'next';
import { Quicksand } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';

const quicksand = Quicksand({
  subsets: ["latin"],
  variable: '--font-quicksand',
  display: 'swap',
})
export const metadata: Metadata = {
  title: 'PeerAssist',
  description: 'PeerAssist is an AI for peer support',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className={quicksand.className} lang="en">
      
      <body >
        {children}
        <Analytics />
        </body>
    </html>
  );
}
