import React from 'react';
import { ArrowUp } from 'lucide-react';

export default function MaisonFooter() {
  return (
    <footer className="bg-white text-black pt-20 pb-10 px-6 md:px-12 border-t border-[#EAEAEA]">
      <div className="max-w-[1400px] mx-auto">
        <div className="pb-16 flex flex-col md:flex-row md:items-end justify-between border-b border-[#EAEAEA] gap-6">
          <div>
            <h2 className="font-editorial text-3xl md:text-5xl font-light tracking-wide uppercase text-black">
              MEMOEDJA
            </h2>
            <p className="font-serif italic text-sm text-[#777777] mt-1">
              "Honor confers a crown"
            </p>
          </div>
          <div className="text-right">
            <a
              href="mailto:info@memoedja.com"
              className="text-xs font-mono tracking-widest uppercase text-black hover:opacity-60 transition-opacity border-b border-black pb-0.5"
            >
              let's talk →
            </a>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-[10px] text-[#999999] gap-3 font-sans">
          <span>© {new Date().getFullYear()} MEMOEDJA. Jakarta.</span>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-1.5 text-black hover:opacity-60 transition-opacity uppercase tracking-wider text-[10px]"
          >
            <span>TOP</span>
            <ArrowUp size={11} />
          </button>
        </div>
      </div>
    </footer>
  );
}
