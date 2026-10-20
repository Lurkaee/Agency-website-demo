import { useState } from 'react';
import { ArrowUpRight, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PROJECTS } from '../data/agencyData';

export default function SelectedWork({ onNavigate }) {
  const [activeCategory, setActiveCategory] = useState('All Experiences');

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
          <p className="eyebrow">02 / CURATED EXPERIENCES</p>
          <h2 id="work-headline" className="section-headline">
            Monumental scale.<br />
            <span>Uncompromising precision.</span>
          </h2>
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
              className={`filter-pill ${activeCategory === cat ? 'is-active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
        <span className="concept-badge">CONCEPT STUDY & ARCHIVE</span>
      </div>

      {/* Projects Grid with AnimatePresence filtering & staggered entrances */}
      <motion.div layout className="work-cards-grid">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, idx) => (
            <motion.article
              layout
              key={project.slug}
              className="work-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
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
                <span className="work-card-num">{project.number}</span>
                <motion.img
                  layoutId={`project-cover-${project.slug}`}
                  src={project.heroImage}
                  alt={project.alt}
                  loading="lazy"
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
