"use client";

import dynamic from "next/dynamic";

const Sidebar = dynamic(() => import("./components/Sidebar"), { ssr: false });
const TopNavbar = dynamic(() => import("./components/TopNavbar"), {
  ssr: false,
});

export default function AdminChrome({ children }) {
  return (
    <div className="relative flex h-screen overflow-hidden bg-[#f6f7f4] text-zinc-900 transition-colors duration-300 dark:bg-zinc-950 dark:text-zinc-100">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full bg-[color:rgba(124,194,46,0.22)] blur-3xl" />
        <div className="absolute -bottom-44 -left-44 h-[560px] w-[560px] rounded-full bg-[color:rgba(77,140,30,0.18)] blur-3xl" />
        <div className="absolute inset-0 opacity-30 [background:radial-gradient(circle_at_1px_1px,rgba(77,140,30,0.14)_1px,transparent_1px)] [background-size:18px_18px]" />
      </div>
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <TopNavbar />
        <main className="flex-1 overflow-y-auto px-6 py-6 lg:px-10 lg:py-8">
          {children}
        </main>
      </div>
    </div>
  );
}
