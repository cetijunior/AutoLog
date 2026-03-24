import { Button } from "@/components/ui/button";

const steps = [
  "Select Vehicle",
  "Enter Mileage & Date",
  "What was done?",
  "Tag Garage",
  "Upload Receipt",
];

export default function AddServicePage() {
  return (
    <main className="p-5 md:p-8">
      <header className="mb-5">
        <p className="text-xs uppercase tracking-wide text-zinc-500">Mobile Wizard</p>
        <h1 className="text-2xl font-bold">Add Service</h1>
      </header>

      <div className="space-y-4">
        {steps.map((step, index) => (
          <section key={step} className="rounded-2xl border border-zinc-200 p-4">
            <p className="text-xs font-semibold text-zinc-500">Step {index + 1}</p>
            <h2 className="mt-1 font-semibold">{step}</h2>
            <div className="mt-3 min-h-11 rounded-lg border border-zinc-300 bg-zinc-50 px-3 py-2 text-sm text-zinc-500">
              Input placeholder for {step.toLowerCase()}.
            </div>
          </section>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3">
        <Button variant="ghost">Back</Button>
        <Button>Continue</Button>
      </div>
    </main>
  );
}
