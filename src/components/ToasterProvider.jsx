"use client";

import { Toaster } from "sonner";

export function ToasterProvider() {
  return (
    <Toaster
      richColors
      position="top-right"
      closeButton
      toastOptions={{
        style: {
          fontSize: "0.875rem",
        },
      }}
    />
  );
}

