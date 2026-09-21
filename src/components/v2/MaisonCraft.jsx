import React, { useState } from 'react';

const CRAFT_STORIES = [
  {
    id: 'c1',
    num: '01',
    title: 'shuttle loom red-line selvedge',
    subtitle: 'vintage low-tension weaving',
    description:
      'Unlike high-speed modern projectile looms that cut the weft yarn at each edge, our shuttle looms weave a continuous yarn back and forth, creating a naturally clean self-edge reinforced with a red identification thread.',
    image: 'https://images.unsplash.com/photo-1542272604-780c96856592?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: 'c2',
    num: '02',
    title: 'union special chainstitch',
    subtitle: 'traditional 43200g hem mechanics',
    description:
      'Hemmed exclusively on vintage Union Special chainstitch machines. The tension differential between the upper and lower threads produces the coveted diagonal roping effect as the fabric ages with wash and wear.',
    image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: 'c3',
    num: '03',
    title: 'vegetable-tanned cowhide patch',
    subtitle: 'artisanal yogyakarta tanneries',
    description:
      'Natural tree-bark extract tanned leather that begins as pale nude and patinas into a deep cognac honey over years of friction, sunlight, and tropical humidity.',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1200&auto=format&fit=crop'
  }
];

export default function MaisonCraft() {
  const [activeIdx, setActiveIdx] = useState(0);
  const activeItem = CRAFT_STORIES[activeIdx];

  return (
    <section id="craft-v2" className="bg-[#080808] text-white py-28 md:py-36 px-6 md:px-12 border-t border-white/10">
      <div className="max-w-[1440px] mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-12 border-b border-white/10">
          <div>
            <span className="text-[9px] font-mono tracking-[0.4em] text-neutral-400 uppercase block mb-3">
              [ 03 / SAVOIR-FAIRE ]
            </span>
            <h2 className="font-serif italic text-3xl md:text-5xl font-light tracking-tight text-white">
              the architecture of stitching
            </h2>
          </div>
          <div className="mt-4 md:mt-0 font-mono text-[9px] tracking-widest text-neutral-400 uppercase">
            [ ATELIER STANDARDS ]
          </div>
        </div>

        {/* Interactive Craft Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-16 items-center">
          {/* Left Column: Selector list */}
          <div className="lg:col-span-6 space-y-4">
            {CRAFT_STORIES.map((item, idx) => {
              const isActive = idx === activeIdx;
              return (
                <div
                  key={item.id}
                  onClick={() => setActiveIdx(idx)}
                  className={`p-6 md:p-8 cursor-pointer border transition-all duration-500 ${
                    isActive
                      ? 'bg-neutral-900/90 border-white/30'
                      : 'bg-transparent border-white/5 hover:border-white/15 text-neutral-400'
                  }`}
                >
                  <div className="flex items-baseline justify-between mb-2">
                    <span className="font-mono text-[11px] tracking-widest text-neutral-400">
                      [ {item.num} ]
                    </span>
                    <span className="font-mono text-[9px] tracking-widest uppercase text-neutral-400">
                      {item.subtitle}
                    </span>
                  </div>
                  <h3
                    className={`font-serif italic text-xl md:text-2xl font-light mb-3 transition-colors ${
                      isActive ? 'text-white' : 'text-neutral-400'
                    }`}
                  >
                    {item.title}
                  </h3>
                  {isActive && (
                    <p className="font-sans text-xs text-neutral-400 font-light leading-relaxed animate-fade-in">
                      {item.description}
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Column: Visual Frame */}
          <div className="lg:col-span-6">
            <div className="relative aspect-[4/3] md:aspect-[16/11] overflow-hidden rounded-xs bg-neutral-900 border border-white/10">
              <img
                key={activeItem.image}
                src={activeItem.image}
                alt={activeItem.title}
                className="w-full h-full object-cover object-center animate-fade-in transition-transform duration-1000 scale-100 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between font-mono text-[9px] tracking-widest uppercase">
                <span className="text-white/80">{activeItem.title}</span>
                <span className="text-neutral-400">[ ARCHIVE REF: {activeItem.num} ]</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
