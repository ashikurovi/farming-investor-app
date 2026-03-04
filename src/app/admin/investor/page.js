"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Edit2, Eye, Trash2, ShieldBan, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  useGetUsersQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useBanUserMutation,
  useUnbanUserMutation,
} from "@/features/admin/users/usersApiSlice";
import { Pagination } from "@/components/ui/pagination";
import { AdminSearchBar } from "@/app/admin/components/AdminSearchBar";
import { AdminInvestorFormModal } from "@/app/admin/components/investor/AdminInvestorFormModal";
import { DataTable } from "@/components/ui/data-table";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { toast } from "sonner";
import { useGetInvestorTypesQuery } from "@/features/admin/investorType/investorTypeApiSlice";

const PAGE_SIZE = 10;

export default function AdminInvestorPage() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZE);
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [confirmState, setConfirmState] = useState({
    isOpen: false,
    title: "",
    description: "",
    confirmLabel: "",
    cancelLabel: "Cancel",
    onConfirm: null,
  });

  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "investor",
    photo: null,
    investorTypeId: "",
  });

  const { data, isLoading, isFetching } = useGetUsersQuery({
    page,
    limit: pageSize,
    search,
  });

  const [createUser, { isLoading: isCreating }] = useCreateUserMutation();
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();
  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();
  const [banUser] = useBanUserMutation();
  const [unbanUser] = useUnbanUserMutation();

  const { data: investorTypesData, isLoading: isInvestorTypesLoading } =
    useGetInvestorTypesQuery({
      page: 1,
      limit: 100,
      search: "",
    });

  const investors = useMemo(() => {
    const items = data?.items ?? [];
    return items.filter((u) => u.role === "investor");
  }, [data]);

  const meta = data?.meta ?? { page: 1, pageCount: 1, total: 0 };

  const resetForm = () => {
    setFormValues({
      name: "",
      email: "",
      phone: "",
      password: "",
      role: "investor",
      photo: null,
      investorTypeId: "",
    });
    setEditingUser(null);
  };

  const openCreateModal = () => {
    resetForm();
    setIsModalOpen(true);
  };

  const openEditModal = (user) => {
    setFormValues({
      name: user.name ?? "",
      email: user.email ?? "",
      phone: user.phone ?? "",
      password: "",
      role: user.role ?? "investor",
      photo: null,
      investorTypeId:
        user.investorTypeId != null ? String(user.investorTypeId) : "",
    });
    setEditingUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    resetForm();
  };

  const handleFormChange = (field, value) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", formValues.name);
      formData.append("email", formValues.email);
      if (formValues.phone) {
        formData.append("phone", formValues.phone);
      }
      formData.append("role", formValues.role || "investor");
      if (formValues.password) {
        formData.append("password", formValues.password);
      }
      if (formValues.investorTypeId) {
        formData.append("investorTypeId", String(formValues.investorTypeId));
      }
      if (formValues.photo) {
        formData.append("photo", formValues.photo);
      }

      if (editingUser) {
        await updateUser({ id: editingUser.id, formData }).unwrap();
        toast.success("Investor updated successfully");
      } else {
        await createUser(formData).unwrap();
        toast.success("Investor created successfully");
      }

      closeModal();
    } catch (error) {
      const message =
        error?.data?.message ||
        (Array.isArray(error?.data?.message) ? error.data.message[0] : null) ||
        "Something went wrong. Please try again.";
      toast.error("Operation failed", { description: message });
    }
  };

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

  const confirmDelete = (user) => {
    openConfirm({
      title: "Delete investor",
      description: `Delete investor "${user.name || user.email}"? This action cannot be undone.`,
      confirmLabel: "Delete",
      onConfirm: async () => {
        try {
          await deleteUser(user.id).unwrap();
          toast.success("Investor deleted successfully");
        } catch (error) {
          const message =
            error?.data?.message ||
            (Array.isArray(error?.data?.message)
              ? error.data.message[0]
              : null) ||
            "Failed to delete investor.";
          toast.error("Delete failed", { description: message });
        } finally {
          closeConfirm();
        }
      },
    });
  };

  const confirmToggleBan = (user) => {
    const isCurrentlyBanned = user.isBanned;
    const actionLabel = isCurrentlyBanned ? "Unban" : "Ban";

    openConfirm({
      title: `${actionLabel} investor`,
      description: isCurrentlyBanned
        ? `Unban investor "${user.name || user.email}" and restore access?`
        : `Ban investor "${user.name || user.email}" and revoke access?`,
      confirmLabel: actionLabel,
      onConfirm: async () => {
        try {
          if (isCurrentlyBanned) {
            await unbanUser(user.id).unwrap();
            toast.success("Investor unbanned");
          } else {
            await banUser(user.id).unwrap();
            toast.success("Investor banned");
          }
        } catch (error) {
          const message =
            error?.data?.message ||
            (Array.isArray(error?.data?.message)
              ? error.data.message[0]
              : null) ||
            "Failed to update status.";
          toast.error("Status update failed", { description: message });
        } finally {
          closeConfirm();
        }
      },
    });
  };

  const handleSearchChange = (value) => {
    setSearchInput(value);
    setSearch(value.trim());
    setPage(1);
  };

  const isBusy = isLoading || isFetching || isCreating || isUpdating || isDeleting;

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-zinc-900">
            Investors
          </h1>
          <p className="text-sm text-zinc-500">
            Manage investor profiles, access and status.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <AdminSearchBar value={searchInput} onChange={handleSearchChange} />

          <Button
            type="button"
            size="sm"
            onClick={openCreateModal}
            className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-white shadow-md hover:bg-emerald-500"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Add investor</span>
          </Button>
        </div>
      </header>

      <section className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <DataTable
            columns={[
              {
                key: "sl",
                header: "SL",
                tdClassName:
                  "whitespace-nowrap px-4 py-3 text-sm text-zinc-500",
                cell: (user) =>
                  investors.findIndex((u) => u.id === user.id) + 1,
              },
              {
                key: "name",
                header: "Name",
                tdClassName:
                  "whitespace-nowrap px-4 py-3 text-sm font-medium text-zinc-900",
                cell: (user) => user.name || "-",
              },
              {
                key: "email",
                header: "Email",
              },
              {
                key: "phone",
                header: "Phone",
                cell: (user) => user.phone || "-",
              },
              {
                key: "investorType",
                header: "Investor type",
                tdClassName:
                  "whitespace-nowrap px-4 py-3 text-sm text-zinc-700",
                cell: (user) =>
                  user.investorType
                    ? `${user.investorType.type} (${user.investorType.percentage}%)`
                    : user.investorTypeId
                      ? `Type #${user.investorTypeId}`
                      : "-",
              },
              {
                key: "investmentCount",
                header: "Investments",
                tdClassName:
                  "whitespace-nowrap px-4 py-3 text-sm text-zinc-700",
                cell: (user) => user.investments?.length ?? 0,
              },
              {
                key: "status",
                header: "Status",
                tdClassName: "whitespace-nowrap px-4 py-3 text-xs",
                cell: (user) => (
                  <span
                    className={`inline-flex items-center rounded-full px-2 py-1 font-medium ${
                      user.isBanned
                        ? "bg-red-50 text-red-700"
                        : "bg-emerald-50 text-emerald-700"
                    }`}
                  >
                    {user.isBanned ? "Banned" : "Active"}
                  </span>
                ),
              },
            ]}
            data={investors}
            isLoading={isBusy}
            emptyMessage="No investors found."
            loadingLabel="Loading investors..."
            getRowKey={(user) => user.id}
            renderActions={(user) => (
              <div className="flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => router.push(`/admin/investor/${user.id}`)}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-500 hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
                >
                  <Eye className="h-3.5 w-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => openEditModal(user)}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-500 hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
                >
                  <Edit2 className="h-3.5 w-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => confirmToggleBan(user)}
                  className={`inline-flex h-8 w-8 items-center justify-center rounded-full border bg-white ${
                    user.isBanned
                      ? "border-emerald-200 text-emerald-600 hover:bg-emerald-50"
                      : "border-amber-200 text-amber-600 hover:bg-amber-50"
                  }`}
                >
                  {user.isBanned ? (
                    <ShieldCheck className="h-3.5 w-3.5" />
                  ) : (
                    <ShieldBan className="h-3.5 w-3.5" />
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => confirmDelete(user)}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-red-200 bg-white text-red-600 hover:bg-red-50"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            )}
          />
        </div>

        <Pagination
          page={meta.page}
          pageCount={meta.pageCount}
          total={meta.total}
          pageSize={pageSize}
          onPageChange={(newPage) =>
            setPage((p) =>
              newPage < 1
                ? 1
                : meta.pageCount
                  ? Math.min(meta.pageCount, newPage)
                  : newPage,
            )
          }
          onPageSizeChange={(newSize) => {
            setPageSize(newSize);
            setPage(1);
          }}
        />
      </section>

      <AdminInvestorFormModal
        isOpen={isModalOpen}
        editingUser={editingUser}
        formValues={formValues}
        isCreating={isCreating}
        isUpdating={isUpdating}
        onClose={closeModal}
        onChange={handleFormChange}
        onSubmit={handleSubmit}
        investorTypes={investorTypesData?.items ?? investorTypesData ?? []}
        isInvestorTypesLoading={isInvestorTypesLoading}
      />
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

 