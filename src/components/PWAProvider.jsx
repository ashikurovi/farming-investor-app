"use client";

import { useEffect, useState } from "react";
import { X, Smartphone, Share, PlusSquare } from "lucide-react";

export function PWAProvider() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(true);
  const [showBanner, setShowBanner] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [showIOSInstructions, setShowIOSInstructions] = useState(false);

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker.register("/sw.js").catch((err) => {
          console.log("Service Worker registration failed: ", err);
        });
      });
    }

    const isAppStandalone = window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone;
    setIsStandalone(isAppStandalone);
    
    const hasDismissed = localStorage.getItem("pwa-prompt-dismissed");
    if (hasDismissed) {
      setDismissed(true);
    }

    const isIosDevice = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    setIsIOS(isIosDevice);

    if (isIosDevice && !isAppStandalone && !hasDismissed) {
      const t = setTimeout(() => setShowBanner(true), 1500);
      return () => clearTimeout(t);
    }

    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      if (!isAppStandalone && !hasDismissed) {
        setShowBanner(true);
      }
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (isIOS) {
      setShowIOSInstructions(true);
      return;
    }

    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === "accepted") {
      setShowBanner(false);
      setDeferredPrompt(null);
    }
  };

  const handleDismiss = () => {
    setShowBanner(false);
    setShowIOSInstructions(false);
    setDismissed(true);
    localStorage.setItem("pwa-prompt-dismissed", "true");
  };

  // Only render visual parts if not standalone, not dismissed, and banner should show.
  if (isStandalone || dismissed || !showBanner) {
    return null;
  }

  return (
    <>
      <div className="fixed bottom-[85px] left-4 right-4 z-50 md:hidden animate-in slide-in-from-bottom-4 shadow-xl shadow-emerald-900/10 rounded-2xl bg-white border border-emerald-100 p-4 pb-4 dark:bg-zinc-900 dark:border-zinc-800 dark:shadow-black/50">
        <div className="flex items-start justify-between gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white shrink-0">
            <Smartphone className="h-5 w-5" />
          </div>
          <div className="flex-1 pt-0.5">
            <h4 className="text-[13px] font-bold text-zinc-900 dark:text-zinc-100">
              Install Artman Agro
            </h4>
            <p className="text-[11px] text-zinc-500 font-medium leading-tight mt-0.5 pr-2 dark:text-zinc-400">
              Add app to your home screen for an optimized, persistent experience.
            </p>
          </div>
          <button 
            type="button"
            onClick={handleDismiss}
            className="h-6 w-6 -mr-1 -mt-1 rounded-full flex items-center justify-center text-zinc-400 hover:bg-zinc-100 shrink-0 transition-colors dark:hover:bg-zinc-800"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
        
        <div className="mt-3.5 flex gap-2">
          <button
            type="button"
            onClick={handleInstallClick}
            className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-3 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-emerald-500 transition-colors"
          >
            Install App
          </button>
        </div>
      </div>

      {showIOSInstructions && isIOS && (
        <div className="fixed inset-0 z-[60] flex items-end justify-center bg-black/60 backdrop-blur-sm sm:items-center p-4 animate-in fade-in" onClick={() => setShowIOSInstructions(false)}>
          <div className="w-full max-w-sm bg-white rounded-[2rem] p-6 shadow-2xl dark:bg-zinc-900 animate-in slide-in-from-bottom-10" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">Install on iOS</h3>
              <button type="button" onClick={() => setShowIOSInstructions(false)} className="rounded-full p-2 bg-zinc-100 text-zinc-500 hover:bg-zinc-200 transition-colors dark:bg-zinc-800 dark:text-zinc-400">
                <X className="h-4 w-4" />
              </button>
            </div>
            
            <div className="space-y-6 px-1">
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 bg-zinc-50 rounded-2xl flex items-center justify-center shrink-0 border border-zinc-100 dark:bg-zinc-800/50 dark:border-zinc-800">
                  <Share className="h-6 w-6 text-blue-500 relative top-[-2px]" />
                </div>
                <p className="text-sm font-medium text-zinc-600 leading-snug dark:text-zinc-400">
                  1. Tap the <strong className="text-zinc-900 dark:text-zinc-100 font-bold">Share</strong> button at the bottom of Safari.
                </p>
              </div>

              <div className="flex items-center gap-5">
                <div className="w-12 h-12 bg-zinc-50 rounded-2xl flex items-center justify-center shrink-0 border border-zinc-100 dark:bg-zinc-800/50 dark:border-zinc-800">
                  <PlusSquare className="h-6 w-6 text-zinc-700 dark:text-zinc-300" />
                </div>
                <p className="text-sm font-medium text-zinc-600 leading-snug dark:text-zinc-400">
                  2. Scroll down and tap <strong className="text-zinc-900 dark:text-zinc-100 font-bold">Add to Home Screen</strong>.
                </p>
              </div>
            </div>

            <button 
              type="button"
              onClick={() => setShowIOSInstructions(false)}
              className="mt-8 w-full rounded-2xl bg-zinc-900 py-3.5 text-sm font-semibold text-white hover:bg-zinc-800 transition-colors dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100"
            >
              Okay, got it
            </button>
          </div>
        </div>
      )}
    </>
  );
}
