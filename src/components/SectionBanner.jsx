import React, { useState } from 'react';

export default function SectionBanner({ src, alt, label }) {
  const [broken, setBroken] = useState(false);

  if (!src || broken) {
    return (
      <div className="section-banner section-banner-placeholder" role="img" aria-label={alt || label}>
        <span>{label || alt || 'banner image'}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt || ''}
      className="section-banner"
      onError={() => setBroken(true)}
    />
  );
}