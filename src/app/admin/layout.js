import AdminChrome from "./AdminChrome";
import { ThemeProvider } from "@/lib/ThemeContext";

export const metadata = {
  title: "Admin Dashboard | Framing Investor App",
};

export default function AdminLayout({ children }) {
  return (
    <ThemeProvider>
      <AdminChrome>{children}</AdminChrome>
    </ThemeProvider>
  );
}
