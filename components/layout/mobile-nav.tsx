import Link from "next/link";
import { CirclePlus, House, UserCircle2 } from "lucide-react";

const links = [
  { href: "/dashboard", label: "Home", icon: House },
  { href: "/add-service", label: "Add", icon: CirclePlus },
  { href: "/settings", label: "Profile", icon: UserCircle2 },
];

export function MobileNav() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-zinc-200 bg-white/95 backdrop-blur md:hidden">
      <ul className="mx-auto flex max-w-md items-center justify-around px-2 py-2">
        {links.map(({ href, label, icon: Icon }) => (
          <li key={href}>
            <Link
              href={href}
              className="flex min-h-11 min-w-20 flex-col items-center justify-center rounded-lg px-3 text-xs font-medium text-zinc-700 hover:bg-zinc-100"
            >
              <Icon className="mb-1 h-5 w-5" />
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
