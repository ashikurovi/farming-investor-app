import { X } from "lucide-react";

export function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
  footer,
  size = "md", // "sm" | "md" | "lg" | "xl"
}) {
  if (!isOpen) return null;

  const maxWidthClass = {
    sm: "max-w-sm",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl"
  }[size] || "max-w-lg";

  return (
    <div className="fixed inset-0 z-[99] flex items-center justify-center p-4 sm:p-6">
      <div 
        className="fixed inset-0 bg-gray-950/40 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
        aria-hidden="true"
      />
      
      <div className={`relative w-full ${maxWidthClass} transform overflow-hidden rounded-2xl bg-white shadow-2xl transition-all ring-1 ring-gray-950/5 flex flex-col max-h-[90vh]`}>
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4 bg-gray-50/50">
          <div className="space-y-1">
            {title && (
              <h2 className="text-lg font-semibold leading-6 text-gray-900">
                {title}
              </h2>
            )}
            {description && (
              <p className="text-sm text-gray-500">{description}</p>
            )}
          </div>
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {children}
        </div>

        {footer && (
          <div className="border-t border-gray-100 bg-gray-50/50 px-6 py-4 flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-3 gap-2 sm:gap-0">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}

