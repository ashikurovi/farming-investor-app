"use client";

import { useMemo, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  Plus,
  Pencil,
  Eye,
  Trash2,
  ShieldBan,
  ShieldCheck,
  Users,
} from "lucide-react";
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

const cleanUrl = (u) =>
  typeof u === "string" ? u.replace(/`/g, "").trim() : "";

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
    }, { skip: !isModalOpen });

  const investors = useMemo(() => {
    const items = data?.items ?? [];
    return items.filter((u) => u.role === "investor");
  }, [data]);

  const meta = data?.meta ?? { page: 1, pageCount: 1, total: 0 };

  const resetForm = useCallback(() => {
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
  }, []);

  const openCreateModal = useCallback(() => {
    resetForm();
    setIsModalOpen(true);
  }, [resetForm]);

  const openEditModal = useCallback((user) => {
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
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    resetForm();
  }, [resetForm]);

  const handleFormChange = useCallback((field, value) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
  }, []);

  const handleSubmit = useCallback(async (e) => {
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
  }, [formValues, editingUser, updateUser, createUser, closeModal]);

  const closeConfirm = useCallback(() =>
    setConfirmState((prev) => ({ ...prev, isOpen: false, onConfirm: null })), []);

  const openConfirm = useCallback((options) =>
    setConfirmState({
      isOpen: true,
      title: "",
      description: "",
      confirmLabel: "Confirm",
      cancelLabel: "Cancel",
      onConfirm: null,
      variant: "danger",
      ...options,
    }), []);

  const confirmDelete = useCallback((user) => {
    openConfirm({
      title: "Delete investor",
      description: `Delete investor "${user.name || user.email}"? This action cannot be undone.`,
      confirmLabel: "Delete",
      variant: "danger",
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
  }, [openConfirm, deleteUser, closeConfirm]);

  const confirmToggleBan = useCallback((user) => {
    const isCurrentlyBanned = user.isBanned;
    const actionLabel = isCurrentlyBanned ? "Unban" : "Ban";
    const variant = isCurrentlyBanned ? "success" : "danger";

    openConfirm({
      title: `${actionLabel} investor`,
      description: isCurrentlyBanned
        ? `Unban investor "${user.name || user.email}" and restore access?`
        : `Ban investor "${user.name || user.email}" and revoke access?`,
      confirmLabel: actionLabel,
      variant: variant,
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
  }, [openConfirm, unbanUser, banUser, closeConfirm]);

  const handleSearchChange = (value) => {
    setSearchInput(value);
    setSearch(value.trim());
    setPage(1);
  };

  const handleRowClick = (user) => {
    router.push(`/admin/investor/${user.id}`);
  };

  const isBusy =
    isLoading || isFetching || isCreating || isUpdating || isDeleting;

  return (
    <div className="space-y-8 p-2">
      <header className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100/50 text-emerald-600">
              <Users className="h-5 w-5" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">
              Investors
            </h1>
          </div>
          <p className="text-sm text-gray-500 max-w-2xl">
            Manage your investor profiles, track their investments, and oversee
            account status efficiently.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <AdminSearchBar value={searchInput} onChange={handleSearchChange} />

          <Button
            type="button"
            size="sm"
            onClick={openCreateModal}
            className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:bg-emerald-700 hover:shadow-md active:scale-95"
          >
            <Plus className="h-4 w-4" />
            <span>Add New Investor</span>
          </Button>
        </div>
      </header>

      <section className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm ring-1 ring-gray-950/5">
        <div className="overflow-x-auto">
          <DataTable
            columns={[
              {
                key: "sl",
                header: "SL",
                className: "hidden sm:table-cell",
                tdClassName:
                  "whitespace-nowrap px-6 py-4 text-xs font-medium text-gray-500 w-[50px]",
                cell: (user) => (
                  <span className="text-gray-400 font-mono">
                    {String(
                      investors.findIndex((u) => u.id === user.id) + 1,
                    ).padStart(2, "0")}
                  </span>
                ),
              },
              {
                key: "name",
                header: "Name",
                tdClassName:
                  "whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900",
                cell: (user) => (
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 text-xs font-bold ring-2 ring-white shadow-sm">
                      {user.photo ? (
                        <img
                          src={
                            typeof user.photo === "string"
                              ? user.photo
                              : URL.createObjectURL(user.photo)
                          }
                          alt={user.name}
                          className="h-full w-full rounded-full object-cover"
                        />
                      ) : (
                        (user.name || "U").charAt(0).toUpperCase()
                      )}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-semibold text-gray-900">
                        {user.name || "Unknown"}
                      </span>
                      <span className="text-xs text-gray-400 font-normal">
                        {user.email}
                      </span>
                    </div>
                  </div>
                ),
              },
              {
                key: "email",
                header: "Contact Info", // Changed header to be more descriptive if showing more
                tdClassName: "hidden", // Hiding original email column as it's now under Name
                cell: () => null,
              },
              {
                key: "investorType",
                header: "Investor Type",
                className: "hidden lg:table-cell",
                tdClassName: "whitespace-nowrap px-6 py-4 text-sm",
                cell: (user) => (
                  <div className="flex flex-col gap-1">
                    {user.investorType ? (
                      <>
                        <span className="font-medium text-gray-700">
                          {user.investorType.type}
                        </span>
                        <span className="text-xs text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full w-fit">
                          {user.investorType.percentage}% Share
                        </span>
                      </>
                    ) : (
                      <span className="text-gray-400 text-xs italic">
                        No Type Assigned
                      </span>
                    )}
                  </div>
                ),
              },
              {
                key: "totalInvestment",
                header: "Investment",
                className: "hidden md:table-cell",
                tdClassName:
                  "whitespace-nowrap px-6 py-4 text-sm text-gray-700 font-mono text-right",
                cell: (user) => (
                  <span className="font-medium text-gray-900">
                    ৳
                    {Number(user.totalInvestment ?? 0).toLocaleString("en-US", { minimumFractionDigits: 2 })}
                  </span>
                ),
              },
              {
                key: "totalProfit",
                header: "Profit",
                className: "hidden md:table-cell",
                tdClassName:
                  "whitespace-nowrap px-6 py-4 text-sm text-emerald-600 font-mono text-right font-medium",
                cell: (user) =>
                  `৳${Number(user.totalProfit ?? 0).toLocaleString("en-US", { minimumFractionDigits: 2 })}`,
              },
              {
                key: "balance",
                header: "Balance",
                className: "hidden xl:table-cell",
                tdClassName:
                  "whitespace-nowrap px-6 py-4 text-sm text-blue-600 font-mono text-right font-medium",
                cell: (user) =>
                  `৳${Number(user.balance ?? 0).toLocaleString("en-US", { minimumFractionDigits: 2 })}`,
              },
              {
                key: "totalCost",
                header: "Total Cost",
                className: "hidden xl:table-cell",
                tdClassName:
                  "whitespace-nowrap px-6 py-4 text-sm text-gray-500 font-mono text-right",
                cell: (user) =>
                  `৳${Number(user.totalCost ?? 0).toLocaleString("en-US", { minimumFractionDigits: 2 })}`,
              },
              {
                key: "status",
                header: "Status",
                className: "hidden sm:table-cell",
                tdClassName: "whitespace-nowrap px-6 py-4 text-xs text-center",
                cell: (user) => (
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-medium ring-1 ring-inset ${
                      user.isBanned
                        ? "bg-red-50 text-red-700 ring-red-600/10"
                        : "bg-emerald-50 text-emerald-700 ring-emerald-600/10"
                    }`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${user.isBanned ? "bg-red-500" : "bg-emerald-500"}`}
                    />
                    {user.isBanned ? "Banned" : "Active"}
                  </span>
                ),
              },
            ].filter((col) => col.key !== "email")} // Filter out the email column since we merged it
            data={investors}
            isLoading={isBusy}
            emptyMessage={
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-50">
                  <Users className="h-6 w-6 text-gray-400" />
                </div>
                <h3 className="mt-2 text-sm font-semibold text-gray-900">
                  No investors found
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Get started by creating a new investor profile.
                </p>
                <div className="mt-6">
                  <Button size="sm" onClick={openCreateModal} variant="outline">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Investor
                  </Button>
                </div>
              </div>
            }
            loadingLabel="Loading investors..."
            getRowKey={(user) => user.id}
            onRowClick={handleRowClick}
            renderActions={(user) => (
              <div className="flex items-center justify-end gap-2 pr-4">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    router.push(`/admin/investor/${user.id}`);
                  }}
                  className="group relative inline-flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 text-blue-600 transition-all hover:bg-blue-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  title="View Details"
                >
                  <Eye className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    openEditModal(user);
                  }}
                  className="group relative inline-flex h-8 w-8 items-center justify-center rounded-full bg-amber-50 text-amber-600 transition-all hover:bg-amber-100 hover:text-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
                  title="Edit Profile"
                >
                  <Pencil className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    confirmToggleBan(user);
                  }}
                  className={`group relative inline-flex h-8 w-8 items-center justify-center rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                    user.isBanned
                      ? "bg-emerald-50 text-emerald-600 hover:bg-emerald-100 hover:text-emerald-700 focus:ring-emerald-500"
                      : "bg-purple-50 text-purple-600 hover:bg-purple-100 hover:text-purple-700 focus:ring-purple-500"
                  }`}
                  title={user.isBanned ? "Unban User" : "Ban User"}
                >
                  {user.isBanned ? (
                    <ShieldCheck className="h-4 w-4" />
                  ) : (
                    <ShieldBan className="h-4 w-4" />
                  )}
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    confirmDelete(user);
                  }}
                  className="group relative inline-flex h-8 w-8 items-center justify-center rounded-full bg-red-50 text-red-600 transition-all hover:bg-red-100 hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                  title="Delete User"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            )}
          />
        </div>

        <div className="border-t border-gray-100 bg-gray-50/50 px-6 py-4">
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
        </div>
      </section>

      <AdminInvestorFormModal
        isOpen={isModalOpen}
        editingUser={editingUser}
        formValues={formValues}
        onClose={closeModal}
        onChange={handleFormChange}
        onSubmit={handleSubmit}
        investorTypes={investorTypesData?.items ?? investorTypesData ?? []}
        isInvestorTypesLoading={isInvestorTypesLoading}
        isCreating={isCreating}
        isUpdating={isUpdating}
        isEditing={!!editingUser}
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
