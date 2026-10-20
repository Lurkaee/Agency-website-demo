import { useState } from 'react';
import { ArrowLeft, ArrowUpRight, Maximize2, X, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PROJECTS } from '../data/agencyData';

export default function ProjectDetail({ slug, onNavigate }) {
  const project = PROJECTS.find((p) => p.slug === slug) || PROJECTS[0];
  const [activeImage, setActiveImage] = useState(null);

  const scrollToProposal = () => {
    onNavigate('/');
    setTimeout(() => {
      const el = document.getElementById('proposal');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 150);
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
          onNavigate('/');
          setTimeout(() => {
            const el = document.getElementById('work');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }, 100);
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
        transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className="eyebrow" style={{ color: 'var(--accent-lime-deep)' }}>
          {project.number} / {project.category.toUpperCase()}
        </p>
        <h1>{project.title}</h1>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8125rem', color: 'var(--text-ink-muted)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
          {project.location} · {project.client}
        </p>
      </motion.header>

      {/* Main Cover Banner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        style={{ overflow: 'hidden', borderRadius: 'var(--radius-sm)' }}
      >
        <img
          src={project.heroImage}
          alt={project.alt}
          className="project-cover-banner"
          fetchPriority="high"
        />
      </motion.div>

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
            <motion.div
              key={item.src + idx}
              className="gallery-thumbnail-card"
              onClick={() => setActiveImage(item)}
              role="button"
              tabIndex={0}
              aria-label={`Enlarge photo: ${item.caption}`}
              onKeyDown={(e) => {
                if (e.key === 'Enter') setActiveImage(item);
              }}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <img src={item.src} alt={item.alt} loading="lazy" />
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
            </motion.div>
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
            onClick={() => setActiveImage(null)}
            role="dialog"
            aria-modal="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <button
              onClick={() => setActiveImage(null)}
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
