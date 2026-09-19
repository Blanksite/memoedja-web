import React, { useState, useEffect } from 'react';
import { ShoppingBag, Search, Sliders, Menu, X, Globe, ShieldCheck } from 'lucide-react';

export default function Navbar({
  cartCount,
  onOpenCart,
  onOpenInventory,
  onOpenSearch,
  activeSection,
  currency,
  setCurrency
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: "TAROMBO (PROLOGUE)", href: "#tarombo" },
    { name: "GARMENTS", href: "#collection" },
    { name: "SAVOIR-FAIRE", href: "#savoir-faire" },
    { name: "PHILOSOPHY", href: "#philosophy" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-40 transition-all duration-500">
      {/* Announcement Ribbon - Haute Luxury Style */}
      <div className="bg-[#121212] text-[#E8E2D8] text-[10px] tracking-[0.25em] uppercase py-2 px-4 text-center font-medium border-b border-[#2A2A2A] flex items-center justify-between">
        <span className="hidden md:inline-block opacity-60">JAKARTA, INDONESIA</span>
        <span className="mx-auto flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#8C4A32] animate-ping" />
          HONOR CONFERS A CROWN — PROLOGUE 01: TAROMBO LIVE FOR PRE-ORDER
        </span>
        <span className="hidden md:inline-block opacity-60">EST. 2026</span>
      </div>

      {/* Main Navigation Bar */}
      <div
        className={`px-6 md:px-12 transition-all duration-300 ${
          isScrolled
            ? "bg-[#FAF8F5]/95 backdrop-blur-md py-4 border-b border-[#E5E0D8] shadow-sm"
            : "bg-[#FAF8F5] py-5 border-b border-[#EAE5DC]"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Left: Mobile Toggle & Desktop Brand Links */}
          <div className="flex items-center gap-6">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-[#121212] p-1"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>

            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-[11px] tracking-[0.18em] uppercase font-medium text-[#2E2E2E] hover:text-[#8C4A32] transition-colors relative py-1 group"
                >
                  {link.name}
                  <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#8C4A32] transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </nav>
          </div>

          {/* Center: Brand Identity Logo (Dior-esque Centered Serif Monogram) */}
          <div className="text-center">
            <a href="#" className="inline-block group">
              <h1 className="font-editorial text-2xl md:text-3xl tracking-[0.28em] font-semibold text-[#121212] transition-transform duration-300 group-hover:scale-[1.01]">
                MEMOEDJA
              </h1>
              <span className="block text-[8px] tracking-[0.45em] uppercase text-[#6B635A] -mt-1 font-sans">
                CONTEMPORARY NUSANTARA
              </span>
            </a>
          </div>

          {/* Right: Currency, Inventory Matrix Trigger, Search & Bag */}
          <div className="flex items-center gap-4 md:gap-6">
            {/* Currency Switcher */}
            <button
              onClick={() => setCurrency(currency === "IDR" ? "USD" : "IDR")}
              className="hidden sm:flex items-center gap-1.5 text-[10px] tracking-wider uppercase font-semibold text-[#4A443D] hover:text-[#121212] px-2 py-1 rounded border border-[#DDD6CB] bg-[#F2EDE4]"
              title="Toggle Currency"
            >
              <Globe size={12} />
              {currency}
            </button>

            {/* Internal Inventory & Ops Button */}
            <button
              onClick={onOpenInventory}
              className="hidden lg:flex items-center gap-1.5 text-[10px] tracking-widest uppercase font-semibold text-[#1F2E3D] hover:bg-[#1F2E3D] hover:text-white px-3 py-1.5 rounded-full border border-[#1F2E3D]/30 transition-all duration-200"
              title="Open Internal Inventory & Batch Tracker"
            >
              <Sliders size={12} />
              <span>OPS MATRIX</span>
            </button>

            {/* Search Trigger */}
            <button
              onClick={onOpenSearch}
              className="text-[#2A2A2A] hover:text-[#8C4A32] p-1.5 transition-colors"
              aria-label="Search Collection"
            >
              <Search size={19} />
            </button>

            {/* Shopping Bag Drawer Button */}
            <button
              onClick={onOpenCart}
              className="relative text-[#121212] hover:text-[#8C4A32] p-1.5 transition-colors flex items-center gap-1.5"
              aria-label="Shopping Bag"
            >
              <ShoppingBag size={20} />
              <span className="hidden sm:inline text-[11px] font-medium tracking-wider uppercase">
                BAG
              </span>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1.5 bg-[#8C4A32] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-[#E5E0D8] animate-fade-in flex flex-col gap-4 pb-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs tracking-[0.2em] uppercase font-medium text-[#1A1A1A] py-1 hover:text-[#8C4A32]"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={() => {
                  onOpenInventory();
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 text-xs tracking-wider uppercase font-semibold text-white bg-[#1F2E3D] py-2 px-3 rounded"
              >
                <Sliders size={14} />
                <span>Internal Ops Matrix</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
