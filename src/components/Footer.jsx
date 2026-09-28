import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../languages/translations';

export default function Footer() {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <footer className="relative py-8 px-4">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-purple-500/40 to-transparent"
      />
      <div className="max-w-6xl mx-auto text-center">
        <p className="text-gray-600 text-sm">
          {t.footer.copyright}
        </p>
      </div>
    </footer>
  );
}
