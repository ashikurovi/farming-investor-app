"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Play,
  ShieldCheck,
  Leaf,
  BarChart3,
  Globe2,
  CircleArrowRight,
  X,
} from "lucide-react";

const VIDEO_SRC = "/farmvideo.mov";

const FEATURES = [
  {
    icon: ShieldCheck,
    title: "Certified Organic Standards",
    desc: "All produce meets international organic certification — verified at every growth stage.",
  },
  {
    icon: Leaf,
    title: "Sustainable Farming Practices",
    desc: "Regenerative soil methods that protect ecosystems while maximising yield.",
  },
  {
    icon: BarChart3,
    title: "Traceable Farm-To-Market Process",
    desc: "Full supply-chain transparency from seed to shelf, backed by real-time data.",
  },
  {
    icon: Globe2,
    title: "Global Export Compliance",
    desc: "Seamless cross-border logistics with documentation for 40+ markets worldwide.",
  },
];

export default function HomeWhyChooseUs() {
  const [videoOpen, setVideoOpen] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    if (!videoOpen) return;
    const t = setTimeout(() => {
      videoRef.current?.play?.();
    }, 0);
    return () => clearTimeout(t);
  }, [videoOpen]);

  return (
    <section className="relative py-12 sm:py-16 overflow-hidden">
      {/* ── Subtle decorative blobs ── */}
      <div className="pointer-events-none absolute -top-32 -left-32 h-[500px] w-[500px] rounded-full bg-[var(--brand-from,#4d8c1e)]/6 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 h-[400px] w-[400px] rounded-full bg-[var(--brand-to,#7cc22e)]/8 blur-[100px]" />

      {/* ══════════════ VIDEO LIGHTBOX MODAL ══════════════ */}
      {videoOpen && (
        <div
          className="fixed inset-0 z-[999] flex items-center justify-center bg-black/85 backdrop-blur-sm px-4"
          onClick={() => setVideoOpen(false)}
        >
          <div
            className="relative w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setVideoOpen(false)}
              className="absolute -top-11 right-0 flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-sm font-semibold text-white/90 hover:bg-white/20 transition-colors"
            >
              <X className="h-4 w-4" />
              Close
            </button>

            {/* 16:9 video */}
            <div
              className="relative w-full overflow-hidden rounded-2xl shadow-2xl"
              style={{ paddingBottom: "56.25%" }}
            >
              <video
                ref={videoRef}
                className="absolute inset-0 h-full w-full"
                src={VIDEO_SRC}
                controls
                autoPlay
                playsInline
              />
            </div>
          </div>
        </div>
      )}

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* ══════════════ VIDEO HERO CARD ══════════════ */}
        <div className="relative overflow-hidden rounded-[28px] shadow-[0_32px_80px_-20px_rgba(77,140,30,0.22)] ring-1 ring-black/6">
          <button
            onClick={() => setVideoOpen(true)}
            className="group relative block w-full text-left cursor-pointer"
            aria-label="Watch our farming video"
          >
            {/* dark overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/25 to-black/5 z-10 transition-opacity duration-300 group-hover:from-black/70" />

            <Image
              src="/insestop1.png"
              alt="Greenhouse farming"
              width={1600}
              height={900}
              sizes="(min-width: 1024px) 960px, 100vw"
              className="h-[210px] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03] sm:h-[320px] lg:h-[380px]"
              priority
            />

            {/* centred content */}
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-5 px-4 text-center sm:px-6">
              {/* play button */}
              <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-white/20 ring-1 ring-white/40 backdrop-blur-md transition-all duration-300 group-hover:scale-110 group-hover:bg-white/30 sm:h-[76px] sm:w-[76px]">
                <div className="absolute -inset-5 rounded-full bg-white/10 blur-xl" />
                <Play className="relative h-6 w-6 fill-white text-white sm:h-8 sm:w-8" />
              </div>

              <h3 className="max-w-2xl text-xl font-bold leading-snug text-white drop-shadow sm:text-3xl lg:text-4xl">
                Organic Farming Pricing Designed&nbsp;For Growing Businesses
              </h3>

              {/* CTA pill */}
              <div className="inline-flex items-center gap-2 rounded-full bg-[linear-gradient(135deg,var(--brand-from,#4d8c1e),var(--brand-to,#7cc22e))] px-5 py-2.5 text-[12px] font-bold tracking-wide text-white shadow-[0_12px_36px_-12px_rgba(77,140,30,0.7)] transition-opacity group-hover:opacity-90">
                Book Now — It&apos;s Free!
                <ArrowRight className="h-4 w-4" />
              </div>
            </div>
          </button>
        </div>

        {/* ══════════════ WHY CHOOSE US ══════════════ */}
        <div className="mt-10 sm:mt-14">
          {/* section label */}
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-[linear-gradient(90deg,var(--brand-from,#4d8c1e),var(--brand-to,#7cc22e))]" />
            <span className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[var(--brand-from,#4d8c1e)]">
              Why Choose Us
            </span>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-start">
            {/* LEFT — headline + image card */}
            <div>
              <h2 className="mt-4 home-title leading-tight">
                Why Global Partners Choose{" "}
                <span className="bg-clip-text text-transparent bg-[linear-gradient(135deg,var(--brand-from,#4d8c1e),var(--brand-to,#7cc22e))]">
                  Botanix Organic
                </span>{" "}
                Services
              </h2>

              <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-zinc-500">
                Semper pellentesque blandit tincidunt primis suspendisse feugiat
                dictumst. Phasellus metus libero auctor luctus sollicitudin nam
                maecenas.
              </p>

              {/* image feature card */}
              <div className="mt-8 overflow-hidden rounded-3xl ring-1 ring-zinc-100 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.12)]">
                <div className="relative">
                  <Image
                    src="/farm.png"
                    alt="Farm operations"
                    width={900}
                    height={500}
                    sizes="(min-width: 1024px) 40vw, 100vw"
                    className="h-52 w-full object-cover"
                  />
                  <div className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-[linear-gradient(135deg,var(--brand-from,#4d8c1e),var(--brand-to,#7cc22e))] px-3 py-1 text-[11px] font-bold text-white shadow-lg">
                    <Leaf className="h-3.5 w-3.5" />
                    Premium Quality
                  </div>
                </div>
                <div className="flex items-center justify-between gap-3 bg-white px-5 py-4">
                  <div>
                    <p className="text-sm font-bold text-zinc-800">
                      Consistent Premium Quality
                    </p>
                    <p className="mt-1 text-[12px] leading-relaxed text-zinc-400">
                      Proin parturient dictumst sodales arcu vulputate lacinia
                      senectus
                    </p>
                  </div>
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(135deg,var(--brand-from,#4d8c1e),var(--brand-to,#7cc22e))] text-white shadow-[0_8px_24px_-8px_rgba(77,140,30,0.5)]">
                    <CircleArrowRight className="h-5 w-5" />
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT — feature list */}
            <div className="flex flex-col gap-4">
              {FEATURES.map(({ icon: Icon, title, desc }) => (
                <div
                  key={title}
                  className="group flex items-start gap-4 rounded-2xl border border-zinc-100 bg-white px-5 py-5 shadow-[0_4px_24px_-8px_rgba(0,0,0,0.07)] transition-all duration-300 hover:border-[var(--brand-to,#7cc22e)]/40 hover:shadow-[0_8px_32px_-8px_rgba(77,140,30,0.15)]"
                >
                  <div className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[linear-gradient(135deg,var(--brand-from,#4d8c1e),var(--brand-to,#7cc22e))] text-white shadow-[0_8px_20px_-8px_rgba(77,140,30,0.45)] transition-transform duration-300 group-hover:scale-110">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-zinc-800">{title}</p>
                    <p className="mt-1 text-[12px] leading-relaxed text-zinc-400">
                      {desc}
                    </p>
                  </div>
                  <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-zinc-300 transition-all duration-300 group-hover:translate-x-1 group-hover:text-[var(--brand-to,#7cc22e)]" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
