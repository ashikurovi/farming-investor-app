"use client";

import { Leaf, Sprout, Truck, BadgeCheck } from "lucide-react";

export default function HomeLiveKpis() {
  return (
    <section id="live-kpis" className="relative overflow-hidden py-14 sm:py-20">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white to-emerald-50/40" />
        <div className="absolute inset-0 opacity-25 [background:radial-gradient(circle_at_1px_1px,rgba(16,185,129,0.22)_1px,transparent_1px)] [background-size:18px_18px]" />
        <div className="absolute -left-24 top-28 h-72 w-72 rounded-full bg-emerald-200/30 blur-3xl" />
        <div className="absolute -right-24 top-10 h-72 w-72 rounded-full bg-lime-200/30 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <div className="text-[11px] font-semibold tracking-[0.22em] text-emerald-600">
              Who We Are
            </div>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight text-zinc-900 sm:text-5xl">
              Our Journey Toward Sustainable And Responsible Agriculture
            </h2>
            <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-zinc-600 sm:text-base">
              Luctus felis diam lectus in aptent vehicula curabitur duis
              ultrices. Consequat nulla nostra tempor ridiculus sociosqu maximus
              laoreet suspendisse litus justo. Nulla metus ad non dignissim
              mollis venenatis diam ante adipiscing in pretium.
            </p>
            <div className="mt-6">
              <a
                href="/landing/about"
                className="inline-flex items-center justify-center rounded-full bg-[#7f9b3c] px-7 py-3 text-[13px] font-semibold text-white shadow-[0_18px_48px_-30px_rgba(127,155,60,0.85)] transition hover:bg-[#8cab44] active:scale-[0.99]"
              >
                Discover more
              </a>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="grid grid-cols-2 grid-rows-2 gap-4">
              <div className="row-span-2 overflow-hidden rounded-3xl bg-zinc-200 shadow-sm ring-1 ring-zinc-200">
                <img
                  src="/img_7-2048x1024.jpg"
                  alt="Sustainable farming"
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="rounded-3xl bg-lime-200/70 p-6 shadow-[0_18px_50px_-40px_rgba(0,0,0,0.35)] ring-1 ring-lime-200">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-900 text-white shadow-sm">
                  <BadgeCheck className="h-5 w-5" />
                </div>
                <div className="mt-4 text-base font-semibold text-zinc-900">
                  Organic Farming Expertise
                </div>
                <div className="mt-2 text-sm leading-relaxed text-zinc-700/80">
                  Dictumst feugiat mauris conubia et enim pellentesque porttitor
                  lobortis sem hendrerit risus
                </div>
              </div>

              <div className="overflow-hidden rounded-3xl bg-zinc-200 shadow-sm ring-1 ring-zinc-200">
                <img
                  src="/img_4-2048x1024.jpg"
                  alt="Fresh harvest"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-12 md:grid-cols-3">
          <div className="flex items-start gap-3 rounded-2xl bg-white px-5 py-4 shadow-[0_14px_45px_-38px_rgba(0,0,0,0.35)] ring-1 ring-zinc-100">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#7f9b3c] text-white shadow-sm">
              <Sprout className="h-5 w-5" />
            </div>
            <div>
              <div className="text-base font-semibold text-zinc-900">
                Organic Crop Production
              </div>
              <div className="mt-1 text-sm leading-relaxed text-zinc-600">
                Augue laoreet mattis platea nec nullam suscipit aliquam lorem
                tempus
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3 rounded-2xl bg-white px-5 py-4 shadow-[0_14px_45px_-38px_rgba(0,0,0,0.35)] ring-1 ring-zinc-100">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#7f9b3c] text-white shadow-sm">
              <Leaf className="h-5 w-5" />
            </div>
            <div>
              <div className="text-base font-semibold text-zinc-900">
                Sustainable Farm Management
              </div>
              <div className="mt-1 text-sm leading-relaxed text-zinc-600">
                Augue laoreet mattis platea nec nullam suscipit aliquam lorem
                tempus
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3 rounded-2xl bg-white px-5 py-4 shadow-[0_14px_45px_-38px_rgba(0,0,0,0.35)] ring-1 ring-zinc-100">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#7f9b3c] text-white shadow-sm">
              <Truck className="h-5 w-5" />
            </div>
            <div>
              <div className="text-base font-semibold text-zinc-900">
                Export & Supply Partnership
              </div>
              <div className="mt-1 text-sm leading-relaxed text-zinc-600">
                Augue laoreet mattis platea nec nullam suscipit aliquam lorem
                tempus
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}