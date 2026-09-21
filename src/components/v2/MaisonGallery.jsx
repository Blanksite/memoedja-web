import React, { useState } from 'react';
import { PRODUCTS } from '../../data/products';

export default function MaisonGallery({ onSelectProduct }) {
  const [hoveredId, setHoveredId] = useState(null);

  const hero = PRODUCTS[0];
  const pair1 = PRODUCTS.slice(1, 3);
  const pair2 = PRODUCTS.slice(3, 5);

  return (
    <section id="collection-v2" className="bg-white">
      {/* ── Row 1: Full-Width Feature Image ── */}
      <div
        className="cursor-pointer group relative aspect-[16/9] md:aspect-[21/9] overflow-hidden bg-[#F5F5F5]"
        onClick={() => onSelectProduct(hero)}
        onMouseEnter={() => setHoveredId(hero.id)}
        onMouseLeave={() => setHoveredId(null)}
      >
        <img
          src={hoveredId === hero.id ? hero.secondaryImage : hero.primaryImage}
          alt={hero.name}
          className="w-full h-full object-cover object-center transition-transform duration-[1200ms] ease-out group-hover:scale-[1.02]"
        />
        <div className="absolute bottom-0 inset-x-0 py-4 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-black/40 to-transparent">
          <span className="text-white text-[10px] tracking-[0.3em] uppercase font-light drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]">
            {hero.name}
          </span>
        </div>
      </div>

      {/* ── Row 2: Two Images Side by Side ── */}
      <div className="grid grid-cols-1 md:grid-cols-2">
        {pair1.map((product) => (
          <div
            key={product.id}
            className="cursor-pointer group relative aspect-[3/4] overflow-hidden bg-[#F5F5F5]"
            onClick={() => onSelectProduct(product)}
            onMouseEnter={() => setHoveredId(product.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <img
              src={hoveredId === product.id ? product.secondaryImage : product.primaryImage}
              alt={product.name}
              className="w-full h-full object-cover object-center transition-transform duration-[1200ms] ease-out group-hover:scale-[1.02]"
            />
            <div className="absolute bottom-0 inset-x-0 py-4 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-black/40 to-transparent">
              <span className="text-white text-[10px] tracking-[0.3em] uppercase font-light drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]">
                {product.name}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* ── Row 3: Two Images Side by Side ── */}
      <div className="grid grid-cols-1 md:grid-cols-2">
        {pair2.map((product) => (
          <div
            key={product.id}
            className="cursor-pointer group relative aspect-[3/4] overflow-hidden bg-[#F5F5F5]"
            onClick={() => onSelectProduct(product)}
            onMouseEnter={() => setHoveredId(product.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <img
              src={hoveredId === product.id ? product.secondaryImage : product.primaryImage}
              alt={product.name}
              className="w-full h-full object-cover object-center transition-transform duration-[1200ms] ease-out group-hover:scale-[1.02]"
            />
            <div className="absolute bottom-0 inset-x-0 py-4 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-black/40 to-transparent">
              <span className="text-white text-[10px] tracking-[0.3em] uppercase font-light drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]">
                {product.name}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
