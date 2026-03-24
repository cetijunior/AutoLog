"use client";

import Link from "next/link";
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

  return (
    <main className="p-5 md:p-8">
      <header className="mb-5">
        <p className="text-xs uppercase tracking-wide text-zinc-500">Vehicle Timeline</p>
        <h1 className="text-2xl font-bold">
          {vehicle.year} {vehicle.make} {vehicle.model}
        </h1>
        <p className="mt-1 text-sm text-zinc-600">License: {vehicle.license_plate}</p>
      </header>
      <section className="mb-5 grid grid-cols-2 gap-3">
        <article className="rounded-2xl border border-zinc-200 p-3">
          <p className="text-xs text-zinc-500">Service records</p>
          <p className="text-lg font-bold">{records.length}</p>
        </article>
        <article className="rounded-2xl border border-zinc-200 p-3">
          <p className="text-xs text-zinc-500">Lifetime spend</p>
          <p className="text-lg font-bold">${totalSpent.toFixed(2)}</p>
        </article>
      </section>
      <ServiceTimeline records={records} />
      <div className="mt-6 flex gap-3">
        <Link
          href="/add-service"
          className="inline-flex min-h-11 flex-1 items-center justify-center rounded-xl bg-indigo-600 px-4 text-sm font-semibold text-white shadow-sm shadow-indigo-300/50 transition hover:bg-indigo-500"
        >
          Add Service
        </Link>
        <Link
          href={`/public/${vehicle.id}`}
          className="inline-flex min-h-11 flex-1 items-center justify-center rounded-xl border border-zinc-300 px-4 text-sm font-semibold text-zinc-800 transition hover:bg-zinc-100"
        >
          Public Resume
        </Link>
      </div>
    </main>
  );
}
