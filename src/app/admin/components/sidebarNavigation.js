import {
  LayoutDashboard,
  Users,
  Sprout,
  ReceiptIndianRupee,
  Images,
  Image as ImageIcon,
  Percent,
  MessageCircle,
  Settings2,
  ClipboardList,
  Library,
  Settings,
  LifeBuoy,
} from "lucide-react";

export const sidebarNavigation = [
  { type: "link", name: "Overview", href: "/admin", icon: LayoutDashboard },

  {
    type: "group",
    title: "Management",
    icon: ClipboardList,
    items: [
      { name: "Investors", href: "/admin/investor", icon: Users },
      { name: "Projects", href: "/admin/projects", icon: Sprout },
      {
        name: "Investments",
        href: "/admin/investment",
        icon: ReceiptIndianRupee,
      },
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
    ],
  },

  {
    type: "group",
    title: "Support",
    icon: LifeBuoy,
    items: [{ name: "Contact", href: "/admin/contact", icon: MessageCircle }],
  },
];
