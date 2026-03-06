import {
  LayoutDashboard,
  Sprout,
  ReceiptIndianRupee,
  Settings,
} from "lucide-react";

export const sidebarNavigation = [
  { name: "Overview", href: "/investor", icon: LayoutDashboard },
  { name: "My Investments", href: "/investor/my-investments", icon: ReceiptIndianRupee },
  { name: "Projects", href: "/investor/projects", icon: Sprout },
 
  // { name: "Settings", href: "/investor/settings", icon: Settings },
];

