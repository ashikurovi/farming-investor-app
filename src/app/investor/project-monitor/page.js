"use client";

import { useState, useRef, useEffect } from "react";
import { 
  Camera, 
  Video, 
  Activity, 
  Sprout, 
  ShieldCheck, 
  Clock,
  Play,
  Pause,
  LayoutDashboard
} from "lucide-react";
import { useGetProjectsQuery } from "@/features/admin/projects/projectsApiSlice";
import { NoticeMarquee } from "../components/NoticeMarquee";

/* ══════════════════════════════════════════════════
   CCTV LIVE CARD COMPONENT
   ══════════════════════════════════════════════════ */
const ProjectMonitorCard = ({ project, videoUrl }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play().catch(err => {
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
    <div className="group relative overflow-hidden rounded-2xl border border-zinc-200/80 bg-white shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ring-1 ring-transparent hover:ring-emerald-200/50">
      {/* Status Bar */}
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-400 to-teal-500" />
      
      {/* CCTV View Container */}
      <div className="relative aspect-video overflow-hidden bg-black cursor-pointer" onClick={togglePlay}>
        {/* Live Video Feed (Simulated) */}
        <video 
          ref={videoRef}
          src={videoUrl || "https://assets.mixkit.co/videos/preview/mixkit-cows-in-a-green-field-41443-large.mp4"}
          autoPlay 
          muted 
          loop 
          playsInline
          className="h-full w-full object-cover opacity-60 grayscale-[0.3] contrast-[1.2]"
        />

        {/* Scanline / Grain Overlay for CCTV effect */}
        <div className="absolute inset-0 z-10 pointer-events-none opacity-20 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] shadow-[inset_0_0_100px_rgba(0,0,0,0.5)]"></div>

        {/* Interface Overlays */}
        <div className="absolute inset-0 z-20 flex flex-col justify-between p-4 font-mono text-white/80">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${isPlaying ? 'bg-red-400 opacity-75' : 'bg-zinc-400 opacity-20'}`}></span>
                <span className={`relative inline-flex rounded-full h-2 w-2 ${isPlaying ? 'bg-red-500' : 'bg-zinc-500'}`}></span>
              </span>
              <span className="text-[10px] font-bold tracking-tight">{isPlaying ? 'REC - LIVE' : 'PAUSED'}</span>
            </div>
            <div className="text-[10px] bg-black/40 px-2 py-0.5 rounded backdrop-blur-sm border border-white/10 uppercase">
              CAM_0{Math.floor(Math.random() * 9) + 1}
            </div>
          </div>

          <div className="flex justify-between items-end">
            <div className="text-[9px] bg-black/40 px-2 py-0.5 rounded backdrop-blur-sm border border-white/10">
              {new Date().toLocaleDateString()} {new Date().toLocaleTimeString()}
            </div>
            <div className="flex items-center gap-2">
              {!isPlaying && (
                <div className="h-6 w-6 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-md border border-white/30">
                  <Play className="h-3 w-3 text-white fill-white" />
                </div>
              )}
              <div className="text-[9px] bg-black/40 px-2 py-0.5 rounded backdrop-blur-sm border border-white/10 text-emerald-400">
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
             <div className="px-3 py-1 bg-emerald-500/20 backdrop-blur-md rounded-full border border-emerald-500/30">
                <span className="text-[9px] text-emerald-400 font-bold uppercase tracking-widest">Connected</span>
             </div>
          </div>
        )}
      </div>

      {/* Info Section */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <Sprout className="h-4 w-4 text-emerald-500" />
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Project Unit</span>
            </div>
            <h4 className="text-base font-bold text-zinc-900 truncate">
              {project.name}
            </h4>
          </div>
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 ring-1 ring-emerald-100">
            <Camera className="h-5 w-5 text-emerald-600" />
          </div>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3 border-t border-zinc-100 pt-4">
          <div className="flex items-center gap-2">
            <Activity className="h-3.5 w-3.5 text-zinc-400" />
            <span className="text-[11px] font-medium text-zinc-500">Real-time Feed</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-3.5 w-3.5 text-zinc-400" />
            <span className="text-[11px] font-medium text-zinc-500">Encrypted</span>
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
  const { data: projectsData, isLoading, isError } = useGetProjectsQuery({ limit: 100 });
  const projects = projectsData?.items || [];

  const videos = [
    "https://assets.mixkit.co/videos/preview/mixkit-cows-in-a-green-field-41443-large.mp4",
    "https://assets.mixkit.co/videos/preview/mixkit-green-wheat-field-under-the-sun-42616-large.mp4",
    "https://assets.mixkit.co/videos/preview/mixkit-sun-shining-through-the-leaves-of-a-tree-42618-large.mp4",
    "https://assets.mixkit.co/videos/preview/mixkit-farmer-walking-in-a-field-of-wheat-42615-large.mp4"
  ];

  return (
    <div className="space-y-8 mx-auto pb-10">
      <NoticeMarquee />

      {/* Header Container */}
      <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
        <div className="h-[3px] w-full bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-500" />
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-5 py-5 sm:py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 ring-1 ring-emerald-100">
              <Activity className="h-5 w-5 text-emerald-600 animate-pulse" />
            </div>
            <div>
              <h1 className="text-base font-bold text-zinc-900">Project Monitor</h1>
              <p className="text-xs text-zinc-400">Live CCTV surveillance of your investment projects.</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 bg-zinc-50 px-3 py-1.5 rounded-full border border-zinc-200">
            <Clock className="h-3.5 w-3.5 text-zinc-500" />
            <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-tighter">
              REAL-TIME ACCESS
            </span>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-3.5 w-[3px] rounded-full bg-emerald-500" />
            <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">Active Cameras</h2>
          </div>
          <span className="text-[11px] font-medium text-zinc-400">
            {isLoading ? "Fetching..." : `${projects.length} Units Available`}
          </span>
        </div>

        {isError && (
          <div className="rounded-2xl border border-red-100 bg-red-50 p-10 text-center">
            <p className="text-sm font-semibold text-red-600">Failed to load projects.</p>
            <p className="text-xs text-red-400 mt-1">Please try refreshing the page or contact support.</p>
          </div>
        )}

        {!isLoading && projects.length === 0 && (
          <div className="mb-6 rounded-2xl border border-emerald-100 bg-emerald-50/50 p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm ring-1 ring-emerald-200">
                <Video className="h-5 w-5 text-emerald-600" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-zinc-900">Demo Mode Active</h3>
                <p className="text-xs text-zinc-500">You don't have any active projects yet. Showing demo streams for preview.</p>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {isLoading ? (
            [...Array(6)].map((_, i) => <ProjectSkeleton key={i} />)
          ) : projects.length > 0 ? (
            projects.map((project, idx) => (
              <ProjectMonitorCard 
                key={project.id} 
                project={project} 
                videoUrl={videos[idx % videos.length]} 
              />
            ))
          ) : (
            // Demo Cards
            [
              { id: 'demo-1', name: 'Demo Unit: Emerald Valley' },
              { id: 'demo-2', name: 'Demo Unit: Golden Plains' },
              { id: 'demo-3', name: 'Demo Unit: River Side' }
            ].map((demo, idx) => (
              <ProjectMonitorCard 
                key={demo.id} 
                project={demo} 
                videoUrl={videos[idx % videos.length]} 
              />
            ))
          )}
        </div>
      </section>

      {/* Feature Highlight */}
      <div className="mt-10 rounded-2xl bg-gradient-to-br from-zinc-800 to-zinc-950 p-8 text-white shadow-lg overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 blur-[100px] -mr-32 -mt-32"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 backdrop-blur-sm border border-white/20">
              <Video className="h-5 w-5 text-emerald-400" />
            </div>
            <h3 className="text-lg font-bold">24/7 Monitoring Feature</h3>
          </div>
          <p className="max-w-2xl text-sm text-zinc-400 leading-relaxed mb-6">
            We are working on bringing real-time CCTV access for all our farming units. 
            Once live, you will be able to monitor the health and progress of your 
            investments directly from this dashboard at any time.
          </p>
          <div className="flex flex-wrap gap-4">
            {['Night Vision', 'Motion Detection', 'Playback Support', 'AI Health Tracking'].map((feat) => (
              <div key={feat} className="flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg">
                <div className="h-1 w-1 rounded-full bg-emerald-400"></div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-300">{feat}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
