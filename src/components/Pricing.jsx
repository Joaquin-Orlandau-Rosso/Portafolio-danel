import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../languages/translations';

export default function Pricing() {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <section id="pricing" className="py-16 px-4 bg-[#1a1a2e]/50 scroll-mt-20">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
          {t.pricing.title}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {/* Tarjeta Shorts */}
          <div className="bg-gradient-to-br from-purple-600/10 to-blue-600/10 border border-purple-500/30 p-6 rounded-xl">
            <h3 className="text-xl font-bold text-purple-400 mb-4">
              {t.pricing.shorts.title}
            </h3>
            <p className="text-3xl font-bold mb-4">7-10<span className="text-lg">USD</span></p>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-start">
                <span className="text-purple-400 mr-2">•</span>
                {t.pricing.shorts.features[0]}
              </li>
              <li className="flex items-start">
                <span className="text-purple-400 mr-2">•</span>
                {t.pricing.shorts.features[1]}
              </li>
            </ul>
          </div>
          
          {/* Tarjeta Proyectos Profesionales */}
          <div className="bg-gradient-to-br from-purple-600/10 to-blue-600/10 border border-purple-500/30 p-6 rounded-xl">
            <h3 className="text-xl font-bold text-cyan-400 mb-4">
              {t.pricing.professional.title}
            </h3>
            <p className="text-3xl font-bold mb-4">
              {t.pricing.professional.custom}
            </p>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                {t.pricing.professional.features[0]}
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                {t.pricing.professional.features[1]}
              </li>
            </ul>
          </div>
          
          {/* Tarjeta Videos Largos */}
          <div className="bg-gradient-to-br from-purple-600/10 to-blue-600/10 border border-purple-500/30 p-6 rounded-xl">
            <h3 className="text-xl font-bold text-green-400 mb-4">
              {t.pricing.longVideos.title}
            </h3>
            <p className="text-3xl font-bold mb-4">
              {t.pricing.longVideos.consult}
            </p>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-start">
                <span className="text-green-400 mr-2">•</span>
                {t.pricing.longVideos.features[0]}
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-2">•</span>
                {t.pricing.longVideos.features[1]}
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 text-center text-gray-300 max-w-2xl mx-auto">
          <p>{t.pricing.note}</p>
        </div>
      </div>
    </section>
  );
}
