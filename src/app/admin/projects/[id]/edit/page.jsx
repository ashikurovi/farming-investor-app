"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import {
  useGetProjectQuery,
  useUpdateProjectMutation,
} from "@/features/admin/projects/projectsApiSlice";

export default function AdminProjectEditPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id;

  const {
    data: project,
    isLoading,
    isFetching,
    isError,
  } = useGetProjectQuery(id, {
    skip: !id,
  });

  const [formValues, setFormValues] = useState({
    name: "",
    description: "",
    location: "",
  });
  const [imageFile, setImageFile] = useState(null);

  const [updateProject, { isLoading: isUpdating }] = useUpdateProjectMutation();

  const isBusy = isLoading || isFetching;

  const cleanUrl = (u) => (typeof u === "string" ? u.replace(/`/g, "").trim() : u);

  const previewUrl = useMemo(() => {
    if (imageFile) {
      return URL.createObjectURL(imageFile);
    }
    return cleanUrl(project?.photoUrl || "");
  }, [imageFile, project]);

  useEffect(() => {
    if (!imageFile || !previewUrl) return;
    return () => {
      URL.revokeObjectURL(previewUrl);
    };
  }, [imageFile, previewUrl]);

  const handleChange = (field, value) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];
    setImageFile(file ?? null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formValues.name.trim()) {
      toast.error("Name is required");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", formValues.name.trim());
      if (formValues.description?.trim()) {
        formData.append("description", formValues.description.trim());
      }
      if (formValues.location?.trim()) {
        formData.append("location", formValues.location.trim());
      }
      if (imageFile) {
        formData.append("photo", imageFile);
      }

      await updateProject({ id, payload: formData }).unwrap();
      toast.success("Project updated successfully");
      router.push("/admin/projects");
    } catch (error) {
      const message =
        error?.data?.message ||
        (Array.isArray(error?.data?.message) ? error.data.message[0] : null) ||
        "Something went wrong. Please try again.";
      toast.error("Update failed", { description: message });
    }
  };

  return (
    <div className="space-y-6">
      <header className="flex items-center gap-3">
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={() => router.push("/admin/projects")}
          className="h-9 w-9 rounded-full border-zinc-200 text-zinc-500 hover:border-zinc-300 hover:bg-zinc-50"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>

        <div>
          <h1 className="text-xl font-semibold tracking-tight text-zinc-900">
            Edit project
          </h1>
          <p className="text-sm text-zinc-500">
            Update project details on a full page, instead of a modal form.
          </p>
        </div>
      </header>

      <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
        {isBusy && (
          <div className="flex h-32 items-center justify-center text-sm text-zinc-500">
            Loading project...
          </div>
        )}

        {!isBusy && isError && (
          <div className="flex h-32 items-center justify-center text-sm text-red-600">
            Failed to load project. Please try again.
          </div>
        )}

        {!isBusy && !isError && project && (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500"
                >
                  Name
                </label>
                <Input
                  id="name"
                  value={formValues.name ?? (project?.name ?? "")}
                  onChange={(e) => handleChange("name", e.target.value)}
                  placeholder="e.g. Tomato Farming"
                  required
                  className="h-10 rounded-xl border-zinc-200 bg-zinc-50 focus:border-emerald-500 focus:bg-white focus:ring-emerald-500/20"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="location"
                  className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500"
                >
                  Location
                </label>
                <Input
                  id="location"
                  value={formValues.location ?? (project?.location ?? "")}
                  onChange={(e) => handleChange("location", e.target.value)}
                  placeholder="e.g. Dhaka"
                  className="h-10 rounded-xl border-zinc-200 bg-zinc-50 focus:border-emerald-500 focus:bg-white focus:ring-emerald-500/20"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="photo"
                  className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500"
                >
                  Project photo
                </label>
                <input
                  id="photo"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="block w-full text-sm text-zinc-600 file:mr-3 file:rounded-full file:border-0 file:bg-emerald-50 file:px-4 file:py-2 file:text-xs file:font-semibold file:uppercase file:tracking-[0.16em] file:text-emerald-700 hover:file:bg-emerald-100"
                />
                {previewUrl && (
                  <div className="mt-3 overflow-hidden rounded-xl border border-zinc-200 bg-zinc-50">
                    <div className="aspect-[16/9] w-full bg-zinc-100">
                      <img
                        src={previewUrl}
                        alt={formValues.name || "Project image"}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="description"
                className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500"
              >
                Description
              </label>
              <textarea
                id="description"
                rows={6}
                value={formValues.description ?? (project?.description ?? "")}
                onChange={(e) => handleChange("description", e.target.value)}
                placeholder="Describe the project, its objectives and financials."
                className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm text-zinc-900 focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>

            <div className="flex items-center justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/admin/projects")}
                className="h-9 rounded-full border-zinc-200 text-xs"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isUpdating}
                className="h-9 rounded-full bg-emerald-600 px-5 text-xs font-semibold uppercase tracking-[0.18em] text-white hover:bg-emerald-500 disabled:opacity-70"
              >
                {isUpdating ? "Saving..." : "Save changes"}
              </Button>
            </div>
          </form>
        )}
      </section>
    </div>
  );
}
