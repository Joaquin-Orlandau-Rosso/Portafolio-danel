import React from 'react';

export default function Skills() {
  const skillCategories = [
    {
      category: 'Herramientas de Edición',
      icon: '🎬',
      items: ['Adobe Premiere Pro', 'After Effects', 'DaVinci Resolve', 'Final Cut Pro']
    },
    {
      category: 'Especialidades',
      icon: '✨',
      items: ['Color Grading', 'Motion Graphics', 'Post-producción', 'Edición narrativa']
    },
    {
      category: 'Certificaciones',
      icon: '🏆',
      items: ['Adobe Certified Expert', 'DaVinci Resolve Certified', 'Avid Media Composer']
    }
  ];

  return (
    <section id="skills" className="py-20 px-4 bg-[#1a1a2e]/50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-center">Habilidades</h2>

        <div className="grid md:grid-cols-3 gap-8">
          {skillCategories.map((skillGroup, i) => (
            <div key={i} className="bg-gradient-to-br from-purple-600/10 to-blue-600/10 border border-purple-500/30 p-8 rounded-xl hover:border-purple-400/50 transition-all duration-300">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-2xl">{skillGroup.icon}</span>
                <h3 className="text-xl font-bold text-purple-400">{skillGroup.category}</h3>
              </div>

              <div className="space-y-3">
                {skillGroup.items.map((skill, j) => (
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
