export function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
  footer,
  size = "md", // "sm" | "md" | "lg"
}) {
  if (!isOpen) return null;

  const maxWidthClass =
    size === "sm"
      ? "max-w-sm"
      : size === "lg"
        ? "max-w-2xl"
        : "max-w-lg";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
      <div className={`w-full ${maxWidthClass} rounded-3xl bg-white p-6 shadow-xl`}>
        {(title || description) && (
          <div className="mb-4 flex items-start justify-between gap-4">
            <div>
              {title && (
                <h2 className="text-base font-semibold text-zinc-900">
                  {title}
                </h2>
              )}
              {description && (
                <p className="text-xs text-zinc-500">{description}</p>
              )}
            </div>
            {onClose && (
              <button
                type="button"
                onClick={onClose}
                className="text-xs font-medium text-zinc-500 hover:text-zinc-800"
              >
                Close
              </button>
            )}
          </div>
        )}

        <div>{children}</div>

        {footer && <div className="mt-4">{footer}</div>}
      </div>
    </div>
  );
}

