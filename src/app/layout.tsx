import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import { SessionProvider } from 'next-auth/react';
import { auth } from '@/auth';
import { Toaster } from 'sonner';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
});

export const metadata: Metadata = {
  title: {
    default: 'Next Auth',
    template: '%s | Next Auth',
  },
  description: 'Just practice project fot Authentication',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang='en'>
      <body className={`${poppins.className} antialiased`}>
        <SessionProvider session={session}>
          <Toaster />
          <div className='min-h-screen flex flex-col gap-y-4'>{children}</div>
        </SessionProvider>
      </body>
    </html>
  );
}
