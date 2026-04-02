"use client";
import Image from "next/image";
import { ArrowRight, Play, CircleArrowRight } from "lucide-react";

const YOUTUBE_VIDEO_URL = "https://www.youtube.com/watch?v=ysz5S6PUM-U";

export default function HomeWhyChooseUs() {
  return (
    <section className="relative py-8 sm:py-14">
      <div className="relative z-20 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl bg-zinc-200 shadow-[0_40px_100px_-70px_rgba(0,0,0,0.65)] ring-1 ring-zinc-200 sm:rounded-[28px]">
          <a
            href={YOUTUBE_VIDEO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="relative block w-full text-left"
            aria-label="Open YouTube video"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/20 to-black/10" />
            <Image
              src="/img_7-2048x1024.jpg"
              alt="Organic farming"
              width={1600}
              height={900}
              sizes="(min-width: 1024px) 960px, 100vw"
              className="h-[240px] w-full object-cover sm:h-[360px] lg:h-[420px]"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center sm:px-6">
              <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-white/15 ring-1 ring-white/30 shadow-[0_18px_60px_-30px_rgba(0,0,0,0.75)] backdrop-blur-md sm:h-[74px] sm:w-[74px]">
                <div className="absolute -inset-6 rounded-full bg-white/10 blur-xl" />
                <Play className="relative h-6 w-6 text-white sm:h-8 sm:w-8" />
              </div>
              <h3 className="mt-4 max-w-3xl font-serif text-2xl font-semibold leading-tight tracking-tight text-white drop-shadow-sm sm:mt-5 sm:text-5xl">
                Organic Farming Pricing Designed For Growing Businesses
              </h3>
              <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-[linear-gradient(135deg,var(--brand-from),var(--brand-to))] px-4 py-2 text-[11px] font-semibold text-white shadow-[0_18px_48px_-30px_rgba(77,140,30,0.75)] sm:mt-6">
                Book Now - It&apos;s Free!
                <ArrowRight className="h-4 w-4" />
              </div>
            </div>
          </a>
        </div>
      </div>

      <div className="-mt-10 bg-gradient-to-b from-emerald-950 via-emerald-900 to-emerald-950 pb-12 pt-20 sm:-mt-20 sm:pb-16 sm:pt-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-6">
              <div className="text-[11px] font-semibold tracking-[0.22em] text-emerald-200/80">
                Why Choose Us
              </div>
              <h2 className="mt-3 font-serif text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Why Global Partners Choose Botanix Organic Services
              </h2>
              <div className="mt-5 h-1.5 w-16 rounded-full bg-[#7f9b3c]" />
              <div className="mt-6 max-w-xl text-sm leading-relaxed text-emerald-100/80">
                Semper pellentesque blandit tincidunt primis suspendisse feugiat
                dictumst. Phasellus metus libero auctor luctus sollicitudin nam
                maecenas.
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div className="overflow-hidden rounded-3xl bg-white/5 ring-1 ring-white/10 backdrop-blur">
                  <Image
                    src="/img_4-2048x1024.jpg"
                    alt="Consistent premium quality"
                    width={900}
                    height={600}
                    sizes="(min-width: 1024px) 25vw, 100vw"
                    className="h-44 w-full object-cover sm:h-48"
                  />
                  <div className="p-5">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <div className="text-sm font-semibold text-white">
                          Consistent Premium Quality
                        </div>
                        <div className="mt-2 text-[12px] leading-relaxed text-emerald-100/70">
                          Proin parturient dictumst sodales arcu vulputate
                          lacinia senectus
                        </div>
                      </div>
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#7f9b3c] text-white shadow-[0_16px_40px_-26px_rgba(127,155,60,0.75)]">
                        <CircleArrowRight className="h-5 w-5" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  {[
                    "Certified Organic Standards",
                    "Sustainable Farming Practices",
                    "Traceable Farm-To-Market Process",
                  ].map((title) => (
                    <div
                      key={title}
                      className="flex items-center justify-between gap-4 rounded-2xl bg-white/5 px-5 py-4 ring-1 ring-white/10 backdrop-blur"
                    >
                      <div>
                        <div className="text-sm font-semibold text-white">
                          {title}
                        </div>
                        <div className="mt-1 text-[12px] leading-relaxed text-emerald-100/70">
                          Proin parturient dictumst sodales arcu vulputate
                          lacinia senectus
                        </div>
                      </div>
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#7f9b3c] text-white shadow-[0_16px_40px_-26px_rgba(127,155,60,0.75)] shrink-0">
                        <ArrowRight className="h-4 w-4" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
