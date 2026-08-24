import React, { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import './App.css';

import { Terminal } from './components/Terminal';
import { MagneticButton } from './components/MagneticButton';
import SkillBoard from './components/SkillBoard';
import Reveal, { RevealStagger, RevealItem } from './components/Reveal';
import FolderNav from './components/FolderNav';
import ProjectCarousel from './components/ProjectCarousel';
import CertificationsStack from './components/CertificationsStack';
import SectionBanner from './components/SectionBanner';


/* =========================================================
   PROJECTS
   ========================================================= */

const PROJECTS = [

  {
    title: 'Beyond The Cart',
    tone: 'p-blue',
    src: '/beyond.png',
    href: 'https://app.powerbi.com/reportEmbed?reportId=ab3da7f5-a00e-4ffc-9162-0bf6b9f9d924&autoAuth=true&ctid=4da98571-dcea-4839-8fb1-0bdd5dc969f9&actionBarEnabled=true',
    desc: 'A Power BI deep-dive into\nshopper behavior — cart to checkout.',
  },
  {
    title: 'AXIS',
    tone: 'p-gray',
    src: '/axis.png',
    href: 'https://axis-eight-navy.vercel.app/',
    desc: 'An AI engine that reads and\nextracts your data, then maps it\ndirectly onto official forms.',
  },
  {
    title: 'HR Dashboard',
    tone: 'p-green',
    src: '/hr.png',
    href: 'https://datastudio.google.com/s/qkduqIeeiww',
    desc: 'Interactive HR analytics dashboard\nturning raw headcount data\ninto hiring decisions.',
  },
  {
    title: 'CineBuddy',
    tone: 'p-gray',
    src: '/cinebuddy.png',
    href: 'https://drive.google.com/file/d/1DKBKY4m7FMBuu7jHcXKwkIHyFUmcWTf9/view?usp=sharing',
    desc: 'A movie discovery platform\nthat matches your mood\nto your next watch.',
  },
  {
    title: 'Titanic Exploratory Data Analysis',
    tone: 'p-yellow',
    src: '/titanic.png',
    href: 'https://colab.research.google.com/drive/1h091aQsQDdcmiZVAVqHL5gOzruK4o_uY?usp=sharing',
    desc: 'Classic EDA notebook — digging\nthrough survival patterns\nwith pandas & seaborn.',
  },
  {
    title: 'FitCheck',
    tone: 'p-gray',
    src: '/fc.png',
    href: 'https://fit-check-wheat.vercel.app/',
    desc: 'An AI resume screener that scores\ncandidates against a job description\nand ranks them.',
  },

];

/* =========================================================
   APP
   ========================================================= */

export default function App() {

  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(
    scrollYProgress,
    {
      stiffness: 120,
      damping: 24,
      restDelta: 0.001,
    }
  );

  const [aboutDark, setAboutDark] = useState(false);


  useEffect(() => {

    const aboutSection = document.getElementById('about-skills-section');

    if (!aboutSection) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setAboutDark(entry.isIntersecting);
      },
      {
        threshold: 0.25,
      }
    );

    observer.observe(aboutSection);

    return () => observer.disconnect();

  }, []);


  return (
    <div className="desk-background">

      {/* =====================================================
          SCROLL PROGRESS
          ===================================================== */}

      <motion.div
        className="scroll-thread"
        style={{ scaleX }}
      />


      {/* =====================================================
          PERSISTENT FOLDER-TAB NAV (fixed, all sections)
          ===================================================== */}

      <FolderNav dark={aboutDark} />


      {/* =====================================================
          SECTION 1 GROUP — banner + folder header + hero
          ===================================================== */}

      <div className="section-group">



      {/* =====================================================
          FOLDER LANDING HEADER
          ===================================================== */}

      <section id="hero-section" className="folder-header-section">

        <div className="folder-wrapper">

          <motion.div
            className="folder-back"
            initial={{ opacity: 0, y: -25, rotate: 8 }}
            animate={{ opacity: 1, y: 0, rotate: 5 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="folder-tab-right" />
          </motion.div>

          <motion.div
            className="paperclip"
            initial={{ opacity: 0, y: -20, rotate: -30 }}
            animate={{ opacity: 1, y: 0, rotate: -15 }}
            transition={{ duration: 0.6, delay: 0.25 }}
          >
            🖇️
          </motion.div>

          <motion.div
            className="folder-front"
            initial={{ opacity: 0, x: -25, rotate: -12 }}
            animate={{ opacity: 1, x: 0, rotate: -7 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="folder-tab-left" />
          </motion.div>

          <div className="star-cluster" aria-hidden="true">
            <span className="star star-1">✦</span>
            <span className="star star-2">✧</span>
            <span className="star star-3">✦</span>
            <span className="star star-4">✧</span>
            <span className="star star-5">✦</span>
            <span className="star star-6">✧</span>
            <span className="star star-7">✦</span>
            <span className="star star-8">✧</span>
          </div>

          <motion.div
            className="binder-clip"
            initial={{ opacity: 0, y: -20, rotate: 20 }}
            animate={{ opacity: 1, y: 0, rotate: 10 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="clip-metal"></div>
            <div className="clip-black"></div>
          </motion.div>

          <motion.div
            className="blue-ticket"
            initial={{ opacity: 0, x: 20, rotate: -15 }}
            animate={{ opacity: 1, x: 0, rotate: -8}}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <p>BSCPE | Big Data Analytics</p>
          </motion.div>

          <motion.div
            className="folder-content"
            initial={{ opacity: 0, y: 35, rotate: 8 }}
            animate={{ opacity: 1, y: 0, rotate: 4 }}
            transition={{ duration: 0.75, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="folder-typography">

              <motion.h1
                className="massive-year"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.65 }}
              >
                Unpacking the Data: Ashanti's Portfolio
              </motion.h1>

              <motion.h2
                className="folder-subtitle"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                <br />
                Exploring algorithms, analytics, and engineering solutions.
              </motion.h2>

              <motion.p
                className="folder-footer-text"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.95 }}
              >
                my virtual domain!
              </motion.p>

            </div>

          </motion.div>

        </div>

        <motion.div
          className="scroll-cue"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 8, 0] }}
          transition={{
            opacity: { delay: 1.3, duration: 0.6 },
            y: { repeat: Infinity, duration: 1.6, ease: 'easeInOut' },
          }}
        >
        </motion.div>

      </section>


      {/* =====================================================
          SECTION 1
          ===================================================== */}
        <SectionBanner
          src="/public/section1.png"
          alt="Ashanti's portfolio banner"
          label="hero banner — /public/banners/hero.png"
        />

      <section className="section-hero-glass">

        <div className="hero-glow" aria-hidden="true" />

        <Reveal direction="scale">
          <span className="hero-eyebrow">portfolio · 20(26)</span>
        </Reveal>

        <Reveal direction="up">
          <h1 className="intro-title">
            HI, I'M <span>ASHANTI!</span>
          </h1>
        </Reveal>

        <Reveal direction="up" delay={0.1}>
          <p className="intro-subtitle">
            computer engineering, data enthusiast &amp; creative
            problem solver.
          </p>
        </Reveal>


        {/* -------------------------------------------------
            NOTEBOOK
            ------------------------------------------------- */}

        <Reveal direction="up" delay={0.2}>

          <div className="notebook-spread">

            <div className="notebook-spread-page page-photo">

              <div className="photo-placeholder">

                <div className="photo-placeholder-inner">
                  <img
                    src="/ash.jpg"
                    alt="Ashanti Louise Villadiego"
                    className="photo-placeholder-img"
                  />
                </div>
              </div>

            </div>

            <div className="notebook-spread-page page-notes">

              <p className="notebook-small-title">ABOUT ASHANTI</p>

              <h3>curious mind. creative hands.</h3>

              <p>
               A soon-to-be Computer Engineering graduate (September 2026)
                with a growing passion for Big Data, Systems and Business Analysis, and Systems Development.
                I am driven by the opportunity to build meaningful technology solutions, analyze complex problems,
                and design systems that is practical, meaningful, and designed around real-world needs.
              </p>

              <p className="notebook-small-title">Areas of Focus</p>

              <ul>
                <li>Data Modeling & Analytics</li>
                <li>Systems Architecture & Analysis</li>
                <li>Visual Storytelling</li>
                <li>Frontend Development</li>
                <li>UI/UX Design</li>
              </ul>

            </div>

          </div>

        </Reveal>

      </section>

      </div>


      {/* =====================================================
          SECTION 2
          ===================================================== */}

      <div className="section-group">


      <section
        id="about-skills-section"
        className="section-about-skills-dark"
      >

        <Reveal direction="up">
          <h3 className="section-title">
            WHAT I CAN DO
          </h3>
        </Reveal>

        <div className="about-skills-grid">

          {/* -----------------------------------------
              SKILLS — MACBOOK SCREEN
              ----------------------------------------- */}

          <Reveal direction="up" delay={0.05}>

            <div className="macbook">

              <div className="macbook-screen">

                <div className="macbook-camera" />

                <div className="macbook-display">
                  <SkillBoard />
                </div>

              </div>

              <div className="macbook-base">
                <span className="macbook-notch" />
              </div>

            </div>

          </Reveal>

        </div>

      </section>

      </div>


      {/* =====================================================
          SECTION 3
          ===================================================== */}

      <div className="section-group">

        <SectionBanner
          src="/public/section2.png"
          alt="Projects banner"
          label="projects banner — /public/banners/projects.png"
        />

      <section
        id="projects-section"
        className="section-projects section-folder folder-green"
        data-tab="projects"
      >

        <Reveal direction="up">
        </Reveal>

        <Reveal direction="up" delay={0.1}>
          <ProjectCarousel projects={PROJECTS} />
        </Reveal>

      </section>

      </div>


      {/* =====================================================
          SECTION 4
          ===================================================== */}

      <div className="section-group">


      <section
        id="work-section"
        className="section-certifications section-folder folder-blue"
        data-tab="certificates"
      >

        <Reveal direction="up">
        </Reveal>

        <Reveal direction="up" delay={0.1}>
        </Reveal>

        <CertificationsStack />

      </section>

      </div>


      {/* =====================================================
          SECTION 5
          ===================================================== */}

      <div className="section-group">

        <SectionBanner
          src="/public/section3.png"
          alt="Let's connect banner"
          label="connect banner — /public/banners/connect.png"
        />

      <section
        id="contact-section"
        className="section-card section-contact section-folder folder-yellow"
        data-tab="let's connect!"
      >

        <Reveal direction="up">
        </Reveal>

        <Reveal direction="up" delay={0.03}>
          <p className="entry-desc contact-intro">
            I'm stepping into the industry and eager to apply my background
            in Data Analysis and Systems Development to real-world
            challenges. Whether you're looking to collaborate, have an
            opening on your team, or just want to swap movie
            recommendations — I'd love to connect!
          </p>
        </Reveal>

        <Reveal direction="up" delay={0.05}>

          <Terminal

            username="ashanti"
            hostname="portfolio"
            typingSpeed={28}
            delayBetweenCommands={900}
            loop

            commands={['cat connect.txt']}

            outputs={{

              0: [
                "I'm stepping into the industry and eager to apply my",
                'background in Data Analysis and Systems Development to',
                'real-world challenges.',
                '',
                "Whether you're looking to collaborate on a new project,",
                'have an opening in your team, or just want to swap movie',
                "recommendations, I'd love to connect!",
              ],

            }}

          />

        </Reveal>


        {/* ---------------------------------------------
            CONTACT BUTTONS
            --------------------------------------------- */}

        <div className="magnetic-row">

          <MagneticButton>
            <a
              href="mailto:aaashantilouise@example.com"
              className="contact-pill"
            >
            Email Me
            </a>
          </MagneticButton>

          <MagneticButton>
            <a
              href="https://www.linkedin.com/in/ashanti-louise-villadiego/"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-pill"
            >
            LinkedIn
            </a>
          </MagneticButton>

          <MagneticButton>
            <a
              href="https://github.com/AshantiVilladiego"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-pill"
            >
            GitHub
            </a>
          </MagneticButton>

        </div>


        {/* ---------------------------------------------
            RESUME
            --------------------------------------------- */}

        <Reveal direction="up" delay={0.15}>

          <a
            href="/Villadiego, Ashanti Louise - Resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="resume-sticky"
          >
            <div className="sticky-content">
              <p>View My</p>
              <h3>RESUME</h3>
            </div>
          </a>

        </Reveal>


        {/* ---------------------------------------------
            FOOTER
            --------------------------------------------- */}

        <footer className="site-footer">
          "Do, or do not. There is no try."- Master Yoda
        </footer>

      </section>

      </div>

    </div>
  );
}