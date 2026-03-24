"use client";

import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Plus } from "lucide-react";
import { useParams } from "next/navigation";
import { ServiceTimeline } from "@/components/autolog/service-timeline";
import { useAutoLog } from "@/components/providers/autolog-provider";

export default function VehiclePage() {
  const { id } = useParams<{ id: string }>();
  const { vehicles, serviceRecords } = useAutoLog();
  const vehicle = vehicles.find((item) => item.id === id);
  const records = serviceRecords
    .filter((record) => record.vehicle_id === id)
    .sort((a, b) => +new Date(b.date) - +new Date(a.date));

  if (!vehicle) return <main className="p-6">Vehicle not found.</main>;
  const totalSpent = records.reduce((sum, record) => sum + record.cost, 0);
  const verifiedCount = records.filter((r) => r.status === "garage_verified").length;

  return (
    <main className="p-5 md:p-8">
      <div className="mb-5 flex items-center gap-2">
        <Link
          href="/dashboard"
          className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-200 bg-white text-zinc-600 shadow-sm transition hover:bg-zinc-50"
        >
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-zinc-400">Vehicle Timeline</p>
          <h1 className="text-xl font-bold leading-tight">
            {vehicle.year} {vehicle.make} {vehicle.model}
          </h1>
        </div>
      </div>

      <section className="mb-5 grid grid-cols-2 gap-3 md:grid-cols-4">
        <article className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
          <p className="text-xs font-medium text-zinc-500">Service records</p>
          <p className="mt-0.5 text-2xl font-bold text-zinc-900">{records.length}</p>
        </article>
        <article className="rounded-2xl border border-emerald-100 bg-emerald-50/50 p-4 shadow-sm">
          <p className="text-xs font-medium text-emerald-700">Verified</p>
          <p className="mt-0.5 text-2xl font-bold text-emerald-800">{verifiedCount}</p>
        </article>
        <article className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
          <p className="text-xs font-medium text-zinc-500">License plate</p>
          <p className="mt-0.5 text-lg font-bold text-zinc-900">{vehicle.license_plate}</p>
        </article>
        <article className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
          <p className="text-xs font-medium text-zinc-500">Lifetime spend</p>
          <p className="mt-0.5 text-xl font-bold text-zinc-900">${totalSpent.toFixed(0)}</p>
        </article>
      </section>

      <p className="mb-1 text-xs text-zinc-400">VIN: {vehicle.vin}</p>
      <p className="mb-5 text-xs text-zinc-400">{vehicle.mileage.toLocaleString()} miles on odometer</p>

      <ServiceTimeline records={records} />

      <div className="mt-6 flex gap-3">
        <Link
          href="/add-service"
          className="inline-flex min-h-11 flex-1 items-center justify-center gap-1.5 rounded-xl bg-indigo-600 px-4 text-sm font-semibold text-white shadow-sm shadow-indigo-300/50 transition hover:bg-indigo-500 active:scale-95"
        >
          <Plus className="h-4 w-4" />
          Add Service
        </Link>
        <Link
          href={`/public/${vehicle.id}`}
          className="inline-flex min-h-11 flex-1 items-center justify-center gap-1.5 rounded-xl border border-zinc-300 bg-white px-4 text-sm font-semibold text-zinc-800 shadow-sm transition hover:bg-zinc-50 active:scale-95"
        >
          <ArrowUpRight className="h-4 w-4" />
          Public Resume
        </Link>
      </div>
    </main>
  );
}
