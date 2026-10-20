import { ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';

export default function Footer({ onNavigate }) {
  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToProposal = (e) => {
    e.preventDefault();
    const el = document.getElementById('proposal');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      onNavigate('/');
      setTimeout(() => {
        const p = document.getElementById('proposal');
        if (p) p.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    }
  };

  return (
    <footer className="site-footer">
      {/* Colossal Architectural Watermark */}
      <div className="footer-watermark" aria-hidden="true">
        ALGORYXZ
      </div>

      <motion.div
        className="footer-top-grid"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Brand identity & Manifesto */}
        <div>
          <a
            href="/"
            className="brand-link"
            aria-label="Algoryxz Agency & Co. home"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('/');
            }}
          >
            <div className="brand-algoryxz-symbol" aria-hidden="true">
              <div className="algoryxz-hex-outer" />
              <div className="algoryxz-hex-inner" />
            </div>
            <span className="brand-title">
              ALGORYXZ<span>AGENCY & CO.</span>
            </span>
          </a>

          <p className="footer-manifesto" style={{ marginTop: '20px' }}>
            Algorithmic precision.<br />
            Spatial immersion.<br />
            <span>The extraordinary standard.</span>
          </p>
        </div>

        {/* Global Coordinates & Dispatch Telemetry */}
        <div className="footer-telemetry-col">
          <span className="eyebrow eyebrow-light">OPERATIONAL NETWORK & HUBS</span>
          <div className="footer-hub-list">
            <div className="footer-hub-item">
              <span className="hub-city">LONDON / ARCHITECTURE</span>
              <span className="hub-coord">51.5074° N, 0.1278° W</span>
            </div>
            <div className="footer-hub-item">
              <span className="hub-city">NEW YORK / SCENOGRAPHY</span>
              <span className="hub-coord">40.7128° N, 74.0060° W</span>
            </div>
            <div className="footer-hub-item">
              <span className="hub-city">TOKYO / LIGHT & TECH</span>
              <span className="hub-coord">35.6762° N, 139.6503° E</span>
            </div>
          </div>
        </div>

        {/* International Context & Proposal Trigger */}
        <div className="footer-contact-block">
          <span className="eyebrow eyebrow-light">GLOBAL COMMISSION STATUS</span>
          <div className="footer-status-pill">
            <span className="status-dot-pulse" aria-hidden="true" />
            <span>INTAKE ACTIVE · Q3/Q4 SCHEDULE</span>
          </div>

          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-light-subtle)', margin: '14px 0 20px', lineHeight: '1.6' }}>
            We review new briefs within 24 business hours. No generic sales packages.
          </p>

          <a
            href="/#proposal"
            className="btn btn-lime"
            style={{ width: 'fit-content' }}
            onClick={scrollToProposal}
          >
            <span>Initiate an experience brief</span>
            <ArrowUpRight size={16} />
          </a>
        </div>
      </motion.div>

      {/* Footer Bottom Bar */}
      <div className="footer-bottom-bar">
        <span>© 2026 Algoryxz Agency & Co. All rights reserved.</span>
        <span>Spatial Scenography & Experiential Marketing</span>

        <div className="footer-links-group">
          <a
            href="/privacy"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('/privacy');
            }}
          >
            Privacy policy
          </a>

          <a
            href="/403"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('/403');
            }}
            style={{ opacity: 0.6 }}
          >
            Backstage (403)
          </a>

          <a
            href="/404"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('/404');
            }}
            style={{ opacity: 0.6 }}
          >
            404 Route
          </a>

          <a href="#top" onClick={scrollToTop}>
            Back to top ↑
          </a>
        </div>
      </div>

      {/* Brand Integrity & Disclosure Notice */}
      <p className="brand-integrity-note">
        Algoryxz Agency & Co. operates as an international creative experience collective. Curated projects depicted on this platform represent spatial prototypes, creative direction studies, and concept explorations.
      </p>
    </footer>
  );
}
