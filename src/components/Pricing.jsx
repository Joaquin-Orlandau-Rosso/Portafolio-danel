import React from 'react';
import { Check } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../languages/translations';
import Reveal from './Reveal';
import SectionHeader from './SectionHeader';

export default function Pricing() {
  const { language } = useLanguage();
  const t = translations[language];

  const plans = [
    {
      title: t.pricing.professional.title,
      price: t.pricing.professional.custom,
      currency: '',
      features: t.pricing.professional.features,
      featured: false,
    },
    {
      title: t.pricing.shorts.title,
      price: '6-10',
      currency: 'USD',
      features: t.pricing.shorts.features,
      featured: false,
    },
    {
      title: t.pricing.longVideos.title,
      price: t.pricing.longVideos.consult,
      currency: '',
      features: t.pricing.longVideos.features,
      featured: false,
    },
  ];

  return (
    <section id="pricing" className="py-20 md:py-32 px-4 scroll-mt-20 relative">
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-600/[0.03] to-transparent pointer-events-none" />

      <div className="max-w-5xl mx-auto relative">
        <SectionHeader
          eyebrow={language === 'es' ? 'Servicios' : 'Services'}
          title={t.pricing.title}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan, i) => (
            <Reveal key={i} delay={i * 120} className="h-full">
            <div
              className={`group relative h-full p-7 rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-500/10 ${
                plan.featured
                  ? 'border-purple-500/40 bg-purple-600/[0.08] shadow-lg shadow-purple-500/5'
                  : 'border-gray-800/50 bg-gray-900/30 hover:border-purple-500/30'
              }`}
            >
              {/* Línea degradada y brillo que se encienden con el hover (recortados
                  en su propia capa para no cortar el cartel "Popular") */}
              <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-fuchsia-400 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-48 h-40 rounded-full bg-purple-600/20 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </div>

              {plan.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="px-4 py-1 bg-purple-600 text-white text-xs font-semibold rounded-full">
                    {language === 'es' ? 'Popular' : 'Popular'}
                  </span>
                </div>
              )}

              <h3 className="relative text-lg font-semibold text-purple-300 mb-4">{plan.title}</h3>

              <div className="relative mb-6">
                <span className="text-4xl font-bold text-white transition-colors duration-300 group-hover:text-purple-100">{plan.price}</span>
                {plan.currency && (
                  <span className="text-gray-400 text-lg ml-1">{plan.currency}</span>
                )}
              </div>

              <div className="relative space-y-3">
                {plan.features.map((feature, j) => (
                  <div key={j} className="reveal-child flex items-start gap-3" style={{ '--i': j }}>
                    <Check size={16} className="text-purple-400 mt-0.5 shrink-0" />
                    <span className="text-gray-300 text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            </Reveal>
          ))}
        </div>

        {t.pricing.note && (
          <p className="text-center text-gray-500 text-sm mt-10 max-w-xl mx-auto">{t.pricing.note}</p>
        )}
      </div>
    </section>
  );
}
