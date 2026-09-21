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
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-xs flex items-start justify-center pt-24 px-4 animate-fade-in">
      <div className="relative bg-[#FFFFFF] w-full max-w-2xl border border-[#EAEAEA] shadow-2xl overflow-hidden">
        {/* Input */}
        <div className="p-4 md:p-6 border-b border-[#EAEAEA] flex items-center gap-3">
          <Search size={18} className="text-black" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari pakaian, selvedge denim, chore jacket, atau bahan..."
            className="flex-1 bg-transparent text-sm text-black outline-none font-light placeholder:text-[#999999]"
            autoFocus
          />
          <button
            onClick={onClose}
            className="text-[#777777] hover:text-black p-1 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Results */}
        <div className="p-6 max-h-[60vh] overflow-y-auto divide-y divide-[#EAEAEA] bg-white">
          {filtered.length === 0 ? (
            <div className="text-center py-10 text-xs text-[#777777]">
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
                className="py-3 flex items-center justify-between gap-4 cursor-pointer hover:bg-[#FAFAFA] px-2 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-14 bg-[#F5F5F5] border border-[#EAEAEA] overflow-hidden flex-shrink-0">
                    <img src={product.primaryImage} alt={product.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="text-xs font-normal text-black group-hover:opacity-60 transition-opacity">
                      {product.name}
                    </h4>
                    <span className="text-[9.5px] text-[#777777] block font-mono">
                      {product.category} • {product.weight}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs font-semibold text-black font-mono">
                    {product.priceFormatted}
                  </span>
                  <ArrowRight size={13} className="text-black group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
