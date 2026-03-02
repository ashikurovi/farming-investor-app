import { Bai_Jamjuree } from "next/font/google";
import "./globals.css";
import { ReduxProvider } from "./providers";
import { ToastProvider } from "@/components/ui/toast";
import { AppShell } from "@/app/AppShell";

const baiJamjuree = Bai_Jamjuree({
  variable: "--font-bai-jamjuree",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
});

export const metadata = {
  title: "Framing Investor App",
  description: "Framing Investor App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${baiJamjuree.variable} antialiased font-sans`}
      >
        <ReduxProvider>
          <ToastProvider>
            <AppShell>{children}</AppShell>
          </ToastProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
