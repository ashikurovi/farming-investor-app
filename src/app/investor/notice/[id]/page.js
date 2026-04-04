"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import { useGetNoticesQuery } from "@/features/admin/notice/noticeApiSlice";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CalendarDays, FileText, Download, BellRing, Sparkles } from "lucide-react";

export default function NoticeDetailPage({ params }) {
  const router = useRouter();
  const resolvedParams = use(params);
  const id = resolvedParams.id;

  const { data: noticesData, isLoading } = useGetNoticesQuery({
    page: 1,
    limit: 100,
  });
  const allNotices = noticesData?.items || [];
  const notice = allNotices.find((n) => n.id === parseInt(id));

  if (isLoading) {
    return (
      <div className="flex h-[60vh] flex-col items-center justify-center gap-4">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary/20 border-t-primary dark:border-primary/30 dark:border-t-primary"></div>
        <p className="text-sm font-medium tracking-wide text-zinc-500 animate-pulse dark:text-zinc-400">Loading notice...</p>
      </div>
    );
  }

  if (!notice) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 py-20 px-4 text-center">
        <div className="rounded-full bg-red-50 p-6 dark:bg-red-500/10">
          <FileText className="h-10 w-10 text-red-500" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            Notice Not Found
          </h2>
          <p className="text-sm text-zinc-500 max-w-md dark:text-zinc-400">
            The notice you're looking for doesn't exist or is currently unavailable. It may have been removed.
          </p>
        </div>
        <Button
          onClick={() => router.back()}
          className="rounded-xl mt-2 bg-zinc-900 text-white shadow-lg hover:bg-zinc-800 hover:-translate-y-0.5 transition-all dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100"
        >
          Return to Dashboard
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6 sm:space-y-8 pb-12 pt-2 sm:pt-4 px-2 sm:px-6">

      {/* Back Button Navigation */}
      <div className="flex items-center group">
        <Button
          type="button"
          onClick={() => router.back()}
          variant="outline"
          className="group relative overflow-hidden rounded-xl border-zinc-200/80 bg-white/50 px-4 sm:px-5 text-sm font-medium text-zinc-600 shadow-sm backdrop-blur-md transition-all hover:bg-white hover:text-zinc-950 hover:shadow-md hover:border-zinc-300 active:scale-95 dark:border-zinc-800/80 dark:bg-zinc-900/50 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-zinc-50 dark:hover:border-zinc-700"
        >
          <ArrowLeft className="mr-1.5 sm:mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back
        </Button>
      </div>

      {/* Main Notice Article */}
      <article className="group relative overflow-hidden rounded-2xl sm:rounded-[2.5rem] border border-white/60 bg-white/40 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-3xl transition-all duration-700 dark:border-zinc-800/40 dark:bg-zinc-900/40 dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)]">

        {/* Abstract Background Gradients */}
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-primary/5 via-primary/5 to-transparent opacity-50 dark:from-primary/10 dark:via-primary/5 dark:to-transparent" />
        <div className="pointer-events-none absolute -left-24 sm:-left-48 -top-24 sm:-top-48 z-0 h-48 sm:h-96 w-48 sm:w-96 rounded-full bg-primary/20 blur-[60px] sm:blur-[100px] transition-transform duration-1000 group-hover:scale-125 dark:bg-primary/20" />
        <div className="pointer-events-none absolute -right-24 sm:-right-48 -bottom-24 sm:-bottom-48 z-0 h-48 sm:h-96 w-48 sm:w-96 rounded-full bg-primary/10 blur-[60px] sm:blur-[100px] transition-transform duration-1000 group-hover:scale-125 dark:bg-primary/10" />

<<<<<<< HEAD
  <div className="relative z-10 flex flex-col h-full">
    {/* Header Section */}
    <header className="border-b border-zinc-200/50 bg-white/50 p-6 sm:p-8 md:p-12 dark:border-zinc-800/50 dark:bg-zinc-950/40">
      <div className="flex flex-col gap-4 sm:gap-6">

        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex h-10 w-10 sm:h-14 sm:w-14 items-center justify-center rounded-xl sm:rounded-2xl bg-[linear-gradient(135deg,var(--brand-from),var(--brand-to))] text-white shadow-lg shadow-primary/30 ring-1 ring-white/20">
            <BellRing className="h-5 w-5 sm:h-6 sm:w-6" />
          </div>

          <div className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3 sm:px-4 py-1 sm:py-1.5 text-[10px] sm:text-xs font-semibold tracking-wide text-primary shadow-sm backdrop-blur-md dark:border-primary/20 dark:bg-primary/10 dark:text-primary">
            <Sparkles className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
            Notice Board
          </div>
        </div>

        <div className="space-y-3 sm:space-y-4 pt-1 sm:pt-2">
          <h1 className="text-2xl font-extrabold tracking-tight text-zinc-900 sm:text-4xl md:text-5xl lg:leading-tight dark:text-white">
            {notice.title}
          </h1>

          <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm font-medium text-zinc-500 dark:text-zinc-400">
            <div className="flex items-center gap-1.5 sm:gap-2 rounded-full bg-zinc-100/80 px-2.5 sm:px-3 py-1 dark:bg-zinc-800/80">
              <CalendarDays className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary dark:text-primary" />
              <time dateTime={notice.createdAt}>
                {new Date(notice.createdAt).toLocaleString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </time>
            </div>
          </div>
        </div>

      </div>
    </header>

    {/* Body Section */}
    <div className="p-6 sm:p-8 md:p-12">
      <div
        className="prose prose-zinc prose-base sm:prose-lg max-w-none text-zinc-600 leading-relaxed dark:prose-invert dark:text-zinc-300 prose-headings:font-bold prose-headings:tracking-tight prose-a:text-primary hover:prose-a:text-primary/80 prose-img:rounded-xl sm:prose-img:rounded-2xl prose-img:shadow-md sm:prose-img:shadow-lg focus:outline-none"
        dangerouslySetInnerHTML={{ __html: notice.description }}
      />

      {/* Document Attachment */}
      {notice.fileUrl && (
        <div className="mt-8 sm:mt-12 group/attachment relative overflow-hidden rounded-xl sm:rounded-2xl border border-primary/20 bg-primary/5 p-1 transition-all hover:shadow-xl hover:shadow-primary/10 dark:border-primary/20 dark:bg-primary/10 dark:hover:shadow-primary/10">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 transition-opacity duration-500 group-hover/attachment:opacity-100" />

          <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6 rounded-lg sm:rounded-xl bg-zinc-50/50 p-4 sm:p-6 dark:bg-zinc-950/50">
            <div className="flex items-start sm:items-center gap-3 sm:gap-4">
              <div className="mt-0.5 sm:mt-0 flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-lg sm:rounded-xl bg-primary/10 text-primary shadow-inner dark:bg-primary/20 dark:text-primary">
                <FileText className="h-5 w-5 sm:h-6 sm:w-6" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-semibold text-zinc-900 dark:text-zinc-100">
                  Attached Document
                </h3>
                <p className="mt-0.5 sm:mt-1 text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
                  View or download the official associated file.
                </p>
              </div>
            </div>

            <a
              href={notice.fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group/btn inline-flex h-10 sm:h-11 w-full sm:w-auto items-center justify-center gap-2 rounded-lg sm:rounded-xl bg-[linear-gradient(135deg,var(--brand-from),var(--brand-to))] px-5 sm:px-6 text-xs sm:text-sm font-semibold text-white shadow-md shadow-primary/30 transition-all hover:brightness-110 active:scale-95 dark:shadow-primary/20"
            >
              <Download className="h-4 w-4 transition-transform group-hover/btn:-translate-y-0.5" />
              <span>Download File</span>
            </a>
          </div>
=======
        <div className="p-6 sm:p-8">
            <div
              className="prose prose-zinc max-w-none text-sm leading-relaxed text-zinc-700 dark:prose-invert dark:text-zinc-200"
              dangerouslySetInnerHTML={{ __html: notice.description }}
            />

            {notice.fileUrl && (
              <div className="mt-8 rounded-xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-800/30">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary ring-1 ring-[color:rgba(77,140,30,0.14)]">
                      <FileText className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                        Attached Document
                      </h3>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400">
                        Click to view or download the attached file below.
                      </p>
                    </div>
                  </div>

                  <a
                    href={notice.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-9 items-center gap-2 rounded-full bg-zinc-900 px-4 text-xs font-semibold text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white"
                  >
                    <Download className="h-4 w-4" />
                    View File
                  </a>
>>>>>>> 3d06787 (update)
                </div>
            )}
              </div>
          
        </div>
        </article>
    </div>
    );
}
