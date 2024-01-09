import type { Metadata } from 'next';
import { Figtree } from 'next/font/google';
import './globals.css';

import Sidebar from '@/components/Sidebar';

import ModalProvider from '@/providers/ModalProviders';
import SupabaseProvider from '@/providers/SupabaseProvider';
import ToasterProvider from '@/providers/ToasterProvider';
import getSongsByUserId from '@/actions/getSongsByUserid';
import Player from '@/components/Player';

const font = Figtree({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Spotify Clone',
  description: 'Listen to music!',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userSongs = await getSongsByUserId();
  return (
    <html lang='en'>
      <body className={font.className}>
        <ToasterProvider />
        <SupabaseProvider>
          <ModalProvider />
          <Sidebar songs={userSongs}>{children}</Sidebar>
          <Player />
        </SupabaseProvider>
      </body>
    </html>
  );
}
