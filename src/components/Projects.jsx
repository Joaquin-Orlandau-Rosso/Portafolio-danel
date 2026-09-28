import React, { useState, useRef, useEffect } from 'react';
import { Play, X, ExternalLink, Radio, Clapperboard, ArrowRight, ArrowLeft } from 'lucide-react';
import { streamingProjects, professionalProjects, irlProjects } from '../data/projects';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../languages/translations';
import Reveal from './Reveal';
import SectionHeader from './SectionHeader';

const socialCount = streamingProjects.length + irlProjects.length;
const professionalCount = professionalProjects.length;

const TRACKS = {
  es: {
    prompt: '¿Qué te gustaría ver?',
    hint: 'Elegí una categoría para ver los trabajos',
    back: 'Volver a elegir',
    watching: 'Estás viendo',
    empty: 'Próximamente',
    emptyHint: 'Todavía no hay trabajos publicados en esta categoría.',
    social: {
      title: 'Redes Sociales',
      desc: 'Streaming, vlogs y creación de contenido',
      bullets: ['Shorts', 'Videos de YouTube', 'Vlogs'],
      count: `${socialCount} trabajos`,
      cta: 'Ver trabajos',
    },
    professional: {
      title: 'Profesional',
      desc: 'Cortometraje, cine y spot publicitario',
      bullets: ['Cortometraje', 'Cine', 'Spot publicitario'],
      count: `${professionalCount} trabajos`,
      cta: 'Ver trabajos',
    },
  },
  en: {
    prompt: 'What would you like to see?',
    hint: 'Pick a category to see the work',
    back: 'Choose again',
    watching: "You're viewing",
    empty: 'Coming soon',
    emptyHint: 'No work published in this category yet.',
    social: {
      title: 'Social Media',
      desc: 'Streaming, vlogs and content creation',
      bullets: ['Shorts', 'YouTube Videos', 'Vlogs'],
      count: `${socialCount} works`,
      cta: 'View work',
    },
    professional: {
      title: 'Professional',
      desc: 'Short film, cinema and advertising spot',
      bullets: ['Short film', 'Cinema', 'Advertising spot'],
      count: `${professionalCount} works`,
      cta: 'View work',
    },
  },
};

const SOCIAL_SUBTABS = {
  es: [
    { key: 'short', label: 'Shorts' },
    { key: 'video', label: 'Videos YouTube' },
    { key: 'irl', label: 'Vlogs / IRL' },
  ],
  en: [
    { key: 'short', label: 'Shorts' },
    { key: 'video', label: 'YouTube Videos' },
    { key: 'irl', label: 'Vlogs / IRL' },
  ],
};

// Perfil de cada creador: el círculo va arriba de sus propios videos
const CREATORS = {
  danez: {
    handle: '@danez43_44',
    url: 'https://www.instagram.com/danez43_44/',
    avatar: '/images/danez43_44-avatar.jpg',
  },
  sana: {
    handle: '@sana_numachi',
    url: 'https://www.instagram.com/sana_numachi/',
    avatar: '/images/sana_numachi-avatar.jpg',
  },
  zago: {
    handle: '@zago_nor',
    url: 'https://www.instagram.com/zago_nor/',
    avatar: '/images/zago-avatar.jpg',
  },
  fuvu: {
    handle: '@fuvu_vt',
    url: 'https://www.instagram.com/fuvu_vt/',
    avatar: '/images/fuvu_vt-avatar.jpg',
  },
  soymat: {
    handle: '@somossoymat',
    url: 'https://www.instagram.com/somossoymat/',
    avatar: '/images/soymat-avatar.jpg',
  },
};

// Orden en que se muestran los creadores. Los que no figuran acá van después,
// respetando su orden de aparición.
const CREATOR_ORDER = ['zago', 'fuvu', 'sana', 'danez'];

// Agrupa los proyectos por creador, respetando el orden de aparición.
// Los que no tienen creador quedan juntos al final, sin círculo.
function groupByCreator(projects) {
  const grupos = [];
  const porClave = new Map();
  for (const p of projects) {
    const clave = p.creator || '__sin_creador__';
    if (!porClave.has(clave)) {
      const grupo = { key: clave, creator: CREATORS[p.creator] || null, projects: [] };
      porClave.set(clave, grupo);
      grupos.push(grupo);
    }
    porClave.get(clave).projects.push(p);
  }
  // Los sin creador siempre al final; el resto sigue CREATOR_ORDER
  const rango = grupo => {
    if (grupo.key === '__sin_creador__') return Infinity;
    const i = CREATOR_ORDER.indexOf(grupo.key);
    return i === -1 ? CREATOR_ORDER.length : i;
  };
  return grupos
    .map((grupo, i) => ({ grupo, i }))
    .sort((a, b) => rango(a.grupo) - rango(b.grupo) || a.i - b.i)
    .map(({ grupo }) => grupo);
}

const PRO_SUBTABS = {
  es: [
    { key: 'cine', label: 'Cine' },
    { key: 'spot', label: 'Spot publicitario' },
  ],
  en: [
    { key: 'cine', label: 'Cinema' },
    { key: 'spot', label: 'Advertising Spot' },
  ],
};

function getFilteredProjects(track, socialSubTab, proSubTab) {
  if (track === 'professional') {
    return professionalProjects.filter(p => p.format === proSubTab);
  }
  if (track === 'social') {
    if (socialSubTab === 'irl') return irlProjects;
    return streamingProjects.filter(p => p.format === socialSubTab);
  }
  return [];
}

export default function Projects() {
  const { language } = useLanguage();
  const t = translations[language];
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [track, setTrack] = useState(null);
  const [socialSubTab, setSocialSubTab] = useState('short');
  const [proSubTab, setProSubTab] = useState('cine');
  const sectionRef = useRef(null);

  const getYouTubeId = (url) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|shorts\/|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const getInstagramId = (url) => {
    if (!url) return null;
    const match = url.match(/instagram\.com\/(?:p|reel|tv)\/([^/?#]+)/);
    return match ? match[1] : null;
  };

  const openModal = (project) => {
    // Contenido que la plataforma no deja insertar: se abre en su sitio
    if (project.openExternal) {
      window.open(project.video, '_blank', 'noopener,noreferrer');
      return;
    }
    if (project.videoFile) {
      project.videoUrl = project.videoFile;
    } else if (project.isYoutube) {
      const videoId = getYouTubeId(project.video);
      project.videoUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    } else if (project.isInstagram) {
      const shortcode = getInstagramId(project.video);
      project.videoUrl = `https://www.instagram.com/reel/${shortcode}/embed/`;
    }
    setSelectedVideo(project);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedVideo(null);
    document.body.style.overflow = 'auto';
  };

  // Cerrar el modal con Escape
  useEffect(() => {
    if (!selectedVideo) return;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') closeModal();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [selectedVideo]);

  const filteredProjects = getFilteredProjects(track, socialSubTab, proSubTab);
  const copy = TRACKS[language] || TRACKS.es;
  const socialSubTabs = SOCIAL_SUBTABS[language] || SOCIAL_SUBTABS.es;
  const proSubTabs = PRO_SUBTABS[language] || PRO_SUBTABS.es;
  const groups = groupByCreator(filteredProjects);

  // Reposiciona la vista en el encabezado para que el contenido no aparezca
  // justo debajo del cursor/dedo al cambiar el layout
  const scrollToSection = () => {
    requestAnimationFrame(() => {
      sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  };

  const chooseTrack = (key) => {
    setTrack(key);
    if (key === 'social') setSocialSubTab('short');
    if (key === 'professional') setProSubTab('cine');
    scrollToSection();
  };

  const resetTrack = () => {
    setTrack(null);
    scrollToSection();
  };

  const trackCard = (key, Icon) => {
    const c = copy[key];
    const isSocial = key === 'social';
    return (
      <button
        type="button"
        onClick={() => chooseTrack(key)}
        className={`group relative text-left rounded-2xl border bg-[#12121a] p-7 md:p-8 overflow-hidden transition-all duration-300 hover:-translate-y-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/60 ${
          isSocial
            ? 'border-gray-800/60 hover:border-purple-500/40 hover:shadow-2xl hover:shadow-purple-500/10'
            : 'border-gray-800/60 hover:border-violet-400/40 hover:shadow-2xl hover:shadow-violet-500/10'
        }`}
      >
        {/* Glow */}
        <div
          className={`pointer-events-none absolute -top-24 -right-16 w-56 h-56 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
            isSocial ? 'bg-purple-600/20' : 'bg-violet-500/20'
          }`}
        />

        <div className="relative">
          <div
            className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 border transition-all duration-300 ${
              isSocial
                ? 'bg-purple-500/10 border-purple-500/25 text-purple-300 group-hover:bg-purple-500/20'
                : 'bg-violet-500/10 border-violet-400/25 text-violet-200 group-hover:bg-violet-500/20'
            }`}
          >
            <Icon size={26} />
          </div>

          <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-white via-purple-100 to-purple-300 bg-clip-text text-transparent">
            {c.title}
          </h3>
          <p className="text-gray-400 text-sm leading-relaxed mb-6">{c.desc}</p>

          <div className="flex flex-wrap gap-2 mb-7">
            {c.bullets.map((b, i) => (
              <span
                key={i}
                className={`px-2.5 py-1 rounded-md text-xs font-medium border ${
                  isSocial
                    ? 'bg-purple-500/10 text-purple-300 border-purple-500/15'
                    : 'bg-violet-500/10 text-violet-200 border-violet-400/15'
                }`}
              >
                {b}
              </span>
            ))}
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent mb-5" />

          <div className="flex items-center justify-between">
            <span className="text-gray-500 text-xs">{c.count}</span>
            <span
              className={`inline-flex items-center gap-2 text-sm font-semibold transition-colors duration-300 ${
                isSocial ? 'text-purple-300 group-hover:text-purple-200' : 'text-violet-200 group-hover:text-violet-100'
              }`}
            >
              {c.cta}
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </div>
        </div>
      </button>
    );
  };

  return (
    <section ref={sectionRef} id="projects" className="py-20 md:py-32 px-4 scroll-mt-20">
      <div className="max-w-6xl mx-auto">
        <SectionHeader eyebrow="Portfolio" title={t.projects.title} className="mb-12" />

        {/* Step 1: category chooser */}
        {!track && (
          <Reveal>
            <div className="text-center mb-10">
              <p className="text-xl md:text-2xl font-semibold text-white">{copy.prompt}</p>
              <p className="text-gray-500 text-sm mt-2">{copy.hint}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {trackCard('social', Radio)}
              {trackCard('professional', Clapperboard)}
            </div>
          </Reveal>
        )}

        {/* Step 2: selected category */}
        {track && (
          <div className="animate-in slide-in-from-bottom-4 duration-500">
            {/* Back + switch bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
              {/* Borde degradado: el padding de 1px deja ver el fondo del botón */}
              <button
                type="button"
                onClick={resetTrack}
                className="group relative inline-flex rounded-full p-px bg-gradient-to-r from-purple-500 via-violet-500 to-fuchsia-500 shadow-lg shadow-purple-500/10 transition-all duration-300 hover:shadow-purple-500/30 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/60"
              >
                <span className="relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-[#1c1030] via-[#14121c] to-[#241030] px-5 py-2.5 text-sm font-semibold">
                  {/* Brillo al pasar el mouse (los degradados no se animan, la opacidad sí) */}
                  <span className="absolute inset-0 bg-gradient-to-r from-purple-600/40 via-violet-600/20 to-fuchsia-600/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <ArrowLeft size={16} className="relative text-purple-300 transition-transform duration-300 group-hover:-translate-x-1" />
                  <span className="relative bg-gradient-to-r from-white via-purple-100 to-fuchsia-200 bg-clip-text text-transparent">
                    {copy.back}
                  </span>
                </span>
              </button>

              <div className="inline-flex gap-1 p-1 bg-gray-900/50 border border-gray-800 rounded-xl">
                {['social', 'professional'].map(key => (
                  <button
                    key={key}
                    onClick={() => chooseTrack(key)}
                    className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${
                      track === key
                        ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/20'
                        : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                    }`}
                  >
                    {copy[key].title}
                  </button>
                ))}
              </div>
            </div>

            {/* Social sub-tabs */}
            {track === 'social' ? (
              <div className="flex justify-center mb-12">
                <div className="inline-flex flex-wrap justify-center gap-1 p-1 bg-gray-900/30 border border-gray-800/50 rounded-lg">
                  {socialSubTabs.map(subTab => (
                    <button
                      key={subTab.key}
                      onClick={() => setSocialSubTab(subTab.key)}
                      className={`px-4 py-2 rounded-md text-xs font-medium transition-all duration-300 ${
                        socialSubTab === subTab.key
                          ? 'bg-purple-500/20 text-purple-200 border border-purple-500/30'
                          : 'text-gray-500 hover:text-gray-300 border border-transparent'
                      }`}
                    >
                      {subTab.label}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              /* Professional sub-tabs */
              <div className="flex justify-center mb-12">
                <div className="inline-flex flex-wrap justify-center gap-2 p-1.5 bg-gray-900/40 border border-gray-800/60 rounded-xl">
                  {proSubTabs.map(subTab => (
                    <button
                      key={subTab.key}
                      onClick={() => setProSubTab(subTab.key)}
                      className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 ${
                        proSubTab === subTab.key
                          ? 'bg-gradient-to-r from-purple-600 to-violet-600 text-white shadow-lg shadow-purple-500/25'
                          : 'text-gray-400 hover:text-white hover:bg-gray-800/60'
                      }`}
                    >
                      {subTab.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Empty state */}
            {filteredProjects.length === 0 && (
              <div className="max-w-md mx-auto text-center rounded-2xl border border-dashed border-gray-800 bg-[#12121a]/60 px-8 py-14">
                <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-300 flex items-center justify-center mx-auto mb-5">
                  <Clapperboard size={22} />
                </div>
                <p className="text-white font-semibold text-lg">{copy.empty}</p>
                <p className="text-gray-500 text-sm mt-2">{copy.emptyHint}</p>
              </div>
            )}

            {/* Un bloque por creador: su círculo y debajo sus videos */}
            {groups.map((grupo, gi) => (
            <div key={grupo.key} className={gi > 0 ? 'mt-24' : ''}>

              {/* Círculo del perfil */}
              {grupo.creator && (
                <Reveal variant="scale" className="flex justify-center mb-10">
                  <a
                    href={grupo.creator.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex flex-col items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/60 rounded-2xl px-4 py-2"
                  >
                    <span className="relative block">
                      {/* Anillo estilo Instagram */}
                      <span className="absolute -inset-[3px] rounded-full bg-[conic-gradient(at_bottom_left,#f9ce34,#ee2a7b,#6228d7,#f9ce34)] opacity-90 group-hover:opacity-100 transition-opacity duration-300" />
                      <span className="absolute -inset-[3px] rounded-full bg-[conic-gradient(at_bottom_left,#f9ce34,#ee2a7b,#6228d7,#f9ce34)] opacity-0 group-hover:opacity-60 blur-md transition-opacity duration-300" />
                      <img
                        src={grupo.creator.avatar}
                        alt={grupo.creator.handle}
                        className="relative w-24 h-24 rounded-full object-cover border-[3px] border-[#0a0a0f] transition-transform duration-300 group-hover:scale-105"
                      />
                    </span>
                    <span className="text-center">
                      <span className="block text-white font-semibold text-sm">{grupo.creator.handle}</span>
                      <span className="inline-flex items-center gap-1.5 text-purple-400 group-hover:text-purple-300 text-xs font-medium mt-1 transition-colors duration-200">
                        {language === 'es' ? 'Ver perfil en Instagram' : 'View profile on Instagram'}
                        <ExternalLink size={12} />
                      </span>
                    </span>
                  </a>
                </Reveal>
              )}

              {/* Sus videos. Cada tarjeta ocupa 4 filas del grid (miniatura,
                  titulo, etiqueta, pie) y las comparte con las de al lado
                  mediante subgrid: la fila del titulo mide lo que el titulo
                  mas largo, asi la etiqueta y el link quedan a la par en toda
                  la fila aunque un titulo ocupe una linea y otro tres. La
                  separacion entre filas de tarjetas va como margen (mb-14) y
                  no como gap, porque el gap se meteria tambien entre las 4
                  filas internas de cada tarjeta; el -mb-14 del grid descuenta
                  el de la ultima fila. */}
              <div
                className={`grid grid-cols-1 sm:grid-cols-2 gap-x-12 -mb-14 ${
                  grupo.projects.length <= 2 ? 'max-w-3xl mx-auto' : 'lg:grid-cols-3'
                }`}
              >
              {grupo.projects.map((project, index) => {
                const isYoutubeThumb = typeof project.image === 'string' && project.image.includes('img.youtube.com');
                const useCover = isYoutubeThumb && project.format === 'short';
                return (
                // Escalonado por columna: cada fila de 3 entra de izquierda a derecha
                <Reveal
                  key={`${track}-${project.id}`}
                  delay={(index % 3) * 90}
                  className="group cursor-pointer row-span-4 grid grid-rows-subgrid gap-y-0 mb-14"
                  onClick={() => openModal(project)}
                >
                  <div className="relative row-span-4 grid grid-rows-subgrid gap-y-0 rounded-2xl overflow-hidden border border-gray-800/50 hover:border-purple-500/30 bg-[#12121a] transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-500/10">
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
                            {project.openExternal
                              ? <ExternalLink size={22} className="text-white" />
                              : <Play size={24} className="text-white ml-1" fill="white" />}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Fila 2: separador + titulo */}
                    <div className="px-6 pt-5">
                      <div className="h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent mb-5" />
                      <h3 className="font-bold text-lg mb-3 bg-gradient-to-r from-white via-purple-100 to-purple-300 bg-clip-text text-transparent group-hover:from-purple-200 group-hover:via-purple-300 group-hover:to-violet-400 transition-all duration-300">
                        {typeof project.title === 'object' ? project.title[language] || project.title['es'] : project.title}
                      </h3>
                    </div>

                    {/* Fila 3: etiqueta. El div va siempre, aunque no haya
                        etiqueta, para que la tarjeta tenga sus 4 filas. */}
                    <div className="px-6">
                      {project.category && (
                        <div className="mb-5">
                          <span className="inline-block px-2.5 py-0.5 rounded-md text-xs font-semibold bg-gradient-to-r from-purple-500/20 to-violet-500/20 text-purple-200 border border-purple-500/30">
                            {typeof project.category === 'object' ? project.category[language] || project.category['es'] : project.category}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Fila 4, el pie: tags y, como ultimo renglon, el link al
                        video. Va pegado al fondo (self-end) y el link es lo
                        ultimo a proposito: asi queda a la par aunque las tags
                        de otra tarjeta ocupen dos renglones. */}
                    <div className="px-6 pb-6 self-end">
                      {/* Tags */}
                      <div className="flex flex-wrap gap-2">
                        {project.tags.filter(tag => {
                          const esTags = ['Manualidad', 'Arte', 'Artesania', 'Trabajo', 'League of Legends', 'Humor', 'Anecdota', 'Streaming', 'Edicion simple', 'Edicion compleja'];
                          const enTags = ['Craft', 'Art', 'Handicraft', 'Work', 'League of Legends', 'Humor', 'Streaming', 'Simple Editing', 'Complex Editing'];
                          // Tags personalizados (no traducidos) se muestran siempre
                          if (!esTags.includes(tag) && !enTags.includes(tag)) return true;
                          return (language === 'es' ? esTags : enTags).includes(tag);
                        }).map((tag, i) => (
                          <span key={i} className="px-2.5 py-1 bg-purple-500/10 text-purple-300 rounded-md text-xs font-medium border border-purple-500/10">
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Clip info link */}
                      {project.clipInfo && (
                        project.clipLink ? (
                          <a
                            href={project.clipLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="flex w-fit items-center gap-1.5 text-purple-400 hover:text-purple-300 text-xs font-medium mt-4 transition-colors duration-200"
                          >
                            {typeof project.clipInfo === 'object' ? project.clipInfo[language] || project.clipInfo['es'] : project.clipInfo}
                            <ExternalLink size={12} />
                          </a>
                        ) : (
                          <p className="text-gray-500 text-xs mt-4">
                            {typeof project.clipInfo === 'object' ? project.clipInfo[language] || project.clipInfo['es'] : project.clipInfo}
                          </p>
                        )
                      )}
                    </div>
                  </div>
                </Reveal>
              );
              })}
              </div>
            </div>
            ))}
          </div>
        )}
      </div>

      {/* Video Modal */}
      {selectedVideo && (
        <div className="modal-backdrop fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={closeModal}>
          <div className={`modal-panel relative w-full mx-auto ${selectedVideo.isInstagram || selectedVideo.videoFile ? 'max-w-[400px]' : 'max-w-4xl'}`} onClick={e => e.stopPropagation()}>
            <button
              onClick={closeModal}
              className="absolute -top-12 right-0 text-gray-400 hover:text-white transition-colors p-2"
              aria-label="Cerrar video"
            >
              <X size={24} />
            </button>

            {selectedVideo.videoFile ? (
              <div className="relative w-full rounded-xl overflow-hidden bg-black" style={{ maxHeight: '80vh' }}>
                <video
                  src={selectedVideo.videoUrl}
                  poster={selectedVideo.image}
                  controls
                  autoPlay
                  playsInline
                  preload="metadata"
                  className="w-full h-auto max-h-[80vh] mx-auto"
                >
                  {language === 'es'
                    ? 'Tu navegador no puede reproducir este video.'
                    : 'Your browser cannot play this video.'}
                </video>
              </div>
            ) : selectedVideo.isInstagram ? (
              <div className="relative w-full rounded-xl overflow-hidden bg-white" style={{ height: '80vh' }}>
                <iframe
                  src={selectedVideo.videoUrl}
                  className="absolute top-0 left-0 w-full h-full"
                  frameBorder="0"
                  scrolling="no"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={typeof selectedVideo.title === 'object' ? selectedVideo.title[language] : selectedVideo.title}
                  loading="lazy"
                />
              </div>
            ) : (
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
            )}

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
