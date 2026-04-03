import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

export function AdminNoticeFormModal({
  isOpen,
  editingNotice,
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
      title={editingNotice ? "Edit notice" : "Add notice"}
      description="Manage notices with title, description, and attached file."
      size="md"
      footer={
        <div className="flex items-center justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="h-9 rounded-full border-zinc-200 text-xs dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isCreating || isUpdating}
            className="h-9 rounded-full px-5 text-xs font-semibold uppercase tracking-[0.18em] text-white disabled:opacity-70 bg-[linear-gradient(135deg,var(--brand-from),var(--brand-to))] shadow-[0_18px_55px_-40px_rgba(77,140,30,0.7)] hover:brightness-[1.05]"
            form="admin-notice-form"
          >
            {editingNotice
              ? isUpdating
                ? "Saving..."
                : "Save changes"
              : isCreating
                ? "Creating..."
                : "Create notice"}
          </Button>
        </div>
      }
    >
      <form id="admin-notice-form" onSubmit={onSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <label
            htmlFor="title"
            className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-400"
          >
            Title
          </label>
          <Input
            id="title"
            value={formValues.title}
            onChange={(e) => onChange("title", e.target.value)}
            placeholder="Notice title"
            required
            className="h-10 rounded-xl bg-zinc-50 border-zinc-200 focus:bg-white focus:border-emerald-500 focus:ring-emerald-500/20 dark:bg-zinc-900 dark:border-zinc-700 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:bg-zinc-900"
          />
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor="description"
            className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-400"
          >
            Description
          </label>
          <div className="admin-notice-quill overflow-hidden rounded-xl border border-zinc-200 bg-white focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500/20 dark:border-zinc-700 dark:bg-zinc-900">
            <ReactQuill
              theme="snow"
              value={formValues.description}
              onChange={(value) => onChange("description", value)}
              placeholder="Enter the notice description."
              className="[&_.ql-editor]:min-h-[120px]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <label
              htmlFor="isPublic"
              className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-400"
            >
              Public
            </label>
            <div className="flex items-center mt-2 h-10">
              <input
                id="isPublic"
                type="checkbox"
                checked={formValues.isPublic}
                onChange={(e) => onChange("isPublic", e.target.checked)}
                className="h-4 w-4 rounded border-zinc-300 text-emerald-600 focus:ring-emerald-500 dark:border-zinc-600 dark:bg-zinc-900"
              />
              <span className="ml-2 text-sm text-zinc-600 dark:text-zinc-300">
                Is this notice public?
              </span>
            </div>
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="file"
              className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-400"
            >
              Notice file (optional)
            </label>
            <Input
              id="file"
              type="file"
              onChange={(e) => onChange("file", e.target.files?.[0] ?? null)}
              className="h-10 cursor-pointer rounded-xl border-zinc-200 bg-zinc-50 file:mr-3 file:rounded-lg file:border-0 file:bg-emerald-600 file:px-3 file:py-1.5 file:text-xs file:font-semibold file:uppercase file:tracking-[0.16em] file:text-white hover:file:bg-emerald-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:file:bg-emerald-500/10 dark:file:text-emerald-300 dark:hover:file:bg-emerald-500/15"
            />
            <p className="text-[11px] text-zinc-400 dark:text-zinc-500">
              Upload PDF, Word, or images if applicable.
            </p>
          </div>
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor="fileUrl"
            className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-400"
          >
            File URL (optional)
          </label>
          <Input
            id="fileUrl"
            type="url"
            value={formValues.fileUrl}
            onChange={(e) => onChange("fileUrl", e.target.value)}
            placeholder="https://example.com/document.pdf"
            className="h-10 rounded-xl bg-zinc-50 border-zinc-200 focus:bg-white focus:border-emerald-500 focus:ring-emerald-500/20 dark:bg-zinc-900 dark:border-zinc-700 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:bg-zinc-900"
          />
          <p className="text-[11px] text-zinc-400 dark:text-zinc-500">
            If you provide a URL externally hosted.
          </p>
        </div>
      </form>

      <style jsx global>{`
        .dark .admin-notice-quill .ql-toolbar {
          background: #18181b;
          border: 0;
          border-bottom: 1px solid rgba(63, 63, 70, 1);
        }
        .dark .admin-notice-quill .ql-toolbar .ql-stroke {
          stroke: rgba(228, 228, 231, 0.85);
        }
        .dark .admin-notice-quill .ql-toolbar .ql-fill {
          fill: rgba(228, 228, 231, 0.85);
        }
        .dark .admin-notice-quill .ql-toolbar .ql-picker {
          color: rgba(228, 228, 231, 0.85);
        }
        .dark .admin-notice-quill .ql-toolbar .ql-picker-label {
          color: rgba(228, 228, 231, 0.85);
        }
        .dark .admin-notice-quill .ql-toolbar .ql-picker-options {
          background: #18181b;
          border: 1px solid rgba(63, 63, 70, 1);
          color: rgba(228, 228, 231, 0.9);
        }
        .dark .admin-notice-quill .ql-container {
          border: 0;
          background: #18181b;
          color: rgba(244, 244, 245, 0.95);
        }
        .dark .admin-notice-quill .ql-editor.ql-blank::before {
          color: rgba(161, 161, 170, 0.9);
        }
      `}</style>
    </Modal>
  );
}
