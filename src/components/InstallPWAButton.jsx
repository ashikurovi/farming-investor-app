"use client";

import { useState, useEffect } from "react";
import { Download, Info, Smartphone } from "lucide-react";

export default function InstallPWAButton({ collapsed, variant = "default", className = "" }) {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [showIOSPrompt, setShowIOSPrompt] = useState(false);

  useEffect(() => {
    // Check if device is iOS
    const isIosDevice =
      /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    setIsIOS(isIosDevice);

    // Check if the app is already installed
    const isAppStandalone = window.matchMedia("(display-mode: standalone)").matches || navigator.standalone;
    setIsStandalone(isAppStandalone);

    const handleBeforeInstallPrompt = (e) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later.
      setDeferredPrompt(e);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (isIOS) {
      setShowIOSPrompt(true);
      setTimeout(() => setShowIOSPrompt(false), 5000);
      return;
    }

    if (!deferredPrompt) {
      return;
    }

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      setDeferredPrompt(null);
    }
  };

  if (isStandalone || (!deferredPrompt && !isIOS)) {
    return null;
  }

  const isLanding = variant === "landing";

  const buttonClasses = isLanding
    ? "inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-2.5 text-white font-semibold tracking-wider text-sm transition-all duration-300 border border-white/35 bg-white/10 hover:bg-white/15 hover:border-white/50 backdrop-blur-sm group"
    : `group flex items-center justify-center gap-2 rounded-xl border transition-all duration-200 text-xs font-semibold shadow-sm border-[color:var(--brand-from)] bg-gradient-to-r from-primary/10 to-primary/5 text-primary hover:border-primary/50 hover:bg-primary/20 hover:shadow-md ${
        collapsed ? "w-10 h-10 mx-auto px-0" : "w-full py-2.5 px-3"
      }`;

  return (
    <div className={`relative ${isLanding ? "" : "mt-2"} ${className}`}>
      <button
        type="button"
        className={buttonClasses}
        onClick={handleInstallClick}
      >
        <Smartphone className="h-5 w-5 shrink-0 transition-transform duration-200 group-hover:scale-110" />
        {!collapsed && <span>Install App</span>}
      </button>

      {showIOSPrompt && isIOS && !collapsed && (
        <div className="absolute bottom-full left-0 mb-3 w-64 p-3 bg-zinc-900 text-white text-[11px] rounded-xl leading-relaxed shadow-xl z-50 animate-in fade-in dark:bg-zinc-100 dark:text-zinc-900 border border-zinc-800 dark:border-zinc-200">
          <div className="flex gap-2 items-start">
            <Info className="h-4 w-4 shrink-0 mt-0.5 text-blue-400 dark:text-blue-600" />
            <p>
              To install: tap the <strong>Share</strong> icon below, then select <strong>Add to Home Screen</strong>.
            </p>
          </div>
          <div className="absolute -bottom-1.5 left-10 w-3 h-3 bg-zinc-900 border-b border-r border-zinc-800 rotate-45 dark:bg-zinc-100 dark:border-zinc-200"></div>
        </div>
      )}
    </div>
  );
}
