"use client";

import React, { createContext, useCallback, useContext, useMemo, useState } from "react";

const ToastContext = createContext(null);

let idCounter = 0;

export function ToastProvider({ children, position = "bottom-right" }) {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const addToast = useCallback(
    ({ title, description, variant = "default", duration = 3000 }) => {
      const id = ++idCounter;
      const toast = { id, title, description, variant };
      setToasts((current) => [...current, toast]);

      if (duration !== null) {
        setTimeout(() => removeToast(id), duration);
      }
    },
    [removeToast]
  );

  const value = useMemo(
    () => ({
      addToast,
      removeToast,
    }),
    [addToast, removeToast]
  );

  const positionClass =
    position === "top-right"
      ? "top-4 right-4"
      : position === "top-left"
      ? "top-4 left-4"
      : position === "bottom-left"
      ? "bottom-4 left-4"
      : "bottom-4 right-4";

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div
        className={`pointer-events-none fixed z-50 flex flex-col gap-2 ${positionClass}`}
      >
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto w-80 max-w-full rounded-md border px-4 py-3 shadow-lg ${
              toast.variant === "success"
                ? "border-green-200 bg-green-50 text-green-900"
                : toast.variant === "error"
                ? "border-red-200 bg-red-50 text-red-900"
                : toast.variant === "warning"
                ? "border-yellow-200 bg-yellow-50 text-yellow-900"
                : "border-gray-200 bg-white text-gray-900"
            }`}
          >
            {toast.title && (
              <div className="mb-1 text-sm font-semibold">{toast.title}</div>
            )}
            {toast.description && (
              <div className="text-xs text-gray-700">{toast.description}</div>
            )}
            <button
              type="button"
              className="mt-2 text-xs font-medium text-primary underline underline-offset-2"
              onClick={() => removeToast(toast.id)}
            >
              Close
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error("useToast must be used inside <ToastProvider />");
  }
  return ctx;
}

