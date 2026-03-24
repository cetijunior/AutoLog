import Link from "next/link";
import { BadgeCheck, Building2, CarFront } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <main className="px-5 py-8 md:px-8">
      <div className="rounded-3xl bg-zinc-900 p-6 text-white md:p-10">
        <p className="mb-3 inline-flex rounded-full bg-indigo-600 px-3 py-1 text-xs font-semibold">
          LinkedIn meets CarFax
        </p>
        <h1 className="text-3xl font-bold leading-tight md:text-4xl">AutoLog</h1>
        <p className="mt-3 max-w-xl text-zinc-300">
          Build a verified maintenance history for every vehicle and turn repairs into trust when it is time to resell.
        </p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <Link href="/dashboard">
            <Button fullWidth>Start logging for free</Button>
          </Link>
          <Link href="/pro/dashboard">
            <Button fullWidth variant="ghost" className="border-zinc-700 text-white hover:bg-zinc-800">
              I run a garage
            </Button>
          </Link>
        </div>
      </div>

      <section className="mt-6 grid gap-4 md:grid-cols-3">
        {[
          {
            icon: CarFront,
            title: "Vehicle Resume",
            copy: "A public, shareable service history buyers can trust.",
          },
          {
            icon: BadgeCheck,
            title: "Verified Services",
            copy: "Garages verify tagged jobs to boost credibility instantly.",
          },
          {
            icon: Building2,
            title: "Garage Portfolio",
            copy: "Businesses showcase verified work to attract new leads.",
          },
        ].map(({ icon: Icon, title, copy }) => (
          <article key={title} className="rounded-2xl border border-zinc-200 p-4">
            <Icon className="mb-2 h-5 w-5 text-indigo-600" />
            <h2 className="font-semibold">{title}</h2>
            <p className="mt-1 text-sm text-zinc-600">{copy}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
