"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import { useGetNoticesQuery } from "@/features/admin/notice/noticeApiSlice";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CalendarDays, FileText, Download, BellRing, Sparkles } from "lucide-react";

export default function AdminNoticeDetailPage({ params }) {
  const router = useRouter();
  const resolvedParams = use(params);
  const id = resolvedParams.id;

  const { data: noticesData, isLoading } = useGetNoticesQuery({ page: 1, limit: 100 });
  const allNotices = noticesData?.items || [];
  const notice = allNotices.find((n) => n.id === parseInt(id));

  if (isLoading) {
    return (
      <div className="flex h-[60vh] flex-col items-center justify-center gap-4">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-emerald-100 border-t-emerald-600 dark:border-emerald-900/30 dark:border-t-emerald-500"></div>
        <p className="text-sm font-medium tracking-wide text-zinc-500 animate-pulse dark:text-zinc-400">Loading notice details...</p>
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
          <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            Notice Not Found
          </h2>
          <p className="text-sm text-zinc-500 max-w-md dark:text-zinc-400">
            The notice you're looking for doesn't exist or is currently unavailable.
          </p>
        </div>
        <Button
          onClick={() => router.back()}
          className="rounded-xl mt-2 bg-zinc-900 text-white shadow-lg hover:bg-zinc-800 transition-all dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100"
        >
          Return to Dashboard
        </Button>
      </div>
    );
  }

  const createdAt = notice.createdAt ? new Date(notice.createdAt) : null;

  return (
    <div className="space-y-6 sm:space-y-8 p-2 sm:p-4 pb-12 w-full max-w-6xl mx-auto">
      {/* Header Controls */}
      <div className="flex items-center gap-4">
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

      <div className="grid gap-6 sm:gap-8 lg:grid-cols-3 xl:gap-10">
        
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-6 sm:space-y-8">
           <article className="group relative overflow-hidden rounded-2xl sm:rounded-[2.5rem] border border-white/60 bg-white/40 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-3xl transition-all duration-700 dark:border-zinc-800/40 dark:bg-zinc-900/40 dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)]">
             <div className="absolute inset-0 z-0 bg-gradient-to-br from-emerald-500/5 via-violet-500/5 to-blue-500/5 opacity-50 dark:from-emerald-500/10 dark:via-violet-500/10 dark:to-blue-500/10" />
             <div className="relative z-10 flex flex-col h-full">
               
               <header className="border-b border-zinc-200/50 bg-white/50 p-6 sm:p-8 md:p-10 dark:border-zinc-800/50 dark:bg-zinc-950/40">
                 <div className="flex flex-col gap-4 sm:gap-6">
                    <div className="flex items-center justify-between flex-wrap gap-3 sm:gap-4">
                      <div className="flex h-10 w-10 sm:h-14 sm:w-14 items-center justify-center rounded-xl sm:rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-600 text-white shadow-lg shadow-emerald-500/30 ring-1 ring-white/20">
                        <BellRing className="h-5 w-5 sm:h-6 sm:w-6" />
                      </div>
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-3 sm:px-4 py-1 sm:py-1.5 text-[10px] sm:text-xs font-semibold tracking-wide shadow-sm backdrop-blur-md ring-1 ring-inset ${
                          notice.isPublic
                            ? "bg-emerald-50/80 text-emerald-700 ring-emerald-200/50 dark:bg-emerald-500/10 dark:text-emerald-300 dark:ring-emerald-500/20"
                            : "bg-red-50/80 text-red-700 ring-red-200/50 dark:bg-red-500/10 dark:text-red-300 dark:ring-red-500/20"
                        }`}
                      >
                        <Sparkles className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                        {notice.isPublic ? "Public Notice" : "Private Notice"}
                      </span>
                    </div>

                    <div className="space-y-3 sm:space-y-4 pt-1 sm:pt-2">
                       <h1 className="text-2xl font-extrabold tracking-tight text-zinc-900 sm:text-4xl lg:leading-tight dark:text-white">
                         {notice.title}
                       </h1>
                       <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm font-medium text-zinc-500 dark:text-zinc-400">
                          <div className="flex items-center gap-1.5 sm:gap-2 rounded-full bg-zinc-100/80 px-2.5 sm:px-3 py-1 dark:bg-zinc-800/80">
                             <CalendarDays className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-emerald-500 dark:text-emerald-400" />
                             {createdAt ? (
                               <time dateTime={notice.createdAt}>
                                 {createdAt.toLocaleString("en-US", {
                                   month: "short",
                                   day: "numeric",
                                   year: "numeric",
                                   hour: "numeric",
                                   minute: "2-digit",
                                   hour12: true,
                                 })}
                               </time>
                             ) : (
                               <span>Unknown Date</span>
                             )}
                          </div>
                       </div>
                    </div>
                 </div>
               </header>

               <div className="p-6 sm:p-8 md:p-10">
                  <div
                    className="prose prose-zinc prose-base sm:prose-lg max-w-none text-zinc-600 leading-relaxed dark:prose-invert dark:text-zinc-300 prose-headings:font-bold prose-headings:tracking-tight prose-a:text-emerald-600 hover:prose-a:text-emerald-500 prose-img:rounded-xl sm:prose-img:rounded-2xl prose-img:shadow-md sm:prose-img:shadow-lg focus:outline-none"
                    dangerouslySetInnerHTML={{ __html: notice.description }}
                  />
               </div>
               
             </div>
           </article>
        </div>

        {/* Sidebar / Attachments Area */}
        <aside className="space-y-6">
          <section className="relative overflow-hidden rounded-2xl sm:rounded-[2.5rem] border border-white/60 bg-white/40 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-3xl dark:border-zinc-800/40 dark:bg-zinc-900/40 dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] p-6 sm:p-8">
            <div className="absolute inset-0 z-0 bg-gradient-to-b from-blue-500/5 to-transparent opacity-50 dark:from-blue-500/10" />
            <div className="relative z-10">
              <h3 className="text-xs sm:text-sm font-bold uppercase tracking-widest text-zinc-900 dark:text-zinc-100 mb-4 sm:mb-6">
                Attachments
              </h3>

              {notice.fileUrl ? (
                <div className="group/attachment relative overflow-hidden rounded-2xl border border-emerald-100/60 bg-emerald-50/50 p-1 transition-all hover:shadow-lg hover:shadow-emerald-100/50 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:hover:shadow-emerald-900/20">
                  <div className="relative flex flex-col gap-4 sm:gap-6 rounded-xl bg-white/50 p-4 sm:p-6 dark:bg-zinc-950/40 backdrop-blur-sm">
                    <div className="flex items-start sm:items-center gap-3 sm:gap-4">
                      <div className="mt-0.5 sm:mt-0 flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-lg sm:rounded-xl bg-emerald-100 text-emerald-600 shadow-inner dark:bg-emerald-500/20 dark:text-emerald-300">
                        <FileText className="h-5 w-5 sm:h-6 sm:w-6" />
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-sm sm:text-base font-semibold text-zinc-900 dark:text-zinc-100">
                          Document
                        </h4>
                        <p className="mt-0.5 sm:mt-1 text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
                          Official file attached
                        </p>
                      </div>
                    </div>

                    <a
                      href={notice.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/btn flex w-full h-10 sm:h-11 items-center justify-center gap-2 rounded-lg sm:rounded-xl bg-[linear-gradient(135deg,var(--brand-from),var(--brand-to))] px-5 sm:px-6 text-xs sm:text-sm font-semibold text-white shadow-md shadow-emerald-600/20 transition-all hover:brightness-110 active:scale-[0.98]"
                    >
                      <Download className="h-4 w-4 transition-transform group-hover/btn:-translate-y-0.5" />
                      <span>Download</span>
                    </a>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-200 bg-zinc-50/50 px-4 py-8 text-center dark:border-zinc-800 dark:bg-zinc-950/40">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800">
                    <FileText className="h-5 w-5 text-zinc-400" />
                  </div>
                  <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400">No attachments</p>
                  <p className="text-xs text-zinc-400 mt-1 dark:text-zinc-500">This notice has no files.</p>
                </div>
              )}
            </div>
          </section>
        </aside>

      </div>
    </div>
  );
}
