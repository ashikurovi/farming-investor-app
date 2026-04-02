import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { AlertTriangle, CheckCircle, Info } from "lucide-react";

export function ConfirmDialog({
  isOpen,
  title = "Are you sure?",
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  onConfirm,
  onCancel,
  isConfirming = false,
  variant = "danger", // "danger" | "warning" | "info" | "success"
}) {
  const variants = {
    danger: {
      icon: AlertTriangle,
      iconBg: "bg-red-100",
      iconColor: "text-red-600",
      buttonBg: "bg-red-600 hover:bg-red-500 focus-visible:outline-red-600",
    },
    warning: {
      icon: AlertTriangle,
      iconBg: "bg-amber-100",
      iconColor: "text-amber-600",
      buttonBg:
        "bg-amber-600 hover:bg-amber-500 focus-visible:outline-amber-600",
    },
    success: {
      icon: CheckCircle,
      iconBg: "bg-emerald-100",
      iconColor: "text-emerald-600",
      buttonBg:
        "bg-emerald-600 hover:bg-emerald-500 focus-visible:outline-emerald-600",
    },
    info: {
      icon: Info,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      buttonBg: "bg-blue-600 hover:bg-blue-500 focus-visible:outline-blue-600",
    },
  };

  const currentVariant = variants[variant] || variants.danger;
  const Icon = currentVariant.icon;

  return (
    <Modal isOpen={isOpen} onClose={onCancel} size="sm">
      <div className="flex flex-col items-center text-center p-4 sm:p-6">
        <div
          className={`mx-auto flex h-14 w-14 items-center justify-center rounded-full ${currentVariant.iconBg} mb-5 ring-4 ring-white shadow-sm dark:ring-zinc-900`}
        >
          <Icon className={`h-7 w-7 ${currentVariant.iconColor}`} />
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-2 tracking-tight dark:text-zinc-100">
          {title}
        </h3>

        {description && (
          <p className="text-sm text-gray-500 mb-8 max-w-[280px] leading-relaxed dark:text-zinc-400">
            {description}
          </p>
        )}

        <div className="flex flex-col-reverse sm:flex-row items-center justify-center gap-3 w-full">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isConfirming}
            className="w-full sm:flex-1 h-11 rounded-xl border-gray-200 text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:text-gray-900 hover:border-gray-300 transition-all dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
          >
            {cancelLabel}
          </Button>
          <Button
            type="button"
            onClick={onConfirm}
            disabled={isConfirming}
            className={`w-full sm:flex-1 h-11 rounded-xl px-4 text-sm font-semibold text-white shadow-sm disabled:opacity-70 transition-all ${currentVariant.buttonBg}`}
          >
            {isConfirming ? (
              <span className="flex items-center gap-2">
                <svg
                  className="animate-spin -ml-1 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Processing...
              </span>
            ) : (
              confirmLabel
            )}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
