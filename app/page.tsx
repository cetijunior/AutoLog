import Link from "next/link";
import { BadgeCheck, Building2, CarFront, ClipboardCheck, Share2, ShieldCheck } from "lucide-react";

export default function LandingPage() {
  const features = [
    {
      icon: CarFront,
      title: "Vehicle Resume",
      copy: "A public, shareable service history buyers can trust.",
      href: "/public/veh-1",
    },
    {
      icon: BadgeCheck,
      title: "Verified Services",
      copy: "Garages verify tagged jobs to boost credibility instantly.",
      href: "/pro/dashboard",
    },
    {
      icon: Building2,
      title: "Garage Portfolio",
      copy: "Businesses showcase verified work to attract new leads.",
      href: "/garage/directory",
    },
  ];

  return (
    <main className="px-5 py-8 md:px-8">
      <div className="rounded-3xl bg-gradient-to-br from-zinc-900 via-zinc-900 to-indigo-900 p-6 text-white md:p-10">
        <p className="mb-3 inline-flex rounded-full bg-indigo-600 px-3 py-1 text-xs font-semibold">
          LinkedIn meets CarFax
        </p>
        <h1 className="text-3xl font-bold leading-tight md:text-4xl">AutoLog</h1>
        <p className="mt-3 max-w-xl text-zinc-300">
          AutoLog helps you keep all car maintenance records in one place, get work verified by garages, and share a
          clean vehicle history when selling.
        </p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <Link
            href="/dashboard"
            className="inline-flex min-h-11 items-center justify-center rounded-xl bg-indigo-600 px-4 text-sm font-semibold text-white shadow-sm shadow-indigo-300/50 transition hover:bg-indigo-500"
          >
            Start logging for free
          </Link>
          <Link
            href="/pro/dashboard"
            className="inline-flex min-h-11 items-center justify-center rounded-xl border border-zinc-700 px-4 text-sm font-semibold text-white transition hover:bg-zinc-800"
          >
            I run a garage
          </Link>
        </div>
      </div>

      <section className="mt-6 rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
        <h2 className="text-lg font-semibold">How AutoLog works</h2>
        <p className="mt-1 text-sm text-zinc-600">
          Simple process, even if you are not tech-savvy. Just follow these 3 steps:
        </p>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {[
            {
              icon: ClipboardCheck,
              title: "1) Log your service",
              text: "Add mileage, date, and what was fixed in a guided form.",
            },
            {
              icon: ShieldCheck,
              title: "2) Get it verified",
              text: "Tag a garage so they can confirm the record with a verified badge.",
            },
            {
              icon: Share2,
              title: "3) Share when selling",
              text: "Generate a public vehicle resume that buyers can trust.",
            },
          ].map(({ icon: Icon, title, text }) => (
            <article key={title} className="rounded-xl border border-zinc-200 bg-white p-3">
              <Icon className="mb-2 h-5 w-5 text-indigo-600" />
              <h3 className="text-sm font-semibold text-zinc-900">{title}</h3>
              <p className="mt-1 text-sm text-zinc-600">{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-6 grid gap-4 md:grid-cols-3">
        {features.map(({ icon: Icon, title, copy, href }) => (
          <Link
            key={title}
            href={href}
            className="rounded-2xl border border-zinc-200 p-4 transition hover:-translate-y-0.5 hover:bg-zinc-50 hover:shadow-sm"
          >
            <Icon className="mb-2 h-5 w-5 text-indigo-600" />
            <h2 className="font-semibold">{title}</h2>
            <p className="mt-1 text-sm text-zinc-600">{copy}</p>
          </Link>
        ))}
      </section>
    </main>
  );
}
