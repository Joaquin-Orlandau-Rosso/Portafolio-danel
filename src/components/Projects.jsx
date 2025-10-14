import React, { useState } from 'react';
import { streamingProjects, professionalProjects } from '../data/projects';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../languages/translations';

export default function Projects() {
  const { language } = useLanguage();
  const t = translations[language];
  const [selectedVideo, setSelectedVideo] = useState(null);

  const openModal = (video) => {
    setSelectedVideo(video);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedVideo(null);
    document.body.style.overflow = 'auto';
  };

  return (
    <section id="projects" className="py-20 px-4 relative">
      {selectedVideo && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4" onClick={closeModal}>
          <div className="relative w-full max-w-4xl" onClick={e => e.stopPropagation()}>
            <button
              onClick={closeModal}
              className="absolute -top-10 right-0 text-white hover:text-purple-400 transition"
              aria-label={language === 'es' ? 'Cerrar' : 'Close'}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <video
              src={selectedVideo.video}
              controls
              autoPlay
              className="w-full max-h-[80vh]"
              onClick={e => e.stopPropagation()}
            />
            <div className="mt-2 text-white text-center">
              <h3 className="text-xl font-bold">{selectedVideo.title}</h3>
              <p className="text-sm text-gray-300">{selectedVideo.category}</p>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto">
        {/* Professional Videos Section */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold mb-4 text-center">{t.projects.title}</h2>
          <div className="h-1 w-24 bg-gradient-to-r from-purple-600 to-blue-600 mx-auto mb-12"></div>

          <div className="grid md:grid-cols-2 gap-8">
            {professionalProjects.map((project) => (
              <div
                key={project.id}
                className="group bg-[#1a1a2e] border border-purple-500/20 rounded-xl overflow-hidden hover:border-purple-500/50 transition cursor-pointer"
              >
                <div className="relative overflow-hidden h-48 group">
                  <div
                    className="w-full h-full flex items-center justify-center bg-black/20 cursor-pointer"
                    onClick={() => openModal(project)}
                  >
                    <video
                      src={project.video}
                      alt={project.title}
                      className="w-full h-full object-cover"
                      preload="metadata"
                      onClick={(e) => {
                        e.stopPropagation();
                        openModal(project);
                      }}
                    >
                      {language === 'es' ? 'Tu navegador no soporta la etiqueta de video.' : 'Your browser does not support the video tag.'}
                    </video>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4 pointer-events-none">
                      <h3 className="text-white text-xl font-bold drop-shadow-lg">{project.title}</h3>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="bg-black/50 rounded-full p-4 text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 space-y-4">
                    <div className="flex justify-between items-start">
                      <span className="text-purple-400 text-sm font-semibold">{project.category}</span>
                      <span className="text-purple-400 text-sm font-semibold">Video {project.id}</span>
                    </div>

                    <p className="text-gray-300 text-sm">{project.description}</p>

                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, i) => (
                        <span key={i} className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Streaming Videos Section */}
        <div>
          <h2 className="text-4xl font-bold mb-4 text-center">{language === 'es' ? 'Videos Streaming' : 'Streaming Videos'}</h2>
          <div className="h-1 w-24 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-12"></div>

          <div className="grid md:grid-cols-2 gap-8">
            {streamingProjects.map((project) => (
              <div
                key={project.id}
                className="group bg-[#1a1a2e] border border-blue-500/20 rounded-xl overflow-hidden hover:border-blue-500/50 transition cursor-pointer"
              >
                <div className="relative overflow-hidden h-48 group">
                  <div
                    className="w-full h-full flex items-center justify-center bg-black/20 cursor-pointer"
                    onClick={() => openModal(project)}
                  >
                    <video
                      src={project.video}
                      alt={project.title}
                      className="w-full h-full object-cover"
                      preload="metadata"
                      onClick={(e) => {
                        e.stopPropagation();
                        openModal(project);
                      }}
                    >
                      {language === 'es' ? 'Tu navegador no soporta la etiqueta de video.' : 'Your browser does not support the video tag.'}
                    </video>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4 pointer-events-none">
                      <h3 className="text-white text-xl font-bold drop-shadow-lg">{project.title}</h3>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="bg-black/50 rounded-full p-4 text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 space-y-4">
                    <div className="flex justify-between items-start">
                      <span className="text-blue-400 text-sm font-semibold">{project.category}</span>
                      <span className="text-blue-400 text-sm font-semibold">Video {project.id}</span>
                    </div>

                    <p className="text-gray-300 text-sm">{project.description}</p>

                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, i) => (
                        <span key={i} className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
