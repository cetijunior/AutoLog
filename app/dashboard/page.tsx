import Link from "next/link";
import { CarFront, ChevronRight } from "lucide-react";
import { vehicles } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  return (
    <main className="p-5 md:p-8">
      <header className="mb-6">
        <p className="text-xs uppercase tracking-wide text-zinc-500">Owner Dashboard</p>
        <h1 className="text-2xl font-bold">My Virtual Garage</h1>
      </header>

      <div className="space-y-4">
        {vehicles.map((vehicle) => (
          <article key={vehicle.id} className="rounded-2xl border border-zinc-200 p-4">
            <div className="mb-2 flex items-center gap-2">
              <CarFront className="h-4 w-4 text-indigo-600" />
              <p className="text-sm font-semibold text-zinc-500">{vehicle.license_plate}</p>
            </div>
            <h2 className="text-lg font-semibold">
              {vehicle.year} {vehicle.make} {vehicle.model}
            </h2>
            <p className="text-sm text-zinc-600">{vehicle.mileage.toLocaleString()} miles</p>
            <Link
              href={`/vehicle/${vehicle.id}`}
              className="mt-4 inline-flex min-h-11 items-center gap-1 text-sm font-semibold text-indigo-600"
            >
              View full timeline <ChevronRight className="h-4 w-4" />
            </Link>
          </article>
        ))}
      </div>

      <div className="mt-6">
        <Link href="/add-service">
          <Button fullWidth>Add New Service Record</Button>
        </Link>
      </div>
    </main>
  );
}
