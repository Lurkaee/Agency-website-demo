import { useState, useEffect, useRef } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';

export default function Header({ onNavigate }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const triggerBtnRef = useRef(null);
  const closeBtnRef = useRef(null);
  const drawerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = (restoreFocus = true) => {
    setMobileMenuOpen(false);
    if (restoreFocus) {
      window.requestAnimationFrame(() => {
        triggerBtnRef.current?.focus();
      });
    }
  };

  useEffect(() => {
    if (mobileMenuOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      // Focus close button on drawer mount
      const focusTimer = setTimeout(() => {
        closeBtnRef.current?.focus();
      }, 50);

      const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
          e.preventDefault();
          closeMenu(true);
          return;
        }

        // Trap Tab key navigation within the drawer
        if (e.key === 'Tab' && drawerRef.current) {
          const focusables = drawerRef.current.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );
          if (focusables.length === 0) return;

          const firstEl = focusables[0];
          const lastEl = focusables[focusables.length - 1];

          if (e.shiftKey) {
            if (document.activeElement === firstEl) {
              e.preventDefault();
              lastEl.focus();
            }
          } else {
            if (document.activeElement === lastEl) {
              e.preventDefault();
              firstEl.focus();
            }
          }
        }
      };

      window.addEventListener('keydown', handleKeyDown);

      return () => {
        clearTimeout(focusTimer);
        document.body.style.overflow = originalOverflow;
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [mobileMenuOpen]);

  const focusDestination = (targetHref) => {
    const hash = targetHref.includes('#') ? '#' + targetHref.split('#')[1] : null;
    const targetSelector = hash || '#main-content';

    let settledFrames = 0;
    let lastScrollY = window.scrollY;
    let frameCount = 0;
    const maxFrames = 75; // ~1.2s max

    const applyFocus = (targetEl) => {
      if (!targetEl) return;
      if (!targetEl.hasAttribute('tabindex')) {
        targetEl.setAttribute('tabindex', '-1');
      }
      targetEl.focus({ preventScroll: true });
    };

    const checkAndFocus = () => {
      const el = document.querySelector(targetSelector) || document.querySelector('#main-content');
      if (el) {
        // Wait until scroll position has settled
        if (Math.abs(window.scrollY - lastScrollY) < 1) {
          settledFrames++;
          if (settledFrames >= 3) {
            applyFocus(el);
            return;
          }
        } else {
          settledFrames = 0;
          lastScrollY = window.scrollY;
        }
      }

      frameCount++;
      if (frameCount < maxFrames) {
        window.requestAnimationFrame(checkAndFocus);
      } else if (el) {
        applyFocus(el);
      }
    };

    // If 'scrollend' is supported, listen for the event
    if ('onscrollend' in window) {
      const handleScrollEnd = () => {
        window.removeEventListener('scrollend', handleScrollEnd);
        const el = document.querySelector(targetSelector) || document.querySelector('#main-content');
        applyFocus(el);
      };
      window.addEventListener('scrollend', handleScrollEnd, { once: true });
    }

    window.requestAnimationFrame(checkAndFocus);
  };

  const handleLinkClick = (e, targetHref) => {
    e.preventDefault();
    closeMenu(false);
    onNavigate(targetHref);
    focusDestination(targetHref);
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
          ref={triggerBtnRef}
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
          onClick={() => closeMenu(true)}
        />
      )}

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <aside
          ref={drawerRef}
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
              ref={closeBtnRef}
              onClick={() => closeMenu(true)}
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
