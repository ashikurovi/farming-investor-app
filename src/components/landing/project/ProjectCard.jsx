"use client";

import { MapPin, ArrowUpRight, Sprout } from "lucide-react";
import Link from "next/link";

export function ProjectCard({ project }) {
  return (
    <Link
      href={`/landing/project/${project.projectId}`}
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-zinc-200/80 bg-white shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[0_24px_70px_-55px_rgba(77,140,30,0.35)]"
    >
      {/* ── LIVE Badge ── */}
      {project.isLive && (
        <div className="absolute top-0 right-0 z-10">
          <span className="block bg-green-500 text-white text-[10px] font-semibold tracking-widest uppercase px-3 py-1.5 rounded-bl-xl rounded-tr-[20px]">
            LIVE
          </span>
        </div>
      )}

      {/* ── Image ── */}
      <div className="relative h-64 overflow-hidden bg-[linear-gradient(135deg,rgba(124,194,46,0.12),rgba(77,140,30,0.16))] md:h-72">
        {project.images?.[0] ? (
          <img
            src={project.images[0]}
            alt={project.title}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
            onError={(e) => {
              e.currentTarget.src =
                "https://images.pexels.com/photos/2132257/pexels-photo-2132257.jpeg?auto=compress&cs=tinysrgb&w=800";
            }}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <Sprout className="h-14 w-14 text-primary" />
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

        {/* {project.category && (
          <div className="absolute bottom-3 left-3">
            <span className="inline-flex items-center bg-emerald-900/85 text-emerald-100 text-[11px] font-medium px-3 py-1 rounded-full backdrop-blur-sm">
              {project.category}
            </span>
          </div>
        )} */}
      </div>

      {/* ── Body ── */}
      <div className="flex flex-col flex-grow p-7">
        {/* Title + Location */}
        <div className="mb-5">
          <h3 className="text-xl font-bold tracking-tight text-zinc-900 leading-snug mb-1 group-hover:text-primary transition-colors line-clamp-1">
            {project.title}
          </h3>
          <div className="flex items-center gap-1.5 text-zinc-400 text-xs">
            <MapPin className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">{project.location}</span>
          </div>
        </div>

        {project.project_details && (
          <p className="mb-6 line-clamp-2 text-[13px] leading-relaxed text-zinc-600">
            {project.project_details}
          </p>
        )}

        {/* Status + CTA */}
        <div className="flex items-center justify-between gap-3 mt-auto">
          <span className="inline-block bg-secondary text-primary text-[11px] font-medium px-3 py-1.5 rounded-full border border-[color:rgba(77,140,30,0.18)]">
            {project.status ?? "Active"}
          </span>

          <div className="inline-flex items-center gap-2 bg-primary hover:bg-[color:var(--brand-to)] text-primary-foreground text-[12px] font-semibold px-5 py-2.5 rounded-full transition-colors duration-200 cursor-pointer group-hover:shadow-md group-hover:shadow-[0_18px_40px_-26px_rgba(77,140,30,0.45)]">
            View Details
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </div>
      </div>
    </Link>
  );
}
