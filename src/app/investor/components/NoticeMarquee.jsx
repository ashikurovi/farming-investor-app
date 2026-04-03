"use client";

import Link from "next/link";
import { useGetNoticesQuery } from "@/features/admin/notice/noticeApiSlice";
import { Megaphone } from "lucide-react";

export function NoticeMarquee() {
  const { data: noticesData, isLoading } = useGetNoticesQuery({
    page: 1,
    limit: 10,
  });

  const notices = noticesData?.items || [];

  if (isLoading || notices.length === 0) {
    return null;
  }

  return (
    <div className="relative mb-6 flex overflow-hidden rounded-2xl border border-[color:rgba(77,140,30,0.22)] bg-secondary p-1 shadow-[0_0_18px_rgba(77,140,30,0.06)] backdrop-blur-sm sm:mb-8 dark:border-zinc-800 dark:shadow-none">
      {/* Decorative gradient glow */}
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-[color:rgba(124,194,46,0.14)] via-[color:rgba(77,140,30,0.08)] to-[color:rgba(124,194,46,0.14)] blur-xl"></div>

      {/* Icon Section - static on the left */}
      <div className="relative z-10 flex shrink-0 items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-[color:var(--brand-from)] to-[color:var(--brand-to)] px-4 py-2 font-semibold text-primary-foreground shadow-sm ring-1 ring-[color:rgba(77,140,30,0.30)]">
        <Megaphone className="h-4 w-4 animate-pulse" />
        <span className="hidden text-xs uppercase tracking-widest sm:block">Notices</span>
      </div>

      {/* Marquee Section */}
      <div className="group relative z-10 mx-2 flex flex-1 items-center overflow-hidden">
        {/* Left/Right fading edges so text disappears smoothly */}
        <div className="pointer-events-none absolute bottom-0 left-0 top-0 z-20 w-8 bg-gradient-to-r from-secondary to-transparent"></div>
        <div className="pointer-events-none absolute bottom-0 right-0 top-0 z-20 w-8 bg-gradient-to-l from-secondary to-transparent"></div>

        <div className="flex animate-[marquee_25s_linear_infinite] whitespace-nowrap group-hover:[animation-play-state:paused] hover:[animation-play-state:paused]">
          {[...notices, ...notices].map((notice, idx) => (
            <Link
              key={`${notice.id}-${idx}`}
              href={`/investor/notice/${notice.id}`}
              className="mr-12 flex items-center gap-2 cursor-pointer transition-opacity hover:opacity-70"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
              <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                {notice.title}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
