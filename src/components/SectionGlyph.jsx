import { motion, useReducedMotion } from 'motion/react';

export default function SectionGlyph({ light = false }) {
  const reduceMotion = useReducedMotion();
  const initialPath = reduceMotion ? { pathLength: 1, opacity: 0.9 } : { pathLength: 0, opacity: 0.35 };

  return (
    <svg className={'section-glyph ' + (light ? 'section-glyph-light' : '')} viewBox="0 0 36 22" fill="none" aria-hidden="true">
      <motion.path
        d="M1.5 13 H10 L15 6.5 H27"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={initialPath}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.2, margin: '0px 0px -20px 0px' }}
        transition={{ duration: reduceMotion ? 0 : 0.72, ease: [0.16, 1, 0.3, 1] }}
      />
      <motion.path
        d="M1.5 18 H8 L12 14"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        initial={initialPath}
        whileInView={{ pathLength: 1, opacity: 0.7 }}
        viewport={{ once: true, amount: 0.2, margin: '0px 0px -20px 0px' }}
        transition={{ duration: reduceMotion ? 0 : 0.58, delay: reduceMotion ? 0 : 0.12, ease: [0.16, 1, 0.3, 1] }}
      />
      <motion.circle
        cx="28.5"
        cy="6.5"
        r="2.1"
        fill="currentColor"
        initial={reduceMotion ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.2, margin: '0px 0px -20px 0px' }}
        transition={{ duration: reduceMotion ? 0 : 0.28, delay: reduceMotion ? 0 : 0.42 }}
        style={{ transformOrigin: '50% 50%' }}
      />
    </svg>
  );
}

