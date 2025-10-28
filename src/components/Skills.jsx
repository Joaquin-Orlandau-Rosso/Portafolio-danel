import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../languages/translations';

export default function Skills() {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <section id="skills" className="py-12 md:py-20 px-4 bg-[#1a1a2e]/50 scroll-mt-20">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center animate-in slide-in-from-bottom-4 duration-500">{t.skills.title}</h2>
        <div className="h-1 w-24 bg-gradient-to-r from-purple-600 to-blue-600 mx-auto mb-8 md:mb-12 animate-in slide-in-from-bottom-4 duration-700"></div>
        <p className="text-center text-gray-300 mb-8 max-w-2xl mx-auto animate-in slide-in-from-bottom-4 duration-500 delay-200">{t.skills.subtitle}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {Object.values(t.skills.categories).map((category, i) => (
            <div
              key={i}
              className="bg-gradient-to-br from-purple-600/10 to-blue-600/10 border border-purple-500/30 p-6 md:p-8 rounded-xl hover:border-purple-400/50 transition-all duration-300 card-hover animate-in slide-in-from-bottom-4 duration-500"
              style={{ animationDelay: `${300 + i * 200}ms` }}
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="text-2xl">{category.icon}</span>
                <h3 className="text-lg md:text-xl font-bold text-purple-400">{category.title}</h3>
              </div>

              <div className="space-y-3">
                {category.items.map((skill, j) => (
                  <div key={j} className="flex items-center gap-3 group">
                    <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full group-hover:scale-150 transition-all duration-300" />
                    <span className="text-gray-300 group-hover:text-white transition-colors duration-300">{skill}</span>
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
