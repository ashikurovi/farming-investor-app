"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import { useGetDeedsQuery } from "@/features/admin/deed/deedApiSlice";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, FileText, Download, User } from "lucide-react";

export default function AdminDeedDetailPage({ params }) {
  const router = useRouter();
  // Unwrap promise for Next.js 15+ dynamic params compatibility if needed.
  const resolvedParams = use(params);
  const id = resolvedParams.id;

  const { data: deedsData, isLoading } = useGetDeedsQuery({ page: 1, limit: 100 });
  const allDeeds = deedsData?.data || deedsData?.items || [];
  const deed = allDeeds.find((d) => d.id === parseInt(id));

  // If loading or resolving, just show loading state.
  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center text-sm text-zinc-500">
        Loading deed details...
      </div>
    );
  }

  // If not found
  if (!deed) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-20">
        <h2 className="text-xl font-semibold text-zinc-900">Deed not found</h2>
        <p className="text-sm text-zinc-500">The deed you are looking for does not exist.</p>
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
          <div className="flex flex-wrap items-center gap-6 text-xs font-medium text-zinc-500 mb-4">
            <div className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              <span>
                Issue Date: {deed.issueDate ? new Date(deed.issueDate).toLocaleDateString() : "N/A"}
              </span>
            </div>
            
            <div className="flex items-center gap-1.5">
              <User className="h-4 w-4" />
              <span>
                Investor: {deed.investment?.investor?.name || deed.investor?.name || deed.investorId || "N/A"}
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              <span>
                Added:{" "}
                {new Date(deed.createdAt).toLocaleString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl">
            {deed.title || "Untitled Deed"}
          </h1>
        </div>

        <div className="p-6 sm:p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Main File */}
            <div className={`rounded-xl border border-zinc-200 bg-zinc-50 p-4 ${!deed.file && "opacity-50"}`}>
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-zinc-900">Main File</h3>
                    <p className="text-xs text-zinc-500">Deed primary document.</p>
                  </div>
                </div>
                {deed.file ? (
                  <a
                    href={deed.file}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-9 justify-center items-center gap-2 rounded-full bg-zinc-900 px-4 text-xs font-semibold text-white hover:bg-zinc-800"
                  >
                    <Download className="h-4 w-4" />
                    View File
                  </a>
                ) : (
                  <span className="text-xs text-zinc-500 font-medium">No file attached</span>
                )}
              </div>
            </div>

            {/* PDF File */}
            <div className={`rounded-xl border border-zinc-200 bg-zinc-50 p-4 ${!deed.uploadPdf && "opacity-50"}`}>
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-600">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-zinc-900">Uploaded PDF</h3>
                    <p className="text-xs text-zinc-500">PDF version of the deed.</p>
                  </div>
                </div>
                {deed.uploadPdf ? (
                  <a
                    href={deed.uploadPdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-9 justify-center items-center gap-2 rounded-full bg-zinc-900 px-4 text-xs font-semibold text-white hover:bg-zinc-800"
                  >
                    <Download className="h-4 w-4" />
                    View PDF
                  </a>
                ) : (
                  <span className="text-xs text-zinc-500 font-medium">No PDF attached</span>
                )}
              </div>
            </div>

            {/* Signature File */}
            <div className={`rounded-xl border border-zinc-200 bg-zinc-50 p-4 ${!deed.signature && "opacity-50"}`}>
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-zinc-900">Signature</h3>
                    <p className="text-xs text-zinc-500">Digital signature file.</p>
                  </div>
                </div>
                {deed.signature ? (
                  <a
                    href={deed.signature}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-9 justify-center items-center gap-2 rounded-full bg-zinc-900 px-4 text-xs font-semibold text-white hover:bg-zinc-800"
                  >
                    <Download className="h-4 w-4" />
                    View Signature
                  </a>
                ) : (
                  <span className="text-xs text-zinc-500 font-medium">No signature</span>
                )}
              </div>
            </div>

          </div>
        </div>
      </article>
    </div>
  );
}
