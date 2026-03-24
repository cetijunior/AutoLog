"use client";

import { useMemo, useState } from "react";
import { CarFront, CheckCircle2, Upload } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useAutoLog } from "@/components/providers/autolog-provider";

const serviceTypes = ["Oil", "Brakes", "Tires", "Battery", "Inspection", "Custom"];

const steps = [
  "Select Vehicle",
  "Mileage, Date & Cost",
  "What was done?",
  "Tag Garage",
  "Upload Receipt",
];

export function AddServiceWizard() {
  const router = useRouter();
  const { garages, vehicles, addServiceRecord } = useAutoLog();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    vehicleId: vehicles[0]?.id ?? "",
    mileage: "",
    date: "",
    cost: "",
    serviceType: "Oil",
    customType: "",
    description: "",
    garageId: garages[0]?.id ?? "",
    receiptName: "",
    garageSearch: "",
  });

  const currentStep = steps[step];
  const selectedVehicle = useMemo(
    () => vehicles.find((vehicle) => vehicle.id === form.vehicleId),
    [vehicles, form.vehicleId],
  );

  const canContinue =
    (step === 0 && Boolean(form.vehicleId)) ||
    (step === 1 && Boolean(form.mileage && form.date)) ||
    (step === 2 && Boolean(form.serviceType) && Boolean(form.description)) ||
    (step === 3 && Boolean(form.garageId)) ||
    step === 4;

  const isLastStep = step === steps.length - 1;

  const filteredGarages = garages.filter((garage) =>
    `${garage.name} ${garage.address}`
      .toLowerCase()
      .includes(form.garageSearch.replace("@", "").toLowerCase()),
  );

  return (
    <>
      {/* Step progress */}
      <div className="mb-4 rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
        <div className="mb-3 flex items-center justify-between">
          <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
            Step {step + 1} of {steps.length}
          </p>
          <p className="text-xs font-semibold text-indigo-600">{Math.round(((step + 1) / steps.length) * 100)}%</p>
        </div>
        {/* Step dots */}
        <div className="mb-3 flex items-center gap-1">
          {steps.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 flex-1 rounded-full transition-all ${
                i <= step ? "bg-indigo-600" : "bg-zinc-200"
              }`}
            />
          ))}
        </div>
        <h2 className="text-lg font-semibold text-zinc-900">{currentStep}</h2>
      </div>

      {/* Step content */}
      <section className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
        {/* Step 0: Vehicle selection as cards */}
        {step === 0 && (
          <div className="space-y-3">
            <p className="text-sm font-medium text-zinc-700">Choose a vehicle</p>
            {vehicles.map((vehicle) => (
              <button
                key={vehicle.id}
                type="button"
                onClick={() => setForm((prev) => ({ ...prev, vehicleId: vehicle.id }))}
                className={`w-full overflow-hidden rounded-xl border text-left transition ${
                  form.vehicleId === vehicle.id
                    ? "border-indigo-500 bg-indigo-50 ring-1 ring-indigo-500"
                    : "border-zinc-200 hover:bg-zinc-50"
                }`}
              >
                <div className="flex items-center gap-3 px-4 py-3">
                  <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                    form.vehicleId === vehicle.id ? "bg-indigo-600" : "bg-zinc-100"
                  }`}>
                    <CarFront className={`h-4 w-4 ${form.vehicleId === vehicle.id ? "text-white" : "text-zinc-600"}`} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-zinc-900">
                      {vehicle.year} {vehicle.make} {vehicle.model}
                    </p>
                    <p className="text-xs text-zinc-500">
                      {vehicle.license_plate} · {vehicle.mileage.toLocaleString()} mi
                    </p>
                  </div>
                  {form.vehicleId === vehicle.id && (
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-indigo-600" />
                  )}
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Step 1: Mileage, date, cost */}
        {step === 1 && (
          <div className="grid gap-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-zinc-700" htmlFor="mileage">
                Mileage at service
              </label>
              <input
                id="mileage"
                type="number"
                placeholder="e.g. 64500"
                className="w-full rounded-xl border border-zinc-300 px-3 py-2.5 text-sm focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                value={form.mileage}
                onChange={(event) => setForm((prev) => ({ ...prev, mileage: event.target.value }))}
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-zinc-700" htmlFor="service-date">
                Service date
              </label>
              <input
                id="service-date"
                type="date"
                className="w-full rounded-xl border border-zinc-300 px-3 py-2.5 text-sm focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                value={form.date}
                onChange={(event) => setForm((prev) => ({ ...prev, date: event.target.value }))}
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-zinc-700" htmlFor="cost">
                Cost <span className="font-normal text-zinc-400">(optional)</span>
              </label>
              <div className="relative">
                <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-sm text-zinc-400">
                  $
                </span>
                <input
                  id="cost"
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  className="w-full rounded-xl border border-zinc-300 py-2.5 pl-7 pr-3 text-sm focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                  value={form.cost}
                  onChange={(event) => setForm((prev) => ({ ...prev, cost: event.target.value }))}
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Service type & description */}
        {step === 2 && (
          <div className="space-y-4">
            <div>
              <p className="mb-2 text-sm font-medium text-zinc-700">Service type</p>
              <div className="flex flex-wrap gap-2">
                {serviceTypes.map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setForm((prev) => ({ ...prev, serviceType: type }))}
                    className={`min-h-9 rounded-full px-4 text-sm font-medium transition ${
                      form.serviceType === type
                        ? "bg-indigo-600 text-white shadow-sm shadow-indigo-300/50"
                        : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
            {form.serviceType === "Custom" && (
              <input
                placeholder="Describe the service type"
                className="w-full rounded-xl border border-zinc-300 px-3 py-2.5 text-sm focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                value={form.customType}
                onChange={(event) => setForm((prev) => ({ ...prev, customType: event.target.value }))}
              />
            )}
            <div>
              <label className="mb-1 block text-sm font-medium text-zinc-700" htmlFor="description">
                Description
              </label>
              <textarea
                id="description"
                rows={4}
                placeholder="Describe what was done in detail..."
                className="w-full resize-none rounded-xl border border-zinc-300 px-3 py-2.5 text-sm focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                value={form.description}
                onChange={(event) => setForm((prev) => ({ ...prev, description: event.target.value }))}
              />
            </div>
          </div>
        )}

        {/* Step 3: Tag garage */}
        {step === 3 && (
          <div className="space-y-3">
            <div>
              <label htmlFor="garage-search" className="mb-1 block text-sm font-medium text-zinc-700">
                Search for a garage
              </label>
              <input
                id="garage-search"
                placeholder="Type a garage name or address..."
                className="w-full rounded-xl border border-zinc-300 px-3 py-2.5 text-sm focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                value={form.garageSearch}
                onChange={(event) => setForm((prev) => ({ ...prev, garageSearch: event.target.value }))}
              />
            </div>
            <div className="space-y-2">
              {filteredGarages.map((garage) => {
                const isClaimed = Boolean(garage.claimed_by);
                return (
                  <button
                    key={garage.id}
                    type="button"
                    onClick={() => setForm((prev) => ({ ...prev, garageId: garage.id }))}
                    className={`w-full rounded-xl border px-3 py-3 text-left transition ${
                      form.garageId === garage.id
                        ? "border-indigo-500 bg-indigo-50 ring-1 ring-indigo-500"
                        : "border-zinc-200 hover:bg-zinc-50"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-zinc-900">{garage.name}</p>
                        <p className="text-xs text-zinc-500">{garage.address}</p>
                      </div>
                      <div className="flex shrink-0 flex-col items-end gap-1">
                        {form.garageId === garage.id && (
                          <CheckCircle2 className="h-4 w-4 text-indigo-600" />
                        )}
                        <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                          isClaimed
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-zinc-100 text-zinc-500"
                        }`}>
                          {isClaimed ? "Claimed" : "Unclaimed"}
                        </span>
                      </div>
                    </div>
                  </button>
                );
              })}
              {filteredGarages.length === 0 && (
                <p className="py-3 text-center text-sm text-zinc-400">No garages found. Try a different search.</p>
              )}
            </div>
          </div>
        )}

        {/* Step 4: Upload receipt */}
        {step === 4 && (
          <div className="space-y-4">
            <div>
              <label htmlFor="receipt" className="mb-2 block text-sm font-medium text-zinc-700">
                Upload receipt <span className="font-normal text-zinc-400">(optional)</span>
              </label>
              <label
                htmlFor="receipt"
                className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-zinc-300 bg-zinc-50 px-4 py-8 text-center transition hover:border-indigo-400 hover:bg-indigo-50/30"
              >
                <Upload className={`h-8 w-8 ${form.receiptName ? "text-indigo-600" : "text-zinc-400"}`} />
                {form.receiptName ? (
                  <>
                    <p className="text-sm font-semibold text-zinc-700">{form.receiptName}</p>
                    <p className="text-xs text-zinc-400">Tap to change</p>
                  </>
                ) : (
                  <>
                    <p className="text-sm font-semibold text-zinc-600">Tap to upload receipt</p>
                    <p className="text-xs text-zinc-400">Use your camera or photo gallery</p>
                  </>
                )}
                <input
                  id="receipt"
                  type="file"
                  accept="image/*"
                  className="sr-only"
                  onChange={(event) =>
                    setForm((prev) => ({
                      ...prev,
                      receiptName: event.target.files?.[0]?.name ?? "",
                    }))
                  }
                />
              </label>
            </div>
            <p className="rounded-xl bg-amber-50 px-3 py-2 text-xs text-amber-700">
              Attaching a receipt photo increases the chance of garage verification.
            </p>
          </div>
        )}
      </section>

      {/* Draft summary */}
      <section className="mt-4 rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3">
        <h3 className="mb-1 text-xs font-semibold uppercase tracking-wide text-zinc-500">Summary</h3>
        <div className="flex flex-wrap gap-x-4 gap-y-0.5 text-sm text-zinc-600">
          <span className="font-medium text-zinc-800">
            {selectedVehicle
              ? `${selectedVehicle.year} ${selectedVehicle.make} ${selectedVehicle.model}`
              : "No vehicle selected"}
          </span>
          {form.mileage && <span>{parseInt(form.mileage).toLocaleString()} mi</span>}
          {form.date && <span>{new Date(form.date).toLocaleDateString()}</span>}
          {form.cost && <span>${parseFloat(form.cost).toFixed(2)}</span>}
        </div>
      </section>

      {/* Navigation buttons */}
      <div className="mt-4 grid grid-cols-2 gap-3">
        <Button variant="ghost" onClick={() => setStep((prev) => Math.max(prev - 1, 0))} disabled={step === 0}>
          Back
        </Button>
        {isLastStep ? (
          <Button
            variant="success"
            onClick={() => {
              if (!form.vehicleId || !form.date || !form.mileage) return;
              addServiceRecord({
                vehicle_id: form.vehicleId,
                date: form.date,
                mileage_at_service: Number(form.mileage),
                service_type: form.serviceType === "Custom" ? form.customType || "Custom Service" : form.serviceType,
                description: form.description || "No description provided.",
                garage_id: form.garageId,
                cost: form.cost ? parseFloat(form.cost) : 0,
              });
              router.push(`/vehicle/${form.vehicleId}`);
            }}
          >
            Save Record
          </Button>
        ) : (
          <Button onClick={() => setStep((prev) => Math.min(prev + 1, steps.length - 1))} disabled={!canContinue}>
            Continue
          </Button>
        )}
      </div>
    </>
  );
}

