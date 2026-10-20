import { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { TESTIMONIALS } from '../data/agencyData';
import RollingDigits from './RollingDigits';
import SectionGlyph from './SectionGlyph';

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = () => {
    setCurrentIndex((curr) => (curr - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const next = () => {
    setCurrentIndex((curr) => (curr + 1) % TESTIMONIALS.length);
  };

  const activeTestimonial = TESTIMONIALS[currentIndex];

  return (
    <section className="section-wrapper testimonials-section" id="testimonials" aria-labelledby="testimonials-headline">
      <div className="testimonials-grid">
        {/* Left Side: Rail Label & Decorative Quote Mark */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.55 }}
        >
          <p className="eyebrow" id="testimonials-headline"><RollingDigits value="05" delay={0.2} /> / SPATIAL PHILOSOPHY & CURATORIAL TENETS <SectionGlyph /></p>
          <motion.div
            className="quote-giant-mark"
            aria-hidden="true"
            initial={{ opacity: 0, y: 18, rotate: -8 }}
            whileInView={{ opacity: 1, y: 0, rotate: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.65, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          >
            “
          </motion.div>
          <span className="concept-badge" style={{ marginTop: '16px', display: 'inline-block' }}>
            CURATORIAL STANDARDS
          </span>
        </motion.div>

        {/* Right Side: Quote Display & Interactive Controls */}
        <div className="testimonial-display-box">
          <div aria-live="polite" style={{ minHeight: '160px' }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                <blockquote className="testimonial-quote-text">
                  “{activeTestimonial.quote}”
                </blockquote>

                <div className="testimonial-author-meta" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      background: 'rgba(212, 255, 50, 0.12)',
                      border: '1px solid rgba(212, 255, 50, 0.3)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--accent-lime-deep)',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.8125rem',
                      fontWeight: 700,
                      flexShrink: 0
                    }}
                  >
                    <RollingDigits key={currentIndex} value={String(currentIndex + 1).padStart(2, '0')} delay={0.03} />
                  </div>
                  <div>
                    <p className="testimonial-author-name">{activeTestimonial.author}</p>
                    <p className="testimonial-author-context">{activeTestimonial.context}</p>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.625rem', letterSpacing: '0.12em', color: 'var(--text-ink-subtle)', display: 'block', marginTop: '4px' }}>
                      {activeTestimonial.badge}
                    </span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="testimonial-controls-bar">
            {/* Interactive pagination tracks */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  aria-label={`Jump to review 0${i + 1}`}
                  style={{
                    height: '4px',
                    width: currentIndex === i ? '24px' : '10px',
                    borderRadius: '2px',
                    background: currentIndex === i ? 'var(--accent-lime-deep)' : 'var(--line-light-strong)',
                    transition: 'all 0.25s ease',
                    cursor: 'pointer'
                  }}
                />
              ))}
            </div>

            <div className="testimonial-arrow-buttons">
              <button
                onClick={prev}
                className="icon-round-btn"
                aria-label="Previous testimonial"
              >
                <ArrowLeft size={18} />
              </button>
              <button
                onClick={next}
                className="icon-round-btn"
                aria-label="Next testimonial"
              >
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
