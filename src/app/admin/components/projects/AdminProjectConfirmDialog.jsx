import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";

export function AdminProjectConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  isConfirming,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
}) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size="sm"
      footer={
        <div className="flex items-center justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="h-8 rounded-full border-zinc-200 text-xs"
          >
            {cancelLabel}
          </Button>
          <Button
            type="button"
            onClick={onConfirm}
            disabled={isConfirming}
            className="h-8 rounded-full bg-red-600 px-5 text-xs font-semibold uppercase tracking-[0.18em] text-white hover:bg-red-500 disabled:opacity-70"
          >
            {isConfirming ? "Processing..." : confirmLabel}
          </Button>
        </div>
      }
    >
      <div className="py-2">
        <p className="text-sm text-zinc-600">{description}</p>
      </div>
    </Modal>
  );
}
