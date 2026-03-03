import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";

export function ConfirmDialog({
  isOpen,
  title = "Are you sure?",
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  onConfirm,
  onCancel,
  isConfirming = false,
}) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onCancel}
      title={title}
      description={description}
      size="sm"
      footer={
        <div className="flex items-center justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isConfirming}
            className="h-8 rounded-full text-xs"
          >
            {cancelLabel}
          </Button>
          <Button
            type="button"
            onClick={onConfirm}
            disabled={isConfirming}
            className="h-8 rounded-full bg-emerald-600 px-4 text-xs font-semibold uppercase tracking-[0.16em] text-white hover:bg-emerald-500 disabled:opacity-70"
          >
            {isConfirming ? "Working..." : confirmLabel}
          </Button>
        </div>
      }
    />
  );
}

