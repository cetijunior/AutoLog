import { ServiceTimeline } from "@/components/autolog/service-timeline";
import { Button } from "@/components/ui/button";
import { getRecordsForVehicle, getVehicleById } from "@/lib/mock-data";

interface PublicVehiclePageProps {
  params: Promise<{ vehicle_id: string }>;
  searchParams: Promise<{ hideCosts?: string }>;
}

export default async function PublicVehiclePage({ params, searchParams }: PublicVehiclePageProps) {
  const { vehicle_id } = await params;
  const query = await searchParams;

  const vehicle = getVehicleById(vehicle_id);
  if (!vehicle) return <main className="p-6">Vehicle not found.</main>;

  const records = getRecordsForVehicle(vehicle.id);
  const hideCosts = query.hideCosts === "1";

  return (
    <main className="p-5 md:p-8">
      <header className="mb-6 rounded-2xl bg-zinc-900 p-5 text-white">
        <p className="text-xs uppercase tracking-wide text-zinc-300">Public Vehicle Resume</p>
        <h1 className="mt-1 text-2xl font-bold">
          {vehicle.year} {vehicle.make} {vehicle.model}
        </h1>
        <p className="mt-1 text-sm text-zinc-300">VIN ending {vehicle.vin.slice(-6)}</p>
        <div className="mt-4">
          <a href={`?hideCosts=${hideCosts ? "0" : "1"}`}>
            <Button variant="secondary">{hideCosts ? "Show Costs" : "Hide Costs"}</Button>
          </a>
        </div>
      </header>

      <ServiceTimeline records={records} hideCosts={hideCosts} />
    </main>
  );
}
