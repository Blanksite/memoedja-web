import React from 'react';
import { BRAND_PILLARS } from '../data/products';

export default function BrandPhilosophy() {
  const team = [
    {
      name: "Ken Koesumo",
      role: "Creative Director",
      bio: "Brand direction, visual & creative system. Berpengalaman dari brand thesis hingga product architecture.",
      project: "De Arkael & IniLoh Kopi, Gen FM"
    },
    {
      name: "Farra Meilia",
      role: "Fashion Designer",
      bio: "Product design, silhouette, garment development, pattern making & konstruksi pakaian.",
      project: "Fashion Showcase UNJ, IFW 2026 Model Division"
    },
    {
      name: "Gustaviano Victor",
      role: "Chief of Operation",
      bio: "Supply chain discipline, timeline vendor, konveksi & manajemen operasional terstruktur.",
      project: "Parthreecle, RAW Architecture"
    },
    {
      name: "Aristo Rafif",
      role: "Chief of Finance",
      bio: "Financial planning, economics, digital strategy, capital discipline & cross-team UX coordination.",
      project: "Telkomsel PM Intern, BVoice Radio"
    },
    {
      name: "Kevin Jagar",
      role: "Chief of Marketing",
      bio: "Marketing, audience growth, cultural research liaison & DKJ-nominated artist.",
      project: "NUS Museum & Maven Creative Lab"
    }
  ];

  return (
    <section id="philosophy" className="py-28 px-6 md:px-12 bg-[#FFFFFF] border-b border-[#EFEFEF]">
      <div className="max-w-7xl mx-auto">
        {/* Brand Pillars Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <span className="text-[9.5px] tracking-[0.35em] uppercase text-[#777777] font-sans block mb-3">
            BRAND ARCHITECTURE
          </span>
          <h2 className="font-editorial text-4xl sm:text-5xl md:text-6xl font-light text-[#000000] tracking-tight mb-4">
            Fondasi Brand Memoedja
          </h2>
          <p className="text-xs sm:text-sm text-[#555555] font-light max-w-lg mx-auto leading-relaxed">
            Menghubungkan kedalaman kultural Nusantara dengan ritme kehidupan modern melalui tiga pilar fundamental.
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {BRAND_PILLARS.map((pillar) => (
            <div
              key={pillar.number}
              className="p-8 md:p-10 bg-[#FFFFFF] border border-[#EAEAEA] flex flex-col justify-between hover:border-black transition-colors"
            >
              <div>
                <span className="font-mono text-xs text-black font-semibold block mb-3">
                  [{pillar.number}]
                </span>
                <h3 className="font-editorial text-2xl sm:text-3xl font-light text-[#000000] mb-2">
                  {pillar.title}
                </h3>
                <p className="text-xs text-[#666666] italic mb-6 font-serif">
                  {pillar.subtitle}
                </p>

                <ul className="space-y-2.5 border-t border-[#F0F0F0] pt-4">
                  {pillar.points.map((pt, idx) => (
                    <li key={idx} className="text-xs text-[#444444] flex items-center gap-2 font-light">
                      <span className="w-1 h-1 rounded-full bg-black" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Founding Team */}
        <div className="pt-16 border-t border-[#EAEAEA]">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-[9.5px] tracking-[0.35em] uppercase text-[#777777] font-sans block mb-2">
              THE ATELIER ROSTER
            </span>
            <h3 className="font-editorial text-3xl sm:text-4xl font-light text-[#000000]">
              The Founding Team
            </h3>
            <p className="text-xs text-[#666666] mt-2 font-light">
              Kolaborasi lintas disiplin: brand architecture, supply chain, financial rigor, dan riset budaya autentik.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {team.map((member) => (
              <div key={member.name} className="p-5 bg-[#FFFFFF] border border-[#EAEAEA] text-center flex flex-col justify-between hover:border-black transition-colors">
                <div>
                  <div className="w-12 h-12 rounded-full bg-[#F5F5F5] text-black font-editorial text-xl font-normal flex items-center justify-center mx-auto mb-3 border border-[#EAEAEA]">
                    {member.name.charAt(0)}
                  </div>
                  <h4 className="font-editorial text-lg text-[#000000] font-light leading-snug">
                    {member.name}
                  </h4>
                  <span className="text-[8.5px] tracking-[0.2em] uppercase font-mono font-medium text-[#777777] block mb-2">
                    {member.role}
                  </span>
                  <p className="text-[11px] text-[#555555] leading-relaxed mb-4 font-light">
                    {member.bio}
                  </p>
                </div>
                <div className="pt-2 border-t border-[#F0F0F0] text-[8.5px] text-[#888888] font-mono">
                  <strong>Projects:</strong> {member.project}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
