import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";

export function AdminPeriodFormModal({
  isOpen,
  editingPeriod,
  duration,
  isCreating,
  isUpdating,
  onClose,
  onChange,
  onSubmit,
}) {
  if (!isOpen) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={editingPeriod ? "Edit period" : "Add new period"}
      description="Define the duration label for this project period."
      size="sm"
      footer={
        <div className="flex items-center justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="h-9 rounded-full border-zinc-200 text-xs"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isCreating || isUpdating}
            className="h-9 rounded-full bg-emerald-600 px-5 text-xs font-semibold uppercase tracking-[0.18em] text-white hover:bg-emerald-500 disabled:opacity-70"
            form="admin-period-form"
          >
            {editingPeriod
              ? isUpdating
                ? "Saving..."
                : "Save changes"
              : isCreating
                ? "Creating..."
                : "Create period"}
          </Button>
        </div>
      }
    >
      <form
        id="admin-period-form"
        onSubmit={onSubmit}
        className="space-y-4"
      >
        <div className="space-y-1.5">
          <label
            htmlFor="duration"
            className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500"
          >
            Duration
          </label>
          <Input
            id="duration"
            value={duration}
            onChange={(e) => onChange(e.target.value)}
            placeholder="e.g. 6 months"
            required
            className="h-10 rounded-xl bg-zinc-50 border-zinc-200 focus:bg-white focus:border-emerald-500 focus:ring-emerald-500/20"
          />
        </div>
      </form>
    </Modal>
  );
}

