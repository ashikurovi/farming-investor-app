"use client";

import { use, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useGetNoticesQuery } from "@/features/admin/notice/noticeApiSlice";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, FileText, Download } from "lucide-react";
import Link from "next/link";

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
      <div className="flex h-64 items-center justify-center text-sm text-zinc-500">
        Loading notice details...
      </div>
    );
  }

  // If not found
  if (!notice) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-20">
        <h2 className="text-xl font-semibold text-zinc-900">Notice not found</h2>
        <p className="text-sm text-zinc-500">The notice you are looking for does not exist.</p>
        <Button onClick={() => router.back()} variant="outline" className="rounded-full">
          Go back
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="flex items-center gap-4">
        <Button
          type="button"
          onClick={() => router.back()}
          variant="outline"
          className="flex h-9 items-center gap-2 rounded-full px-4 text-xs font-medium text-zinc-600 hover:text-zinc-900"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
      </div>

      <article className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
        <div className="border-b border-zinc-100 bg-zinc-50/50 p-6 sm:p-8">
          <div className="flex items-center gap-2 text-xs font-medium text-zinc-500 mb-4">
            <Calendar className="h-4 w-4" />
            <time dateTime={notice.createdAt}>
              {new Date(notice.createdAt).toLocaleString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
                hour: "numeric",
                minute: "2-digit",
                hour12: true,
              })}
            </time>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl">
            {notice.title}
          </h1>
          <div className="mt-4">
             <span
                className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                  notice.isPublic
                    ? "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-600/20"
                    : "bg-red-50 text-red-700 ring-1 ring-inset ring-red-600/20"
                }`}
              >
                {notice.isPublic ? "Public" : "Private"}
              </span>
          </div>
        </div>

        <div className="p-6 sm:p-8">
          <div 
            className="prose prose-zinc max-w-none text-sm leading-relaxed text-zinc-700" 
            dangerouslySetInnerHTML={{ __html: notice.description }} 
          />

          {notice.fileUrl && (
            <div className="mt-8 rounded-xl border border-zinc-200 bg-zinc-50 p-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-zinc-900">Attached Document</h3>
                    <p className="text-xs text-zinc-500">Click to view or download the attached file below.</p>
                  </div>
                </div>
                
                <a
                  href={notice.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-9 items-center gap-2 rounded-full bg-zinc-900 px-4 text-xs font-semibold text-white hover:bg-zinc-800"
                >
                  <Download className="h-4 w-4" />
                  View File
                </a>
              </div>
            </div>
          )}
        </div>
      </article>
    </div>
  );
}
