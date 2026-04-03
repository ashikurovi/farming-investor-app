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
    <section
      id="live-kpis"
      className="relative overflow-hidden bg-[#f6f7f4] home-section"
    >
      <div className="home-container">
        {/* TOP GRID */}
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* LEFT */}
          <div className="flex flex-col">
            <div className="home-tag w-fit">
              <span className="home-tag-dot" />
              Who We Are
            </div>

            <h2 className="mt-4 home-title leading-tight">
              Our Journey Toward{" "}
              <span className="block">Sustainable And</span>
              <span className="block italic text-primary font-semibold">
                Responsible Agriculture
              </span>
            </h2>

            <p className="home-subtitle max-w-lg">
              Luctus felis diam lectus in aptent vehicula curabitur duis
              ultrices. Consequat nulla nostra tempor ridiculus sociosqu maximus
              laoreet.
            </p>

            <a
              href="/landing/about"
              className="inline-flex items-center gap-2 w-fit rounded-full px-8 py-3.5 text-[14px] font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-2xl active:scale-[0.97]"
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
          <div className="grid grid-cols-2 gap-4 sm:gap-6">
            {/* Big image spanning 2 rows */}
            <div className="row-span-2 rounded-[2rem] overflow-hidden group shadow-lg">
              <img
                src="/img_7-2048x1024.jpg"
                alt="Sustainable farming"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                style={{ minHeight: "400px", aspectRatio: "3/4" }}
              />
            </div>

            {/* Glass info card */}
            <div className="rounded-[2rem] bg-white p-6 sm:p-8 shadow-lg border border-[#edf0e8] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl flex flex-col justify-center">
              <div
                className="mb-5 flex h-14 w-14 items-center justify-center rounded-[1.25rem] text-white shadow-md"
                style={{ background: "linear-gradient(135deg,#4d8c1e,#7cc22e)" }}
              >
                <BadgeCheck className="h-6 w-6 sm:h-7 sm:w-7" />
              </div>
              <p className="text-base sm:text-lg font-bold text-[#1a1f14] mb-2 leading-tight">
                Organic Farming Expertise
              </p>
              <p className="text-sm text-[#8a9185] leading-relaxed">
                Dictumst feugiat mauris conubia et enim pellentesque porttitor.
              </p>
            </div>

            {/* Small image */}
            <div className="rounded-[2rem] overflow-hidden group shadow-lg">
              <img
                src="/img_4-2048x1024.jpg"
                alt="Fresh harvest"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 aspect-square sm:aspect-video lg:aspect-square"
              />
            </div>
          </div>
        </div>

        {/* BOTTOM CARDS */}
        <div className="mt-10 grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {bottomCards.map((item, i) => (
            <div
              key={i}
              className="group flex flex-col sm:flex-row items-start gap-4 sm:gap-5 rounded-[2rem] bg-white p-6 sm:p-8 border border-[#edf0e8] shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-[#c8dea8]"
            >
              <div
                className="flex h-12 w-12 sm:h-14 sm:w-14 flex-shrink-0 items-center justify-center rounded-[1.25rem] text-white shadow-md transition-transform duration-300 group-hover:scale-110"
                style={{ background: "linear-gradient(135deg,#4d8c1e,#7cc22e)" }}
              >
                {item.icon}
              </div>
              <div className="mt-1 sm:mt-0">
                <p className="text-base font-bold text-[#1a1f14] mb-2">
                  {item.title}
                </p>
                <p className="text-sm text-[#8a9185] leading-relaxed">
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
