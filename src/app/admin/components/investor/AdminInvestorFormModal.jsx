import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";

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
      title={editingUser ? "Edit investor" : "Add new investor"}
      description="Use the same clean input styles as the rest of the app."
      size="md"
      footer={
        <div className="flex items-center justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="h-9 rounded-full border-zinc-200 text-xs"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isCreating || isUpdating}
            className="h-9 rounded-full bg-emerald-600 px-5 text-xs font-semibold uppercase tracking-[0.18em] text-white hover:bg-emerald-500 disabled:opacity-70"
            form="admin-investor-form"
          >
            {editingUser
              ? isUpdating
                ? "Saving..."
                : "Save changes"
              : isCreating
                ? "Creating..."
                : "Create investor"}
          </Button>
        </div>
      }
    >
      <form
        id="admin-investor-form"
        onSubmit={onSubmit}
        className="space-y-4"
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <label
              htmlFor="name"
              className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500"
            >
              Name
            </label>
            <Input
              id="name"
              value={formValues.name}
              onChange={(e) => onChange("name", e.target.value)}
              placeholder="Investor name"
              required
              className="h-10 rounded-xl bg-zinc-50 border-zinc-200 focus:bg-white focus:border-emerald-500 focus:ring-emerald-500/20"
            />
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="email"
              className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500"
            >
              Email
            </label>
            <Input
              id="email"
              type="email"
              value={formValues.email}
              onChange={(e) => onChange("email", e.target.value)}
              placeholder="name@example.com"
              required
              className="h-10 rounded-xl bg-zinc-50 border-zinc-200 focus:bg-white focus:border-emerald-500 focus:ring-emerald-500/20"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <label
              htmlFor="phone"
              className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500"
            >
              Phone (optional)
            </label>
            <Input
              id="phone"
              value={formValues.phone}
              onChange={(e) => onChange("phone", e.target.value)}
              placeholder="+8801..."
              className="h-10 rounded-xl bg-zinc-50 border-zinc-200 focus:bg-white focus:border-emerald-500 focus:ring-emerald-500/20"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <label
              htmlFor="role"
              className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500"
            >
              Role
            </label>
            <select
              id="role"
              value={formValues.role}
              onChange={(e) => onChange("role", e.target.value)}
              className="flex h-10 w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm text-zinc-700 transition-all focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
            >
              <option value="investor">Investor</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="investorTypeId"
              className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500"
            >
              Investor type
            </label>
            <select
              id="investorTypeId"
              value={formValues.investorTypeId}
              onChange={(e) => onChange("investorTypeId", e.target.value)}
              disabled={isInvestorTypesLoading}
              className="flex h-10 w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm text-zinc-700 transition-all focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
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

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <label
              htmlFor="password"
              className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500"
            >
              {editingUser ? "Password (optional)" : "Password"}
            </label>
            <Input
              id="password"
              type="password"
              value={formValues.password}
              onChange={(e) => onChange("password", e.target.value)}
              placeholder={
                editingUser ? "Leave blank to keep current" : "••••••••"
              }
              required={!editingUser}
              className="h-10 rounded-xl bg-zinc-50 border-zinc-200 focus:bg-white focus:border-emerald-500 focus:ring-emerald-500/20"
            />
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="photo"
              className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500"
            >
              Photo (optional)
            </label>
            <Input
              id="photo"
              type="file"
              accept="image/*"
              onChange={(e) =>
                onChange("photo", e.target.files?.[0] ?? null)
              }
              className="h-10 cursor-pointer rounded-xl border-zinc-200 bg-zinc-50 file:mr-3 file:rounded-lg file:border-0 file:bg-emerald-600 file:px-3 file:py-1.5 file:text-xs file:font-semibold file:uppercase file:tracking-[0.16em] file:text-white hover:file:bg-emerald-500"
            />
            {previewUrl && (
              <div className="mt-3 flex items-center gap-3 rounded-2xl border border-dashed border-zinc-200 bg-zinc-50/80 p-3">
                <div className="h-14 w-14 overflow-hidden rounded-xl border border-zinc-200 bg-white">
                  <img
                    src={previewUrl}
                    alt="Investor preview"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="space-y-0.5">
                  <p className="text-xs font-medium text-zinc-700">
                    Profile preview
                  </p>
                  <p className="text-[11px] text-zinc-400">
                    This is how the investor avatar will appear.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </form>
    </Modal>
  );
}

