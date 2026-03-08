import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function formatNumber(n, options = {}) {
  const num = Number(n ?? 0);
  const merged = { maximumFractionDigits: 0, ...options };
  if (
    typeof merged.minimumFractionDigits === "number" &&
    (merged.maximumFractionDigits == null ||
      merged.maximumFractionDigits < merged.minimumFractionDigits)
  ) {
    merged.maximumFractionDigits = merged.minimumFractionDigits;
  }
  return num.toLocaleString("en-US", merged);
}

export function formatCurrencyBDT(n, options = {}) {
  const num = Number(n ?? 0);
  const merged = { maximumFractionDigits: 0, ...options };
  if (
    typeof merged.minimumFractionDigits === "number" &&
    (merged.maximumFractionDigits == null ||
      merged.maximumFractionDigits < merged.minimumFractionDigits)
  ) {
    merged.maximumFractionDigits = merged.minimumFractionDigits;
  }
  return `৳${num.toLocaleString("en-US", merged)}`;
}

export function formatDateUTC(value, options = {}) {
  if (!value) return "-";
  const d = new Date(value);
  return d.toLocaleDateString("en-US", { timeZone: "UTC", ...options });
}

export function formatDateTimeUTC(value, options = {}) {
  if (!value) return "-";
  const d = new Date(value);
  return d.toLocaleString("en-US", { timeZone: "UTC", ...options });
}
