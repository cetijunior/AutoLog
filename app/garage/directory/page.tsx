import Link from "next/link";
import { garages } from "@/lib/mock-data";

export default function GarageDirectoryPage() {
  return (
    <main className="p-5 md:p-8">
      <header className="mb-5">
        <p className="text-xs uppercase tracking-wide text-zinc-500">Garage Portfolio</p>
        <h1 className="text-2xl font-bold">Garage Directory</h1>
        <p className="mt-1 text-sm text-zinc-600">Browse garages with verified repair history.</p>
      </header>

      <section className="space-y-3">
        {garages.map((garage) => (
          <Link
            key={garage.id}
            href={`/garage/${garage.id}`}
            className="block rounded-2xl border border-zinc-200 p-4 transition hover:bg-zinc-50"
          >
            <h2 className="font-semibold">{garage.name}</h2>
            <p className="mt-1 text-sm text-zinc-600">{garage.address}</p>
            <p className="text-xs text-zinc-500">{garage.phone}</p>
          </Link>
        ))}
      </section>
    </main>
  );
}
