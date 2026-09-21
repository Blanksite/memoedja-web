import React, { useState } from 'react';
import { X, Check, Ruler, Truck, RotateCcw, ShieldCheck, ShoppingBag } from 'lucide-react';

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
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 md:p-6 animate-fade-in">
      <div className="relative bg-[#FFFFFF] w-full max-w-5xl shadow-2xl border border-[#EAEAEA] overflow-hidden my-auto max-h-[90vh] flex flex-col md:flex-row">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 text-black hover:opacity-60 p-2 bg-white/80 backdrop-blur-xs rounded-full transition-opacity"
          aria-label="Close"
        >
          <X size={18} />
        </button>

        {/* Gallery */}
        <div className="md:w-1/2 p-6 bg-[#FAFAFA] flex flex-col justify-between overflow-y-auto border-r border-[#EAEAEA]">
          <div className="relative aspect-[3/4] overflow-hidden bg-[#F0F0F0] border border-[#EAEAEA] mb-4">
            <img
              src={selectedImage}
              alt={product.name}
              className="w-full h-full object-cover object-center transition-all duration-500"
            />
            <div className="absolute top-3 left-3 bg-black/85 text-white px-2.5 py-0.5 text-[8.5px] tracking-widest uppercase font-mono">
              {product.badge}
            </div>
          </div>

          <div className="flex gap-2">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(img)}
                className={`w-16 aspect-square overflow-hidden border transition-all ${
                  selectedImage === img ? "border-black opacity-100" : "border-transparent opacity-50 hover:opacity-80"
                }`}
              >
                <img src={img} alt="Thumb" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Specs & Cart */}
        <div className="md:w-1/2 p-6 md:p-10 overflow-y-auto flex flex-col justify-between bg-[#FFFFFF]">
          <div>
            <span className="text-[9px] tracking-[0.25em] uppercase text-[#777777] font-mono block mb-2">
              {product.category} • {product.weight}
            </span>

            <h2 className="font-editorial text-2xl md:text-3xl font-light text-[#000000] mb-3 leading-snug">
              {product.name}
            </h2>

            <div className="text-xl font-semibold text-[#000000] mb-4 font-mono">
              {product.priceFormatted}
            </div>

            <p className="text-xs text-[#555555] leading-relaxed mb-6 font-light">
              {product.description}
            </p>

            {/* Cultural Note */}
            {product.culturalNote && (
              <div className="p-3.5 bg-[#FAFAFA] border-l-2 border-black text-xs text-[#444444] mb-6 italic font-serif">
                "{product.culturalNote}"
              </div>
            )}

            {/* Size Selector */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[9.5px] tracking-[0.2em] uppercase font-semibold text-[#000000]">
                  SELECT SIZE
                </span>
                <button
                  type="button"
                  onClick={() => setShowSizeGuide(!showSizeGuide)}
                  className="text-[9.5px] tracking-wider uppercase text-[#777777] hover:text-black flex items-center gap-1 underline"
                >
                  <Ruler size={11} />
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
                      className={`min-w-[48px] py-2 px-3 text-xs tracking-wider uppercase font-mono transition-all border ${
                        isSelected
                          ? "bg-black text-white border-black"
                          : "bg-white text-black border-[#E0E0E0] hover:border-black"
                      }`}
                    >
                      {sz}
                    </button>
                  );
                })}
              </div>

              <div className="mt-2 text-[10.5px] text-[#777777] flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 inline-block" />
                <span>Ready Stock size {selectedSize}: <strong>{currentStock} units</strong></span>
              </div>
            </div>

            {/* Size Chart Table */}
            {showSizeGuide && (
              <div className="p-4 bg-[#FAFAFA] border border-[#EAEAEA] text-xs mb-6 animate-fade-in">
                <span className="font-semibold text-black block mb-2 uppercase tracking-wider text-[9px] font-mono">
                  PANDUAN UKURAN (CM)
                </span>
                <table className="w-full text-left text-[11px]">
                  <thead>
                    <tr className="border-b border-[#EAEAEA] text-[#777777]">
                      <th className="py-1">Size</th>
                      <th className="py-1">Waist/Chest</th>
                      <th className="py-1">Length</th>
                      <th className="py-1">Fit</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-[#F5F5F5]">
                      <td className="py-1 font-medium">S / 28-30</td>
                      <td className="py-1">76-80 cm</td>
                      <td className="py-1">102 cm</td>
                      <td className="py-1">165-172 cm</td>
                    </tr>
                    <tr className="border-b border-[#F5F5F5]">
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

            {/* Qty & Add Button */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center border border-[#EAEAEA] bg-white">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 text-xs text-[#777] hover:text-black"
                >
                  -
                </button>
                <span className="px-3 py-2 text-xs font-semibold text-black min-w-[28px] text-center font-mono">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(Math.min(currentStock, quantity + 1))}
                  className="px-3 py-2 text-xs text-[#777] hover:text-black"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAdd}
                className="flex-1 bg-black hover:bg-black/85 text-white text-[10px] tracking-[0.25em] uppercase font-normal py-3.5 px-6 transition-all flex items-center justify-center gap-2"
              >
                {addedNotice ? (
                  <>
                    <Check size={14} />
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

          <div className="pt-4 border-t border-[#EAEAEA] grid grid-cols-3 gap-2 text-[9.5px] text-[#777777]">
            <div className="flex items-center gap-1">
              <Truck size={12} className="text-black" />
              <span>Free Shipping</span>
            </div>
            <div className="flex items-center gap-1">
              <RotateCcw size={12} className="text-black" />
              <span>7-Day Return</span>
            </div>
            <div className="flex items-center gap-1">
              <ShieldCheck size={12} className="text-black" />
              <span>Authentic</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
