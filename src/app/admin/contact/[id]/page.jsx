"use client";

import { useParams, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGetContactQuery } from "@/features/contact/contactApiSlice";

export default function AdminContactDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id;

  const {
    data: contact,
    isLoading,
    isFetching,
    isError,
  } = useGetContactQuery(id, {
    skip: !id,
  });

  const isBusy = isLoading || isFetching;

  const formatDateTime = (value) => {
    if (!value) return "-";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "-";
    return date.toLocaleString("en-US", { timeZone: "UTC" });
  };

  const fullName =
    contact &&
    (`${contact.firstName || ""} ${contact.lastName || ""}`.trim() ||
      contact.email);

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => router.push("/admin/contact")}
            className="h-9 w-9 rounded-full border-zinc-200 text-zinc-500 hover:border-zinc-300 hover:bg-zinc-50"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>

          <div>
            <h1 className="text-xl font-semibold tracking-tight text-zinc-900">
              Contact message details
            </h1>
            <p className="text-sm text-zinc-500">
              Review the message and contact information submitted via the
              contact form.
            </p>
          </div>
        </div>
      </header>

      <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
        {isBusy && (
          <div className="flex h-32 items-center justify-center text-sm text-zinc-500">
            Loading message...
          </div>
        )}

        {!isBusy && isError && (
          <div className="flex h-32 items-center justify-center text-sm text-red-600">
            Failed to load contact message. Please try again.
          </div>
        )}

        {!isBusy && !isError && contact && (
          <div className="space-y-6">
            <div className="flex flex-col gap-2 border-b border-zinc-200 pb-4 sm:flex-row sm:items-baseline sm:justify-between">
              <div>
                <h2 className="text-lg font-semibold text-zinc-900">
                  {fullName || "Unknown contact"}
                </h2>
                <p className="text-sm text-zinc-500">
                  Received on {formatDateTime(contact.createdAt)}
                </p>
              </div>

              <div className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700 ring-1 ring-emerald-100">
                Subject: {contact.subject || "-"}
              </div>
            </div>

            <dl className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-1">
                <dt className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
                  First name
                </dt>
                <dd className="text-sm text-zinc-900">
                  {contact.firstName || "-"}
                </dd>
              </div>

              <div className="space-y-1">
                <dt className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
                  Last name
                </dt>
                <dd className="text-sm text-zinc-900">
                  {contact.lastName || "-"}
                </dd>
              </div>

              <div className="space-y-1">
                <dt className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
                  Email
                </dt>
                <dd className="text-sm text-zinc-900">
                  {contact.email || "-"}
                </dd>
              </div>

              <div className="space-y-1">
                <dt className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
                  Phone
                </dt>
                <dd className="text-sm text-zinc-900">
                  {contact.phone || "-"}
                </dd>
              </div>

              <div className="space-y-1">
                <dt className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
                  Country
                </dt>
                <dd className="text-sm text-zinc-900">
                  {contact.country || "-"}
                </dd>
              </div>

              <div className="space-y-1">
                <dt className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
                  Investor type
                </dt>
                <dd className="text-sm text-zinc-900">
                  {contact.investorType || "-"}
                </dd>
              </div>

              <div className="space-y-1">
                <dt className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
                  Investment range
                </dt>
                <dd className="text-sm text-zinc-900">
                  {contact.investmentRange || "-"}
                </dd>
              </div>
            </dl>

            <div className="space-y-2">
              <h3 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
                Message
              </h3>
              <div className="rounded-2xl border border-zinc-100 bg-zinc-50/60 p-4 text-sm leading-relaxed text-zinc-800">
                {contact.message || "No message content."}
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
