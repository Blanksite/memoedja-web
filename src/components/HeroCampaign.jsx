import React from 'react';
import { ArrowDown, Sparkles, Compass } from 'lucide-react';

export default function HeroCampaign({ onExploreClick }) {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 px-6 overflow-hidden bg-[#FAF8F5]">
      {/* Background Graphic Watermark / Subtle Nusantara Geometric Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[radial-gradient(#121212_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
        {/* Left Column: Haute Editorial Typography */}
        <div className="lg:col-span-6 flex flex-col justify-center text-left order-2 lg:order-1 pt-4 lg:pt-0">
          <div className="inline-flex items-center gap-2 text-[10px] md:text-[11px] tracking-[0.3em] uppercase text-[#8C4A32] font-semibold mb-4 bg-[#F2EDE4] py-1 px-3 rounded-full border border-[#E0D8CB] self-start">
            <Sparkles size={12} />
            <span>DROP 01 • PROLOGUE: TAROMBO</span>
          </div>

          <h2 className="font-editorial text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-light text-[#121212] tracking-tight leading-[1.08] mb-6">
            Built from Indonesian culture. <br />
            <span className="italic font-normal text-[#4A443D]">
              Designed for the generation living now.
            </span>
          </h2>

          <p className="text-sm md:text-base text-[#575048] font-light leading-relaxed max-w-xl mb-8">
            Indonesia memiliki ribuan cerita. Memoedja meredefinisi warisan Nusantara menjadi <em>everyday garments</em> berkonstruksi matang—tanpa menjadikan budaya sekadar kostum atau ornamen harfiah.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <a
              href="#tarombo"
              className="inline-flex items-center justify-center gap-3 bg-[#121212] hover:bg-[#8C4A32] text-white text-[11px] tracking-[0.25em] uppercase font-semibold py-4 px-8 transition-all duration-300 shadow-md group"
            >
              <span>EXPLORE TAROMBO</span>
              <span className="transform group-hover:translate-x-1 transition-transform">→</span>
            </a>

            <a
              href="#savoir-faire"
              className="inline-flex items-center justify-center gap-2 border border-[#121212] hover:bg-[#121212] hover:text-white text-[#121212] text-[11px] tracking-[0.25em] uppercase font-semibold py-4 px-8 transition-all duration-300"
            >
              <Compass size={14} />
              <span>SAVOIR-FAIRE</span>
            </a>
          </div>

          {/* Editorial Specs Bar */}
          <div className="grid grid-cols-3 gap-6 pt-10 mt-10 border-t border-[#E5DFD5]">
            <div>
              <span className="block text-[9px] tracking-[0.2em] uppercase text-[#857C72]">
                ORIGIN INSPIRATION
              </span>
              <span className="font-editorial text-lg md:text-xl text-[#1A1A1A] font-medium">
                Batak, North Sumatra
              </span>
            </div>
            <div>
              <span className="block text-[9px] tracking-[0.2em] uppercase text-[#857C72]">
                TEXTILE WEFT
              </span>
              <span className="font-editorial text-lg md:text-xl text-[#1A1A1A] font-medium">
                13 - 15 Oz Selvedge
              </span>
            </div>
            <div>
              <span className="block text-[9px] tracking-[0.2em] uppercase text-[#857C72]">
                AESTHETIC LENS
              </span>
              <span className="font-editorial text-lg md:text-xl text-[#1A1A1A] font-medium">
                Quiet Contemporary
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Dramatic High-Fashion Lookbook Visuals (Dior Campaign Stance) */}
        <div className="lg:col-span-6 relative order-1 lg:order-2">
          <div className="relative mx-auto max-w-md lg:max-w-none">
            {/* Main Editorial Campaign Image */}
            <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-[#EAE5DD] shadow-xl group">
              <img
                src="https://images.unsplash.com/photo-1542272604-780c96856592?q=80&w=1200&auto=format&fit=crop"
                alt="Memoedja Tarombo Campaign Stills"
                className="w-full h-full object-cover object-center transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10 pointer-events-none" />

              {/* Float Tagline Pill */}
              <div className="absolute bottom-6 left-6 right-6 text-white flex items-end justify-between">
                <div>
                  <span className="text-[10px] tracking-[0.25em] uppercase text-[#E8E2D8]/80 block">
                    LOOKBOOK DROP 01
                  </span>
                  <h3 className="font-editorial text-2xl font-light tracking-wide">
                    Tarombo: The Search of Identity
                  </h3>
                </div>
                <span className="text-[10px] tracking-[0.2em] uppercase border border-white/40 px-2.5 py-1 backdrop-blur-sm">
                  13 OZ SELVEDGE
                </span>
              </div>
            </div>

            {/* Secondary Floating Floating Atelier Detail Card */}
            <div className="hidden sm:block absolute -bottom-6 -left-8 bg-[#FAF8F5] p-4 shadow-xl border border-[#E2DBD0] rounded-sm max-w-[210px] animate-fade-in">
              <span className="text-[9px] tracking-[0.2em] uppercase text-[#8C4A32] font-bold block mb-1">
                GARMENT HONESTY
              </span>
              <p className="text-xs text-[#2E2E2E] leading-tight font-serif italic">
                "Not bringing back the past. Bringing back the feeling of knowing it."
              </p>
              <span className="text-[8px] tracking-[0.3em] uppercase text-[#857C72] block mt-2">
                MEMOEDJA STUDIO
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Scroll Indicator */}
      <a
        href="#tarombo"
        className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[#857C72] hover:text-[#121212] transition-colors p-2 flex flex-col items-center gap-1 group"
        aria-label="Scroll to Tarombo"
      >
        <span className="text-[9px] tracking-[0.25em] uppercase">DISCOVER</span>
        <ArrowDown size={14} className="animate-bounce" />
      </a>
    </section>
  );
}
