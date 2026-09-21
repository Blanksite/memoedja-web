import React, { useState } from 'react';
import { PRODUCTS } from '../data/products';
import { CheckCircle2, Eye } from 'lucide-react';

export default function GarmentExplorer({ onSelectProductForModal }) {
  const [selectedGarmentId, setSelectedGarmentId] = useState(PRODUCTS[0].id);
  const selectedProduct = PRODUCTS.find((p) => p.id === selectedGarmentId) || PRODUCTS[0];
  const [activePointIndex, setActivePointIndex] = useState(0);

  return (
    <section id="savoir-faire" className="py-28 px-6 md:px-12 bg-[#FFFFFF] border-b border-[#EFEFEF]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header: Dior Savoir-Faire */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[9.5px] tracking-[0.35em] uppercase text-[#777777] font-sans block mb-3">
            SAVOIR-FAIRE & ATELIER
          </span>
          <h2 className="font-editorial text-4xl sm:text-5xl md:text-6xl font-light text-[#000000] tracking-tight mb-4">
            Konstruksi Garmen
          </h2>
          <p className="text-xs sm:text-sm text-[#555555] font-light max-w-lg mx-auto leading-relaxed">
            Menolak kompromi cepat fast-fashion. Setiap helai pakaian Memoedja dirancang dengan ketelitian konstruksi jahitan dan kejujuran material murni.
          </p>
        </div>

        {/* Minimalist Garment Selector (Pure Dior Monochrome Tabs) */}
        <div className="flex items-center justify-start sm:justify-center overflow-x-auto gap-2 pb-3 mb-12 scrollbar-none">
          {PRODUCTS.map((item, idx) => {
            const isSelected = item.id === selectedGarmentId;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setSelectedGarmentId(item.id);
                  setActivePointIndex(0);
                }}
                className={`text-[10px] tracking-[0.2em] uppercase py-2.5 px-5 transition-all whitespace-nowrap border ${
                  isSelected
                    ? "bg-black text-white border-black"
                    : "bg-white text-black border-[#E0E0E0] hover:border-black"
                }`}
              >
                0{idx + 1} • {item.name.split(' ')[0]} {item.weight ? `(${item.weight})` : ''}
              </button>
            );
          })}
        </div>

        {/* Savoir-Faire Worktable Card (Pure White with Crisp Hairlines) */}
        <div className="bg-[#FFFFFF] border border-[#EAEAEA] p-6 sm:p-10 lg:p-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left: Product Images */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <div className="relative aspect-[4/3] overflow-hidden bg-[#F8F8F8] border border-[#EAEAEA]">
              <img
                src={selectedProduct.primaryImage}
                alt={selectedProduct.name}
                className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-102"
              />
              <div className="absolute top-3 left-3 bg-black/85 text-white px-3 py-1 text-[8.5px] tracking-widest uppercase font-mono">
                {selectedProduct.badge}
              </div>
              <div className="absolute bottom-3 right-3 bg-white/90 text-black px-3 py-1 text-[8.5px] tracking-wider uppercase font-mono border border-[#EAEAEA]">
                {selectedProduct.color}
              </div>
            </div>

            {/* Perspectives */}
            <div className="grid grid-cols-3 gap-3">
              {[selectedProduct.primaryImage, selectedProduct.secondaryImage, selectedProduct.detailImage].map((imgUrl, idx) => (
                <div
                  key={idx}
                  className="aspect-[4/3] bg-[#F8F8F8] overflow-hidden border border-[#EAEAEA] cursor-pointer hover:opacity-80 transition-opacity"
                >
                  <img src={imgUrl} alt="Detail" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* Right: Specs & Construction Discipline */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2 font-mono text-[9px] tracking-[0.25em] text-[#777777] uppercase">
                <span>SPECIFICATION</span>
                <span>/</span>
                <span>{selectedProduct.category}</span>
                <span>/</span>
                <span>{selectedProduct.weight}</span>
              </div>

              <h3 className="font-editorial text-2xl sm:text-3xl font-light text-[#000000] leading-snug mb-3">
                {selectedProduct.name}
              </h3>

              <p className="text-xs text-[#555555] leading-relaxed font-light mb-6">
                {selectedProduct.description}
              </p>

              {/* Composition Box */}
              <div className="p-4 bg-[#FAFAFA] border border-[#EAEAEA] mb-6">
                <span className="text-[9px] tracking-[0.25em] uppercase text-[#777777] block font-mono mb-1">
                  FABRIC COMPOSITION
                </span>
                <div className="text-xs font-medium text-[#000000]">
                  {selectedProduct.fabric}
                </div>
                <div className="text-[11px] text-[#666666] mt-1 font-light">
                  Siluet: <span className="font-medium text-[#000000]">{selectedProduct.silhouette}</span>
                </div>
              </div>

              {/* Hotspots */}
              <div className="space-y-2.5">
                <span className="text-[9.5px] tracking-[0.25em] uppercase text-[#000000] font-bold block mb-2 font-mono">
                  CONSTRUCTION DETAILS:
                </span>
                {selectedProduct.constructionDetails.map((detail, index) => {
                  const isActive = activePointIndex === index;
                  return (
                    <div
                      key={detail.title}
                      onClick={() => setActivePointIndex(index)}
                      className={`p-3 border cursor-pointer transition-all ${
                        isActive
                          ? "bg-[#FAFAFA] border-black"
                          : "bg-[#FFFFFF] border-[#EAEAEA] hover:border-[#CCCCCC]"
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-medium text-[#000000] flex items-center gap-2">
                          <CheckCircle2 size={12} className={isActive ? "text-black" : "text-[#BBBBBB]"} />
                          {detail.title}
                        </span>
                        <span className="font-mono text-[9px] text-[#777777]">0{index + 1}</span>
                      </div>
                      {isActive && (
                        <p className="text-[11.5px] text-[#555555] mt-2 pl-5 leading-relaxed font-light animate-fade-in">
                          {detail.desc}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Action Bar */}
            <div className="pt-4 border-t border-[#EAEAEA] flex items-center justify-between gap-4">
              <div>
                <span className="text-[9px] tracking-wider uppercase text-[#777777] font-mono block">PRICE</span>
                <span className="font-editorial text-2xl font-semibold text-[#000000]">
                  {selectedProduct.priceFormatted}
                </span>
              </div>

              <button
                onClick={() => onSelectProductForModal(selectedProduct)}
                className="inline-flex items-center gap-2 bg-black hover:bg-black/80 text-white text-[10px] tracking-[0.25em] uppercase font-normal py-3.5 px-6 transition-colors"
              >
                <Eye size={13} />
                <span>INSPECT & ACQUIRE</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
