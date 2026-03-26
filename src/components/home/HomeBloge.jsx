"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Calendar, User, Clock } from "lucide-react";

const blogPosts = [
  {
    id: 1,
    title: "The Future of Sustainable Agriculture in Bangladesh",
    excerpt:
      "Exploring how modern technology and sustainable practices are reshaping the agricultural landscape for better yields and environmental protection.",
    category: "Industry Insights",
    author: "Dr. A. Rahman",
    date: "March 15, 2026",
    readTime: "5 min read",
    image:
      "https://images.pexels.com/photos/2132250/pexels-photo-2132250.jpeg?auto=compress&cs=tinysrgb&w=800", // Rice field
  },
  ///uweqhfiuwh eyughweyugfyuiwe
  {
    id: 2,
    title: "Maximizing ROI: A Guide for Agro-Investors",
    excerpt:
      "Key strategies for evaluating agricultural projects and understanding the risk-reward ratio in the current market climate.",
    category: "Investment Strategy",
    author: "Sarah Khan",
    date: "March 10, 2026",
    readTime: "4 min read",
    image:
      "https://images.pexels.com/photos/974314/pexels-photo-974314.jpeg?auto=compress&cs=tinysrgb&w=800", // Wheat/Grain
  },
  {
    id: 3,
    title: "Smart Farming: IoT & Data-Driven Decisions",
    excerpt:
      "How data analytics and IoT devices are helping farmers predict weather patterns and optimize resource usage.",
    category: "Technology",
    author: "K. Ahmed",
    date: "March 05, 2026",
    readTime: "6 min read",
    image:
      "https://images.pexels.com/photos/2886937/pexels-photo-2886937.jpeg?auto=compress&cs=tinysrgb&w=800", // Smart farming/Drone or tech
  },
];

export default function HomeBloge() {
  return (
    <section className="">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-zinc-200 w-fit">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-600">
                Latest News
              </span>
            </div>

            <h2 className="text-3xl md:text-5xl font-light text-zinc-900 leading-tight tracking-tight">
              Insights &{" "}
              <span className="font-serif italic text-emerald-700">
                Perspectives
              </span>
            </h2>
          </div>

          <Link
            href="/blog"
            className="hidden md:flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-zinc-500 hover:text-emerald-600 transition-colors group"
          >
            View All Articles
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Link>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              className="group flex flex-col bg-white rounded-3xl overflow-hidden border border-zinc-100 shadow-sm hover:shadow-xl hover:shadow-emerald-500/5 transition-all duration-500 hover:-translate-y-1"
            >
              {/* Image Container */}
              <div className="relative aspect-[4/3] overflow-hidden bg-zinc-100">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-md text-[10px] font-bold uppercase tracking-wider text-emerald-800 rounded-full border border-white/20">
                    {post.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-col flex-1 p-8">
                <div className="flex items-center gap-4 text-xs text-zinc-400 mb-4 font-medium">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    {post.date}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    {post.readTime}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-zinc-900 mb-3 leading-snug group-hover:text-emerald-700 transition-colors line-clamp-2">
                  <Link href={`/blog/${post.id}`}>{post.title}</Link>
                </h3>

                <p className="text-zinc-500 text-sm leading-relaxed mb-6 line-clamp-3">
                  {post.excerpt}
                </p>

                <div className="mt-auto flex items-center justify-between pt-6 border-t border-zinc-100">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-400">
                      <User className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-semibold text-zinc-600 uppercase tracking-wide">
                      {post.author}
                    </span>
                  </div>

                  <span className="w-8 h-8 rounded-full bg-zinc-50 flex items-center justify-center text-zinc-400 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300">
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Mobile View All Button */}
        <div className="mt-12 text-center md:hidden">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-zinc-200 rounded-full text-xs font-bold uppercase tracking-widest text-zinc-600 hover:border-emerald-500 hover:text-emerald-600 transition-colors shadow-sm"
          >
            View All Articles
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
