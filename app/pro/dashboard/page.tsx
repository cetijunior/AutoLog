import Link from "next/link";
import { serviceRecords } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";

export default function ProDashboardPage() {
  const pending = serviceRecords.filter((record) => record.status === "user_logged");

  return (
    <main className="p-5 md:p-8">
      <header>
        <p className="text-xs uppercase tracking-wide text-zinc-500">Garage Pro</p>
        <h1 className="text-2xl font-bold">Tag Request Inbox</h1>
      </header>

      <div className="mt-5 space-y-3">
        {pending.map((record) => (
          <article key={record.id} className="rounded-xl border border-zinc-200 p-4">
            <p className="text-sm font-semibold text-zinc-500">Requested verification</p>
            <h2 className="mt-1 font-semibold">{record.service_type}</h2>
            <p className="text-sm text-zinc-600">Mileage: {record.mileage_at_service.toLocaleString()} mi</p>
            <Link href={`/pro/verify/${record.id}`}>
              <Button className="mt-3">Open verification</Button>
            </Link>
          </article>
        ))}
      </div>
    </main>
  );
}
