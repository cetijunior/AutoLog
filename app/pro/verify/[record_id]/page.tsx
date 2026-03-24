"use client";

import Link from "next/link";
import { ArrowLeft, CalendarDays, FileText, Gauge, ShieldCheck, ShieldX } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useAutoLog } from "@/components/providers/autolog-provider";

export default function VerifyPage() {
  const { record_id } = useParams<{ record_id: string }>();
  const router = useRouter();
  const { serviceRecords, vehicles, garages, updateRecordStatus } = useAutoLog();
  const record = serviceRecords.find((item) => item.id === record_id);
  const vehicle = record ? vehicles.find((v) => v.id === record.vehicle_id) : null;
  const garage = record?.garage_id ? garages.find((g) => g.id === record.garage_id) : null;

  if (!record) return <main className="p-6">Record not found.</main>;

  return (
    <main className="p-5 md:p-8">
      <div className="mb-5 flex items-center gap-2">
        <Link
          href="/pro/dashboard"
          className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-200 bg-white text-zinc-600 shadow-sm transition hover:bg-zinc-50"
        >
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-zinc-400">Garage Verification</p>
          <h1 className="text-xl font-bold leading-tight">Review Service Record</h1>
        </div>
      </div>

      <p className="mb-4 text-sm text-zinc-500">
        Confirm this request to publish a verified badge on the customer&apos;s vehicle resume.
      </p>

      {/* Service details card */}
      <section className="mb-4 overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
        <div className="border-b border-zinc-100 px-5 py-3">
          <h2 className="font-semibold text-zinc-900">{record.service_type}</h2>
          {vehicle && (
            <p className="mt-0.5 text-xs text-zinc-500">
              {vehicle.year} {vehicle.make} {vehicle.model} · {vehicle.license_plate}
            </p>
          )}
        </div>
        <div className="px-5 py-4 space-y-3">
          <p className="text-sm text-zinc-700">{record.description}</p>
          <div className="flex flex-wrap gap-3 text-xs text-zinc-500">
            <span className="inline-flex items-center gap-1">
              <Gauge className="h-3.5 w-3.5" />
              {record.mileage_at_service.toLocaleString()} mi
            </span>
            <span className="inline-flex items-center gap-1">
              <CalendarDays className="h-3.5 w-3.5" />
              {new Date(record.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
            </span>
            {record.cost > 0 && (
              <span className="inline-flex items-center gap-1 font-semibold text-zinc-700">
                ${record.cost.toFixed(2)}
              </span>
            )}
          </div>
          {garage && (
            <p className="text-xs text-indigo-600">Tagged garage: {garage.name}</p>
          )}
        </div>
      </section>

      {/* Receipt placeholder */}
      <section className="mb-6 overflow-hidden rounded-2xl border border-dashed border-zinc-300 bg-zinc-50">
        <div className="flex flex-col items-center justify-center gap-2 p-8 text-center">
          <FileText className="h-8 w-8 text-zinc-300" />
          <p className="text-sm font-medium text-zinc-500">No receipt attached</p>
          <p className="text-xs text-zinc-400">The customer has not uploaded a receipt image for this record.</p>
        </div>
      </section>

      {/* Action buttons */}
      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => {
            updateRecordStatus(record.id, "user_logged");
            router.push("/pro/dashboard");
          }}
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-rose-600 px-4 text-sm font-semibold text-white shadow-sm shadow-rose-300/50 transition hover:bg-rose-500 active:scale-95"
        >
          <ShieldX className="h-4 w-4" />
          Reject
        </button>
        <button
          type="button"
          onClick={() => {
            updateRecordStatus(record.id, "garage_verified");
            router.push("/pro/dashboard");
          }}
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 text-sm font-semibold text-white shadow-sm shadow-emerald-300/50 transition hover:bg-emerald-500 active:scale-95"
        >
          <ShieldCheck className="h-4 w-4" />
          Verify Service
        </button>
      </div>
    </main>
  );
}
