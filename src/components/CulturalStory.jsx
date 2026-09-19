import React from 'react';
import { Quote, Sparkles, Music, Feather, Compass } from 'lucide-react';

export default function CulturalStory() {
  return (
    <section id="tarombo" className="py-28 px-6 bg-[#F7F4EE] border-b border-[#E5DFD3] paper-texture">
      <div className="max-w-6xl mx-auto">
        {/* Curated Exhibition Monograph Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-[10px] tracking-[0.4em] uppercase text-[#874229] font-mono block mb-3">
            ARCHIVAL MONOGRAPH • REF. TRB-2026
          </span>
          <h2 className="font-editorial text-4xl sm:text-5xl md:text-6xl font-light text-[#191716] tracking-tight mb-4">
            Tarombo: Pencarian Jati Diri
          </h2>
          <p className="font-serif italic text-lg text-[#6E645A] max-w-xl mx-auto leading-relaxed">
            "Not bringing back the past. Bringing back the feeling of knowing it."
          </p>
          <div className="w-16 h-[1px] bg-[#874229] mx-auto mt-6" />
        </div>

        {/* 50/50 Editorial Monograph Spread (Bode / Studio Style) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-24">
          {/* Plate 01: Archival Imagery with Museum Caption */}
          <div className="lg:col-span-6">
            <div className="p-4 bg-[#EFEAE1] border border-[#DDD5C7] shadow-sm rounded-none">
              <div className="relative aspect-[4/5] overflow-hidden bg-[#D8CEBF]">
                <img
                  src="https://images.unsplash.com/photo-1516257984-b1b4d707412e?q=80&w=1200&auto=format&fit=crop"
                  alt="Tarombo Heritage Atmosphere"
                  className="w-full h-full object-cover grayscale contrast-115 hover:scale-102 transition-transform duration-1000"
                />
                <div className="absolute top-4 left-4 bg-[#F7F4EE]/90 px-3 py-1 text-[9px] font-mono tracking-widest text-[#191716]">
                  PLATE NO. 01 — SUMATERA UTARA
                </div>
              </div>
              <div className="pt-4 flex items-center justify-between text-[10px] text-[#7A7065] font-mono">
                <span>STUDIO RESEARCH DEPT.</span>
                <span>BATAK CULTURAL LINEAGE</span>
              </div>
            </div>
          </div>

          {/* Plate 01 Narration & Creative Formula */}
          <div className="lg:col-span-6 space-y-8 text-left">
            <div>
              <span className="text-[10px] tracking-[0.25em] uppercase text-[#874229] font-bold block mb-2 font-mono">
                [01] THE ESSENCE OF TAROMBO
              </span>
              <h3 className="font-editorial text-2xl sm:text-3xl font-normal text-[#191716] leading-snug mb-4">
                Silsilah Garis Keturunan sebagai Titik Tolak Eksplorasi
              </h3>
              <p className="text-xs sm:text-sm text-[#5C534A] leading-relaxed font-light">
                Dalam tradisi Batak, Tarombo bukan sekadar silsilah nama, melainkan cara seseorang memahami tempatnya berdiri di antara leluhur dan masa depan. Memoedja meminjam filosofi ini sebagai kompas rancang bangun pakaian: setiap benang dan lipatan denim menyimpan memori perjalanan pemakainya.
              </p>
            </div>

            {/* Bode-style Creative Formula Card */}
            <div className="p-6 bg-[#EFEAE1] border border-[#DDD5C7]">
              <span className="text-[9px] tracking-[0.25em] uppercase text-[#874229] font-bold block mb-2 font-mono">
                THE MEMOEDJA FORMULA
              </span>
              <div className="font-editorial text-xl sm:text-2xl text-[#191716] tracking-wide mb-2 leading-tight">
                Past Language + Present Behavior + Shared Human Habit = <span className="underline decoration-[#874229]">Familiarity</span>
              </div>
              <p className="text-xs text-[#6B6157] leading-relaxed font-light mt-2">
                "Different Generation. Different Way. Same Habit. Same Feeling." Kami mencari hal yang kontras di permukaan, lalu mempertemukannya pada esensi manusiawi yang paling jujur.
              </p>
            </div>
          </div>
        </div>

        {/* Thought Experiments: The Row & Sade Quotes (Aimé Leon Dore Editorial Look) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          <div className="p-8 bg-[#EFEAE1] border border-[#DDD5C7] relative flex flex-col justify-between">
            <Quote className="text-[#874229]/20 absolute top-6 right-6" size={42} />
            <div>
              <span className="text-[9px] tracking-[0.3em] uppercase text-[#7A7065] font-mono block mb-3">
                THESIS REF. A
              </span>
              <h4 className="font-editorial text-2xl sm:text-3xl text-[#191716] font-normal leading-snug mb-4">
                "What if The Row was born in Indonesia, or Ralph Lauren was seen through an Indonesian lens?"
              </h4>
              <p className="text-xs text-[#5C534A] leading-relaxed font-light">
                Bukan dengan menjadikan kain adat sebagai kostum pesta yang kaku, melainkan mengadopsi ketahanan serat alam, ketepatan proporsi tubuh, dan kejujuran konstruksi harian.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-[#DDD5C7] text-[10px] tracking-wider uppercase text-[#7A7065] font-mono">
              PARADIGMA SILUET KONTEMPORER
            </div>
          </div>

          <div className="p-8 bg-[#EFEAE1] border border-[#DDD5C7] relative flex flex-col justify-between">
            <Quote className="text-[#874229]/20 absolute top-6 right-6" size={42} />
            <div>
              <span className="text-[9px] tracking-[0.3em] uppercase text-[#7A7065] font-mono block mb-3">
                THESIS REF. B
              </span>
              <h4 className="font-editorial text-2xl sm:text-3xl text-[#191716] font-normal leading-snug mb-4">
                "What if Sade was born in Indonesia?"
              </h4>
              <p className="text-xs text-[#5C534A] leading-relaxed font-light">
                Sensibilitas yang bersahaja, suara yang berwibawa namun tenang, keanggunan tanpa paksaan, dan daya tarik yang menolak lekang oleh pergantian dekade.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-[#DDD5C7] text-[10px] tracking-wider uppercase text-[#7A7065] font-mono">
              ESTETIKA TIMELESS & BERSAHAJA
            </div>
          </div>
        </div>

        {/* Cultural Validation Strip */}
        <div className="p-6 sm:p-8 bg-[#202D3A] text-[#F7F4EE] rounded-none flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-left">
            <div className="flex items-center gap-2 text-[9px] tracking-[0.3em] uppercase text-[#CBB597] font-mono">
              <Music size={13} />
              <span>MODERN NOSTALGIA AS A SHARED DIALECT</span>
            </div>
            <h4 className="font-editorial text-2xl text-white font-normal">
              Pergeseran Selera Musik & Visual Lokal
            </h4>
            <p className="text-xs text-[#BFCCD9] max-w-2xl font-light leading-relaxed">
              Sebagaimana karya Maliq & D'Essentials, Adikara, Bernadya, dan Wijaya 80 merajut kembali memori hangat masa lalu ke dalam nada modern, Memoedja menerjemahkan rasa nostalgia yang sama ke dalam lemari pakaian Anda.
            </p>
          </div>

          <div className="flex-shrink-0">
            <a
              href="#savoir-faire"
              className="inline-block bg-[#CBB597] hover:bg-[#B8A284] text-[#191716] text-[10px] tracking-[0.25em] uppercase font-bold py-3 px-6 transition-colors shadow-sm"
            >
              EXPLORE SAVOIR-FAIRE →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
