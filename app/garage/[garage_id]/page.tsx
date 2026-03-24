import Link from "next/link";
import { serviceRecords, garages } from "@/lib/mock-data";
import { VerifiedBadge } from "@/components/autolog/verified-badge";

interface GaragePageProps {
  params: Promise<{ garage_id: string }>;
}

export default async function GaragePage({ params }: GaragePageProps) {
  const { garage_id } = await params;
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
        <p className="mt-2 text-sm font-semibold text-indigo-600">Verified repairs: {verified.length}</p>
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
