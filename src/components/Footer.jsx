import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../languages/translations';

export default function Footer() {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <footer className="border-t border-gray-800/50 py-8 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <p className="text-gray-600 text-sm">
          {t.footer.copyright}
        </p>
      </div>
    </footer>
  );
}
