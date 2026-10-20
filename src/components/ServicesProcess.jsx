import { useState } from 'react';
import { ArrowUpRight, Plus, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { SERVICES } from '../data/agencyData';
import KineticHeading from './KineticHeading';
import RollingDigits from './RollingDigits';
import SectionGlyph from './SectionGlyph';

export default function ServicesProcess() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleService = (idx) => {
    setOpenIndex(openIndex === idx ? -1 : idx);
  };

  const scrollToProposal = (e) => {
    e.preventDefault();
    const el = document.getElementById('proposal');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="section-wrapper services-section" id="services" aria-labelledby="services-headline">
      <div className="services-grid-layout">
        {/* Sticky Intro Left Column */}
        <motion.div
          className="services-sticky-panel"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="eyebrow eyebrow-light"><RollingDigits value="03" delay={0.1} /> / THE ALGORITHMIC METHODOLOGY <SectionGlyph light /></p>
          <div className="rail-rule rail-rule-light" aria-hidden="true" />

          <KineticHeading
            id="services-headline"
            className="section-headline section-headline-light"
            style={{ marginTop: '24px' }}
            lines={[
              { text: 'You architect the vision.' },
              { text: 'We engineer the reality.', accent: true }
            ]}
          />

          <p className="services-tagline">
            A nascent conceptual spark or a comprehensive master brief?<br />
            We meet your leadership team at any phase and execute with absolute rigor.
          </p>

          <a
            href="#proposal"
            className="text-link text-link-light"
            onClick={scrollToProposal}
          >
            <span>Initiate an experience brief</span>
            <ArrowUpRight size={18} />
          </a>

          {/* Interactive Stage Progress Track */}
          <div style={{ marginTop: '32px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            {SERVICES.map((_, i) => (
              <button
                key={i}
                onClick={() => setOpenIndex(i)}
                aria-label={`Jump to stage 0${i + 1}`}
                style={{
                  height: '4px',
                  width: openIndex === i ? '32px' : '16px',
                  borderRadius: '2px',
                  background: openIndex === i ? 'var(--accent-lime)' : 'rgba(255, 255, 255, 0.2)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
              />
            ))}
          </div>

          <div className="services-spark-art" aria-hidden="true">
            ⬡
          </div>
        </motion.div>

        {/* Process Accordion Right Column */}
        <div className="services-accordion" role="region" aria-label="Services methodology list">
          {SERVICES.map((service, idx) => {
            const isOpen = openIndex === idx;
            return (
              <motion.div
                key={service.step}
                className={`service-item ${isOpen ? 'is-open' : ''}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.45, delay: idx * 0.06 }}
              >
                <div
                  className="service-summary"
                  role="button"
                  tabIndex={0}
                  aria-expanded={isOpen}
                  onClick={() => toggleService(idx)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      toggleService(idx);
                    }
                  }}
                >
                  <div className="service-summary-left">
                    <span className="service-step-num"><RollingDigits value={service.step} delay={idx * 0.05} /></span>
                    <h3 className="service-item-title">{service.title}</h3>
                  </div>
                  <div className="service-toggle-icon" aria-hidden="true">
                    {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                  </div>
                </div>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      className="service-details-body"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      style={{ overflow: 'hidden' }}
                    >
                      <p style={{ color: 'var(--accent-lime)', fontFamily: 'var(--font-mono)', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '8px' }}>
                        {service.tagline}
                      </p>
                      <p className="service-desc-text">
                        {service.description}
                      </p>

                      <div className="service-tags-wrap">
                        {service.tags.map((tag) => (
                          <span key={tag} className="service-tag">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
