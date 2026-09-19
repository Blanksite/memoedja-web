import React, { useState } from 'react';
import { X, Check, Ruler, Truck, RotateCcw, ShieldCheck, Sparkles, ShoppingBag } from 'lucide-react';

export default function ProductDetailModal({ product, isOpen, onClose, onAddToCart }) {
  if (!isOpen || !product) return null;

  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [selectedImage, setSelectedImage] = useState(product.primaryImage);
  const [quantity, setQuantity] = useState(1);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [addedNotice, setAddedNotice] = useState(false);

  const currentStock = product.stockPerSize?.[selectedSize] || 15;

  const handleAdd = () => {
    onAddToCart(product, selectedSize, quantity);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2000);
  };

  const images = [product.primaryImage, product.secondaryImage, product.detailImage].filter(Boolean);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 md:p-6 animate-fade-in">
      <div className="relative bg-[#FAF8F5] w-full max-w-5xl rounded-sm shadow-2xl border border-[#E0D8CB] overflow-hidden my-auto max-h-[90vh] flex flex-col md:flex-row">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 text-[#121212] hover:text-[#8C4A32] p-2 bg-white/80 backdrop-blur-sm rounded-full transition-colors"
          aria-label="Close Modal"
        >
          <X size={20} />
        </button>

        {/* Left Column: Gallery */}
        <div className="md:w-1/2 p-6 bg-[#F4EFE6] flex flex-col justify-between overflow-y-auto">
          <div className="relative aspect-[3/4] rounded-sm overflow-hidden bg-[#E2DBD0] shadow-sm mb-4">
            <img
              src={selectedImage}
              alt={product.name}
              className="w-full h-full object-cover object-center transition-all duration-500"
            />
            <div className="absolute top-3 left-3 bg-[#FAF8F5]/90 px-2.5 py-1 text-[9px] tracking-widest uppercase font-bold text-[#121212]">
              {product.badge}
            </div>
          </div>

          <div className="flex gap-2">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(img)}
                className={`w-20 aspect-square rounded-sm overflow-hidden border-2 transition-all ${
                  selectedImage === img ? "border-[#8C4A32] opacity-100" : "border-transparent opacity-60 hover:opacity-90"
                }`}
              >
                <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Garment Specs & Ordering */}
        <div className="md:w-1/2 p-6 md:p-10 overflow-y-auto flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-[10px] tracking-[0.25em] uppercase text-[#8C4A32] font-semibold mb-2">
              <Sparkles size={12} />
              <span>{product.category} • {product.weight}</span>
            </div>

            <h2 className="font-editorial text-2xl md:text-3xl font-light text-[#121212] mb-3 leading-snug">
              {product.name}
            </h2>

            <div className="text-xl font-semibold text-[#121212] mb-4">
              {product.priceFormatted}
            </div>

            <p className="text-xs text-[#575048] leading-relaxed mb-6 font-light">
              {product.description}
            </p>

            {/* Cultural Reference Box */}
            {product.culturalNote && (
              <div className="p-3.5 bg-[#F2ECE1] border-l-2 border-[#8C4A32] text-xs text-[#4A443D] mb-6 italic font-serif">
                "{product.culturalNote}"
              </div>
            )}

            {/* Size Selector */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-[#121212]">
                  SELECT SIZE
                </span>
                <button
                  type="button"
                  onClick={() => setShowSizeGuide(!showSizeGuide)}
                  className="text-[10px] tracking-wider uppercase text-[#8C4A32] flex items-center gap-1 hover:underline"
                >
                  <Ruler size={12} />
                  <span>Size Chart</span>
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {product.sizes.map((sz) => {
                  const isSelected = selectedSize === sz;
                  return (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className={`min-w-[48px] py-2 px-3 text-xs tracking-wider uppercase font-medium rounded-sm border transition-all ${
                        isSelected
                          ? "bg-[#121212] text-white border-[#121212] shadow-sm"
                          : "bg-white text-[#2A2A2A] border-[#DDD6CB] hover:border-[#8C4A32]"
                      }`}
                    >
                      {sz}
                    </button>
                  );
                })}
              </div>

              {/* Stock Status */}
              <div className="mt-2 text-[11px] text-[#6B635A] flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-600 inline-block" />
                <span>Ready Stock for size {selectedSize}: <strong>{currentStock} units available</strong></span>
              </div>
            </div>

            {/* Size Chart Drawer Toggle */}
            {showSizeGuide && (
              <div className="p-4 bg-white border border-[#DDD6CB] rounded text-xs mb-6 animate-fade-in">
                <span className="font-bold text-[#121212] block mb-2 uppercase tracking-wider text-[10px]">
                  PANDUAN UKURAN (CM)
                </span>
                <table className="w-full text-left text-[11px] border-collapse">
                  <thead>
                    <tr className="border-b border-[#E0D8CB] text-[#857C72]">
                      <th className="py-1">Size</th>
                      <th className="py-1">Waist/Chest</th>
                      <th className="py-1">Length</th>
                      <th className="py-1">Fit Rec.</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-[#F0EBE1]">
                      <td className="py-1 font-medium">S / 28-30</td>
                      <td className="py-1">76-80 cm</td>
                      <td className="py-1">102 cm</td>
                      <td className="py-1">165-172 cm</td>
                    </tr>
                    <tr className="border-b border-[#F0EBE1]">
                      <td className="py-1 font-medium">M / 31-32</td>
                      <td className="py-1">81-85 cm</td>
                      <td className="py-1">104 cm</td>
                      <td className="py-1">170-178 cm</td>
                    </tr>
                    <tr>
                      <td className="py-1 font-medium">L-XL / 34-36</td>
                      <td className="py-1">86-94 cm</td>
                      <td className="py-1">106 cm</td>
                      <td className="py-1">175-185 cm</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            {/* Quantity Selector & Add Button */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center border border-[#DDD6CB] bg-white rounded-sm">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 text-sm text-[#555] hover:text-black"
                >
                  -
                </button>
                <span className="px-3 py-2 text-xs font-semibold text-[#121212] min-w-[32px] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(Math.min(currentStock, quantity + 1))}
                  className="px-3 py-2 text-sm text-[#555] hover:text-black"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAdd}
                className="flex-1 bg-[#121212] hover:bg-[#8C4A32] text-white text-[11px] tracking-[0.25em] uppercase font-semibold py-3.5 px-6 transition-all shadow-md flex items-center justify-center gap-2"
              >
                {addedNotice ? (
                  <>
                    <Check size={14} className="text-emerald-400" />
                    <span>ADDED TO BAG</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag size={14} />
                    <span>ADD TO SHOPPING BAG</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Luxury Perks */}
          <div className="pt-4 border-t border-[#E8E2D8] grid grid-cols-3 gap-2 text-[10px] text-[#6B635A]">
            <div className="flex items-center gap-1.5">
              <Truck size={13} className="text-[#8C4A32]" />
              <span>Free Shipping ID</span>
            </div>
            <div className="flex items-center gap-1.5">
              <RotateCcw size={13} className="text-[#8C4A32]" />
              <span>7-Day Fit Exchange</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck size={13} className="text-[#8C4A32]" />
              <span>Atelier Guarantee</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
