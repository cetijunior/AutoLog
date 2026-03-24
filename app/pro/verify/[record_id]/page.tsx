"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useAutoLog } from "@/components/providers/autolog-provider";

export default function VerifyPage() {
  const { record_id } = useParams<{ record_id: string }>();
  const router = useRouter();
  const { serviceRecords, updateRecordStatus } = useAutoLog();
  const record = serviceRecords.find((item) => item.id === record_id);

  if (!record) return <main className="p-6">Record not found.</main>;

  return (
    <main className="p-5 md:p-8">
      <header>
        <p className="text-xs uppercase tracking-wide text-zinc-500">Garage Verification</p>
        <h1 className="text-2xl font-bold">Review Service Record</h1>
        <p className="mt-1 text-sm text-zinc-600">Confirm this request to publish a verified badge.</p>
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
        <Button
          variant="danger"
          onClick={() => {
            updateRecordStatus(record.id, "user_logged");
            router.push("/pro/dashboard");
          }}
        >
          Reject/Edit
        </Button>
        <Button
          variant="success"
          onClick={() => {
            updateRecordStatus(record.id, "garage_verified");
            router.push("/pro/dashboard");
          }}
        >
          Verify Service
        </Button>
      </div>
      <Link href="/pro/dashboard" className="mt-4 inline-block text-sm font-semibold text-indigo-600">
        Back to inbox
      </Link>
    </main>
  );
}
