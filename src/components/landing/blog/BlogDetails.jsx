"use client";

import Link from "next/link";
import { ArrowLeft, Calendar, User, Share2 } from "lucide-react";
import { motion } from "framer-motion";

export default function BlogDetails({ post }) {
  if (!post) return null;

  return (
    <article className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-[60vh] w-full overflow-hidden">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover"
        />
        
        <div className="absolute inset-0 z-20 flex flex-col justify-end pb-24 px-6 md:px-12 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/90 backdrop-blur-sm border border-white/20 w-fit mb-6">
              <span className="text-[10px] font-bold uppercase tracking-widest text-white">
                {post.category}
              </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight max-w-4xl">
              {post.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 text-white/90 text-sm font-medium uppercase tracking-wider">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {post.date}
              </div>
              <span className="w-1 h-1 rounded-full bg-white/50"></span>
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                {post.author}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-6 md:px-12 py-16 md:py-24">
        <Link
          href="/"
          className="inline-flex items-center text-zinc-500 hover:text-emerald-600 transition-colors mb-12 text-sm font-bold uppercase tracking-widest"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>

        <div className="prose prose-lg prose-zinc max-w-none">
          <p className="lead text-2xl text-zinc-600 font-light leading-relaxed mb-12 border-l-4 border-emerald-500 pl-6">
            {post.excerpt}
          </p>
          
          <div 
            className="space-y-8 text-zinc-800 leading-relaxed [&>h3]:text-2xl [&>h3]:font-bold [&>h3]:text-zinc-900 [&>h3]:mt-12 [&>h3]:mb-4 [&>p]:mb-6"
            dangerouslySetInnerHTML={{ __html: post.content }} 
          />
        </div>

        {/* Share / Footer */}
        <div className="mt-20 pt-8 border-t border-zinc-100 flex justify-between items-center">
          <div className="text-zinc-400 text-sm">
            Thanks for reading
          </div>
          <button className="inline-flex items-center gap-2 text-zinc-900 hover:text-emerald-600 transition-colors font-bold uppercase tracking-widest text-sm">
            <Share2 className="w-4 h-4" />
            Share Article
          </button>
        </div>
      </div>
    </article>
  );
}
