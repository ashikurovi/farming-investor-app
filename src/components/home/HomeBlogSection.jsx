"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Calendar, Clock, ChevronDown, ChevronUp, Sprout, TrendingUp, Leaf } from "lucide-react";
import { blogPosts } from "../../data/blog";

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Outfit:wght@300;400;500;600;700&display=swap');

  .blog-root {
    font-family: 'Outfit', sans-serif;
    --g1: #4d8c1e;
    --g2: #7cc22e;
    --grad: linear-gradient(135deg, #4d8c1e, #7cc22e);
    --glow: rgba(124,194,46,.15);
    --bg: #f5f7f2;
    --card: #ffffff;
    --dark: #0f1a08;
    --text-1: #111a0a;
    --text-2: #4a5c3a;
    --text-3: #8fa07a;
    --border: rgba(77,140,30,.14);
    --border-md: rgba(77,140,30,.28);
  }

  .blog-root * { box-sizing: border-box; }

  .blog-section {
    background: var(--bg);
    padding: 72px 0 84px;
    position: relative;
    overflow: hidden;
  }

  /* Subtle background decor */
  .blog-section::before {
    content: '';
    position: absolute; inset: 0; pointer-events: none;
    background:
      radial-gradient(ellipse 60% 40% at 5% 10%, rgba(124,194,46,.07) 0%, transparent 70%),
      radial-gradient(ellipse 50% 60% at 95% 85%, rgba(77,140,30,.06) 0%, transparent 70%);
  }
  .blog-section::after {
    content: '';
    position: absolute; inset: 0; pointer-events: none;
    background-image: radial-gradient(circle, rgba(77,140,30,.055) 1px, transparent 1px);
    background-size: 36px 36px;
  }

  .blog-inner {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 24px;
    position: relative;
    z-index: 1;
  }

  /* ── Header ── */
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
    padding: 6px 14px 6px 10px;
    background: rgba(255,255,255,.9);
    border: 1px solid var(--border-md);
    border-radius: 999px;
    margin-bottom: 20px;
    backdrop-filter: blur(8px);
  }
  .blog-eyebrow-dot {
    width: 22px; height: 22px; border-radius: 50%;
    background: var(--grad);
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
  }
  .blog-eyebrow span {
    font-size: 11px; font-weight: 700;
    letter-spacing: .14em; text-transform: uppercase;
    color: var(--g1);
  }

  .blog-title {
    font-family: 'Playfair Display', serif;
    font-size: 30px;
    font-weight: 400; color: var(--text-1);
    line-height: 1.15; margin: 0;
  }
  .blog-title em {
    font-style: italic;
    background: var(--grad);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .blog-view-all {
    display: inline-flex; align-items: center; gap: 8px;
    font-size: 12px; font-weight: 700; letter-spacing: .12em;
    text-transform: uppercase; text-decoration: none;
    color: var(--text-1);
    padding: 12px 22px;
    border: 1.5px solid var(--border-md);
    border-radius: 999px;
    background: rgba(255,255,255,.7);
    backdrop-filter: blur(6px);
    transition: all .25s; white-space: nowrap;
  }
  .blog-view-all:hover {
    background: var(--grad);
    color: #fff;
    border-color: transparent;
    box-shadow: 0 6px 24px rgba(77,140,30,.3);
    transform: translateY(-2px);
  }
  .blog-view-all:hover svg { stroke: #fff; transform: translateX(3px); }
  .blog-view-all svg { transition: all .2s; }

  /* ── Article card ── */
  .blog-list { display: flex; flex-direction: column; gap: 2px; }

  .blog-article {
    background: var(--card);
    border: 1.5px solid var(--border);
    border-radius: 24px;
    overflow: hidden;
    margin-bottom: 18px;
    transition: box-shadow .3s, border-color .3s;
    position: relative;
  }
  .blog-article::before {
    content: '';
    position: absolute; top: 0; left: 0; right: 0; height: 2px;
    background: var(--grad); opacity: 0;
    transition: opacity .3s;
    border-radius: 24px 24px 0 0;
  }
  .blog-article:hover {
    box-shadow: 0 12px 48px rgba(77,140,30,.1);
    border-color: var(--border-md);
  }
  .blog-article:hover::before { opacity: 1; }

  .blog-article-inner {
    display: grid;
    grid-template-columns: 420px 1fr;
    gap: 0;
    min-height: 300px;
  }

  /* Image pane */
  .blog-img-pane {
    position: relative;
    overflow: hidden;
    flex-shrink: 0;
  }
  .blog-img-pane img {
    width: 100%; height: 100%; object-fit: cover;
    transition: transform .7s cubic-bezier(.4,0,.2,1);
    display: block;
  }
  .blog-article:hover .blog-img-pane img { transform: scale(1.05); }

  /* Category badge */
  .blog-cat-badge {
    position: absolute; top: 16px; left: 16px; z-index: 2;
    padding: 5px 12px;
    font-size: 10px; font-weight: 700; letter-spacing: .12em; text-transform: uppercase;
    background: rgba(255,255,255,.92);
    backdrop-filter: blur(8px);
    border-radius: 999px;
    color: var(--g1);
    border: 1px solid rgba(77,140,30,.2);
    box-shadow: 0 2px 8px rgba(0,0,0,.08);
  }

  /* Read time badge */
  .blog-read-badge {
    position: absolute; bottom: 16px; right: 16px; z-index: 2;
    display: flex; align-items: center; gap: 5px;
    padding: 5px 11px;
    font-size: 11px; font-weight: 500;
    background: rgba(15,26,8,.75);
    backdrop-filter: blur(8px);
    border-radius: 999px;
    color: rgba(255,255,255,.85);
  }

  /* Gradient overlay on image */
  .blog-img-pane::after {
    content: '';
    position: absolute; inset: 0;
    background: linear-gradient(to right, transparent 60%, rgba(255,255,255,.08) 100%);
    pointer-events: none;
  }

  /* Content pane */
  .blog-content-pane {
    padding: 32px 36px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 0;
  }

  /* Meta row */
  .blog-meta {
    display: flex; align-items: center; gap: 16px;
    font-size: 11px; font-weight: 600; letter-spacing: .1em;
    text-transform: uppercase; color: var(--text-3);
    margin-bottom: 16px;
  }
  .blog-meta-item { display: flex; align-items: center; gap: 5px; }
  .blog-meta-dot { width: 3px; height: 3px; border-radius: 50%; background: var(--border-md); }

  /* Post title */
  .blog-post-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(20px, 2.2vw, 28px);
    font-weight: 600; color: var(--text-1);
    line-height: 1.28; margin: 0 0 14px;
    transition: color .2s;
    cursor: pointer; text-align: left;
    background: none; border: none; padding: 0;
    font-family: 'Playfair Display', serif;
  }
  .blog-post-title:hover { color: var(--g1); }

  /* Excerpt */
  .blog-excerpt {
    font-size: 15px; color: var(--text-2);
    line-height: 1.72; margin: 0 0 24px;
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
    padding-top: 16px;
    border-top: 1px solid var(--border);
    margin-bottom: 16px;
  }
  .blog-expanded-inner p {
    font-size: 14px; color: var(--text-2); line-height: 1.75; margin: 0;
  }

  /* Read more btn */
  .blog-read-btn {
    display: inline-flex; align-items: center; gap: 6px;
    font-size: 11px; font-weight: 700; letter-spacing: .12em;
    text-transform: uppercase; color: var(--g1);
    background: rgba(77,140,30,.07);
    border: 1px solid var(--border-md);
    border-radius: 999px;
    padding: 8px 18px;
    cursor: pointer; transition: all .22s;
    align-self: flex-start;
  }
  .blog-read-btn:hover {
    background: var(--grad);
    color: #fff; border-color: transparent;
    box-shadow: 0 4px 16px rgba(77,140,30,.28);
  }

  /* ── Number index ── */
  .blog-number {
    position: absolute; top: 28px; right: 32px;
    font-family: 'Playfair Display', serif;
    font-size: 72px; font-weight: 700; line-height: 1;
    color: rgba(77,140,30,.06);
    pointer-events: none; user-select: none;
  }

  /* ── View all footer ── */
  .blog-footer {
    display: flex; align-items: center; justify-content: center;
    margin-top: 48px; gap: 16px;
  }
  .blog-footer-line {
    flex: 1; max-width: 200px; height: 1px;
    background: linear-gradient(90deg, transparent, var(--border-md));
  }
  .blog-footer-line.r { background: linear-gradient(90deg, var(--border-md), transparent); }

  .blog-footer-btn {
    display: inline-flex; align-items: center; gap: 10px;
    font-size: 12px; font-weight: 700; letter-spacing: .12em; text-transform: uppercase;
    text-decoration: none; color: #fff;
    padding: 14px 32px;
    background: var(--grad);
    border-radius: 999px;
    box-shadow: 0 6px 28px rgba(77,140,30,.32);
    transition: opacity .2s, transform .2s;
  }
  .blog-footer-btn:hover { opacity: .88; transform: translateY(-2px); }

  /* ── Responsive ── */
  @media (max-width: 1024px) {
    .blog-article-inner { grid-template-columns: 340px 1fr; }
    .blog-content-pane { padding: 28px 28px; }
    .blog-number { font-size: 56px; top: 20px; right: 22px; }
  }

  @media (max-width: 820px) {
    .blog-section { padding: 56px 0 68px; }
    .blog-header { margin-bottom: 40px; }
    .blog-view-all { display: none; }
    .blog-article-inner {
      grid-template-columns: 1fr;
      grid-template-rows: 240px auto;
    }
    .blog-img-pane { height: 240px; }
    .blog-img-pane::after { background: linear-gradient(to bottom, transparent 60%, rgba(255,255,255,.06) 100%); }
    .blog-content-pane { padding: 24px 24px 28px; }
    .blog-number { display: none; }
    .blog-post-title { font-size: 20px; }
  }

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
    .blog-excerpt { font-size: 13.5px; }
    .blog-footer-line { max-width: 60px; }
  }
`;

export default function HomeBlogSection() {
  const [expandedPosts, setExpandedPosts] = useState({});

  const toggle = (id) =>
    setExpandedPosts((prev) => ({ ...prev, [id]: !prev[id] }));

  const getExtendedExcerpt = (content) => {
    const plain = content.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
    return plain.substring(0, 350) + "...";
  };

  return (
    <>
      <style>{CSS}</style>
      <div className="blog-root">
        <section className="blog-section">
          <div className="blog-inner">

            {/* Header */}
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
              {/* <Link href="/landing/blog" className="blog-view-all">
                Read All Articles
                <ArrowRight size={14} />
              </Link> */}
            </div>

            {/* Articles */}
            <div className="blog-list">
              {blogPosts.map((post, idx) => {
                const isOpen = expandedPosts[post.id];
                return (
                  <article key={post.id} className="blog-article">
                    <div className="blog-article-inner">

                      {/* Image */}
                      <div className="blog-img-pane">
                        <span className="blog-cat-badge">{post.category}</span>
                        <img src={post.image} alt={post.title} />
                        <span className="blog-read-badge">
                          <Clock size={11} />
                          {post.time}
                        </span>
                      </div>

                      {/* Content */}
                      <div className="blog-content-pane" style={{ position: "relative" }}>
                        <span className="blog-number">0{idx + 1}</span>

                        {/* Meta */}
                        <div className="blog-meta">
                          <span className="blog-meta-item">
                            <Calendar size={12} />
                            {post.date}
                          </span>
                          <span className="blog-meta-dot" />
                          <span className="blog-meta-item" style={{ color: "var(--g1)" }}>
                            <TrendingUp size={12} />
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

                        {/* Excerpt */}
                        <p className="blog-excerpt">{post.excerpt}</p>

                        {/* Expanded */}
                        <div className={`blog-expanded${isOpen ? " open" : ""}`}>
                          <div className="blog-expanded-inner">
                            <p>{getExtendedExcerpt(post.content)}</p>
                          </div>
                        </div>

                        {/* Read more */}
                        <button
                          className="blog-read-btn"
                          onClick={() => toggle(post.id)}
                        >
                          {isOpen ? (
                            <><ChevronUp size={13} /> Read Less</>
                          ) : (
                            <><ChevronDown size={13} /> Read More</>
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
