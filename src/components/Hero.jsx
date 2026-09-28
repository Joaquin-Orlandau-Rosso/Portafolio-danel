import React, { useRef } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../languages/translations';

export default function Hero() {
  const { language } = useLanguage();
  const t = translations[language];
  const spotlightRef = useRef(null);

  const scrollToProjects = () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Luz que sigue al cursor: se mueve con variables CSS, sin re-renderizar
  const moveSpotlight = (e) => {
    const el = spotlightRef.current;
    if (!el) return;
    const rect = e.currentTarget.getBoundingClientRect();
    el.style.setProperty('--x', `${e.clientX - rect.left}px`);
    el.style.setProperty('--y', `${e.clientY - rect.top}px`);
  };

  return (
    <section
      id="home"
      onMouseMove={moveSpotlight}
      className="group min-h-screen flex items-center justify-center px-4 relative overflow-hidden scroll-mt-20"
    >
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-[500px] h-[500px] bg-purple-600/15 rounded-full blur-[120px] -top-48 -left-48 animate-blob" />
        <div className="absolute w-[400px] h-[400px] bg-violet-500/10 rounded-full blur-[100px] top-1/2 right-0 animate-blob animation-delay-2000" />
        <div className="absolute w-[300px] h-[300px] bg-blue-600/10 rounded-full blur-[80px] bottom-20 left-1/3 animate-blob animation-delay-4000" />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'linear-gradient(rgba(139,92,246,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.3) 1px, transparent 1px)',
        backgroundSize: '60px 60px'
      }} />

      {/* Spotlight que sigue al cursor */}
      <div
        ref={spotlightRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: 'radial-gradient(600px circle at var(--x, 50%) var(--y, 50%), rgba(139, 92, 246, 0.12), transparent 40%)' }}
      />

      <div className="max-w-4xl mx-auto relative z-10 text-center">
        {/* Status badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full mb-8 animate-in slide-in-from-top-2">
          <span className="relative flex w-2 h-2">
            <span className="absolute inline-flex w-full h-full rounded-full bg-green-400 opacity-75 animate-ping" />
            <span className="relative inline-flex w-2 h-2 rounded-full bg-green-400" />
          </span>
          <span className="text-purple-300 text-sm font-medium">
            {language === 'es' ? 'Disponible para proyectos' : 'Available for projects'}
          </span>
        </div>

        {/* Main title */}
        <h1 className="text-5xl sm:text-6xl md:text-8xl font-bold mb-6">
          <span className="block text-white animate-in slide-in-from-bottom-4" style={{ animationDelay: '120ms' }}>
            Danel
          </span>
          <span className="block animate-in slide-in-from-bottom-4" style={{ animationDelay: '240ms' }}>
            <span className="bg-gradient-to-r from-purple-400 via-fuchsia-400 to-violet-400 bg-clip-text text-transparent animate-gradient">
              {t.hero.title}
            </span>
          </span>
        </h1>

        {/* Subtitle */}
        <p
          className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed animate-in slide-in-from-bottom-4"
          style={{ animationDelay: '380ms' }}
        >
          {t.hero.subtitle}
        </p>

        {/* CTA buttons */}
        <div
          className="flex flex-col sm:flex-row gap-4 justify-center animate-in slide-in-from-bottom-4"
          style={{ animationDelay: '500ms' }}
        >
          <button
            onClick={scrollToProjects}
            className="btn-shine px-8 py-3.5 bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-fuchsia-500 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/30 hover:-translate-y-0.5"
          >
            {t.hero.viewProjects}
          </button>
          <button
            onClick={scrollToAbout}
            className="px-8 py-3.5 border border-gray-700 hover:border-purple-500/50 hover:bg-purple-500/5 rounded-xl font-semibold text-gray-300 hover:text-white transition-all duration-300 hover:-translate-y-0.5"
          >
            {language === 'es' ? 'Sobre Mí' : 'About Me'}
          </button>
        </div>

      </div>
    </section>
  );
}
