import React from "react";

const badgeVariants = {
  default: "bg-emerald-600 text-white hover:bg-emerald-500",
  secondary: "bg-zinc-100 text-zinc-900 hover:bg-zinc-200",
  outline: "text-zinc-900 border border-zinc-200 hover:bg-zinc-100",
  destructive: "bg-red-500 text-white hover:bg-red-600",
};

export function Badge({
  className = "",
  variant = "default",
  ...props
}) {
  const variantClass = badgeVariants[variant] || badgeVariants.default;

  return (
    <div
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:ring-offset-2 ${variantClass} ${className}`}
      {...props}
    />
  );
}
