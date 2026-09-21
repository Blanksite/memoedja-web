import React, { useState, useEffect, useRef } from 'react';
import { PRODUCTS } from '../data/products';

/* ─── Art Interludes Data ─── */
const ART_INTERLUDES = [
  {
    id: 'interlude-1',
    archiveImage: 'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?q=80&w=1400&auto=format&fit=crop',
    archiveAlt: 'Traditional textile weaving heritage',
    modernImage: 'https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?q=80&w=1400&auto=format&fit=crop',
    modernAlt: 'Contemporary fashion atelier',
    quote: '"Different generation.\nDifferent way.\nSame habit. Same feeling."',
    caption: 'Shuttle Loom Heritage — Contemporary Denim',
  },
  {
    id: 'interlude-2',
    archiveImage: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=1400&auto=format&fit=crop',
    archiveAlt: 'Artisan hands at work',
    modernImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?q=80&w=1400&auto=format&fit=crop',
    modernAlt: 'Modern textile craft',
    quote: '"Budaya tidak pernah statis.\nIa bergerak bersama\norang-orang yang memakainya."',
    caption: 'Craftsmanship Across Generations',
  },
];

/* ─── Fade-in on scroll ─── */
function useFadeIn(threshold = 0.1) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return [ref, visible];
}

/* ═══════════════════════════════════════════════
   ART INTERLUDE — The Twist
   Split-screen: Heritage (sepia) | Now (color)
   with poetic quote overlay
   ═══════════════════════════════════════════════ */
function ArtInterlude({ interlude, reverse = false }) {
  const [ref, visible] = useFadeIn(0.15);

  return (
    <div
      ref={ref}
      className={`transition-all duration-[1400ms] ease-out ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      {/* Split Screen */}
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* ── Archive / Heritage Side ── */}
        <div
          className={`relative h-[50vh] md:h-[75vh] overflow-hidden ${
            reverse ? 'md:order-2' : 'md:order-1'
          }`}
        >
          <img
            src={interlude.archiveImage}
            alt={interlude.archiveAlt}
            className="absolute inset-0 w-full h-full object-cover object-center"
            style={{ filter: 'grayscale(80%) sepia(30%) contrast(0.85) brightness(0.9)' }}
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/10" />
          {/* Label */}
          <div className="absolute top-0 left-0 right-0 p-6">
            <span className="inline-block text-[9px] tracking-[0.4em] uppercase text-white/80 font-sans border border-white/30 px-3 py-1.5 backdrop-blur-sm bg-black/20">
              Heritage
            </span>
          </div>
        </div>

        {/* ── Modern / Now Side — with Quote ── */}
        <div
          className={`relative h-[50vh] md:h-[75vh] overflow-hidden ${
            reverse ? 'md:order-1' : 'md:order-2'
          }`}
        >
          <img
            src={interlude.modernImage}
            alt={interlude.modernAlt}
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-black/35" />

          {/* Label */}
          <div className="absolute top-0 right-0 p-6">
            <span className="inline-block text-[9px] tracking-[0.4em] uppercase text-white/80 font-sans border border-white/30 px-3 py-1.5 backdrop-blur-sm bg-black/20">
              Now
            </span>
          </div>

          {/* Poetic Quote — centered */}
          <div className="absolute inset-0 flex items-center justify-center px-8">
            <p className="text-white text-center font-serif italic text-xl md:text-2xl lg:text-3xl leading-relaxed tracking-wide whitespace-pre-line drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)]">
              {interlude.quote}
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Caption */}
      <div className="bg-white py-4 text-center">
        <span className="text-[9px] tracking-[0.35em] uppercase text-[#BBBBBB] font-sans">
          {interlude.caption}
        </span>
      </div>
    </div>
  );
}

/* ─── Product Image Card ─── */
function ProductCard({ product, onSelect, aspectClass = 'aspect-[3/4]' }) {
  const [hovered, setHovered] = useState(false);
  const [ref, visible] = useFadeIn(0.08);
  const [imgError, setImgError] = useState(false);

  const currentSrc = hovered ? product.secondaryImage : product.primaryImage;
  const fallbackSrc = product.detailImage || product.primaryImage;

  return (
    <div
      ref={ref}
      className={`cursor-pointer group relative overflow-hidden bg-[#F0F0F0] ${aspectClass} transition-all duration-[1000ms] ease-out ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      }`}
      onClick={() => onSelect(product)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img
        src={imgError ? fallbackSrc : currentSrc}
        alt={product.name}
        onError={() => setImgError(true)}
        className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]"
      />

      {/* Hover overlay: name */}
      <div className="absolute bottom-0 inset-x-0 py-5 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-black/40 to-transparent">
        <span className="text-white text-[10px] tracking-[0.3em] uppercase font-light drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]">
          {product.name}
        </span>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════
   MAIN GALLERY
   Products interspersed with Art Interludes
   ═══════════════════════════════════════ */
export default function BoutiqueGallery({ onSelectProduct }) {
  return (
    <section id="boutique" className="bg-white">

      {/* ── Row 1: Feature Product — Full Width Landscape ── */}
      <ProductCard
        product={PRODUCTS[0]}
        onSelect={onSelectProduct}
        aspectClass="aspect-[16/9] md:aspect-[21/9]"
      />

      {/* ═══ ART INTERLUDE 1 — Heritage vs Now ═══ */}
      <ArtInterlude interlude={ART_INTERLUDES[0]} />

      {/* ── Row 2: Two Products Side by Side ── */}
      <div className="grid grid-cols-1 md:grid-cols-2">
        <ProductCard
          product={PRODUCTS[1]}
          onSelect={onSelectProduct}
          aspectClass="aspect-[3/4]"
        />
        <ProductCard
          product={PRODUCTS[2]}
          onSelect={onSelectProduct}
          aspectClass="aspect-[3/4]"
        />
      </div>

      {/* ═══ ART INTERLUDE 2 — Reversed Layout ═══ */}
      <ArtInterlude interlude={ART_INTERLUDES[1]} reverse />

      {/* ── Row 3: Two Products Side by Side ── */}
      <div className="grid grid-cols-1 md:grid-cols-2">
        <ProductCard
          product={PRODUCTS[3]}
          onSelect={onSelectProduct}
          aspectClass="aspect-[3/4]"
        />
        <ProductCard
          product={PRODUCTS[4]}
          onSelect={onSelectProduct}
          aspectClass="aspect-[3/4]"
        />
      </div>
    </section>
  );
}
