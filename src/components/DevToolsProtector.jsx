"use client";

import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { Bug, RefreshCw } from "lucide-react";
import { useRouter } from "next/navigation";

export function DevToolsProtector() {
  const [isBlocked, setIsBlocked] = useState(false);
  const toastIdRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    // Disable in development if needed, but since user requested it, let's keep it active.

    const fallbackSound = () => {
      try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) return;
        const ctx = new AudioContext();

        const osc = ctx.createOscillator();
        const gainNode = ctx.createGain();
        const lfo = ctx.createOscillator();
        const lfoGain = ctx.createGain();

        lfo.type = "sine";
        lfo.frequency.value = 40;
        lfoGain.gain.value = 20;

        lfo.connect(lfoGain);
        lfoGain.connect(osc.frequency);

        osc.connect(gainNode);
        gainNode.connect(ctx.destination);

        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(90, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(15, ctx.currentTime + 0.8);

        gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.8);

        lfo.start(ctx.currentTime);
        osc.start(ctx.currentTime);

        lfo.stop(ctx.currentTime + 0.8);
        osc.stop(ctx.currentTime + 0.8);
      } catch (err) {
        // Ignore fallback error
      }
    };

    const playFunnySound = () => {
      try {
        // The exact viral "Faah" meme sound the user requested
        const viralAudio = new window.Audio("https://www.myinstants.com/media/sounds/faah.mp3");
        viralAudio.volume = 1.0;
        const playPromise = viralAudio.play();

        if (playPromise !== undefined) {
          playPromise.catch(() => {
            // Autoplay blocked or network error, use fallback
            fallbackSound();
          });
        }
      } catch (e) {
        fallbackSound();
      }
    };

    const showFunnyWarning = () => {
      setIsBlocked(true);
      playFunnySound();

      // Prevent spamming the toast
      if (toastIdRef.current) {
        toast.dismiss(toastIdRef.current);
      }

      toastIdRef.current = toast("Bhai ki shomoshaa? 😂", {
        description: "Kono dorkar hole direct contact koro, devtools diye ki hobe?🕵️‍♂️🤫",
        icon: <Bug className="h-5 w-5 text-rose-500" />,
        duration: 6000,
        action: {
          label: "Contact Us 📞",
          onClick: () => router.push("/landing/contact"),
        },
        style: {
          background: "#fff1f2",
          border: "2px solid #fda4af",
          color: "#be123c",
          fontWeight: "600"
        },
      });
    };

    const handleKeyDown = (e) => {
      // F12
      if (e.keyCode === 123) {
        e.preventDefault();
        showFunnyWarning();
      }

      // Ctrl+Shift+I / Cmd+Option+I (Inspect)
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.keyCode === 73) {
        e.preventDefault();
        showFunnyWarning();
      }

      // Ctrl+Shift+J / Cmd+Option+J (Console)
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.keyCode === 74) {
        e.preventDefault();
        showFunnyWarning();
      }

      // Ctrl+Shift+C / Cmd+Option+C (Elements)
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.keyCode === 67) {
        e.preventDefault();
        showFunnyWarning();
      }

      // Ctrl+U / Cmd+U (View Source)
      if ((e.ctrlKey || e.metaKey) && e.keyCode === 85) {
        e.preventDefault();
        showFunnyWarning();
      }
    };

    const handleContextMenu = (e) => {
      e.preventDefault();
      showFunnyWarning();
    };

    // Attach listeners
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("contextmenu", handleContextMenu);

    const checkDevTools = () => {
      // 1. Window dimension check (for docked DevTools)
      const threshold = 160;
      if (
        window.outerWidth - window.innerWidth > threshold ||
        window.outerHeight - window.innerHeight > threshold
      ) {
        return true;
      }
      
      // 2. Debugger trap check
      const before = new Date().getTime();
      debugger; // eslint-disable-line no-debugger
      const after = new Date().getTime();
      if (after - before > 100) {
        return true;
      }
      
      return false;
    };

    const devtoolsDetector = setInterval(() => {
      if (!isBlocked && checkDevTools()) {
        showFunnyWarning();
      }
    }, 1000);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("contextmenu", handleContextMenu);
      clearInterval(devtoolsDetector);
    };
  }, [isBlocked]); // Re-bind effect if isBlocked changes to stop interval checking if already blocked

  if (isBlocked) {
    return (
      <div className="fixed inset-0 z-[99999] bg-[#0a1610] flex flex-col items-center justify-center p-6 text-center select-none backdrop-blur-md">
        <Bug className="h-16 w-16 text-rose-500 mb-6 animate-bounce" />
        <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4 tracking-wider">
          Oops! Access Denied 🕵️‍♂️
        </h1>
        <p className="text-white/60 max-w-md text-base md:text-lg mb-8 leading-relaxed">
          Developer tools are not allowed on this platform. Please close the inspector and refresh the page to continue using the application.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white rounded-xl font-bold shadow-xl shadow-rose-500/20 transition-all hover:-translate-y-1 active:translate-y-0"
        >
          <RefreshCw className="h-5 w-5" />
          Refresh Page
        </button>
      </div>
    );
  }

  return null;
}
