import { useState, useEffect } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';

export default function Header({ currentPath, onNavigate }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
          setMobileMenuOpen(false);
        }
      };

      window.addEventListener('keydown', handleKeyDown);

      return () => {
        document.body.style.overflow = originalOverflow;
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [mobileMenuOpen]);

  const handleLinkClick = (e, targetHref) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    if (targetHref.startsWith('/#')) {
      const hash = targetHref.replace('/', '');
      if (currentPath !== '/') {
        onNavigate('/');
        setTimeout(() => {
          const el = document.querySelector(hash);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      } else {
        const el = document.querySelector(hash);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      onNavigate(targetHref);
    }
  };

  return (
    <>
      <a href="#main-content" className="sr-only skip-to-content">
        Skip to main content
      </a>

      <header className={`site-header ${isScrolled ? 'is-scrolled' : ''}`}>
        {/* Algoryxz Brand Monogram & Wordmark */}
        <a
          href="/"
          className="brand-link"
          aria-label="Algoryxz Agency & Co. home"
          onClick={(e) => handleLinkClick(e, '/')}
        >
          <div className="brand-algoryxz-symbol" aria-hidden="true">
            <div className="algoryxz-hex-outer" />
            <div className="algoryxz-hex-inner" />
          </div>
          <span className="brand-title">
            ALGORYXZ
            <span>AGENCY & CO.</span>
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="desktop-nav" aria-label="Main navigation">
          <a
            href="/#work"
            className="nav-link"
            onClick={(e) => handleLinkClick(e, '/#work')}
          >
            Selected Work
          </a>
          <a
            href="/#services"
            className="nav-link"
            onClick={(e) => handleLinkClick(e, '/#services')}
          >
            Methodology
          </a>
          <a
            href="/#about"
            className="nav-link"
            onClick={(e) => handleLinkClick(e, '/#about')}
          >
            Agency & Co.
          </a>
        </nav>

        {/* Primary CTA */}
        <a
          href="/#proposal"
          className="header-cta"
          onClick={(e) => handleLinkClick(e, '/#proposal')}
        >
          <span>Initiate Brief</span>
          <ArrowUpRight size={15} />
        </a>

        {/* Mobile Menu Toggle Button */}
        <button
          className="mobile-menu-toggle"
          onClick={() => setMobileMenuOpen(true)}
          aria-label="Open navigation menu"
          aria-expanded={mobileMenuOpen}
        >
          <Menu size={22} />
        </button>
      </header>

      {/* Mobile Drawer Backdrop */}
      {mobileMenuOpen && (
        <div
          className="mobile-nav-backdrop"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <aside
          className="mobile-nav-drawer"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
        >
          <div className="mobile-nav-header">
            <span className="brand-title">
              ALGORYXZ<span>AGENCY & CO.</span>
            </span>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="icon-round-btn icon-round-btn-dark"
              aria-label="Close menu"
            >
              <X size={20} />
            </button>
          </div>

          <div className="mobile-nav-links">
            <a
              href="/#work"
              className="mobile-nav-link"
              onClick={(e) => handleLinkClick(e, '/#work')}
            >
              <span>Selected Work</span>
              <ArrowUpRight size={20} />
            </a>
            <a
              href="/#services"
              className="mobile-nav-link"
              onClick={(e) => handleLinkClick(e, '/#services')}
            >
              <span>Methodology</span>
              <ArrowUpRight size={20} />
            </a>
            <a
              href="/#about"
              className="mobile-nav-link"
              onClick={(e) => handleLinkClick(e, '/#about')}
            >
              <span>Agency & Co.</span>
              <ArrowUpRight size={20} />
            </a>
            <a
              href="/privacy"
              className="mobile-nav-link"
              onClick={(e) => handleLinkClick(e, '/privacy')}
            >
              <span>Privacy Policy</span>
              <ArrowUpRight size={20} />
            </a>
          </div>

          <div style={{ marginTop: 'auto', paddingTop: '24px' }}>
            <a
              href="/#proposal"
              className="btn btn-lime"
              style={{ width: '100%', justifyContent: 'center' }}
              onClick={(e) => handleLinkClick(e, '/#proposal')}
            >
              <span>Initiate a Brief</span>
              <ArrowUpRight size={16} />
            </a>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.625rem', color: 'var(--text-light-subtle)', marginTop: '16px', textAlign: 'center', letterSpacing: '0.12em' }}>
              SPATIAL DESIGN & EXPERIENTIAL ACTIVATIONS
            </p>
          </div>
        </aside>
      )}
    </>
  );
}
