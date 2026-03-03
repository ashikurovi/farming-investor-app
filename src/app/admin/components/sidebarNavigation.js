import {
  LayoutDashboard,
  Users,
  Sprout,
  ReceiptIndianRupee,
  Wallet2,
  Settings,
  Calendar,
} from "lucide-react";

export const sidebarNavigation = [
  { name: "Overview", href: "/admin", icon: LayoutDashboard },
  { name: "Investors", href: "/admin/investor", icon: Users },
  { name: "Projects", href: "/admin/projects", icon: Sprout },
  { name: "Investments", href: "/admin/investment", icon: ReceiptIndianRupee },
  { name: "Periods", href: "/admin/period", icon: Calendar },

];

