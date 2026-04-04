"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Building2, ExternalLink, Loader2, PlayCircle } from "lucide-react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { useGetProjectsQuery } from "@/features/admin/projects/projectsApiSlice";

const OPEN_COMPANY_EVENT = "open-company-modal";
const OPEN_RUNNING_EVENT = "open-running-projects-modal";

const cleanUrl = (u) =>
  typeof u === "string" ? u.replace(/[`]/g, "").trim() : "";

export default function HomeEntryModals() {
  const [isCompanyOpen, setIsCompanyOpen] = useState(false);
  const [isRunningOpen, setIsRunningOpen] = useState(false);

  useEffect(() => {
    setIsCompanyOpen(true);
  }, []);

  useEffect(() => {
    const openCompany = () => setIsCompanyOpen(true);
    const openRunning = () => setIsRunningOpen(true);
    window.addEventListener(OPEN_COMPANY_EVENT, openCompany);
    window.addEventListener(OPEN_RUNNING_EVENT, openRunning);
    return () => {
      window.removeEventListener(OPEN_COMPANY_EVENT, openCompany);
      window.removeEventListener(OPEN_RUNNING_EVENT, openRunning);
    };
  }, []);

  const { data, isLoading, isError } = useGetProjectsQuery(
    { page: 1, limit: 1000 },
    { skip: !isRunningOpen },
  );

  const projects = useMemo(() => {
    if (!data) return [];
    return Array.isArray(data) ? data : (data?.items ?? []);
  }, [data]);

  return (
    <>
      <Modal
        isOpen={isCompanyOpen}
        onClose={() => {
          setIsCompanyOpen(false);
          setIsRunningOpen(true);
        }}
        title={
          <span className="inline-flex items-center gap-2">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-secondary text-primary ring-1 ring-[color:rgba(77,140,30,0.18)]">
              <Building2 className="h-4 w-4" />
            </span>
            ARTMAN
          </span>
        }
        description="Agricultural investment platform"
        size="sm"
        className="max-w-[92vw] md:max-w-xl"
        bodyClassName="p-5 md:p-6"
      >
        <div className="space-y-4">
          <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            Welcome to ARTMAN. We connect investors with real farm projects
            using transparent reporting, verified operations, and structured
            milestones.
          </p>

          <div className="rounded-2xl border border-zinc-200 bg-zinc-50/70 p-4 dark:border-zinc-800 dark:bg-zinc-900/40">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-xl bg-[linear-gradient(135deg,var(--brand-from),var(--brand-to))] text-primary-foreground shadow-sm">
                <PlayCircle className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                  See what is running today
                </p>
                <p className="mt-1 text-[13px] leading-relaxed text-zinc-600 dark:text-zinc-400">
                  We will show currently running projects in the next popup.
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsCompanyOpen(false)}
              className="rounded-xl"
            >
              Close
            </Button>
            <Button
              type="button"
              onClick={() => {
                setIsCompanyOpen(false);
                setIsRunningOpen(true);
              }}
              className="rounded-xl"
            >
              View Running Projects
            </Button>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={isRunningOpen}
        onClose={() => setIsRunningOpen(false)}
        title="Projects"
        description="Projects currently available"
        size="lg"
        className="max-w-[92vw] md:max-w-4xl"
        bodyClassName="p-5 md:p-6"
      >
        {isLoading ? (
          <div className="flex items-center justify-center py-10">
            <div className="flex items-center gap-3 text-sm text-zinc-600 dark:text-zinc-400">
              <Loader2 className="h-5 w-5 animate-spin text-primary" />
              Loading projects…
            </div>
          </div>
        ) : isError ? (
          <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-5 text-sm text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900/40 dark:text-zinc-400">
            Failed to load projects. Please try again.
          </div>
        ) : projects.length === 0 ? (
          <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-5 text-sm text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900/40 dark:text-zinc-400">
            No projects are available right now.
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-[color:rgba(77,140,30,0.18)] bg-secondary px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-primary">
                {projects.length} Projects
              </div>
              <div className="h-px flex-1 bg-zinc-200/70 dark:bg-zinc-800/70" />
              <div className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-[linear-gradient(135deg,var(--brand-from),var(--brand-to))] text-primary-foreground shadow-sm">
                <ExternalLink className="h-4 w-4" />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((p) => {
                const photo = cleanUrl(p?.photoUrl || p?.photo || "");
                return (
                  <Link
                    key={p.id}
                    href={`/landing/project/${p.id}`}
                    onClick={() => setIsRunningOpen(false)}
                    className="group overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-[0_16px_55px_-48px_rgba(0,0,0,0.35)] transition-all hover:-translate-y-0.5 hover:border-[color:rgba(77,140,30,0.35)] hover:shadow-[0_26px_80px_-60px_rgba(77,140,30,0.35)] dark:border-zinc-800 dark:bg-zinc-950"
                  >
                    <div className="relative h-36 w-full overflow-hidden bg-zinc-100 dark:bg-zinc-900">
                      <img
                        src={photo || "/img_7-2048x1024.jpg"}
                        alt={p?.name ?? "Project"}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        onError={(e) => {
                          e.currentTarget.src = "/img_7-2048x1024.jpg";
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                    </div>

                    <div className="p-4">
                      <div className="min-w-0">
                        <div className="truncate text-sm font-bold text-zinc-900 dark:text-zinc-100">
                          {p?.name ?? "Untitled Project"}
                        </div>
                        <div className="mt-1 truncate text-[12px] text-zinc-500 dark:text-zinc-400">
                          {p?.location ?? "Bangladesh"}
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}
