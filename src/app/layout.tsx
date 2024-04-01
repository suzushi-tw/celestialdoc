import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import Navbar from "@/components/Navbar";
import { ClerkProvider } from '@clerk/nextjs'
import Providers from "@/components/Providers";
import { GeistSans } from "geist/font/sans"; 
const inter = Inter({ subsets: ["latin"] });

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
          <body className={inter.className} >
            <Navbar />
            {/* <Header /> */}
            {children}

          </body>
        </html>
      </Providers>

    </ClerkProvider>
  );
}
