import { ArrowUpRight, ArrowDown, Play } from 'lucide-react';
import HeroCanvas from './HeroCanvas';

export default function Hero({ onOpenCinema }) {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero-section" aria-labelledby="hero-title">
      {/* Interactive Algorithmic 3D Canvas */}
      <HeroCanvas />

      {/* Hero Photography Layer */}
      <div className="hero-photo-wrap">
        <img
          className="hero-photo"
          src="https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=1800&q=80"
          alt="Volumetric architectural laser light installation commanding spatial presence"
          fetchPriority="high"
        />
        <div className="hero-gradient-overlay" />
      </div>

      {/* Foreground Content */}
      <div className="hero-content">
        <div>
          {/* Eyebrow Kicker */}
          <div className="hero-kicker-row">
            <span className="hero-kicker-badge">
              <span>CONTEMPORARY CREATIVE EXPERIENCE AGENCY</span>
              <span className="spark-star" aria-hidden="true">✦</span>
            </span>
          </div>

          {/* Signature Headline */}
          <h1 id="hero-title" className="hero-title">
            ARCHITECTING<br />
            EXPERIENCES THAT DEFY<br />
            <span>THE EXPECTED.</span>
          </h1>
        </div>

        {/* Interactive Row: Supporting copy, CTA & Cinema reel trigger */}
        <div className="hero-interactive-row">
          <div>
            <p className="hero-subheading">
              From algorithmic strategy to tactile reality. We conceive, design, and produce experiential marketing, corporate environments, product launches, and brand activations worldwide.
            </p>
            <div className="hero-cta-group">
              <a
                href="#proposal"
                className="btn btn-lime"
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo('proposal');
                }}
              >
                <span>Initiate a proposal</span>
                <ArrowUpRight size={18} className="btn-arrow" />
              </a>

              <button
                type="button"
                className="hero-reel-btn"
                onClick={onOpenCinema}
                aria-label="Open interactive preview reel of Algoryxz experiences"
              >
                <div className="play-pulsar" aria-hidden="true">
                  <Play size={18} fill="currentColor" style={{ marginLeft: 2 }} />
                </div>
                <div className="hero-reel-text">
                  <span>Explore creative reel</span>
                  <small>INTERACTIVE PREVIEW</small>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Baseline Metadata & Scroll Prompt */}
        <div className="hero-baseline">
          <span>SPATIAL DESIGN · BRAND ACTIVATIONS · GLOBAL SUMMITS</span>
          <a
            href="#intro"
            className="hero-scroll-cue"
            onClick={(e) => {
              e.preventDefault();
              scrollTo('intro');
            }}
            aria-label="Discover Algoryxz Agency & Co."
          >
            <span>SCROLL TO EXPLORE</span>
            <ArrowDown size={14} />
          </a>
        </div>
      </div>
    </section>
  );
}
