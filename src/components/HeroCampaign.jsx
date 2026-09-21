import React from 'react';

export default function HeroCampaign() {
  return (
    <section className="relative w-full h-screen min-h-[600px] overflow-hidden bg-white">
      {/* Full-Bleed Campaign Visual — Pure Image, No Text Overlay */}
      <a href="#boutique" className="block w-full h-full">
        <img
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2600&auto=format&fit=crop"
          alt="Memoedja Tarombo Campaign"
          className="w-full h-full object-cover object-center"
        />
      </a>

      {/* Subtle Top Gradient for Logo Readability */}
      <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-black/20 to-transparent pointer-events-none" />

      {/* Tiny Dior-Style Bottom Caption */}
      <div className="absolute bottom-0 inset-x-0 text-center pb-6">
        <span className="text-white/90 text-[10px] md:text-[11px] tracking-[0.3em] uppercase font-light drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)]">
          Tarombo Collection • Autumn-Winter 2026
        </span>
      </div>
    </section>
  );
}
