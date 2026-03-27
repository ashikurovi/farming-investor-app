import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import { useGetUsersQuery } from "@/features/admin/users/usersApiSlice";
import { useMemo } from "react";

export function AdminDeedFormModal({
  isOpen,
  editingDeed,
  formValues,
  isCreating,
  isUpdating,
  onClose,
  onChange,
  onSubmit,
}) {
  const { data: usersData, isLoading: isUsersLoading } = useGetUsersQuery(
    { limit: 1000 },
    { skip: !isOpen }
  );

  const investors = useMemo(() => {
    const items = usersData?.items ?? [];
    return items.filter((u) => u.role === "investor");
  }, [usersData]);

  if (!isOpen) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={editingDeed ? "Edit deed" : "Add deed"}
      description="Manage deed with title, investor, issue date, and attachments."
      size="md"
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
            form="admin-deed-form"
          >
            {editingDeed
              ? isUpdating
                ? "Saving..."
                : "Save changes"
              : isCreating
                ? "Creating..."
                : "Create deed"}
          </Button>
        </div>
      }
    >
      <form
        id="admin-deed-form"
        onSubmit={onSubmit}
        className="space-y-4"
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <label
              htmlFor="title"
              className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500"
            >
              Title
            </label>
            <Input
              id="title"
              value={formValues.title}
              onChange={(e) => onChange("title", e.target.value)}
              placeholder="Deed title"
              required
              className="h-10 rounded-xl bg-zinc-50 border-zinc-200 focus:bg-white focus:border-emerald-500 focus:ring-emerald-500/20"
            />
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="investorId"
              className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500"
            >
              Investor
            </label>
            <select
              id="investorId"
              value={formValues.investorId}
              onChange={(e) => onChange("investorId", e.target.value)}
              required
              disabled={isUsersLoading}
              className="h-10 w-full rounded-xl bg-zinc-50 border border-zinc-200 px-3 text-sm text-zinc-900 focus:bg-white focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 disabled:opacity-50"
            >
              <option value="" disabled>
                {isUsersLoading ? "Loading investors..." : "Select an investor"}
              </option>
              {investors.map((inv) => (
                <option key={inv.id} value={inv.id}>
                  {inv.name || inv.email} (ID: {inv.id})
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5 sm:col-span-2">
            <label
              htmlFor="issueDate"
              className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500"
            >
              Issue Date
            </label>
            <Input
              id="issueDate"
              type="date"
              value={formValues.issueDate}
              onChange={(e) => onChange("issueDate", e.target.value)}
              className="h-10 rounded-xl bg-zinc-50 border-zinc-200 focus:bg-white focus:border-emerald-500 focus:ring-emerald-500/20"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor="file"
            className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500"
          >
            File
          </label>
          <Input
            id="file"
            type="file"
            onChange={(e) => onChange("file", e.target.files?.[0] ?? null)}
            className="h-10 cursor-pointer rounded-xl border-zinc-200 bg-zinc-50 file:mr-3 file:rounded-lg file:border-0 file:bg-emerald-600 file:px-3 file:py-1.5 file:text-xs file:font-semibold file:uppercase file:tracking-[0.16em] file:text-white hover:file:bg-emerald-500"
          />
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor="uploadPdf"
            className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500"
          >
            Upload PDF
          </label>
          <Input
            id="uploadPdf"
            type="file"
            accept=".pdf"
            onChange={(e) => onChange("uploadPdf", e.target.files?.[0] ?? null)}
            className="h-10 cursor-pointer rounded-xl border-zinc-200 bg-zinc-50 file:mr-3 file:rounded-lg file:border-0 file:bg-emerald-600 file:px-3 file:py-1.5 file:text-xs file:font-semibold file:uppercase file:tracking-[0.16em] file:text-white hover:file:bg-emerald-500"
          />
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor="signature"
            className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500"
          >
            Signature
          </label>
          <Input
            id="signature"
            type="file"
            onChange={(e) => onChange("signature", e.target.files?.[0] ?? null)}
            className="h-10 cursor-pointer rounded-xl border-zinc-200 bg-zinc-50 file:mr-3 file:rounded-lg file:border-0 file:bg-emerald-600 file:px-3 file:py-1.5 file:text-xs file:font-semibold file:uppercase file:tracking-[0.16em] file:text-white hover:file:bg-emerald-500"
          />
        </div>
      </form>
    </Modal>
  );
}
