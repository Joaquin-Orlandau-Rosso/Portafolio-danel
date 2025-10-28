import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../languages/translations';

export default function Footer() {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <footer className="border-t border-purple-500/20 py-6 md:py-8 px-4 scroll-mt-20">
      <div className="max-w-6xl mx-auto text-center">
        <p className="text-gray-400 text-sm animate-in slide-in-from-bottom-4 duration-500">
          {t.footer.copyright}
        </p>
      </div>
    </footer>
  );
}
