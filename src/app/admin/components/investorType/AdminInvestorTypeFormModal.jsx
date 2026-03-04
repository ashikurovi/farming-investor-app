import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";

export function AdminInvestorTypeFormModal({
  isOpen,
  editingItem,
  formValues,
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
      title={editingItem ? "Edit investor type" : "Add investor type"}
      description="Configure investor types and their percentage values."
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
            form="admin-investor-type-form"
          >
            {editingItem
              ? isUpdating
                ? "Saving..."
                : "Save changes"
              : isCreating
                ? "Creating..."
                : "Create type"}
          </Button>
        </div>
      }
    >
      <form
        id="admin-investor-type-form"
        onSubmit={onSubmit}
        className="space-y-4"
      >
        <div className="space-y-1.5">
          <label
            htmlFor="type"
            className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500"
          >
            Type name
          </label>
          <Input
            id="type"
            value={formValues.type}
            onChange={(e) => onChange("type", e.target.value)}
            placeholder="e.g. Individual, Institutional"
            required
            className="h-10 rounded-xl bg-zinc-50 border-zinc-200 focus:bg-white focus:border-emerald-500 focus:ring-emerald-500/20"
          />
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor="percentage"
            className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500"
          >
            Percentage (%)
          </label>
          <Input
            id="percentage"
            type="number"
            min="0"
            max="100"
            step="0.01"
            value={formValues.percentage}
            onChange={(e) => onChange("percentage", e.target.value)}
            placeholder="e.g. 10"
            required
            className="h-10 rounded-xl bg-zinc-50 border-zinc-200 focus:bg-white focus:border-emerald-500 focus:ring-emerald-500/20"
          />
          <p className="text-[11px] text-zinc-400">
            Enter a value between 0 and 100.
          </p>
        </div>
      </form>
    </Modal>
  );
}

