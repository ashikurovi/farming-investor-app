import { useEffect, useMemo, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";

export function AdminBannerFormModal({
  isOpen,
  editingBanner,
  formValues,
  isCreating,
  isUpdating,
  onClose,
  onChange,
  onSubmit,
}) {
  const fileInputRef = useRef(null);
  const photoFile = formValues?.photo ?? null;

  const objectUrl = useMemo(() => {
    if (!photoFile) return null;
    return URL.createObjectURL(photoFile);
  }, [photoFile]);

  useEffect(() => {
    return () => {
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [objectUrl]);

  const previewUrl = objectUrl || formValues?.photoUrl || null;

  if (!isOpen) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={editingBanner ? "Edit banner" : "Add banner"}
      description="Manage homepage banners with title, description and image."
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
            form="admin-banner-form"
          >
            {editingBanner
              ? isUpdating
                ? "Saving..."
                : "Save changes"
              : isCreating
                ? "Creating..."
                : "Create banner"}
          </Button>
        </div>
      }
    >
      <form
        id="admin-banner-form"
        onSubmit={onSubmit}
        className="space-y-4"
      >
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
            placeholder="Banner title"
            required
            className="h-10 rounded-xl bg-zinc-50 border-zinc-200 focus:bg-white focus:border-emerald-500 focus:ring-emerald-500/20 dark:bg-zinc-900 dark:border-zinc-700 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:bg-zinc-900"
          />
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor="shortDescription"
            className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-400"
          >
            Short description
          </label>
          <textarea
            id="shortDescription"
            rows={3}
            value={formValues.shortDescription}
            onChange={(e) => onChange("shortDescription", e.target.value)}
            placeholder="A short tagline or description for this banner."
            className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm text-zinc-900 focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:bg-zinc-900"
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <label
              htmlFor="order"
              className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-400"
            >
              Display order
            </label>
            <Input
              id="order"
              type="number"
              min="1"
              value={formValues.order}
              onChange={(e) => onChange("order", e.target.value)}
              placeholder="1"
              className="h-10 rounded-xl bg-zinc-50 border-zinc-200 focus:bg-white focus:border-emerald-500 focus:ring-emerald-500/20 dark:bg-zinc-900 dark:border-zinc-700 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:bg-zinc-900"
            />
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="photo"
              className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-400"
            >
              Photo file
            </label>
            <Input
              ref={fileInputRef}
              id="photo"
              type="file"
              accept="image/*"
              onChange={(e) =>
                (() => {
                  onChange("photo", e.target.files?.[0] ?? null);
                  onChange("photoUrl", "");
                })()
              }
              className="h-10 cursor-pointer rounded-xl border-zinc-200 bg-zinc-50 file:mr-3 file:rounded-lg file:border-0 file:px-3 file:py-1.5 file:text-xs file:font-semibold file:uppercase file:tracking-[0.16em] file:text-white dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 file:bg-[linear-gradient(135deg,var(--brand-from),var(--brand-to))] hover:file:brightness-[1.05] dark:file:bg-[linear-gradient(135deg,var(--brand-from),var(--brand-to))]"
            />
            <p className="text-[11px] text-zinc-400 dark:text-zinc-500">
              You can upload an image or keep the existing one.
            </p>
          </div>
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor="photoUrl"
            className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-400"
          >
            Photo URL (optional)
          </label>
          <Input
            id="photoUrl"
            type="url"
            value={formValues.photoUrl}
            onChange={(e) => {
              onChange("photoUrl", e.target.value);
              onChange("photo", null);
              if (fileInputRef.current) fileInputRef.current.value = "";
            }}
            placeholder="https://example.com/image.jpg"
            className="h-10 rounded-xl bg-zinc-50 border-zinc-200 focus:bg-white focus:border-emerald-500 focus:ring-emerald-500/20 dark:bg-zinc-900 dark:border-zinc-700 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:bg-zinc-900"
          />
          <p className="text-[11px] text-zinc-400 dark:text-zinc-500">
            If you provide a URL and no file, the URL will be used.
          </p>
        </div>

        {previewUrl && (
          <div className="mt-3 flex items-center gap-3 rounded-2xl border border-dashed border-zinc-200 bg-zinc-50/80 p-3 dark:border-zinc-800 dark:bg-zinc-950/40">
            <div className="h-16 w-28 overflow-hidden rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
              <img
                src={previewUrl}
                alt="Banner preview"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="space-y-0.5">
              <p className="text-xs font-medium text-zinc-700 dark:text-zinc-200">
                Image preview
              </p>
              <p className="text-[11px] text-zinc-400 dark:text-zinc-500">
                This is how the banner image will appear.
              </p>
            </div>
          </div>
        )}
      </form>
    </Modal>
  );
}

