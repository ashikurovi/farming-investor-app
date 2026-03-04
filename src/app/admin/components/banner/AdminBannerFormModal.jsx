import { useEffect, useState } from "react";
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
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    if (!formValues?.photo && !formValues?.photoUrl) {
      setPreviewUrl(null);
      return;
    }

    if (formValues.photo) {
      const objectUrl = URL.createObjectURL(formValues.photo);
      setPreviewUrl(objectUrl);

      return () => {
        URL.revokeObjectURL(objectUrl);
      };
    }

    if (formValues.photoUrl) {
      setPreviewUrl(formValues.photoUrl);
    }
  }, [formValues?.photo, formValues?.photoUrl]);

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
            className="h-9 rounded-full border-zinc-200 text-xs"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isCreating || isUpdating}
            className="h-9 rounded-full bg-emerald-600 px-5 text-xs font-semibold uppercase tracking-[0.18em] text-white hover:bg-emerald-500 disabled:opacity-70"
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
            className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500"
          >
            Title
          </label>
          <Input
            id="title"
            value={formValues.title}
            onChange={(e) => onChange("title", e.target.value)}
            placeholder="Banner title"
            required
            className="h-10 rounded-xl bg-zinc-50 border-zinc-200 focus:bg-white focus:border-emerald-500 focus:ring-emerald-500/20"
          />
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor="shortDescription"
            className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500"
          >
            Short description
          </label>
          <textarea
            id="shortDescription"
            rows={3}
            value={formValues.shortDescription}
            onChange={(e) => onChange("shortDescription", e.target.value)}
            placeholder="A short tagline or description for this banner."
            className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm text-zinc-900 focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <label
              htmlFor="order"
              className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500"
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
              className="h-10 rounded-xl bg-zinc-50 border-zinc-200 focus:bg-white focus:border-emerald-500 focus:ring-emerald-500/20"
            />
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="photo"
              className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500"
            >
              Photo file
            </label>
            <Input
              id="photo"
              type="file"
              accept="image/*"
              onChange={(e) =>
                onChange("photo", e.target.files?.[0] ?? null)
              }
              className="h-10 cursor-pointer rounded-xl border-zinc-200 bg-zinc-50 file:mr-3 file:rounded-lg file:border-0 file:bg-emerald-600 file:px-3 file:py-1.5 file:text-xs file:font-semibold file:uppercase file:tracking-[0.16em] file:text-white hover:file:bg-emerald-500"
            />
            <p className="text-[11px] text-zinc-400">
              You can upload an image or keep the existing one.
            </p>
          </div>
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor="photoUrl"
            className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500"
          >
            Photo URL (optional)
          </label>
          <Input
            id="photoUrl"
            type="url"
            value={formValues.photoUrl}
            onChange={(e) => onChange("photoUrl", e.target.value)}
            placeholder="https://example.com/image.jpg"
            className="h-10 rounded-xl bg-zinc-50 border-zinc-200 focus:bg-white focus:border-emerald-500 focus:ring-emerald-500/20"
          />
          <p className="text-[11px] text-zinc-400">
            If you provide a URL and no file, the URL will be used.
          </p>
        </div>

        {previewUrl && (
          <div className="mt-3 flex items-center gap-3 rounded-2xl border border-dashed border-zinc-200 bg-zinc-50/80 p-3">
            <div className="h-16 w-28 overflow-hidden rounded-xl border border-zinc-200 bg-white">
              <img
                src={previewUrl}
                alt="Banner preview"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="space-y-0.5">
              <p className="text-xs font-medium text-zinc-700">
                Image preview
              </p>
              <p className="text-[11px] text-zinc-400">
                This is how the banner image will appear.
              </p>
            </div>
          </div>
        )}
      </form>
    </Modal>
  );
}

