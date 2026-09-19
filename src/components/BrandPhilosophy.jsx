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
    <section id="philosophy" className="py-28 px-6 bg-[#EFEAE1] border-b border-[#DDD5C7] paper-texture">
      <div className="max-w-6xl mx-auto">
        {/* Brand Pillars */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-[10px] tracking-[0.4em] uppercase text-[#874229] font-mono block mb-3">
            THE ARCHIVAL PILLARS
          </span>
          <h2 className="font-editorial text-4xl sm:text-5xl md:text-6xl font-light text-[#191716] tracking-tight mb-4">
            Fondasi Brand Memoedja
          </h2>
          <p className="text-xs sm:text-sm text-[#6E645A] font-light max-w-xl mx-auto leading-relaxed">
            Menghubungkan kedalaman kultural Nusantara dengan gaya hidup masa kini melalui tiga pilar konstruksi.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {BRAND_PILLARS.map((pillar) => (
            <div
              key={pillar.number}
              className="p-8 bg-[#F7F4EE] border border-[#DDD5C7] shadow-xs flex flex-col justify-between"
            >
              <div>
                <span className="font-mono text-xs text-[#874229] font-bold block mb-3">
                  [{pillar.number}]
                </span>
                <h3 className="font-editorial text-2xl sm:text-3xl font-normal text-[#191716] mb-2">
                  {pillar.title}
                </h3>
                <p className="text-xs text-[#6E645A] italic mb-6 font-serif">
                  {pillar.subtitle}
                </p>

                <ul className="space-y-2.5 border-t border-[#DDD5C7] pt-4">
                  {pillar.points.map((pt, idx) => (
                    <li key={idx} className="text-xs text-[#5C534A] flex items-center gap-2 font-light">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#874229]" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* The Founding Team (Atelier Roster Style) */}
        <div className="pt-16 border-t border-[#DDD5C7]">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-[10px] tracking-[0.4em] uppercase text-[#874229] font-mono block mb-2">
              THE ATELIER ROSTER
            </span>
            <h3 className="font-editorial text-3xl sm:text-4xl font-light text-[#191716]">
              The Founding Team
            </h3>
            <p className="text-xs text-[#6E645A] mt-2 font-light">
              Kolaborasi lintas disiplin: brand architecture, supply chain, financial rigor, dan riset budaya autentik.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {team.map((member) => (
              <div key={member.name} className="p-5 bg-[#F7F4EE] border border-[#DDD5C7] text-center flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-full bg-[#EAE4D6] text-[#874229] font-editorial text-xl font-bold flex items-center justify-center mx-auto mb-3 shadow-inner">
                    {member.name.charAt(0)}
                  </div>
                  <h4 className="font-editorial text-lg text-[#191716] font-normal leading-snug">
                    {member.name}
                  </h4>
                  <span className="text-[9px] tracking-[0.2em] uppercase font-mono font-bold text-[#874229] block mb-2">
                    {member.role}
                  </span>
                  <p className="text-[11px] text-[#6E645A] leading-relaxed mb-4 font-light">
                    {member.bio}
                  </p>
                </div>
                <div className="pt-2 border-t border-[#DDD5C7] text-[9px] text-[#888] font-mono">
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
