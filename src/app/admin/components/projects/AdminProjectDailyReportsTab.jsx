"use client";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { AdminDailyReportFormModal } from "@/app/admin/components/projects/AdminDailyReportFormModal";
import { useCreateDailyReportMutation } from "@/features/admin/dailyReport/dailyReportApiSlice";
import { toast } from "sonner";

export function AdminProjectDailyReportsTab({ project, isBusy, isError }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const now = useMemo(() => new Date(), []);
  const initialDate = useMemo(() => {
    const d = now;
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }, [now]);
  const initialTime = useMemo(() => {
    const d = now;
    const hh = String(d.getHours()).padStart(2, "0");
    const mm = String(d.getMinutes()).padStart(2, "0");
    const ss = String(d.getSeconds()).padStart(2, "0");
    return `${hh}:${mm}:${ss}`;
  }, [now]);
  const [values, setValues] = useState({
    dailyCost: "",
    dailySell: "",
    reason: "",
    photoFile: null,
    date: initialDate,
    time: initialTime,
  });
  const [createReport, { isLoading: isSubmitting }] = useCreateDailyReportMutation();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setValues({ title: "", description: "" });
  };
  const onChange = (key, value) => setValues((prev) => ({ ...prev, [key]: value }));
  const onSubmit = async (e) => {
    e.preventDefault();
    if (!project?.id) return;
    try {
      const projectId = Number(project.id);
      const jsonBody = {
        projectId,
        dailyCost: Number(values.dailyCost || 0),
        dailySell: Number(values.dailySell || 0),
        reason: values.reason || undefined,
        date: values.date,
        time: values.time,
      };
      let payload = jsonBody;
      if (values.photoFile) {
        const form = new FormData();
        form.set("projectId", String(jsonBody.projectId));
        form.set("dailyCost", String(jsonBody.dailyCost));
        form.set("dailySell", String(jsonBody.dailySell));
        if (jsonBody.reason) form.set("reason", jsonBody.reason);
        form.set("date", jsonBody.date);
        form.set("time", jsonBody.time);
        form.set("photo", values.photoFile);
        payload = form;
      }
      await createReport({ payload, projectId }).unwrap();
      toast.success("Daily report posted");
      closeModal();
    } catch (error) {
      toast.error(error?.data?.message || "Failed to post report");
    }
  };

  return (
    <section className="rounded-3xl border border-zinc-200 bg-white p-4 shadow-sm sm:p-6">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-100 text-zinc-500">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file-text"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/></svg>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-zinc-900">Daily Reports</h3>
            <p className="text-xs text-zinc-500">Track daily progress and expenses</p>
          </div>
        </div>
        <Button
          type="button"
          onClick={openModal}
          className="w-full rounded-xl bg-zinc-900 px-4 py-2 text-xs font-semibold text-white hover:bg-zinc-800 sm:w-auto"
        >
          Add New Report
        </Button>
      </div>
      {isBusy && (
        <div className="flex h-24 items-center justify-center text-xs text-zinc-500">Loading daily reports...</div>
      )}
      {!isBusy && isError && (
        <div className="flex h-24 items-center justify-center text-xs text-red-600">Failed to load project.</div>
      )}
      {!isBusy && !isError && project && (
        <>
          {Array.isArray(project.dailyReports) && project.dailyReports.length > 0 ? (
            <DataTable
              columns={[
                {
                  key: "sl",
                  header: "SL",
                  thClassName: "whitespace-nowrap bg-zinc-50/90 px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-500 backdrop-blur rounded-tl-2xl",
                  tdClassName: "whitespace-nowrap px-4 py-3 text-sm text-zinc-500",
                  cell: (row) =>
                    project.dailyReports.findIndex((r) => r.id === row.id) + 1,
                },
                {
                  key: "dailyCost",
                  header: "Daily Cost",
                  thClassName: "whitespace-nowrap bg-zinc-50/90 px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-500 backdrop-blur",
                  tdClassName: "whitespace-nowrap px-4 py-3 text-sm text-zinc-700",
                  cell: (row) => String(row.dailyCost ?? "0"),
                },
                {
                  key: "dailySell",
                  header: "Daily Sell",
                  thClassName: "whitespace-nowrap bg-zinc-50/90 px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-500 backdrop-blur",
                  tdClassName: "whitespace-nowrap px-4 py-3 text-sm text-zinc-700",
                  cell: (row) => String(row.dailySell ?? "0"),
                },
                {
                  key: "reason",
                  header: "Reason",
                  thClassName: "whitespace-nowrap bg-zinc-50/90 px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-500 backdrop-blur",
                  tdClassName: "px-4 py-3 text-sm text-zinc-700 min-w-[200px]",
                  cell: (row) => row.reason ?? "-",
                },
                {
                  key: "date",
                  header: "Date",
                  thClassName: "whitespace-nowrap bg-zinc-50/90 px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-500 backdrop-blur",
                  tdClassName: "whitespace-nowrap px-4 py-3 text-xs text-zinc-600",
                  cell: (row) => row.date ?? "-",
                },
                {
                  key: "time",
                  header: "Time",
                  thClassName: "whitespace-nowrap bg-zinc-50/90 px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-500 backdrop-blur",
                  tdClassName: "whitespace-nowrap px-4 py-3 text-xs text-zinc-600",
                  cell: (row) => row.time ?? "-",
                },
              ]}
              data={project.dailyReports}
              isLoading={false}
              emptyMessage="No daily reports yet for this project."
              getRowKey={(row) => row.id}
              renderActions={(row) => (
                <div className="flex items-center justify-end gap-2">
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    disabled={!row.photoUrl}
                    onClick={() => {
                      if (row.photoUrl) {
                        window.open(row.photoUrl, "_blank", "noopener,noreferrer");
                      }
                    }}
                    className="h-8 rounded-full text-xs"
                  >
                    View Image
                  </Button>
                </div>
              )}
            />
          ) : (
            <p className="text-xs text-zinc-500">No daily reports yet for this project.</p>
          )}
          <AdminDailyReportFormModal
            isOpen={isModalOpen}
            values={values}
            isSubmitting={isSubmitting}
            onClose={closeModal}
            onChange={onChange}
            onSubmit={onSubmit}
          />
        </>
      )}
    </section>
  );
}
