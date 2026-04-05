"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Calendar,
  Clock,
  ChevronDown,
  ChevronUp,
  Sprout,
  TrendingUp,
} from "lucide-react";
import { blogPosts } from "../../data/blog";

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Outfit:wght@300;400;500;600;700&display=swap');

  .blog-root {
    font-family: 'Outfit', sans-serif;
    --g1: #4d8c1e;
    --g2: #7cc22e;
    --grad: linear-gradient(135deg, #4d8c1e, #7cc22e);
    --bg: #f6f7f4;
    --card: #ffffff;
    --text-1: #111a0a;
    --text-2: #4a5c3a;
    --text-3: #8fa07a;
    --border: rgba(77,140,30,.13);
    --border-md: rgba(77,140,30,.26);
  }

  .blog-root * { box-sizing: border-box; }

  /* ─── Section ─── */
  .blog-section {
<<<<<<< HEAD
    background: transparent;
    padding: 44px 0 52px;
=======
    background: var(--bg);
    padding: 72px 0 84px;
>>>>>>> 0ae470e (update home pages)
    position: relative;
    overflow: hidden;
  }

  /* Soft dot-grid background texture */
  .blog-section::after {
    content: '';
    position: absolute; inset: 0; pointer-events: none; z-index: 0;
    background-image: none;
  }

  /* Green glow blobs */
  .blog-blob-tl {
    display: none;
    width: 500px; height: 500px; border-radius: 50%;
    background: radial-gradient(circle, rgba(124,194,46,.10) 0%, transparent 70%);
  }
  .blog-blob-br {
    display: none;
    width: 420px; height: 420px; border-radius: 50%;
    background: radial-gradient(circle, rgba(77,140,30,.08) 0%, transparent 70%);
  }

  .blog-inner {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 24px;
    position: relative;
    z-index: 1;
  }

  /* ─── Header ─── */
  .blog-header {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 24px;
    margin-bottom: 48px;
    flex-wrap: wrap;
  }
  .blog-header-left { max-width: 560px; }

  .blog-eyebrow {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 6px 16px 6px 8px;
    background: rgba(255,255,255,.95);
    border: 1.5px solid var(--border-md);
    border-radius: 999px;
    margin-bottom: 14px;
    box-shadow: 0 2px 12px rgba(77,140,30,.08);
  }
  .blog-eyebrow-dot {
    width: 24px; height: 24px; border-radius: 50%;
    background: var(--grad);
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
    box-shadow: 0 2px 8px rgba(77,140,30,.3);
  }
  .blog-eyebrow span {
    font-size: 11px; font-weight: 700;
    letter-spacing: .14em; text-transform: uppercase;
    color: var(--g1);
  }
 
  .blog-title {
    font-family: inherit;
    font-size: 24px;
    font-weight: 700;
    letter-spacing: -0.02em;
    color: var(--text-1);
    line-height: 1.2;
    margin: 0;
  }
  .blog-title em {
    font-style: italic;
    background: var(--grad);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  @media (min-width: 768px) { .blog-title { font-size: 30px; } }

  .blog-view-all {
    display: inline-flex; align-items: center; gap: 8px;
    font-size: 12px; font-weight: 700; letter-spacing: .12em;
    text-transform: uppercase; text-decoration: none;
    color: var(--g1);
    padding: 12px 24px;
    border: 1.5px solid var(--border-md);
    border-radius: 999px;
    background: rgba(255,255,255,.85);
    transition: all .25s; white-space: nowrap;
    box-shadow: 0 2px 12px rgba(77,140,30,.08);
  }
  .blog-view-all:hover {
    background: var(--grad);
    color: #fff;
    border-color: transparent;
    box-shadow: 0 6px 24px rgba(77,140,30,.3);
    transform: translateY(-2px);
  }
  .blog-view-all svg { transition: transform .2s; }
  .blog-view-all:hover svg { transform: translateX(4px); }

  /* ─── Article card ─── */
  .blog-list { display: flex; flex-direction: column; gap: 20px; }

  .blog-article {
    background: var(--card);
    border: 1.5px solid var(--border);
    border-radius: 28px;
    overflow: hidden;
    position: relative;
    transition: box-shadow .3s, border-color .3s, transform .3s;
  }
  /* Top accent line */
  .blog-article::before {
    content: '';
    position: absolute; top: 0; left: 0; right: 0; height: 3px;
    background: var(--grad); opacity: 0;
    transition: opacity .3s;
    border-radius: 28px 28px 0 0;
    z-index: 2;
  }
  .blog-article:hover {
    box-shadow: 0 16px 56px rgba(77,140,30,.13);
    border-color: rgba(77,140,30,.32);
    transform: translateY(-3px);
  }
  .blog-article:hover::before { opacity: 1; }

  .blog-article-inner {
    display: grid;
    grid-template-columns: 400px 1fr;
  }

  /* ─── Image pane ─── */
  .blog-img-pane {
    position: relative;
    overflow: hidden;
    min-height: 280px;
  }
  .blog-img-pane img {
    width: 100%; height: 100%;
    object-fit: cover;
    transition: transform .7s cubic-bezier(.4,0,.2,1);
    display: block;
  }
  .blog-article:hover .blog-img-pane img { transform: scale(1.06); }

  /* Vertical gradient on image right edge — blends into white card */
  .blog-img-pane::after {
    content: '';
    position: absolute; inset: 0;
    background: linear-gradient(to right, transparent 55%, rgba(255,255,255,.15) 100%);
    pointer-events: none;
  }

  /* Category badge */
  .blog-cat-badge {
    position: absolute; top: 16px; left: 16px; z-index: 3;
    padding: 5px 13px;
    font-size: 10px; font-weight: 800; letter-spacing: .14em; text-transform: uppercase;
    background: rgba(255,255,255,.95);
    backdrop-filter: blur(10px);
    border-radius: 999px;
    color: var(--g1);
    border: 1.5px solid rgba(77,140,30,.25);
    box-shadow: 0 2px 10px rgba(0,0,0,.09);
  }

  /* Time badge */
  .blog-read-badge {
    position: absolute; bottom: 14px; right: 14px; z-index: 3;
    display: flex; align-items: center; gap: 5px;
    padding: 5px 12px;
    font-size: 11px; font-weight: 600;
    background: rgba(10,20,5,.72);
    backdrop-filter: blur(10px);
    border-radius: 999px;
    color: rgba(255,255,255,.88);
    border: 1px solid rgba(255,255,255,.1);
  }

  /* ─── Content pane ─── */
  .blog-content-pane {
    padding: 32px 40px 32px 36px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
  }

  /* Watermark number */
  .blog-number {
    position: absolute; top: 24px; right: 32px;
    font-family: 'Playfair Display', serif;
    font-size: 80px; font-weight: 700; line-height: 1;
    color: rgba(77,140,30,.06);
    pointer-events: none; user-select: none;
  }

  /* Meta */
  .blog-meta {
    display: flex; align-items: center; gap: 14px; flex-wrap: wrap;
    font-size: 11px; font-weight: 700; letter-spacing: .1em;
    text-transform: uppercase; color: var(--text-3);
    margin-bottom: 14px;
  }
  .blog-meta-item { display: flex; align-items: center; gap: 5px; }
  .blog-meta-sep {
    width: 3px; height: 3px; border-radius: 50%;
    background: rgba(77,140,30,.3); flex-shrink: 0;
  }
  .blog-meta-cat { color: var(--g1); }

  /* Post title */
  .blog-post-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(18px, 2vw, 26px);
    font-weight: 600; color: var(--text-1);
    line-height: 1.3; margin: 0 0 12px;
    transition: color .2s;
    cursor: pointer; text-align: left;
    background: none; border: none; padding: 0;
    width: 100%;
  }
  .blog-post-title:hover { color: var(--g1); }

  /* Divider under title */
  .blog-divider {
    width: 36px; height: 3px; border-radius: 99px;
    background: var(--grad);
    margin-bottom: 14px;
    flex-shrink: 0;
  }

  /* Excerpt */
  .blog-excerpt {
    font-size: 14.5px; color: var(--text-2);
    line-height: 1.75; margin: 0 0 22px;
    font-weight: 400;
  }

  /* Expanded content */
  .blog-expanded {
    overflow: hidden;
    transition: max-height .4s cubic-bezier(.4,0,.2,1), opacity .3s;
    max-height: 0; opacity: 0;
  }
  .blog-expanded.open { max-height: 400px; opacity: 1; }
  .blog-expanded-inner {
    padding-top: 14px;
    border-top: 1px solid var(--border);
    margin-bottom: 18px;
  }
  .blog-expanded-inner p {
    font-size: 14px; color: var(--text-2); line-height: 1.8; margin: 0;
  }

  /* Read more btn */
  .blog-read-btn {
    display: inline-flex; align-items: center; gap: 7px;
    font-size: 11px; font-weight: 800; letter-spacing: .13em;
    text-transform: uppercase; color: var(--g1);
    background: rgba(77,140,30,.07);
    border: 1.5px solid var(--border-md);
    border-radius: 999px;
    padding: 9px 20px;
    cursor: pointer; transition: all .22s;
    align-self: flex-start;
  }
  .blog-read-btn:hover {
    background: var(--grad);
    color: #fff; border-color: transparent;
    box-shadow: 0 6px 20px rgba(77,140,30,.28);
    transform: translateY(-1px);
  }

  /* ─── Footer CTA ─── */
  .blog-footer {
    display: flex; align-items: center; justify-content: center;
    margin-top: 52px; gap: 20px;
  }
  .blog-footer-line {
    flex: 1; max-width: 180px; height: 1px;
    background: linear-gradient(90deg, transparent, var(--border-md));
  }
  .blog-footer-line.r { background: linear-gradient(270deg, transparent, var(--border-md)); }

  .blog-footer-btn {
    display: inline-flex; align-items: center; gap: 10px;
    font-size: 12px; font-weight: 800; letter-spacing: .13em; text-transform: uppercase;
    text-decoration: none; color: #fff;
    padding: 14px 36px;
    background: var(--grad);
    border-radius: 999px;
    box-shadow: 0 8px 30px rgba(77,140,30,.32);
    transition: opacity .2s, transform .2s;
  }
  .blog-footer-btn:hover { opacity: .88; transform: translateY(-3px); }

  /* ─── Responsive ─── */
  @media (max-width: 1024px) {
    .blog-article-inner { grid-template-columns: 320px 1fr; }
    .blog-content-pane { padding: 28px 28px; }
    .blog-number { font-size: 64px; }
  }
  @media (max-width: 820px) {
<<<<<<< HEAD
=======
    .blog-section { padding: 56px 0 68px; }
    .blog-header { margin-bottom: 40px; }
>>>>>>> 0ae470e (update home pages)
    .blog-view-all { display: none; }
    .blog-article-inner { grid-template-columns: 1fr; }
    .blog-img-pane { height: 240px; min-height: unset; }
    .blog-img-pane::after { background: linear-gradient(to bottom, transparent 55%, rgba(255,255,255,.12)); }
    .blog-content-pane { padding: 24px 24px 28px; }
    .blog-number { display: none; }
  }
<<<<<<< HEAD
  @media (max-width: 540px) {
    .blog-section { padding: 32px 0 40px; }
    .blog-article { border-radius: 20px; }
    .blog-img-pane { height: 200px; }
    .blog-content-pane { padding: 20px 18px 24px; }
=======

  @media (max-width: 640px) {
    .blog-section { padding: 44px 0 56px; }
    .blog-article { border-radius: 18px; margin-bottom: 14px; }
    .blog-img-pane { height: 210px; }
    .blog-content-pane { padding: 20px 20px 24px; }
    .blog-excerpt { font-size: 14px; margin-bottom: 18px; }
    .blog-meta { gap: 10px; font-size: 10px; }
    .blog-header { margin-bottom: 36px; }
    .blog-footer { margin-top: 36px; }
  }

  @media (max-width: 480px) {
    .blog-inner { padding: 0 16px; }
    .blog-article-inner { grid-template-rows: 190px auto; }
    .blog-img-pane { height: 190px; }
    .blog-title { font-size: 24px; }
    .blog-post-title { font-size: 18px; }
>>>>>>> 0ae470e (update home pages)
    .blog-excerpt { font-size: 13.5px; }
    .blog-footer { margin-top: 28px; }
    .blog-footer-line { max-width: 50px; }
  }
`;

export default function HomeBlogSection() {
  const [expandedPosts, setExpandedPosts] = useState({});

  const toggle = (id) =>
    setExpandedPosts((prev) => ({ ...prev, [id]: !prev[id] }));

  const getExtendedExcerpt = (content) => {
    const plain = content
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim();
    return plain.substring(0, 350) + "…";
  };

  return (
    <>
      <style>{CSS}</style>
      <div className="blog-root">
        <section className="blog-section">
          {/* blobs */}
          <div className="blog-blob-tl" />
          <div className="blog-blob-br" />

          <div className="blog-inner">
            {/* ── Header ── */}
            <div className="blog-header">
              <div className="blog-header-left">
                <div className="blog-eyebrow">
                  <div className="blog-eyebrow-dot">
                    <Sprout size={12} color="#fff" />
                  </div>
                  <span>Latest Insights</span>
                </div>
                <h2 className="blog-title">
                  News &amp; <em>Perspectives</em>
                </h2>
              </div>
             
            </div>

            {/* ── Articles ── */}
            <div className="blog-list">
              {blogPosts.map((post, idx) => {
                const isOpen = expandedPosts[post.id];
                return (
                  <article key={post.id} className="blog-article">
                    <div className="blog-article-inner">
                      {/* Image */}
                      <div className="blog-img-pane">
                        <span className="blog-cat-badge">{post.category}</span>
                        <img src={post.image} alt={post.title} loading="lazy" />
                        <span className="blog-read-badge">
                          <Clock size={11} />
                          {post.time}
                        </span>
                      </div>

                      {/* Content */}
                      <div className="blog-content-pane">
                        <span className="blog-number">0{idx + 1}</span>

                        {/* Meta */}
                        <div className="blog-meta">
                          <span className="blog-meta-item">
                            <Calendar size={11} />
                            {post.date}
                          </span>
                          <span className="blog-meta-sep" />
                          <span className="blog-meta-item blog-meta-cat">
                            <TrendingUp size={11} />
                            {post.category}
                          </span>
                        </div>

                        {/* Title */}
                        <button
                          className="blog-post-title"
                          onClick={() => toggle(post.id)}
                        >
                          {post.title}
                        </button>

                        {/* Green accent divider */}
                        <div className="blog-divider" />

                        {/* Excerpt */}
                        <p className="blog-excerpt">{post.excerpt}</p>

                        {/* Expanded content */}
                        <div
                          className={`blog-expanded${isOpen ? " open" : ""}`}
                        >
                          <div className="blog-expanded-inner">
                            <p>{getExtendedExcerpt(post.content)}</p>
                          </div>
                        </div>

                        {/* Toggle btn */}
                        <button
                          className="blog-read-btn"
                          onClick={() => toggle(post.id)}
                        >
                          {isOpen ? (
                            <>
                              <ChevronUp size={13} /> Read Less
                            </>
                          ) : (
                            <>
                              <ChevronDown size={13} /> Read More
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
