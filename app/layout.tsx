import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { MobileNav } from "@/components/layout/mobile-nav";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "AutoLog",
  description: "Digital vehicle logbook for owners and garages.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <body className="min-h-full bg-zinc-100 font-sans text-zinc-900">
        <div className="mx-auto min-h-screen w-full max-w-md bg-white pb-20 md:max-w-5xl md:pb-0">
          {children}
        </div>
        <MobileNav />
      </body>
    </html>
  );
}
