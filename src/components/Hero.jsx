import { lazy, Suspense, useRef } from 'react';
import { ArrowUpRight, ArrowDown, Play } from 'lucide-react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import KineticHeading from './KineticHeading';

// Lazy-load Three.js canvas to dramatically reduce initial JavaScript execution blocking
const HeroCanvas = lazy(() => import('./HeroCanvas'));

export default function Hero({ onOpenCinema }) {
  const heroRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start']
  });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '7%']);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section ref={heroRef} className="hero-section" aria-labelledby="hero-title">
      {/* Interactive Algorithmic 3D Canvas with Lightweight Zero-Shift Fallback */}
      <Suspense fallback={<div className="hero-canvas-fallback" aria-hidden="true" />}>
        <HeroCanvas />
      </Suspense>

      {/* Hero Photography Layer */}
      <div className="hero-photo-wrap">
        <motion.div
          className="hero-photo-parallax"
          style={{ y: prefersReducedMotion ? 0 : backgroundY }}
          aria-hidden="true"
        >
          <img
            className="hero-photo"
            src="https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=1800&q=80"
            alt=""
            fetchPriority="high"
          />
        </motion.div>
        <div className="hero-gradient-overlay" />
      </div>

      {/* Foreground Content */}
      <div className="hero-content">
        <div>
          {/* Eyebrow Kicker */}
          <motion.div
            className="hero-kicker-row"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="hero-kicker-badge">
              <span>CONTEMPORARY CREATIVE EXPERIENCE AGENCY</span>
              <span className="spark-star" aria-hidden="true">✦</span>
            </span>
          </motion.div>

          {/* Signature Headline */}
          <KineticHeading
            level="h1"
            id="hero-title"
            className="hero-title"
            animateOnMount={true}
            lines={[
              { text: 'ARCHITECTING' },
              { text: 'EXPERIENCES THAT DEFY' },
              { text: 'THE EXPECTED.', accent: true }
            ]}
          />
        </div>

        {/* Interactive Row: Supporting copy, CTA & Cinema reel trigger */}
        <motion.div
          className="hero-interactive-row"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
        >
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
        </motion.div>

        {/* Baseline Metadata & Scroll Prompt */}
        <motion.div
          className="hero-baseline"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.35 }}
        >
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
        </motion.div>
      </div>
    </section>
  );
}
