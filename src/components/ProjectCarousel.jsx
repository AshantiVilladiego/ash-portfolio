import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';

export default function ProjectCarousel({ projects }) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const go = (dir) => {
    setDirection(dir);
    setIndex((prev) => (prev + dir + projects.length) % projects.length);
  };

  const project = projects[index];
  const hasImage = Boolean(project.src);

  return (
    <div className="carousel">
      <div className="carousel-viewport">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.a
            key={project.title}
            href={project.href}
            target={project.href === '#' ? undefined : '_blank'}
            rel="noopener noreferrer"
            className={`carousel-card ${project.tone}`}
            custom={direction}
            initial={{ opacity: 0, x: 80 * direction, rotate: 2 * direction }}
            animate={{ opacity: 1, x: 0, rotate: 0 }}
            exit={{ opacity: 0, x: -80 * direction, rotate: -2 * direction }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <div
              className="carousel-card-media"
              aria-hidden="true"
              style={
                hasImage
                  ? { backgroundImage: `url(${project.src})` }
                  : undefined
              }
            >
              {!hasImage && (
                <span className="carousel-card-emoji">{project.emoji}</span>
              )}
            </div>

            <div className="carousel-card-body carousel-card-body-overlay">
              <h3 className="carousel-card-title">{project.title}</h3>
              <p className="carousel-card-desc">{project.desc}</p>
              <span className="carousel-card-link">VIEW PROJECT ↘</span>
            </div>
          </motion.a>
        </AnimatePresence>
      </div>

      <div className="carousel-controls">
        <button
          type="button"
          className="btn-pill btn-pill-sm"
          onClick={() => go(-1)}
          aria-label="Previous project"
        >
          ← prev
        </button>

        <div className="carousel-dots" aria-hidden="true">
          {projects.map((p, i) => (
            <span
              key={p.title}
              className={`carousel-dot ${i === index ? 'is-active' : ''}`}
            />
          ))}
        </div>

        <button
          type="button"
          className="btn-pill btn-pill-sm"
          onClick={() => go(1)}
          aria-label="Next project"
        >
          next →
        </button>
      </div>
    </div>
  );
}