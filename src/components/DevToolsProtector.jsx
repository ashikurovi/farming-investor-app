"use client";

import { useEffect, useRef } from "react";
import { toast } from "sonner";
import { Bug } from "lucide-react";
import { useRouter } from "next/navigation";

export function DevToolsProtector() {
  const toastIdRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    // Disable in development if needed, but since user requested it, let's keep it active.
    // If you need to debug, comment out the DevToolsProtector in layout.js

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
      // Play the sound!
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

    // Advanced: Devtools detection using debugger trap
    // This will pause execution if devtools is open
    const devtoolsDetector = setInterval(() => {
      const before = new Date().getTime();
      debugger; // eslint-disable-line no-debugger
      const after = new Date().getTime();
      if (after - before > 100) {
        // Means devtools was open and caught the debugger
        showFunnyWarning();
      }
    }, 2000);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("contextmenu", handleContextMenu);
      clearInterval(devtoolsDetector);
    };
  }, []);

  return null;
}
