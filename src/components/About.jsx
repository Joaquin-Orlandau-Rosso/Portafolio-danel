import React, { useState } from 'react';
import { Mail } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../languages/translations';

export default function About() {
  const { language } = useLanguage();
  const t = translations[language];
  const [copiedEmail, setCopiedEmail] = useState(false);

  const copyEmailToClipboard = async () => {
    try {
      await navigator.clipboard.writeText('danez4344@gmail.com');
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } catch (err) {
      console.error('Error al copiar email:', err);
    }
  };

  return (
    <section id="about" className="py-20 px-4 bg-[#1a1a2e]/50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-center">{t.about.title}</h2>

        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="flex justify-center">
            <img
              src="/images/cara.jpg"
              alt="Foto de Danel - Editor de Videos"
              className="w-48 h-48 rounded-full object-cover border-4 border-purple-500"
            />
          </div>

          <div className="space-y-4 text-gray-300 text-lg max-w-2xl mx-auto">
            <p>
              {t.about.content}
            </p>
            <p>
              {language === 'es'
                ? 'Me especializo en narración, corrección de color y gráficos en movimiento para dar vida a las visiones.'
                : 'I specialize in storytelling, color correction, and motion graphics to bring visions to life.'
              }
            </p>
          </div>

          <div className="pt-4 space-y-4">
            <button
              className={`flex items-center justify-center gap-2 mx-auto px-4 py-2 rounded-lg transition-all duration-300 ${
                copiedEmail
                  ? 'text-green-400 bg-green-500/10 border border-green-500/30'
                  : 'text-gray-300 hover:text-purple-400 hover:bg-purple-500/10'
              }`}
              onClick={copyEmailToClipboard}
            >
              <Mail size={16} />
              <span>{copiedEmail ? (language === 'es' ? '¡Copiado!' : 'Copied!') : 'danez4344@gmail.com'}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
