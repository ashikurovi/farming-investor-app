"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import { useGetDeedsQuery } from "@/features/admin/deed/deedApiSlice";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Calendar,
  FileText,
  Download,
  User,
  ScrollText,
} from "lucide-react";

export default function AdminDeedDetailPage({ params }) {
  const router = useRouter();
  // Unwrap promise for Next.js 15+ dynamic params compatibility if needed.
  const resolvedParams = use(params);
  const id = resolvedParams.id;

  const { data: deedsData, isLoading } = useGetDeedsQuery({
    page: 1,
    limit: 100,
  });
  const allDeeds = deedsData?.data || deedsData?.items || [];
  const deed = allDeeds.find((d) => d.id === parseInt(id));

  // If loading or resolving, just show loading state.
  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center text-sm text-zinc-500 dark:text-zinc-400">
        Loading deed details...
      </div>
    );
  }

  // If not found
  if (!deed) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-20">
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
          Deed not found
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          The deed you are looking for does not exist.
        </p>
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

  const createdAt = deed.createdAt ? new Date(deed.createdAt) : null;
  const issueDate = deed.issueDate ? new Date(deed.issueDate) : null;
  const investorName =
    deed.investment?.investor?.name ||
    deed.investor?.name ||
    deed.investorId ||
    "N/A";
  const investmentId = deed.investmentId || deed.investment?.id || "—";

  return (
    <div className="space-y-8 p-2">
      <header className="flex flex-col gap-6 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between dark:border-zinc-800 dark:bg-zinc-900">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[color:rgba(124,194,46,0.14)] text-[color:rgb(77,140,30)] ring-1 ring-[color:rgba(77,140,30,0.18)] dark:bg-[color:rgba(124,194,46,0.14)] dark:text-[color:rgb(124,194,46)] dark:ring-[color:rgba(124,194,46,0.22)]">
            <ScrollText className="h-6 w-6" />
          </div>
          <div className="space-y-1">
            <h1 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
              {deed.title || "Untitled Deed"}
            </h1>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-zinc-500 dark:text-zinc-400">
              <span className="inline-flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Issue: {issueDate ? issueDate.toLocaleDateString() : "N/A"}
              </span>
              <span className="inline-flex items-center gap-2">
                <User className="h-4 w-4" />
                Investor: {investorName}
              </span>
              <span className="inline-flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Added:{" "}
                {createdAt
                  ? createdAt.toLocaleString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  : "N/A"}
              </span>
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
        </div>
      </header>

      <div className="grid gap-6 lg:grid-cols-3">
        <section className="lg:col-span-2 rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 sm:p-8">
          <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-zinc-500 dark:text-zinc-400">
            Files
          </h2>

          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
            <div
              className={`rounded-2xl border border-zinc-200 bg-zinc-50 p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-950/40 ${
                deed.file ? "" : "opacity-60"
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-200">
                  <FileText className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                    Main File
                  </p>
                  <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                    Deed primary document.
                  </p>
                </div>
              </div>
              {deed.file ? (
                <a
                  href={deed.file}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex h-10 w-full items-center justify-center gap-2 rounded-xl px-4 text-sm font-semibold text-white shadow-[0_18px_55px_-40px_rgba(77,140,30,0.7)] transition-all hover:brightness-[1.05] active:scale-[0.99] bg-[linear-gradient(135deg,var(--brand-from),var(--brand-to))]"
                >
                  <Download className="h-4 w-4" />
                  View
                </a>
              ) : (
                <p className="mt-4 text-xs font-medium text-zinc-500 dark:text-zinc-400">
                  No file attached
                </p>
              )}
            </div>

            <div
              className={`rounded-2xl border border-zinc-200 bg-zinc-50 p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-950/40 ${
                deed.uploadPdf ? "" : "opacity-60"
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-100 text-red-600 dark:bg-red-500/15 dark:text-red-200">
                  <FileText className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                    Uploaded PDF
                  </p>
                  <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                    PDF version of the deed.
                  </p>
                </div>
              </div>
              {deed.uploadPdf ? (
                <a
                  href={deed.uploadPdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex h-10 w-full items-center justify-center gap-2 rounded-xl px-4 text-sm font-semibold text-white shadow-[0_18px_55px_-40px_rgba(77,140,30,0.7)] transition-all hover:brightness-[1.05] active:scale-[0.99] bg-[linear-gradient(135deg,var(--brand-from),var(--brand-to))]"
                >
                  <Download className="h-4 w-4" />
                  View
                </a>
              ) : (
                <p className="mt-4 text-xs font-medium text-zinc-500 dark:text-zinc-400">
                  No PDF attached
                </p>
              )}
            </div>

            <div
              className={`rounded-2xl border border-zinc-200 bg-zinc-50 p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-950/40 ${
                deed.signature ? "" : "opacity-60"
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-500/15 dark:text-blue-200">
                  <FileText className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                    Signature
                  </p>
                  <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                    Digital signature file.
                  </p>
                </div>
              </div>
              {deed.signature ? (
                <a
                  href={deed.signature}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex h-10 w-full items-center justify-center gap-2 rounded-xl px-4 text-sm font-semibold text-white shadow-[0_18px_55px_-40px_rgba(77,140,30,0.7)] transition-all hover:brightness-[1.05] active:scale-[0.99] bg-[linear-gradient(135deg,var(--brand-from),var(--brand-to))]"
                >
                  <Download className="h-4 w-4" />
                  View
                </a>
              ) : (
                <p className="mt-4 text-xs font-medium text-zinc-500 dark:text-zinc-400">
                  No signature
                </p>
              )}
            </div>
          </div>
        </section>

        <aside className="space-y-6">
          <section className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              Summary
            </h3>
            <div className="mt-5 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium uppercase tracking-[0.14em] text-zinc-500 dark:text-zinc-400">
                  Investment
                </span>
                <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                  Inv #{investmentId}
                </span>
              </div>
              <div className="h-px bg-zinc-100 dark:bg-zinc-800" />
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium uppercase tracking-[0.14em] text-zinc-500 dark:text-zinc-400">
                  Issue Date
                </span>
                <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                  {issueDate ? issueDate.toLocaleDateString() : "N/A"}
                </span>
              </div>
              <div className="h-px bg-zinc-100 dark:bg-zinc-800" />
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium uppercase tracking-[0.14em] text-zinc-500 dark:text-zinc-400">
                  Created
                </span>
                <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                  {createdAt
                    ? createdAt.toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })
                    : "N/A"}
                </span>
              </div>
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}
