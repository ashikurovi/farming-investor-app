import {
  LayoutDashboard,
  Users,
  Sprout,
  Briefcase,
  ReceiptIndianRupee,
  Images,
  Image as ImageIcon,
  Percent,
  MessageCircle,
  Settings2,
  ClipboardList,
  Library,
  Settings,
  FileText,
  LifeBuoy,
} from "lucide-react";

export const sidebarNavigation = [
  { type: "link", name: "Overview", href: "/admin", icon: LayoutDashboard },

  {
    type: "group",
    title: "Management",
    icon: ClipboardList,
    items: [
      { name: "Partners", href: "/admin/partner", icon: Briefcase },
      { name: "Investors", href: "/admin/investor", icon: Users },

      {
        name: "Investments",
        href: "/admin/investment",
        icon: ReceiptIndianRupee,
      },
      { name: "Projects", href: "/admin/projects", icon: Sprout },

      { name: "Notices", href: "/admin/notice", icon: FileText },
      { name: "Deeds", href: "/admin/deed", icon: FileText },
    ],
  },

  {
    type: "group",
    title: "Media",
    icon: Library,
    items: [
      { name: "Glarry", href: "/admin/glarry", icon: Images },
      { name: "Banners", href: "/admin/banner", icon: ImageIcon },
      { name: "Footer", href: "/admin/footer", icon: Settings2 },
    ],
  },

  {
    type: "group",
    title: "Configuration",
    icon: Settings,
    items: [
      {
        name: "Investor Types",
        href: "/admin/investor-type",
        icon: Percent,
      },
      {
        name: "Investment Amount",
        href: "/admin/invest-amount",
        icon: ReceiptIndianRupee,
      },
    ],
  },

  {
    type: "group",
    title: "Support",
    icon: LifeBuoy,
    items: [{ name: "Contact", href: "/admin/contact", icon: MessageCircle }],
  },
];
