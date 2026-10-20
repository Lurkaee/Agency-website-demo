import { useState, useEffect, useRef } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import BrandMark from './BrandMark';

export default function Header({ onNavigate }) {
  const reduceMotion = useReducedMotion();
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

  const handleLinkClick = (e, targetHref) => {
    e.preventDefault();
    closeMenu(false);
    onNavigate(targetHref, { focusDestination: true });
  };

  return (
    <>
      <a href="#main-content" className="sr-only skip-to-content">
        Skip to main content
      </a>

      <motion.header
        className={'site-header ' + (isScrolled ? 'is-scrolled' : '')}
        initial={reduceMotion ? false : { opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduceMotion ? 0 : 0.48, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Algoryxz Brand Monogram & Wordmark */}
        <a
          href="/"
          className="brand-link"
          aria-label="Algoryxz Agency & Co. home"
          onClick={(e) => handleLinkClick(e, '/')}
        >
          <BrandMark />
          <span className="brand-title">
            ALGORYXZ
            <span>AGENCY & CO.</span>
          </span>
        </a>

        {/* Desktop Navigation */}
        <motion.nav
          className="desktop-nav"
          aria-label="Main navigation"
          initial={reduceMotion ? false : { opacity: 0, y: -7 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.5, delay: reduceMotion ? 0 : 0.12, ease: [0.16, 1, 0.3, 1] }}
        >
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
        </motion.nav>

        {/* Primary CTA */}
        <motion.a
          href="/#proposal"
          className="header-cta"
          initial={reduceMotion ? false : { opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.42, delay: reduceMotion ? 0 : 0.24 }}
          whileHover={reduceMotion ? undefined : { y: -2 }}
          whileTap={reduceMotion ? undefined : { scale: 0.985 }}
          onClick={(e) => handleLinkClick(e, '/#proposal')}
        >
          <span>Initiate Brief</span>
          <ArrowUpRight size={15} />
        </motion.a>

        {/* Mobile Menu Toggle Button */}
        <motion.button
          ref={triggerBtnRef}
          className="mobile-menu-toggle"
          onClick={() => setMobileMenuOpen(true)}
          aria-label="Open navigation menu"
          aria-expanded={mobileMenuOpen}
          whileTap={reduceMotion ? undefined : { scale: 0.94 }}
        >
          <Menu size={22} />
        </motion.button>
      </motion.header>

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
