import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X, Search, Sliders, Globe } from 'lucide-react';

export default function Navbar({
  cartCount,
  onOpenCart,
  onOpenInventory,
  onOpenSearch,
  currency,
  setCurrency
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: "BOUTIQUE", href: "#boutique" },
    { name: "OUR WORLD", href: "#philosophy" },
  ];

  return (
    <>
      {/* Exact Dior Header: Transparent on Hero, Clean Minimalist on Scroll */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-[#FFFFFF] py-4 border-b border-[#EAEAEA] text-[#000000] shadow-[0_1px_4px_rgba(0,0,0,0.03)]"
            : "bg-transparent py-5 text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]"
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

          {/* Center: Brand Logo (Exact Dior scale: small, elegant, serif) */}
          <div className="text-center">
            <a href="#" className="inline-block">
              <h1 className="font-editorial text-xl md:text-2xl tracking-[0.25em] font-normal uppercase leading-none">
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
                <span className={`absolute -top-1 -right-1 text-[8px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center ${
                  isScrolled ? "bg-black text-white" : "bg-white text-black"
                }`}>
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Slide-In Menu Drawer */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden animate-fade-in">
          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-xs transition-opacity"
            onClick={() => setMenuOpen(false)}
          />

          <div className="fixed inset-y-0 left-0 max-w-full flex pr-10">
            <div className="w-screen max-w-md bg-[#FFFFFF] border-r border-[#EAEAEA] shadow-2xl p-8 flex flex-col justify-between">
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

                <nav className="py-10 flex flex-col gap-6">
                  {navLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className="font-editorial text-2xl font-light tracking-[0.15em] uppercase text-black hover:opacity-50 transition-opacity"
                    >
                      {link.name}
                    </a>
                  ))}
                </nav>
              </div>

              <div className="pt-8 border-t border-[#EAEAEA] space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setCurrency(currency === "IDR" ? "USD" : "IDR")}
                    className="flex items-center justify-center gap-1.5 text-[10px] tracking-wider uppercase font-mono p-2.5 border border-[#EAEAEA] hover:border-black transition-colors"
                  >
                    <Globe size={11} />
                    <span>CURRENCY: {currency}</span>
                  </button>

                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      onOpenInventory();
                    }}
                    className="flex items-center justify-center gap-1.5 text-[10px] tracking-wider uppercase font-mono p-2.5 bg-black text-white hover:bg-black/80 transition-colors"
                  >
                    <Sliders size={11} />
                    <span>OPS MATRIX</span>
                  </button>
                </div>

                <div className="text-[9px] text-[#777777] font-mono uppercase tracking-widest text-center">
                  JAKARTA • PARIS
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
