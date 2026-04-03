"use client";

import { useState } from "react";
import { ChevronDown, MessageCircle, Mail, Phone, Leaf } from "lucide-react";

const faqs = [
  {
    question: "How does the farming investment model work?",
    answer:
      "Our platform connects investors with sustainable agricultural projects. You browse vetted farms, choose a project that aligns with your goals, and invest. We handle the operations, and you receive updates and returns based on the harvest cycles.",
  },
  {
    question: "What is the minimum investment amount?",
    answer:
      "To make agricultural investment accessible, our minimum investment starts from as low as BDT 10,000. This allows you to diversify your portfolio across multiple projects and crop types.",
  },
  {
    question: "How are the returns calculated and distributed?",
    answer:
      "Returns are calculated based on the actual yield and market price of the produce. We provide projected ROI for each project based on historical data. Profits are distributed to your wallet after the harvest is sold, typically every 3-6 months depending on the crop.",
  },
  {
    question: "Is my investment secured against risks?",
    answer:
      "We employ modern farming techniques and insurance coverage for eligible projects to mitigate risks. While all investments carry some risk, our expert team manages the farms to maximize yield and minimize potential losses from weather or pests.",
  },
  {
    question: "Can I visit the farm I invested in?",
    answer:
      "Yes! We encourage transparency. You can schedule a guided farm visit through our platform to see the operations firsthand and meet the farmers managing your investment.",
  },
];

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400;1,600&family=Outfit:wght@300;400;500;600;700&display=swap');

  .faq-root {
    font-family: 'Outfit', sans-serif;
    --g1: #4d8c1e;
    --g2: #7cc22e;
    --grad: linear-gradient(135deg, #4d8c1e, #7cc22e);
    --grad-r: linear-gradient(135deg, #7cc22e, #4d8c1e);
    --glow: rgba(124,194,46,.18);
    --bg: #f5f7f2;
    --card: #ffffff;
    --dark: #0f1a08;
    --dark2: #1a2e0d;
    --text-1: #111a0a;
    --text-2: #4a5c3a;
    --text-3: #8fa07a;
    --border: rgba(77,140,30,.15);
    --border-md: rgba(77,140,30,.3);
  }

  .faq-root * { box-sizing: border-box; }

  /* Section background with subtle leaf pattern */
  .faq-section {
    background: var(--bg);
    padding: 72px 0 84px;
    position: relative;
    overflow: hidden;
  }

  .faq-section::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image:
      radial-gradient(circle at 15% 20%, rgba(124,194,46,.08) 0%, transparent 50%),
      radial-gradient(circle at 85% 75%, rgba(77,140,30,.07) 0%, transparent 50%);
    pointer-events: none;
  }

  /* Decorative grid dots */
  .faq-section::after {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    background-image: radial-gradient(circle, rgba(77,140,30,.06) 1px, transparent 1px);
    background-size: 32px 32px;
    pointer-events: none;
  }

  .faq-inner {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 24px;
    position: relative;
    z-index: 1;
  }

  /* ── Header ── */
  .faq-header { margin-bottom: 48px; }

  .faq-eyebrow {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 6px 14px 6px 10px;
    background: rgba(255,255,255,.85);
    border: 1px solid var(--border-md);
    border-radius: 999px;
    margin-bottom: 22px;
    backdrop-filter: blur(8px);
  }
  .faq-eyebrow-dot {
    width: 20px; height: 20px; border-radius: 50%;
    background: var(--grad);
    display: flex; align-items: center; justify-content: center;
  }
  .faq-eyebrow span {
    font-size: 11px; font-weight: 700; letter-spacing: .14em;
    text-transform: uppercase; color: var(--g1);
  }

  .faq-title {
    font-family: 'Playfair Display', serif;
    font-size: 30px;
    font-weight: 400;
    color: var(--text-1);
    line-height: 1.15;
    margin: 0 0 16px;
  }
  .faq-title em {
    font-style: italic;
    background: var(--grad);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .faq-subtitle {
    font-size: 16px; color: var(--text-2); max-width: 520px;
    line-height: 1.65; margin: 0; font-weight: 400;
  }

  /* ── Grid ── */
  .faq-grid {
    display: grid;
    grid-template-columns: 1fr 380px;
    gap: 40px;
    align-items: start;
  }

  /* ── Accordion ── */
  .faq-list { display: flex; flex-direction: column; gap: 10px; }

  .faq-item {
    background: var(--card);
    border: 1.5px solid var(--border);
    border-radius: 18px;
    overflow: hidden;
    cursor: pointer;
    transition: border-color .25s, box-shadow .25s, transform .2s;
    position: relative;
  }
  .faq-item::before {
    content: '';
    position: absolute; left: 0; top: 0; bottom: 0; width: 0;
    background: var(--grad);
    border-radius: 18px 0 0 18px;
    transition: width .3s;
  }
  .faq-item.open::before { width: 3px; }
  .faq-item:hover:not(.open) {
    border-color: var(--border-md);
    box-shadow: 0 4px 24px rgba(77,140,30,.08);
    transform: translateX(3px);
  }
  .faq-item.open {
    border-color: rgba(77,140,30,.4);
    box-shadow: 0 8px 36px rgba(77,140,30,.12);
  }

  .faq-question {
    display: flex; align-items: center; justify-content: space-between;
    padding: 20px 22px 20px 26px;
    gap: 16px;
  }
  .faq-q-text {
    font-size: 15px; font-weight: 500;
    color: var(--text-1); line-height: 1.4;
    transition: color .2s;
    flex: 1;
  }
  .faq-item.open .faq-q-text { color: var(--g1); }

  .faq-icon {
    width: 30px; height: 30px; border-radius: 10px; flex-shrink: 0;
    display: flex; align-items: center; justify-content: center;
    transition: all .3s;
    background: rgba(77,140,30,.08);
    color: var(--g1);
    border: 1px solid var(--border);
  }
  .faq-item.open .faq-icon {
    background: var(--grad);
    color: #fff;
    border-color: transparent;
    rotate: 180deg;
    box-shadow: 0 4px 12px rgba(77,140,30,.3);
  }

  .faq-answer-wrap {
    max-height: 0;
    overflow: hidden;
    transition: max-height .35s cubic-bezier(.4,0,.2,1);
  }
  .faq-item.open .faq-answer-wrap { max-height: 360px; }

  .faq-answer {
    padding: 0 26px 22px 26px;
    border-top: 1px solid rgba(77,140,30,.1);
    margin-top: 0;
  }
  .faq-answer p {
    font-size: 14px; color: var(--text-2); line-height: 1.75;
    margin: 14px 0 0; font-weight: 400;
  }

  /* ── Sidebar ── */
  .faq-sidebar { display: flex; flex-direction: column; gap: 16px; position: sticky; top: 32px; }

  /* Help card */
  .faq-help-card {
    background: var(--dark);
    border-radius: 24px;
    padding: 28px;
    position: relative; overflow: hidden;
  }
  .faq-help-card::before {
    content: '';
    position: absolute; top: -40px; right: -40px;
    width: 160px; height: 160px; border-radius: 50%;
    background: radial-gradient(circle, rgba(124,194,46,.2) 0%, transparent 70%);
  }
  .faq-help-card::after {
    content: '';
    position: absolute; bottom: -30px; left: -30px;
    width: 120px; height: 120px; border-radius: 50%;
    background: radial-gradient(circle, rgba(77,140,30,.15) 0%, transparent 70%);
  }

  .faq-help-title {
    font-family: 'Playfair Display', serif;
    font-size: 22px; font-weight: 600; color: #fff;
    margin: 0 0 8px; position: relative; z-index: 1;
  }
  .faq-help-sub {
    font-size: 13px; color: rgba(255,255,255,.5);
    margin: 0 0 24px; line-height: 1.6; position: relative; z-index: 1;
  }

  .faq-contact-btns { display: flex; flex-direction: column; gap: 10px; position: relative; z-index: 1; }

  .faq-contact-btn {
    display: flex; align-items: center; gap: 14px;
    padding: 14px 16px;
    background: rgba(255,255,255,.06);
    border: 1px solid rgba(255,255,255,.1);
    border-radius: 14px;
    cursor: pointer;
    transition: background .2s, border-color .2s, transform .2s;
    text-align: left; width: 100%;
  }
  .faq-contact-btn:hover {
    background: rgba(255,255,255,.1);
    border-color: rgba(255,255,255,.18);
    transform: translateX(3px);
  }

  .faq-contact-icon {
    width: 40px; height: 40px; border-radius: 12px; flex-shrink: 0;
    display: flex; align-items: center; justify-content: center;
  }
  .faq-contact-label {
    font-size: 10px; font-weight: 700; letter-spacing: .12em;
    text-transform: uppercase; margin-bottom: 3px;
  }
  .faq-contact-val {
    font-size: 13px; font-weight: 500; color: #fff;
  }

  /* Phone card */
  .faq-phone-card {
    background: var(--card);
    border: 1.5px solid var(--border);
    border-radius: 20px;
    padding: 22px 24px;
    display: flex; align-items: center; gap: 18px;
    transition: box-shadow .2s, border-color .2s;
  }
  .faq-phone-card:hover {
    box-shadow: 0 8px 32px rgba(77,140,30,.1);
    border-color: var(--border-md);
  }
  .faq-phone-icon {
    width: 48px; height: 48px; border-radius: 14px; flex-shrink: 0;
    background: linear-gradient(135deg, rgba(77,140,30,.12), rgba(124,194,46,.18));
    border: 1px solid var(--border-md);
    display: flex; align-items: center; justify-content: center;
  }
  .faq-phone-meta { font-size: 11px; color: var(--text-3); margin: 4px 0 0; font-weight: 500; }
  .faq-phone-num {
    display: block; margin-top: 8px;
    font-size: 20px; font-weight: 700;
    background: var(--grad);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    background-clip: text;
    letter-spacing: -.01em; text-decoration: none;
    transition: opacity .2s;
  }
  .faq-phone-num:hover { opacity: .8; }

  /* ── Stats strip ── */
  .faq-stats {
    display: grid; grid-template-columns: repeat(3, 1fr);
    gap: 1px;
    background: var(--border);
    border: 1.5px solid var(--border);
    border-radius: 16px; overflow: hidden;
    margin-top: 48px;
  }
  .faq-stat {
    background: var(--card);
    padding: 22px 20px;
    text-align: center;
  }
  .faq-stat-val {
    font-family: 'Playfair Display', serif;
    font-size: 28px; font-weight: 600;
    background: var(--grad);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    background-clip: text;
    display: block; margin-bottom: 4px;
  }
  .faq-stat-label { font-size: 12px; color: var(--text-3); font-weight: 500; }

  /* ── Responsive ── */
  @media (max-width: 1024px) {
    .faq-grid { grid-template-columns: 1fr; gap: 48px; }
    .faq-sidebar { position: static; display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
    .faq-help-card { grid-column: 1 / -1; }
    .faq-stats { grid-template-columns: repeat(3, 1fr); }
  }

  @media (max-width: 768px) {
    .faq-section { padding: 56px 0 68px; }
    .faq-header { margin-bottom: 40px; }
    .faq-sidebar { grid-template-columns: 1fr; }
    .faq-stats { grid-template-columns: 1fr; border-radius: 14px; }
    .faq-question { padding: 18px 18px 18px 22px; }
    .faq-answer { padding: 0 18px 18px 22px; }
    .faq-title { font-size: 30px; }
    .faq-help-card { padding: 24px; }
  }

  @media (max-width: 480px) {
    .faq-inner { padding: 0 16px; }
    .faq-title { font-size: 24px; }
    .faq-subtitle { font-size: 14px; }
    .faq-section { padding: 44px 0 56px; }
    .faq-item { border-radius: 14px; }
    .faq-q-text { font-size: 14px; }
    .faq-stats { margin-top: 36px; }
    .faq-stat { padding: 18px 16px; }
    .faq-stat-val { font-size: 24px; }
  }
`;

export default function HomeFaq() {
  const [openIndex, setOpenIndex] = useState(-1);
  const toggle = (i) => setOpenIndex(openIndex === i ? -1 : i);

  return (
    <>
      <style>{CSS}</style>
      <div className="faq-root">
        <section className="faq-section">
          <div className="faq-inner">
            {/* ── Header ── */}
            <div className="faq-header">
              <div className="faq-eyebrow">
                <div className="faq-eyebrow-dot">
                  <Leaf size={11} color="#fff" />
                </div>
                <span>FAQ</span>
              </div>
              <h2 className="faq-title">
                Common questions, <em>clarified.</em>
              </h2>
              <p className="faq-subtitle">
                Everything you need to know about investing in sustainable
                agriculture and growing your wealth with us.
              </p>
            </div>

            {/* ── Main grid ── */}
            <div className="faq-grid">
              {/* Accordion */}
              <div>
                <div className="faq-list">
                  {faqs.map((faq, i) => {
                    const isOpen = openIndex === i;
                    return (
                      <div
                        key={i}
                        className={`faq-item${isOpen ? " open" : ""}`}
                        onClick={() => toggle(i)}
                      >
                        <div className="faq-question">
                          <span className="faq-q-text">{faq.question}</span>
                          <div className="faq-icon">
                            <ChevronDown size={15} strokeWidth={2.5} />
                          </div>
                        </div>
                        <div className="faq-answer-wrap">
                          <div className="faq-answer">
                            <p>{faq.answer}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Stats strip */}
                <div className="faq-stats">
                  {[
                    { val: "500+", label: "Active Investors" },
                    { val: "৳2Cr+", label: "Total Invested" },
                    { val: "98%", label: "Satisfaction Rate" },
                  ].map(({ val, label }) => (
                    <div className="faq-stat" key={label}>
                      <span className="faq-stat-val">{val}</span>
                      <span className="faq-stat-label">{label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sidebar */}
              <aside className="faq-sidebar">
                {/* Help card */}
                <div className="faq-help-card">
                  <h3 className="faq-help-title">Need personal help?</h3>
                  <p className="faq-help-sub">
                    Our investment specialists are ready to assist you anytime.
                  </p>
                  <div className="faq-contact-btns">
                    <button className="faq-contact-btn">
                      <div
                        className="faq-contact-icon"
                        style={{ background: "rgba(124,194,46,.15)" }}
                      >
                        <MessageCircle size={18} color="#7cc22e" />
                      </div>
                      <div>
                        <div
                          className="faq-contact-label"
                          style={{ color: "#7cc22e" }}
                        >
                          Live Chat
                        </div>
                        <div className="faq-contact-val">
                          Start conversation now
                        </div>
                      </div>
                    </button>
                    <button className="faq-contact-btn">
                      <div
                        className="faq-contact-icon"
                        style={{ background: "rgba(96,165,250,.15)" }}
                      >
                        <Mail size={18} color="#60A5FA" />
                      </div>
                      <div>
                        <div
                          className="faq-contact-label"
                          style={{ color: "#60A5FA" }}
                        >
                          Email Support
                        </div>
                        <div className="faq-contact-val">
                          support@xinzofarms.com
                        </div>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Phone card */}
                <div className="faq-phone-card">
                  <div className="faq-phone-icon">
                    <Phone size={20} color="#4d8c1e" />
                  </div>
                  <div>
                    <div
                      style={{
                        fontWeight: 600,
                        fontSize: 15,
                        color: "var(--text-1)",
                      }}
                    >
                      Call us directly
                    </div>
                    <div className="faq-phone-meta">
                      Mon–Fri, 9:00 AM – 6:00 PM
                    </div>
                    <a href="tel:+8801234567890" className="faq-phone-num">
                      +880 1234-567890
                    </a>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
