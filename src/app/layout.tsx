import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { getLocale, getMessages } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';
import { AuthNavigationListener } from '@/plugins/axios/services/AuthNavigationListener';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'Trainee skill test - Admin',
  description: 'Trainee skill test - Admin',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();
  return (
    <html lang={locale}>
      <NextIntlClientProvider messages={messages}>
        <AuthNavigationListener />
        <body className={`${inter.className} antialiased`}>{children}</body>
      </NextIntlClientProvider>
    </html>
  );
}
