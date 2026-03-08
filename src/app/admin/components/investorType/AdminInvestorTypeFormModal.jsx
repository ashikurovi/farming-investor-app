import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import { PieChart, Percent, Tag, Info } from "lucide-react";

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
      title={
        <span className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100">
            {editingItem ? (
              <PieChart className="h-4 w-4" />
            ) : (
              <PieChart className="h-4 w-4" />
            )}
          </span>
          <span className="text-lg font-semibold text-zinc-900">
            {editingItem ? "Edit Investor Type" : "Add Investor Type"}
          </span>
        </span>
      }
      description="Configure investor classification and equity distribution."
      size="md"
      footer={
        <div className="flex w-full items-center justify-end gap-3 pt-2">
          <Button
            type="button"
            variant="ghost"
            onClick={onClose}
            className="h-10 rounded-xl px-4 text-sm font-medium text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isCreating || isUpdating}
            className="h-10 min-w-[120px] rounded-xl bg-emerald-600 px-6 text-sm font-semibold text-white shadow-sm transition-all hover:bg-emerald-700 hover:shadow-md disabled:opacity-70"
            form="admin-investor-type-form"
          >
            {editingItem ? (
              isUpdating ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Saving...
                </span>
              ) : (
                "Save Changes"
              )
            ) : isCreating ? (
              <span className="flex items-center gap-2">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Creating...
              </span>
            ) : (
              "Create Type"
            )}
          </Button>
        </div>
      }
    >
      <form
        id="admin-investor-type-form"
        onSubmit={onSubmit}
        className="space-y-6 py-2"
      >
        <div className="space-y-2">
          <label
            htmlFor="type"
            className="text-sm font-medium text-zinc-700"
          >
            Type Name
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Tag className="h-4 w-4 text-zinc-400" />
            </div>
            <Input
              id="type"
              value={formValues.type}
              onChange={(e) => onChange("type", e.target.value)}
              placeholder="e.g. Institutional Investor"
              required
              className="h-11 w-full rounded-xl border-zinc-200 bg-zinc-50 pl-10 text-sm transition-all focus:border-emerald-500 focus:bg-white focus:ring-emerald-500/20"
            />
          </div>
          <p className="flex items-center gap-1.5 text-xs text-zinc-500">
            <Info className="h-3 w-3" />
            This name will be displayed in investor profiles.
          </p>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="percentage"
            className="text-sm font-medium text-zinc-700"
          >
            Equity Share (%)
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Percent className="h-4 w-4 text-zinc-400" />
            </div>
            <Input
              id="percentage"
              type="number"
              min="0"
              max="100"
              step="0.01"
              value={formValues.percentage}
              onChange={(e) => onChange("percentage", e.target.value)}
              placeholder="e.g. 15.5"
              required
              className="h-11 w-full rounded-xl border-zinc-200 bg-zinc-50 pl-10 text-sm transition-all focus:border-emerald-500 focus:bg-white focus:ring-emerald-500/20"
            />
          </div>
          <div className="rounded-lg bg-emerald-50/50 p-3">
            <p className="flex items-start gap-2 text-xs text-emerald-700">
              <Info className="mt-0.5 h-3 w-3 shrink-0" />
              <span>
                Enter a value between 0 and 100. This percentage represents the
                investor's share in the project distribution.
              </span>
            </p>
          </div>
        </div>
      </form>
    </Modal>
  );
}

