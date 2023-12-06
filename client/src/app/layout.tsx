import './globals.css';

import { GeistSans } from 'geist/font';
import type { Metadata } from 'next';
import { Toaster } from 'sonner';

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={GeistSans.className}>
        {children}
        <Toaster closeButton={true} />
      </body>
    </html>
  );
}
