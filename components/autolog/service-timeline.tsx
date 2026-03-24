import { CalendarDays, Gauge, Wrench } from "lucide-react";
import { getGarageById } from "@/lib/mock-data";
import { ServiceRecord } from "@/lib/types";
import { VerifiedBadge } from "@/components/autolog/verified-badge";

interface ServiceTimelineProps {
  records: ServiceRecord[];
  hideCosts?: boolean;
}

export function ServiceTimeline({ records, hideCosts }: ServiceTimelineProps) {
  if (records.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-zinc-300 p-6 text-sm text-zinc-500">
        No service history yet.
      </div>
    );
  }

  return (
    <ol className="relative border-s border-zinc-300 ps-6">
      {records.map((record) => {
        const garageName = getGarageById(record.garage_id)?.name;

        return (
          <li key={record.id} className="mb-8 ms-2">
            <span className="absolute -start-1.5 mt-1.5 h-3 w-3 rounded-full bg-indigo-600" />
            <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
              <div className="mb-3 flex items-center justify-between gap-2">
                <h3 className="text-base font-semibold text-zinc-900">{record.service_type}</h3>
                <VerifiedBadge status={record.status} garageName={garageName} />
              </div>
              <p className="mb-3 text-sm text-zinc-600">{record.description}</p>
              <div className="flex flex-wrap gap-3 text-xs text-zinc-500">
                <span className="inline-flex items-center gap-1">
                  <CalendarDays className="h-3.5 w-3.5" />
                  {new Date(record.date).toLocaleDateString()}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Gauge className="h-3.5 w-3.5" />
                  {record.mileage_at_service.toLocaleString()} mi
                </span>
                <span className="inline-flex items-center gap-1">
                  <Wrench className="h-3.5 w-3.5" />
                  {garageName ?? "Unclaimed garage"}
                </span>
              </div>
              {!hideCosts && (
                <p className="mt-3 text-sm font-semibold text-zinc-900">
                  Cost: ${record.cost.toFixed(2)}
                </p>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
