"use client";

import Link from "next/link";
import { Star } from "lucide-react";
import { useParams } from "next/navigation";
import { VerifiedBadge } from "@/components/autolog/verified-badge";
import { useAutoLog } from "@/components/providers/autolog-provider";

export default function GaragePage() {
  const { garage_id } = useParams<{ garage_id: string }>();
  const { garages, serviceRecords } = useAutoLog();
  const garage = garages.find((item) => item.id === garage_id);

  if (!garage) return <main className="p-6">Garage profile not found.</main>;

  const verified = serviceRecords.filter(
    (record) => record.garage_id === garage.id && record.status === "garage_verified",
  );

  return (
    <main className="p-5 md:p-8">
      <section className="rounded-2xl border border-zinc-200 p-5">
        <h1 className="text-2xl font-bold">{garage.name}</h1>
        <p className="mt-1 text-sm text-zinc-600">{garage.address}</p>
        <p className="text-sm text-zinc-600">{garage.phone}</p>
        <div className="mt-2 flex items-center gap-2 text-sm">
          <p className="font-semibold text-indigo-600">Verified repairs: {verified.length}</p>
          <span className="inline-flex items-center gap-1 rounded-full bg-zinc-100 px-2 py-1 text-zinc-600">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
            4.8
          </span>
        </div>
      </section>

      <section className="mt-6 space-y-3">
        {verified.map((record) => (
          <article key={record.id} className="rounded-xl border border-zinc-200 p-4">
            <div className="flex items-center justify-between gap-2">
              <p className="font-semibold">{record.service_type}</p>
              <VerifiedBadge status={record.status} garageName={garage.name} />
            </div>
            <p className="mt-1 text-sm text-zinc-600">{record.description}</p>
          </article>
        ))}
      </section>

      <Link href="/" className="mt-6 inline-block text-sm font-semibold text-indigo-600">
        Back to homepage
      </Link>
    </main>
  );
}
