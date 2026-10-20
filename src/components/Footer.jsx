import { ArrowUpRight } from 'lucide-react';

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
      <div className="footer-top-grid">
        {/* Brand identity */}
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
        </div>

        {/* Agency Tagline / Manifesto */}
        <div>
          <p className="footer-manifesto">
            Algorithmic precision.<br />
            Spatial immersion.<br />
            <span>The extraordinary standard.</span>
          </p>
        </div>

        {/* International Context & Proposal Trigger */}
        <div className="footer-contact-block">
          <span className="eyebrow eyebrow-light">CREATIVE EXPERIENCES. GLOBAL DISPATCH.</span>
          <a
            href="/#proposal"
            onClick={scrollToProposal}
          >
            <span>Initiate an experience brief</span>
            <ArrowUpRight size={16} />
          </a>
        </div>
      </div>

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
