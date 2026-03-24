"use client";

import Link from "next/link";
import { CheckCircle2, Clock3, ShieldCheck } from "lucide-react";
import { useAutoLog } from "@/components/providers/autolog-provider";

export default function ProDashboardPage() {
  const { serviceRecords, vehicles, garages } = useAutoLog();
  const pending = serviceRecords.filter((record) => record.status === "user_logged");
  const complete = serviceRecords.filter((record) => record.status === "garage_verified");

  return (
    <main className="p-5 md:p-8">
      <header className="mb-6">
        <p className="text-xs font-medium uppercase tracking-wide text-zinc-400">Garage Pro</p>
        <h1 className="mt-0.5 text-2xl font-bold">Tag Request Inbox</h1>
        <p className="mt-1 text-sm text-zinc-500">Review customer requests and verify completed work.</p>
      </header>

      {/* Stats */}
      <section className="mb-6 grid grid-cols-2 gap-3">
        <article className="rounded-2xl border border-amber-200 bg-amber-50/60 p-4 shadow-sm">
          <div className="mb-2 inline-flex h-8 w-8 items-center justify-center rounded-lg bg-amber-100">
            <Clock3 className="h-4 w-4 text-amber-600" />
          </div>
          <p className="text-xs font-medium text-amber-700">Pending requests</p>
          <p className="mt-0.5 text-2xl font-bold text-amber-800">{pending.length}</p>
        </article>
        <article className="rounded-2xl border border-emerald-100 bg-emerald-50/60 p-4 shadow-sm">
          <div className="mb-2 inline-flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100">
            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
          </div>
          <p className="text-xs font-medium text-emerald-700">Verified this month</p>
          <p className="mt-0.5 text-2xl font-bold text-emerald-800">{complete.length}</p>
        </article>
      </section>

      {/* Pending requests */}
      {pending.length > 0 ? (
        <div className="space-y-3">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-400">Awaiting review</h2>
          {pending.map((record) => {
            const vehicle = vehicles.find((v) => v.id === record.vehicle_id);
            const garage = garages.find((g) => g.id === record.garage_id);
            return (
              <article key={record.id} className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition hover:shadow-md">
                <div className="flex items-center gap-2 border-b border-zinc-100 bg-amber-50/40 px-4 py-2">
                  <Clock3 className="h-3.5 w-3.5 text-amber-500" />
                  <p className="text-xs font-semibold text-amber-700">Awaiting verification</p>
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h2 className="font-semibold text-zinc-900">{record.service_type}</h2>
                      {vehicle && (
                        <p className="mt-0.5 text-xs text-zinc-500">
                          {vehicle.year} {vehicle.make} {vehicle.model} · {vehicle.license_plate}
                        </p>
                      )}
                      <p className="mt-0.5 text-xs text-zinc-500">
                        {record.mileage_at_service.toLocaleString()} mi ·{" "}
                        {new Date(record.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                      </p>
                      {garage && (
                        <p className="mt-0.5 text-xs text-indigo-600">Tagged: {garage.name}</p>
                      )}
                    </div>
                    {record.cost > 0 && (
                      <span className="shrink-0 rounded-full bg-zinc-100 px-2 py-1 text-xs font-semibold text-zinc-700">
                        ${record.cost.toFixed(2)}
                      </span>
                    )}
                  </div>
                  {record.description && (
                    <p className="mt-2 text-sm text-zinc-600 line-clamp-2">{record.description}</p>
                  )}
                  <Link
                    href={`/pro/verify/${record.id}`}
                    className="mt-3 inline-flex min-h-10 items-center gap-1.5 rounded-xl bg-indigo-600 px-4 text-sm font-semibold text-white shadow-sm shadow-indigo-300/50 transition hover:bg-indigo-500 active:scale-95"
                  >
                    <ShieldCheck className="h-4 w-4" />
                    Open verification
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-zinc-300 p-8 text-center">
          <CheckCircle2 className="mx-auto mb-2 h-8 w-8 text-emerald-500" />
          <p className="font-semibold text-zinc-700">All caught up!</p>
          <p className="mt-1 text-sm text-zinc-500">No pending verification requests right now.</p>
        </div>
      )}

      {/* Verified records */}
      {complete.length > 0 && (
        <div className="mt-6 space-y-3">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-400">Recently verified</h2>
          {complete.map((record) => {
            const vehicle = vehicles.find((v) => v.id === record.vehicle_id);
            return (
              <article key={record.id} className="flex items-center gap-3 rounded-xl border border-zinc-200 bg-white px-4 py-3 shadow-sm">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-100">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-zinc-900">{record.service_type}</p>
                  {vehicle && (
                    <p className="text-xs text-zinc-500">
                      {vehicle.year} {vehicle.make} {vehicle.model}
                    </p>
                  )}
                </div>
                <span className="ml-auto shrink-0 rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-700">
                  Verified
                </span>
              </article>
            );
          })}
        </div>
      )}
    </main>
  );
}
