"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Calendar,
  User,
  ChevronDown,
  ChevronUp,
  Clock,
} from "lucide-react";
import { blogPosts } from "../../data/blog";

export default function HomeBlogSection() {
  const [expandedPosts, setExpandedPosts] = useState({});

  const toggleExpand = (id) => {
    setExpandedPosts((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Helper to get the first paragraph or clean text from HTML content
  const getExtendedExcerpt = (content) => {
    // Basic regex to remove HTML tags
    const plainText = content
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim();
    // Return first 300 chars approx
    return plainText.substring(0, 350) + "...";
  };

  return (
    <section className="relative">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-emerald-50/20 to-white pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 relative">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-emerald-100 w-fit shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-700">
                Latest Insights
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-zinc-900 leading-tight">
              News &{" "}
              <span className="font-serif italic text-emerald-700">
                Perspectives
              </span>
            </h2>
          </div>

          {/* <div className="hidden md:block">
            <Link
              href="/landing/blog"
              className="group inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-zinc-900 hover:text-emerald-600 transition-colors"
            >
              Read All Articles
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div> */}
        </div>

        {/* Editorial List Layout */}
        <div className="flex flex-col gap-16 relative">
          {blogPosts.map((post) => {
            const isExpanded = expandedPosts[post.id];

            return (
              <article
                key={post.id}
                className="group grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start"
              >
                {/* Image Section - Spans 5 columns */}
                <div className="md:col-span-5 relative aspect-[4/3] rounded-2xl overflow-hidden bg-zinc-100">
                  <div className="absolute top-4 left-4 z-10">
                    <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-zinc-900 bg-white/90 backdrop-blur-sm rounded-full shadow-sm">
                      {post.category}
                    </span>
                  </div>
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                {/* Content Section - Spans 7 columns */}
                <div className="md:col-span-7 flex flex-col h-full justify-center pt-2 md:pt-4">
                  <div className="flex items-center gap-4 text-xs text-zinc-400 mb-6 font-medium uppercase tracking-wider">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      {post.date}
                    </div>
                    <span className="w-1 h-1 rounded-full bg-zinc-300"></span>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      {post.time}
                    </div>
                  </div>

                  <h3 className="text-2xl md:text-3xl font-semibold text-zinc-900 mb-4 leading-tight group-hover:text-emerald-700 transition-colors">
                    <button
                      onClick={() => toggleExpand(post.id)}
                      className="text-left focus:outline-none"
                    >
                      {post.title}
                    </button>
                  </h3>

                  <div className="text-zinc-600 text-base md:text-lg leading-relaxed mb-8 max-w-2xl transition-all duration-300">
                    <p className="mb-4">{post.excerpt}</p>

                    {isExpanded && (
                      <div className="mt-4 pt-4 border-t border-zinc-100 animate-in fade-in slide-in-from-top-2 duration-300">
                        <p className="text-zinc-600">
                          {getExtendedExcerpt(post.content)}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center">
                    <button
                      onClick={() => toggleExpand(post.id)}
                      className="inline-flex items-center text-sm font-bold text-emerald-600 hover:text-emerald-800 transition-colors uppercase tracking-widest focus:outline-none"
                    >
                      {isExpanded ? "Read Less" : "Read More"}
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4 ml-2" />
                      ) : (
                        <ChevronDown className="w-4 h-4 ml-2" />
                      )}
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Mobile View All Button */}
        <div className="mt-16 md:hidden text-center">
          <Link
            href="/landing/blog"
            className="inline-flex items-center justify-center w-full px-6 py-4 bg-zinc-900 text-white rounded-full text-sm font-bold uppercase tracking-widest hover:bg-emerald-600 transition-colors"
          >
            Read All Articles
          </Link>
        </div>
      </div>
    </section>
  );
}
