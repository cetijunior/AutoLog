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
  { href: "/", label: "About AutoLog", icon: House },
  { href: "/dashboard", label: "My Vehicles", icon: CarFront },
  { href: "/add-service", label: "Log Service", icon: ClipboardPlus },
  { href: "/pro/dashboard", label: "Garage Inbox", icon: ShieldCheck },
  { href: "/garage/directory", label: "Find Garages", icon: Wrench },
  { href: "/settings", label: "Settings", icon: Settings },
];

export function SiteNavbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-zinc-200/80 bg-white/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-3 px-4 py-3">
        <Link href="/" className="inline-flex items-center gap-2 rounded-lg px-2 py-1">
          <div className="rounded-lg bg-indigo-600 p-1.5 text-white">
            <CarFront className="h-4 w-4" />
          </div>
          <div>
            <p className="text-sm font-bold text-zinc-900">AutoLog</p>
            <p className="text-[11px] text-zinc-500">Digital vehicle logbook</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map(({ href, label, icon: Icon }) => {
            const active = pathname === href || (href !== "/" && pathname.startsWith(href));
            return (
              <Link
                key={href}
                href={href}
                className={`inline-flex min-h-11 items-center gap-2 rounded-lg px-3 text-sm font-medium transition ${
                  active ? "bg-indigo-50 text-indigo-700" : "text-zinc-700 hover:bg-zinc-100"
                }`}
              >
                <Icon className="h-4 w-4" />
                {label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
