import React, { useState, useEffect, useRef } from 'react';
import { Mail, MessageCircle, Copy, Check } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../languages/translations';

function AnimatedNumber({ target, duration = 1500, isVisible }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;
    setCount(0);
    let start = 0;
    const end = parseInt(target);
    if (isNaN(end)) return;

    const stepTime = Math.max(Math.floor(duration / end), 20);
    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= end) clearInterval(timer);
    }, stepTime);

    return () => clearInterval(timer);
  }, [target, duration, isVisible]);

  return <>{count}</>;
}

export default function About() {
  const { language } = useLanguage();
  const t = translations[language];
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedDiscord, setCopiedDiscord] = useState(false);
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  const copyToClipboard = async (text, setter) => {
    try {
      await navigator.clipboard.writeText(text);
      setter(true);
      setTimeout(() => setter(false), 2000);
    } catch (err) {
      console.error('Error al copiar:', err);
    }
  };

  const stats = language === 'es'
    ? [
        { value: '4', suffix: '+', label: 'Años de experiencia' },
        { value: '50', suffix: '+', label: 'Proyectos completados' },
        { value: '20', suffix: '+', label: 'Clientes satisfechos' },
      ]
    : [
        { value: '4', suffix: '+', label: 'Years of experience' },
        { value: '50', suffix: '+', label: 'Projects completed' },
        { value: '20', suffix: '+', label: 'Satisfied clients' },
      ];

  return (
    <section id="about" className="py-20 md:py-32 px-4 scroll-mt-20">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="text-purple-400 text-sm font-semibold tracking-widest uppercase">
            {language === 'es' ? 'Conóceme' : 'Get to know me'}
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mt-3 animate-in slide-in-from-bottom-4 duration-500">
            {t.about.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
          {/* Left column - Text */}
          <div className="lg:col-span-3 space-y-6">
            <p className="text-gray-300 text-lg leading-relaxed animate-in slide-in-from-left duration-500 delay-200">
              {t.about.content}
            </p>
            <p className="text-gray-400 text-lg leading-relaxed animate-in slide-in-from-left duration-500 delay-300">
              {t.about.additionalContent}
            </p>

            {/* Contact cards */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4 animate-in slide-in-from-bottom-4 duration-500 delay-500">
              <button
                onClick={() => copyToClipboard('danez4344@gmail.com', setCopiedEmail)}
                className={`flex items-center gap-3 px-5 py-3 rounded-xl border transition-all duration-300 group ${
                  copiedEmail
                    ? 'border-green-500/30 bg-green-500/10 text-green-400'
                    : 'border-gray-800 hover:border-purple-500/30 bg-gray-900/50 hover:bg-purple-500/5 text-gray-300'
                }`}
              >
                {copiedEmail ? <Check size={16} /> : <Mail size={16} className="text-purple-400" />}
                <span className="text-sm">{copiedEmail ? t.about.emailCopied : t.about.emailLabel}</span>
                {!copiedEmail && <Copy size={14} className="text-gray-600 group-hover:text-purple-400 transition-colors" />}
              </button>
              <button
                onClick={() => copyToClipboard('Danez43', setCopiedDiscord)}
                className={`flex items-center gap-3 px-5 py-3 rounded-xl border transition-all duration-300 group ${
                  copiedDiscord
                    ? 'border-green-500/30 bg-green-500/10 text-green-400'
                    : 'border-gray-800 hover:border-purple-500/30 bg-gray-900/50 hover:bg-purple-500/5 text-gray-300'
                }`}
              >
                {copiedDiscord ? <Check size={16} /> : <MessageCircle size={16} className="text-purple-400" />}
                <span className="text-sm">{copiedDiscord ? t.about.emailCopied : t.about.discordLabel}</span>
                {!copiedDiscord && <Copy size={14} className="text-gray-600 group-hover:text-purple-400 transition-colors" />}
              </button>
            </div>
          </div>

          {/* Right column - Stats with counting animation */}
          <div ref={statsRef} className="lg:col-span-2 space-y-4">
            {stats.map((stat, i) => (
              <div
                key={i}
                className={`p-5 rounded-xl border border-gray-800/50 bg-gray-900/30 hover:border-purple-500/20 transition-all duration-500 ${
                  statsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                }`}
                style={{ transitionDelay: `${i * 200}ms` }}
              >
                <div className="text-3xl font-bold text-purple-400 mb-1">
                  <AnimatedNumber target={stat.value} isVisible={statsVisible} duration={1200} />
                  {stat.suffix}
                </div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
