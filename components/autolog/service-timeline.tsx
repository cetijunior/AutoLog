"use client";

import { CalendarDays, DollarSign, Gauge, Wrench } from "lucide-react";
import { ServiceRecord } from "@/lib/types";
import { VerifiedBadge } from "@/components/autolog/verified-badge";
import { useAutoLog } from "@/components/providers/autolog-provider";

interface ServiceTimelineProps {
  records: ServiceRecord[];
  hideCosts?: boolean;
}

export function ServiceTimeline({ records, hideCosts }: ServiceTimelineProps) {
  const { garages } = useAutoLog();

  if (records.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 p-8 text-center">
        <Wrench className="mb-2 h-7 w-7 text-zinc-300" />
        <p className="text-sm font-medium text-zinc-500">No service history yet</p>
        <p className="mt-1 text-xs text-zinc-400">Add your first service record to start your vehicle timeline.</p>
      </div>
    );
  }

  return (
    <ol className="relative border-s-2 border-indigo-100 ps-6">
      {records.map((record) => {
        const garageName = garages.find((garage) => garage.id === record.garage_id)?.name;
        const isVerified = record.status === "garage_verified";

        return (
          <li key={record.id} className="mb-6 ms-2">
            <span
              className={`absolute -start-[9px] mt-1.5 h-4 w-4 rounded-full border-2 border-white shadow-sm ${
                isVerified ? "bg-emerald-500" : "bg-indigo-400"
              }`}
            />
            <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition hover:shadow-md">
              {/* Status strip */}
              <div className={`h-1 w-full ${isVerified ? "bg-emerald-500" : "bg-indigo-400"}`} />
              <div className="p-4">
                <div className="mb-2 flex flex-wrap items-start justify-between gap-2">
                  <h3 className="text-base font-semibold text-zinc-900">{record.service_type}</h3>
                  <VerifiedBadge status={record.status} garageName={garageName} />
                </div>
                <p className="mb-3 text-sm text-zinc-600 leading-relaxed">{record.description}</p>
                <div className="flex flex-wrap gap-3 text-xs text-zinc-500">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-zinc-100 px-2.5 py-1">
                    <CalendarDays className="h-3.5 w-3.5 text-zinc-400" />
                    {new Date(record.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-zinc-100 px-2.5 py-1">
                    <Gauge className="h-3.5 w-3.5 text-zinc-400" />
                    {record.mileage_at_service.toLocaleString()} mi
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-zinc-100 px-2.5 py-1">
                    <Wrench className="h-3.5 w-3.5 text-zinc-400" />
                    {garageName ?? "No garage tagged"}
                  </span>
                </div>
                {!hideCosts && record.cost > 0 && (
                  <div className="mt-3 flex items-center gap-1 text-sm font-semibold text-zinc-900">
                    <DollarSign className="h-4 w-4 text-zinc-400" />
                    {record.cost.toFixed(2)}
                  </div>
                )}
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
