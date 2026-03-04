import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";

export function AdminGlarryFormModal({
  isOpen,
  editingGlarry,
  formValues,
  isCreating,
  isUpdating,
  onClose,
  onChange,
  onSubmit,
  projects,
  isProjectsLoading,
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
      title={editingGlarry ? "Edit glarry image" : "Add glarry image"}
      description="Attach or update a glarry photo for a project."
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
            form="admin-glarry-form"
          >
            {editingGlarry
              ? isUpdating
                ? "Saving..."
                : "Save changes"
              : isCreating
                ? "Creating..."
                : "Create glarry"}
          </Button>
        </div>
      }
    >
      <form
        id="admin-glarry-form"
        onSubmit={onSubmit}
        className="space-y-4"
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <label
              htmlFor="projectId"
              className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500"
            >
              Project
            </label>
            <select
              id="projectId"
              value={formValues.projectId}
              onChange={(e) => onChange("projectId", e.target.value)}
              className="flex h-10 w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm text-zinc-700 transition-all focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              disabled={isProjectsLoading || isCreating || isUpdating}
              required
            >
              <option value="">
                {isProjectsLoading ? "Loading projects..." : "Select project"}
              </option>
              {projects.map((project) => (
                <option key={project.id} value={project.id}>
                  {project.title}
                </option>
              ))}
            </select>
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
              You can upload a new file or keep the existing image.
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
            <div className="h-16 w-24 overflow-hidden rounded-xl border border-zinc-200 bg-white">
              <img
                src={previewUrl}
                alt="Glarry preview"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="space-y-0.5">
              <p className="text-xs font-medium text-zinc-700">
                Image preview
              </p>
              <p className="text-[11px] text-zinc-400">
                This is how the glarry image will appear.
              </p>
            </div>
          </div>
        )}
      </form>
    </Modal>
  );
}

