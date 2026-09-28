import React from 'react';
import Reveal from './Reveal';

// Encabezado común de las secciones: rótulo, título y un subrayado degradado
// que crece cuando la sección aparece en pantalla.
export default function SectionHeader({ eyebrow, title, subtitle, className = 'mb-16' }) {
  return (
    <Reveal className={`text-center ${className}`}>
      <span className="text-purple-400 text-sm font-semibold tracking-widest uppercase">
        {eyebrow}
      </span>
      <h2 className="text-3xl md:text-5xl font-bold mt-3">{title}</h2>
      <span
        aria-hidden="true"
        className="reveal-line block h-1 w-16 mx-auto mt-5 rounded-full bg-gradient-to-r from-purple-500 via-violet-400 to-fuchsia-500"
      />
      {subtitle && <p className="text-gray-400 mt-4 max-w-xl mx-auto">{subtitle}</p>}
    </Reveal>
  );
}
