import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X, Search } from 'lucide-react';

export default function NavbarV2({
  cartCount,
  onOpenCart,
  onOpenSearch
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Ultra-Clean Minimal Header: Menu (left), Logo (center), Search + Bag (right) */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md py-4 border-b border-neutral-200/60 text-black shadow-xs'
            : 'bg-transparent py-5 text-black'
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Left: Menu Icon */}
          <div className="flex items-center">
            <button
              onClick={() => setMenuOpen(true)}
              className="p-1.5 transition-opacity hover:opacity-60 focus:outline-none"
              aria-label="Open Menu"
            >
              <Menu size={20} strokeWidth={1.2} />
            </button>
          </div>

          {/* Center: Brand Logo */}
          <div className="text-center absolute left-1/2 -translate-x-1/2">
            <a href="#hero-v2" className="inline-block">
              <h1 className="font-editorial text-xl md:text-2xl tracking-[0.25em] font-normal uppercase leading-none text-black">
                MEMOEDJA
              </h1>
            </a>
          </div>

          {/* Right: Search & Shopping Bag */}
          <div className="flex items-center gap-4">
            <button
              onClick={onOpenSearch}
              className="p-1 transition-opacity hover:opacity-60 focus:outline-none"
              aria-label="Search"
            >
              <Search size={18} strokeWidth={1.2} />
            </button>

            <button
              onClick={onOpenCart}
              className="relative p-1 transition-opacity hover:opacity-60 focus:outline-none"
              aria-label="Bag"
            >
              <ShoppingBag size={18} strokeWidth={1.2} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 text-[8px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center bg-black text-white">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Slide-In Clean Navigation Drawer */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden animate-fade-in">
          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-xs transition-opacity"
            onClick={() => setMenuOpen(false)}
          />

          <div className="fixed inset-y-0 left-0 max-w-full flex pr-10">
            <div className="w-screen max-w-md bg-white border-r border-[#EAEAEA] shadow-2xl p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-8 border-b border-[#EAEAEA]">
                  <span className="font-editorial text-lg tracking-[0.25em] font-normal uppercase text-black">
                    MEMOEDJA
                  </span>
                  <button
                    onClick={() => setMenuOpen(false)}
                    className="p-1 text-black hover:opacity-50"
                  >
                    <X size={18} strokeWidth={1.2} />
                  </button>
                </div>

                <nav className="py-12 flex flex-col gap-6">
                  <a
                    href="#hero-v2"
                    onClick={() => setMenuOpen(false)}
                    className="font-editorial text-2xl font-light tracking-[0.15em] uppercase text-black hover:opacity-50 transition-opacity"
                  >
                    CAMPAIGN
                  </a>
                  <a
                    href="#collection-v2"
                    onClick={() => setMenuOpen(false)}
                    className="font-editorial text-2xl font-light tracking-[0.15em] uppercase text-black hover:opacity-50 transition-opacity"
                  >
                    BOUTIQUE
                  </a>
                </nav>
              </div>

              <div className="pt-8 border-t border-[#EAEAEA] text-[9px] text-neutral-400 font-mono uppercase tracking-widest text-center">
                JAKARTA • MILANO • PARIS
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
