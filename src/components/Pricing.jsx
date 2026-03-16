import React from 'react';
import { Check } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../languages/translations';

export default function Pricing() {
  const { language } = useLanguage();
  const t = translations[language];

  const plans = [
    {
      title: t.pricing.shorts.title,
      price: '7-10',
      currency: 'USD',
      features: t.pricing.shorts.features,
      featured: false,
    },
    {
      title: t.pricing.professional.title,
      price: t.pricing.professional.custom,
      currency: '',
      features: t.pricing.professional.features,
      featured: true,
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
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="text-purple-400 text-sm font-semibold tracking-widest uppercase">
            {language === 'es' ? 'Servicios' : 'Services'}
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mt-3 animate-in slide-in-from-bottom-4 duration-500">
            {t.pricing.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan, i) => (
            <div
              key={i}
              className={`relative p-7 rounded-2xl border transition-all duration-300 hover:-translate-y-1 animate-in slide-in-from-bottom-4 duration-500 ${
                plan.featured
                  ? 'border-purple-500/40 bg-purple-600/[0.08] shadow-lg shadow-purple-500/5'
                  : 'border-gray-800/50 bg-gray-900/30 hover:border-purple-500/20'
              }`}
              style={{ animationDelay: `${i * 150}ms` }}
            >
              {plan.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="px-4 py-1 bg-purple-600 text-white text-xs font-semibold rounded-full">
                    {language === 'es' ? 'Popular' : 'Popular'}
                  </span>
                </div>
              )}

              <h3 className="text-lg font-semibold text-purple-300 mb-4">{plan.title}</h3>

              <div className="mb-6">
                <span className="text-4xl font-bold text-white">{plan.price}</span>
                {plan.currency && (
                  <span className="text-gray-400 text-lg ml-1">{plan.currency}</span>
                )}
              </div>

              <div className="space-y-3">
                {plan.features.map((feature, j) => (
                  <div key={j} className="flex items-start gap-3">
                    <Check size={16} className="text-purple-400 mt-0.5 shrink-0" />
                    <span className="text-gray-300 text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {t.pricing.note && (
          <p className="text-center text-gray-500 text-sm mt-10 max-w-xl mx-auto">{t.pricing.note}</p>
        )}
      </div>
    </section>
  );
}
