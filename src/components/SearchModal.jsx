import React, { useState } from 'react';
import { X, Search, ArrowRight } from 'lucide-react';
import { PRODUCTS } from '../data/products';

export default function SearchModal({ isOpen, onClose, onSelectProduct }) {
  if (!isOpen) return null;

  const [searchQuery, setSearchQuery] = useState("");

  const filtered = PRODUCTS.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.fabric.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.color.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-start justify-center pt-20 px-4 animate-fade-in">
      <div className="relative bg-[#FAF8F5] w-full max-w-2xl rounded-sm shadow-2xl border border-[#DDD6CB] overflow-hidden">
        {/* Search Input Bar */}
        <div className="p-4 md:p-6 border-b border-[#EAE5DC] flex items-center gap-3">
          <Search size={20} className="text-[#857C72]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari pakaian, selvedge denim, chore jacket, atau bahan..."
            className="flex-1 bg-transparent text-sm md:text-base text-[#121212] outline-none font-light placeholder:text-[#A3998E]"
            autoFocus
          />
          <button
            onClick={onClose}
            className="text-[#857C72] hover:text-[#121212] p-1 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Search Results */}
        <div className="p-6 max-h-[60vh] overflow-y-auto divide-y divide-[#EAE5DC]">
          {filtered.length === 0 ? (
            <div className="text-center py-10 text-xs text-[#857C72]">
              Tidak ada pakaian yang cocok dengan pencarian Anda.
            </div>
          ) : (
            filtered.map((product) => (
              <div
                key={product.id}
                onClick={() => {
                  onSelectProduct(product);
                  onClose();
                }}
                className="py-3 flex items-center justify-between gap-4 cursor-pointer hover:bg-[#F2ECE1] px-2 rounded transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-14 bg-[#E0D8CB] rounded-sm overflow-hidden flex-shrink-0">
                    <img src={product.primaryImage} alt={product.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-[#121212] group-hover:text-[#8C4A32] transition-colors">
                      {product.name}
                    </h4>
                    <span className="text-[10px] text-[#777] block font-mono">
                      {product.category} • {product.weight}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs font-semibold text-[#121212]">
                    {product.priceFormatted}
                  </span>
                  <ArrowRight size={14} className="text-[#999] group-hover:text-[#8C4A32] transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
