import React from 'react';
import { ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#121212] text-[#E8E2D8] pt-20 pb-12 px-6 border-t border-[#222]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-[#2A2A2A]">
          {/* Brand Manifesto Col */}
          <div className="md:col-span-5 space-y-4">
            <h2 className="font-editorial text-3xl md:text-4xl font-light tracking-[0.2em] text-white">
              MEMOEDJA
            </h2>
            <p className="font-serif italic text-sm text-[#C4BCB3]">
              "Honor confers a crown"
            </p>
            <p className="text-xs text-[#8E867D] leading-relaxed max-w-sm font-light">
              Contemporary Indonesian fashion & lifestyle brand reinterpreting Nusantara through modern design perspective and thoughtful garment construction.
            </p>
            <div className="text-[10px] tracking-widest uppercase text-[#8C4A32] pt-2">
              JAKARTA • EST. 2026
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3 text-xs">
            <span className="text-[10px] tracking-[0.25em] uppercase font-bold text-white block mb-4">
              COLLECTIONS & SAVOIR-FAIRE
            </span>
            <ul className="space-y-2 text-[#AAA]">
              <li><a href="#tarombo" className="hover:text-white transition-colors">Prologue 01: Tarombo</a></li>
              <li><a href="#collection" className="hover:text-white transition-colors">Everyday Garments</a></li>
              <li><a href="#savoir-faire" className="hover:text-white transition-colors">Atelier Construction</a></li>
              <li><a href="#philosophy" className="hover:text-white transition-colors">Brand Pillars & Team</a></li>
            </ul>
          </div>

          {/* Newsletter Subscribe */}
          <div className="md:col-span-4 space-y-3">
            <span className="text-[10px] tracking-[0.25em] uppercase font-bold text-white block mb-2">
              DISPATCH & PRIVATE PREVIEWS
            </span>
            <p className="text-xs text-[#8E867D] leading-relaxed">
              Dapatkan notifikasi privat untuk rilis terbatas Drop 02 dan dokumentasi riset budaya Memoedja.
            </p>
            <form onSubmit={(e) => { e.preventDefault(); alert("Terima kasih telah bergabung dalam arsip privat Memoedja."); }} className="flex mt-3">
              <input
                type="email"
                placeholder="Alamat email Anda..."
                required
                className="bg-[#1F1F1F] border border-[#333] text-xs text-white px-3 py-2.5 outline-none flex-1 focus:border-[#8C4A32] placeholder:text-[#666]"
              />
              <button
                type="submit"
                className="bg-[#8C4A32] hover:bg-[#A3563B] text-white text-[10px] tracking-wider uppercase font-semibold px-4 transition-colors"
              >
                JOIN
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[10px] text-[#6B635A] gap-4">
          <div>
            © {new Date().getFullYear()} MEMOEDJA. Built from Indonesian culture. Designed for the generation living now.
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-white hover:text-[#8C4A32] transition-colors"
          >
            <span>BACK TO TOP</span>
            <ArrowUp size={12} />
          </button>
        </div>
      </div>
    </footer>
  );
}
