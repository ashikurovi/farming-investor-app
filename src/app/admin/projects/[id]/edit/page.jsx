"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import {
  useGetProjectQuery,
  useUpdateProjectMutation,
} from "@/features/admin/projects/projectsApiSlice";
import { useGetProjectPeriodsQuery } from "@/features/admin/project-periods/projectPeriodsApiSlice";

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

  const { data: periodsData } = useGetProjectPeriodsQuery({
    page: 1,
    limit: 100,
    search: "",
  });

  const [formValues, setFormValues] = useState({
    title: "",
    description: "",
    totalPrice: "",
    minInvestmentAmount: "",
    profitPercentage: "",
    status: "open",
    startDate: "",
    endDate: "",
    projectPeriodId: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const [updateProject, { isLoading: isUpdating }] = useUpdateProjectMutation();

  const periods = periodsData?.items ?? [];
  const isBusy = isLoading || isFetching;

  useEffect(() => {
    if (project) {
      setFormValues({
        title: project.title ?? "",
        description: project.description ?? "",
        totalPrice: project.totalPrice ?? "",
        minInvestmentAmount: project.minInvestmentAmount ?? "",
        profitPercentage: project.profitPercentage ?? "",
        status: project.status ?? "open",
        startDate: project.startDate ?? "",
        endDate: project.endDate ?? "",
        projectPeriodId: project.projectPeriod?.id
          ? String(project.projectPeriod.id)
          : "",
      });
      setImagePreview(project.image ?? null);
    }
  }, [project]);

  const handleChange = (field, value) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) {
      setImageFile(null);
      setImagePreview(project?.image ?? null);
      return;
    }

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formValues.title.trim()) {
      toast.error("Title is required");
      return;
    }

    if (!formValues.projectPeriodId) {
      toast.error("Project period is required");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", formValues.title.trim());
      formData.append("description", formValues.description.trim());
      if (formValues.totalPrice) {
        formData.append("totalPrice", formValues.totalPrice);
      }
      if (formValues.minInvestmentAmount) {
        formData.append("minInvestmentAmount", formValues.minInvestmentAmount);
      }
      if (formValues.profitPercentage) {
        formData.append("profitPercentage", formValues.profitPercentage);
      }
      formData.append("status", formValues.status);
      if (formValues.startDate) {
        formData.append("startDate", formValues.startDate);
      }
      if (formValues.endDate) {
        formData.append("endDate", formValues.endDate);
      }
      formData.append("projectPeriodId", String(formValues.projectPeriodId));
      if (imageFile) {
        formData.append("image", imageFile);
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
                  htmlFor="title"
                  className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500"
                >
                  Title
                </label>
                <Input
                  id="title"
                  value={formValues.title}
                  onChange={(e) => handleChange("title", e.target.value)}
                  placeholder="e.g. Organic Tomato Farming"
                  required
                  className="h-10 rounded-xl border-zinc-200 bg-zinc-50 focus:border-emerald-500 focus:bg-white focus:ring-emerald-500/20"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="status"
                  className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500"
                >
                  Status
                </label>
                <select
                  id="status"
                  value={formValues.status}
                  onChange={(e) => handleChange("status", e.target.value)}
                  className="h-10 w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3 text-sm text-zinc-900 focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                >
                  <option value="open">Open</option>
                  <option value="closed">Closed</option>
                  <option value="upcoming">Upcoming</option>
                </select>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="totalPrice"
                  className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500"
                >
                  Total amount (BDT)
                </label>
                <Input
                  id="totalPrice"
                  type="number"
                  min="0"
                  value={formValues.totalPrice}
                  onChange={(e) => handleChange("totalPrice", e.target.value)}
                  placeholder="e.g. 50000"
                  className="h-10 rounded-xl border-zinc-200 bg-zinc-50 focus:border-emerald-500 focus:bg-white focus:ring-emerald-500/20"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="minInvestmentAmount"
                  className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500"
                >
                  Minimum investment (BDT)
                </label>
                <Input
                  id="minInvestmentAmount"
                  type="number"
                  min="0"
                  value={formValues.minInvestmentAmount}
                  onChange={(e) =>
                    handleChange("minInvestmentAmount", e.target.value)
                  }
                  placeholder="e.g. 1000"
                  className="h-10 rounded-xl border-zinc-200 bg-zinc-50 focus:border-emerald-500 focus:bg-white focus:ring-emerald-500/20"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="profitPercentage"
                  className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500"
                >
                  Profit percentage (%)
                </label>
                <Input
                  id="profitPercentage"
                  type="number"
                  min="0"
                  value={formValues.profitPercentage}
                  onChange={(e) =>
                    handleChange("profitPercentage", e.target.value)
                  }
                  placeholder="e.g. 10"
                  className="h-10 rounded-xl border-zinc-200 bg-zinc-50 focus:border-emerald-500 focus:bg-white focus:ring-emerald-500/20"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="projectPeriodId"
                  className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500"
                >
                  Project period
                </label>
                <select
                  id="projectPeriodId"
                  value={formValues.projectPeriodId}
                  onChange={(e) =>
                    handleChange("projectPeriodId", e.target.value)
                  }
                  className="h-10 w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3 text-sm text-zinc-900 focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                  required
                >
                  <option value="">Select period...</option>
                  {periods.map((period) => (
                    <option key={period.id} value={period.id}>
                      {period.duration}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="startDate"
                  className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500"
                >
                  Start date
                </label>
                <Input
                  id="startDate"
                  type="date"
                  value={formValues.startDate}
                  onChange={(e) => handleChange("startDate", e.target.value)}
                  className="h-10 rounded-xl border-zinc-200 bg-zinc-50 focus:border-emerald-500 focus:bg-white focus:ring-emerald-500/20"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="endDate"
                  className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500"
                >
                  End date
                </label>
                <Input
                  id="endDate"
                  type="date"
                  value={formValues.endDate}
                  onChange={(e) => handleChange("endDate", e.target.value)}
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
                placeholder="Describe the project, its objectives and expected returns."
                className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm text-zinc-900 focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="image"
                className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500"
              >
                Project image
              </label>
              <input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="block w-full text-sm text-zinc-600 file:mr-3 file:rounded-full file:border-0 file:bg-emerald-50 file:px-4 file:py-2 file:text-xs file:font-semibold file:uppercase file:tracking-[0.16em] file:text-emerald-700 hover:file:bg-emerald-100"
              />
              {imagePreview && (
                <div className="mt-3 inline-flex overflow-hidden rounded-xl border border-zinc-200 bg-zinc-50">
                  <img
                    src={imagePreview}
                    alt="Project"
                    className="h-32 w-48 object-cover"
                  />
                </div>
              )}
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

