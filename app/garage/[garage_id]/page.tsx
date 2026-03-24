"use client";

import Link from "next/link";
import { ArrowLeft, Building2, CheckCircle2, MapPin, Phone, Star } from "lucide-react";
import { useParams } from "next/navigation";
import { VerifiedBadge } from "@/components/autolog/verified-badge";
import { useAutoLog } from "@/components/providers/autolog-provider";

export default function GaragePage() {
  const { garage_id } = useParams<{ garage_id: string }>();
  const { garages, serviceRecords } = useAutoLog();
  const garage = garages.find((item) => item.id === garage_id);

  if (!garage) return <main className="p-6">Garage profile not found.</main>;

  const isClaimed = Boolean(garage.claimed_by);
  const verified = serviceRecords.filter(
    (record) => record.garage_id === garage.id && record.status === "garage_verified",
  );

  return (
    <main className="p-5 md:p-8">
      <div className="mb-5 flex items-center gap-2">
        <Link
          href="/garage/directory"
          className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-200 bg-white text-zinc-600 shadow-sm transition hover:bg-zinc-50"
        >
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <p className="text-xs font-medium uppercase tracking-wide text-zinc-400">Garage Profile</p>
      </div>

      {/* Garage header card */}
      <section className="mb-5 overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
        <div className="flex items-start gap-4 p-5">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-zinc-100">
            <Building2 className="h-7 w-7 text-zinc-600" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-xl font-bold text-zinc-900">{garage.name}</h1>
              {isClaimed ? (
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-700">
                  <CheckCircle2 className="h-3 w-3" />
                  Claimed
                </span>
              ) : (
                <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-xs font-semibold text-zinc-500">
                  Unclaimed
                </span>
              )}
            </div>
            <p className="mt-1 flex items-center gap-1 text-sm text-zinc-500">
              <MapPin className="h-3.5 w-3.5 shrink-0" />
              {garage.address}
            </p>
            <p className="flex items-center gap-1 text-sm text-zinc-500">
              <Phone className="h-3.5 w-3.5 shrink-0" />
              {garage.phone}
            </p>
            <div className="mt-2 flex items-center gap-3 text-sm">
              <span className="font-semibold text-indigo-600">{verified.length} verified repairs</span>
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-xs font-semibold text-amber-700">
                <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                4.8
              </span>
            </div>
          </div>
        </div>

        {/* Claim CTA for unclaimed garages */}
        {!isClaimed && (
          <div className="border-t border-dashed border-zinc-200 bg-indigo-50/60 px-5 py-3">
            <p className="text-xs font-semibold text-indigo-700">Is this your garage?</p>
            <p className="mt-0.5 text-xs text-indigo-600">
              Claim this profile to verify service records and build your public portfolio on AutoLog.
            </p>
          </div>
        )}
      </section>

      {/* Verified repairs */}
      <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-zinc-400">Verified Repairs</h2>
      {verified.length > 0 ? (
        <section className="space-y-3">
          {verified.map((record) => (
            <article key={record.id} className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm transition hover:shadow-md">
              <div className="flex items-center justify-between gap-2">
                <p className="font-semibold text-zinc-900">{record.service_type}</p>
                <VerifiedBadge status={record.status} garageName={garage.name} />
              </div>
              <p className="mt-1 text-sm text-zinc-500">{record.description}</p>
              <p className="mt-1 text-xs text-zinc-400">
                {new Date(record.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })} ·{" "}
                {record.mileage_at_service.toLocaleString()} mi
              </p>
            </article>
          ))}
        </section>
      ) : (
        <div className="rounded-2xl border border-dashed border-zinc-300 p-6 text-center text-sm text-zinc-500">
          No verified repairs yet for this garage.
        </div>
      )}
    </main>
  );
}
