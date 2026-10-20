import { ArrowUpRight } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import KineticHeading from './KineticHeading';
import RollingDigits from './RollingDigits';
import SectionGlyph from './SectionGlyph';

export default function AboutTeam() {
  const reduceMotion = useReducedMotion();
  const scrollToProposal = (e) => {
    e.preventDefault();
    const el = document.getElementById('proposal');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const values = [
    'Spatial narrative integrated with technical precision',
    'Transparent budget engineering with zero hidden markups',
    'Access to monumental industrial & modernist architecture',
    'Dedicated executive producer from kick-off to wrap-up'
  ];

  return (
    <section className="section-wrapper about-section" id="about" aria-labelledby="about-headline">
      <div className="about-grid">
        {/* Left Column: Team/Studio Photography with Motion reveal */}
        <motion.div
          className="about-image-card"
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1800&q=80"
            alt="Algoryxz creative directors and spatial technologists collaborating in studio"
            loading="lazy"
            initial={reduceMotion ? false : { clipPath: 'inset(0 0 100% 0)' }}
            whileInView={{ clipPath: 'inset(0 0 0% 0)' }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: reduceMotion ? 0 : 0.72, delay: reduceMotion ? 0 : 0.08, ease: [0.16, 1, 0.3, 1] }}
          />
          <div className="about-image-caption">
            <span>BEHIND EVERY MONUMENTAL MOMENT</span>
            <span>THE COLLECTIVE.</span>
          </div>

          <div
            style={{
              marginTop: '16px',
              padding: '16px 20px',
              background: 'var(--bg-paper-alt)',
              borderRadius: 'var(--radius-xs)',
              border: '1px solid var(--line-light)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.6875rem'
            }}
          >
            <div>
              <span style={{ color: 'var(--text-ink-subtle)', display: 'block', fontSize: '0.5625rem', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                PRIMARY DISCIPLINES
              </span>
              <strong style={{ color: 'var(--text-ink)', letterSpacing: '0.04em' }}>
                SPATIAL · LIGHTING · ACOUSTICS · PRODUCTION
              </strong>
            </div>
            <div style={{ textAlign: 'right' }}>
              <span style={{ color: 'var(--text-ink-subtle)', display: 'block', fontSize: '0.5625rem', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                METHODOLOGY
              </span>
              <strong style={{ color: 'var(--accent-lime-deep)' }}>
                ARCHITECTURAL RIGOR
              </strong>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Editorial Copy & Principles */}
        <motion.div
          className="about-copy"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="eyebrow"><RollingDigits value="04" delay={0.15} /> / THE COLLECTIVE BEHIND THE CURTAIN <SectionGlyph /></p>
          <KineticHeading
            id="about-headline"
            className="section-headline"
            style={{ marginTop: '16px' }}
            lines={[
              { text: 'Spatial architects.' },
              { text: 'Technical directors.' },
              { text: 'Experience makers.', accent: true }
            ]}
          />

          <motion.div
            className="about-paragraphs"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.12, margin: '0px 0px -4% 0px' }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.16 } }
            }}
          >
            <motion.p
              variants={{
                hidden: { opacity: 0, y: 22 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.62, ease: [0.16, 1, 0.3, 1] } }
              }}
            >
              We believe the most transformative experiences occur when intellectual ambition is coupled with uncompromising physical craftsmanship. The kind of environments where big ideas find their physical manifestation, and every sensory touchpoint commands complete engagement.
            </motion.p>
            <motion.p
              variants={{
                hidden: { opacity: 0, y: 22 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.62, ease: [0.16, 1, 0.3, 1] } }
              }}
            >
              Operating as an internationally minded creative collective, Algoryxz unites spatial designers, lighting artists, acoustic engineers, and technical producers. Your strategic objectives become our architectural challenge. Your event becomes an enduring benchmark.
            </motion.p>
          </motion.div>

          <div className="about-values-list">
            {values.map((val, idx) => (
              <motion.div
                key={val}
                className="about-value-item"
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.15 + idx * 0.08 }}
              >
                <span className="value-bullet">✦</span>
                <span>{val}</span>
              </motion.div>
            ))}
          </div>

          <div>
            <a
              href="#proposal"
              className="text-link"
              onClick={scrollToProposal}
            >
              <span>Explore a collaboration</span>
              <ArrowUpRight size={18} />
            </a>
          </div>

          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.625rem', color: 'var(--text-ink-subtle)', marginTop: '28px', display: 'block' }}>
            Illustrative studio & production photography.
          </span>
        </motion.div>
      </div>
    </section>
  );
}
