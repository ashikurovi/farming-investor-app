"use client";

import { useEffect, useState } from "react";
import { Toaster } from "sonner";

export function ToasterProvider() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 640px)");
    const update = () => setIsMobile(media.matches);
    update();
    if (media.addEventListener) {
      media.addEventListener("change", update);
      return () => media.removeEventListener("change", update);
    }
    media.addListener(update);
    return () => media.removeListener(update);
  }, []);

  return (
    <Toaster
      richColors
      position={isMobile ? "top-center" : "top-right"}
      theme="system"
      offset={16}
      closeButton
      toastOptions={{
        duration: 3200,
        style: {
          fontSize: "0.875rem",
          borderRadius: "16px",
        },
        classNames: {
          toast:
            "group relative overflow-hidden border border-zinc-200 bg-white text-zinc-900 shadow-[0_18px_55px_-40px_rgba(0,0,0,0.35)] ring-1 ring-black/5 before:absolute before:inset-y-0 before:left-0 before:w-1.5 before:bg-[linear-gradient(180deg,var(--brand-from,#4d8c1e),var(--brand-to,#7cc22e))] dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100 dark:ring-white/10",
          title: "text-sm font-bold tracking-tight",
          description:
            "text-[13px] leading-relaxed text-zinc-500 dark:text-zinc-400",
          actionButton:
            "rounded-xl bg-[linear-gradient(135deg,var(--brand-from,#4d8c1e),var(--brand-to,#7cc22e))] px-3 py-2 text-xs font-semibold text-white shadow-sm hover:opacity-95",
          cancelButton:
            "rounded-xl bg-zinc-100 px-3 py-2 text-xs font-semibold text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800",
          closeButton:
            "rounded-xl border border-zinc-200 bg-white/70 text-zinc-600 shadow-sm backdrop-blur hover:bg-white dark:border-zinc-800 dark:bg-zinc-950/60 dark:text-zinc-300 dark:hover:bg-zinc-950",
        },
      }}
    />
  );
}
