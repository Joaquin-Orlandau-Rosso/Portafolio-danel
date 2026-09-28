import React, { useState, useEffect, useRef } from 'react';
import { Mail, MessageCircle, Copy, Check } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../languages/translations';
import Reveal from './Reveal';
import SectionHeader from './SectionHeader';

function AnimatedNumber({ target, duration = 1500, isVisible }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;
    const end = parseInt(target, 10);
    if (isNaN(end)) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setCount(end);
      return;
    }

    let frame;
    const start = performance.now();
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      // easeOutCubic: arranca rápido y frena al llegar
      setCount(Math.round(end * (1 - Math.pow(1 - progress, 3))));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(frame);
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
        <SectionHeader
          eyebrow={language === 'es' ? 'Conóceme' : 'Get to know me'}
          title={t.about.title}
        />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
          {/* Left column - Text */}
          <div className="lg:col-span-3 space-y-6">
            <Reveal as="p" variant="left" className="text-gray-300 text-lg leading-relaxed">
              {t.about.content}
            </Reveal>
            <Reveal as="p" variant="left" delay={120} className="text-gray-400 text-lg leading-relaxed">
              {t.about.additionalContent}
            </Reveal>

            {/* Contact cards */}
            <Reveal delay={240} className="flex flex-col sm:flex-row gap-3 pt-4">
              <button
                onClick={() => copyToClipboard('danez4344@gmail.com', setCopiedEmail)}
                className={`flex items-center gap-3 px-5 py-3 rounded-xl border transition-all duration-300 hover:-translate-y-0.5 group ${
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
                className={`flex items-center gap-3 px-5 py-3 rounded-xl border transition-all duration-300 hover:-translate-y-0.5 group ${
                  copiedDiscord
                    ? 'border-green-500/30 bg-green-500/10 text-green-400'
                    : 'border-gray-800 hover:border-purple-500/30 bg-gray-900/50 hover:bg-purple-500/5 text-gray-300'
                }`}
              >
                {copiedDiscord ? <Check size={16} /> : <MessageCircle size={16} className="text-purple-400" />}
                <span className="text-sm">{copiedDiscord ? t.about.emailCopied : t.about.discordLabel}</span>
                {!copiedDiscord && <Copy size={14} className="text-gray-600 group-hover:text-purple-400 transition-colors" />}
              </button>
            </Reveal>
          </div>

          {/* Right column - Stats with counting animation */}
          <div ref={statsRef} className="lg:col-span-2 space-y-4">
            {stats.map((stat, i) => (
              <Reveal key={i} variant="right" delay={i * 150}>
                <div className="p-5 rounded-xl border border-gray-800/50 bg-gray-900/30 hover:border-purple-500/30 hover:bg-purple-500/[0.04] transition-all duration-300 hover:-translate-y-1">
                  <div className="inline-block text-3xl font-bold mb-1 bg-gradient-to-r from-purple-300 via-purple-400 to-fuchsia-400 bg-clip-text text-transparent">
                    <AnimatedNumber target={stat.value} isVisible={statsVisible} duration={1400} />
                    {stat.suffix}
                  </div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
