import { Loader2 } from "lucide-react";

export default function AdminLoading() {
  return (
    <div className="flex h-full w-full flex-1 items-center justify-center bg-zinc-50/50 backdrop-blur-sm">
      <Loader2 className="h-10 w-10 animate-spin text-emerald-600" />
    </div>
  );
}
