"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  MapPin,
  Upload,
  Type,
  FileText,
  Image as ImageIcon,
  Save,
  X,
} from "lucide-react";
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
  const [isInitialized, setIsInitialized] = useState(false);

  // Pre-fill form data when project loads
  useEffect(() => {
    if (project && !isInitialized) {
      setFormValues({
        name: project.name || "",
        description: project.description || "",
        location: project.location || "",
      });
      setIsInitialized(true);
    }
  }, [project, isInitialized]);

  const [updateProject, { isLoading: isUpdating }] = useUpdateProjectMutation();

  const isBusy = isLoading || isFetching;

  const cleanUrl = (u) =>
    typeof u === "string" ? u.replace(/`/g, "").trim() : u;

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
    <div className="w-full space-y-8 pb-10">
      {/* Header */}
      <header className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-4">
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => router.push("/admin/projects")}
            className="mt-1 h-10 w-10 shrink-0 rounded-xl border-zinc-200 text-zinc-500 hover:border-zinc-300 hover:bg-zinc-50 hover:text-zinc-900 transition-colors dark:border-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>

          <div className="space-y-1">
            <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-3xl">
              Edit Project
            </h1>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Update project details, location, and visual assets.
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <section className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8 dark:border-zinc-800 dark:bg-zinc-900">
        {(isBusy || (project && !isInitialized)) && (
          <div className="flex h-64 items-center justify-center">
            <div className="flex flex-col items-center gap-2">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-zinc-200 border-t-emerald-600 dark:border-zinc-700 dark:border-t-emerald-400"></div>
              <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                Loading project details...
              </p>
            </div>
          </div>
        )}

        {!isBusy && isError && (
          <div className="flex h-64 items-center justify-center rounded-2xl bg-red-50 p-6 text-center dark:bg-red-500/10">
            <div className="space-y-2">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-300">
                <X className="h-6 w-6" />
              </div>
              <h3 className="text-sm font-semibold text-red-900 dark:text-red-300">
                Failed to load project
              </h3>
              <p className="text-xs text-red-600 dark:text-red-400">
                Please check your connection and try again.
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.location.reload()}
                className="mt-2 border-red-200 bg-white text-red-700 hover:bg-red-50 dark:border-red-500/30 dark:bg-zinc-900 dark:text-red-300 dark:hover:bg-red-500/10"
              >
                Retry
              </Button>
            </div>
          </div>
        )}

        {!isBusy && !isError && project && isInitialized && (
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              {/* Left Column: Project Info */}
              <div className="lg:col-span-2 space-y-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label
                      htmlFor="name"
                      className="text-[11px] font-bold uppercase tracking-[0.15em] text-zinc-500 flex items-center gap-1.5"
                    >
                      <Type className="h-3.5 w-3.5" />
                      Project Name
                    </label>
                    <div className="relative">
                      <Input
                        id="name"
                        value={formValues.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        placeholder="e.g. Sustainable Tomato Farming"
                        required
                        className="h-11 rounded-xl border-zinc-200 bg-zinc-50/50 pl-4 text-sm font-medium focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 transition-all placeholder:font-normal dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="location"
                      className="text-[11px] font-bold uppercase tracking-[0.15em] text-zinc-500 flex items-center gap-1.5"
                    >
                      <MapPin className="h-3.5 w-3.5" />
                      Location
                    </label>
                    <div className="relative">
                      <Input
                        id="location"
                        value={formValues.location}
                        onChange={(e) =>
                          handleChange("location", e.target.value)
                        }
                        placeholder="e.g. Gazipur, Dhaka"
                        className="h-11 rounded-xl border-zinc-200 bg-zinc-50/50 pl-4 text-sm font-medium focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 transition-all placeholder:font-normal dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="description"
                    className="text-[11px] font-bold uppercase tracking-[0.15em] text-zinc-500 flex items-center gap-1.5"
                  >
                    <FileText className="h-3.5 w-3.5" />
                    Description
                  </label>
                  <textarea
                    id="description"
                    rows={8}
                    value={formValues.description}
                    onChange={(e) =>
                      handleChange("description", e.target.value)
                    }
                    placeholder="Describe the project, its objectives, financial goals, and expected outcomes..."
                    className="w-full rounded-xl border border-zinc-200 bg-zinc-50/50 p-4 text-sm leading-relaxed text-zinc-900 focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-emerald-500/10 transition-all resize-none placeholder:text-zinc-400 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-500"
                  />
                </div>
              </div>

              {/* Right Column: Media */}
              <div className="space-y-6">
                <div className="space-y-3">
                  <label
                    htmlFor="photo"
                    className="text-[11px] font-bold uppercase tracking-[0.15em] text-zinc-500 flex items-center gap-1.5"
                  >
                    <ImageIcon className="h-3.5 w-3.5" />
                    Cover Image
                  </label>

                  <div className="group relative overflow-hidden rounded-2xl border-2 border-dashed border-zinc-200 bg-zinc-50 transition-colors hover:border-emerald-500/50 hover:bg-emerald-50/30 dark:border-zinc-700 dark:bg-zinc-900">
                    <input
                      id="photo"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
                    />

                    {previewUrl ? (
                      <div className="relative aspect-[4/3] w-full">
                        <img
                          src={previewUrl}
                          alt="Project preview"
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                          <div className="rounded-full bg-white/90 px-4 py-2 text-xs font-semibold text-zinc-900 shadow-lg backdrop-blur-sm dark:bg-zinc-900 dark:text-zinc-100">
                            Change Image
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex aspect-[4/3] flex-col items-center justify-center gap-3 p-6 text-center">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow-sm ring-1 ring-zinc-200 dark:bg-zinc-800 dark:ring-zinc-700">
                          <Upload className="h-5 w-5 text-zinc-400 dark:text-zinc-500" />
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm font-medium text-zinc-700 dark:text-zinc-200">
                            Click to upload
                          </p>
                          <p className="text-xs text-zinc-500 dark:text-zinc-400">
                            SVG, PNG, JPG or GIF
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                  <p className="text-[10px] text-zinc-500 dark:text-zinc-400">
                    Recommended size: 1200x800px. Max file size: 5MB.
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-4 border-t border-zinc-100 pt-6 dark:border-zinc-800">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/admin/projects")}
                className="h-11 rounded-xl border-zinc-200 px-6 text-sm font-medium text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isUpdating}
                className="h-11 rounded-xl bg-[linear-gradient(135deg,var(--brand-from),var(--brand-to))] px-8 text-sm font-semibold text-white shadow-[0_18px_55px_-40px_rgba(77,140,30,0.7)] hover:brightness-[1.05] disabled:opacity-70 disabled:shadow-none transition-all"
              >
                {isUpdating ? (
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                    <span>Saving...</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Save className="h-4 w-4" />
                    <span>Save Changes</span>
                  </div>
                )}
              </Button>
            </div>
          </form>
        )}
      </section>
    </div>
  );
}
