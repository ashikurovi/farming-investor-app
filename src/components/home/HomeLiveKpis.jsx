"use client";

import { Leaf, Sprout, Truck, BadgeCheck } from "lucide-react";

export default function HomeLiveKpis() {
  return (
    <section id="live-kpis" className="relative overflow-hidden py-16">
     

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          {/* LEFT */}
          <div className="lg:col-span-6">
            <div className="text-[11px] font-semibold tracking-[0.3em] text-emerald-600 uppercase">
              Who We Are
            </div>

            <h2 className="mt-4 text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl leading-tight">
              Our Journey Toward Sustainable And Responsible Agriculture
            </h2>

            <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-zinc-500">
              Luctus felis diam lectus in aptent vehicula curabitur duis
              ultrices. Consequat nulla nostra tempor ridiculus sociosqu maximus
              laoreet.
            </p>

            <div className="mt-7">
              <a
                href="/landing/about"
                className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#6b8e23] to-[#9acd32] px-8 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl active:scale-[0.97]"
              >
                Discover more
              </a>
            </div>
          </div>

          {/* RIGHT */}
          <div className="lg:col-span-6">
            <div className="grid grid-cols-2 grid-rows-2 gap-4">
              {/* Big Image */}
              <div className="row-span-2 overflow-hidden rounded-3xl group">
                <img
                  src="/img_7-2048x1024.jpg"
                  alt="Sustainable farming"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Glass Card */}
              <div className="rounded-3xl backdrop-blur-xl bg-white/40 p-6 border border-white/30 shadow-xl transition hover:-translate-y-1 hover:shadow-2xl">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-r from-emerald-700 to-lime-500 text-white shadow-md">
                  <BadgeCheck className="h-5 w-5" />
                </div>

                <div className="mt-4 text-base font-semibold text-zinc-900">
                  Organic Farming Expertise
                </div>

                <div className="mt-2 text-sm text-zinc-600">
                  Dictumst feugiat mauris conubia et enim pellentesque
                  porttitor.
                </div>
              </div>

              {/* Small Image */}
              <div className="overflow-hidden rounded-3xl group">
                <img
                  src="/img_4-2048x1024.jpg"
                  alt="Fresh harvest"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Cards */}
        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
          {[
            {
              icon: <Sprout className="h-5 w-5" />,
              title: "Organic Crop Production",
            },
            {
              icon: <Leaf className="h-5 w-5" />,
              title: "Sustainable Farm Management",
            },
            {
              icon: <Truck className="h-5 w-5" />,
              title: "Export & Supply Partnership",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="group flex items-start gap-4 rounded-2xl bg-white/70 backdrop-blur-lg px-5 py-5 border border-zinc-100 shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-r from-[#6b8e23] to-[#9acd32] text-white shadow-md group-hover:scale-110 transition">
                {item.icon}
              </div>

              <div>
                <div className="text-base font-semibold text-zinc-900">
                  {item.title}
                </div>
                <div className="mt-1 text-sm text-zinc-500">
                  Augue laoreet mattis platea nec nullam suscipit aliquam lorem.
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
