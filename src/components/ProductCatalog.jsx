import React, { useState } from 'react';
import { PRODUCTS } from '../data/products';
import { Plus, Eye } from 'lucide-react';

export default function ProductCatalog({ onSelectProduct, onQuickAddToCart }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [hoveredProductId, setHoveredProductId] = useState(null);

  const categories = ["All", "Denim", "Outerwear", "Tops"];

  const filteredProducts = activeCategory === "All"
    ? PRODUCTS
    : PRODUCTS.filter((p) => p.category === activeCategory);

  return (
    <section id="collection" className="py-28 px-6 bg-[#F7F4EE] border-b border-[#E5DFD3] paper-texture">
      <div className="max-w-6xl mx-auto">
        {/* Header & Filter Bar (Aimé Leon Dore Lookbook Header) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-[#DDD5C7] gap-6">
          <div>
            <span className="text-[10px] tracking-[0.4em] uppercase text-[#874229] font-mono block mb-2">
              PROLOGUE CAPSULE • DROP 01
            </span>
            <h2 className="font-editorial text-4xl sm:text-5xl font-light text-[#191716] tracking-tight">
              Katalog Garment Tarombo
            </h2>
            <p className="text-xs text-[#6E645A] font-light mt-1">
              5 siluet terpilih untuk rutinitas harian kontemporer.
            </p>
          </div>

          {/* Category Filter Pills (Archival Stamps) */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-[10px] tracking-[0.2em] uppercase py-2 px-4 font-mono transition-all border ${
                  activeCategory === cat
                    ? "bg-[#191716] text-[#F7F4EE] border-[#191716] shadow-xs"
                    : "bg-[#EFEAE1] text-[#5C534A] border-[#DDD5C7] hover:bg-[#E2DDD3] hover:text-[#191716]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Clean Editorial Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {filteredProducts.map((product, index) => {
            const isHovered = hoveredProductId === product.id;
            return (
              <div
                key={product.id}
                className="group flex flex-col cursor-pointer"
                onMouseEnter={() => setHoveredProductId(product.id)}
                onMouseLeave={() => setHoveredProductId(null)}
                onClick={() => onSelectProduct(product)}
              >
                {/* Lookbook Image Container with Paper Frame */}
                <div className="relative aspect-[3/4] overflow-hidden bg-[#E2DDD3] border border-[#DDD5C7] mb-4 shadow-xs">
                  <img
                    src={isHovered ? product.secondaryImage : product.primaryImage}
                    alt={product.name}
                    className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-103"
                  />

                  {/* Archival Ref Tag */}
                  <div className="absolute top-3 left-3 bg-[#191716]/90 backdrop-blur-xs px-2.5 py-1 text-[8.5px] font-mono tracking-widest text-[#F7F4EE]">
                    REF. 0{index + 1}
                  </div>

                  {product.weight && (
                    <div className="absolute top-3 right-3 bg-[#F7F4EE]/90 backdrop-blur-xs px-2 py-0.5 text-[8.5px] font-mono text-[#191716] border border-[#DDD5C7]">
                      {product.weight}
                    </div>
                  )}

                  {/* Quick Action Overlay on Hover */}
                  <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectProduct(product);
                      }}
                      className="flex-1 bg-[#F7F4EE] hover:bg-white text-[#191716] text-[9.5px] tracking-[0.2em] uppercase font-mono font-semibold py-2.5 px-3 flex items-center justify-center gap-1 shadow-sm"
                    >
                      <Eye size={12} />
                      <span>INSPECT</span>
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onQuickAddToCart(product, product.sizes[0]);
                      }}
                      className="flex-1 bg-[#874229] hover:bg-[#723722] text-[#F7F4EE] text-[9.5px] tracking-[0.2em] uppercase font-mono font-semibold py-2.5 px-3 flex items-center justify-center gap-1 shadow-sm"
                    >
                      <Plus size={12} />
                      <span>ADD TO BAG</span>
                    </button>
                  </div>
                </div>

                {/* Product Meta */}
                <div className="flex flex-col flex-1 justify-between">
                  <div>
                    <div className="text-[9px] tracking-[0.2em] uppercase font-mono text-[#7A7065] mb-1">
                      {product.category} • {product.color}
                    </div>
                    <h3 className="font-editorial text-xl font-normal text-[#191716] group-hover:text-[#874229] transition-colors leading-snug">
                      {product.name}
                    </h3>
                  </div>

                  <div className="mt-3 pt-2 flex items-center justify-between border-t border-[#DDD5C7]">
                    <span className="text-xs font-semibold text-[#191716] font-mono">
                      {product.priceFormatted}
                    </span>
                    <div className="flex items-center gap-1 text-[10px] text-[#7A7065] font-mono">
                      <span>Sizes:</span>
                      <span className="text-[#191716] font-bold">
                        {product.sizes.join(' ')}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
