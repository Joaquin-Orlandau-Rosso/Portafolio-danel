import React from 'react';
import { Menu, X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../languages/translations';

export default function Navbar({ isMenuOpen, setIsMenuOpen }) {
  const { language, changeLanguage } = useLanguage();

  const toggleLanguage = (newLang) => {
    changeLanguage(newLang);
  };

  const t = translations[language];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0f0f0f]/80 backdrop-blur-md border-b border-purple-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center font-bold">
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
              { key: 'skills', label: t.nav.skills }
            ].map(item => (
              <a
                key={item.key}
                href={`#${item.key}`}
                className="hover:text-purple-400 transition relative group py-2"
              >
                <span className="relative z-10">{item.label}</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-500 group-hover:w-full transition-all duration-300" />
                <span className="absolute inset-0 bg-purple-500/10 opacity-0 group-hover:opacity-100 scale-0 group-hover:scale-100 transition-all duration-300 rounded-lg" />
              </a>
            ))}
          </div>

          {/* Language Switcher - Right */}
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={() => toggleLanguage('es')}
              className={`px-3 py-1 rounded-md text-sm font-medium transition ${
                language === 'es'
                  ? 'bg-purple-600 text-white'
                  : 'text-gray-300 hover:text-purple-400 hover:bg-purple-500/10'
              }`}
            >
              ES
            </button>
            <button
              onClick={() => toggleLanguage('en')}
              className={`px-3 py-1 rounded-md text-sm font-medium transition ${
                language === 'en'
                  ? 'bg-purple-600 text-white'
                  : 'text-gray-300 hover:text-purple-400 hover:bg-purple-500/10'
              }`}
            >
              EN
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 space-y-2">
            {/* Language Switcher - Mobile */}
            <div className="flex gap-2 pb-2 border-b border-purple-500/20">
              <button
                onClick={() => toggleLanguage('es')}
                className={`px-3 py-1 rounded-md text-sm font-medium transition ${
                  language === 'es'
                    ? 'bg-purple-600 text-white'
                    : 'text-gray-300 hover:text-purple-400 hover:bg-purple-500/10'
                }`}
              >
                ES
              </button>
              <button
                onClick={() => toggleLanguage('en')}
                className={`px-3 py-1 rounded-md text-sm font-medium transition ${
                  language === 'en'
                    ? 'bg-purple-600 text-white'
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
              { key: 'skills', label: t.nav.skills }
            ].map(item => (
              <a
                key={item.key}
                href={`#${item.key}`}
                className="block py-2 hover:text-purple-400 transition transform hover:translate-x-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}