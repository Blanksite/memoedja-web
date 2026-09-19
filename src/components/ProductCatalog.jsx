import React, { useState } from 'react';
import { PRODUCTS } from '../data/products';
import { Plus, Eye, Check } from 'lucide-react';

export default function ProductCatalog({ onSelectProduct, onQuickAddToCart }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [hoveredProductId, setHoveredProductId] = useState(null);

  const categories = ["All", "Denim", "Outerwear", "Tops"];

  const filteredProducts = activeCategory === "All"
    ? PRODUCTS
    : PRODUCTS.filter((p) => p.category === activeCategory);

  return (
    <section id="collection" className="py-24 px-6 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto">
        {/* Header & Filter Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 pb-6 border-b border-[#E8E2D8] gap-6">
          <div>
            <span className="text-[10px] tracking-[0.35em] uppercase text-[#8C4A32] font-semibold block mb-2">
              PROLOGUE CAPSULE 01
            </span>
            <h2 className="font-editorial text-4xl md:text-5xl font-light text-[#121212] tracking-tight">
              Koleksi Tarombo
            </h2>
            <p className="text-xs md:text-sm text-[#6B635A] font-light mt-1">
              5 siluet esensial dirancang untuk ritme kehidupan harian kontemporer.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-[11px] tracking-[0.2em] uppercase py-2 px-5 transition-all font-medium rounded-full ${
                  activeCategory === cat
                    ? "bg-[#121212] text-white shadow-sm"
                    : "bg-[#F2EDE4] text-[#5A524A] hover:text-[#121212] hover:bg-[#E8E2D8]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Editorial Product Grid (Dior Fashion Layout Style) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {filteredProducts.map((product) => {
            const isHovered = hoveredProductId === product.id;
            return (
              <div
                key={product.id}
                className="group flex flex-col cursor-pointer"
                onMouseEnter={() => setHoveredProductId(product.id)}
                onMouseLeave={() => setHoveredProductId(null)}
                onClick={() => onSelectProduct(product)}
              >
                {/* Image Container with Elegant Hover Flip */}
                <div className="relative aspect-[3/4] overflow-hidden bg-[#ECE7DE] rounded-sm mb-5 shadow-sm">
                  <img
                    src={isHovered ? product.secondaryImage : product.primaryImage}
                    alt={product.name}
                    className="w-full h-full object-cover object-center transition-all duration-700 group-hover:scale-105"
                  />

                  {/* Badge */}
                  <div className="absolute top-3 left-3 bg-[#FAF8F5]/90 backdrop-blur-sm px-2.5 py-1 text-[9px] tracking-[0.2em] uppercase font-bold text-[#121212] border border-[#DDD6CB]">
                    {product.badge}
                  </div>

                  {/* Weight / Oz Tag */}
                  {product.weight && (
                    <div className="absolute top-3 right-3 bg-[#121212]/80 backdrop-blur-sm px-2.5 py-1 text-[9px] tracking-widest uppercase font-mono text-white">
                      {product.weight}
                    </div>
                  )}

                  {/* Quick Action Overlay on Hover */}
                  <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-between gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectProduct(product);
                      }}
                      className="flex-1 bg-white hover:bg-[#FAF8F5] text-[#121212] text-[10px] tracking-[0.2em] uppercase font-semibold py-2.5 px-3 transition-colors flex items-center justify-center gap-1.5 shadow-md"
                    >
                      <Eye size={12} />
                      <span>DETAILS</span>
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onQuickAddToCart(product, product.sizes[0]);
                      }}
                      className="flex-1 bg-[#8C4A32] hover:bg-[#723B28] text-white text-[10px] tracking-[0.2em] uppercase font-semibold py-2.5 px-3 transition-colors flex items-center justify-center gap-1.5 shadow-md"
                    >
                      <Plus size={12} />
                      <span>QUICK BAG</span>
                    </button>
                  </div>
                </div>

                {/* Product Meta */}
                <div className="flex flex-col flex-1 justify-between">
                  <div>
                    <span className="text-[9px] tracking-[0.2em] uppercase text-[#857C72] block mb-1">
                      {product.category} • {product.color}
                    </span>
                    <h3 className="font-editorial text-xl font-normal text-[#121212] group-hover:text-[#8C4A32] transition-colors leading-snug">
                      {product.name}
                    </h3>
                  </div>

                  <div className="mt-3 pt-2 flex items-center justify-between border-t border-[#EAE5DC]">
                    <span className="text-sm font-semibold text-[#121212]">
                      {product.priceFormatted}
                    </span>
                    <div className="flex items-center gap-1 text-[10px] text-[#7A7268]">
                      <span>Sizes:</span>
                      <span className="font-mono text-[#121212] font-medium">
                        {product.sizes.join(', ')}
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
