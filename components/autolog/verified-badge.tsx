import { CheckCircle2 } from "lucide-react";

interface VerifiedBadgeProps {
  status: "user_logged" | "garage_verified";
  garageName?: string;
}

export function VerifiedBadge({ status, garageName }: VerifiedBadgeProps) {
  if (status !== "garage_verified") {
    return (
      <span className="inline-flex items-center rounded-full bg-zinc-200 px-3 py-1 text-xs font-semibold text-zinc-700">
        User Logged
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500 px-3 py-1 text-xs font-semibold text-white">
      <CheckCircle2 className="h-3.5 w-3.5" />
      Verified by {garageName ?? "Garage"}
    </span>
  );
}
