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
    useGetInvestorTypesQuery(
      {
        page: 1,
        limit: 100,
        search: "",
      },
      { skip: !isModalOpen },
    );

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

  const handleSubmit = useCallback(
    async (e) => {
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
          (Array.isArray(error?.data?.message)
            ? error.data.message[0]
            : null) ||
          "Something went wrong. Please try again.";
        toast.error("Operation failed", { description: message });
      }
    },
    [formValues, editingUser, updateUser, createUser, closeModal],
  );

  const closeConfirm = useCallback(
    () =>
      setConfirmState((prev) => ({ ...prev, isOpen: false, onConfirm: null })),
    [],
  );

  const openConfirm = useCallback(
    (options) =>
      setConfirmState({
        isOpen: true,
        title: "",
        description: "",
        confirmLabel: "Confirm",
        cancelLabel: "Cancel",
        onConfirm: null,
        variant: "danger",
        ...options,
      }),
    [],
  );

  const confirmDelete = useCallback(
    (user) => {
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
    },
    [openConfirm, deleteUser, closeConfirm],
  );

  const confirmToggleBan = useCallback(
    (user) => {
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
    },
    [openConfirm, unbanUser, banUser, closeConfirm],
  );

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
      {/* Header Section */}
      <header className="flex flex-col gap-6 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between dark:border-zinc-800 dark:bg-zinc-900">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[color:rgba(124,194,46,0.14)] text-[color:rgb(77,140,30)] ring-1 ring-[color:rgba(77,140,30,0.18)] dark:bg-[color:rgba(124,194,46,0.14)] dark:text-[color:rgb(124,194,46)] dark:ring-[color:rgba(124,194,46,0.22)]">
            <Users className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
              Investors Management
            </h1>
            <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
              Manage your investor profiles and track investments.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <AdminSearchBar
            value={searchInput}
            onChange={handleSearchChange}
            placeholder="Search investors..."
            className="w-full sm:w-64"
          />
          <Button
            type="button"
            onClick={openCreateModal}
            className="inline-flex h-10 items-center gap-2 rounded-xl bg-[linear-gradient(135deg,var(--brand-from),var(--brand-to))] px-5 text-sm font-semibold text-white shadow-[0_18px_55px_-40px_rgba(77,140,30,0.7)] transition-all hover:brightness-[1.05] active:scale-95"
          >
            <Plus className="h-4 w-4" />
            <span>Add Investor</span>
          </Button>
        </div>
      </header>

      <section className="w-full rounded-3xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <div className="overflow-x-auto">
          <DataTable
            columns={[
              {
                key: "sl",
                header: "#",
                tdClassName:
                  "whitespace-nowrap px-6 py-4 text-xs font-bold text-zinc-400 w-16",
                cell: (user) =>
                  investors.findIndex((u) => u.id === user.id) + 1,
              },
              {
                key: "name",
                header: "INVESTOR",
                tdClassName: "whitespace-nowrap px-6 py-4",
                cell: (user) => (
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[color:rgba(124,194,46,0.18)] text-xs font-bold text-[color:rgb(77,140,30)] dark:bg-[color:rgba(124,194,46,0.14)] dark:text-[color:rgb(124,194,46)]">
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
                      <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                        {user.name || "Unknown"}
                      </span>
                      {user.email && (
                        <span className="text-xs text-zinc-500 dark:text-zinc-400">
                          {user.email}
                        </span>
                      )}
                    </div>
                  </div>
                ),
              },
              {
                key: "investorType",
                header: "INVESTOR TYPE",
                tdClassName: "whitespace-nowrap px-6 py-4",
                cell: (user) => (
                  <div className="flex flex-col gap-1">
                    {user.investorType ? (
                      <>
                        <span className="text-sm font-medium text-zinc-700 dark:text-zinc-200">
                          {user.investorType.type}
                        </span>
                        <span className="inline-flex w-fit items-center rounded-md bg-emerald-50 px-2 py-0.5 text-xs font-bold text-emerald-700 ring-1 ring-inset ring-emerald-600/10 dark:bg-emerald-500/10 dark:text-emerald-300 dark:ring-emerald-500/20">
                          {user.investorType.percentage}% Share
                        </span>
                      </>
                    ) : (
                      <span className="inline-flex items-center rounded-md bg-zinc-50 px-2 py-1 text-xs font-medium text-zinc-400 ring-1 ring-inset ring-zinc-500/10 italic dark:bg-zinc-800 dark:text-zinc-500 dark:ring-zinc-700">
                        No Type
                      </span>
                    )}
                  </div>
                ),
              },
              {
                key: "totalInvestment",
                header: "INVESTMENT",
                tdClassName: "whitespace-nowrap px-6 py-4",
                cell: (user) => (
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-50 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">
                      <span className="text-xs font-bold">৳</span>
                    </div>
                    <span className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                      {Number(user.totalInvestment ?? 0).toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                      })}
                    </span>
                  </div>
                ),
              },
              {
                key: "totalProfit",
                header: "PROFIT",
                tdClassName: "whitespace-nowrap px-6 py-4",
                cell: (user) => (
                  <span className="inline-flex items-center rounded-md bg-emerald-50 px-2 py-1 text-xs font-bold text-emerald-700 ring-1 ring-inset ring-emerald-600/10 dark:bg-emerald-500/10 dark:text-emerald-300 dark:ring-emerald-500/20">
                    ৳{Number(user.totalProfit ?? 0).toLocaleString("en-US", { minimumFractionDigits: 2 })}
                  </span>
                ),
              },
              {
                key: "balance",
                header: "BALANCE",
                tdClassName: "whitespace-nowrap px-6 py-4",
                cell: (user) => (
                  <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-bold text-blue-700 ring-1 ring-inset ring-blue-600/10 dark:bg-blue-500/10 dark:text-blue-300 dark:ring-blue-500/20">
                    ৳{Number(user.balance ?? 0).toLocaleString("en-US", { minimumFractionDigits: 2 })}
                  </span>
                ),
              },
              {
                key: "totalCost",
                header: "TOTAL COST",
                tdClassName: "whitespace-nowrap px-6 py-4",
                cell: (user) => (
                  <span className="inline-flex items-center rounded-md bg-zinc-50 px-2 py-1 text-xs font-medium text-zinc-600 ring-1 ring-inset ring-zinc-500/10 dark:bg-zinc-800 dark:text-zinc-300 dark:ring-zinc-700">
                    ৳{Number(user.totalCost ?? 0).toLocaleString("en-US", { minimumFractionDigits: 2 })}
                  </span>
                ),
              },
              {
                key: "status",
                header: "STATUS",
                tdClassName: "whitespace-nowrap px-6 py-4",
                cell: (user) => (
                  <span
                    className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-bold ring-1 ring-inset ${user.isBanned
                        ? "bg-red-50 text-red-700 ring-red-600/10 dark:bg-red-500/10 dark:text-red-300 dark:ring-red-500/20"
                        : "bg-emerald-50 text-emerald-700 ring-emerald-600/10 dark:bg-emerald-500/10 dark:text-emerald-300 dark:ring-emerald-500/20"
                      }`}
                  >
                    {user.isBanned ? "Banned" : "Active"}
                  </span>
                ),
              },
            ]}
            data={investors}
            isLoading={isBusy}
            emptyMessage={
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-50 dark:bg-zinc-800">
                  <Users className="h-6 w-6 text-zinc-400 dark:text-zinc-500" />
                </div>
                <h3 className="mt-2 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                  No investors found
                </h3>
                <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
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
              <div className="flex items-center justify-end gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    router.push(`/admin/investor/${user.id}`);
                  }}
                  className="h-8 w-8 rounded-full text-zinc-400 hover:bg-zinc-50 hover:text-blue-600 dark:text-zinc-500 dark:hover:bg-zinc-800 dark:hover:text-blue-300"
                  title="View Details"
                >
                  <Eye className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    openEditModal(user);
                  }}
                  className="h-8 w-8 rounded-full text-zinc-400 hover:bg-zinc-50 hover:text-amber-600 dark:text-zinc-500 dark:hover:bg-zinc-800 dark:hover:text-amber-300"
                  title="Edit Profile"
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    confirmToggleBan(user);
                  }}
                  className={`h-8 w-8 rounded-full text-zinc-400 hover:bg-zinc-50 ${user.isBanned
                      ? "hover:text-emerald-600"
                      : "hover:text-purple-600"
                    } dark:text-zinc-500 dark:hover:bg-zinc-800 ${user.isBanned ? "dark:hover:text-emerald-300" : "dark:hover:text-purple-300"}`}
                  title={user.isBanned ? "Unban User" : "Ban User"}
                >
                  {user.isBanned ? (
                    <ShieldCheck className="h-4 w-4" />
                  ) : (
                    <ShieldBan className="h-4 w-4" />
                  )}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    confirmDelete(user);
                  }}
                  className="h-8 w-8 rounded-full text-zinc-400 hover:bg-red-50 hover:text-red-600 dark:text-zinc-500 dark:hover:bg-red-500/10 dark:hover:text-red-300"
                  title="Delete User"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            )}
          />
        </div>

        <div className="border-t border-zinc-100 bg-zinc-50/50 px-6 py-4 dark:border-zinc-800 dark:bg-zinc-800/40">
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
