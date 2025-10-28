import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../languages/translations';

export default function Hero() {
  const { language } = useLanguage();
  const t = translations[language];

  const scrollToProjects = () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <section id="home" className="pt-16 md:pt-32 pb-12 md:pb-20 px-4 relative overflow-hidden scroll-mt-20">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -top-40 -left-40 animate-blob" />
        <div className="absolute w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -bottom-40 -right-40 animate-blob animation-delay-2000" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center space-y-6">
          <div className="inline-block px-4 py-2 bg-purple-500/10 border border-purple-500/30 rounded-full mb-4 animate-in slide-in-from-top-2 duration-500">
            <span className="text-purple-300 text-sm font-medium">{t.hero.welcome}</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 bg-clip-text text-transparent animate-in slide-in-from-bottom-4 duration-700">
            {t.hero.title}
          </h1>

          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto px-4 animate-in slide-in-from-bottom-4 duration-1000">
            {t.hero.subtitle}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4 animate-in slide-in-from-bottom-4 duration-1200">
            <button
              onClick={scrollToProjects}
              className="btn-hover px-6 md:px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105"
            >
              {t.hero.viewProjects}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}