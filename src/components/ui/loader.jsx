import React from "react";

const sizeMap = {
  sm: "h-4 w-4",
  md: "h-6 w-6",
  lg: "h-8 w-8",
};

export function Loader({ size = "md", className = "" }) {
  const sizeClass = sizeMap[size] ?? sizeMap.md;
  return (
    <div className="inline-flex items-center justify-center">
      <span
        className={`animate-spin rounded-full border-2 border-blue-600 border-t-transparent ${sizeClass} ${className}`}
      />
    </div>
  );
}

