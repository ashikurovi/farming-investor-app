import { Bai_Jamjuree } from "next/font/google";
import "./globals.css";
import { ReduxProvider } from "./providers";
import { AppShell } from "@/app/AppShell";
import { ToasterProvider } from "@/components/ToasterProvider";
import WhatsAppButton from "@/components/WhatsAppButton";

const baiJamjuree = Bai_Jamjuree({
  variable: "--font-bai-jamjuree",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
});

import { PWAProvider } from "@/components/PWAProvider";
import { DevToolsProtector } from "@/components/DevToolsProtector";

export const viewport = {
  themeColor: "#4d8c1e",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata = {
  metadataBase: new URL("https://artmanagro.com"),
  title: {
    default: "Artman Agro | Premium Farming Investment Platform",
    template: "%s | Artman Agro",
  },
  description: "Join Artman Agro, the premier platform for agricultural investments. Invest in profitable farming projects, track your portfolio, and earn sustainable returns.",
  keywords: ["agriculture investment", "farming investment", "Artman Agro", "agri-tech", "sustainable farming", "invest in agriculture"],
  authors: [{ name: "Artman Agro" }],
  creator: "Artman Agro",
  publisher: "Artman Agro",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Artman Agro | Premium Farming Investment Platform",
    description: "Join Artman Agro, the premier platform for agricultural investments. Track your portfolio, and earn sustainable returns.",
    url: "https://artmanagro.com",
    siteName: "Artman Agro",
    images: [
      {
        url: "/icons/icon-512x512.png",
        width: 512,
        height: 512,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Artman Agro | Farming Investment",
    description: "Join Artman Agro, the premier platform for agricultural investments.",
    images: ["/icons/icon-512x512.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  manifest: "/manifest.js",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/icons/icon-192x192.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${baiJamjuree.variable} antialiased font-sans`}
        suppressHydrationWarning={true}
      >
        <PWAProvider />
        {/* <DevToolsProtector /> */}
        <ReduxProvider>
          <ToasterProvider />
          <AppShell>{children}</AppShell>
          <WhatsAppButton />

        </ReduxProvider>
      </body>
    </html>
  );
}
