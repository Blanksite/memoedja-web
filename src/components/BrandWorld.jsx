import React, { useEffect, useRef, useState } from 'react';
import { BRAND_PILLARS } from '../data/products';

/*
 * BrandWorld — Minimalist brand philosophy + founding team
 * 
 * Clean, restrained. Not a storytelling dump — just enough
 * to communicate the brand's values and the people behind it.
 */

function useFadeIn(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return [ref, visible];
}

const TEAM = [
  { name: 'Ken Koesumo', role: 'Creative Director', initial: 'KK' },
  { name: 'Farra Meilia', role: 'Designer', initial: 'FM' },
  { name: 'Gustaviano Victor', role: 'COO', initial: 'GV' },
  { name: 'Aristo Rafif', role: 'CFO', initial: 'AR' },
  { name: 'Kevin Jagar', role: 'CMO', initial: 'KJ' },
];

export default function BrandWorld() {
  const [refPillars, pillarsVisible] = useFadeIn(0.2);
  const [refTeam, teamVisible] = useFadeIn(0.2);

  return (
    <section id="philosophy" className="bg-[#FFFFFF] py-24 md:py-32 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">

        {/* ── Section Title ── */}
        <div className="text-center mb-20">
          <span className="text-[9px] tracking-[0.4em] uppercase text-[#999999] font-sans block mb-4">
            Our World
          </span>
          <h2 className="font-serif italic text-2xl md:text-3xl font-light text-[#1A1A1A] tracking-wide">
            Craftsmanship over ornamentation
          </h2>
          <div className="mt-6 mx-auto w-10 h-px bg-[#D0D0D0]" />
        </div>

        {/* ── Three Pillars — Minimal Grid ── */}
        <div
          ref={refPillars}
          className={`grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 mb-24 transition-all duration-[1200ms] ease-out ${
            pillarsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {BRAND_PILLARS.map((pillar) => (
            <div key={pillar.number} className="text-center">
              <span className="text-[10px] tracking-[0.3em] uppercase text-[#BBBBBB] font-mono block mb-3">
                {pillar.number}
              </span>
              <h3 className="font-serif text-lg md:text-xl font-light text-[#1A1A1A] tracking-wide mb-2">
                {pillar.title}
              </h3>
              <p className="text-[12px] text-[#777777] leading-relaxed font-light max-w-xs mx-auto">
                {pillar.subtitle}
              </p>
            </div>
          ))}
        </div>

        {/* ── Divider ── */}
        <div className="w-full h-px bg-[#EAEAEA] mb-20" />

        {/* ── Founding Team — Row of Initials ── */}
        <div
          ref={refTeam}
          className={`transition-all duration-[1200ms] ease-out ${
            teamVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="text-center mb-12">
            <span className="text-[9px] tracking-[0.4em] uppercase text-[#999999] font-sans">
              Founding Team
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
            {TEAM.map((member) => (
              <div key={member.name} className="text-center group">
                {/* Initial Circle */}
                <div className="w-14 h-14 rounded-full border border-[#D0D0D0] flex items-center justify-center mx-auto mb-3 group-hover:border-black transition-colors duration-300">
                  <span className="text-[13px] font-serif tracking-wider text-[#555555] group-hover:text-black transition-colors">
                    {member.initial}
                  </span>
                </div>
                <p className="text-[11px] font-light text-[#333333] tracking-wide">
                  {member.name}
                </p>
                <p className="text-[9px] text-[#AAAAAA] tracking-[0.2em] uppercase mt-0.5">
                  {member.role}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
