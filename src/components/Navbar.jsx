import React, { useState, useEffect } from 'react';
import { ShoppingBag, Search, Sliders, Menu, X, Globe } from 'lucide-react';

export default function Navbar({
  cartCount,
  onOpenCart,
  onOpenInventory,
  onOpenSearch,
  currency,
  setCurrency
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: "TAROMBO", href: "#tarombo" },
    { name: "SAVOIR-FAIRE", href: "#savoir-faire" },
    { name: "COLLECTION", href: "#collection" },
    { name: "ARCHIVES", href: "#philosophy" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-40 transition-all duration-500">
      {/* Top Archival Header Bar */}
      <div
        className={`text-[9px] tracking-[0.3em] uppercase py-1.5 px-6 text-center font-medium transition-colors duration-500 flex items-center justify-between ${
          isScrolled
            ? "bg-[#181615] text-[#D8CEBF] border-b border-[#2D2825]"
            : "bg-black/30 backdrop-blur-xs text-[#E8E2D8] border-b border-white/10"
        }`}
      >
        <span className="hidden md:inline-block opacity-70">NUSANTARA CULTURE STUDIO</span>
        <span className="mx-auto flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#CBB597] animate-pulse" />
          HONOR CONFERS A CROWN — PROLOGUE 01: TAROMBO ARCHIVE
        </span>
        <span className="hidden md:inline-block opacity-70">JAKARTA • EST. 2026</span>
      </div>

      {/* Main Navigation Bar */}
      <div
        className={`px-6 md:px-12 transition-all duration-500 ${
          isScrolled
            ? "bg-[#F7F4EE]/95 backdrop-blur-md py-4 border-b border-[#E0D9CC] shadow-sm text-[#191716]"
            : "bg-gradient-to-b from-black/70 via-black/40 to-transparent py-6 text-white"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Left: Mobile Toggle & Curated Links */}
          <div className="flex items-center gap-8">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1 focus:outline-none"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>

            <nav className="hidden md:flex items-center gap-7">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className={`text-[10px] tracking-[0.25em] uppercase font-medium transition-colors relative py-1 group ${
                    isScrolled ? "text-[#3D3732] hover:text-[#874229]" : "text-white/85 hover:text-white"
                  }`}
                >
                  {link.name}
                  <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#874229] transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </nav>
          </div>

          {/* Center: Brand Monogram (Bode / Aimé Leon Dore Roman Elegance) */}
          <div className="text-center">
            <a href="#" className="inline-block group">
              <h2 className="font-editorial text-2xl md:text-3xl tracking-[0.25em] font-normal transition-transform duration-300 group-hover:scale-[1.01]">
                MEMOEDJA
              </h2>
              <span className={`block text-[7.5px] tracking-[0.45em] uppercase -mt-1 font-sans ${
                isScrolled ? "text-[#7A7065]" : "text-white/60"
              }`}>
                CONTEMPORARY NUSANTARA
              </span>
            </a>
          </div>

          {/* Right: Currency, Ops Matrix, Search & Shopping Bag */}
          <div className="flex items-center gap-4 md:gap-6">
            <button
              onClick={() => setCurrency(currency === "IDR" ? "USD" : "IDR")}
              className={`hidden sm:flex items-center gap-1.5 text-[10px] tracking-wider uppercase font-semibold px-2 py-1 rounded-none border transition-colors ${
                isScrolled
                  ? "border-[#D6CEC2] bg-[#EFEBE1] text-[#4A443D] hover:text-black"
                  : "border-white/20 bg-black/30 text-white/90 hover:bg-black/50"
              }`}
              title="Toggle Currency"
            >
              <Globe size={11} />
              {currency}
            </button>

            {/* Internal Ops Matrix */}
            <button
              onClick={onOpenInventory}
              className={`hidden lg:flex items-center gap-1.5 text-[9.5px] tracking-widest uppercase font-semibold px-3 py-1.5 transition-all ${
                isScrolled
                  ? "bg-[#202D3A] text-white hover:bg-[#15202B]"
                  : "border border-white/40 bg-black/40 text-white hover:bg-white hover:text-black"
              }`}
              title="Open Internal Ops Matrix"
            >
              <Sliders size={11} />
              <span>OPS MATRIX</span>
            </button>

            {/* Search */}
            <button
              onClick={onOpenSearch}
              className={`p-1.5 transition-colors ${
                isScrolled ? "text-[#2A2A2A] hover:text-[#874229]" : "text-white hover:text-[#CBB597]"
              }`}
              aria-label="Search Collection"
            >
              <Search size={18} />
            </button>

            {/* Bag Drawer */}
            <button
              onClick={onOpenCart}
              className={`relative p-1.5 transition-colors flex items-center gap-1.5 ${
                isScrolled ? "text-[#191716] hover:text-[#874229]" : "text-white hover:text-[#CBB597]"
              }`}
              aria-label="Shopping Bag"
            >
              <ShoppingBag size={19} />
              <span className="hidden sm:inline text-[10px] font-medium tracking-widest uppercase">
                BAG
              </span>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1.5 bg-[#874229] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-white/20 animate-fade-in flex flex-col gap-3 pb-3 bg-black/90 p-4 rounded-sm">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs tracking-[0.25em] uppercase font-medium text-white py-1 hover:text-[#CBB597]"
              >
                {link.name}
              </a>
            ))}
            <button
              onClick={() => {
                onOpenInventory();
                setMobileMenuOpen(false);
              }}
              className="mt-2 w-full flex items-center justify-center gap-2 text-xs tracking-wider uppercase font-semibold text-white bg-[#874229] py-2 px-3"
            >
              <Sliders size={14} />
              <span>Internal Ops Matrix</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
