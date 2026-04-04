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

export const metadata = {
  title: "Framing Investor App | Xinzo",
  description: "Framing Investor App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${baiJamjuree.variable} antialiased font-sans`}
        suppressHydrationWarning={true}
      >
        <PWAProvider />
        <ReduxProvider>
          <ToasterProvider />
          <AppShell>{children}</AppShell>
          <WhatsAppButton />
        </ReduxProvider>
      </body>
    </html>
  );
}
