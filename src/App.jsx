import React, { useState } from 'react';
import './App.css';

export default function App() {
  // SETTING THE DEFAULT HOME PAGE
  const [activeTab, setActiveTab] = useState('about');

  return (
    <div className="desk-background">
      <div className="glass-container">
      
        <div className="desk-header-wrapper">
          <img src="/pic-ash.png" alt="My Photo" className="desk-left-image" />
          <img src="/header-ash.png" alt="Welcome Header" className="desk-header-image" />
        </div>

        <div className="notebook-container">
           
           {/* ============================== */}
           {/* CLICKABLE SIDE TABS            */}
           {/* ============================== */}
           <div className="tabs">
             <div 
               className={`tab tab-blue ${activeTab === 'about' ? 'active' : ''}`} 
               onClick={() => setActiveTab('about')}
             >
               ABOUT
             </div>
             <div 
               className={`tab tab-green ${activeTab === 'projects' ? 'active' : ''}`} 
               onClick={() => setActiveTab('projects')}
             >
               PROJECTS
             </div>
             {/* Removed the Skills tab since it is now on the About page! */}
             <div 
               className={`tab tab-yellow ${activeTab === 'contact' ? 'active' : ''}`} 
               onClick={() => setActiveTab('contact')}
             >
               CONTACT
             </div>
           </div>

           {/* ============================== */}
           {/* PAGE 1: ABOUT & SKILLS (Home)  */}
           {/* ============================== */}
           {activeTab === 'about' && (
             <>
               {/* LEFT PAGE: About & Expertise */}
               <div className="page left-page">
                 <div className="page-header">
                   <span className="page-title">Ashanti Louise B. Villadiego</span>
                   <span className="page-year">Portfolio 2026</span>
                 </div>
                 
                 <div className="section">
                   <h2 className="bubble-header text-pink">ABOUT ME</h2>
                   <p className="entry-desc about-text">
                     Awaiting graduation as a Computer Engineering student with a focus on Big Data. I am a forward-thinking, creative problem-solver who thrives on turning ideas into reality and raw data into actionable insights. My technical expertise spans across frontend design and the full Big Data ecosystem—from engineering to analysis. Off-interface, I recharge by reading, sketching, and diving into my favorite music and TV shows.
                   </p>
                 </div>

                 <div className="divider"></div>
                 <div className="skills-summary-text">
                   Web Development &nbsp; • &nbsp; Automation &nbsp; • &nbsp; Big Data Analytics
                 </div>

                 {/* The Polaroid Grid */}
                 </div>

               <div className="spine">
                 <div className="hole"></div><div className="hole"></div><div className="hole"></div><div className="hole"></div><div className="hole"></div>
               </div>

               {/* RIGHT PAGE: Skills & Interests */}
               <div className="page right-page">
                 
                 {/* The Glowing Sticker Board */}
                 <div className="section">
                   <h2 className="bubble-header text-orange" style={{ textAlign: 'center', marginBottom: '20px' }}>SKILLS</h2>
<div className="sticker-board">
                      {/* --- EXISTING SKILLS --- */}
                      <div className="sticker s-react">React</div>
                      <div className="sticker s-js">JS</div>
                      <div className="sticker s-frontend">FrontEnd</div>
                      <div className="sticker s-sql">SQL</div>
                      <div className="sticker s-python">Python</div>
                      <div className="sticker s-model">Data Modeling</div>
                      <div className="sticker s-analysis">Data Analysis</div>
                      <div className="sticker s-n8n">n8n Automation</div>
                      <div className="sticker s-ms365">Microsoft 365</div>
                      <div className="sticker s-uiux">UI/UX</div>

                      {/* --- NEW HARD SKILLS --- */}
                      <div className="sticker s-pandas">Pandas</div>
                      <div className="sticker s-matplotlib">Matplotlib</div>
                      <div className="sticker s-seaborn">Seaborn</div>
                      <div className="sticker s-rprog">R Programming</div>
                      <div className="sticker s-htmlcss">HTML/CSS</div>
                      <div className="sticker s-figma">Figma</div>

                      {/* --- NEW SOFT SKILLS --- */}
                      <div className="sticker s-teamwork">Teamwork</div>
                      <div className="sticker s-problem">Problem Solving</div>
                      <div className="sticker s-adapt">Adaptability</div>
                      <div className="sticker s-creative">Creativity</div>
                      <div className="sticker s-hardwork">Hardworking</div>
                   </div>
                 </div>

               </div>
             </>
           )}

           {/* ============================== */}
           {/* PAGE 2: PROJECTS               */}
           {/* ============================== */}
{activeTab === 'projects' && (
             <>
               <div className="page left-page">
                 <div className="page-header">
                   <span className="page-title">Ashanti Louise B. Villadiego</span>
                   <span className="page-year">Projects</span>
                 </div>
                 
                 <div className="projects-grid">
                   {/* Project 1 */}
                   <div className="project-card"><div className="project-image-container"><h3 className="project-title p-green">BIONANA</h3></div><div className="project-footer"><a href="#" className="project-link">GO TO PROJECT ↘</a></div></div>
                   
                   {/* Project 2 */}
                   <div className="project-card"><div className="project-image-container"><h3 className="project-title p-blue">T-SIS</h3></div><div className="project-footer"><a href="#" className="project-link">GO TO PROJECT ↘</a></div></div>
                   
                   {/* Project 3 */}
                   <div className="project-card"><div className="project-image-container p-empty"><h3 className="project-title p-gray">Coming Soon</h3></div><div className="project-footer"><a href="#" className="project-link">GO TO PROJECT ↘</a></div></div>
                   
                   {/* Project 4 */}
                   <div className="project-card"><div className="project-image-container p-empty"><h3 className="project-title p-gray">Coming Soon</h3></div><div className="project-footer"><a href="#" className="project-link">GO TO PROJECT ↘</a></div></div>
                 </div>
               </div>

               <div className="spine">
                 <div className="hole"></div><div className="hole"></div><div className="hole"></div><div className="hole"></div><div className="hole"></div>
               </div>

               <div className="page right-page">
                 <div className="projects-grid mt-4">
                   {/* Projects 5, 6, 7, 8 go here using the same structure above! */}
                   <div className="project-card"><div className="project-image-container p-empty"><h3 className="project-title p-gray">Coming Soon</h3></div><div className="project-footer"><a href="#" className="project-link">GO TO PROJECT ↘</a></div></div>
                   <div className="project-card"><div className="project-image-container p-empty"><h3 className="project-title p-gray">Coming Soon</h3></div><div className="project-footer"><a href="#" className="project-link">GO TO PROJECT ↘</a></div></div>
                   <div className="project-card"><div className="project-image-container p-empty"><h3 className="project-title p-gray">Coming Soon</h3></div><div className="project-footer"><a href="#" className="project-link">GO TO PROJECT ↘</a></div></div>
                   <div className="project-card"><div className="project-image-container p-empty"><h3 className="project-title p-gray">Coming Soon</h3></div><div className="project-footer"><a href="#" className="project-link">GO TO PROJECT ↘</a></div></div>
                 </div>
               </div>
             </>
           )}
           {/* ============================== */}
           {/* PAGE 3: CONTACT                */}
           {/* ============================== */}
{activeTab === 'contact' && (
             <>
               <div className="page left-page">
                 <div className="page-header">
                   <span className="page-title">Ashanti Louise B. Villadiego</span>
                   <span className="page-year">Contact</span>
                 </div>
                 
                 <div className="section">
                   <h2 className="bubble-header text-yellow">LET'S CONNECT!</h2>
                   <p className="entry-desc" style={{ marginBottom: '30px' }}>
I’m stepping into the industry and eager to apply my background in Big Data and Systems Development to real-world challenges. Whether you're looking to collaborate on a new project, have an opening in your team, or just want to swap movie recommendations, I’d love to connect!                   </p>
                   
                   <div className="contact-links">
                     <a href="mailto:aaashantilouise@example.com" className="contact-item">✉️ Email Me</a>
                     <a href="https://www.linkedin.com/in/ashanti-louise-villadiego/" target="_blank" className="contact-item">🔗 LinkedIn</a>
                     <a href="https://github.com/AshantiVilladiego" target="_blank" className="contact-item">💻 GitHub</a>
                   </div>
                 </div>
               </div>

               <div className="spine">
                 <div className="hole"></div><div className="hole"></div><div className="hole"></div><div className="hole"></div><div className="hole"></div>
               </div>

               <div className="page right-page">
                 <div className="section" style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                   <div className="sticker" style={{ background: '#fef08a', transform: 'rotate(-3deg)', padding: '20px', textAlign: 'center' }}>
                     <h3 style={{ fontFamily: 'Fredoka One', marginBottom: '10px' }}>Open for Work!</h3>
                     <p style={{ fontSize: '0.9rem' }}>Currently exploring new opportunities in Big Data & IoT.</p>
                   </div>
                   <p className="entry-desc" style={{ marginTop: '40px', fontStyle: 'italic' }}>"Turning data into reality."</p>
                 </div>
               </div>
             </>
           )}

        </div>
      </div>
    </div>
  );
}