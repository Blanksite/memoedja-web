import React, { useState } from 'react';
import { Quote, Sparkles, Music, BookmarkCheck, Feather } from 'lucide-react';

export default function CulturalStory() {
  const [activeTab, setActiveTab] = useState("concept");

  return (
    <section id="tarombo" className="py-24 px-6 bg-[#F5F2EC] border-t border-b border-[#E8E2D8]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header: Haute Dior Narrative Style */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[10px] tracking-[0.35em] uppercase text-[#8C4A32] font-semibold block mb-3">
            THE PROLOGUE EXHIBITION
          </span>
          <h2 className="font-editorial text-4xl md:text-5xl lg:text-6xl font-light text-[#121212] tracking-tight mb-4">
            Tarombo: Pencarian Jati Diri
          </h2>
          <p className="font-serif italic text-lg text-[#5A524A] leading-relaxed">
            "Not bringing back the past. Bringing back the feeling of knowing it."
          </p>
          <div className="w-12 h-[1px] bg-[#8C4A32] mx-auto mt-6" />
        </div>

        {/* Narrative Interactive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Visual Story Artwork */}
          <div className="lg:col-span-6 space-y-6">
            <div className="relative aspect-[4/5] rounded-sm overflow-hidden bg-[#E2DBD0] shadow-xl group">
              <img
                src="https://images.unsplash.com/photo-1516257984-b1b4d707412e?q=80&w=1200&auto=format&fit=crop"
                alt="Tarombo Heritage Atmosphere"
                className="w-full h-full object-cover grayscale contrast-125 transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="text-[9px] tracking-[0.3em] uppercase text-[#E8E2D8] block mb-1">
                  SUMATERA UTARA — BATAK HERITAGE
                </span>
                <p className="font-editorial text-2xl font-light text-[#FAF8F5]">
                  Silsilah Garis Keturunan & Percakapan Antar Generasi
                </p>
                <p className="text-xs text-[#DDD6CB] mt-2 font-light">
                  Dalam budaya Batak, Tarombo adalah penelusuran asal-usul untuk mengetahui di mana kita berdiri di antara masa lalu dan masa depan.
                </p>
              </div>
            </div>

            {/* Creative Formula Equation Box */}
            <div className="p-6 bg-[#FAF8F5] border border-[#DDD6CB] rounded-sm">
              <span className="text-[9px] tracking-[0.25em] uppercase text-[#8C4A32] font-bold block mb-2">
                THE CREATIVE FORMULA
              </span>
              <div className="font-editorial text-xl md:text-2xl text-[#121212] tracking-wide mb-2">
                Past Language + Present Behavior + Shared Human Habit = <span className="underline decoration-[#8C4A32]">Familiarity</span>
              </div>
              <p className="text-xs text-[#6B635A] leading-relaxed">
                Different Generation. Different Way. Same Habit. Same Feeling. Memoedja menemukan dua hal yang tampak kontras, lalu merajut satu hal manusiawi yang abadi di baliknya.
              </p>
            </div>
          </div>

          {/* Right Column: Thought Thesis & Philosophical Anchors */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            {/* Thought Experiment 1: The Row / Ralph Lauren through Indonesian Lens */}
            <div className="p-8 bg-[#FAF8F5] border border-[#DDD6CB] relative rounded-sm hover:border-[#8C4A32] transition-colors">
              <Quote className="text-[#8C4A32]/20 absolute top-6 right-6" size={40} />
              <span className="text-[10px] tracking-[0.25em] uppercase text-[#857C72] font-semibold block mb-2">
                THOUGHT EXPERIMENT 01
              </span>
              <h3 className="font-editorial text-2xl md:text-3xl text-[#121212] font-light mb-3">
                "What if The Row was born in Indonesia, or Ralph Lauren was seen through an Indonesian lens?"
              </h3>
              <p className="text-xs md:text-sm text-[#575048] leading-relaxed">
                Kemewahan yang tidak berteriak (*quiet luxury*). Bukan dengan menempelkan motif batik raksasa di atas blazer kantor, melainkan meminjam ketelitian jahitan, ketangguhan kain tenun, dan keanggunan proporsi tubuh Nusantara.
              </p>
            </div>

            {/* Thought Experiment 2: Sade in Indonesia */}
            <div className="p-8 bg-[#FAF8F5] border border-[#DDD6CB] relative rounded-sm hover:border-[#8C4A32] transition-colors">
              <Quote className="text-[#8C4A32]/20 absolute top-6 right-6" size={40} />
              <span className="text-[10px] tracking-[0.25em] uppercase text-[#857C72] font-semibold block mb-2">
                THOUGHT EXPERIMENT 02
              </span>
              <h3 className="font-editorial text-2xl md:text-3xl text-[#121212] font-light mb-3">
                "What if Sade was born in Indonesia?"
              </h3>
              <p className="text-xs md:text-sm text-[#575048] leading-relaxed">
                Kharisma yang bersahaja, anggun, tanpa cela, dan senantiasa relevan melintasi puluhan dekade. Suara yang hangat, intim, dan percaya diri tanpa memerlukan validasi kebisingan tren sesaat.
              </p>
            </div>

            {/* Cultural Validation: Modern Nostalgia */}
            <div className="p-6 bg-[#121212] text-[#FAF8F5] rounded-sm">
              <div className="flex items-center gap-2 text-[10px] tracking-[0.25em] uppercase text-[#D4AF37] font-semibold mb-3">
                <Music size={14} />
                <span>CULTURAL VALIDATION</span>
              </div>
              <h4 className="font-editorial text-xl font-light text-white mb-2">
                Modern Nostalgia as a Shared Language
              </h4>
              <p className="text-xs text-[#BBB4AA] leading-relaxed mb-4">
                Gelombang kebangkitan musik lokal (seperti Maliq & D'Essentials, Adikara, Bernadya, Wijaya 80) membuktikan bahwa generasi masa kini mendambakan kehangatan nuansa masa lalu yang dikemas dengan produksi modern. Memoedja mengusulkan bagaimana pergeseran rasa ini diwujudkan dalam pakaian harian.
              </p>
              <div className="flex flex-wrap gap-2 text-[10px] tracking-wider uppercase">
                <span className="bg-[#2A2A2A] text-[#E8E2D8] px-2.5 py-1 rounded">Everyday Utility</span>
                <span className="bg-[#2A2A2A] text-[#E8E2D8] px-2.5 py-1 rounded">Thoughtful Construction</span>
                <span className="bg-[#8C4A32] text-white px-2.5 py-1 rounded">Local Heritage</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
