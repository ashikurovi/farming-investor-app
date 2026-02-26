import {
  LayoutDashboard,
  Users,
  Sprout,
  ReceiptIndianRupee,
  Settings,
} from "lucide-react";

export const sidebarNavigation = [
  { name: "Overview", href: "/admin", icon: LayoutDashboard },
  { name: "Investors", href: "/admin/investors", icon: Users },
  { name: "Farms", href: "/admin/farms", icon: Sprout },
  {
    name: "Transactions",
    href: "/admin/transactions",
    icon: ReceiptIndianRupee,
  },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

