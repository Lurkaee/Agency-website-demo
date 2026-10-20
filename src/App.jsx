import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion, useScroll, useSpring } from 'motion/react';
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
  const [isNavigating, setIsNavigating] = useState(false);
  const pendingHashRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  // Scroll reading progress powered directly via Motion springs without root re-renders
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Synchronise browser back/forward history
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname || '/';
      const hash = window.location.hash || null;
      pendingHashRef.current = hash;
      setCurrentPath(path);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
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
      document.title = '404 Coordinate Not Found — Algoryxz Agency & Co.';
    }
  }, [currentPath]);

  const navigate = (rawTarget) => {
    let targetPath = rawTarget;
    let targetHash = null;

    if (rawTarget.includes('#')) {
      const parts = rawTarget.split('#');
      targetPath = parts[0] || '/';
      targetHash = '#' + parts[1];
    }

    if (targetPath === currentPath) {
      if (targetHash) {
        const el = document.querySelector(targetHash);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }
      return;
    }

    pendingHashRef.current = targetHash;
    const nextUrl = targetHash ? `${targetPath}${targetHash}` : targetPath;
    window.history.pushState({}, '', nextUrl);
    setIsNavigating(true);
    setCurrentPath(targetPath);
  };

  // Coordinated cinematic route transition variants
  const pageVariants = {
    initial: (reduced) => ({
      opacity: 0,
      y: reduced ? 0 : 20,
      scale: reduced ? 1 : 0.992,
      filter: reduced ? 'none' : 'blur(6px)'
    }),
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        duration: 0.42,
        ease: [0.16, 1, 0.3, 1]
      }
    },
    exit: (reduced) => ({
      opacity: 0,
      y: reduced ? 0 : -14,
      scale: reduced ? 1 : 0.992,
      filter: reduced ? 'none' : 'blur(4px)',
      transition: {
        duration: 0.28,
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
      {/* High-Performance Smooth Reading Progress Bar */}
      <motion.div
        className="reading-progress-bar"
        style={{ scaleX }}
        aria-hidden="true"
      />

      {/* Cinematic Route Navigation Scanline */}
      <AnimatePresence>
        {isNavigating && !prefersReducedMotion && (
          <motion.div
            key="route-scanline"
            className="route-transition-scanline"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      <Header currentPath={currentPath} onNavigate={navigate} />

      {/* Shared Continuous Page Transitions with onExitComplete scroll orchestration */}
      <AnimatePresence
        mode="wait"
        initial={false}
        onExitComplete={() => {
          setIsNavigating(false);
          const hash = pendingHashRef.current;
          pendingHashRef.current = null;

          if (hash) {
            setTimeout(() => {
              const el = document.querySelector(hash);
              if (el) {
                el.scrollIntoView({ behavior: 'smooth' });
              } else {
                window.scrollTo({ top: 0, behavior: 'instant' });
              }
            }, 60);
          } else {
            window.scrollTo({ top: 0, behavior: 'instant' });
          }
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
