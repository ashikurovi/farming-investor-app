import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import {
  User,
  Mail,
  Phone,
  Lock,
  Briefcase,
  PieChart,
  Image as ImageIcon,
} from "lucide-react";

export function AdminInvestorFormModal({
  isOpen,
  editingUser,
  formValues,
  isCreating,
  isUpdating,
  onClose,
  onChange,
  onSubmit,
  investorTypes = [],
  isInvestorTypesLoading = false,
}) {
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    if (!formValues?.photo) {
      setPreviewUrl(null);
      return;
    }

    if (typeof formValues.photo === "string") {
      setPreviewUrl(formValues.photo);
      return;
    }

    const objectUrl = URL.createObjectURL(formValues.photo);
    setPreviewUrl(objectUrl);

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [formValues?.photo]);

  if (!isOpen) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={editingUser ? "Edit Investor Profile" : "Add New Investor"}
      description={
        editingUser
          ? "Update the investor's details below."
          : "Enter the details for the new investor."
      }
      size="lg"
      footer={
        <div className="flex items-center justify-end gap-3 w-full sm:w-auto">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="flex-1 sm:flex-none h-10 rounded-lg border-zinc-200 text-sm font-medium hover:bg-zinc-50 hover:text-zinc-900 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isCreating || isUpdating}
            className="flex-1 sm:flex-none h-10 rounded-lg bg-[linear-gradient(135deg,var(--brand-from),var(--brand-to))] px-6 text-sm font-semibold text-white shadow-[0_18px_55px_-40px_rgba(77,140,30,0.7)] hover:brightness-[1.05] disabled:opacity-70 disabled:cursor-not-allowed transition-all"
            form="admin-investor-form"
          >
            {editingUser
              ? isUpdating
                ? "Saving Changes..."
                : "Save Changes"
              : isCreating
                ? "Creating Profile..."
                : "Create Investor"}
          </Button>
        </div>
      }
    >
      <form id="admin-investor-form" onSubmit={onSubmit} className="space-y-6">
        {/* Personal Information Section */}
        <div className="rounded-xl border border-zinc-200 bg-zinc-50/60 p-5 transition-all hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-800/30 dark:hover:bg-zinc-800/40">
          <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-gray-900 dark:text-zinc-100">
            <User className="h-4 w-4 text-[color:rgb(77,140,30)] dark:text-[color:rgb(124,194,46)]" />
            Personal Information
          </h3>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div className="space-y-1.5">
              <label
                htmlFor="name"
                className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-zinc-400"
              >
                Full Name
              </label>
              <div className="relative group">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 transition-colors group-focus-within:text-[color:rgb(77,140,30)] dark:group-focus-within:text-[color:rgb(124,194,46)]">
                  <User className="h-4 w-4 text-gray-400 group-focus-within:text-[color:rgb(77,140,30)] dark:text-zinc-500 dark:group-focus-within:text-[color:rgb(124,194,46)]" />
                </div>
                <Input
                  id="name"
                  value={formValues.name}
                  onChange={(e) => onChange("name", e.target.value)}
                  placeholder="John Doe"
                  required
                  className="h-10 w-full rounded-lg border-zinc-200 bg-white pl-10 text-sm outline-none transition-all focus:border-[color:rgba(77,140,30,0.45)] focus:ring-1 focus:ring-[color:rgba(77,140,30,0.22)] group-hover:border-zinc-300 dark:border-zinc-700 dark:bg-zinc-900 dark:focus:border-[color:rgba(124,194,46,0.45)]"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="email"
                className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-zinc-400"
              >
                Email Address
              </label>
              <div className="relative group">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 transition-colors group-focus-within:text-[color:rgb(77,140,30)] dark:group-focus-within:text-[color:rgb(124,194,46)]">
                  <Mail className="h-4 w-4 text-gray-400 group-focus-within:text-[color:rgb(77,140,30)] dark:text-zinc-500 dark:group-focus-within:text-[color:rgb(124,194,46)]" />
                </div>
                <Input
                  id="email"
                  type="email"
                  value={formValues.email}
                  onChange={(e) => onChange("email", e.target.value)}
                  placeholder="john@example.com"
                  required
                  className="h-10 w-full rounded-lg border-zinc-200 bg-white pl-10 text-sm outline-none transition-all focus:border-[color:rgba(77,140,30,0.45)] focus:ring-1 focus:ring-[color:rgba(77,140,30,0.22)] group-hover:border-zinc-300 dark:border-zinc-700 dark:bg-zinc-900 dark:focus:border-[color:rgba(124,194,46,0.45)]"
                />
              </div>
            </div>

            <div className="space-y-1.5 sm:col-span-2">
              <label
                htmlFor="phone"
                className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-zinc-400"
              >
                Phone Number{" "}
                <span className="text-gray-400 font-normal normal-case dark:text-zinc-500">
                  (Optional)
                </span>
              </label>
              <div className="relative group">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 transition-colors group-focus-within:text-[color:rgb(77,140,30)] dark:group-focus-within:text-[color:rgb(124,194,46)]">
                  <Phone className="h-4 w-4 text-gray-400 group-focus-within:text-[color:rgb(77,140,30)] dark:text-zinc-500 dark:group-focus-within:text-[color:rgb(124,194,46)]" />
                </div>
                <Input
                  id="phone"
                  value={formValues.phone}
                  onChange={(e) => onChange("phone", e.target.value)}
                  placeholder="+8801..."
                  className="h-10 w-full rounded-lg border-zinc-200 bg-white pl-10 text-sm outline-none transition-all focus:border-[color:rgba(77,140,30,0.45)] focus:ring-1 focus:ring-[color:rgba(77,140,30,0.22)] group-hover:border-zinc-300 dark:border-zinc-700 dark:bg-zinc-900 dark:focus:border-[color:rgba(124,194,46,0.45)]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Account Details Section */}
        <div className="rounded-xl border border-zinc-200 bg-zinc-50/60 p-5 transition-all hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-800/30 dark:hover:bg-zinc-800/40">
          <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-gray-900 dark:text-zinc-100">
            <Briefcase className="h-4 w-4 text-[color:rgb(77,140,30)] dark:text-[color:rgb(124,194,46)]" />
            Account Details
          </h3>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div className="space-y-1.5">
              <label
                htmlFor="role"
                className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-zinc-400"
              >
                User Role
              </label>
              <div className="relative group">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 transition-colors group-focus-within:text-[color:rgb(77,140,30)] dark:group-focus-within:text-[color:rgb(124,194,46)]">
                  <Briefcase className="h-4 w-4 text-gray-400 group-focus-within:text-[color:rgb(77,140,30)] dark:text-zinc-500 dark:group-focus-within:text-[color:rgb(124,194,46)]" />
                </div>
                <select
                  id="role"
                  value={formValues.role}
                  onChange={(e) => onChange("role", e.target.value)}
                  className="h-10 w-full appearance-none rounded-lg border border-zinc-200 bg-white pl-10 pr-8 text-sm text-gray-900 outline-none transition-all focus:border-[color:rgba(77,140,30,0.45)] focus:ring-1 focus:ring-[color:rgba(77,140,30,0.22)] group-hover:border-zinc-300 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:border-[color:rgba(124,194,46,0.45)]"
                >
                  <option value="investor">Investor</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="investorTypeId"
                className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-zinc-400"
              >
                Investor Type
              </label>
              <div className="relative group">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 transition-colors group-focus-within:text-[color:rgb(77,140,30)] dark:group-focus-within:text-[color:rgb(124,194,46)]">
                  <PieChart className="h-4 w-4 text-gray-400 group-focus-within:text-[color:rgb(77,140,30)] dark:text-zinc-500 dark:group-focus-within:text-[color:rgb(124,194,46)]" />
                </div>
                <select
                  id="investorTypeId"
                  value={formValues.investorTypeId}
                  onChange={(e) => onChange("investorTypeId", e.target.value)}
                  disabled={isInvestorTypesLoading}
                  className="h-10 w-full appearance-none rounded-lg border border-zinc-200 bg-white pl-10 pr-8 text-sm text-gray-900 outline-none transition-all focus:border-[color:rgba(77,140,30,0.45)] focus:ring-1 focus:ring-[color:rgba(77,140,30,0.22)] disabled:opacity-50 group-hover:border-zinc-300 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:border-[color:rgba(124,194,46,0.45)]"
                >
                  <option value="">
                    {isInvestorTypesLoading
                      ? "Loading types..."
                      : "Select investor type (optional)"}
                  </option>
                  {investorTypes?.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.type} ({type.percentage}%)
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-1.5 sm:col-span-2">
              <label
                htmlFor="password"
                className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-zinc-400"
              >
                {editingUser ? "New Password" : "Password"}{" "}
                <span className="text-gray-400 font-normal normal-case dark:text-zinc-500">
                  {editingUser && "(Optional)"}
                </span>
              </label>
              <div className="relative group">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 transition-colors group-focus-within:text-[color:rgb(77,140,30)] dark:group-focus-within:text-[color:rgb(124,194,46)]">
                  <Lock className="h-4 w-4 text-gray-400 group-focus-within:text-[color:rgb(77,140,30)] dark:text-zinc-500 dark:group-focus-within:text-[color:rgb(124,194,46)]" />
                </div>
                <Input
                  id="password"
                  type="password"
                  value={formValues.password}
                  onChange={(e) => onChange("password", e.target.value)}
                  placeholder={
                    editingUser ? "Leave blank to keep current" : "••••••••"
                  }
                  required={!editingUser}
                  className="h-10 w-full rounded-lg border-zinc-200 bg-white pl-10 text-sm outline-none transition-all focus:border-[color:rgba(77,140,30,0.45)] focus:ring-1 focus:ring-[color:rgba(77,140,30,0.22)] group-hover:border-zinc-300 dark:border-zinc-700 dark:bg-zinc-900 dark:focus:border-[color:rgba(124,194,46,0.45)]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Profile Photo Section */}
        <div className="rounded-xl border border-zinc-200 bg-zinc-50/60 p-5 transition-all hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-800/30 dark:hover:bg-zinc-800/40">
          <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-gray-900 dark:text-zinc-100">
            <ImageIcon className="h-4 w-4 text-[color:rgb(77,140,30)] dark:text-[color:rgb(124,194,46)]" />
            Profile Photo
          </h3>
          <div className="space-y-1.5">
            <div className="flex items-start gap-4">
              <div className="flex-1">
                <div className="relative group">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 transition-colors group-focus-within:text-[color:rgb(77,140,30)] dark:group-focus-within:text-[color:rgb(124,194,46)]">
                    <ImageIcon className="h-4 w-4 text-gray-400 group-focus-within:text-[color:rgb(77,140,30)] dark:text-zinc-500 dark:group-focus-within:text-[color:rgb(124,194,46)]" />
                  </div>
                  <Input
                    id="photo"
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      onChange("photo", e.target.files?.[0] ?? null)
                    }
                    className="h-10 w-full cursor-pointer rounded-lg border border-zinc-200 bg-white pl-10 pt-1.5 text-sm text-zinc-600 file:mr-4 file:rounded-md file:border-0 file:bg-[color:rgba(124,194,46,0.18)] file:px-3 file:py-1 file:text-xs file:font-semibold file:text-[color:rgb(77,140,30)] hover:file:bg-[color:rgba(124,194,46,0.26)] transition-all focus:border-[color:rgba(77,140,30,0.45)] focus:ring-1 focus:ring-[color:rgba(77,140,30,0.22)] group-hover:border-zinc-300 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:file:bg-[color:rgba(124,194,46,0.16)] dark:file:text-[color:rgb(124,194,46)]"
                  />
                </div>
                <p className="mt-2 text-xs text-gray-400 dark:text-zinc-500">
                  Recommended: Square JPG, PNG or GIF, at least 400x400 pixels.
                </p>
              </div>

              {previewUrl && (
                <div className="shrink-0">
                  <div className="relative h-16 w-16 overflow-hidden rounded-lg border border-zinc-200 shadow-sm ring-2 ring-white dark:border-zinc-700 dark:ring-zinc-900">
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </form>
    </Modal>
  );
}
