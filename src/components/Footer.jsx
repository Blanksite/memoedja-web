import React from 'react';
import { ArrowUp } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#FFFFFF] text-[#000000] pt-16 pb-10 px-6 md:px-12 border-t border-[#EAEAEA]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#EAEAEA]">
          {/* Brand */}
          <div className="md:col-span-4 space-y-3">
            <h2 className="font-editorial text-2xl tracking-[0.25em] font-normal uppercase">
              MEMOEDJA
            </h2>
            <p className="font-serif italic text-sm text-[#555555]">
              "Honor confers a crown"
            </p>
            <p className="text-[11px] text-[#777777] leading-relaxed max-w-xs font-light">
              A contemporary Indonesian fashion & lifestyle brand reinterpreting Nusantara through modern design perspective.
            </p>
          </div>

          {/* Links */}
          <div className="md:col-span-3 text-xs space-y-2.5">
            <span className="text-[9.5px] tracking-[0.25em] uppercase font-semibold text-black block mb-3">
              EXPLORE
            </span>
            <ul className="space-y-2 text-[#555555] font-light">
              <li><a href="#boutique" className="hover:text-black transition-colors">Boutique</a></li>
              <li><a href="#tarombo" className="hover:text-black transition-colors">Tarombo (Prologue)</a></li>
              <li><a href="#philosophy" className="hover:text-black transition-colors">Philosophy & Team</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="md:col-span-5 space-y-3">
            <span className="text-[9.5px] tracking-[0.25em] uppercase font-semibold text-black block mb-2">
              PRIVATE INVITATIONS
            </span>
            <p className="text-[11px] text-[#777777] leading-relaxed font-light">
              Dapatkan akses pertama untuk rilis koleksi berikutnya.
            </p>
            <form onSubmit={(e) => { e.preventDefault(); alert("Terima kasih."); }} className="flex mt-2">
              <input
                type="email"
                placeholder="Email Anda"
                required
                className="bg-white border border-[#D0D0D0] text-xs text-black px-3 py-2.5 outline-none flex-1 focus:border-black placeholder:text-[#AAAAAA]"
              />
              <button
                type="submit"
                className="bg-black text-white text-[9.5px] tracking-widest uppercase px-5 hover:bg-black/80 transition-colors"
              >
                JOIN
              </button>
            </form>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-[9px] text-[#999999] gap-3">
          <span>© {new Date().getFullYear()} MEMOEDJA. Jakarta.</span>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-1.5 text-black hover:opacity-60 transition-opacity text-[10px] tracking-wider uppercase"
          >
            <span>TOP</span>
            <ArrowUp size={11} />
          </button>
        </div>
      </div>
    </footer>
  );
}
