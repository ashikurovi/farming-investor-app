"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import { useGetNoticesQuery } from "@/features/admin/notice/noticeApiSlice";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, FileText, Download, Bell } from "lucide-react";

export default function AdminNoticeDetailPage({ params }) {
  const router = useRouter();
  // Unwrap promise for Next.js 15+ dynamic params compatibility if needed.
  const resolvedParams = use(params);
  const id = resolvedParams.id;

  const { data: noticesData, isLoading } = useGetNoticesQuery({ page: 1, limit: 100 });
  const allNotices = noticesData?.items || [];
  const notice = allNotices.find((n) => n.id === parseInt(id));

  // If loading or resolving, just show loading state.
  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center text-sm text-zinc-500 dark:text-zinc-400">
        Loading notice details...
      </div>
    );
  }

  // If not found
  if (!notice) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-20">
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">Notice not found</h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">The notice you are looking for does not exist.</p>
        <Button
          onClick={() => router.back()}
          variant="outline"
          className="rounded-full dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800"
        >
          Go back
        </Button>
      </div>
    );
  }

  const createdAt = notice.createdAt ? new Date(notice.createdAt) : null;

  return (
    <div className="space-y-8 p-2">
      <header className="flex flex-col gap-6 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between dark:border-zinc-800 dark:bg-zinc-900">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[color:rgba(124,194,46,0.14)] text-[color:rgb(77,140,30)] ring-1 ring-[color:rgba(77,140,30,0.18)] dark:bg-[color:rgba(124,194,46,0.14)] dark:text-[color:rgb(124,194,46)] dark:ring-[color:rgba(124,194,46,0.22)]">
            <Bell className="h-6 w-6" />
          </div>
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
              <h1 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                {notice.title}
              </h1>
              <span
                className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${
                  notice.isPublic
                    ? "bg-emerald-50 text-emerald-700 ring-emerald-600/10 dark:bg-emerald-500/10 dark:text-emerald-300 dark:ring-emerald-500/20"
                    : "bg-red-50 text-red-700 ring-red-600/10 dark:bg-red-500/10 dark:text-red-300 dark:ring-red-500/20"
                }`}
              >
                {notice.isPublic ? "Public" : "Private"}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
              <Calendar className="h-4 w-4" />
              {createdAt ? (
                <time dateTime={notice.createdAt}>
                  {createdAt.toLocaleString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                    hour: "numeric",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </time>
              ) : (
                <span>N/A</span>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <Button
            type="button"
            onClick={() => router.back()}
            variant="outline"
            className="inline-flex h-10 items-center gap-2 rounded-xl border-zinc-200 px-4 text-sm font-semibold text-zinc-700 hover:bg-zinc-50 hover:text-zinc-900 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>

          {notice.fileUrl && (
            <a
              href={notice.fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 items-center justify-center gap-2 rounded-xl px-5 text-sm font-semibold text-white shadow-lg shadow-zinc-900/20 transition-all hover:brightness-[1.05] active:scale-95 bg-[linear-gradient(135deg,var(--brand-from),var(--brand-to))]"
            >
              <Download className="h-4 w-4" />
              View File
            </a>
          )}
        </div>
      </header>

      <div className="grid gap-6 lg:grid-cols-3">
        <section className="lg:col-span-2 rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 sm:p-8">
          <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-zinc-500 dark:text-zinc-400">
            Notice Details
          </h2>
          <div
            className="prose prose-zinc mt-6 max-w-none text-sm leading-relaxed text-zinc-700 dark:prose-invert dark:text-zinc-200"
            dangerouslySetInnerHTML={{ __html: notice.description }}
          />
        </section>

        <aside className="space-y-6">
          <section className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              Attachment
            </h3>

            {notice.fileUrl ? (
              <div className="mt-4 rounded-2xl border border-emerald-100 bg-emerald-50/40 p-4 dark:border-emerald-500/20 dark:bg-emerald-500/10">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-200">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-emerald-900 dark:text-emerald-100">
                      Attached file available
                    </p>
                    <p className="mt-1 text-xs text-emerald-700/80 dark:text-emerald-200/70">
                      Open the file in a new tab.
                    </p>
                  </div>
                </div>
                <a
                  href={notice.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex h-10 w-full items-center justify-center gap-2 rounded-xl px-4 text-sm font-semibold text-white shadow-[0_18px_55px_-40px_rgba(77,140,30,0.7)] transition-all hover:brightness-[1.05] active:scale-[0.99] bg-[linear-gradient(135deg,var(--brand-from),var(--brand-to))]"
                >
                  <Download className="h-4 w-4" />
                  View / Download
                </a>
              </div>
            ) : (
              <div className="mt-4 flex items-center justify-between rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-600 dark:border-zinc-800 dark:bg-zinc-950/40 dark:text-zinc-300">
                <span>No attachment</span>
                <span className="text-xs text-zinc-400 dark:text-zinc-500">—</span>
              </div>
            )}
          </section>
        </aside>
      </div>
    </div>
  );
}
