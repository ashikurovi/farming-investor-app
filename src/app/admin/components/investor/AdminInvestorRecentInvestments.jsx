"use client";
import Image from "next/image";
import { useState } from "react";
import { Wallet, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";

const cleanUrl = (u) => (typeof u === "string" ? u.replace(/[`]/g, "").trim() : "");

export function AdminInvestorRecentInvestments({ investments = [] }) {
  const [imageOpen, setImageOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const openImage = (url) => {
    setSelectedImage(url || "");
    setImageOpen(!!url);
  };
  const closeImage = () => {
    setImageOpen(false);
    setSelectedImage("");
  };

  return (
    <div className="rounded-2xl border border-zinc-200 bg-white shadow-sm transition-all hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900">
      <div className="flex items-center justify-between border-b border-zinc-100 bg-zinc-50/50 px-6 py-4 dark:border-zinc-800 dark:bg-zinc-800/40">
        <h3 className="flex items-center gap-2 text-base font-semibold text-zinc-900 dark:text-zinc-100">
          <Wallet className="h-4 w-4 text-[color:rgb(77,140,30)] dark:text-[color:rgb(124,194,46)]" />
          Recent Investments
        </h3>
        <span className="rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs font-medium text-zinc-500 dark:bg-zinc-800 dark:text-zinc-300">
          {investments.length} Projects
        </span>
      </div>
      <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
        {investments.length > 0 ? (
          investments.slice(0, 5).map((inv) => (
            <div
              key={inv.id}
              className="flex items-center justify-between px-6 py-4 transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-800/40"
            >
              <div className="flex items-center gap-4">
                {cleanUrl(inv.photoUrl) ? (
                  <div
                    onClick={() => openImage(cleanUrl(inv.photoUrl))}
                    className="h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-zinc-100 cursor-pointer ring-1 ring-zinc-200 hover:ring-emerald-300 dark:bg-zinc-800 dark:ring-zinc-700"
                  >
                    <Image
                      src={cleanUrl(inv.photoUrl)}
                      alt="Investment Photo"
                      width={40}
                      height={40}
                      className="h-10 w-10 object-cover"
                    />
                  </div>
                ) : (
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-300">
                    <TrendingUp className="h-5 w-5" />
                  </div>
                )}
                <div>
                  <p className="font-medium text-zinc-900 dark:text-zinc-100">
                    {inv.reference || `Investment #${inv.id}`}
                  </p>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    {inv.date
                      ? new Date(inv.date).toLocaleDateString("en-US", { timeZone: "UTC" })
                      : "-"}
                    {inv.time ? ` • ${inv.time}` : ""}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-zinc-900 dark:text-zinc-100">
                  ৳{Number(inv.amount).toLocaleString("en-US")}
                </p>
                <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                  Completed
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="mb-3 rounded-full bg-zinc-50 p-3 dark:bg-zinc-800">
              <Wallet className="h-6 w-6 text-zinc-300 dark:text-zinc-500" />
            </div>
            <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
              No investments found
            </p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              This investor hasn't invested in any projects yet.
            </p>
          </div>
        )}
      </div>
      {investments.length > 5 && (
        <div className="border-t border-zinc-100 bg-zinc-50/30 p-4 text-center dark:border-zinc-800 dark:bg-zinc-800/30">
          <Button
            variant="ghost"
            size="sm"
            className="text-xs text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
          >
            View All Investments
          </Button>
        </div>
      )}
      <Modal isOpen={imageOpen} onClose={closeImage}>
        <div className="p-2">
          {selectedImage ? (
            <Image
              src={selectedImage}
              alt="Investment Photo"
              width={1200}
              height={900}
              className="max-h-[80vh] w-auto object-contain"
            />
          ) : null}
        </div>
      </Modal>
    </div>
  );
}
