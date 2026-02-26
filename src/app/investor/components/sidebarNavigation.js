import {
  LayoutDashboard,
  Sprout,
  ReceiptIndianRupee,
  Settings,
} from "lucide-react";

export const sidebarNavigation = [
  { name: "Overview", href: "/investor", icon: LayoutDashboard },
  { name: "My farms", href: "/investor/farms", icon: Sprout },
  {
    name: "Transactions",
    href: "/investor/transactions",
    icon: ReceiptIndianRupee,
  },
  { name: "Settings", href: "/investor/settings", icon: Settings },
];

