"use client";

import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { Camera, ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMeQuery, useUpdateMeMutation } from "@/features/auth/authApiSlice";

export default function AdminProfilePage() {
  const token = useSelector((s) => s.auth?.token);
  const user = useSelector((s) => s.auth?.user);
  useMeQuery(undefined, { skip: !token });

  const [updateMe, { isLoading: isSaving }] = useUpdateMeMutation();

  const displayEmail =
    user?.email || user?.username || user?.phone || "admin@farmingintel.com";

  const initialName = useMemo(() => {
    return user?.name || user?.fullName || "Admin";
  }, [user?.fullName, user?.name]);

  const initialPhotoUrl = useMemo(() => {
    const cleanUrl = (u) =>
      typeof u === "string" ? u.replace(/[`]/g, "").trim() : "";
    return (
      cleanUrl(user?.photoUrl) ||
      cleanUrl(user?.avatarUrl) ||
      cleanUrl(user?.profilePhotoUrl) ||
      ""
    );
  }, [user?.avatarUrl, user?.photoUrl, user?.profilePhotoUrl]);

  const [name, setName] = useState(initialName);
  const [photoFile, setPhotoFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(initialPhotoUrl);

  useEffect(() => {
    setName(initialName);
  }, [initialName]);

  useEffect(() => {
    if (!photoFile) {
      setPreviewUrl(initialPhotoUrl);
      return undefined;
    }
    const url = URL.createObjectURL(photoFile);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [photoFile, initialPhotoUrl]);

  const initials = (name || "FI")
    .trim()
    .slice(0, 2)
    .toUpperCase();

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Name is required");
      return;
    }

    try {
      const form = new FormData();
      form.append("name", name.trim());
      if (photoFile) {
        form.append("photo", photoFile);
      }
      await updateMe(form).unwrap();
      toast.success("Profile updated");
      setPhotoFile(null);
    } catch (error) {
      const message =
        error?.data?.message ||
        (Array.isArray(error?.data?.message) ? error.data.message[0] : null) ||
        "Update failed. Please try again.";
      toast.error("Save failed", { description: message });
    }
  };

  return (
    <div className="mx-auto w-full max-w-4xl space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <Link
              href="/admin"
              className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3 py-1.5 text-xs font-semibold text-zinc-700 shadow-sm transition hover:bg-zinc-50"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Link>
            <div className="inline-flex items-center gap-2 rounded-full border border-[color:rgba(77,140,30,0.25)] bg-[color:rgba(124,194,46,0.10)] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-[color:rgb(77,140,30)]">
              Profile Settings
            </div>
          </div>
          <h1 className="mt-4 text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl">
            Account Profile
          </h1>
          <p className="mt-2 text-sm text-zinc-600">
            Update your display name and profile photo.
          </p>
        </div>
      </div>

      <form
        onSubmit={onSubmit}
        className="overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm"
      >
        <div className="grid grid-cols-1 gap-10 p-6 sm:p-8 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="rounded-3xl border border-zinc-200 bg-zinc-50/60 p-5">
              <div className="flex items-center justify-between">
                <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-zinc-500">
                  Profile Photo
                </div>
                <div className="rounded-full border border-zinc-200 bg-white px-3 py-1 text-[10px] font-semibold text-zinc-600">
                  Admin
                </div>
              </div>

              <div className="mt-5 flex items-center gap-4">
                <div className="relative h-16 w-16 overflow-hidden rounded-2xl border border-zinc-200 bg-white">
                  {previewUrl ? (
                    <img
                      src={previewUrl}
                      alt="Profile"
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = "";
                      }}
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(135deg,var(--brand-from),var(--brand-to))] text-sm font-bold text-white">
                      {initials}
                    </div>
                  )}
                </div>

                <div className="flex-1">
                  <label className="inline-flex cursor-pointer items-center gap-2 rounded-2xl bg-[linear-gradient(135deg,var(--brand-from),var(--brand-to))] px-4 py-2.5 text-xs font-bold uppercase tracking-[0.16em] text-white shadow-[0_18px_55px_-40px_rgba(77,140,30,0.7)] transition hover:brightness-[1.05]">
                    <Camera className="h-4 w-4" />
                    Upload
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) =>
                        setPhotoFile(e.target.files?.[0] ?? null)
                      }
                    />
                  </label>
                  <div className="mt-2 text-[11px] text-zinc-500">
                    PNG/JPG recommended. Max size depends on server limits.
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8">
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-[11px] font-bold uppercase tracking-[0.18em] text-zinc-500">
                    Name
                  </label>
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="h-11 rounded-2xl border-zinc-200 bg-zinc-50 focus-visible:ring-[color:rgba(77,140,30,0.22)] focus-visible:ring-offset-0"
                    placeholder="Your name"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] font-bold uppercase tracking-[0.18em] text-zinc-500">
                    Email
                  </label>
                  <Input
                    value={displayEmail}
                    readOnly
                    className="h-11 cursor-not-allowed rounded-2xl border-zinc-200 bg-zinc-50 text-zinc-500 focus-visible:ring-0 focus-visible:ring-offset-0"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between rounded-3xl border border-zinc-200 bg-zinc-50/60 p-5">
                <div>
                  <div className="text-sm font-bold text-zinc-900">
                    Save changes
                  </div>
                  <div className="mt-1 text-[12px] leading-relaxed text-zinc-600">
                    Your profile updates will be stored in the database.
                  </div>
                </div>
                <Button
                  type="submit"
                  disabled={isSaving}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-3 text-xs font-bold uppercase tracking-[0.18em] disabled:opacity-60"
                >
                  <Save className="h-4 w-4" />
                  {isSaving ? "Saving..." : "Save"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

