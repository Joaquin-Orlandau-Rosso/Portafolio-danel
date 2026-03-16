import React from 'react';
import { Mail, MessageCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../languages/translations';

export default function Hero() {
  const { language } = useLanguage();
  const t = translations[language];

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

  return (
    <section id="home" className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden scroll-mt-20">
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

      <div className="max-w-4xl mx-auto relative z-10 text-center">
        {/* Status badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full mb-8 animate-in slide-in-from-top-2 duration-500">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span className="text-purple-300 text-sm font-medium">
            {language === 'es' ? 'Disponible para proyectos' : 'Available for projects'}
          </span>
        </div>

        {/* Main title */}
        <h1 className="text-5xl sm:text-6xl md:text-8xl font-bold mb-6 animate-in slide-in-from-bottom-4 duration-700">
          <span className="text-white">Danel</span>
          <br />
          <span className="bg-gradient-to-r from-purple-400 via-violet-400 to-purple-500 bg-clip-text text-transparent">
            {t.hero.title}
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed animate-in slide-in-from-bottom-4 duration-1000">
          {t.hero.subtitle}
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-in slide-in-from-bottom-4 duration-1200">
          <button
            onClick={scrollToProjects}
            className="px-8 py-3.5 bg-purple-600 hover:bg-purple-500 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25 hover:-translate-y-0.5"
          >
            {t.hero.viewProjects}
          </button>
          <button
            onClick={scrollToAbout}
            className="px-8 py-3.5 border border-gray-700 hover:border-purple-500/50 rounded-xl font-semibold text-gray-300 hover:text-white transition-all duration-300 hover:-translate-y-0.5"
          >
            {language === 'es' ? 'Sobre Mí' : 'About Me'}
          </button>
        </div>

      </div>
    </section>
  );
}
