import { useEffect, useState } from "react";
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
            className="h-9 rounded-full border-zinc-200 text-xs"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isCreating || isUpdating}
            className="h-9 rounded-full bg-emerald-600 px-5 text-xs font-semibold uppercase tracking-[0.18em] text-white hover:bg-emerald-500 disabled:opacity-70"
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
      <form
        id="admin-notice-form"
        onSubmit={onSubmit}
        className="space-y-4"
      >
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
            placeholder="Notice title"
            required
            className="h-10 rounded-xl bg-zinc-50 border-zinc-200 focus:bg-white focus:border-emerald-500 focus:ring-emerald-500/20"
          />
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor="description"
            className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500"
          >
            Description
          </label>
          <div className="bg-white rounded-xl overflow-hidden border border-zinc-200 focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500/20">
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
              className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500"
            >
              Public
            </label>
             <div className="flex items-center mt-2 h-10">
               <input
                 id="isPublic"
                 type="checkbox"
                 checked={formValues.isPublic}
                 onChange={(e) => onChange("isPublic", e.target.checked)}
                 className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
               />
               <span className="ml-2 text-sm text-zinc-600">Is this notice public?</span>
             </div>
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="file"
              className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500"
            >
              Notice file (optional)
            </label>
            <Input
              id="file"
              type="file"
              onChange={(e) =>
                onChange("file", e.target.files?.[0] ?? null)
              }
              className="h-10 cursor-pointer rounded-xl border-zinc-200 bg-zinc-50 file:mr-3 file:rounded-lg file:border-0 file:bg-emerald-600 file:px-3 file:py-1.5 file:text-xs file:font-semibold file:uppercase file:tracking-[0.16em] file:text-white hover:file:bg-emerald-500"
            />
            <p className="text-[11px] text-zinc-400">
              Upload PDF, Word, or images if applicable.
            </p>
          </div>
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor="fileUrl"
            className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500"
          >
            File URL (optional)
          </label>
          <Input
            id="fileUrl"
            type="url"
            value={formValues.fileUrl}
            onChange={(e) => onChange("fileUrl", e.target.value)}
            placeholder="https://example.com/document.pdf"
            className="h-10 rounded-xl bg-zinc-50 border-zinc-200 focus:bg-white focus:border-emerald-500 focus:ring-emerald-500/20"
          />
          <p className="text-[11px] text-zinc-400">
            If you provide a URL externally hosted.
          </p>
        </div>
      </form>
    </Modal>
  );
}
