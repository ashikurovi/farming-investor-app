"use client";

import dynamic from "next/dynamic";

const Sidebar = dynamic(() => import("./components/Sidebar"), { ssr: false });
<<<<<<< HEAD
const TopNavbar = dynamic(() => import("./components/TopNavbar"), { ssr: false });

export default function AdminChrome({ children }) {
  return (
    <div className="flex h-screen overflow-hidden bg-zinc-100 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100 transition-colors duration-300">
=======
const TopNavbar = dynamic(() => import("./components/TopNavbar"), {
  ssr: false,
});

export default function AdminChrome({ children }) {
  return (
    <div className="flex h-screen overflow-hidden ">
>>>>>>> c2c2563 (Investor sidebar topnavbar api call curret user data show aand ui primume type)
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
