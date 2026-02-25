import React from "react";

export const Checkbox = React.forwardRef(function Checkbox(
  { className = "", label, ...props },
  ref
) {
  return (
    <label className="inline-flex items-center gap-2 text-sm text-gray-900">
      <input
        ref={ref}
        type="checkbox"
        className={`h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 ${className}`}
        {...props}
      />
      {label && <span>{label}</span>}
    </label>
  );
});

