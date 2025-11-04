import React from 'react';
import { Menu, X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../languages/translations';

export default function Navbar({ isMenuOpen, setIsMenuOpen }) {
  const { language, changeLanguage } = useLanguage();
  const t = translations[language];

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop - 80; // Ajuste para el navbar fijo
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
    setIsMenuOpen(false); // Cerrar menú móvil después del click
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0f0f0f]/90 backdrop-blur-md border-b border-purple-500/20 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center font-bold transition-transform duration-300 hover:scale-110">
              D
            </div>
            <span className="font-bold text-xl">Danel</span>
          </div>

          {/* Desktop Menu - Centered */}
          <div className="hidden md:flex gap-8 absolute left-1/2 transform -translate-x-1/2">
            {[
              { key: 'home', label: t.nav.home },
              { key: 'about', label: t.nav.about },
              { key: 'projects', label: t.nav.projects },
              { key: 'pricing', label: t.nav.pricing },
              { key: 'skills', label: t.nav.skills }
            ].map(item => (
              <button
                key={item.key}
                onClick={() => scrollToSection(item.key)}
                className="nav-item px-3 py-2 rounded-lg font-medium transition-all duration-300 hover:text-purple-400 hover:scale-105"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Language Switcher - Right */}
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={() => {
                const newLang = language === 'es' ? 'en' : 'es';
                changeLanguage(newLang);
              }}
              className={`lang-switch px-3 py-1 rounded-md text-sm font-medium transition-all duration-300 hover:scale-105 ${
                language === 'es'
                  ? 'active bg-purple-600 text-white shadow-lg shadow-purple-500/30'
                  : 'text-gray-300 hover:text-purple-400 hover:bg-purple-500/10'
              }`}
            >
              ES
            </button>
            <button
              onClick={() => {
                const newLang = language === 'en' ? 'es' : 'en';
                changeLanguage(newLang);
              }}
              className={`lang-switch px-3 py-1 rounded-md text-sm font-medium transition-all duration-300 hover:scale-105 ${
                language === 'en'
                  ? 'active bg-purple-600 text-white shadow-lg shadow-purple-500/30'
                  : 'text-gray-300 hover:text-purple-400 hover:bg-purple-500/10'
              }`}
            >
              EN
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-purple-500/10 transition-all duration-300 hover:scale-110"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 space-y-2 mobile-menu">
            {/* Language Switcher - Mobile */}
            <div className="flex gap-2 pb-2 border-b border-purple-500/20">
              <button
                onClick={() => {
                  const newLang = language === 'es' ? 'en' : 'es';
                  changeLanguage(newLang);
                }}
                className={`lang-switch px-3 py-1 rounded-md text-sm font-medium transition-all duration-300 hover:scale-105 ${
                  language === 'es'
                    ? 'active bg-purple-600 text-white shadow-lg shadow-purple-500/30'
                    : 'text-gray-300 hover:text-purple-400 hover:bg-purple-500/10'
                }`}
              >
                ES
              </button>
              <button
                onClick={() => {
                  const newLang = language === 'en' ? 'es' : 'en';
                  changeLanguage(newLang);
                }}
                className={`lang-switch px-3 py-1 rounded-md text-sm font-medium transition-all duration-300 hover:scale-105 ${
                  language === 'en'
                    ? 'active bg-purple-600 text-white shadow-lg shadow-purple-500/30'
                    : 'text-gray-300 hover:text-purple-400 hover:bg-purple-500/10'
                }`}
              >
                EN
              </button>
            </div>

            {[
              { key: 'home', label: t.nav.home },
              { key: 'about', label: t.nav.about },
              { key: 'projects', label: t.nav.projects },
              { key: 'pricing', label: t.nav.pricing },
              { key: 'skills', label: t.nav.skills }
            ].map(item => (
              <button
                key={item.key}
                onClick={() => scrollToSection(item.key)}
                className="block w-full text-left py-3 px-2 hover:text-purple-400 transition-all duration-300 transform hover:translate-x-2 hover:bg-purple-500/10 rounded-lg hover:scale-105"
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}