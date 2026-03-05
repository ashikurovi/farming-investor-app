"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import {
  useCreateProjectMutation,
} from "@/features/admin/projects/projectsApiSlice";

export default function AdminProjectCreatePage() {
  const router = useRouter();

  const [formValues, setFormValues] = useState({
    name: "",
    description: "",
    location: "",
  });
  const [imageFile, setImageFile] = useState(null);

  const [createProject, { isLoading: isCreating }] = useCreateProjectMutation();

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

      await createProject(formData).unwrap();
      toast.success("Project created successfully");
      router.push("/admin/projects");
    } catch (error) {
      const message =
        error?.data?.message ||
        (Array.isArray(error?.data?.message) ? error.data.message[0] : null) ||
        "Something went wrong. Please try again.";
      toast.error("Create failed", { description: message });
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
            Add project
          </h1>
          <p className="text-sm text-zinc-500">
            Create a new project with basic details and financials.
          </p>
        </div>
      </header>

      <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
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
                value={formValues.name}
                onChange={(e) => handleChange("name", e.target.value)}
                placeholder="e.g. Tomato Farming"
                required
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
                value={formValues.location}
                onChange={(e) => handleChange("location", e.target.value)}
                placeholder="e.g. Dhaka"
                className="h-10 rounded-xl border-zinc-200 bg-zinc-50 focus:border-emerald-500 focus:bg-white focus:ring-emerald-500/20"
              />
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
              value={formValues.description}
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
              disabled={isCreating}
              className="h-9 rounded-full bg-emerald-600 px-5 text-xs font-semibold uppercase tracking-[0.18em] text-white hover:bg-emerald-500 disabled:opacity-70"
            >
              {isCreating ? "Creating..." : "Create project"}
            </Button>
          </div>
        </form>
      </section>
    </div>
  );
}
