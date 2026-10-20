import { motion, useReducedMotion } from 'motion/react';

export default function BrandMark() {
  const reduceMotion = useReducedMotion();
  const initialPath = reduceMotion ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0.35 };
  const drawTransition = (delay = 0) => ({
    duration: reduceMotion ? 0 : 0.72,
    delay: reduceMotion ? 0 : delay,
    ease: [0.16, 1, 0.3, 1]
  });

  return (
    <motion.svg className="brand-mark" viewBox="0 0 36 36" fill="none" aria-hidden="true" focusable="false">
      <motion.path
        d="M18 2.5 31.2 10.1 31.2 25.3 18 32.9 4.8 25.3 4.8 10.1 Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
        initial={initialPath}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.7 }}
        transition={drawTransition(0)}
      />
      <motion.path
        d="M12 12 24 23.5 M24 12 12 23.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        initial={initialPath}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.7 }}
        transition={drawTransition(0.12)}
      />
      <motion.circle
        cx="18"
        cy="17.75"
        r="2.15"
        fill="currentColor"
        initial={reduceMotion ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.7 }}
        transition={drawTransition(0.3)}
        style={{ transformOrigin: '50% 50%' }}
      />
    </motion.svg>
  );
}
