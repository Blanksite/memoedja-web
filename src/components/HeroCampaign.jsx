import React, { useState, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, ArrowDown, Sparkles } from 'lucide-react';

const FILMS = [
  {
    id: "film-01",
    title: "FILM 01: TAROMBO IN MOTION",
    subtitle: "Runway & Contemporary Silhouette",
    src: "https://cdn.coverr.co/videos/coverr-fashion-shoot-with-a-model-in-a-coat-7427/1080p.mp4",
    poster: "https://images.unsplash.com/photo-1542272604-780c96856592?q=80&w=1600&auto=format&fit=crop"
  },
  {
    id: "film-02",
    title: "FILM 02: ATELIER CRAFT & WEFT",
    subtitle: "Shuttle Loom Weaving & Garment Assembly",
    src: "https://cdn.coverr.co/videos/coverr-fashion-model-posing-in-natural-light-8686/1080p.mp4",
    poster: "https://images.unsplash.com/photo-1516257984-b1b4d707412e?q=80&w=1600&auto=format&fit=crop"
  }
];

export default function HeroCampaign() {
  const [currentFilmIndex, setCurrentFilmIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);

  const currentFilm = FILMS[currentFilmIndex];

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const switchFilm = (index) => {
    setCurrentFilmIndex(index);
    setIsPlaying(true);
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(() => {});
    }
  };

  return (
    <section className="relative w-full h-screen min-h-[640px] overflow-hidden bg-[#121212] flex items-center justify-center">
      {/* Background Cinematic Video Loop */}
      <video
        ref={videoRef}
        key={currentFilm.src}
        autoPlay
        loop
        muted={isMuted}
        playsInline
        poster={currentFilm.poster}
        className="absolute inset-0 w-full h-full object-cover opacity-85 transition-opacity duration-1000 scale-[1.02]"
      >
        <source src={currentFilm.src} type="video/mp4" />
      </video>

      {/* Subtle Vignette & Film Noir Gradients */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/50 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.6)_100%)] pointer-events-none" />

      {/* Video Controls (Top Right / Bottom Right) */}
      <div className="absolute top-28 right-6 md:right-12 z-20 flex items-center gap-2">
        <button
          onClick={togglePlay}
          className="bg-black/40 hover:bg-black/70 backdrop-blur-md text-white/90 p-2.5 rounded-full border border-white/20 transition-colors"
          title={isPlaying ? "Pause Film" : "Play Film"}
          aria-label="Toggle Play"
        >
          {isPlaying ? <Pause size={14} /> : <Play size={14} />}
        </button>
        <button
          onClick={toggleMute}
          className="bg-black/40 hover:bg-black/70 backdrop-blur-md text-white/90 p-2.5 rounded-full border border-white/20 transition-colors"
          title={isMuted ? "Unmute Audio" : "Mute Audio"}
          aria-label="Toggle Sound"
        >
          {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
        </button>
      </div>

      {/* Main Editorial Hero Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center text-white flex flex-col items-center justify-center mt-12">
        {/* Archival Badge (Aimé Leon Dore / Bode Stamp) */}
        <div className="inline-flex items-center gap-2 text-[10px] md:text-[11px] tracking-[0.35em] uppercase text-[#EADFCF] font-semibold mb-6 bg-black/40 backdrop-blur-md py-1.5 px-4 rounded-full border border-white/20 shadow-sm">
          <Sparkles size={11} className="text-[#CBB597]" />
          <span>PROLOGUE 01 • BATAK EXPEDITION: TAROMBO</span>
        </div>

        {/* Monogram Brand Header */}
        <h1 className="font-editorial text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-light tracking-[0.18em] uppercase text-[#F9F7F2] drop-shadow-md mb-3 leading-none">
          MEMOEDJA
        </h1>

        <p className="font-serif italic text-lg sm:text-2xl text-[#D8CEBF] max-w-2xl mb-6 font-light">
          "Honor confers a crown"
        </p>

        <p className="text-xs sm:text-sm md:text-base text-[#BFB5A5] font-light max-w-xl leading-relaxed tracking-wide mb-10">
          A contemporary Indonesian fashion & lifestyle brand reinterpreting Nusantara through everyday utility, thoughtful construction, and timeless cultural perspective.
        </p>

        {/* Action Buttons (Quiet Luxury Buttons) */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <a
            href="#tarombo"
            className="w-full sm:w-auto bg-[#F7F4EE] hover:bg-[#EAE4D6] text-[#191716] text-[11px] tracking-[0.25em] uppercase font-semibold py-4 px-10 rounded-none transition-all shadow-lg hover:shadow-xl group"
          >
            <span>EXPLORE TAROMBO</span>
            <span className="ml-2 inline-block transform group-hover:translate-x-1 transition-transform">→</span>
          </a>

          <a
            href="#collection"
            className="w-full sm:w-auto border border-white/50 hover:border-white hover:bg-white/10 backdrop-blur-xs text-white text-[11px] tracking-[0.25em] uppercase font-semibold py-4 px-10 rounded-none transition-all"
          >
            <span>VIEW THE COLLECTION</span>
          </a>
        </div>
      </div>

      {/* Film Switcher Tabs (Bottom Left - Bode / Curated Studio Style) */}
      <div className="absolute bottom-8 left-6 md:left-12 z-20 hidden sm:flex items-center gap-3">
        {FILMS.map((film, idx) => {
          const isActive = currentFilmIndex === idx;
          return (
            <button
              key={film.id}
              onClick={() => switchFilm(idx)}
              className={`text-left p-2.5 rounded-sm backdrop-blur-md transition-all border ${
                isActive
                  ? "bg-black/60 border-[#CBB597] text-white"
                  : "bg-black/30 border-white/15 text-white/60 hover:text-white hover:bg-black/50"
              }`}
            >
              <span className="block text-[9px] tracking-[0.2em] font-mono text-[#CBB597]">
                0{idx + 1} / {film.title}
              </span>
              <span className="block text-[10px] text-white/80 font-serif italic">
                {film.subtitle}
              </span>
            </button>
          );
        })}
      </div>

      {/* Scroll Down Cue */}
      <a
        href="#tarombo"
        className="absolute bottom-8 right-6 md:right-12 z-20 text-white/60 hover:text-white transition-colors flex items-center gap-2"
      >
        <span className="text-[9px] tracking-[0.3em] uppercase">SCROLL</span>
        <ArrowDown size={14} className="animate-bounce" />
      </a>
    </section>
  );
}
