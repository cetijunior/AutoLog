import { AddServiceWizard } from "@/app/add-service/add-service-wizard";

export default function AddServicePage() {
  return (
    <main className="p-5 md:p-8">
      <header className="mb-5">
        <p className="text-xs uppercase tracking-wide text-zinc-500">Mobile Wizard</p>
        <h1 className="text-2xl font-bold">Add Service</h1>
        <p className="mt-1 text-sm text-zinc-600">
          Log maintenance in under 60 seconds with a guided flow.
        </p>
      </header>
      <AddServiceWizard />
    </main>
  );
}
