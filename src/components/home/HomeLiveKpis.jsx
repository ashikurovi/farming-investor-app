"use client";

import { Leaf, Sprout, Truck, BadgeCheck } from "lucide-react";

const bottomCards = [
  {
    icon: <Sprout className="h-5 w-5" />,
    title: "Organic Crop Production",
    desc: "Augue laoreet mattis platea nec nullam suscipit aliquam lorem.",
  },
  {
    icon: <Leaf className="h-5 w-5" />,
    title: "Sustainable Farm Management",
    desc: "Augue laoreet mattis platea nec nullam suscipit aliquam lorem.",
  },
  {
    icon: <Truck className="h-5 w-5" />,
    title: "Export & Supply Partnership",
    desc: "Augue laoreet mattis platea nec nullam suscipit aliquam lorem.",
  },
];

export default function HomeLiveKpis() {
  return (
    <section id="live-kpis" className="relative overflow-hidden  py-16 lg:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">

        {/* TOP GRID */}
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">

          {/* LEFT */}
          <div className="flex flex-col">
            <div className="mb-4 inline-flex items-center gap-2 w-fit">
              <span className="w-2 h-2 rounded-full bg-[#4d8c1e]" />
              <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-[#4d8c1e]">
                Who We Are
              </span>
            </div>

            <h2
              className="text-[clamp(28px,3.5vw,44px)] font-bold text-[#1a1f14] leading-[1.15] mb-5"
              style={{ fontFamily: "'Georgia', serif" }}
            >
              Our Journey Toward{" "}
              <span className="block">Sustainable And</span>
              <span
                className="font-light text-[#4d8c1e]"
                style={{ fontStyle: "italic" }}
              >
                Responsible Agriculture
              </span>
            </h2>

            <p className="text-[15px] leading-relaxed text-[#6b7466] font-light max-w-[420px] mb-7">
              Luctus felis diam lectus in aptent vehicula curabitur duis
              ultrices. Consequat nulla nostra tempor ridiculus sociosqu maximus
              laoreet.
            </p>

            <a
              href="/landing/about"
              className="inline-flex items-center gap-2 w-fit rounded-full px-7 py-3 text-[13px] font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-2xl active:scale-[0.97]"
              style={{
                background: "linear-gradient(135deg, #4d8c1e, #7cc22e)",
                boxShadow: "0 4px 20px rgba(77,140,30,0.3)",
              }}
            >
              Discover more
              <span className="transition-transform duration-300">&#8594;</span>
            </a>
          </div>

          {/* RIGHT — 2-col image grid */}
          <div
            className="grid grid-cols-2 gap-3.5"
            style={{ gridTemplateRows: "auto auto" }}
          >
            {/* Big image spanning 2 rows */}
            <div className="row-span-2 rounded-3xl overflow-hidden group min-h-[320px] lg:min-h-[360px]">
              <img
                src="/img_7-2048x1024.jpg"
                alt="Sustainable farming"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>

            {/* Glass info card */}
            <div className="rounded-3xl bg-white p-5 shadow-md border border-white/80 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <div
                className="mb-3.5 flex h-11 w-11 items-center justify-center rounded-2xl text-white shadow-md"
                style={{ background: "linear-gradient(135deg,#4d8c1e,#7cc22e)" }}
              >
                <BadgeCheck className="h-5 w-5" />
              </div>
              <p className="text-[14px] font-semibold text-[#1a1f14] mb-1.5">
                Organic Farming Expertise
              </p>
              <p className="text-[12px] text-[#8a9185] leading-relaxed">
                Dictumst feugiat mauris conubia et enim pellentesque porttitor.
              </p>
            </div>

            {/* Small image */}
            <div className="rounded-3xl overflow-hidden group min-h-[150px]">
              <img
                src="/img_4-2048x1024.jpg"
                alt="Fresh harvest"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </div>
        </div>

        {/* BOTTOM CARDS */}
        <div className="mt-10 grid grid-cols-1 gap-3.5 sm:grid-cols-2 md:grid-cols-3">
          {bottomCards.map((item, i) => (
            <div
              key={i}
              className="group flex items-start gap-4 rounded-2xl bg-white px-5 py-5 border border-[#edf0e8] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-[#c8dea8]"
            >
              <div
                className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl text-white shadow-md transition-transform duration-300 group-hover:scale-110"
                style={{ background: "linear-gradient(135deg,#4d8c1e,#7cc22e)" }}
              >
                {item.icon}
              </div>
              <div>
                <p className="text-[14px] font-semibold text-[#1a1f14] mb-1">
                  {item.title}
                </p>
                <p className="text-[12px] text-[#8a9185] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}