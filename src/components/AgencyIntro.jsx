import { ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';

export default function AgencyIntro() {
  const scrollToAbout = (e) => {
    e.preventDefault();
    const el = document.getElementById('about');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="section-wrapper intro-section" id="intro" aria-labelledby="intro-headline">
      <div className="section-rail">
        {/* Rail Sticky Column */}
        <div className="rail-sticky-col">
          <p className="eyebrow">01 / THE ARCHITECTURE OF CONNECTION</p>
          <div className="rail-rule" aria-hidden="true" />
        </div>

        {/* Content Column */}
        <div className="intro-content-col">
          <motion.h2
            id="intro-headline"
            className="section-headline"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            Serious about execution.<br />
            <span>Relentless on creative impact.</span>
          </motion.h2>

          <motion.div
            className="intro-body-grid"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.55, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="intro-lead-text">
              We’re Algoryxz Agency & Co. An international creative experience collective translating ambitious brand briefs into visceral environments that people feel, remember, and amplify. Algorithmic rigor. Meticulous spatial design and production craft. A dedicated creative team by your side every step of the journey.
            </p>

            <div>
              <a
                href="#about"
                className="text-link"
                onClick={scrollToAbout}
              >
                <span>Meet the collective</span>
                <ArrowUpRight size={18} />
              </a>
            </div>
          </motion.div>

          {/* Agency Core Practice Disciplines */}
          <div className="intro-metrics-row">
            <motion.div
              className="metric-card"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <span className="metric-number">01</span>
              <span className="metric-label">Spatial Scenography</span>
              <p style={{ fontSize: '0.8125rem', color: 'var(--text-ink-muted)', marginTop: '8px', lineHeight: '1.5' }}>
                Stage geometry, physical guest flow, and architectural environments.
              </p>
            </motion.div>
            <motion.div
              className="metric-card"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.5, delay: 0.18 }}
            >
              <span className="metric-number">02</span>
              <span className="metric-label">Lighting & Acoustics</span>
              <p style={{ fontSize: '0.8125rem', color: 'var(--text-ink-muted)', marginTop: '8px', lineHeight: '1.5' }}>
                Volumetric light arrays, spatial sound composition, and dynamic pacing.
              </p>
            </motion.div>
            <motion.div
              className="metric-card"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.5, delay: 0.26 }}
            >
              <span className="metric-number">03</span>
              <span className="metric-label">Technical Direction</span>
              <p style={{ fontSize: '0.8125rem', color: 'var(--text-ink-muted)', marginTop: '8px', lineHeight: '1.5' }}>
                Kinetic rigging, display systems, and precise live show calling.
              </p>
            </motion.div>
            <motion.div
              className="metric-card"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.5, delay: 0.34 }}
            >
              <span className="metric-number">04</span>
              <span className="metric-label">Production Stewardship</span>
              <p style={{ fontSize: '0.8125rem', color: 'var(--text-ink-muted)', marginTop: '8px', lineHeight: '1.5' }}>
                Master scheduling, supplier governance, and turnkey strike oversight.
              </p>
            </motion.div>
          </div>

          {/* Architectural Technical Parameters Strip */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            style={{
              marginTop: '32px',
              padding: '16px 20px',
              borderTop: '1px solid var(--line-light)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '12px',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.6875rem',
              letterSpacing: '0.12em',
              color: 'var(--text-ink-subtle)',
              textTransform: 'uppercase'
            }}
          >
            <span>STRUCTURAL RIGOR</span>
            <span>✦</span>
            <span>VOLUMETRIC LIGHTING</span>
            <span>✦</span>
            <span>DYNAMIC SCENOGRAPHY</span>
            <span>✦</span>
            <span>ACOUSTIC MASTERY</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
