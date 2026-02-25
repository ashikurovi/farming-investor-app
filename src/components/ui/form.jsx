import React from "react";

export function Form({ children, className = "", ...props }) {
  return (
    <form
      className={`space-y-4 ${className}`}
      noValidate
      {...props}
    >
      {children}
    </form>
  );
}

export function FormField({
  label,
  description,
  error,
  required,
  children,
  className = "",
}) {
  return (
    <div className={`space-y-1 text-sm ${className}`}>
      {label && (
        <label className="block text-xs font-medium uppercase tracking-wide text-gray-700">
          {label}
          {required && <span className="text-red-500"> *</span>}
        </label>
      )}
      {children}
      {description && !error && (
        <p className="text-xs text-gray-500">{description}</p>
      )}
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}

