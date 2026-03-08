 "use client";
 
 import dynamic from "next/dynamic";
 
 const Sidebar = dynamic(() => import("./components/Sidebar"), { ssr: false });
 const TopNavbar = dynamic(() => import("./components/TopNavbar"), { ssr: false });
 
 export default function AdminChrome({ children }) {
   return (
     <div className="flex min-h-screen bg-zinc-100 text-zinc-900">
       <Sidebar />
       <div className="flex flex-1 flex-col">
         <TopNavbar />
         <main className="flex-1 overflow-y-auto px-6 py-6 lg:px-10 lg:py-8">
           {children}
         </main>
       </div>
     </div>
   );
 }
