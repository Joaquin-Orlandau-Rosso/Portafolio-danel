import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../languages/translations';
import Reveal from './Reveal';
import SectionHeader from './SectionHeader';

export default function Skills() {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <section id="skills" className="py-20 md:py-32 px-4 scroll-mt-20">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          eyebrow={language === 'es' ? 'Experiencia' : 'Expertise'}
          title={t.skills.title}
          subtitle={t.skills.subtitle}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.values(t.skills.categories).map((category, i) => (
            <Reveal key={i} delay={i * 120} className="h-full">
              <div className="group/card h-full p-7 rounded-2xl border border-gray-800/50 bg-gray-900/30 hover:border-purple-500/30 hover:bg-purple-500/[0.03] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-500/10">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-2xl inline-block transition-transform duration-300 group-hover/card:scale-125 group-hover/card:-rotate-12">
                    {category.icon}
                  </span>
                  <h3 className="text-lg font-semibold text-white">{category.title}</h3>
                </div>

                <div className="space-y-3">
                  {category.items.map((skill, j) => (
                    <div key={j} className="reveal-child flex items-center gap-3 group" style={{ '--i': j }}>
                      <div className="w-1.5 h-1.5 bg-gradient-to-r from-purple-400 to-fuchsia-400 rounded-full group-hover:scale-150 transition-transform duration-300" />
                      <span className="text-gray-300 group-hover:text-white transition-colors duration-300 text-sm">
                        {skill}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
