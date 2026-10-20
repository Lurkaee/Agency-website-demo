import { motion, useReducedMotion } from 'motion/react';

export default function BrandMark({ className = '' }) {
  const reduceMotion = useReducedMotion();

  const drawTransition = (delay = 0, duration = 0.65) => ({
    duration: reduceMotion ? 0 : duration,
    delay: reduceMotion ? 0 : delay,
    ease: [0.16, 1, 0.3, 1]
  });

  return (
    <motion.svg
      className={('brand-mark ' + className).trim()}
      viewBox="0 0 36 36"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      {/* Outer Hexagon Matrix */}
      <motion.path
        d="M18 3.5 L30.5 10.7 V25.3 L18 32.5 L5.5 25.3 V10.7 Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={reduceMotion ? false : { pathLength: 0, opacity: 0.2 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={drawTransition(0, 0.68)}
      />

      {/* Algorithmic Precision Cross (X) */}
      <motion.path
        d="M12 12 L24 24 M24 12 L12 24"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        initial={reduceMotion ? false : { pathLength: 0, opacity: 0.2 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={drawTransition(0.12, 0.55)}
      />

      {/* Calibration Cardinal Ticks */}
      <motion.path
        d="M18 6.5 V9.5 M18 26.5 V29.5 M6.5 18 H9.5 M26.5 18 H29.5"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 0.75 }}
        transition={drawTransition(0.25, 0.4)}
      />

      {/* Central Core Nucleus */}
      <motion.circle
        cx="18"
        cy="18"
        r="2.2"
        fill="currentColor"
        initial={reduceMotion ? false : { scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={drawTransition(0.3, 0.4)}
        style={{ transformOrigin: '50% 50%' }}
      />
    </motion.svg>
  );
}
