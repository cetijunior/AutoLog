import { currentUser } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";

export default function SettingsPage() {
  return (
    <main className="p-5 md:p-8">
      <h1 className="text-2xl font-bold">Settings</h1>

      <section className="mt-5 rounded-2xl border border-zinc-200 p-4">
        <h2 className="font-semibold">Profile</h2>
        <p className="mt-2 text-sm text-zinc-600">{currentUser.name}</p>
        <p className="text-sm text-zinc-600">{currentUser.email}</p>
        <p className="text-sm text-zinc-600">{currentUser.phone}</p>
      </section>

      <section className="mt-4 rounded-2xl border border-zinc-200 p-4">
        <h2 className="font-semibold">Notifications</h2>
        <p className="mt-2 text-sm text-zinc-600">Maintenance reminders</p>
        <p className="text-sm text-zinc-600">Garage verification updates</p>
      </section>

      <div className="mt-6">
        <Button fullWidth variant="secondary">
          Save Preferences
        </Button>
      </div>
    </main>
  );
}
