"use client";

import { useParams, useRouter } from "next/navigation";
import { 
  ArrowLeft, 
  Mail, 
  User, 
  Phone, 
  Globe, 
  DollarSign, 
  MessageSquare, 
  Clock,
  Briefcase
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetContactQuery } from "@/features/contact/contactApiSlice";

function InfoItem({ icon: Icon, label, value, href, valueClassName = "" }) {
  const content = value || "-";

  return (
    <div className="flex items-start gap-3 rounded-2xl border border-zinc-100 bg-zinc-50/40 p-3.5 transition-all hover:bg-zinc-50 sm:gap-4 sm:p-4">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm ring-1 ring-zinc-200/50 sm:h-10 sm:w-10">
        <Icon className="h-4 w-4 text-zinc-400 sm:h-5 sm:w-5" />
      </div>
      <div className="min-w-0 space-y-1">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
          {label}
        </p>
        {href && content !== "-" ? (
          <a
            href={href}
            className={`block truncate text-sm font-semibold text-emerald-700 hover:text-emerald-800 hover:underline ${valueClassName}`}
          >
            {content}
          </a>
        ) : (
          <p className={`truncate text-sm font-semibold text-zinc-900 ${valueClassName}`}>
            {content}
          </p>
        )}
      </div>
    </div>
  );
}

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
    return date.toLocaleString("en-US", { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (isBusy) {
    return (
      <div className="relative mx-auto max-w-[1600px] space-y-8 px-4 py-6 md:px-6 md:py-8">
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-28 right-0 h-56 w-56 rounded-full bg-emerald-200/20 blur-3xl sm:-top-32 sm:h-72 sm:w-72" />
          <div className="absolute -bottom-24 left-0 h-56 w-56 rounded-full bg-indigo-200/20 blur-3xl sm:-bottom-28 sm:h-72 sm:w-72" />
        </div>

        <div className="overflow-hidden rounded-3xl border border-zinc-200/60 bg-white/70 backdrop-blur-md shadow-xl shadow-zinc-200/40">
          <div className="p-4 sm:p-6">
            <div className="h-6 w-56 animate-pulse rounded-lg bg-zinc-200/70" />
            <div className="mt-3 h-4 w-80 animate-pulse rounded-lg bg-zinc-200/60" />
          </div>
          <div className="border-t border-zinc-100 bg-zinc-50/50 px-4 py-4 sm:px-6">
            <div className="h-4 w-64 animate-pulse rounded-lg bg-zinc-200/60" />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-1">
            <div className="rounded-3xl border border-zinc-200/60 bg-white/70 p-4 backdrop-blur-md shadow-xl shadow-zinc-200/30 sm:p-6">
              <div className="h-4 w-28 animate-pulse rounded-lg bg-zinc-200/70" />
              <div className="mt-5 space-y-3">
                <div className="h-16 animate-pulse rounded-2xl bg-zinc-100/80" />
                <div className="h-16 animate-pulse rounded-2xl bg-zinc-100/80" />
                <div className="h-16 animate-pulse rounded-2xl bg-zinc-100/80" />
              </div>
            </div>
          </div>
          <div className="lg:col-span-2">
            <div className="rounded-3xl border border-zinc-200/60 bg-white/70 p-4 backdrop-blur-md shadow-xl shadow-zinc-200/30 sm:p-6">
              <div className="h-5 w-72 animate-pulse rounded-lg bg-zinc-200/70" />
              <div className="mt-4 h-4 w-56 animate-pulse rounded-lg bg-zinc-200/60" />
              <div className="mt-6 space-y-3">
                <div className="h-4 animate-pulse rounded-lg bg-zinc-100/80" />
                <div className="h-4 animate-pulse rounded-lg bg-zinc-100/80" />
                <div className="h-4 w-2/3 animate-pulse rounded-lg bg-zinc-100/80" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isError || !contact) {
    return (
      <div className="relative mx-auto flex h-[55vh] max-w-[1000px] items-center justify-center px-4">
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-20 right-0 h-60 w-60 rounded-full bg-red-200/20 blur-3xl sm:-top-24 sm:h-72 sm:w-72" />
          <div className="absolute -bottom-24 left-0 h-60 w-60 rounded-full bg-zinc-200/30 blur-3xl sm:-bottom-28 sm:h-72 sm:w-72" />
        </div>

        <div className="w-full overflow-hidden rounded-3xl border border-zinc-200/60 bg-white/80 p-6 text-center backdrop-blur-md shadow-xl shadow-zinc-200/40 sm:p-8">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-600 ring-1 ring-red-100">
            <Mail className="h-7 w-7" />
          </div>
          <h3 className="mt-5 text-xl font-bold tracking-tight text-zinc-900">
            Message not found
          </h3>
          <p className="mt-1 text-sm font-medium text-zinc-500">
            The requested contact message could not be loaded.
          </p>
          <div className="mt-6 flex justify-center">
            <Button
              onClick={() => router.back()}
              variant="outline"
              className="h-10 rounded-xl border-zinc-200 bg-white/80 px-5 text-sm font-semibold text-zinc-700 shadow-sm hover:bg-white"
            >
              Go Back
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const fullName = `${contact.firstName || ""} ${contact.lastName || ""}`.trim() || "Unknown Sender";
  const email = typeof contact.email === "string" ? contact.email.trim() : "";
  const phone = typeof contact.phone === "string" ? contact.phone.trim() : "";
  const country = typeof contact.country === "string" ? contact.country.trim() : "";
  const subject = typeof contact.subject === "string" ? contact.subject.trim() : "";

  return (
    <div className="relative mx-auto max-w-[1600px] space-y-8 px-4 py-6 md:px-6 md:py-8">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-28 right-0 h-60 w-60 rounded-full bg-emerald-200/20 blur-3xl sm:-top-36 sm:h-80 sm:w-80" />
        <div className="absolute -bottom-24 left-0 h-60 w-60 rounded-full bg-indigo-200/15 blur-3xl sm:-bottom-32 sm:h-80 sm:w-80" />
        <div className="absolute left-1/2 top-20 h-52 w-52 -translate-x-1/2 rounded-full bg-teal-200/10 blur-3xl sm:top-24 sm:h-64 sm:w-64" />
      </div>

      <header className="overflow-hidden rounded-3xl border border-zinc-200/60 bg-white/80 backdrop-blur-md shadow-xl shadow-zinc-200/40">
        <div className="flex flex-col gap-6 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div className="flex items-start gap-3 sm:items-center sm:gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.back()}
              className="h-9 w-9 rounded-xl border border-zinc-200 bg-white/60 text-zinc-500 shadow-sm hover:border-zinc-300 hover:bg-white hover:text-zinc-900 sm:h-10 sm:w-10"
            >
              <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
            <div className="relative">
              <div className="absolute -inset-2 rounded-2xl bg-emerald-100/50 blur-xl" />
              <div className="relative flex h-10 w-10 items-center justify-center rounded-2xl  text-emerald-700  sm:h-12 sm:w-12">
                <Mail className="h-5 w-5 sm:h-6 sm:w-6" />
              </div>
            </div>
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-xl font-bold tracking-tight text-zinc-900 sm:text-2xl">
                  Message Details
                </h1>
                <span className="inline-flex max-w-[65vw] items-center rounded-full bg-zinc-100 px-2.5 py-1 text-[11px] font-semibold text-zinc-600 sm:max-w-none">
                  <span className="truncate">ID {String(id)}</span>
                </span>
              </div>
              <p className="text-sm font-medium text-zinc-500">
                Review message content, sender details, and investment intent.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:items-end">
            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-zinc-100 px-3 py-1 text-xs font-semibold text-zinc-700">
              <Clock className="h-3.5 w-3.5" />
              Received {formatDateTime(contact.createdAt)}
            </span>
            {email ? (
              <a
                href={`mailto:${email}?subject=${encodeURIComponent(subject ? `Re: ${subject}` : "Re: Contact Message")}`}
                className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-xl bg-zinc-900 px-5 text-sm font-semibold text-white shadow-lg shadow-zinc-900/20 transition-all hover:bg-zinc-800 hover:shadow-xl hover:shadow-zinc-900/30 active:scale-95 sm:w-auto"
              >
                <Mail className="h-4 w-4" />
                Reply via Email
              </a>
            ) : null}
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-1">
          <Card className="overflow-hidden rounded-3xl border-zinc-200/60 bg-white/80 p-0 backdrop-blur-md shadow-xl shadow-zinc-200/30">
            <CardHeader className="mb-0 items-center justify-between gap-3 space-y-0 border-b border-zinc-100 bg-zinc-50/50 px-4 py-4 sm:flex-row sm:px-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-700 ring-1 ring-blue-100">
                  <User className="h-5 w-5" />
                </div>
                <div>
                  <CardTitle className="text-sm font-bold uppercase tracking-wider text-zinc-600">
                    Sender
                  </CardTitle>
                  <p className="text-xs font-medium text-zinc-500">
                    Contact information
                  </p>
                </div>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-zinc-200/50">
                <span className="text-sm font-bold text-zinc-700">
                  {fullName?.slice(0, 1)?.toUpperCase() || "U"}
                </span>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 px-4 py-5 sm:px-6">
              <InfoItem icon={User} label="Full Name" value={fullName} />
              <InfoItem
                icon={Mail}
                label="Email Address"
                value={email}
                href={email ? `mailto:${email}` : undefined}
              />
              <InfoItem
                icon={Phone}
                label="Phone Number"
                value={phone}
                href={phone ? `tel:${phone}` : undefined}
              />
              <InfoItem icon={Globe} label="Country" value={country} />
            </CardContent>
          </Card>

          <Card className="overflow-hidden rounded-3xl border-zinc-200/60 bg-white/80 p-0 backdrop-blur-md shadow-xl shadow-zinc-200/30">
            <CardHeader className="mb-0 items-center gap-3 space-y-0 border-b border-zinc-100 bg-zinc-50/50 px-4 py-4 sm:flex-row sm:px-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-700 ring-1 ring-purple-100">
                <Briefcase className="h-5 w-5" />
              </div>
              <div>
                <CardTitle className="text-sm font-bold uppercase tracking-wider text-zinc-600">
                  Investment Intent
                </CardTitle>
                <p className="text-xs font-medium text-zinc-500">
                  How they describe their profile
                </p>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 px-4 py-5 sm:px-6">
              <div className="rounded-2xl border border-zinc-100 bg-zinc-50/40 p-4">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
                  Investor Type
                </p>
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center rounded-full bg-purple-50 px-3 py-1 text-xs font-semibold text-purple-700 ring-1 ring-inset ring-purple-700/10">
                    {contact.investorType || "Not specified"}
                  </span>
                </div>
              </div>
              <div className="rounded-2xl border border-zinc-100 bg-zinc-50/40 p-4">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
                  Investment Range
                </p>
                <div className="mt-2 flex items-center gap-2 text-sm font-semibold text-zinc-900">
                  <DollarSign className="h-4 w-4 text-emerald-600" />
                  <span>{contact.investmentRange || "Not specified"}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card className="h-full overflow-hidden rounded-3xl border-zinc-200/60 bg-white/80 p-0 backdrop-blur-md shadow-xl shadow-zinc-200/30">
            <CardHeader className="mb-0 items-start justify-between gap-4 space-y-0 border-b border-zinc-100 bg-zinc-50/50 px-4 py-4 sm:flex-row sm:px-6 sm:py-5">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="relative mt-0.5 shrink-0">
                  <div className="absolute -inset-2 rounded-2xl bg-emerald-100/50 blur-xl" />
                  <div className="relative flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-emerald-700 shadow-sm ring-1 ring-emerald-100 sm:h-11 sm:w-11">
                    <MessageSquare className="h-4 w-4 sm:h-5 sm:w-5" />
                  </div>
                </div>
                <div className="space-y-1">
                  <CardTitle className="text-lg font-bold tracking-tight text-zinc-900 sm:text-xl">
                    {subject || "No Subject"}
                  </CardTitle>
                  <div className="flex flex-wrap items-center gap-2 text-sm font-medium text-zinc-500">
                    <span className="inline-flex items-center gap-1.5">
                      <User className="h-4 w-4 text-zinc-400" />
                      {fullName}
                    </span>
                    {email ? <span className="text-zinc-300">•</span> : null}
                    {email ? (
                      <a
                        href={`mailto:${email}`}
                        className="inline-flex items-center gap-1.5 text-emerald-700 hover:text-emerald-800 hover:underline"
                      >
                        <Mail className="h-4 w-4" />
                        {email}
                      </a>
                    ) : null}
                  </div>
                </div>
              </div>

              <span className="inline-flex w-fit items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-semibold text-zinc-700 shadow-sm ring-1 ring-zinc-200/60 sm:self-auto">
                <Clock className="h-3.5 w-3.5 text-zinc-500" />
                {formatDateTime(contact.createdAt)}
              </span>
            </CardHeader>
            <CardContent className="px-4 py-5 sm:px-6 sm:py-6">
              <div className="prose prose-zinc max-w-none text-zinc-700">
                <p className="whitespace-pre-wrap text-[15px] leading-relaxed">
                  {contact.message || "No message content."}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
