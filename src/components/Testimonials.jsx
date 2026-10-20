import { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { TESTIMONIALS } from '../data/agencyData';

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
    <section className="section-wrapper testimonials-section" aria-labelledby="testimonials-headline">
      <div className="testimonials-grid">
        {/* Left Side: Rail Label & Decorative Quote Mark */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.55 }}
        >
          <p className="eyebrow" id="testimonials-headline">05 / INDUSTRY CRITIQUE & PERSPECTIVES</p>
          <div className="quote-giant-mark" aria-hidden="true">
            “
          </div>
          <span className="concept-badge" style={{ marginTop: '16px', display: 'inline-block' }}>
            SAMPLE CONCEPT FEEDBACK
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

                <div className="testimonial-author-meta">
                  <p className="testimonial-author-name">{activeTestimonial.author}</p>
                  <p className="testimonial-author-context">{activeTestimonial.context}</p>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.625rem', letterSpacing: '0.12em', color: 'var(--text-ink-subtle)', display: 'block', marginTop: '6px' }}>
                    {activeTestimonial.badge}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="testimonial-controls-bar">
            <span className="testimonial-progress-indicator">
              0{currentIndex + 1} / 0{TESTIMONIALS.length}
            </span>

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
