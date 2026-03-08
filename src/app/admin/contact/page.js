"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, Trash2, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import {
  useGetContactsQuery,
  useDeleteContactMutation,
} from "@/features/contact/contactApiSlice";
import { toast } from "sonner";

export default function AdminContactsPage() {
  const router = useRouter();

  const { data: contacts = [], isLoading, isFetching } = useGetContactsQuery();
  const [deleteContact, { isLoading: isDeleting }] = useDeleteContactMutation();

  const [confirmState, setConfirmState] = useState({
    isOpen: false,
    title: "",
    description: "",
    confirmLabel: "",
    cancelLabel: "Cancel",
    onConfirm: null,
  });

  const isBusy = isLoading || isFetching || isDeleting;

  const closeConfirm = () =>
    setConfirmState((prev) => ({ ...prev, isOpen: false, onConfirm: null }));

  const openConfirm = (options) =>
    setConfirmState({
      isOpen: true,
      title: "",
      description: "",
      confirmLabel: "Confirm",
      cancelLabel: "Cancel",
      onConfirm: null,
      ...options,
    });

  const confirmDelete = (contact) => {
    const displayName =
      `${contact.firstName || ""} ${contact.lastName || ""}`.trim() ||
      contact.email ||
      `Message #${contact.id}`;

    openConfirm({
      title: "Delete contact message",
      description: `Delete message from "${displayName}" with subject "${
        contact.subject || "-"
      }"? This action cannot be undone.`,
      confirmLabel: "Delete",
      onConfirm: async () => {
        try {
          await deleteContact(contact.id).unwrap();
          toast.success("Contact message deleted successfully");
        } catch (error) {
          const message =
            error?.data?.message ||
            (Array.isArray(error?.data?.message)
              ? error.data.message[0]
              : null) ||
            "Failed to delete contact message.";
          toast.error("Delete failed", { description: message });
        } finally {
          closeConfirm();
        }
      },
    });
  };

  const formatDateTime = (value) => {
    if (!value) return "-";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "-";
    return date.toLocaleString("en-US", { timeZone: "UTC" });
  };

  return (
    <div className="space-y-8 p-4 md:p-5 max-w-[1600px] mx-auto -mt-6">
      <header className="flex flex-col gap-6 rounded-2xl border border-zinc-100 bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100">
            <Mail className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-zinc-900">
              Contact Messages
            </h1>
            <p className="text-sm font-medium text-zinc-500">
              Manage inquiries and support requests.
            </p>
          </div>
        </div>
      </header>

      <section className="overflow-hidden rounded-2xl border border-zinc-100 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <DataTable
            columns={[
              {
                key: "sl",
                header: "SL",
                tdClassName:
                  "whitespace-nowrap px-4 py-3 text-sm text-zinc-500",
                cell: (contact) =>
                  contacts.findIndex((c) => c.id === contact.id) + 1,
              },
              {
                key: "name",
                header: "Name",
                tdClassName:
                  "whitespace-nowrap px-4 py-3 text-sm font-medium text-zinc-900",
                cell: (contact) =>
                  `${contact.firstName || ""} ${contact.lastName || ""}`.trim() ||
                  contact.email ||
                  "-",
              },
              {
                key: "email",
                header: "Email",
                tdClassName:
                  "whitespace-nowrap px-4 py-3 text-sm text-zinc-700",
                cell: (contact) => contact.email || "-",
              },
              {
                key: "phone",
                header: "Phone",
                tdClassName:
                  "whitespace-nowrap px-4 py-3 text-sm text-zinc-700",
                cell: (contact) => contact.phone || "-",
              },
              {
                key: "country",
                header: "Country",
                tdClassName:
                  "whitespace-nowrap px-4 py-3 text-sm text-zinc-700",
                cell: (contact) => contact.country || "-",
              },
              {
                key: "investorType",
                header: "Investor type",
                tdClassName:
                  "whitespace-nowrap px-4 py-3 text-sm text-zinc-700",
                cell: (contact) => (
                  <span className="inline-flex items-center rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs font-medium text-zinc-800">
                    {contact.investorType || "-"}
                  </span>
                ),
              },
              {
                key: "subject",
                header: "Subject",
                tdClassName:
                  "px-4 py-3 text-sm text-zinc-700 max-w-xs truncate",
                cell: (contact) => contact.subject || "-",
              },
              {
                key: "createdAt",
                header: "Received at",
                tdClassName:
                  "whitespace-nowrap px-4 py-3 text-xs text-zinc-600",
                cell: (contact) => formatDateTime(contact.createdAt),
              },
            ]}
            data={contacts}
            isLoading={isBusy}
            emptyMessage="No contact messages found."
            loadingLabel="Loading contact messages..."
            getRowKey={(contact) => contact.id}
            renderActions={(contact) => (
              <div className="flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => router.push(`/admin/contact/${contact.id}`)}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-500 shadow-sm transition-colors hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
                >
                  <Eye className="h-3.5 w-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => confirmDelete(contact)}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-500 shadow-sm transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            )}
          />
        </div>
      </section>

      <ConfirmDialog
        isOpen={confirmState.isOpen}
        title={confirmState.title}
        description={confirmState.description}
        confirmLabel={confirmState.confirmLabel}
        cancelLabel={confirmState.cancelLabel}
        onConfirm={confirmState.onConfirm}
        onCancel={closeConfirm}
      />
    </div>
  );
}
