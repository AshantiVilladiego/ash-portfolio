import { useState } from 'react';
import { motion } from 'motion/react';

/**
 * CardStack
 * A stack of cards — click the front card, or the Next button below
 * it, to send the front card to the back and reveal the next one.
 */
export const CardStack = ({ items, offset, scaleFactor }) => {
  const CARD_OFFSET = offset || 14;
  const SCALE_FACTOR = scaleFactor || 0.06;
  const [cards, setCards] = useState(items);

  const advance = () => {
    setCards((prevCards) => {
      const newArray = [...prevCards];
      newArray.unshift(newArray.pop());
      return newArray;
    });
  };

  return (
    <div className="cert-stack-outer">
      <div className="cert-stack">
        {cards.map((card, index) => {
          const isFront = index === 0;

          return (
            <motion.div
              key={card.id}
              className="cert-card"
              style={{
                transformOrigin: 'top center',
                left: '50%', // Ensures it starts at the center line
                cursor: isFront ? 'pointer' : 'default',
              }}
              animate={{
                top: index * -CARD_OFFSET,
                scale: 1 - index * SCALE_FACTOR,
                zIndex: cards.length - index,
                x: '-50%', // Forces Framer Motion to handle the centering!
              }}
              transition={{
                duration: 0.4,
                ease: 'easeInOut',
              }}
              onClick={isFront ? advance : undefined}
              role={isFront ? 'button' : undefined}
              tabIndex={isFront ? 0 : undefined}
              aria-label={isFront ? 'Show next certification' : undefined}
              onKeyDown={
                isFront
                  ? (e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        advance();
                      }
                    }
                  : undefined
              }
            >
              <div className="cert-card-content">
                {card.content}
              </div>

              <div className="cert-card-footer">
                <p className="cert-card-name">{card.name}</p>
                <p className="cert-card-role">{card.designation}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      <button
        type="button"
        className="btn-pill btn-pill-sm cert-stack-next"
        onClick={advance}
      >
        next →
      </button>
    </div>
  );
};

export default CardStack;