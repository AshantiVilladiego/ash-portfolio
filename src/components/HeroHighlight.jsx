import React from 'react';
import { useMotionValue, motion, useMotionTemplate } from 'motion/react';

function cn(...parts) {
  return parts.filter(Boolean).join(' ');
}

const dotDefault = `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='16' height='16' fill='none'%3E%3Ccircle fill='%23c9d9c9' id='pattern-circle' cx='10' cy='10' r='2.5'%3E%3C/circle%3E%3C/svg%3E")`;
const dotHover = `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='16' height='16' fill='none'%3E%3Ccircle fill='%23fb923c' id='pattern-circle' cx='10' cy='10' r='2.5'%3E%3C/circle%3E%3C/svg%3E")`;

export function HeroHighlight({ children, className, containerClassName }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    if (!currentTarget) return;
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const maskImage = useMotionTemplate`radial-gradient(220px circle at ${mouseX}px ${mouseY}px, black 0%, transparent 100%)`;

  return (
    <div className={cn('hero-highlight-container', containerClassName)} onMouseMove={handleMouseMove}>
      <div className="hero-highlight-dots" style={{ backgroundImage: dotDefault }} />
      <motion.div
        className="hero-highlight-dots hero-highlight-dots-hover"
        style={{ backgroundImage: dotHover, WebkitMaskImage: maskImage, maskImage }}
      />
      <div className={cn('hero-highlight-content', className)}>{children}</div>
    </div>
  );
}

export function Highlight({ children, className }) {
  return (
    <motion.span
      initial={{ backgroundSize: '0% 100%' }}
      whileInView={{ backgroundSize: '100% 100%' }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 1.6, ease: 'linear', delay: 0.3 }}
      className={cn('hero-highlight-mark', className)}
    >
      {children}
    </motion.span>
  );
}
