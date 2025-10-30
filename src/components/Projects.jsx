import React, { useState, useEffect } from 'react';
import { streamingProjects, professionalProjects, irlProjects } from '../data/projects';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../languages/translations';

export default function Projects() {
  const { language } = useLanguage();
  const t = translations[language];
  const [selectedVideo, setSelectedVideo] = useState(null);

  const openModal = (project) => {
    // Si es un video de YouTube, preparamos la URL con autoplay
    if (project.isYoutube) {
      const videoId = getYouTubeId(project.video);
      project.videoUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    }
    setSelectedVideo(project);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedVideo(null);
    document.body.style.overflow = 'auto';
  };

  // Function to extract YouTube video ID from URL
  const getYouTubeId = (url) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  // Organizar proyectos por secciones
  const professionalProjectsSection = professionalProjects; // Solo ejemplo 1
  const socialProjects = [...streamingProjects]; // Todos los demás ejemplos (2, 3, 4, 5)

  const renderProjectSection = (title, projects, bgColor) => (
    <div className="mb-16 md:mb-24 animate-in slide-in-from-bottom-4 duration-700">
      <h3 className={`text-3xl md:text-4xl font-bold mb-6 md:mb-8 text-center ${bgColor}`}>
        {title}
      </h3>
      <div className="h-1 w-24 bg-gradient-to-r from-purple-600 to-blue-600 mx-auto mb-8 md:mb-12"></div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 max-w-4xl mx-auto items-stretch">
        {projects.map((project) => (
          <div
            key={project.id}
            className="group cursor-pointer h-full animate-in slide-in-from-bottom-4 duration-500 hover:scale-105 transition-all duration-300"
            onClick={() => openModal(project)}
          >
            {/* Contenedor del ejemplo */}
            <div className="bg-gray-800 rounded-2xl py-6 md:py-10 px-4 md:px-8 border border-gray-700 hover:border-purple-500/50 transition-all duration-300 flex flex-col h-full card-hover">

              {/* Video/Imagen arriba */}
              <div className="relative mb-4 md:mb-6">
                <div className="relative bg-gray-700 rounded-xl overflow-hidden">
                  {/* Ratio sin plugin: 9/16 en mobile, 3/4 en md+ */}
                  <div className="w-full pt-[177.78%] md:pt-[133.33%]"></div>
                  <img
                    src={project.image}
                    alt={typeof project.title === 'object' ? project.title[language] || project.title['es'] : project.title}
                    className="absolute inset-0 w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
                  />

                  {/* Botón de reproducción estilo YouTube */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-black/40 rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Información abajo */}
              <div className="text-left flex-1 flex flex-col">
                <h3 className={`text-xl md:text-2xl font-bold text-white mb-2 md:mb-3 transition-colors duration-300 ${
                  project.id === 2 || project.id === 4 ? 'group-hover:text-cyan-400' : // Azul celeste para ejemplo 2 y 4
                  project.id === 3 ? 'group-hover:text-violet-400' : // Violeta claro para ejemplo 3
                  project.id === 5 ? 'group-hover:text-green-400' : // Verde para ejemplo 5
                  'group-hover:text-purple-400' // Púrpura por defecto para ejemplo 1 y proyectos IRL
                }`}>
                  {typeof project.title === 'object' ? project.title[language] || project.title['es'] : project.title}
                </h3>
                <p className={`text-base md:text-lg mb-3 md:mb-4 font-medium ${
                  project.id === 2 || project.id === 4 ? 'text-cyan-400' :
                  project.id === 3 ? 'text-violet-400' :
                  project.id === 5 ? 'text-green-400' :
                  'text-purple-400'
                }`}>
                  {typeof project.category === 'object' ? project.category[language] || project.category['es'] : project.category}
                </p>
                <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-4 md:mb-5">
                  {typeof project.description === 'object' ? project.description[language] || project.description['es'] : project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.tags.map((tag, i) => (
                    <span key={i} className="px-3 md:px-4 py-1 md:py-2 bg-blue-500/20 text-blue-300 rounded-full text-xs md:text-sm font-medium hover:bg-blue-500/30 transition-colors duration-300">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Clip Info */}
                {project.clipInfo && (
                  <div className="mt-3 pt-3 border-t border-gray-600/30">
                    <p className="text-cyan-300 text-sm font-medium text-center flex items-center justify-center gap-2">
                      <span className="w-1 h-1 bg-cyan-300 rounded-full"></span>
                      {typeof project.clipInfo === 'object' ? project.clipInfo[language] || project.clipInfo['es'] : project.clipInfo}
                      <span className="w-1 h-1 bg-cyan-300 rounded-full"></span>
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <section id="projects" className="py-16 md:py-24 px-4 bg-gray-900 min-h-screen scroll-mt-20">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 md:mb-16 text-center animate-in slide-in-from-bottom-4 duration-500">
          {t.projects.title}
        </h2>

        {/* Proyectos IRL */}
        {renderProjectSection(
          t.projects.irlProjects,
          irlProjects,
          'text-green-400'
        )}

        {/* Proyectos Redes */}
        {renderProjectSection(
          t.projects.socialProjects,
          socialProjects,
          'text-blue-400'
        )}

        {/* Proyectos Profesionales */}
        {renderProjectSection(
          t.projects.professionalProjects,
          professionalProjectsSection,
          'text-purple-400'
        )}
      </div>

      {/* Modal para reproducir video */}
      {selectedVideo && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4" onClick={closeModal}>
          <div className="relative w-full max-w-4xl mx-auto" onClick={e => e.stopPropagation()}>
            <button 
              onClick={closeModal}
              className="absolute -top-10 right-0 text-white hover:text-gray-300 transition-colors"
              aria-label="Cerrar video"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <div className="relative pt-[56.25%] w-full">
              <iframe
                src={selectedVideo.videoUrl}
                className="absolute top-0 left-0 w-full h-full rounded-lg"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={selectedVideo.title}
                loading="lazy"
              />
            </div>
            <div className="mt-4 text-center">
              <p className={`text-xl font-bold ${
                selectedVideo.id === 2 || selectedVideo.id === 4 ? 'text-cyan-400' :
                selectedVideo.id === 3 ? 'text-violet-400' :
                selectedVideo.id === 5 ? 'text-green-400' :
                'text-purple-400'
              }`}>
                {typeof selectedVideo.category === 'object' ? selectedVideo.category[language] || selectedVideo.category['es'] : selectedVideo.category}
              </p>
              {selectedVideo.clipInfo && (
                <p className="text-cyan-300 text-base font-medium mt-2 flex items-center justify-center gap-2">
                  <span className="w-1 h-1 bg-cyan-300 rounded-full"></span>
                  {typeof selectedVideo.clipInfo === 'object' ? selectedVideo.clipInfo[language] || selectedVideo.clipInfo['es'] : selectedVideo.clipInfo}
                  <span className="w-1 h-1 bg-cyan-300 rounded-full"></span>
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
