import React from 'react';
import {
  SiReact, SiJavascript, SiHtml5, SiCss, SiPython, SiPandas, SiFigma, SiN8N, SiR,
} from 'react-icons/si';
import {
  FaMicrosoft, FaDatabase, FaChartLine, FaPenNib, FaCode, FaPeopleGroup,
  FaPuzzlePiece, FaArrowsSpin, FaLightbulb, FaBolt, FaSitemap, FaBriefcase
} from 'react-icons/fa6';
import './SkillCarousel.css';

const SKILLS = [
  { name: 'React', icon: SiReact, color: '#61DAFB' },
  { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E' },
  { name: 'HTML5', icon: SiHtml5, color: '#E34F26' },
  { name: 'CSS3', icon: SiCss, color: '#1572B6' },
  { name: 'Python', icon: SiPython, color: '#3776AB' },
  { name: 'Pandas', icon: SiPandas, color: '#150458' },
  { name: 'R Programming', icon: SiR, color: '#276DC3' },
  { name: 'Figma', icon: SiFigma, color: '#F24E1E' },
  { name: 'n8n Automation', icon: SiN8N, color: '#EA4B71' },
  { name: 'Microsoft 365', icon: FaMicrosoft, color: '#EA3E23' },
  { name: 'SQL', icon: FaDatabase, color: '#fb923c' },
  { name: 'Data Analysis', icon: FaChartLine, color: '#c084fc' },
  { name: 'Data Modeling', icon: FaDatabase, color: '#f472b6' },
  { name: 'System Analysis', icon: FaSitemap, color: '#818cf8' }, 
  { name: 'Business Analysis', icon: FaBriefcase, color: '#a3e635' },
  { name: 'UI / UX', icon: FaPenNib, color: '#2dd4bf' },
  { name: 'Front-End Dev', icon: FaCode, color: '#38bdf8' },
  { name: 'Teamwork', icon: FaPeopleGroup, color: '#fbbf24' },
  { name: 'Problem Solving', icon: FaPuzzlePiece, color: '#fdba74' },
  { name: 'Adaptability', icon: FaArrowsSpin, color: '#a7f3d0' },
  { name: 'Creativity', icon: FaLightbulb, color: '#d8b4fe' },
  { name: 'Hardworking', icon: FaBolt, color: '#93c5fd' },
];

// Added 'direction' prop to easily control the flow
const MarqueeTrack = ({ items, direction }) => {
  const duplicatedItems = [...items, ...items];
  
  return (
    <div className={`skill-marquee-track ${direction}`}>
      {duplicatedItems.map(({ name, icon: Icon, color }, index) => (
        <div key={`${name}-${index}`} className="skill-tile">
          <div className="skill-tile-icon" style={{ color: color }}>
            <Icon size={24} />
          </div>
          <span className="skill-tile-label">{name}</span>
        </div>
      ))}
    </div>
  );
};

export default function SkillBoard() {
  const row1 = SKILLS.slice(0, 7);
  const row2 = SKILLS.slice(7, 14);
  const row3 = SKILLS.slice(14, 20);

  return (
    <div className="skill-marquee-container">
      {/* Row 1 ---> Right */}
      <MarqueeTrack items={row1} direction="right" />
      
      {/* Row 2 <--- Left */}
      <MarqueeTrack items={row2} direction="left" />
      
      {/* Row 3 ---> Right */}
      <MarqueeTrack items={row3} direction="right" />
    </div>
  );
}