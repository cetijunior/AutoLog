import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { serviceRecords } from "@/lib/mock-data";

interface VerifyPageProps {
  params: Promise<{ record_id: string }>;
}

export default async function VerifyPage({ params }: VerifyPageProps) {
  const { record_id } = await params;
  const record = serviceRecords.find((item) => item.id === record_id);

  if (!record) {
    notFound();
  }

  return (
    <main className="p-5 md:p-8">
      <header>
        <p className="text-xs uppercase tracking-wide text-zinc-500">Garage Verification</p>
        <h1 className="text-2xl font-bold">Review Service Record</h1>
      </header>

      <section className="mt-5 rounded-2xl border border-zinc-200 p-4">
        <h2 className="font-semibold">{record.service_type}</h2>
        <p className="mt-1 text-sm text-zinc-600">{record.description}</p>
        <p className="mt-1 text-sm text-zinc-600">Mileage at service: {record.mileage_at_service.toLocaleString()} mi</p>
        <div className="mt-4 rounded-xl border border-dashed border-zinc-300 p-4 text-sm text-zinc-500">
          Receipt image preview placeholder
        </div>
      </section>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <Button variant="danger">Reject/Edit</Button>
        <Button variant="success">Verify Service</Button>
      </div>
    </main>
  );
}
