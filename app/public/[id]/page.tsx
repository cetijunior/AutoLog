"use client";

import { useParams, useSearchParams } from "next/navigation";
import { ServiceTimeline } from "@/components/autolog/service-timeline";
import { Button } from "@/components/ui/button";
import { useAutoLog } from "@/components/providers/autolog-provider";

export default function PublicVehiclePage() {
  const { id } = useParams<{ id: string }>();
  const searchParams = useSearchParams();
  const { vehicles, serviceRecords } = useAutoLog();
  const vehicle = vehicles.find((item) => item.id === id);
  const records = serviceRecords
    .filter((record) => record.vehicle_id === id)
    .sort((a, b) => +new Date(b.date) - +new Date(a.date));
  const hideCosts = searchParams.get("hideCosts") === "1";
  const verifiedCount = records.filter((record) => record.status === "garage_verified").length;

  if (!vehicle) return <main className="p-6">Vehicle not found.</main>;

  return (
    <main className="p-5 md:p-8">
      <header className="mb-6 rounded-2xl bg-zinc-900 p-5 text-white">
        <p className="text-xs uppercase tracking-wide text-zinc-300">Public Vehicle Resume</p>
        <h1 className="mt-1 text-2xl font-bold">
          {vehicle.year} {vehicle.make} {vehicle.model}
        </h1>
        <p className="mt-1 text-sm text-zinc-300">VIN ending {vehicle.vin.slice(-6)}</p>
        <div className="mt-4">
          <a href={`?hideCosts=${hideCosts ? "0" : "1"}`}>
            <Button variant="secondary">{hideCosts ? "Show Costs" : "Hide Costs"}</Button>
          </a>
        </div>
      </header>

      <section className="mb-5 grid grid-cols-2 gap-3">
        <article className="rounded-2xl border border-zinc-200 p-3">
          <p className="text-xs text-zinc-500">Total entries</p>
          <p className="text-lg font-bold">{records.length}</p>
        </article>
        <article className="rounded-2xl border border-zinc-200 p-3">
          <p className="text-xs text-zinc-500">Garage verified</p>
          <p className="text-lg font-bold text-emerald-600">{verifiedCount}</p>
        </article>
      </section>

      <ServiceTimeline records={records} hideCosts={hideCosts} />
    </main>
  );
}
