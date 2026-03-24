"use client";

import Link from "next/link";
import { CheckCircle2, Clock3 } from "lucide-react";
import { useAutoLog } from "@/components/providers/autolog-provider";

export default function ProDashboardPage() {
  const { serviceRecords } = useAutoLog();
  const pending = serviceRecords.filter((record) => record.status === "user_logged");
  const complete = serviceRecords.filter((record) => record.status === "garage_verified");

  return (
    <main className="p-5 md:p-8">
      <header>
        <p className="text-xs uppercase tracking-wide text-zinc-500">Garage Pro</p>
        <h1 className="text-2xl font-bold">Tag Request Inbox</h1>
        <p className="mt-1 text-sm text-zinc-600">Review customer requests and verify completed work.</p>
      </header>

      <section className="mt-5 grid grid-cols-2 gap-3">
        <article className="rounded-2xl border border-zinc-200 p-3">
          <Clock3 className="mb-1 h-4 w-4 text-amber-600" />
          <p className="text-xs text-zinc-500">Pending requests</p>
          <p className="text-lg font-bold">{pending.length}</p>
        </article>
        <article className="rounded-2xl border border-zinc-200 p-3">
          <CheckCircle2 className="mb-1 h-4 w-4 text-emerald-600" />
          <p className="text-xs text-zinc-500">Verified this month</p>
          <p className="text-lg font-bold">{complete.length}</p>
        </article>
      </section>

      <div className="mt-5 space-y-3">
        {pending.map((record) => (
          <article key={record.id} className="rounded-xl border border-zinc-200 p-4">
            <p className="text-sm font-semibold text-zinc-500">Requested verification</p>
            <h2 className="mt-1 font-semibold">{record.service_type}</h2>
            <p className="text-sm text-zinc-600">Mileage: {record.mileage_at_service.toLocaleString()} mi</p>
            <Link
              href={`/pro/verify/${record.id}`}
              className="mt-3 inline-flex min-h-11 items-center justify-center rounded-xl bg-indigo-600 px-4 text-sm font-semibold text-white shadow-sm shadow-indigo-300/50 transition hover:bg-indigo-500"
            >
              Open verification
            </Link>
          </article>
        ))}
      </div>
    </main>
  );
}
