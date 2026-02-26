import Sidebar from "./components/Sidebar";
import TopNavbar from "./components/TopNavbar";

export const metadata = {
  title: "Admin Dashboard | Framing Investor App",
};

export default function AdminLayout({ children }) {
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

