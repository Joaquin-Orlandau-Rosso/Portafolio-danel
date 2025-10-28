import React, { useState } from 'react';
import { Mail, MessageCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../languages/translations';

export default function About() {
  const { language } = useLanguage();
  const t = translations[language];
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedDiscord, setCopiedDiscord] = useState(false);

  const copyEmailToClipboard = async () => {
    try {
      await navigator.clipboard.writeText('danez4344@gmail.com');
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } catch (err) {
      console.error('Error al copiar email:', err);
    }
  };

  const copyDiscordToClipboard = async () => {
    try {
      await navigator.clipboard.writeText('Danez43');
      setCopiedDiscord(true);
      setTimeout(() => setCopiedDiscord(false), 2000);
    } catch (err) {
      console.error('Error al copiar Discord:', err);
    }
  };

  return (
    <section id="about" className="py-12 md:py-20 px-4 bg-[#1a1a2e]/50 scroll-mt-20">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 md:mb-12 text-center animate-in slide-in-from-bottom-4 duration-500">{t.about.title}</h2>

        <div className="max-w-4xl mx-auto text-left space-y-6 md:space-y-8 animate-in slide-in-from-bottom-4 duration-700">
          <div className="space-y-4 text-gray-300 text-base md:text-lg leading-relaxed text-justify">
            <p className="animate-in slide-in-from-left duration-500 delay-200">
              {t.about.content}
            </p>
            <p className="animate-in slide-in-from-right duration-500 delay-300">
              {t.about.additionalContent}
            </p>
          </div>

          <div className="pt-4 space-y-4 animate-in slide-in-from-bottom-4 duration-500 delay-500">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105 ${
                  copiedEmail
                    ? 'text-green-400 bg-green-500/10 border border-green-500/30'
                    : 'text-gray-300 hover:text-purple-400 hover:bg-purple-500/10'
                }`}
                onClick={copyEmailToClipboard}
              >
                <Mail size={16} className="transition-transform duration-300 hover:scale-110" />
                <span>{copiedEmail ? t.about.emailCopied : t.about.emailLabel}</span>
              </button>
              <button
                className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105 ${
                  copiedDiscord
                    ? 'text-green-400 bg-green-500/10 border border-green-500/30'
                    : 'text-gray-300 hover:text-purple-400 hover:bg-purple-500/10'
                }`}
                onClick={copyDiscordToClipboard}
              >
                <MessageCircle size={16} className="transition-transform duration-300 hover:scale-110" />
                <span>{copiedDiscord ? t.about.emailCopied : t.about.discordLabel}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
