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
import { formatDateUTC } from "@/lib/utils";

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
      description: `Delete message from "${displayName}" with subject "${contact.subject || "-"
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



  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-zinc-900">
            Contact messages
          </h1>
          <p className="text-sm text-zinc-500">
            View and manage messages submitted from the public contact form.
          </p>
        </div>
      </header>

      <section className="w-full rounded-3xl border border-zinc-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <DataTable
            columns={[
              {
                key: "sl",
                header: "#",
                tdClassName:
                  "whitespace-nowrap px-6 py-4 text-xs font-bold text-zinc-400 w-16",
                cell: (contact) =>
                  contacts.findIndex((c) => c.id === contact.id) + 1,
              },
              {
                key: "name",
                header: "NAME",
                tdClassName: "whitespace-nowrap px-6 py-4",
                cell: (contact) => (
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-700">
                      {(contact.firstName || contact.email || "?").charAt(0).toUpperCase()}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-zinc-900">
                        {`${contact.firstName || ""} ${contact.lastName || ""}`.trim() || "-"}
                      </span>
                      {contact.email && (
                        <span className="text-xs text-zinc-500">{contact.email}</span>
                      )}
                    </div>
                  </div>
                ),
              },
              {
                key: "phone",
                header: "PHONE",
                tdClassName:
                  "whitespace-nowrap px-6 py-4 text-sm text-zinc-700",
                cell: (contact) => contact.phone || (
                  <span className="text-zinc-400 italic text-xs">—</span>
                ),
              },
              {
                key: "country",
                header: "COUNTRY",
                tdClassName: "whitespace-nowrap px-6 py-4",
                cell: (contact) => contact.country ? (
                  <span className="inline-flex items-center rounded-md bg-zinc-50 px-2 py-1 text-xs font-medium text-zinc-700 ring-1 ring-inset ring-zinc-500/10">
                    {contact.country}
                  </span>
                ) : (
                  <span className="text-zinc-400 italic text-xs">—</span>
                ),
              },
              {
                key: "investorType",
                header: "INVESTOR TYPE",
                tdClassName: "whitespace-nowrap px-6 py-4",
                cell: (contact) => (
                  <span className="inline-flex items-center rounded-md bg-emerald-50 px-2 py-1 text-xs font-bold text-emerald-700 ring-1 ring-inset ring-emerald-600/10">
                    {contact.investorType || "-"}
                  </span>
                ),
              },
              {
                key: "subject",
                header: "SUBJECT",
                tdClassName:
                  "px-6 py-4 text-sm text-zinc-500 max-w-xs truncate",
                cell: (contact) => contact.subject || "-",
              },
              {
                key: "createdAt",
                header: "RECEIVED AT",
                tdClassName: "whitespace-nowrap px-6 py-4",
                cell: (contact) => (
                  <span className="inline-flex items-center rounded-md bg-zinc-50 px-2 py-1 text-xs font-medium text-zinc-600 ring-1 ring-inset ring-zinc-500/10">
                    {formatDateUTC(contact.createdAt, { year: "numeric", month: "short", day: "2-digit", hour: "2-digit", minute: "2-digit" })}
                  </span>
                ),
              },
            ]}
            data={contacts}
            isLoading={isBusy}
            emptyMessage="No contact messages found."
            loadingLabel="Loading contact messages..."
            getRowKey={(contact) => contact.id}
            renderActions={(contact) => (
              <div className="flex items-center justify-end gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => router.push(`/admin/contact/${contact.id}`)}
                  className="h-8 w-8 rounded-full text-zinc-400 hover:bg-zinc-50 hover:text-blue-600"
                >
                  <Eye className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => confirmDelete(contact)}
                  className="h-8 w-8 rounded-full text-zinc-400 hover:bg-red-50 hover:text-red-600"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
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
