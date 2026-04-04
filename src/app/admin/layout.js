import { DevToolsProtector } from "@/components/DevToolsProtector";
import AdminChrome from "./AdminChrome";
import { ThemeProvider } from "@/lib/ThemeContext";

export const metadata = {
  title: "Admin Dashboard | Framing Investor App",
};

export default function AdminLayout({ children }) {
  return (
    <ThemeProvider>
      {/* <DevToolsProtector /> */}
      <AdminChrome>{children}</AdminChrome>
    </ThemeProvider>
  );
}
