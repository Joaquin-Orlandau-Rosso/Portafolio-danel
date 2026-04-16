import React, { useState } from 'react';
import { Play, X, ExternalLink } from 'lucide-react';
import { streamingProjects, professionalProjects, irlProjects } from '../data/projects';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../languages/translations';

const allProjects = [...professionalProjects, ...streamingProjects, ...irlProjects];

const TABS = {
  es: [
    { key: 'streaming', label: 'Redes' },
    { key: 'irl', label: 'IRL' },
    { key: 'professional', label: 'Profesional' },
  ],
  en: [
    { key: 'streaming', label: 'Social Media' },
    { key: 'irl', label: 'IRL' },
    { key: 'professional', label: 'Professional' },
  ],
};

const STREAMING_SUBTABS = {
  es: [
    { key: 'short', label: 'Shorts' },
    { key: 'video', label: 'Videos YouTube' },
  ],
  en: [
    { key: 'short', label: 'Shorts' },
    { key: 'video', label: 'YouTube Videos' },
  ],
};

function getFilteredProjects(tab, streamingSubTab) {
  if (tab === 'all') return allProjects;
  if (tab === 'professional') return professionalProjects;
  if (tab === 'streaming') {
    return streamingProjects.filter(p => p.format === streamingSubTab);
  }
  if (tab === 'irl') return irlProjects;
  return allProjects;
}

export default function Projects() {
  const { language } = useLanguage();
  const t = translations[language];
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [activeTab, setActiveTab] = useState('streaming');
  const [streamingSubTab, setStreamingSubTab] = useState('short');

  const getYouTubeId = (url) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|shorts\/|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const openModal = (project) => {
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

  const filteredProjects = getFilteredProjects(activeTab, streamingSubTab);
  const tabs = TABS[language] || TABS.es;
  const streamingSubTabs = STREAMING_SUBTABS[language] || STREAMING_SUBTABS.es;

  return (
    <section id="projects" className="py-20 md:py-32 px-4 scroll-mt-20">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-12">
          <span className="text-purple-400 text-sm font-semibold tracking-widest uppercase">
            {language === 'es' ? 'Portfolio' : 'Portfolio'}
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mt-3 animate-in slide-in-from-bottom-4 duration-500">
            {t.projects.title}
          </h2>
        </div>

        {/* Filter tabs */}
        <div className="flex justify-center mb-6 animate-in slide-in-from-bottom-4 duration-700">
          <div className="inline-flex gap-1 p-1 bg-gray-900/50 border border-gray-800 rounded-xl">
            {tabs.map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${
                  activeTab === tab.key
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/20'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Streaming sub-tabs */}
        {activeTab === 'streaming' && (
          <div className="flex justify-center mb-12 animate-in slide-in-from-bottom-4 duration-500">
            <div className="inline-flex gap-1 p-1 bg-gray-900/30 border border-gray-800/50 rounded-lg">
              {streamingSubTabs.map(subTab => (
                <button
                  key={subTab.key}
                  onClick={() => setStreamingSubTab(subTab.key)}
                  className={`px-4 py-2 rounded-md text-xs font-medium transition-all duration-300 ${
                    streamingSubTab === subTab.key
                      ? 'bg-purple-500/20 text-purple-200 border border-purple-500/30'
                      : 'text-gray-500 hover:text-gray-300 border border-transparent'
                  }`}
                >
                  {subTab.label}
                </button>
              ))}
            </div>
          </div>
        )}
        {activeTab !== 'streaming' && <div className="mb-6" />}

        {/* Projects grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-14">
          {filteredProjects.map((project) => {
            const isYoutubeThumb = typeof project.image === 'string' && project.image.includes('img.youtube.com');
            const useCover = isYoutubeThumb && project.format === 'short';
            return (
            <div
              key={project.id}
              className="group cursor-pointer animate-in slide-in-from-bottom-4 duration-500"
              onClick={() => openModal(project)}
            >
              <div className="relative rounded-2xl overflow-hidden border border-gray-800/50 hover:border-purple-500/30 bg-[#12121a] transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-500/10">
                {/* Thumbnail container with padding */}
                <div className="p-4 pb-0">
                  <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-gray-800">
                    {!useCover && (
                      <img
                        src={project.image}
                        alt=""
                        aria-hidden="true"
                        className="absolute inset-0 w-full h-full object-cover blur-2xl scale-110 opacity-60"
                      />
                    )}
                    <img
                      src={project.image}
                      alt={typeof project.title === 'object' ? project.title[language] || project.title['es'] : project.title}
                      className={`relative w-full h-full ${useCover ? 'object-cover' : 'object-contain'} transition-transform duration-500 group-hover:scale-105`}
                    />
                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="w-14 h-14 rounded-full bg-purple-600/90 flex items-center justify-center backdrop-blur-sm transform scale-75 group-hover:scale-100 transition-transform duration-300">
                        <Play size={24} className="text-white ml-1" fill="white" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Info with separator */}
                <div className="p-6 pt-5">
                  <div className="h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent mb-5" />
                  <h3 className="font-bold text-lg mb-3 bg-gradient-to-r from-white via-purple-100 to-purple-300 bg-clip-text text-transparent group-hover:from-purple-200 group-hover:via-purple-300 group-hover:to-violet-400 transition-all duration-300">
                    {typeof project.title === 'object' ? project.title[language] || project.title['es'] : project.title}
                  </h3>
                  {project.category && (
                    <div className="mb-5">
                      <span className="inline-block px-2.5 py-0.5 rounded-md text-xs font-semibold bg-gradient-to-r from-purple-500/20 to-violet-500/20 text-purple-200 border border-purple-500/30">
                        {typeof project.category === 'object' ? project.category[language] || project.category['es'] : project.category}
                      </span>
                    </div>
                  )}

                  {/* Clip info link */}
                  {project.clipInfo && (
                    project.clipLink ? (
                      <a
                        href={project.clipLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1.5 text-purple-400 hover:text-purple-300 text-xs font-medium mb-5 transition-colors duration-200"
                      >
                        {typeof project.clipInfo === 'object' ? project.clipInfo[language] || project.clipInfo['es'] : project.clipInfo}
                        <ExternalLink size={12} />
                      </a>
                    ) : (
                      <p className="text-gray-500 text-xs mb-5">
                        {typeof project.clipInfo === 'object' ? project.clipInfo[language] || project.clipInfo['es'] : project.clipInfo}
                      </p>
                    )
                  )}

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.tags.filter(tag => {
                      if (language === 'es') {
                        return ['Manualidad', 'Arte', 'Artesania', 'Trabajo', 'League of Legends', 'Humor', 'Anecdota', 'Streaming'].includes(tag);
                      }
                      return ['Craft', 'Art', 'Handicraft', 'Work', 'Humor', 'Streaming'].includes(tag);
                    }).map((tag, i) => (
                      <span key={i} className="px-2.5 py-1 bg-purple-500/10 text-purple-300 rounded-md text-xs font-medium border border-purple-500/10">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
          })}
        </div>
      </div>

      {/* Video Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={closeModal}>
          <div className="relative w-full max-w-4xl mx-auto" onClick={e => e.stopPropagation()}>
            <button
              onClick={closeModal}
              className="absolute -top-12 right-0 text-gray-400 hover:text-white transition-colors p-2"
              aria-label="Cerrar video"
            >
              <X size={24} />
            </button>

            <div className="relative pt-[56.25%] w-full rounded-xl overflow-hidden">
              <iframe
                src={selectedVideo.videoUrl}
                className="absolute top-0 left-0 w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={typeof selectedVideo.title === 'object' ? selectedVideo.title[language] : selectedVideo.title}
                loading="lazy"
              />
            </div>

            <div className="mt-4 text-center">
              <p className="text-white font-semibold text-lg">
                {typeof selectedVideo.title === 'object' ? selectedVideo.title[language] || selectedVideo.title['es'] : selectedVideo.title}
              </p>
              <p className="text-purple-400 text-sm mt-1">
                {typeof selectedVideo.category === 'object' ? selectedVideo.category[language] || selectedVideo.category['es'] : selectedVideo.category}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
