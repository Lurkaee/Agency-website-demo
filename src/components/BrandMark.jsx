import { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';

export default function BrandMark({ className = '' }) {
  const [isHovered, setIsHovered] = useState(false);
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
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Outer Hexagon Matrix */}
      <motion.path
        d="M18 3.5 L30.5 10.7 V25.3 L18 32.5 L5.5 25.3 V10.7 Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={reduceMotion ? false : { pathLength: 0, opacity: 0.2 }}
        animate={{
          pathLength: 1,
          opacity: 1,
          strokeWidth: isHovered ? 1.75 : 1.5
        }}
        transition={drawTransition(0, 0.68)}
      />

      {/* Internal Calibration Reticle Ring (Algorithmic orbital guide) */}
      <motion.circle
        cx="18"
        cy="18"
        r="8.75"
        stroke="currentColor"
        strokeWidth="0.85"
        strokeDasharray="2 3"
        initial={reduceMotion ? false : { opacity: 0, rotate: 0 }}
        animate={{
          opacity: isHovered ? 0.65 : 0.3,
          rotate: reduceMotion ? 0 : [0, 360],
          scale: isHovered && !reduceMotion ? 1.08 : 1
        }}
        transition={{
          rotate: { repeat: Infinity, duration: 24, ease: 'linear' },
          opacity: { duration: 0.3 },
          scale: { duration: 0.35, ease: [0.16, 1, 0.3, 1] }
        }}
        style={{ transformOrigin: '18px 18px' }}
      />

      {/* Algorithmic Precision Cross (X) with 45° calibration snap on hover */}
      <motion.g
        animate={{
          rotate: isHovered && !reduceMotion ? 45 : 0,
          scale: isHovered && !reduceMotion ? 0.94 : 1
        }}
        transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformOrigin: '18px 18px' }}
      >
        <motion.path
          d="M12 12 L24 24 M24 12 L12 24"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          initial={reduceMotion ? false : { pathLength: 0, opacity: 0.2 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={drawTransition(0.12, 0.55)}
        />
      </motion.g>

      {/* Calibration Cardinal Ticks */}
      <motion.path
        d="M18 6.5 V9.5 M18 26.5 V29.5 M6.5 18 H9.5 M26.5 18 H29.5"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={{
          opacity: isHovered ? 0.95 : 0.7,
          scale: isHovered && !reduceMotion ? 1.1 : 1
        }}
        transition={drawTransition(0.25, 0.4)}
        style={{ transformOrigin: '18px 18px' }}
      />

      {/* Active Aura Pulse Ring */}
      <motion.circle
        cx="18"
        cy="18"
        r="4"
        stroke="currentColor"
        strokeWidth="0.75"
        initial={false}
        animate={{
          scale: isHovered && !reduceMotion ? [1, 1.45, 1.2] : 1,
          opacity: isHovered ? 0.5 : 0
        }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformOrigin: '18px 18px' }}
      />

      {/* Central Core Nucleus */}
      <motion.circle
        cx="18"
        cy="18"
        r="2.2"
        fill="currentColor"
        initial={reduceMotion ? false : { scale: 0, opacity: 0 }}
        animate={{
          scale: isHovered && !reduceMotion ? 1.25 : 1,
          opacity: 1
        }}
        transition={drawTransition(0.3, 0.4)}
        style={{ transformOrigin: '18px 18px' }}
      />
    </motion.svg>
  );
}
