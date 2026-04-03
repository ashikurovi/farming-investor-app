import Sidebar from "./components/Sidebar";
import TopNavbar from "./components/TopNavbar";
import { ThemeProvider } from "@/lib/ThemeContext";

export const metadata = {
  title: "Investor Dashboard | Framing Investor App",
};

export default function InvestorLayout({ children }) {
  return (
    <ThemeProvider>
      <div className="flex h-screen overflow-hidden bg-background text-foreground">
        <Sidebar />
        <div className="flex flex-1 flex-col overflow-hidden">
          <TopNavbar />
          <main className="flex-1 overflow-y-auto px-6 py-6 pb-[calc(env(safe-area-inset-bottom)+6rem)] lg:px-10 lg:py-8 lg:pb-8">
            {children}
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
}
