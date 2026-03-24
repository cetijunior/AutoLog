 "use client";

import { useEffect, useState } from "react";
import { currentUser } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { useAutoLog } from "@/components/providers/autolog-provider";

export default function SettingsPage() {
  const { notificationSettings, updateNotificationSettings } = useAutoLog();
  const [maintenanceAlerts, setMaintenanceAlerts] = useState(notificationSettings.maintenanceAlerts);
  const [verificationAlerts, setVerificationAlerts] = useState(notificationSettings.verificationAlerts);
  const [weeklySummary, setWeeklySummary] = useState(notificationSettings.weeklySummary);

  useEffect(() => {
    setMaintenanceAlerts(notificationSettings.maintenanceAlerts);
    setVerificationAlerts(notificationSettings.verificationAlerts);
    setWeeklySummary(notificationSettings.weeklySummary);
  }, [notificationSettings]);

  return (
    <main className="p-5 md:p-8">
      <h1 className="text-2xl font-bold">Settings</h1>
      <p className="mt-1 text-sm text-zinc-600">Manage profile and reminder preferences.</p>

      <section className="mt-5 rounded-2xl border border-zinc-200 p-4">
        <h2 className="font-semibold">Profile</h2>
        <p className="mt-2 text-sm text-zinc-600">{currentUser.name}</p>
        <p className="text-sm text-zinc-600">{currentUser.email}</p>
        <p className="text-sm text-zinc-600">{currentUser.phone}</p>
      </section>

      <section className="mt-4 rounded-2xl border border-zinc-200 p-4">
        <h2 className="font-semibold">Notifications</h2>
        <div className="mt-3 space-y-3">
          <label className="flex items-center justify-between rounded-xl border border-zinc-200 px-3 py-2">
            <span className="text-sm text-zinc-700">Maintenance reminders</span>
            <input
              type="checkbox"
              checked={maintenanceAlerts}
              onChange={(event) => setMaintenanceAlerts(event.target.checked)}
            />
          </label>
          <label className="flex items-center justify-between rounded-xl border border-zinc-200 px-3 py-2">
            <span className="text-sm text-zinc-700">Garage verification updates</span>
            <input
              type="checkbox"
              checked={verificationAlerts}
              onChange={(event) => setVerificationAlerts(event.target.checked)}
            />
          </label>
          <label className="flex items-center justify-between rounded-xl border border-zinc-200 px-3 py-2">
            <span className="text-sm text-zinc-700">Weekly maintenance digest</span>
            <input
              type="checkbox"
              checked={weeklySummary}
              onChange={(event) => setWeeklySummary(event.target.checked)}
            />
          </label>
        </div>
      </section>

      <div className="mt-6">
        <Button
          fullWidth
          variant="secondary"
          onClick={() =>
            updateNotificationSettings({
              maintenanceAlerts,
              verificationAlerts,
              weeklySummary,
            })
          }
        >
          Save Preferences
        </Button>
      </div>
    </main>
  );
}
