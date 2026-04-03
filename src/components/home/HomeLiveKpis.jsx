"use client";

import { Leaf, Sprout, Truck, BadgeCheck, Award } from "lucide-react";

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

            {/* Stats row */}
            <div className="mb-7 flex items-center gap-8">
              {[
                { value: "12+", label: "Years Experience" },
                { value: "340+", label: "Farm Partners" },
                { value: "98%", label: "Client Satisfaction" },
              ].map((s) => (
                <div key={s.label}>
                  <p
                    className="text-2xl font-extrabold"
                    style={{
                      background: "linear-gradient(135deg,#4d8c1e,#7cc22e)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    {s.value}
                  </p>
                  <p className="text-[11px] font-semibold text-[#8a9185] leading-tight mt-0.5">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>

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

          {/* RIGHT — improved image layout */}
          <div className="relative">

            {/* Mobile: stacked clean layout | Desktop: overlapping premium layout */}
            <div className="flex flex-col gap-4 sm:hidden">
              {/* Mobile: full-width main image */}
              <div className="overflow-hidden rounded-3xl shadow-xl">
                <img
                  src="/img_7-2048x1024.jpg"
                  alt="Sustainable farming"
                  className="h-56 w-full object-cover"
                />
              </div>
              {/* Mobile: side-by-side card + small image */}
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-3xl bg-white p-5 shadow-md border border-[#edf0e8] flex flex-col justify-center">
                  <div
                    className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl text-white shadow-sm"
                    style={{ background: "linear-gradient(135deg,#4d8c1e,#7cc22e)" }}
                  >
                    <BadgeCheck className="h-5 w-5" />
                  </div>
                  <p className="text-sm font-bold text-[#1a1f14] leading-tight">
                    Organic Farming Expertise
                  </p>
                  <p className="mt-1 text-[11px] text-[#8a9185] leading-relaxed">
                    Certified standards at every stage.
                  </p>
                </div>
                <div className="overflow-hidden rounded-3xl shadow-md">
                  <img
                    src="/img_4-2048x1024.jpg"
                    alt="Fresh harvest"
                    className="h-full w-full object-cover aspect-square"
                  />
                </div>
              </div>
            </div>

            {/* Desktop / Tablet: premium overlapping layout */}
            <div className="hidden sm:block relative h-[520px] lg:h-[560px]">

              {/* Main tall image — left, slightly offset */}
              <div className="absolute left-0 top-0 w-[54%] h-full overflow-hidden rounded-[2rem] shadow-2xl z-10 group">
                <img
                  src="/img_7-2048x1024.jpg"
                  alt="Sustainable farming"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* subtle inner glow */}
                <div className="absolute inset-0 rounded-[2rem] ring-1 ring-inset ring-white/10" />
              </div>

              {/* Info card — top right, overlapping main image */}
              <div className="absolute right-0 top-6 w-[44%] rounded-[1.75rem] bg-white p-6 shadow-xl border border-[#edf0e8] z-20 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
                <div
                  className="mb-4 flex h-13 w-13 items-center justify-center rounded-[1.1rem] text-white shadow-md"
                  style={{ background: "linear-gradient(135deg,#4d8c1e,#7cc22e)", width: "52px", height: "52px" }}
                >
                  <BadgeCheck className="h-6 w-6" />
                </div>
                <p className="text-[15px] font-bold text-[#1a1f14] leading-snug mb-2">
                  Organic Farming Expertise
                </p>
                <p className="text-[12px] text-[#8a9185] leading-relaxed">
                  Dictumst feugiat mauris conubia et enim pellentesque porttitor.
                </p>
              </div>

              {/* Small image — bottom right */}
              <div className="absolute right-0 bottom-0 w-[44%] h-[46%] overflow-hidden rounded-[1.75rem] shadow-xl z-20 group">
                <img
                  src="/img_4-2048x1024.jpg"
                  alt="Fresh harvest"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 rounded-[1.75rem] ring-1 ring-inset ring-white/10" />
              </div>

              {/* Floating badge — overlapping between images */}
              <div
                className="absolute bottom-[46%] right-[41%] z-30 translate-x-1/2 translate-y-1/2 flex items-center gap-2 rounded-full px-3.5 py-2 text-white text-[11px] font-bold shadow-lg"
                style={{ background: "linear-gradient(135deg,#4d8c1e,#7cc22e)" }}
              >
                <Award className="h-3.5 w-3.5" />
                100% Certified
              </div>

              {/* Decorative dot pattern */}
              <div
                className="absolute -bottom-4 -left-4 h-28 w-28 opacity-30 z-0"
                style={{
                  backgroundImage: "radial-gradient(circle, #4d8c1e 1.5px, transparent 1.5px)",
                  backgroundSize: "12px 12px",
                }}
              />
            </div>
          </div>
        </div>

        {/* BOTTOM CARDS */}
        <div className="mt-12 grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
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