 "use client";

import { useEffect, useState } from "react";
import { Bell, Mail, Save, User, Wrench } from "lucide-react";
import { currentUser } from "@/lib/mock-data";
import { useAutoLog } from "@/components/providers/autolog-provider";

function Toggle({
  checked,
  onChange,
  id,
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
  id: string;
}) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      id={id}
      type="button"
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 ${
        checked ? "bg-indigo-600" : "bg-zinc-300"
      }`}
    >
      <span
        className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-lg ring-0 transition-transform ${
          checked ? "translate-x-5" : "translate-x-0"
        }`}
      />
    </button>
  );
}

export default function SettingsPage() {
  const { notificationSettings, updateNotificationSettings } = useAutoLog();
  const [maintenanceAlerts, setMaintenanceAlerts] = useState(notificationSettings.maintenanceAlerts);
  const [verificationAlerts, setVerificationAlerts] = useState(notificationSettings.verificationAlerts);
  const [weeklySummary, setWeeklySummary] = useState(notificationSettings.weeklySummary);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setMaintenanceAlerts(notificationSettings.maintenanceAlerts);
    setVerificationAlerts(notificationSettings.verificationAlerts);
    setWeeklySummary(notificationSettings.weeklySummary);
  }, [notificationSettings]);

  const handleSave = () => {
    updateNotificationSettings({ maintenanceAlerts, verificationAlerts, weeklySummary });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const notifications = [
    {
      id: "maintenance",
      icon: Wrench,
      label: "Maintenance reminders",
      description: "Get notified when your vehicle is due for service",
      checked: maintenanceAlerts,
      onChange: setMaintenanceAlerts,
    },
    {
      id: "verification",
      icon: Bell,
      label: "Garage verification updates",
      description: "Alerts when a garage verifies or rejects your records",
      checked: verificationAlerts,
      onChange: setVerificationAlerts,
    },
    {
      id: "weekly",
      icon: Mail,
      label: "Weekly maintenance digest",
      description: "A summary of your fleet's health every Monday",
      checked: weeklySummary,
      onChange: setWeeklySummary,
    },
  ];

  return (
    <main className="p-5 md:p-8">
      <header className="mb-6">
        <p className="text-xs font-medium uppercase tracking-wide text-zinc-400">Account</p>
        <h1 className="mt-0.5 text-2xl font-bold">Settings</h1>
        <p className="mt-1 text-sm text-zinc-500">Manage your profile and notification preferences.</p>
      </header>

      {/* Profile */}
      <section className="mb-4 overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
        <div className="bg-gradient-to-r from-indigo-600 to-indigo-500 px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur">
              <User className="h-6 w-6" />
            </div>
            <div>
              <p className="font-semibold text-white">{currentUser.name}</p>
              <p className="text-xs text-indigo-200 capitalize">{currentUser.role} account</p>
            </div>
          </div>
        </div>
        <div className="divide-y divide-zinc-100 px-5">
          <div className="flex items-center justify-between py-3">
            <span className="text-xs font-medium text-zinc-500">Email</span>
            <span className="text-sm text-zinc-900">{currentUser.email}</span>
          </div>
          <div className="flex items-center justify-between py-3">
            <span className="text-xs font-medium text-zinc-500">Phone</span>
            <span className="text-sm text-zinc-900">{currentUser.phone}</span>
          </div>
          <div className="flex items-center justify-between py-3">
            <span className="text-xs font-medium text-zinc-500">Member since</span>
            <span className="text-sm text-zinc-900">
              {new Date(currentUser.created_at).toLocaleDateString("en-US", { month: "long", year: "numeric" })}
            </span>
          </div>
        </div>
      </section>

      {/* Notifications */}
      <section className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
        <div className="border-b border-zinc-100 px-5 py-4">
          <div className="flex items-center gap-2">
            <Bell className="h-4 w-4 text-indigo-600" />
            <h2 className="font-semibold">Notifications</h2>
          </div>
          <p className="mt-0.5 text-xs text-zinc-500">Choose how AutoLog keeps you informed.</p>
        </div>
        <div className="divide-y divide-zinc-100">
          {notifications.map(({ id, icon: Icon, label, description, checked, onChange }) => (
            <label
              key={id}
              htmlFor={id}
              className="flex cursor-pointer items-start justify-between gap-4 px-5 py-4 transition hover:bg-zinc-50"
            >
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-zinc-100">
                  <Icon className="h-4 w-4 text-zinc-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-zinc-900">{label}</p>
                  <p className="mt-0.5 text-xs text-zinc-500">{description}</p>
                </div>
              </div>
              <div className="mt-1 shrink-0">
                <Toggle id={id} checked={checked} onChange={onChange} />
              </div>
            </label>
          ))}
        </div>
      </section>

      <div className="mt-6">
        <button
          type="button"
          onClick={handleSave}
          className={`inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl px-4 text-sm font-semibold text-white shadow-sm transition active:scale-95 ${
            saved
              ? "bg-emerald-600 shadow-emerald-300/50 hover:bg-emerald-500"
              : "bg-zinc-900 shadow-zinc-300/50 hover:bg-zinc-800"
          }`}
        >
          <Save className="h-4 w-4" />
          {saved ? "Preferences saved!" : "Save Preferences"}
        </button>
      </div>
    </main>
  );
}
