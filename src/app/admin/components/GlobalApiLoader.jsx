"use client";

import { useSelector } from "react-redux";
import { Loader2 } from "lucide-react";

export default function GlobalApiLoader() {
  const isQueryLoading = useSelector((state) =>
    Object.values(state.api.queries || {}).some(
      (query) => query.status === "pending",
    ),
  );

  const isMutationLoading = useSelector((state) =>
    Object.values(state.api.mutations || {}).some(
      (mutation) => mutation.status === "pending",
    ),
  );

  const isLoading = isQueryLoading || isMutationLoading;

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/20 backdrop-blur-sm transition-all duration-300">
      <div className="relative">
        <div className="h-12 w-12 rounded-full border-4 "></div>
        <Loader2 className="absolute top-0 left-0 h-12 w-12 animate-spin text-emerald-600" />
      </div>
    </div>
  );
}
