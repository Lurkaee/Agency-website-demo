import { motion, useReducedMotion } from 'motion/react';

const DIGIT_STRIP = '01234567890123456789';

export default function RollingDigits({ value, className = '', delay = 0 }) {
  const reduceMotion = useReducedMotion();
  const text = String(value);

  return (
    <>
      <span className={('rolling-digits ' + className).trim()} aria-hidden="true">
        {Array.from(text).map((character, index) => {
          if (!/\d/.test(character)) {
            return (
              <span className="rolling-static-character" key={character + '-' + index}>
                {character}
              </span>
            );
          }

          if (reduceMotion) {
            return (
              <span className="rolling-digit-static" key={character + '-' + index}>
                {character}
              </span>
            );
          }

          const endPosition = 10 + Number(character);
          const endY = '-' + ((endPosition / DIGIT_STRIP.length) * 100) + '%';

          return (
            <span className="rolling-digit-window" key={character + '-' + index}>
              <motion.span
                className="rolling-digit-strip"
                initial={{ y: '0%' }}
                whileInView={{ y: endY }}
                viewport={{ once: true, amount: 0.2, margin: '0px 0px -30px 0px' }}
                transition={{
                  duration: 1.12,
                  delay: delay + index * 0.075,
                  ease: [0.16, 1, 0.3, 1]
                }}
              >
                {Array.from(DIGIT_STRIP).map((digit, digitIndex) => (
                  <span key={digitIndex}>{digit}</span>
                ))}
              </motion.span>
            </span>
          );
        })}
      </span>
      <span className="sr-only">{text}</span>
    </>
  );
}

