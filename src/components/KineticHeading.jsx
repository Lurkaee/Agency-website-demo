import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'motion/react';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.075, delayChildren: 0.02 } }
};

const lineVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.035 } }
};

const wordVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.012 } }
};

const characterVariants = {
  hidden: { opacity: 0, y: '110%', rotateX: -60 },
  visible: {
    opacity: 1,
    y: '0%',
    rotateX: 0,
    transition: { duration: 0.48, ease: [0.16, 1, 0.3, 1] }
  }
};

const stillVariants = {
  hidden: { opacity: 1, y: 0, rotateX: 0 },
  visible: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 0 } }
};

export default function KineticHeading({
  level = 'h2',
  id,
  className = '',
  style,
  lines = [],
  animateOnMount = false,
  ...props
}) {
  const reduceMotion = useReducedMotion();
  const headingRef = useRef(null);
  const isInView = useInView(headingRef, {
    once: true,
    amount: 0.08,
    margin: '0px 0px -6% 0px'
  });
  const Heading = level === 'h1' ? motion.h1 : level === 'h3' ? motion.h3 : motion.h2;
  const plainText = lines.map((line) => line.text).join(' ');

  // Drive the full character tree from an explicit viewport observer. This makes
  // the reveal trigger on the heading box, not on its clipped letter children.
  const motionProps = {
    initial: reduceMotion ? false : 'hidden',
    animate: reduceMotion || animateOnMount || isInView ? 'visible' : 'hidden'
  };

  return (
    <Heading
      ref={headingRef}
      id={id}
      className={('kinetic-heading ' + className).trim()}
      style={style}
      aria-label={plainText}
      variants={containerVariants}
      {...motionProps}
      {...props}
    >
      {lines.map((line, lineIndex) => (
        <motion.span
          key={line.text + '-' + lineIndex}
          className={('kinetic-heading-line ' + (line.accent ? 'is-accent' : '')).trim()}
          aria-hidden="true"
          variants={lineVariants}
        >
          {line.text.split(/(\s+)/).map((part, partIndex) => {
            if (!part || /^\s+$/.test(part)) {
              return (
                <span key={'space-' + partIndex} className="kinetic-heading-space" aria-hidden="true">
                  &nbsp;
                </span>
              );
            }
            return (
              <motion.span
                key={part + '-' + partIndex}
                className="kinetic-heading-word"
                variants={wordVariants}
              >
                {Array.from(part).map((character, characterIndex) => (
                  <motion.span
                    key={character + '-' + characterIndex}
                    className="kinetic-heading-char"
                    variants={reduceMotion ? stillVariants : characterVariants}
                  >
                    {character}
                  </motion.span>
                ))}
              </motion.span>
            );
          })}
        </motion.span>
      ))}
    </Heading>
  );
}

