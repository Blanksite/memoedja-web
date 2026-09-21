import React from 'react';
import { Quote } from 'lucide-react';

export default function CulturalStory() {
  return (
    <section id="tarombo" className="py-28 px-6 md:px-12 bg-[#FFFFFF] border-b border-[#EFEFEF]">
      <div className="max-w-7xl mx-auto">
        {/* Editorial Section Header: Pure Dior Haute Style */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <span className="text-[9.5px] tracking-[0.35em] uppercase text-[#777777] font-sans block mb-3">
            THE PROLOGUE EXHIBITION
          </span>
          <h2 className="font-editorial text-4xl sm:text-5xl md:text-6xl font-light text-[#000000] tracking-tight mb-4">
            Tarombo: Pencarian Jati Diri
          </h2>
          <p className="font-serif italic text-base sm:text-lg text-[#555555] max-w-lg mx-auto leading-relaxed">
            "Not bringing back the past. Bringing back the feeling of knowing it."
          </p>
          <div className="w-12 h-[1px] bg-black mx-auto mt-6" />
        </div>

        {/* 50/50 Dior Editorial Spread */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-24">
          {/* Left: Large Crisp Photography */}
          <div className="lg:col-span-6">
            <div className="relative aspect-[4/5] overflow-hidden bg-[#F5F5F5] border border-[#EAEAEA]">
              <img
                src="https://images.unsplash.com/photo-1516257984-b1b4d707412e?q=80&w=1200&auto=format&fit=crop"
                alt="Tarombo Heritage Atmosphere"
                className="w-full h-full object-cover grayscale contrast-110 hover:scale-102 transition-transform duration-1000"
              />
              <div className="absolute top-4 left-4 bg-white/90 px-3 py-1 text-[8.5px] tracking-widest text-black uppercase font-mono">
                PLATE NO. 01 — SUMATERA UTARA
              </div>
            </div>
            <div className="pt-3 flex items-center justify-between text-[9px] text-[#777777] uppercase tracking-wider">
              <span>TAROMBO NARRATIVE</span>
              <span>BATAK CULTURAL PERSPECTIVE</span>
            </div>
          </div>

          {/* Right: Thoughtful Text & Creative Formula */}
          <div className="lg:col-span-6 space-y-8 text-left">
            <div>
              <span className="text-[9.5px] tracking-[0.3em] uppercase text-[#000000] font-semibold block mb-2 font-mono">
                [01] THE ESSENCE
              </span>
              <h3 className="font-editorial text-2xl sm:text-3xl font-light text-[#000000] leading-snug mb-4">
                Silsilah Garis Keturunan sebagai Titik Tolak Eksplorasi
              </h3>
              <p className="text-xs sm:text-sm text-[#444444] leading-relaxed font-light">
                Dalam tradisi Batak, Tarombo bukan sekadar silsilah nama, melainkan cara seseorang memahami posisinya di antara masa lalu dan masa depan. Memoedja mengadopsi filosofi ini ke dalam rancang bangun pakaian: setiap benang dan lipatan denim menyimpan memori perjalanan pemakainya.
              </p>
            </div>

            {/* Creative Formula Minimalist Box */}
            <div className="p-6 bg-[#FAFAFA] border border-[#EAEAEA]">
              <span className="text-[9px] tracking-[0.25em] uppercase text-[#777777] font-semibold block mb-2">
                THE CREATIVE FORMULA
              </span>
              <div className="font-editorial text-xl sm:text-2xl text-[#000000] tracking-wide mb-2 leading-tight">
                Past Language + Present Behavior + Shared Human Habit = <span className="underline decoration-black">Familiarity</span>
              </div>
              <p className="text-xs text-[#555555] leading-relaxed font-light mt-2">
                Different Generation. Different Way. Same Habit. Same Feeling. Menemukan dua hal yang kontras di permukaan, lalu mempertemukannya pada esensi manusiawi yang paling abadi.
              </p>
            </div>
          </div>
        </div>

        {/* Thought Experiments: Dior Minimalist Monochrome Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          <div className="p-8 md:p-10 bg-[#FFFFFF] border border-[#EAEAEA] relative flex flex-col justify-between hover:border-black transition-colors">
            <Quote className="text-black/10 absolute top-6 right-6" size={40} />
            <div>
              <span className="text-[9px] tracking-[0.3em] uppercase text-[#777777] font-mono block mb-3">
                THOUGHT EXPERIMENT 01
              </span>
              <h4 className="font-editorial text-2xl sm:text-3xl text-[#000000] font-light leading-snug mb-4">
                "What if The Row was born in Indonesia, or Ralph Lauren was seen through an Indonesian lens?"
              </h4>
              <p className="text-xs text-[#555555] leading-relaxed font-light">
                Kemewahan yang tidak berteriak (*quiet luxury*). Bukan dengan menempelkan ornamen kain adat secara harfiah, melainkan meminjam ketelitian jahitan, ketahanan serat tenun, dan keanggunan proporsi tubuh Nusantara.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-[#F0F0F0] text-[9.5px] tracking-widest uppercase text-[#777777]">
              PARADIGMA SILUET KONTEMPORER
            </div>
          </div>

          <div className="p-8 md:p-10 bg-[#FFFFFF] border border-[#EAEAEA] relative flex flex-col justify-between hover:border-black transition-colors">
            <Quote className="text-black/10 absolute top-6 right-6" size={40} />
            <div>
              <span className="text-[9px] tracking-[0.3em] uppercase text-[#777777] font-mono block mb-3">
                THOUGHT EXPERIMENT 02
              </span>
              <h4 className="font-editorial text-2xl sm:text-3xl text-[#000000] font-light leading-snug mb-4">
                "What if Sade was born in Indonesia?"
              </h4>
              <p className="text-xs text-[#555555] leading-relaxed font-light">
                Kharisma yang bersahaja, suara yang berwibawa namun intim, keanggunan tanpa paksaan, dan daya tarik yang menolak lekang oleh pergantian zaman.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-[#F0F0F0] text-[9.5px] tracking-widest uppercase text-[#777777]">
              ESTETIKA TIMELESS & BERSAHAJA
            </div>
          </div>
        </div>

        {/* Cultural Shift Banner (Pure White / Black Accent) */}
        <div className="p-8 bg-[#000000] text-white flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-left">
            <span className="text-[9px] tracking-[0.3em] uppercase text-[#AAAAAA] font-mono block">
              CULTURAL SHIFT • MODERN NOSTALGIA
            </span>
            <h4 className="font-editorial text-2xl font-light text-white">
              Pergeseran Selera Musik & Visual Nusantara
            </h4>
            <p className="text-xs text-[#CCCCCC] max-w-2xl font-light leading-relaxed">
              Sebagaimana musisi lokal kontemporer merajut kembali rasa nostalgia menjadi karya modern, Memoedja menerjemahkan gelombang budaya ini ke dalam rancangan pakaian sehari-hari.
            </p>
          </div>

          <div className="flex-shrink-0">
            <a
              href="#savoir-faire"
              className="inline-block bg-white hover:bg-white/90 text-black text-[10px] tracking-[0.25em] uppercase font-normal py-3 px-6 transition-colors"
            >
              EXPLORE SAVOIR-FAIRE →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
