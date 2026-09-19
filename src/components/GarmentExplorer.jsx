import React, { useState } from 'react';
import { PRODUCTS } from '../data/products';
import { Scissors, CheckCircle2, Eye, Sparkles } from 'lucide-react';

export default function GarmentExplorer({ onSelectProductForModal }) {
  const [selectedGarmentId, setSelectedGarmentId] = useState(PRODUCTS[0].id);
  const selectedProduct = PRODUCTS.find((p) => p.id === selectedGarmentId) || PRODUCTS[0];
  const [activePointIndex, setActivePointIndex] = useState(0);

  return (
    <section id="savoir-faire" className="py-28 px-6 bg-[#EFEAE1] border-b border-[#DDD5C7] paper-texture">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[10px] tracking-[0.4em] uppercase text-[#874229] font-mono block mb-3">
            ATELIER ARCHIVE • SAVOIR-FAIRE
          </span>
          <h2 className="font-editorial text-4xl sm:text-5xl md:text-6xl font-light text-[#191716] tracking-tight mb-4">
            Konstruksi Garmen & Rekayasa Serat
          </h2>
          <p className="text-xs sm:text-sm text-[#6E645A] font-light max-w-xl mx-auto leading-relaxed">
            Menolak kompromi cepat fast-fashion. Setiap helai pakaian Memoedja dirancang dengan konstruksi jahitan berkekuatan tinggi dan kejujuran material murni.
          </p>
        </div>

        {/* Archival Garment Selector Tabs (Aimé Leon Dore Catalog Tabs) */}
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
                className={`text-[10px] tracking-[0.2em] uppercase py-2.5 px-5 font-mono transition-all whitespace-nowrap border ${
                  isSelected
                    ? "bg-[#191716] text-[#F7F4EE] border-[#191716] shadow-sm"
                    : "bg-[#F7F4EE] text-[#5C534A] border-[#DDD5C7] hover:bg-[#EAE4D6]"
                }`}
              >
                0{idx + 1} • {item.name.split(' ')[0]} {item.weight ? `(${item.weight})` : ''}
              </button>
            );
          })}
        </div>

        {/* Garment Studio Worktable Card */}
        <div className="bg-[#F7F4EE] border border-[#DDD5C7] p-6 sm:p-10 lg:p-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center shadow-sm">
          {/* Left: Garment Archival Stills */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <div className="relative aspect-[4/3] overflow-hidden bg-[#D8CEBF] border border-[#DDD5C7]">
              <img
                src={selectedProduct.primaryImage}
                alt={selectedProduct.name}
                className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-103"
              />
              <div className="absolute top-3 left-3 bg-[#191716]/90 backdrop-blur-xs text-[#F7F4EE] px-3 py-1 text-[9px] font-mono tracking-widest uppercase">
                {selectedProduct.badge}
              </div>
              <div className="absolute bottom-3 right-3 bg-[#F7F4EE]/90 backdrop-blur-xs text-[#191716] px-3 py-1 text-[9px] font-mono tracking-wider">
                {selectedProduct.color}
              </div>
            </div>

            {/* Sub Perspectives */}
            <div className="grid grid-cols-3 gap-3">
              {[selectedProduct.primaryImage, selectedProduct.secondaryImage, selectedProduct.detailImage].map((imgUrl, idx) => (
                <div
                  key={idx}
                  className="aspect-[4/3] bg-[#DDD5C7] overflow-hidden border border-[#DDD5C7] cursor-pointer hover:opacity-90 transition-opacity"
                >
                  <img src={imgUrl} alt="Atelier detail" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* Right: Technical Spec Sheet */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2 font-mono text-[9.5px] tracking-[0.25em] text-[#874229] uppercase">
                <span>SPEC SHEET</span>
                <span>/</span>
                <span>{selectedProduct.category}</span>
                <span>/</span>
                <span>{selectedProduct.weight}</span>
              </div>

              <h3 className="font-editorial text-2xl sm:text-3xl font-normal text-[#191716] leading-snug mb-3">
                {selectedProduct.name}
              </h3>

              <p className="text-xs text-[#5C534A] leading-relaxed font-light mb-6">
                {selectedProduct.description}
              </p>

              {/* Fabric Specs Box */}
              <div className="p-4 bg-[#EFEAE1] border border-[#DDD5C7] mb-6">
                <span className="text-[9px] tracking-[0.25em] uppercase text-[#7A7065] block font-mono mb-1">
                  COMPOSITION & PROVENANCE
                </span>
                <div className="text-xs font-medium text-[#191716]">
                  {selectedProduct.fabric}
                </div>
                <div className="text-[11px] text-[#6E645A] mt-1 font-light">
                  Siluet: <span className="font-medium text-[#191716]">{selectedProduct.silhouette}</span>
                </div>
              </div>

              {/* Construction Hotspots (Bode Monograph Style) */}
              <div className="space-y-2.5">
                <span className="text-[9.5px] tracking-[0.25em] uppercase text-[#191716] font-mono font-bold block mb-2">
                  DISCIPLINE DETAILS:
                </span>
                {selectedProduct.constructionDetails.map((detail, index) => {
                  const isActive = activePointIndex === index;
                  return (
                    <div
                      key={detail.title}
                      onClick={() => setActivePointIndex(index)}
                      className={`p-3 border cursor-pointer transition-all ${
                        isActive
                          ? "bg-[#EFEAE1] border-[#874229]"
                          : "bg-[#F7F4EE] border-[#DDD5C7] hover:bg-[#EFEAE1]"
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-[#191716] flex items-center gap-2">
                          <CheckCircle2 size={12} className={isActive ? "text-[#874229]" : "text-[#B8AEA0]"} />
                          {detail.title}
                        </span>
                        <span className="font-mono text-[9px] text-[#874229]">0{index + 1}</span>
                      </div>
                      {isActive && (
                        <p className="text-[11.5px] text-[#5C534A] mt-2 pl-5 leading-relaxed font-light animate-fade-in">
                          {detail.desc}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Action Bar */}
            <div className="pt-4 border-t border-[#DDD5C7] flex items-center justify-between gap-4">
              <div>
                <span className="text-[9px] tracking-wider uppercase text-[#7A7065] font-mono block">RETAIL VALUE</span>
                <span className="font-editorial text-2xl font-semibold text-[#191716]">
                  {selectedProduct.priceFormatted}
                </span>
              </div>

              <button
                onClick={() => onSelectProductForModal(selectedProduct)}
                className="inline-flex items-center gap-2 bg-[#191716] hover:bg-[#874229] text-[#F7F4EE] text-[10px] tracking-[0.25em] uppercase font-mono font-semibold py-3.5 px-6 transition-colors shadow-sm"
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
