"use client";

import Link from "next/link";
import { AlertTriangle, CarFront, ChevronRight, ClipboardCheck, ShieldCheck, Wrench } from "lucide-react";
import { useAutoLog } from "@/components/providers/autolog-provider";

export default function DashboardPage() {
  const { serviceRecords, vehicles } = useAutoLog();
  const verifiedCount = serviceRecords.filter((record) => record.status === "garage_verified").length;
  const totalServices = serviceRecords.length;
  const reminders = 2;

  return (
    <main className="p-5 md:p-8">
      <header className="mb-6">
        <p className="text-xs uppercase tracking-wide text-zinc-500">Owner Dashboard</p>
        <h1 className="text-2xl font-bold">My Virtual Garage</h1>
        <p className="mt-1 text-sm text-zinc-600">
          Track every service, verify work, and keep resale-ready records.
        </p>
      </header>

      <section className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-4">
        <article className="rounded-2xl border border-zinc-200 p-3">
          <ClipboardCheck className="mb-1 h-4 w-4 text-indigo-600" />
          <p className="text-xs text-zinc-500">Total records</p>
          <p className="text-lg font-bold">{totalServices}</p>
        </article>
        <article className="rounded-2xl border border-zinc-200 p-3">
          <ShieldCheck className="mb-1 h-4 w-4 text-emerald-600" />
          <p className="text-xs text-zinc-500">Verified</p>
          <p className="text-lg font-bold">{verifiedCount}</p>
        </article>
        <article className="rounded-2xl border border-zinc-200 p-3">
          <Wrench className="mb-1 h-4 w-4 text-zinc-700" />
          <p className="text-xs text-zinc-500">Vehicles</p>
          <p className="text-lg font-bold">{vehicles.length}</p>
        </article>
        <article className="rounded-2xl border border-amber-200 bg-amber-50 p-3">
          <AlertTriangle className="mb-1 h-4 w-4 text-amber-600" />
          <p className="text-xs text-amber-700">Maintenance due</p>
          <p className="text-lg font-bold text-amber-800">{reminders}</p>
        </article>
      </section>

      <div className="space-y-4">
        {vehicles.map((vehicle) => (
          <article key={vehicle.id} className="rounded-2xl border border-zinc-200 p-4 shadow-sm">
            <div className="mb-2 flex items-center gap-2">
              <CarFront className="h-4 w-4 text-indigo-600" />
              <p className="text-sm font-semibold text-zinc-500">{vehicle.license_plate}</p>
            </div>
            <h2 className="text-lg font-semibold">
              {vehicle.year} {vehicle.make} {vehicle.model}
            </h2>
            <p className="text-sm text-zinc-600">{vehicle.mileage.toLocaleString()} miles</p>
            <p className="mt-1 text-xs text-zinc-500">VIN: {vehicle.vin}</p>
            <Link
              href={`/vehicle/${vehicle.id}`}
              className="mt-4 inline-flex min-h-11 items-center gap-1 text-sm font-semibold text-indigo-600"
            >
              View full timeline <ChevronRight className="h-4 w-4" />
            </Link>
          </article>
        ))}
      </div>

      <div className="mt-6">
        <Link
          href="/add-service"
          className="inline-flex min-h-11 w-full items-center justify-center rounded-xl bg-indigo-600 px-4 text-sm font-semibold text-white shadow-sm shadow-indigo-300/50 transition hover:bg-indigo-500"
        >
          Add New Service Record
        </Link>
      </div>
    </main>
  );
}
