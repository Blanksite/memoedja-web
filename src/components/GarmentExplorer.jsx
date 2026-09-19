import React, { useState } from 'react';
import { PRODUCTS } from '../data/products';
import { CheckCircle2, Scissors, Layers, Shield, Sparkles, ChevronRight, Eye } from 'lucide-react';

export default function GarmentExplorer({ onSelectProductForModal, onAddToCart }) {
  const [selectedGarmentId, setSelectedGarmentId] = useState(PRODUCTS[0].id);
  const selectedProduct = PRODUCTS.find((p) => p.id === selectedGarmentId) || PRODUCTS[0];
  const [activePointIndex, setActivePointIndex] = useState(0);

  return (
    <section id="savoir-faire" className="py-24 px-6 bg-[#FAF8F5] border-b border-[#EAE5DC]">
      <div className="max-w-7xl mx-auto">
        {/* Header Section: Dior Savoir-Faire Inspired */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-[10px] tracking-[0.35em] uppercase text-[#8C4A32] font-semibold mb-3">
            <Scissors size={13} />
            <span>SAVOIR-FAIRE & ATELIER DISCIPLINE</span>
          </div>
          <h2 className="font-editorial text-4xl md:text-5xl lg:text-6xl font-light text-[#121212] tracking-tight mb-4">
            Anatomi & Konstruksi Garmen
          </h2>
          <p className="text-sm md:text-base text-[#6B635A] font-light max-w-2xl mx-auto leading-relaxed">
            Seperti ketelitian atelier adibusana dunia, setiap jahitan Memoedja dipikirkan secara matang. Kami menolak hiasan palsu: karakter sebuah busana terpancar dari kejujuran serat dan kekokohan konstruksinya.
          </p>
        </div>

        {/* Garment Selector Tabs */}
        <div className="flex items-center justify-start md:justify-center overflow-x-auto gap-2 pb-4 mb-12 scrollbar-none">
          {PRODUCTS.map((item) => {
            const isSelected = item.id === selectedGarmentId;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setSelectedGarmentId(item.id);
                  setActivePointIndex(0);
                }}
                className={`text-[11px] tracking-[0.18em] uppercase py-2.5 px-5 rounded-full transition-all whitespace-nowrap font-medium ${
                  isSelected
                    ? "bg-[#121212] text-white shadow-sm"
                    : "bg-[#F0EBE1] text-[#4A443D] hover:bg-[#E5DFD4] hover:text-[#121212]"
                }`}
              >
                {item.name.split(' ')[0]} {item.weight ? `(${item.weight})` : ''}
              </button>
            );
          })}
        </div>

        {/* Savoir-Faire Interactive Showcase Card */}
        <div className="bg-[#F4F0E8] border border-[#DDD6CB] rounded-sm p-6 lg:p-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left: Interactive Multi-Perspective Garment Photography */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <div className="relative aspect-[4/3] rounded-sm overflow-hidden bg-[#E5DFD4] shadow-md group">
              <img
                src={selectedProduct.primaryImage}
                alt={selectedProduct.name}
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 text-[10px] tracking-widest uppercase font-bold text-[#121212] shadow-sm">
                {selectedProduct.weight} • {selectedProduct.category}
              </div>
              <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-sm px-3 py-1 text-[10px] tracking-wider uppercase text-white">
                {selectedProduct.color}
              </div>
            </div>

            {/* Thumbnail perspectives (Primary, Secondary, Detail) */}
            <div className="grid grid-cols-3 gap-3">
              {[selectedProduct.primaryImage, selectedProduct.secondaryImage, selectedProduct.detailImage].map((imgUrl, idx) => (
                <div
                  key={idx}
                  className="aspect-[4/3] rounded-sm overflow-hidden bg-[#DDD6CB] cursor-pointer hover:opacity-90 border border-transparent hover:border-[#8C4A32] transition-all"
                >
                  <img
                    src={imgUrl}
                    alt={`${selectedProduct.name} detail view ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Right: Technical Specs & Construction Points */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] tracking-[0.25em] uppercase text-[#8C4A32] font-semibold">
                  {selectedProduct.badge}
                </span>
                <span className="text-[#8C4A32]">•</span>
                <span className="text-[10px] tracking-[0.2em] uppercase text-[#6B635A]">
                  PROLOGUE DROP 01
                </span>
              </div>

              <h3 className="font-editorial text-2xl md:text-3xl font-light text-[#121212] mb-3">
                {selectedProduct.name}
              </h3>

              <p className="text-xs md:text-sm text-[#575048] leading-relaxed mb-6 font-light">
                {selectedProduct.description}
              </p>

              <div className="bg-[#FAF8F5] p-4 rounded border border-[#E0D8CB] mb-6">
                <span className="text-[9px] tracking-[0.2em] uppercase text-[#857C72] block mb-1">
                  FABRIC COMPOSITION & WEAVE
                </span>
                <p className="text-xs font-medium text-[#1A1A1A]">
                  {selectedProduct.fabric}
                </p>
                <div className="mt-2 text-[11px] text-[#6B635A]">
                  <strong>Siluet:</strong> {selectedProduct.silhouette}
                </div>
              </div>

              {/* Construction Hotspots List */}
              <div className="space-y-3 mb-8">
                <span className="text-[10px] tracking-[0.25em] uppercase text-[#121212] font-bold block mb-2">
                  DISCIPLINE HIGHLIGHTS:
                </span>
                {selectedProduct.constructionDetails.map((detail, index) => {
                  const isActive = activePointIndex === index;
                  return (
                    <div
                      key={detail.title}
                      onClick={() => setActivePointIndex(index)}
                      className={`p-3.5 rounded-sm border cursor-pointer transition-all ${
                        isActive
                          ? "bg-[#FAF8F5] border-[#8C4A32] shadow-sm"
                          : "bg-[#F7F3EB]/60 border-[#DDD6CB] hover:bg-[#FAF8F5]"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-[#1A1A1A] flex items-center gap-2">
                          <CheckCircle2 size={13} className={isActive ? "text-[#8C4A32]" : "text-[#A89F93]"} />
                          {detail.title}
                        </span>
                        <span className="text-[10px] text-[#8C4A32] font-mono">0{index + 1}</span>
                      </div>
                      {isActive && (
                        <p className="text-xs text-[#5A524A] mt-2 pl-5 leading-relaxed animate-fade-in font-light">
                          {detail.desc}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="pt-4 border-t border-[#DDD6CB] flex items-center justify-between gap-4">
              <div>
                <span className="text-[10px] tracking-wider uppercase text-[#857C72] block">PRICE</span>
                <span className="font-editorial text-2xl font-semibold text-[#121212]">
                  {selectedProduct.priceFormatted}
                </span>
              </div>

              <button
                onClick={() => onSelectProductForModal(selectedProduct)}
                className="inline-flex items-center gap-2 bg-[#121212] hover:bg-[#8C4A32] text-white text-[10px] tracking-[0.2em] uppercase font-semibold py-3 px-6 rounded-none transition-all shadow-md"
              >
                <Eye size={14} />
                <span>SPEC & ACQUIRE</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
