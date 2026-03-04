import {
  LayoutDashboard,
  Users,
  Sprout,
  ReceiptIndianRupee,
  Images,
  Image,
  Percent,
  MessageCircle,
} from "lucide-react";

export const sidebarNavigation = [
  { name: "Overview", href: "/admin", icon: LayoutDashboard },
  { name: "Investors", href: "/admin/investor", icon: Users },
  { name: "Projects", href: "/admin/projects", icon: Sprout },
  { name: "Investments", href: "/admin/investment", icon: ReceiptIndianRupee },
  { name: "Glarry", href: "/admin/glarry", icon: Images },
  { name: "Banners", href: "/admin/banner", icon: Image },
  { name: "Investor Types", href: "/admin/investor-type", icon: Percent },
  { name: "Contact", href: "/admin/contact", icon: MessageCircle },

];

