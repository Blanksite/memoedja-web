import React from 'react';
import { BRAND_PILLARS } from '../data/products';
import { ShieldCheck, Sparkles, Users, Award, Heart } from 'lucide-react';

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
    <section id="philosophy" className="py-24 px-6 bg-[#F4EFE6] border-t border-[#E5DFD4]">
      <div className="max-w-7xl mx-auto">
        {/* Brand Pillars Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[10px] tracking-[0.35em] uppercase text-[#8C4A32] font-semibold block mb-2">
            THE THREE PILLARS
          </span>
          <h2 className="font-editorial text-4xl md:text-5xl font-light text-[#121212] tracking-tight mb-4">
            Fondasi Brand Memoedja
          </h2>
          <p className="text-xs md:text-sm text-[#6B635A] font-light max-w-xl mx-auto leading-relaxed">
            Menghubungkan keanggunan budaya lokal dengan ritme kehidupan modern melalui 3 prinsip yang tak terpisahkan.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {BRAND_PILLARS.map((pillar) => (
            <div
              key={pillar.number}
              className="p-8 bg-[#FAF8F5] border border-[#DDD6CB] rounded-sm relative group hover:border-[#8C4A32] transition-colors shadow-sm"
            >
              <span className="font-mono text-xs text-[#8C4A32] font-bold block mb-4">
                [{pillar.number}]
              </span>
              <h3 className="font-editorial text-2xl font-light text-[#121212] mb-2">
                {pillar.title}
              </h3>
              <p className="text-xs text-[#7A7268] italic mb-6 font-serif">
                {pillar.subtitle}
              </p>

              <ul className="space-y-2 border-t border-[#EAE5DC] pt-4">
                {pillar.points.map((pt, idx) => (
                  <li key={idx} className="text-xs text-[#555] flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8C4A32]" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Founding Team Section */}
        <div className="pt-12 border-t border-[#DDD6CB]">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[10px] tracking-[0.35em] uppercase text-[#8C4A32] font-semibold block mb-2">
              THE PEOPLE BUILDING IT
            </span>
            <h3 className="font-editorial text-3xl md:text-4xl font-light text-[#121212]">
              The Founding Team
            </h3>
            <p className="text-xs text-[#6B635A] mt-2">
              Kombinasi disiplin brand architecture, supply chain, financial rigor, dan riset budaya autentik.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {team.map((member) => (
              <div key={member.name} className="p-5 bg-[#FAF8F5] border border-[#DDD6CB] rounded-sm text-center flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-full bg-[#EAE5DD] text-[#8C4A32] font-editorial text-xl font-bold flex items-center justify-center mx-auto mb-3 shadow-inner">
                    {member.name.charAt(0)}
                  </div>
                  <h4 className="font-editorial text-lg text-[#121212] font-medium leading-snug">
                    {member.name}
                  </h4>
                  <span className="text-[9px] tracking-[0.2em] uppercase font-bold text-[#8C4A32] block mb-2">
                    {member.role}
                  </span>
                  <p className="text-[11px] text-[#666] leading-relaxed mb-4 font-light">
                    {member.bio}
                  </p>
                </div>
                <div className="pt-2 border-t border-[#EAE5DC] text-[9px] text-[#888]">
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
