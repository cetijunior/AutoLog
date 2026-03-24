import { ClipboardPlus } from "lucide-react";
import { AddServiceWizard } from "@/app/add-service/add-service-wizard";

export default function AddServicePage() {
  return (
    <main className="p-5 md:p-8">
      <header className="mb-5 flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-600">
          <ClipboardPlus className="h-5 w-5 text-white" />
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-zinc-400">5-Step Wizard</p>
          <h1 className="text-xl font-bold leading-tight">Add Service Record</h1>
        </div>
      </header>
      <AddServiceWizard />
    </main>
  );
}
