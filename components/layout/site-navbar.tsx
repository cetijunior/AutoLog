"use client";

import Link from "next/link";
import { CarFront, ClipboardPlus, House, LucideIcon, Settings, ShieldCheck, Wrench } from "lucide-react";
import { usePathname } from "next/navigation";

interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

const navItems: NavItem[] = [
  { href: "/", label: "About", icon: House },
  { href: "/dashboard", label: "My Vehicles", icon: CarFront },
  { href: "/add-service", label: "Log Service", icon: ClipboardPlus },
  { href: "/pro/dashboard", label: "Garage Inbox", icon: ShieldCheck },
  { href: "/garage/directory", label: "Find Garages", icon: Wrench },
  { href: "/settings", label: "Settings", icon: Settings },
];

export function SiteNavbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-zinc-200/80 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-3 px-4 py-2.5">
        <Link href="/" className="inline-flex items-center gap-2.5 rounded-lg px-1 py-1">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white shadow-sm shadow-indigo-400/40">
            <CarFront className="h-4 w-4" />
          </div>
          <div>
            <p className="text-sm font-bold leading-none text-zinc-900">AutoLog</p>
            <p className="mt-0.5 text-[10px] leading-none text-zinc-400">Digital vehicle logbook</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-0.5 md:flex">
          {navItems.map(({ href, label, icon: Icon }) => {
            const active = pathname === href || (href !== "/" && pathname.startsWith(href));
            return (
              <Link
                key={href}
                href={href}
                className={`inline-flex min-h-9 items-center gap-1.5 rounded-lg px-3 text-sm font-medium transition ${
                  active
                    ? "bg-indigo-50 text-indigo-700"
                    : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                {label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
