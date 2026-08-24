import React, { useState } from 'react';
import { CardStack } from '../ui/card-stack';
import PdfModal from '../ui/pdf-modal';

export const Highlight = ({ children }) => (
  <span className="cert-highlight">{children}</span>
);

const CERT_DATA = [
  { id: 0, name: 'Understanding Prompt Engineering', designation: 'DataCamp · Jul 2026', slug: 'prompt-engineering', blurb: <>A 1-hour course on <Highlight>structuring effective prompts</Highlight> for working with large language models.</> },
  { id: 1, name: 'AI Ethics', designation: 'DataCamp · Jul 2026', slug: 'ai-ethics', blurb: <>Covers the <Highlight>responsible use of AI</Highlight> — bias, transparency, and accountability in AI systems.</> },
  { id: 2, name: 'AI Fluency: Framework & Foundations', designation: 'Anthropic Academy · UCC / Ringling College of Art + Design', slug: 'ai-fluency-anthropic', blurb: <>A foundations course on <Highlight>working effectively with AI</Highlight>, developed by Anthropic in partnership with UCC and Ringling College.</> },
  { id: 3, name: 'Understanding Data Science', designation: 'DataCamp · Mar 2026', slug: 'understanding-data-science', blurb: <>A 2-hour introduction to the <Highlight>data science workflow</Highlight> — from raw data to actionable insight.</> },
  { id: 4, name: 'Intermediate SQL', designation: 'DataCamp · Mar 2026', slug: 'intermediate-sql', blurb: <>4 hours deepening into <Highlight>joins, subqueries, and window functions</Highlight> for real-world querying.</> },
  { id: 5, name: 'Introduction to SQL', designation: 'DataCamp · Feb 2026', slug: 'introduction-to-sql', blurb: <>Core <Highlight>querying and filtering</Highlight> fundamentals for relational databases.</> },
  { id: 6, name: 'Building Dashboards with Dash and Plotly', designation: 'DataCamp · Mar 2025', slug: 'dash-and-plotly', blurb: <>4 hours building <Highlight>interactive Python dashboards</Highlight> with Dash and Plotly.</> },
  { id: 7, name: 'Big Data Fundamentals with PySpark', designation: 'DataCamp · Oct 2024', slug: 'big-data-pyspark', blurb: <>4 hours processing <Highlight>large-scale datasets</Highlight> with PySpark's distributed computing tools.</> },
  { id: 8, name: 'Introduction to Python', designation: 'DataCamp · Oct 2024', slug: 'introduction-to-python', blurb: <>4-hour foundation in <Highlight>Python syntax, data structures, and control flow</Highlight> — where it all started.</> },
];

export default function CertificationsStack() {
  const [activePdf, setActivePdf] = useState(null);

  const cards = CERT_DATA.map((cert) => ({
    id: cert.id,
    name: cert.name,
    designation: cert.designation,
    content: (
      <>
        <img
          src={`/certificates/${cert.slug}.jpg`}
          alt={cert.name}
          onClick={(e) => {
            e.stopPropagation();
            setActivePdf(`/certificates/${cert.slug}.pdf`);
          }}
          className="cert-preview"
        />
        <p style={{ marginTop: '12px', lineHeight: '1.6' }}>{cert.blurb}</p>
      </>
    ),
  }));

  return (
    <div className="cert-stack-wrap">
      <CardStack items={cards} offset={6} scaleFactor={0.03} />
      <PdfModal src={activePdf} onClose={() => setActivePdf(null)} />
    </div>
  );
}