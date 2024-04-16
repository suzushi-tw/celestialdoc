import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import Navbar from "@/components/Navbar";
import { ClerkProvider } from '@clerk/nextjs'
import Providers from "@/components/Providers";
import { GeistSans } from "geist/font/sans";
import Head from 'next/head';
const inter = Inter({ subsets: ["latin"] });
import toast, { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
  title: "CelestialDOC",
  description: "open source alternative to Google drive and Docsend",

};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <Providers>
        <html lang="en" className={`${GeistSans.className} antialiased dark:bg-gray-950`}>
          <Head>

            <meta property="og:image" content={`${process.env.NEXT_PUBLIC_BASE_URL}/Demo.png`} />
          </Head>
          <body className={inter.className} >
            <Toaster />
            <Navbar />
            {/* <Header /> */}
            {children}

          </body>
        </html>
      </Providers>

    </ClerkProvider>
  );
}
