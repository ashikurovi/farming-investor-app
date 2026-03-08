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
      <div className="flex h-[50vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent"></div>
      </div>
    );
  }

  if (isError || !contact) {
    return (
      <div className="flex h-[50vh] flex-col items-center justify-center gap-4 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-600">
          <Mail className="h-6 w-6" />
        </div>
        <div className="space-y-1">
          <h3 className="text-lg font-semibold text-zinc-900">Message not found</h3>
          <p className="text-sm text-zinc-500">The requested contact message could not be loaded.</p>
        </div>
        <Button onClick={() => router.back()} variant="outline">
          Go Back
        </Button>
      </div>
    );
  }

  const fullName = `${contact.firstName || ""} ${contact.lastName || ""}`.trim() || "Unknown Sender";

  return (
    <div className="space-y-8 p-4 md:p-5 max-w-[1600px] mx-auto -mt-6">
      {/* Header */}
      <header className="flex flex-col gap-6 rounded-2xl border border-zinc-100 bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.back()}
            className="h-10 w-10 rounded-xl border border-zinc-200 text-zinc-500 hover:border-zinc-300 hover:bg-zinc-50 hover:text-zinc-900"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100">
            <Mail className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-zinc-900">
              Message Details
            </h1>
            <p className="text-sm font-medium text-zinc-500">
              View message content and sender information
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
            <span className="flex items-center gap-2 rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-600">
                <Clock className="h-3.5 w-3.5" />
                Received {formatDateTime(contact.createdAt)}
            </span>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left Column */}
        <div className="space-y-6 lg:col-span-1">
          {/* Sender Info */}
          <Card className="border-zinc-100 shadow-sm">
            <CardHeader className="flex-row items-center gap-3 space-y-0 pb-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                <User className="h-4 w-4" />
              </div>
              <CardTitle className="text-sm font-bold uppercase tracking-wider text-zinc-500">
                Sender Info
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-4">
              <div>
                <p className="text-xs font-medium text-zinc-500">Full Name</p>
                <p className="text-sm font-semibold text-zinc-900">{fullName}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-zinc-500">Email Address</p>
                <div className="flex items-center gap-2">
                    <Mail className="h-3.5 w-3.5 text-zinc-400" />
                    <a href={`mailto:${contact.email}`} className="text-sm font-medium text-emerald-600 hover:underline">
                        {contact.email || "-"}
                    </a>
                </div>
              </div>
              <div>
                <p className="text-xs font-medium text-zinc-500">Phone Number</p>
                <div className="flex items-center gap-2">
                    <Phone className="h-3.5 w-3.5 text-zinc-400" />
                    <a href={`tel:${contact.phone}`} className="text-sm text-zinc-700 hover:text-emerald-600">
                        {contact.phone || "-"}
                    </a>
                </div>
              </div>
              <div>
                <p className="text-xs font-medium text-zinc-500">Country</p>
                <div className="flex items-center gap-2">
                    <Globe className="h-3.5 w-3.5 text-zinc-400" />
                    <span className="text-sm text-zinc-700">{contact.country || "-"}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Investment Profile */}
          <Card className="border-zinc-100 shadow-sm">
            <CardHeader className="flex-row items-center gap-3 space-y-0 pb-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-50 text-purple-600">
                <Briefcase className="h-4 w-4" />
              </div>
              <CardTitle className="text-sm font-bold uppercase tracking-wider text-zinc-500">
                Investment Profile
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-4">
              <div>
                <p className="text-xs font-medium text-zinc-500">Investor Type</p>
                <span className="mt-1 inline-flex items-center rounded-md bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700 ring-1 ring-inset ring-purple-700/10">
                  {contact.investorType || "Not specified"}
                </span>
              </div>
              <div>
                <p className="text-xs font-medium text-zinc-500">Investment Range</p>
                <div className="mt-1 flex items-center gap-2 text-sm font-semibold text-zinc-900">
                    <DollarSign className="h-4 w-4 text-emerald-500" />
                    {contact.investmentRange || "Not specified"}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Message */}
        <div className="lg:col-span-2">
            <Card className="h-full border-zinc-100 shadow-sm">
                <CardHeader className="flex-row items-center gap-3 space-y-0 border-b border-zinc-100 pb-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                        <MessageSquare className="h-5 w-5" />
                    </div>
                    <div>
                        <CardTitle className="text-lg font-bold text-zinc-900">
                            {contact.subject || "No Subject"}
                        </CardTitle>
                        <p className="text-sm text-zinc-500">
                            Sent on {formatDateTime(contact.createdAt)}
                        </p>
                    </div>
                </CardHeader>
                <CardContent className="pt-6">
                    <div className="prose prose-sm max-w-none text-zinc-700">
                        <p className="whitespace-pre-wrap leading-relaxed">
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
