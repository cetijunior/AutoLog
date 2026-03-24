"use client";

import { useMemo, useState } from "react";
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

  return (
    <>
      <div className="mb-4 rounded-2xl border border-zinc-200 p-4">
        <div className="mb-3 flex items-center justify-between">
          <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
            Step {step + 1} of {steps.length}
          </p>
          <p className="text-xs text-zinc-500">{Math.round(((step + 1) / steps.length) * 100)}%</p>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-zinc-200">
          <div
            className="h-full bg-indigo-600 transition-all"
            style={{ width: `${((step + 1) / steps.length) * 100}%` }}
          />
        </div>
        <h2 className="mt-3 text-lg font-semibold">{currentStep}</h2>
      </div>

      <section className="rounded-2xl border border-zinc-200 p-4">
        {step === 0 && (
          <div className="space-y-3">
            <label className="text-sm font-medium text-zinc-700" htmlFor="vehicle">
              Vehicle
            </label>
            <select
              id="vehicle"
              className="w-full rounded-xl border border-zinc-300 px-3 py-2 text-sm"
              value={form.vehicleId}
              onChange={(event) => setForm((prev) => ({ ...prev, vehicleId: event.target.value }))}
            >
              {vehicles.map((vehicle) => (
                <option value={vehicle.id} key={vehicle.id}>
                  {vehicle.year} {vehicle.make} {vehicle.model} ({vehicle.license_plate})
                </option>
              ))}
            </select>
          </div>
        )}

        {step === 1 && (
          <div className="grid gap-3">
            <div>
              <label className="mb-1 block text-sm font-medium text-zinc-700" htmlFor="mileage">
                Mileage at service
              </label>
              <input
                id="mileage"
                type="number"
                placeholder="e.g. 64500"
                className="w-full rounded-xl border border-zinc-300 px-3 py-2 text-sm focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
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
                className="w-full rounded-xl border border-zinc-300 px-3 py-2 text-sm focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                value={form.date}
                onChange={(event) => setForm((prev) => ({ ...prev, date: event.target.value }))}
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-zinc-700" htmlFor="cost">
                Cost (optional)
              </label>
              <div className="relative">
                <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-sm text-zinc-500">
                  $
                </span>
                <input
                  id="cost"
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  className="w-full rounded-xl border border-zinc-300 py-2 pl-7 pr-3 text-sm focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                  value={form.cost}
                  onChange={(event) => setForm((prev) => ({ ...prev, cost: event.target.value }))}
                />
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-3">
            <label className="block text-sm font-medium text-zinc-700">Service type</label>
            <div className="flex flex-wrap gap-2">
              {serviceTypes.map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setForm((prev) => ({ ...prev, serviceType: type }))}
                  className={`min-h-11 rounded-full px-4 text-sm font-medium ${
                    form.serviceType === type
                      ? "bg-indigo-600 text-white"
                      : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
            {form.serviceType === "Custom" && (
              <input
                placeholder="Custom service type"
                className="w-full rounded-xl border border-zinc-300 px-3 py-2 text-sm"
                value={form.customType}
                onChange={(event) => setForm((prev) => ({ ...prev, customType: event.target.value }))}
              />
            )}
            <textarea
              rows={4}
              placeholder="Describe what was done..."
              className="w-full rounded-xl border border-zinc-300 px-3 py-2 text-sm"
              value={form.description}
              onChange={(event) => setForm((prev) => ({ ...prev, description: event.target.value }))}
            />
          </div>
        )}

        {step === 3 && (
          <div className="space-y-2">
            <label htmlFor="garage-search" className="text-sm font-medium text-zinc-700">
              @ Garage search
            </label>
            <input
              id="garage-search"
              placeholder="@ Summit Auto Care"
              className="w-full rounded-xl border border-zinc-300 px-3 py-2 text-sm"
              value={form.garageSearch}
              onChange={(event) => setForm((prev) => ({ ...prev, garageSearch: event.target.value }))}
            />
            {garages
              .filter((garage) =>
                `${garage.name} ${garage.address}`
                  .toLowerCase()
                  .includes(form.garageSearch.replace("@", "").toLowerCase()),
              )
              .map((garage) => (
              <button
                key={garage.id}
                type="button"
                onClick={() => setForm((prev) => ({ ...prev, garageId: garage.id }))}
                className={`w-full rounded-xl border px-3 py-3 text-left ${
                  form.garageId === garage.id
                    ? "border-indigo-500 bg-indigo-50"
                    : "border-zinc-200 hover:bg-zinc-50"
                }`}
              >
                <p className="text-sm font-semibold text-zinc-900">{garage.name}</p>
                <p className="text-xs text-zinc-500">{garage.address}</p>
              </button>
              ))}
          </div>
        )}

        {step === 4 && (
          <div className="space-y-3">
            <label htmlFor="receipt" className="block text-sm font-medium text-zinc-700">
              Upload receipt
            </label>
            <input
              id="receipt"
              type="file"
              accept="image/*"
              className="w-full rounded-xl border border-zinc-300 px-3 py-2 text-sm file:mr-3 file:rounded-lg file:border-0 file:bg-indigo-100 file:px-3 file:py-2 file:text-indigo-700"
              onChange={(event) =>
                setForm((prev) => ({
                  ...prev,
                  receiptName: event.target.files?.[0]?.name ?? "",
                }))
              }
            />
            {form.receiptName ? (
              <p className="text-sm text-zinc-600">Selected: {form.receiptName}</p>
            ) : (
              <p className="text-sm text-zinc-500">Use your camera or gallery to attach receipt proof.</p>
            )}
          </div>
        )}
      </section>

      <section className="mt-4 rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
        <h3 className="text-sm font-semibold">Draft preview</h3>
        <p className="mt-1 text-sm text-zinc-600">
          {selectedVehicle
            ? `${selectedVehicle.year} ${selectedVehicle.make} ${selectedVehicle.model}`
            : "No vehicle selected"}
        </p>
        <p className="text-sm text-zinc-600">Mileage: {form.mileage || "Not set"}</p>
        <p className="text-sm text-zinc-600">Date: {form.date || "Not set"}</p>
        {form.cost && <p className="text-sm text-zinc-600">Cost: ${parseFloat(form.cost).toFixed(2)}</p>}
      </section>

      <div className="mt-6 grid grid-cols-2 gap-3">
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
            Save Service Record
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
