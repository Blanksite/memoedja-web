import React from 'react';

export default function MaisonStatement() {
  return (
    <section className="bg-[#080808] text-white py-28 md:py-36 px-6 md:px-12 border-y border-white/10">
      <div className="max-w-[1440px] mx-auto">
        <div className="flex items-center justify-between text-[9px] font-mono tracking-[0.35em] text-neutral-500 uppercase mb-12">
          <span>[ 01 / MANIFESTO ]</span>
          <span>[ PERSPECTIVE 2026 ]</span>
        </div>

        {/* Maison AUGE Iconic Massive Lowercase Statement */}
        <div className="space-y-6">
          <p className="text-[10px] font-mono tracking-[0.45em] text-neutral-400 uppercase">
            [ own the heritage ]
          </p>
          <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-tight leading-[1.05] text-white">
            tradition is not a museum piece. <br />
            <span className="italic font-serif text-neutral-400">it breathes in what we wear.</span>
          </h2>
        </div>

        {/* Supporting Dual Column Text */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-16 mt-16 border-t border-white/10 text-xs text-neutral-400 font-light leading-relaxed">
          <div className="md:col-span-4 font-mono text-[9px] tracking-widest uppercase text-neutral-400">
            CREATIVE FORMULA: <br />
            PAST LANGUAGE + CONTEMPORARY FORM
          </div>
          <div className="md:col-span-4 space-y-4">
            <p>
              Tarombo is Batak genealogical memory—an instinct to understand ancestral roots in order to shape the future. Memoedja refuses folkloric costume; instead, we translate cultural pride into heavyweight raw canvas, shuttle-loom selvedge, and architectural discipline.
            </p>
          </div>
          <div className="md:col-span-4 space-y-4">
            <p>
              Each seam, chainstitch, and solid copper rivet is crafted to mature alongside its owner, developing individual fades and character that record daily life like a living family tree.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
