import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";

export function AdminDailyReportFormModal({
  isOpen,
  values,
  isSubmitting,
  onClose,
  onChange,
  onSubmit,
}) {
  if (!isOpen) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Add daily report"
      size="md"
      footer={
        <div className="flex items-center justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="h-8 rounded-full border-zinc-200 text-xs"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="h-8 rounded-full bg-emerald-600 px-5 text-xs font-semibold uppercase tracking-[0.18em] text-white hover:bg-emerald-500 disabled:opacity-70"
            form="admin-daily-report-form"
          >
            {isSubmitting ? "Posting..." : "Post report"}
          </Button>
        </div>
      }
    >
      <div className="mb-6">
        <p className="text-sm text-zinc-500">
          Post a new daily report update for this project.
        </p>
      </div>
      <form id="admin-daily-report-form" onSubmit={onSubmit} className="space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <label
              htmlFor="dailyCost"
              className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500"
            >
              Daily cost (BDT)
            </label>
            <Input
              id="dailyCost"
              type="number"
              step="0.01"
              value={values.dailyCost}
              onChange={(e) => onChange("dailyCost", e.target.value)}
              placeholder="0.00"
              className="h-10 rounded-xl bg-zinc-50 border-zinc-200 focus:bg-white focus:border-emerald-500 focus:ring-emerald-500/20"
            />
          </div>
          <div className="space-y-1.5">
            <label
              htmlFor="dailySell"
              className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500"
            >
              Daily sell (BDT)
            </label>
            <Input
              id="dailySell"
              type="number"
              step="0.01"
              value={values.dailySell}
              onChange={(e) => onChange("dailySell", e.target.value)}
              placeholder="0.00"
              className="h-10 rounded-xl bg-zinc-50 border-zinc-200 focus:bg-white focus:border-emerald-500 focus:ring-emerald-500/20"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor="reason"
            className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500"
          >
            Reason
          </label>
          <textarea
            id="reason"
            value={values.reason}
            onChange={(e) => onChange("reason", e.target.value)}
            placeholder="Add details for this update..."
            className="min-h-28 w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm text-zinc-700 transition-all focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
          />
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor="photoFile"
            className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500"
          >
            Photo file
          </label>
          <Input
            id="photoFile"
            type="file"
            accept="image/*"
            onChange={(e) => onChange("photoFile", e.target.files?.[0] ?? null)}
            className="h-10 rounded-xl bg-zinc-50 border-zinc-200 file:mr-4 file:rounded-full file:border-0 file:bg-emerald-50 file:px-3 file:py-1 file:text-xs file:font-semibold file:text-emerald-700 hover:file:bg-emerald-100"
          />
          <p className="text-[11px] text-zinc-400">Upload a photo to attach to this report.</p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <label
              htmlFor="date"
              className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500"
            >
              Date
            </label>
            <Input
              id="date"
              type="date"
              value={values.date}
              onChange={(e) => onChange("date", e.target.value)}
              className="h-10 rounded-xl bg-zinc-50 border-zinc-200 focus:bg-white focus:border-emerald-500 focus:ring-emerald-500/20"
              required
            />
          </div>
          <div className="space-y-1.5">
            <label
              htmlFor="time"
              className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500"
            >
              Time
            </label>
            <Input
              id="time"
              type="time"
              step="1"
              value={values.time}
              onChange={(e) => onChange("time", e.target.value)}
              className="h-10 rounded-xl bg-zinc-50 border-zinc-200 focus:bg-white focus:border-emerald-500 focus:ring-emerald-500/20"
              required
            />
          </div>
        </div>
      </form>
    </Modal>
  );
}
