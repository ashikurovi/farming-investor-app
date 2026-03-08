import React from "react";

export function Card({ className = "", children, ...props }) {
  return (
    <div
      className={`rounded-xl border border-gray-200 bg-white p-4 shadow-sm ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ className = "", children, ...props }) {
  return (
    <div className={`mb-3 flex flex-col gap-1 ${className}`} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({ className = "", children, ...props }) {
  return (
    <h2
      className={`text-base font-semibold tracking-tight text-gray-900 ${className}`}
      {...props}
    >
      {children}
    </h2>
  );
}

export function CardDescription({ className = "", children, ...props }) {
  return (
    <p className={`text-xs text-gray-500 ${className}`} {...props}>
      {children}
    </p>
  );
}

export function CardContent({ className = "", children, ...props }) {
  return (
    <div className={`mt-2 space-y-3 ${className}`} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({ className = "", children, ...props }) {
  return (
    <div
      className={`mt-4 flex items-center justify-end gap-2 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

