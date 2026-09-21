import React from 'react';
import ScrollExpand from '../reactbits/ScrollExpand';

export default function MaisonHero() {
  return (
    <section id="hero-v2" className="relative w-full bg-white">
      {/* React Bits ScrollExpand Component — Pure visual, no text clutter */}
      <div className="relative w-full min-h-screen pt-16">
        <ScrollExpand
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2600&auto=format&fit=crop"
          alt="Memoedja Campaign"
          title="MEMOEDJA"
          scrollHint="SCROLL TO EXPAND"
          startWidth={44}
          startHeight={62}
          startRadius={16}
          endRadius={0}
          mediaZoom={1.2}
          scrollDistance={1.2}
          holdDistance={0.3}
          smoothing={0.12}
          overlayScrim={0.35}
          useWindowScroll={true}
        >
          {/* Subtle bottom caption revealed when expanded */}
          <div className="absolute bottom-8 inset-x-0 text-center">
            <span className="text-white/90 text-[10px] md:text-[11px] tracking-[0.3em] uppercase font-light drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)]">
              Tarombo Collection • 2026
            </span>
          </div>
        </ScrollExpand>
      </div>
    </section>
  );
}
