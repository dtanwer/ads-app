import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AdSense Video POC',
  description: 'A compliant Proof of Concept for AdSense video integration.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Use a fallback to your real ID for verification if the env variable isn't picking up
  const publisherId = process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID || "ca-pub-8282893350419857";

  return (
    <html lang="en" className="light bg-white">
      <head>
        {/* FIX 1: Change strategy to 'beforeInteractive' to ensure the crawler sees it immediately.
          FIX 2: Ensure the ID is correctly injected without quotes inside the URL.
        */}
        <Script
          id="adsense-init"
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${publisherId}`}
          crossOrigin="anonymous"
          strategy="beforeInteractive"
        />
      </head>
      <body className={`${inter.className} min-h-screen flex flex-col bg-gray-50`}>
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}