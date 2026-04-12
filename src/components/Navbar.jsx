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
      const offsetTop = element.offsetTop - 80;
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const navItems = [
    { key: 'home', label: t.nav.home },
    { key: 'about', label: t.nav.about },
    { key: 'projects', label: t.nav.projects },
    { key: 'pricing', label: t.nav.pricing },
    { key: 'skills', label: t.nav.skills },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0f0f0f]/80 backdrop-blur-xl border-b border-white/[0.06] transition-all duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <button onClick={() => scrollToSection('home')} className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center font-bold text-sm transition-transform duration-300 group-hover:scale-110">
              D
            </div>
            <span className="font-semibold text-lg">Danel</span>
          </button>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map(item => (
              <button
                key={item.key}
                onClick={() => scrollToSection(item.key)}
                className="px-4 py-2 rounded-lg text-sm text-gray-400 hover:text-white font-medium transition-all duration-200 hover:bg-white/[0.04]"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Language + Mobile Menu */}
          <div className="flex items-center gap-3">
            {/* Language toggle */}
            <div className="flex items-center bg-gray-900/50 border border-gray-800 rounded-lg p-0.5">
              <button
                onClick={() => changeLanguage('es')}
                className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all duration-200 ${
                  language === 'es'
                    ? 'bg-purple-600 text-white'
                    : 'text-gray-500 hover:text-gray-300'
                }`}
              >
                ES
              </button>
              <button
                onClick={() => changeLanguage('en')}
                className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all duration-200 ${
                  language === 'en'
                    ? 'bg-purple-600 text-white'
                    : 'text-gray-500 hover:text-gray-300'
                }`}
              >
                EN
              </button>
            </div>

            {/* Mobile hamburger */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-white/[0.04] transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 pt-2 space-y-1 mobile-menu border-t border-white/[0.04]">
            {navItems.map(item => (
              <button
                key={item.key}
                onClick={() => scrollToSection(item.key)}
                className="block w-full text-left py-2.5 px-3 text-gray-400 hover:text-white hover:bg-white/[0.04] rounded-lg text-sm font-medium transition-all duration-200"
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
