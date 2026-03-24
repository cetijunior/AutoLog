"use client";

import Link from "next/link";
import { CarFront, CirclePlus, Settings2 } from "lucide-react";
import { usePathname } from "next/navigation";

const links = [
  { href: "/dashboard", label: "Garage", icon: CarFront },
  { href: "/settings", label: "Account", icon: Settings2 },
];

export function MobileNav() {
  const pathname = usePathname();
  const isAuthenticatedRoute =
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/vehicle") ||
    pathname.startsWith("/add-service") ||
    pathname.startsWith("/settings") ||
    pathname.startsWith("/pro");

  if (!isAuthenticatedRoute) return null;

  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-zinc-200/80 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 md:hidden">
      <ul className="mx-auto flex max-w-md items-center justify-around px-4 py-2">
        {/* Left items */}
        <li>
          <Link
            href={links[0].href}
            className={`flex min-h-12 min-w-16 flex-col items-center justify-center rounded-xl px-3 text-xs font-medium transition ${
              pathname.startsWith(links[0].href) || pathname.startsWith("/vehicle")
                ? "text-indigo-700"
                : "text-zinc-500 hover:text-zinc-800"
            }`}
          >
            <CarFront className={`mb-1 h-5 w-5 ${
              pathname.startsWith(links[0].href) || pathname.startsWith("/vehicle") ? "text-indigo-600" : ""
            }`} />
            {links[0].label}
          </Link>
        </li>

        {/* Center add button */}
        <li>
          <Link
            href="/add-service"
            className={`flex h-14 w-14 flex-col items-center justify-center rounded-2xl shadow-lg shadow-indigo-400/30 transition active:scale-95 ${
              pathname.startsWith("/add-service")
                ? "bg-indigo-700"
                : "bg-indigo-600 hover:bg-indigo-500"
            }`}
            aria-label="Add service record"
          >
            <CirclePlus className="h-6 w-6 text-white" />
          </Link>
        </li>

        {/* Right items */}
        <li>
          <Link
            href={links[1].href}
            className={`flex min-h-12 min-w-16 flex-col items-center justify-center rounded-xl px-3 text-xs font-medium transition ${
              pathname === links[1].href
                ? "text-indigo-700"
                : "text-zinc-500 hover:text-zinc-800"
            }`}
          >
            <Settings2 className={`mb-1 h-5 w-5 ${pathname === links[1].href ? "text-indigo-600" : ""}`} />
            {links[1].label}
          </Link>
        </li>
      </ul>
    </nav>
  );
}
