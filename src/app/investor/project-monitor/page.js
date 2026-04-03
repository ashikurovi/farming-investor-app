"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Camera,
  Video,
  Activity,
  Sprout,
  ShieldCheck,
  Clock,
  Play,
  LayoutDashboard,
} from "lucide-react";
import { useGetProjectsQuery } from "@/features/admin/projects/projectsApiSlice";
import { NoticeMarquee } from "../components/NoticeMarquee";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";

/* ══════════════════════════════════════════════════
   CCTV LIVE CARD COMPONENT
   ══════════════════════════════════════════════════ */
const ProjectMonitorCard = ({ project, videoUrl }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [camNumber] = useState(() => Math.floor(Math.random() * 9) + 1);

  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play().catch((err) => {
          console.log("Autoplay blocked or failed:", err);
          setIsPlaying(false);
        });
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying]);

  const togglePlay = (e) => {
    e.preventDefault();
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="group relative overflow-hidden rounded-3xl border border-zinc-200/80 bg-white/90 shadow-[0_18px_55px_-48px_rgba(0,0,0,0.45)] ring-1 ring-black/5 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_30px_90px_-70px_rgba(0,0,0,0.55)] hover:ring-[color:rgba(77,140,30,0.22)]">
      {/* Status Bar */}
      <div className="absolute inset-x-0 top-0 h-1.5 bg-[linear-gradient(135deg,var(--brand-from),var(--brand-to))]" />

      {/* CCTV View Container */}
      <div
        className="relative aspect-video overflow-hidden bg-black cursor-pointer"
        onClick={togglePlay}
      >
        {/* Live Video Feed (Simulated) */}
        <video
          ref={videoRef}
          src={
            videoUrl ||
            "https://assets.mixkit.co/videos/preview/mixkit-cows-in-a-green-field-41443-large.mp4"
          }
          autoPlay
          muted
          loop
          playsInline
          className="h-full w-full object-cover opacity-65 grayscale-[0.25] contrast-[1.25] saturate-[0.9]"
        />

        {/* Scanline / Grain Overlay for CCTV effect */}
        <div className="absolute inset-0 z-10 pointer-events-none opacity-20 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] shadow-[inset_0_0_100px_rgba(0,0,0,0.5)]"></div>
        <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-t from-black/70 via-black/10 to-black/25" />

        {/* Interface Overlays */}
        <div className="absolute inset-0 z-20 flex flex-col justify-between p-4 font-mono text-white/80">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span
                  className={`animate-ping absolute inline-flex h-full w-full rounded-full ${isPlaying ? "bg-red-400 opacity-75" : "bg-zinc-400 opacity-20"}`}
                ></span>
                <span
                  className={`relative inline-flex rounded-full h-2 w-2 ${isPlaying ? "bg-red-500" : "bg-zinc-500"}`}
                ></span>
              </span>
              <span className="text-[10px] font-bold tracking-tight">
                {isPlaying ? "REC - LIVE" : "PAUSED"}
              </span>
            </div>
            <div className="text-[10px] bg-black/40 px-2 py-0.5 rounded backdrop-blur-sm border border-white/10 uppercase">
              CAM_0{camNumber}
            </div>
          </div>

          <div className="flex justify-between items-end">
            <div className="text-[9px] bg-black/40 px-2 py-0.5 rounded backdrop-blur-sm border border-white/10">
              {new Date().toLocaleDateString()}{" "}
              {new Date().toLocaleTimeString()}
            </div>
            <div className="flex items-center gap-2">
              {!isPlaying && (
                <div className="h-6 w-6 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-md border border-white/30">
                  <Play className="h-3 w-3 text-white fill-white" />
                </div>
              )}
              <div className="text-[9px] bg-black/40 px-2 py-0.5 rounded backdrop-blur-sm border border-white/10 text-[color:var(--brand-to)]">
                HD 1080P
              </div>
            </div>
          </div>
        </div>

        {/* Center Play Button (Visible on Pause) */}
        {!isPlaying && (
          <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/20">
            <div className="h-12 w-12 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-xl border border-white/20 transition-transform hover:scale-110">
              <Play className="h-6 w-6 text-white fill-white" />
            </div>
          </div>
        )}

        {/* Center Connected Overlay */}
        {isPlaying && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none">
            <div className="px-3 py-1 bg-[color:rgba(77,140,30,0.22)] backdrop-blur-md rounded-full border border-[color:rgba(77,140,30,0.28)]">
              <span className="text-[9px] text-[color:var(--brand-to)] font-bold uppercase tracking-widest">
                Connected
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Info Section */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <Sprout className="h-4 w-4 text-primary" />
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                Project Unit
              </span>
            </div>
            <h4 className="text-base font-bold text-zinc-900 truncate">
              {project.name}
            </h4>
          </div>
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-secondary ring-1 ring-[color:rgba(77,140,30,0.14)]">
            <Camera className="h-5 w-5 text-primary" />
          </div>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3 border-t border-zinc-100/80 pt-4">
          <div className="flex items-center gap-2">
            <Activity className="h-3.5 w-3.5 text-zinc-400" />
            <span className="text-[11px] font-medium text-zinc-500">
              Real-time Feed
            </span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-3.5 w-3.5 text-zinc-400" />
            <span className="text-[11px] font-medium text-zinc-500">
              Encrypted
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════════
   SKELETON LOADER
   ══════════════════════════════════════════════════ */
const ProjectSkeleton = () => (
  <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
    <div className="aspect-video animate-pulse bg-zinc-100" />
    <div className="p-5 space-y-3">
      <div className="h-3 w-20 animate-pulse rounded bg-zinc-100" />
      <div className="h-5 w-3/4 animate-pulse rounded bg-zinc-100" />
      <div className="grid grid-cols-2 gap-3 pt-4 border-t border-zinc-100">
        <div className="h-3 animate-pulse rounded bg-zinc-100" />
        <div className="h-3 animate-pulse rounded bg-zinc-100" />
      </div>
    </div>
  </div>
);

/* ══════════════════════════════════════════════════
   MAIN PAGE COMPONENT
   ══════════════════════════════════════════════════ */
export default function ProjectMonitorPage() {
  const router = useRouter();
  const [isComingSoonOpen, setIsComingSoonOpen] = useState(true);
  const {
    data: projectsData,
    isLoading,
    isError,
  } = useGetProjectsQuery({ limit: 100 });
  const projects = projectsData?.items || [];

  const videos = [
    "https://assets.mixkit.co/videos/preview/mixkit-cows-in-a-green-field-41443-large.mp4",
    "https://assets.mixkit.co/videos/preview/mixkit-green-wheat-field-under-the-sun-42616-large.mp4",
    "https://assets.mixkit.co/videos/preview/mixkit-sun-shining-through-the-leaves-of-a-tree-42618-large.mp4",
    "https://assets.mixkit.co/videos/preview/mixkit-farmer-walking-in-a-field-of-wheat-42615-large.mp4",
  ];

  return (
    <div className="relative  space-y-5 px-3  sm:px-2 lg:px-4">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -right-28 -top-28 h-80 w-80 rounded-full bg-[color:rgba(77,140,30,0.20)] blur-3xl" />
        <div className="absolute -bottom-28 -left-28 h-80 w-80 rounded-full bg-[color:rgba(124,194,46,0.16)] blur-3xl" />
        <div className="absolute inset-0 opacity-30 [background:radial-gradient(circle_at_1px_1px,rgba(77,140,30,0.16)_1px,transparent_1px)] [background-size:18px_18px]" />
      </div>
      <Modal
        isOpen={isComingSoonOpen}
        onClose={() => setIsComingSoonOpen(false)}
        title={
          <span className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-secondary text-primary ring-1 ring-[color:rgba(77,140,30,0.14)]">
              <Video className="h-4 w-4" />
            </span>
            <span className="flex flex-col">
              <span className="text-base font-semibold leading-5 text-zinc-900">
                Coming Soon
              </span>
              <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
                Project Monitor
              </span>
            </span>
          </span>
        }
        description={null}
        size="lg"
        footer={
          <div className="flex w-full flex-col gap-2 sm:flex-row sm:items-center sm:justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/investor")}
              className="h-10 w-full rounded-xl border-zinc-200 bg-white text-xs font-semibold text-zinc-700 hover:bg-zinc-50 sm:w-auto"
            >
              Back to Dashboard
            </Button>
            <Button
              type="button"
              onClick={() => setIsComingSoonOpen(false)}
              className="h-10 w-full rounded-xl bg-primary px-6 text-xs font-semibold text-primary-foreground hover:bg-[color:var(--brand-to)] sm:w-auto"
            >
              Continue Preview
            </Button>
          </div>
        }
      >
        <div className="space-y-5">
          <div className="overflow-hidden rounded-2xl border border-[color:rgba(77,140,30,0.18)] bg-gradient-to-br from-secondary via-white to-secondary">
            <div className="h-1.5 w-full bg-[linear-gradient(135deg,var(--brand-from),var(--brand-to))]" />
            <div className="p-4 sm:p-5">
              <div className="flex items-start gap-3">
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-primary shadow-sm ring-1 ring-[color:rgba(77,140,30,0.14)]">
                  <LayoutDashboard className="h-4 w-4" />
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-zinc-900">
                    This feature is in progress
                  </p>
                  <p className="mt-1 text-[13px] leading-relaxed text-zinc-600">
                    We’re building secure, real-time monitoring for your
                    investment units. Until launch, this page shows demo streams
                    for preview.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {[
              {
                title: "Live CCTV Feed",
                description: "24/7 HD camera access",
                Icon: Video,
              },
              {
                title: "Night Vision",
                description: "Low‑light monitoring",
                Icon: Camera,
              },
              {
                title: "Motion Detection",
                description: "Smart activity alerts",
                Icon: Activity,
              },
              {
                title: "Playback Support",
                description: "Review historical footage",
                Icon: Clock,
              },
              {
                title: "AI Health Tracking",
                description: "Automated health insights",
                Icon: ShieldCheck,
              },
            ].map(({ title, description, Icon }) => (
              <div
                key={title}
                className="flex items-start gap-3 rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-secondary text-primary ring-1 ring-[color:rgba(77,140,30,0.14)]">
                  <Icon className="h-4 w-4" />
                </span>
                <div className="min-w-0">
                  <div className="text-sm font-semibold text-zinc-900">
                    {title}
                  </div>
                  <div className="mt-1 text-[12px] leading-relaxed text-zinc-500">
                    {description}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p className="text-xs text-zinc-500">
            Want early access? Contact support and we’ll notify you when it’s
            live.
          </p>
        </div>
      </Modal>

      <NoticeMarquee />

      {/* Header Container */}
      <div className="overflow-hidden rounded-3xl border border-zinc-200/80 bg-white/80 shadow-[0_22px_70px_-55px_rgba(0,0,0,0.45)] ring-1 ring-black/5 backdrop-blur">
        <div className="h-1.5 w-full bg-[linear-gradient(135deg,var(--brand-from),var(--brand-to))]" />
        <div className="flex flex-col gap-4 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-secondary ring-1 ring-[color:rgba(77,140,30,0.14)]">
              <Activity className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight text-zinc-900">
                Project Monitor
              </h1>
              <p className="mt-0.5 text-[12px] leading-relaxed text-zinc-500">
                Live CCTV surveillance of your investment projects.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-primary ring-1 ring-[color:rgba(77,140,30,0.18)]">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[color:rgba(124,194,46,0.60)]" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              Live System
            </div>
            <div className="inline-flex items-center gap-2 rounded-full bg-zinc-50 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-700 ring-1 ring-zinc-200">
              <Clock className="h-3.5 w-3.5 text-zinc-500" />
              Real-time Access
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-3.5 w-[3px] rounded-full bg-primary" />
            <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">
              Active Cameras
            </h2>
          </div>
          <span className="text-[11px] font-medium text-zinc-400">
            {isLoading ? "Fetching..." : `${projects.length} Units Available`}
          </span>
        </div>

        {isError && (
          <div className="rounded-2xl border border-red-100 bg-red-50 p-10 text-center">
            <p className="text-sm font-semibold text-red-600">
              Failed to load projects.
            </p>
            <p className="text-xs text-red-400 mt-1">
              Please try refreshing the page or contact support.
            </p>
          </div>
        )}

        {!isLoading && projects.length === 0 && (
          <div className="mb-6 rounded-2xl border border-[color:rgba(77,140,30,0.18)] bg-secondary p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm ring-1 ring-[color:rgba(77,140,30,0.18)]">
                <Video className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-zinc-900">
                  Demo Mode Active
                </h3>
                <p className="text-xs text-zinc-500">
                  You don&apos;t have any active projects yet. Showing demo
                  streams for preview.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {isLoading
            ? [...Array(6)].map((_, i) => <ProjectSkeleton key={i} />)
            : projects.length > 0
              ? projects.map((project, idx) => (
                  <ProjectMonitorCard
                    key={project.id}
                    project={project}
                    videoUrl={videos[idx % videos.length]}
                  />
                ))
              : // Demo Cards
                [
                  { id: "demo-1", name: "Demo Unit: Emerald Valley" },
                  { id: "demo-2", name: "Demo Unit: Golden Plains" },
                  { id: "demo-3", name: "Demo Unit: River Side" },
                ].map((demo, idx) => (
                  <ProjectMonitorCard
                    key={demo.id}
                    project={demo}
                    videoUrl={videos[idx % videos.length]}
                  />
                ))}
        </div>
      </section>

      {/* Feature Highlight */}
      <div className="relative mt-10 overflow-hidden rounded-3xl border border-zinc-900/10 bg-gradient-to-br from-zinc-950 via-zinc-900 to-[color:rgba(77,140,30,0.20)] p-7 text-white shadow-[0_28px_100px_-75px_rgba(0,0,0,0.85)] sm:p-9">
        <div className="pointer-events-none absolute -right-32 -top-32 h-72 w-72 rounded-full bg-[color:rgba(124,194,46,0.12)] blur-[110px]" />
        <div className="pointer-events-none absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-[color:rgba(77,140,30,0.10)] blur-[120px]" />
        <div className="relative">
          <div className="flex items-start justify-between gap-6">
            <div className="flex items-start gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/15 backdrop-blur">
                <Video className="h-5 w-5 text-[color:var(--brand-to)]" />
              </div>
              <div>
                <h3 className="text-lg font-bold tracking-tight">
                  24/7 Monitoring Feature
                </h3>
                <p className="mt-1 max-w-2xl text-[13px] leading-relaxed text-zinc-300/90">
                  Real-time CCTV access will be enabled for all farming units.
                  You’ll be able to monitor investment progress anytime from
                  this dashboard.
                </p>
              </div>
            </div>

            <Button
              type="button"
              onClick={() => setIsComingSoonOpen(true)}
              className="hidden h-10 rounded-xl bg-[color:rgba(77,140,30,0.22)] px-5 text-xs font-semibold text-white ring-1 ring-[color:rgba(77,140,30,0.22)] hover:bg-[color:rgba(77,140,30,0.30)] sm:inline-flex"
            >
              View Roadmap
            </Button>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            {[
              "Night Vision",
              "Motion Detection",
              "Playback Support",
              "AI Health Tracking",
            ].map((feat) => (
              <div
                key={feat}
                className="flex items-center gap-2 rounded-full bg-white/5 px-3 py-1.5 ring-1 ring-white/10"
              >
                <div className="h-1.5 w-1.5 rounded-full bg-[color:var(--brand-to)]" />
                <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-200">
                  {feat}
                </span>
              </div>
            ))}
          </div>

          <Button
            type="button"
            onClick={() => setIsComingSoonOpen(true)}
            className="mt-6 h-10 w-full rounded-xl bg-[color:rgba(77,140,30,0.22)] px-5 text-xs font-semibold text-white ring-1 ring-[color:rgba(77,140,30,0.22)] hover:bg-[color:rgba(77,140,30,0.30)] sm:hidden"
          >
            View Roadmap
          </Button>
        </div>
      </div>
    </div>
  );
}
