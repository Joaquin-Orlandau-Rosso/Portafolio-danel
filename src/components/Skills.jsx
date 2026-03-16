import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../languages/translations';

export default function Skills() {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <section id="skills" className="py-20 md:py-32 px-4 scroll-mt-20">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="text-purple-400 text-sm font-semibold tracking-widest uppercase">
            {language === 'es' ? 'Experiencia' : 'Expertise'}
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mt-3 animate-in slide-in-from-bottom-4 duration-500">
            {t.skills.title}
          </h2>
          <p className="text-gray-400 mt-4 max-w-xl mx-auto animate-in slide-in-from-bottom-4 duration-700">
            {t.skills.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.values(t.skills.categories).map((category, i) => (
            <div
              key={i}
              className="p-7 rounded-2xl border border-gray-800/50 bg-gray-900/30 hover:border-purple-500/20 transition-all duration-300 hover:-translate-y-1 animate-in slide-in-from-bottom-4 duration-500"
              style={{ animationDelay: `${200 + i * 150}ms` }}
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="text-2xl">{category.icon}</span>
                <h3 className="text-lg font-semibold text-white">{category.title}</h3>
              </div>

              <div className="space-y-3">
                {category.items.map((skill, j) => (
                  <div key={j} className="flex items-center gap-3 group">
                    <div className="w-1.5 h-1.5 bg-purple-400 rounded-full group-hover:scale-150 transition-transform duration-300" />
                    <span className="text-gray-300 group-hover:text-white transition-colors duration-300 text-sm">
                      {skill}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
