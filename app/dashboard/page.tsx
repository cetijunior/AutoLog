"use client";

import Link from "next/link";
import { AlertTriangle, ArrowRight, CarFront, ClipboardCheck, Plus, ShieldCheck, Wrench } from "lucide-react";
import { useAutoLog } from "@/components/providers/autolog-provider";

export default function DashboardPage() {
  const { serviceRecords, vehicles } = useAutoLog();
  const verifiedCount = serviceRecords.filter((record) => record.status === "garage_verified").length;
  const totalServices = serviceRecords.length;
  const reminders = 2;

  const vehicleMakeColors: Record<string, string> = {
    Honda: "from-red-500 to-orange-400",
    BMW: "from-blue-600 to-indigo-500",
    Toyota: "from-red-600 to-rose-500",
    Ford: "from-blue-700 to-blue-500",
    Chevrolet: "from-amber-600 to-yellow-500",
  };

  return (
    <main className="p-5 md:p-8">
      <header className="mb-6 flex items-start justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-zinc-400">Owner Dashboard</p>
          <h1 className="mt-0.5 text-2xl font-bold">My Virtual Garage</h1>
          <p className="mt-1 text-sm text-zinc-500">
            Track every service, verify work, and keep resale-ready records.
          </p>
        </div>
        <Link
          href="/add-service"
          className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-sm shadow-indigo-300/50 transition hover:bg-indigo-500 active:scale-95"
          aria-label="Add service"
        >
          <Plus className="h-5 w-5" />
        </Link>
      </header>

      {/* Stats grid */}
      <section className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-4">
        <article className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
          <div className="mb-2 inline-flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50">
            <ClipboardCheck className="h-4 w-4 text-indigo-600" />
          </div>
          <p className="text-xs font-medium text-zinc-500">Total records</p>
          <p className="mt-0.5 text-2xl font-bold text-zinc-900">{totalServices}</p>
        </article>
        <article className="rounded-2xl border border-emerald-100 bg-emerald-50/50 p-4 shadow-sm">
          <div className="mb-2 inline-flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100">
            <ShieldCheck className="h-4 w-4 text-emerald-600" />
          </div>
          <p className="text-xs font-medium text-emerald-700">Verified</p>
          <p className="mt-0.5 text-2xl font-bold text-emerald-800">{verifiedCount}</p>
        </article>
        <article className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
          <div className="mb-2 inline-flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-100">
            <Wrench className="h-4 w-4 text-zinc-600" />
          </div>
          <p className="text-xs font-medium text-zinc-500">Vehicles</p>
          <p className="mt-0.5 text-2xl font-bold text-zinc-900">{vehicles.length}</p>
        </article>
        <article className="rounded-2xl border border-amber-200 bg-amber-50 p-4 shadow-sm">
          <div className="mb-2 inline-flex h-8 w-8 items-center justify-center rounded-lg bg-amber-100">
            <AlertTriangle className="h-4 w-4 text-amber-600" />
          </div>
          <p className="text-xs font-medium text-amber-700">Reminders</p>
          <p className="mt-0.5 text-2xl font-bold text-amber-800">{reminders}</p>
        </article>
      </section>

      {/* Vehicles */}
      <h2 className="mb-3 text-sm font-semibold text-zinc-500 uppercase tracking-wide">Your Vehicles</h2>
      <div className="space-y-4">
        {vehicles.map((vehicle) => {
          const gradient = vehicleMakeColors[vehicle.make] ?? "from-zinc-700 to-zinc-600";
          const vehicleRecords = serviceRecords.filter((r) => r.vehicle_id === vehicle.id);
          const vehicleVerified = vehicleRecords.filter((r) => r.status === "garage_verified").length;

          return (
            <article key={vehicle.id} className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition hover:shadow-md">
              {/* Colored header strip */}
              <div className={`flex items-center gap-3 bg-gradient-to-r ${gradient} px-4 py-3`}>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 backdrop-blur">
                  <CarFront className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">
                    {vehicle.year} {vehicle.make} {vehicle.model}
                  </p>
                  <p className="text-xs text-white/70">{vehicle.license_plate}</p>
                </div>
              </div>

              {/* Body */}
              <div className="p-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-zinc-500">{vehicle.mileage.toLocaleString()} miles</span>
                  <span className="font-medium text-zinc-700">
                    {vehicleRecords.length} record{vehicleRecords.length !== 1 ? "s" : ""}
                    {vehicleVerified > 0 && (
                      <span className="ml-1.5 inline-flex items-center gap-0.5 rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-700">
                        <ShieldCheck className="h-3 w-3" />
                        {vehicleVerified} verified
                      </span>
                    )}
                  </span>
                </div>
                <p className="mt-1 text-xs text-zinc-400">VIN: {vehicle.vin}</p>
                <Link
                  href={`/vehicle/${vehicle.id}`}
                  className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600 transition hover:text-indigo-500"
                >
                  View full timeline <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </article>
          );
        })}
      </div>

      <div className="mt-6">
        <Link
          href="/add-service"
          className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 text-sm font-semibold text-white shadow-sm shadow-indigo-300/50 transition hover:bg-indigo-500 active:scale-95"
        >
          <Plus className="h-4 w-4" />
          Add New Service Record
        </Link>
      </div>
    </main>
  );
}
