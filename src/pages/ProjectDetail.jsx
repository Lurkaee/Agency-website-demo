import { useState, useRef, useEffect, useCallback } from 'react';
import { ArrowLeft, ArrowUpRight, Maximize2, X, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PROJECTS } from '../data/agencyData';
import KineticHeading from '../components/KineticHeading';
import RollingDigits from '../components/RollingDigits';
import SectionGlyph from '../components/SectionGlyph';

export default function ProjectDetail({ slug, onNavigate }) {
  const project = PROJECTS.find((p) => p.slug === slug) || PROJECTS[0];
  const [activeImage, setActiveImage] = useState(null);
  const lastActiveTriggerRef = useRef(null);
  const closeBtnRef = useRef(null);

  const openLightbox = (item, event) => {
    lastActiveTriggerRef.current = event?.currentTarget || null;
    setActiveImage(item);
  };

  const closeLightbox = useCallback(() => {
    setActiveImage(null);
    if (lastActiveTriggerRef.current) {
      window.requestAnimationFrame(() => {
        lastActiveTriggerRef.current?.focus();
      });
    }
  }, []);

  useEffect(() => {
    if (!activeImage) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const focusTimer = setTimeout(() => {
      closeBtnRef.current?.focus();
    }, 40);

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        closeLightbox();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      clearTimeout(focusTimer);
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeImage, closeLightbox]);

  const scrollToProposal = () => {
    onNavigate('/#proposal');
  };

  return (
    <div className="page-container">
      {/* Breadcrumb Navigation */}
      <motion.a
        href="/#work"
        className="breadcrumb-nav"
        initial={{ opacity: 0, x: -16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        onClick={(e) => {
          e.preventDefault();
          onNavigate('/#work');
        }}
      >
        <ArrowLeft size={16} />
        <span>Back to selected work</span>
      </motion.a>

      {/* Project Heading */}
      <motion.header
        className="project-hero-header"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className="eyebrow" style={{ color: 'var(--accent-lime-deep)' }}>
          <RollingDigits value={project.number} delay={0.04} /> / {project.category.toUpperCase()} <SectionGlyph />
        </p>
        <KineticHeading level="h1" className="project-detail-kinetic-title" lines={[{ text: project.title }]} />
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8125rem', color: 'var(--text-ink-muted)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
          {project.location} · {project.client}
        </p>
      </motion.header>

      {/* Main Cover Banner with shared Layout Transition */}
      <div style={{ overflow: 'hidden', borderRadius: 'var(--radius-sm)' }}>
        <motion.img
          layoutId={`project-cover-${project.slug}`}
          src={project.heroImage}
          alt={project.alt}
          className="project-cover-banner"
          fetchPriority="high"
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>

      {/* Overview & Deliverables Specifications */}
      <motion.section
        className="project-specs-grid"
        aria-labelledby="project-idea-heading"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      >
        <div>
          <h2 className="eyebrow" id="project-idea-heading" style={{ marginBottom: '14px' }}>
            THE CONCEPT ARCHITECTURE
          </h2>
          <p className="project-lead-summary">{project.summary}</p>
          <p className="project-body-text">{project.overview}</p>
        </div>

        <aside className="project-deliverables-panel">
          <h3 className="eyebrow" style={{ color: 'var(--text-ink)' }}>THE MOVING PARTS</h3>
          <ul className="deliverables-list">
            {project.services.map((srv) => (
              <li key={srv}>
                <span style={{ color: 'var(--accent-lime-deep)' }}>✦</span>
                <span>{srv}</span>
              </li>
            ))}
          </ul>

          <div style={{ marginTop: '24px', paddingTop: '20px', borderTop: '1px solid var(--line-light)' }}>
            <span className="eyebrow" style={{ display: 'block', marginBottom: '8px' }}>STRUCTURAL PARAMETERS</span>
            {project.stats.map((stat) => (
              <div key={stat.label} style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', padding: '4px 0' }}>
                <span style={{ color: 'var(--text-ink-muted)' }}>{stat.label}</span>
                <strong style={{ color: 'var(--text-ink)' }}>{stat.value}</strong>
              </div>
            ))}
          </div>
        </aside>
      </motion.section>

      {/* Closer Look Photo Gallery */}
      <section aria-labelledby="project-gallery-heading">
        <p className="eyebrow">A CLOSER LOOK</p>
        <h2 id="project-gallery-heading" className="project-gallery-title">
          It’s all in the moments.
        </h2>

        <div className="project-gallery-columns">
          {project.gallery.map((item, idx) => (
            <motion.button
              type="button"
              key={item.src + idx}
              className="gallery-thumbnail-card"
              onClick={(e) => openLightbox(item, e)}
              aria-label={`Enlarge photo ${idx + 1} of ${project.gallery.length}: ${item.caption}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <img
                src={item.src}
                srcSet={item.srcSet}
                sizes="(max-width: 768px) 100vw, 50vw"
                alt={item.alt}
                loading="lazy"
              />
              <div
                style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: 'rgba(9, 10, 13, 0.85)',
                  color: 'var(--accent-lime)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backdropFilter: 'blur(4px)'
                }}
              >
                <Maximize2 size={16} />
              </div>
              <div className="gallery-caption-overlay">
                <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, marginRight: '8px', color: 'var(--accent-lime-deep)' }}>
                  0{idx + 1}
                </span>
                <span>{item.caption}</span>
              </div>
            </motion.button>
          ))}
        </div>
      </section>

      {/* Video Media Highlight Note */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '24px',
          background: 'var(--bg-paper-alt)',
          padding: '28px 32px',
          borderRadius: 'var(--radius-xs)',
          borderLeft: '4px solid var(--accent-lime-deep)',
          marginBottom: '64px'
        }}
      >
        <Sparkles size={36} style={{ color: 'var(--accent-lime-deep)', flexShrink: 0 }} />
        <div>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, textTransform: 'uppercase' }}>
            The physical highlights are still to come.
          </h3>
          <p style={{ fontSize: '0.8125rem', color: 'var(--text-ink-muted)', marginTop: '4px' }}>
            This is an illustrative concept study with curated spatial photography. Commissioned partner stories and cinematic event films will be archived upon public release.
          </p>
        </div>
      </motion.div>

      {/* Bottom CTA Block */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        style={{
          background: 'var(--bg-ink)',
          color: '#ffffff',
          padding: '56px 40px',
          borderRadius: 'var(--radius-sm)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '32px',
          flexWrap: 'wrap',
          border: '1px solid var(--line-dark)'
        }}
      >
        <div>
          <span className="eyebrow eyebrow-light">READY TO BUILD?</span>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', textTransform: 'uppercase', marginTop: '8px' }}>
            What could your experience look like?
          </h2>
        </div>

        <button
          onClick={scrollToProposal}
          className="btn btn-lime"
        >
          <span>Initiate a brief</span>
          <ArrowUpRight size={18} />
        </button>
      </motion.div>

      {/* Image Lightbox Modal with AnimatePresence */}
      <AnimatePresence>
        {activeImage && (
          <motion.div
            className="cinema-modal-backdrop"
            onClick={closeLightbox}
            role="dialog"
            aria-modal="true"
            aria-label={activeImage.caption || 'Enlarged project photograph'}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <button
              ref={closeBtnRef}
              onClick={closeLightbox}
              className="cinema-close-btn"
              aria-label="Close enlarged photo"
            >
              <X size={22} />
            </button>
            <motion.div
              style={{ maxWidth: '90vw', maxHeight: '85vh', textAlign: 'center' }}
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <img
                src={activeImage.src}
                srcSet={activeImage.srcSet}
                sizes="90vw"
                alt={activeImage.alt}
                style={{ maxHeight: '75vh', width: 'auto', margin: '0 auto', borderRadius: '4px', boxShadow: '0 20px 60px rgba(0,0,0,0.8)' }}
              />
              <p style={{ color: '#ffffff', marginTop: '16px', fontSize: '0.9375rem', fontFamily: 'var(--font-mono)' }}>
                {activeImage.caption}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
