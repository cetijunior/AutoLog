import { ServiceTimeline } from "@/components/autolog/service-timeline";
import { getRecordsForVehicle, getVehicleById } from "@/lib/mock-data";

interface VehiclePageProps {
  params: Promise<{ vehicle_id: string }>;
}

export default async function VehiclePage({ params }: VehiclePageProps) {
  const { vehicle_id } = await params;
  const vehicle = getVehicleById(vehicle_id);

  if (!vehicle) return <main className="p-6">Vehicle not found.</main>;

  const records = getRecordsForVehicle(vehicle.id);

  return (
    <main className="p-5 md:p-8">
      <header className="mb-5">
        <p className="text-xs uppercase tracking-wide text-zinc-500">Vehicle Timeline</p>
        <h1 className="text-2xl font-bold">
          {vehicle.year} {vehicle.make} {vehicle.model}
        </h1>
      </header>
      <ServiceTimeline records={records} />
    </main>
  );
}
