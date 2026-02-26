import React from "react";

const baseClasses =
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary " +
  "disabled:pointer-events-none disabled:opacity-50";

const variantClasses = {
  primary: "bg-primary text-primary-foreground hover:opacity-90",
  secondary:
    "bg-secondary text-secondary-foreground hover:bg-secondary/80 hover:text-secondary-foreground",
  outline:
    "border border-secondary bg-background text-foreground hover:bg-secondary/60 shadow-sm",
  ghost: "bg-transparent hover:bg-secondary/60 text-foreground",
  destructive: "bg-red-600 text-white hover:bg-red-700",
};

const sizeClasses = {
  sm: "h-8 px-3 text-xs",
  md: "h-9 px-4",
  lg: "h-10 px-6 text-base",
  icon: "h-9 w-9",
};

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  asChild = false,
  ...props
}) {
  const Component = asChild ? "span" : "button";
  const variantClass = variantClasses[variant] ?? variantClasses.primary;
  const sizeClass = sizeClasses[size] ?? sizeClasses.md;

  return (
    <Component
      className={`${baseClasses} ${variantClass} ${sizeClass} ${className}`}
      {...props}
    />
  );
}

