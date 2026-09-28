import React, { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../languages/translations';

const SECTION_IDS = ['home', 'about', 'projects', 'pricing', 'skills'];
const LANGUAGES = ['es', 'en'];

export default function Navbar({ isMenuOpen, setIsMenuOpen }) {
  const { language, changeLanguage } = useLanguage();
  const t = translations[language];
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const progressRef = useRef(null);

  // Barra de progreso y fondo del nav: se recalculan como mucho una vez por frame
  useEffect(() => {
    let frame = null;
    const update = () => {
      frame = null;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${progress})`;
      setScrolled(window.scrollY > 10);
    };
    const onScroll = () => {
      if (frame === null) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, []);

  // Sección activa: la que cruza la franja del medio de la pantalla
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    SECTION_IDS.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop - 80;
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const navItems = SECTION_IDS.map(key => ({ key, label: t.nav[key] }));

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b transition-all duration-300 ${
        isMenuOpen
          ? 'bg-[#0a0a0f]/95 border-white/[0.08] shadow-lg shadow-black/40'
          : scrolled
            ? 'bg-[#0a0a0f]/85 border-white/[0.08] shadow-lg shadow-black/40'
            : 'bg-[#0f0f0f]/60 border-white/[0.04]'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <button onClick={() => scrollToSection('home')} className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-fuchsia-600 rounded-lg flex items-center justify-center font-bold text-sm shadow-md shadow-purple-500/20 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
              D
            </div>
            <span className="font-semibold text-lg">Danel</span>
          </button>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map(item => {
              const isActive = activeSection === item.key;
              return (
                <button
                  key={item.key}
                  onClick={() => scrollToSection(item.key)}
                  className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-white/[0.04] ${
                    isActive ? 'text-white' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {item.label}
                  <span
                    aria-hidden="true"
                    className={`absolute left-4 right-4 -bottom-px h-0.5 rounded-full bg-gradient-to-r from-purple-400 to-fuchsia-400 transition-transform duration-300 ${
                      isActive ? 'scale-x-100' : 'scale-x-0'
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Language + Mobile Menu */}
          <div className="flex items-center gap-3">
            {/* Language toggle: la píldora se desliza hacia el idioma elegido */}
            <div className="relative flex items-center bg-gray-900/50 border border-gray-800 rounded-lg p-0.5">
              <span
                aria-hidden="true"
                className={`absolute top-0.5 bottom-0.5 left-0.5 w-9 rounded-md bg-gradient-to-r from-purple-600 to-fuchsia-600 shadow-md shadow-purple-500/30 transition-transform duration-300 ease-out ${
                  language === 'en' ? 'translate-x-9' : 'translate-x-0'
                }`}
              />
              {LANGUAGES.map(code => (
                <button
                  key={code}
                  onClick={() => changeLanguage(code)}
                  className={`relative z-10 w-9 py-1 rounded-md text-xs font-medium transition-colors duration-200 ${
                    language === code ? 'text-white' : 'text-gray-500 hover:text-gray-300'
                  }`}
                >
                  {code.toUpperCase()}
                </button>
              ))}
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
            {navItems.map((item, i) => {
              const isActive = activeSection === item.key;
              return (
                <button
                  key={item.key}
                  onClick={() => scrollToSection(item.key)}
                  className={`mobile-menu-item block w-full text-left py-2.5 px-3 rounded-lg text-sm font-medium transition-all duration-200 border-l-2 ${
                    isActive
                      ? 'text-white bg-white/[0.04] border-fuchsia-400'
                      : 'text-gray-400 hover:text-white hover:bg-white/[0.04] border-transparent'
                  }`}
                  style={{ animationDelay: `${i * 40}ms` }}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Progreso de lectura */}
      <div
        ref={progressRef}
        aria-hidden="true"
        className="absolute left-0 right-0 -bottom-px h-0.5 origin-left bg-gradient-to-r from-purple-500 via-violet-400 to-fuchsia-500"
        style={{ transform: 'scaleX(0)' }}
      />
    </nav>
  );
}
