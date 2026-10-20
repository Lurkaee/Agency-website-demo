import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import Header from './components/Header';
import Hero from './components/Hero';
import AgencyIntro from './components/AgencyIntro';
import SelectedWork from './components/SelectedWork';
import ServicesProcess from './components/ServicesProcess';
import AboutTeam from './components/AboutTeam';
import Testimonials from './components/Testimonials';
import ProposalSection from './components/ProposalSection';
import Footer from './components/Footer';
import CinemaModal from './components/CinemaModal';
import ProjectDetail from './pages/ProjectDetail';
import PrivacyPage from './pages/PrivacyPage';
import NotFoundPage from './pages/NotFoundPage';
import ForbiddenPage from './pages/ForbiddenPage';

export default function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname || '/');
  const [isCinemaOpen, setIsCinemaOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  // Synchronise browser back/forward history
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Reading progress indicator
  useEffect(() => {
    const updateScroll = () => {
      const scrollY = window.scrollY;
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((scrollY / totalHeight) * 100);
      }
    };

    window.addEventListener('scroll', updateScroll, { passive: true });
    return () => window.removeEventListener('scroll', updateScroll);
  }, []);

  // Update document title dynamically based on route
  useEffect(() => {
    if (currentPath === '/') {
      document.title = 'Algoryxz Agency & Co. — Spatial Design & Brand Experiences';
    } else if (currentPath.startsWith('/work/')) {
      const slug = currentPath.replace('/work/', '').split('?')[0].split('#')[0];
      const formatted = slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
      document.title = `${formatted} — Algoryxz Agency & Co.`;
    } else if (currentPath === '/privacy') {
      document.title = 'Privacy Policy — Algoryxz Agency & Co.';
    } else if (currentPath === '/404') {
      document.title = '404 Coordinate Not Found — Algoryxz Agency & Co.';
    } else if (currentPath === '/403') {
      document.title = '403 Restricted Zone — Algoryxz Agency & Co.';
    } else {
      document.title = 'Algoryxz Agency & Co. — Spatial Design & Brand Experiences';
    }
  }, [currentPath]);

  const navigate = (path) => {
    if (path === currentPath) return;
    window.history.pushState({}, '', path);
    setCurrentPath(path);
  };

  // Coordinated route transition variants
  const pageVariants = {
    initial: (reduced) => ({
      opacity: 0,
      y: reduced ? 0 : 16,
      scale: reduced ? 1 : 0.995
    }),
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1]
      }
    },
    exit: (reduced) => ({
      opacity: 0,
      y: reduced ? 0 : -12,
      scale: reduced ? 1 : 0.995,
      transition: {
        duration: 0.26,
        ease: [0.22, 1, 0.36, 1]
      }
    })
  };

  // Determine current active route view & unique transition key
  let pageContent;
  let routeKey = currentPath;

  if (currentPath === '/' || currentPath === '') {
    routeKey = 'homepage';
    pageContent = (
      <main id="main-content">
        <Hero onOpenCinema={() => setIsCinemaOpen(true)} />
        <AgencyIntro />
        <SelectedWork onNavigate={navigate} />
        <ServicesProcess />
        <AboutTeam />
        <Testimonials />
        <ProposalSection onNavigate={navigate} />
      </main>
    );
  } else if (currentPath.startsWith('/work/')) {
    const slug = currentPath.replace('/work/', '').split('?')[0].split('#')[0];
    routeKey = `project-${slug}`;
    pageContent = (
      <main id="main-content">
        <ProjectDetail slug={slug} onNavigate={navigate} />
      </main>
    );
  } else if (currentPath === '/privacy') {
    routeKey = 'privacy';
    pageContent = (
      <main id="main-content">
        <PrivacyPage onNavigate={navigate} />
      </main>
    );
  } else if (currentPath === '/403') {
    routeKey = 'forbidden';
    pageContent = (
      <main id="main-content">
        <ForbiddenPage onNavigate={navigate} />
      </main>
    );
  } else if (currentPath === '/404') {
    routeKey = 'notfound';
    pageContent = (
      <main id="main-content">
        <NotFoundPage onNavigate={navigate} />
      </main>
    );
  } else {
    // Unknown route fallback triggers the designed 404 experience
    routeKey = 'fallback-404';
    pageContent = (
      <main id="main-content">
        <NotFoundPage onNavigate={navigate} />
      </main>
    );
  }

  return (
    <div id="top" className="site-canvas">
      {/* Viewport Reading Progress Bar */}
      <div
        className="reading-progress-bar"
        style={{ width: `${scrollProgress}%` }}
        aria-hidden="true"
      />

      <Header currentPath={currentPath} onNavigate={navigate} />

      {/* Shared Continuous Page Transitions with onExitComplete scroll-reset */}
      <AnimatePresence
        mode="wait"
        initial={false}
        onExitComplete={() => {
          window.scrollTo({ top: 0, behavior: 'instant' });
        }}
      >
        <motion.div
          key={routeKey}
          custom={prefersReducedMotion}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="route-transition-container"
        >
          {pageContent}
        </motion.div>
      </AnimatePresence>

      <Footer onNavigate={navigate} />

      {/* Global Interactive Cinema Reel Modal */}
      <CinemaModal
        isOpen={isCinemaOpen}
        onClose={() => setIsCinemaOpen(false)}
      />
    </div>
  );
}
