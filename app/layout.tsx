import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { MobileNav } from "@/components/layout/mobile-nav";
import { SiteNavbar } from "@/components/layout/site-navbar";
import { AutoLogProvider } from "@/components/providers/autolog-provider";

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
        <AutoLogProvider>
          <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(79,70,229,0.14),_transparent_40%),radial-gradient(circle_at_bottom_right,_rgba(16,185,129,0.12),_transparent_35%)]" />
          <div className="mx-auto min-h-screen w-full max-w-md border-x border-zinc-200/70 bg-white/95 pb-20 backdrop-blur md:max-w-5xl md:pb-0">
            <SiteNavbar />
            {children}
          </div>
          <MobileNav />
        </AutoLogProvider>
      </body>
    </html>
  );
}
