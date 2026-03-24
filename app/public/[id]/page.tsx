"use client";

import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { Eye, EyeOff, ShieldCheck, Share2 } from "lucide-react";
import { ServiceTimeline } from "@/components/autolog/service-timeline";
import { useAutoLog } from "@/components/providers/autolog-provider";

export default function PublicVehiclePage() {
  const { id } = useParams<{ id: string }>();
  const searchParams = useSearchParams();
  const { vehicles, serviceRecords, garages } = useAutoLog();
  const vehicle = vehicles.find((item) => item.id === id);
  const records = serviceRecords
    .filter((record) => record.vehicle_id === id)
    .sort((a, b) => +new Date(b.date) - +new Date(a.date));
  const hideCosts = searchParams.get("hideCosts") === "1";
  const verifiedCount = records.filter((record) => record.status === "garage_verified").length;
  const totalSpent = records.reduce((sum, r) => sum + r.cost, 0);

  if (!vehicle) return <main className="p-6">Vehicle not found.</main>;

  const verifiedGarageNames = [
    ...new Set(
      records
        .filter((r) => r.status === "garage_verified" && r.garage_id)
        .map((r) => garages.find((g) => g.id === r.garage_id)?.name)
        .filter(Boolean),
    ),
  ];

  return (
    <main className="p-5 md:p-8">
      {/* Hero header */}
      <header className="mb-5 overflow-hidden rounded-2xl bg-zinc-900 text-white shadow-lg">
        <div className="bg-gradient-to-br from-indigo-800/60 to-transparent px-5 pt-5 pb-3">
          <p className="text-xs font-medium uppercase tracking-widest text-indigo-300">Public Vehicle Resume</p>
          <h1 className="mt-1 text-2xl font-bold">
            {vehicle.year} {vehicle.make} {vehicle.model}
          </h1>
          <p className="mt-0.5 text-sm text-zinc-400">VIN ending ···{vehicle.vin.slice(-6)}</p>
        </div>

        <div className="flex items-center justify-between gap-3 border-t border-zinc-700/60 px-5 py-3">
          <div className="flex items-center gap-1.5 text-xs text-emerald-400">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span className="font-semibold">{verifiedCount} verified</span>
            {verifiedGarageNames.length > 0 && (
              <span className="text-zinc-500">by {verifiedGarageNames.join(", ")}</span>
            )}
          </div>
          <a
            href={`?hideCosts=${hideCosts ? "0" : "1"}`}
            className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-1.5 text-xs font-semibold text-zinc-200 transition hover:bg-zinc-700"
          >
            {hideCosts ? <Eye className="h-3.5 w-3.5" /> : <EyeOff className="h-3.5 w-3.5" />}
            {hideCosts ? "Show Costs" : "Hide Costs"}
          </a>
        </div>
      </header>

      {/* Stats */}
      <section className="mb-5 grid grid-cols-3 gap-3">
        <article className="rounded-2xl border border-zinc-200 bg-white p-3 shadow-sm text-center">
          <p className="text-xs font-medium text-zinc-500">Records</p>
          <p className="mt-0.5 text-xl font-bold text-zinc-900">{records.length}</p>
        </article>
        <article className="rounded-2xl border border-emerald-100 bg-emerald-50/50 p-3 shadow-sm text-center">
          <p className="text-xs font-medium text-emerald-700">Verified</p>
          <p className="mt-0.5 text-xl font-bold text-emerald-800">{verifiedCount}</p>
        </article>
        <article className="rounded-2xl border border-zinc-200 bg-white p-3 shadow-sm text-center">
          <p className="text-xs font-medium text-zinc-500">{hideCosts ? "Spent" : "Total spent"}</p>
          <p className="mt-0.5 text-xl font-bold text-zinc-900">{hideCosts ? "—" : `$${totalSpent.toFixed(0)}`}</p>
        </article>
      </section>

      <ServiceTimeline records={records} hideCosts={hideCosts} />

      {/* Share prompt */}
      <div className="mt-6 flex items-center gap-3 rounded-2xl border border-indigo-100 bg-indigo-50 p-4">
        <Share2 className="h-5 w-5 shrink-0 text-indigo-600" />
        <div className="min-w-0">
          <p className="text-sm font-semibold text-indigo-900">Share this vehicle resume</p>
          <p className="truncate text-xs text-indigo-600">/public/{id}</p>
        </div>
        <Link
          href={`/vehicle/${id}`}
          className="ml-auto shrink-0 rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-indigo-500"
        >
          Edit
        </Link>
      </div>
    </main>
  );
}
