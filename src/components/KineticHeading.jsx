import { motion, useReducedMotion } from 'motion/react';

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
  hidden: { opacity: 0, y: '115%', rotateX: -68 },
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

export default function KineticHeading({ level = 'h2', id, className = '', style, lines = [], ...props }) {
  const reduceMotion = useReducedMotion();
  const Heading = level === 'h1' ? motion.h1 : level === 'h3' ? motion.h3 : motion.h2;
  const plainText = lines.map((line) => line.text).join(' ');

  return (
    <Heading
      id={id}
      className={('kinetic-heading ' + className).trim()}
      style={style}
      aria-label={plainText}
      variants={containerVariants}
      initial={reduceMotion ? false : 'hidden'}
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
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
            if (!part || /^\s+$/.test(part)) return part;
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
