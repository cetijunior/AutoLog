import Link from "next/link";
import { ArrowRight, Building2, CheckCircle2, MapPin, Phone } from "lucide-react";
import { garages } from "@/lib/mock-data";

export default function GarageDirectoryPage() {
  return (
    <main className="p-5 md:p-8">
      <header className="mb-5">
        <p className="text-xs font-medium uppercase tracking-wide text-zinc-400">Garage Portfolio</p>
        <h1 className="mt-0.5 text-2xl font-bold">Garage Directory</h1>
        <p className="mt-1 text-sm text-zinc-500">Browse garages with verified repair history on AutoLog.</p>
      </header>

      <section className="space-y-3">
        {garages.map((garage) => {
          const isClaimed = Boolean(garage.claimed_by);
          return (
            <Link
              key={garage.id}
              href={`/garage/${garage.id}`}
              className="group block overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="flex items-center gap-3 p-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-zinc-100 transition group-hover:bg-indigo-50">
                  <Building2 className="h-5 w-5 text-zinc-600 group-hover:text-indigo-600 transition" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="font-semibold text-zinc-900">{garage.name}</h2>
                    {isClaimed ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-700">
                        <CheckCircle2 className="h-3 w-3" />
                        Claimed
                      </span>
                    ) : (
                      <span className="inline-flex items-center rounded-full bg-zinc-100 px-2 py-0.5 text-xs font-semibold text-zinc-500">
                        Unclaimed
                      </span>
                    )}
                  </div>
                  <p className="mt-0.5 flex items-center gap-1 text-xs text-zinc-500 truncate">
                    <MapPin className="h-3 w-3 shrink-0" />
                    {garage.address}
                  </p>
                  <p className="flex items-center gap-1 text-xs text-zinc-500">
                    <Phone className="h-3 w-3 shrink-0" />
                    {garage.phone}
                  </p>
                </div>
                <ArrowRight className="h-4 w-4 shrink-0 text-zinc-400 transition group-hover:translate-x-0.5 group-hover:text-indigo-600" />
              </div>
            </Link>
          );
        })}
      </section>

      <div className="mt-6 rounded-2xl border border-dashed border-zinc-300 p-5 text-center">
        <Building2 className="mx-auto mb-2 h-6 w-6 text-zinc-400" />
        <p className="text-sm font-semibold text-zinc-700">Is your garage missing?</p>
        <p className="mt-1 text-xs text-zinc-500">
          Customers can tag your garage when logging a service. Claim your profile to verify records and build your portfolio.
        </p>
      </div>
    </main>
  );
}
