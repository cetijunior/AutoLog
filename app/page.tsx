import Link from "next/link";
import { ArrowRight, BadgeCheck, Building2, CarFront, ClipboardCheck, Share2, ShieldCheck, Star, TrendingUp } from "lucide-react";

export default function LandingPage() {
  const features = [
    {
      icon: CarFront,
      title: "Vehicle Resume",
      copy: "A public, shareable service history buyers can trust.",
      href: "/public/veh-1",
      color: "text-indigo-600",
      bg: "bg-indigo-50",
    },
    {
      icon: BadgeCheck,
      title: "Verified Services",
      copy: "Garages verify tagged jobs to boost credibility instantly.",
      href: "/pro/dashboard",
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      icon: Building2,
      title: "Garage Portfolio",
      copy: "Businesses showcase verified work to attract new leads.",
      href: "/garage/directory",
      color: "text-amber-600",
      bg: "bg-amber-50",
    },
  ];

  const stats = [
    { value: "10K+", label: "Service records logged" },
    { value: "94%", label: "Garage verification rate" },
    { value: "2,400+", label: "Garages on platform" },
  ];

  return (
    <main className="px-5 py-8 md:px-8">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-zinc-900 via-zinc-900 to-indigo-900 p-6 text-white md:p-10">
        {/* Decorative circles */}
        <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-indigo-600/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 -left-8 h-48 w-48 rounded-full bg-indigo-400/10 blur-2xl" />

        <p className="relative mb-3 inline-flex items-center gap-1.5 rounded-full bg-indigo-600/80 px-3 py-1 text-xs font-semibold backdrop-blur">
          <Star className="h-3 w-3 fill-white" />
          LinkedIn meets CarFax
        </p>
        <h1 className="relative text-3xl font-bold leading-tight md:text-5xl">
          Your car&apos;s complete
          <br />
          <span className="text-indigo-400">service story</span>
        </h1>
        <p className="relative mt-3 max-w-xl text-sm text-zinc-300 md:text-base">
          AutoLog keeps all maintenance records in one place, lets garages verify work, and generates a clean vehicle
          history that builds trust when selling.
        </p>

        <div className="relative mt-6 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/dashboard"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 text-sm font-semibold text-white shadow-lg shadow-indigo-900/40 transition hover:bg-indigo-500 active:scale-95"
          >
            Start logging for free
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/pro/dashboard"
            className="inline-flex min-h-11 items-center justify-center rounded-xl border border-zinc-700 px-5 text-sm font-semibold text-white transition hover:bg-zinc-800 active:scale-95"
          >
            I run a garage
          </Link>
        </div>

        {/* Stats strip */}
        <div className="relative mt-8 grid grid-cols-3 gap-4 border-t border-zinc-700/60 pt-6">
          {stats.map(({ value, label }) => (
            <div key={label}>
              <p className="text-xl font-bold text-white md:text-2xl">{value}</p>
              <p className="mt-0.5 text-xs text-zinc-400">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* How it works */}
      <section className="mt-6 rounded-2xl border border-zinc-200 bg-gradient-to-b from-zinc-50 to-white p-5">
        <div className="mb-4 flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-indigo-600" />
          <h2 className="text-base font-semibold">How AutoLog works</h2>
        </div>
        <p className="mb-4 text-sm text-zinc-500">
          Three simple steps — even if you&apos;re not tech-savvy.
        </p>
        <div className="grid gap-3 md:grid-cols-3">
          {[
            {
              icon: ClipboardCheck,
              step: "01",
              title: "Log your service",
              text: "Add mileage, date, cost, and what was fixed in a guided form.",
              color: "bg-indigo-600",
            },
            {
              icon: ShieldCheck,
              step: "02",
              title: "Get it verified",
              text: "Tag a garage so they can confirm the record with a verified badge.",
              color: "bg-emerald-600",
            },
            {
              icon: Share2,
              step: "03",
              title: "Share when selling",
              text: "Generate a public vehicle resume that buyers can trust instantly.",
              color: "bg-amber-500",
            },
          ].map(({ icon: Icon, step, title, text, color }) => (
            <article key={title} className="relative rounded-xl border border-zinc-200 bg-white p-4 shadow-sm">
              <div className={`mb-3 inline-flex h-9 w-9 items-center justify-center rounded-xl ${color} text-white`}>
                <Icon className="h-4 w-4" />
              </div>
              <span className="absolute right-4 top-4 text-2xl font-black text-zinc-100">{step}</span>
              <h3 className="text-sm font-semibold text-zinc-900">{title}</h3>
              <p className="mt-1 text-sm text-zinc-500">{text}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Feature links */}
      <section className="mt-6 grid gap-4 md:grid-cols-3">
        {features.map(({ icon: Icon, title, copy, href, color, bg }) => (
          <Link
            key={title}
            href={href}
            className="group rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className={`mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl ${bg}`}>
              <Icon className={`h-5 w-5 ${color}`} />
            </div>
            <h2 className="font-semibold text-zinc-900">{title}</h2>
            <p className="mt-1 text-sm text-zinc-500">{copy}</p>
            <p className={`mt-3 flex items-center gap-1 text-xs font-semibold ${color}`}>
              Explore <ArrowRight className="h-3 w-3 transition group-hover:translate-x-0.5" />
            </p>
          </Link>
        ))}
      </section>
    </main>
  );
}
