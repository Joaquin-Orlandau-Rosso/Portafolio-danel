import React from 'react';
import { Mail, ArrowRight } from 'lucide-react';

export default function Contact() {
  return (
    <section id="contact" className="py-20 px-4 bg-[#1a1a2e]/50">
      <div className="max-w-2xl mx-auto text-center space-y-8">
        <h2 className="text-4xl font-bold">Contacto</h2>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition flex items-center justify-center gap-2">
            <Mail size={20} /> Enviar Email
          </button>
          <button className="px-8 py-3 border border-purple-500 rounded-lg font-semibold hover:bg-purple-500/10 transition flex items-center justify-center gap-2">
            <ArrowRight size={20} /> Mi CV
          </button>
        </div>
      </div>
    </section>
  );
}
