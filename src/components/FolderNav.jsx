import React, { useEffect, useState } from 'react';

const NAV_TABS = [
  { label: "about me", id: 'hero-section', tone: 'tab-yellow' },
  { label: 'skills', id: 'about-skills-section', tone: 'tab-navy' },
  { label: 'projects', id: 'projects-section', tone: 'tab-blue' },
  { label: 'certificates', id: 'work-section', tone: 'tab-lavender' },
  { label: "let's connect", id: 'contact-section', tone: 'tab-white' },
];

export default function FolderNav({ dark }) {
  const [activeId, setActiveId] = useState(NAV_TABS[0].id);

  useEffect(() => {
    const sections = NAV_TABS
      .map((tab) => document.getElementById(tab.id))
      .filter(Boolean);

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { threshold: 0.35 }
    );

    sections.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <nav
      className={`folder-nav-fixed ${dark ? 'folder-nav-dark' : ''}`}
      aria-label="Section navigation"
    >
      {NAV_TABS.map((tab) => (
        <button
          key={tab.id}
          type="button"
          className={`folder-navtab ${tab.tone} ${
            activeId === tab.id ? 'is-active' : ''
          }`}
          onClick={() => scrollToSection(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </nav>
  );
}