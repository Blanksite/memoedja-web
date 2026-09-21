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
    <section id="collection" className="py-28 px-6 md:px-12 bg-[#FFFFFF] border-b border-[#EFEFEF]">
      <div className="max-w-7xl mx-auto">
        {/* Header & Category Tabs (Pure Dior Clean Layout) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-[#EAEAEA] gap-6">
          <div>
            <span className="text-[9.5px] tracking-[0.35em] uppercase text-[#777777] font-sans block mb-2">
              PROLOGUE CAPSULE • DROP 01
            </span>
            <h2 className="font-editorial text-4xl sm:text-5xl font-light text-[#000000] tracking-tight">
              Koleksi Tarombo
            </h2>
            <p className="text-xs text-[#666666] font-light mt-1">
              5 siluet esensial dirancang untuk ritme kehidupan harian kontemporer.
            </p>
          </div>

          {/* Minimalist Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-[9.5px] tracking-[0.2em] uppercase py-2 px-5 transition-all border ${
                  activeCategory === cat
                    ? "bg-black text-white border-black"
                    : "bg-white text-black border-[#E0E0E0] hover:border-black"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Dior-Inspired Clean Lookbook Grid */}
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
                {/* Lookbook Image Container with Clean White Frame */}
                <div className="relative aspect-[3/4] overflow-hidden bg-[#F8F8F8] border border-[#EAEAEA] mb-4">
                  <img
                    src={isHovered ? product.secondaryImage : product.primaryImage}
                    alt={product.name}
                    className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-103"
                  />

                  {/* Ref Tag */}
                  <div className="absolute top-3 left-3 bg-black/85 text-white px-2.5 py-0.5 text-[8px] font-mono tracking-widest uppercase">
                    NO. 0{index + 1}
                  </div>

                  {product.weight && (
                    <div className="absolute top-3 right-3 bg-white/90 text-black px-2 py-0.5 text-[8px] font-mono border border-[#EAEAEA]">
                      {product.weight}
                    </div>
                  )}

                  {/* Hover Quick Actions */}
                  <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectProduct(product);
                      }}
                      className="flex-1 bg-white hover:bg-white/90 text-black text-[9.5px] tracking-[0.2em] uppercase font-normal py-2.5 px-3 flex items-center justify-center gap-1 shadow-sm"
                    >
                      <Eye size={12} />
                      <span>INSPECT</span>
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onQuickAddToCart(product, product.sizes[0]);
                      }}
                      className="flex-1 bg-black hover:bg-black/90 text-white text-[9.5px] tracking-[0.2em] uppercase font-normal py-2.5 px-3 flex items-center justify-center gap-1 shadow-sm"
                    >
                      <Plus size={12} />
                      <span>QUICK BAG</span>
                    </button>
                  </div>
                </div>

                {/* Product Meta */}
                <div className="flex flex-col flex-1 justify-between">
                  <div>
                    <div className="text-[9px] tracking-[0.2em] uppercase font-mono text-[#777777] mb-1">
                      {product.category} • {product.color}
                    </div>
                    <h3 className="font-editorial text-xl font-light text-[#000000] group-hover:opacity-60 transition-opacity leading-snug">
                      {product.name}
                    </h3>
                  </div>

                  <div className="mt-3 pt-2 flex items-center justify-between border-t border-[#EAEAEA]">
                    <span className="text-xs font-semibold text-[#000000] font-mono">
                      {product.priceFormatted}
                    </span>
                    <div className="flex items-center gap-1 text-[10px] text-[#777777] font-mono">
                      <span>Sizes:</span>
                      <span className="text-black font-semibold">
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
