import { useState } from 'react';
import { ArrowUpRight, Info } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { PROJECTS } from '../data/agencyData';
import KineticHeading from './KineticHeading';
import RollingDigits from './RollingDigits';
import SectionGlyph from './SectionGlyph';

function WorkCardImage({ src, alt, title, category, srcSet, index = 1 }) {
  const [hasError, setHasError] = useState(false);

  return (
    <div className="work-image-inner">
      {hasError ? (
        <div className="work-image-fallback" role="img" aria-label={`${title} architectural blueprint`}>
          <svg className="fallback-grid-svg" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="fallback-grid" width="24" height="24" patternUnits="userSpaceOnUse">
                <path d="M 24 0 L 0 0 0 24" fill="none" stroke="rgba(212, 255, 50, 0.08)" strokeWidth="0.75" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="#141720" />
            <rect width="100%" height="100%" fill="url(#fallback-grid)" />
            <circle cx="200" cy="150" r="54" stroke="rgba(212, 255, 50, 0.35)" strokeWidth="1" strokeDasharray="3 3" />
            <line x1="80" y1="150" x2="320" y2="150" stroke="rgba(212, 255, 50, 0.2)" strokeWidth="1" />
            <line x1="200" y1="60" x2="200" y2="240" stroke="rgba(212, 255, 50, 0.2)" strokeWidth="1" />
            <polygon points="200,85 255,150 200,215 145,150" stroke="rgba(212, 255, 50, 0.5)" strokeWidth="1.2" fill="none" />
            <text x="200" y="146" textAnchor="middle" fill="#d4ff32" fontSize="9" fontFamily="monospace" letterSpacing="0.12em">
              [ SPATIAL SCHEMATIC ]
            </text>
            <text x="200" y="166" textAnchor="middle" fill="#8e929f" fontSize="8" fontFamily="monospace">
              {category.toUpperCase()}
            </text>
          </svg>
          <div className="fallback-caption">
            <span>SCHEMATIC PREVIEW · ASSET FALLBACK</span>
          </div>
        </div>
      ) : (
        <img
          src={src}
          srcSet={srcSet}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          alt={alt}
          loading={index === 0 ? 'eager' : 'lazy'}
          decoding="async"
          className="work-cover-img"
          onError={(e) => {
            console.warn(`[Algoryxz] Project photograph failed to load for "${title}":`, src, e);
            setHasError(true);
          }}
        />
      )}
    </div>
  );
}

export default function SelectedWork({ onNavigate }) {
  const [activeCategory, setActiveCategory] = useState('All Experiences');
  const reduceMotion = useReducedMotion();

  const categories = ['All Experiences', 'Brand Activations', 'Global Summits', 'Corporate Experiences'];

  const filteredProjects = activeCategory === 'All Experiences'
    ? PROJECTS
    : PROJECTS.filter((p) => p.category.toLowerCase() === activeCategory.toLowerCase());

  return (
    <section className="section-wrapper work-section" id="work" aria-labelledby="work-headline">
      {/* Top Header */}
      <motion.div
        className="work-header-row"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div>
          <p className="eyebrow"><RollingDigits value="02" delay={0.05} /> / CURATED EXPERIENCES <SectionGlyph /></p>
          <KineticHeading
            id="work-headline"
            className="section-headline"
            lines={[
              { text: 'Monumental scale.' },
              { text: 'Uncompromising precision.', accent: true }
            ]}
          />
        </div>
        <p style={{ maxWidth: '400px', color: 'var(--text-ink-muted)', fontSize: '0.9375rem', lineHeight: '1.7' }}>
          Different briefs. The same algorithmic clarity.<br />
          A curated preview of contemporary brand experiences and spatial design.
        </p>
      </motion.div>

      {/* Filter Toolbar */}
      <div className="work-toolbar">
        <div className="filter-pills" role="tablist" aria-label="Experience categories">
          {categories.map((cat) => (
            <button
              key={cat}
              role="tab"
              aria-selected={activeCategory === cat}
              className={`filter-pill ${activeCategory === cat ? 'active is-active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
        <span className="concept-badge">CONCEPT STUDY & ARCHIVE</span>
      </div>

      {/* Projects Grid with AnimatePresence filtering & staggered entrances */}
      <motion.div layout={!reduceMotion} className="work-cards-grid">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, idx) => (
            <motion.article
              layout={!reduceMotion}
              key={project.slug}
              className="work-card"
              initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 30 }}
              whileInView={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5, delay: reduceMotion ? 0 : idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <a
                href={`/work/${project.slug}`}
                className="work-card-media"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate(`/work/${project.slug}`);
                }}
                aria-label={`Explore ${project.title}`}
              >
                <span className="work-card-num"><RollingDigits value={project.number} delay={idx * 0.04} /></span>
                <WorkCardImage
                  src={project.heroImage}
                  srcSet={project.heroImageSrcSet}
                  index={idx}
                  alt={project.alt}
                  title={project.title}
                  category={project.category}
                />
                <div className="work-card-action" aria-hidden="true">
                  <ArrowUpRight size={20} />
                </div>
              </a>

              <div className="work-card-meta">
                <span>{project.category}</span>
                <span>{project.location}</span>
              </div>

              <a
                href={`/work/${project.slug}`}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate(`/work/${project.slug}`);
                }}
              >
                <h3 className="work-card-title">{project.title}</h3>
              </a>

              <p className="work-card-tagline">{project.tagline}</p>

              <div style={{ marginTop: '16px' }}>
                <a
                  href={`/work/${project.slug}`}
                  className="text-link"
                  style={{ fontSize: '0.75rem', borderBottomWidth: '1px' }}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate(`/work/${project.slug}`);
                  }}
                >
                  <span>Explore case study</span>
                  <ArrowUpRight size={14} />
                </a>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Concept Study Disclosure */}
      <motion.div
        className="work-disclaimer-note"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <Info size={16} style={{ flexShrink: 0, color: 'var(--accent-lime-deep)' }} />
        <span>
          Illustrative concept studies with curated photography demonstrating spatial capability and production aesthetic; not a record of verified client assignments.
        </span>
      </motion.div>
    </section>
  );
}
