import React from 'react';
import { X, Trash2, ArrowRight, ShoppingBag, ShieldCheck } from 'lucide-react';

export default function CartDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout
}) {
  if (!isOpen) return null;

  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const subtotalFormatted = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(subtotal);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fade-in">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FFFFFF] border-l border-[#EAEAEA] shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="p-6 border-b border-[#EAEAEA] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag size={17} className="text-black" />
              <h3 className="font-editorial text-xl font-normal tracking-wider uppercase text-black">
                SHOPPING BAG
              </h3>
              <span className="text-[11px] bg-[#F5F5F5] text-black px-2 py-0.5 font-mono">
                {items.length}
              </span>
            </div>
            <button
              onClick={onClose}
              className="text-[#777777] hover:text-black p-1 transition-colors"
              aria-label="Close"
            >
              <X size={18} />
            </button>
          </div>

          {/* Banner */}
          <div className="bg-[#000000] text-white text-[9.5px] tracking-[0.2em] uppercase py-2 px-6 text-center">
            COMPLIMENTARY SHIPPING ACROSS INDONESIA
          </div>

          {/* Cart Item List */}
          <div className="p-6 overflow-y-auto flex-1 divide-y divide-[#EAEAEA]">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-16">
                <ShoppingBag size={44} className="text-[#DDDDDD] mb-4 stroke-1" />
                <h4 className="font-editorial text-2xl text-black mb-2 font-light">
                  Your bag is empty
                </h4>
                <p className="text-xs text-[#777777] max-w-xs mb-6 font-light">
                  Jelajahi rilisan pembuka Tarombo untuk melengkapi pakaian harian Anda.
                </p>
                <button
                  onClick={onClose}
                  className="bg-black hover:bg-black/80 text-white text-[9.5px] tracking-[0.25em] uppercase font-normal py-3 px-6 transition-colors"
                >
                  DISCOVER TAROMBO
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div key={`${item.product.id}-${item.size}`} className="py-4 flex gap-4">
                  {/* Thumbnail */}
                  <div className="w-20 aspect-[3/4] bg-[#F8F8F8] border border-[#EAEAEA] overflow-hidden flex-shrink-0">
                    <img
                      src={item.product.primaryImage}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-xs font-medium text-black leading-snug">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(item.product.id, item.size)}
                          className="text-[#AAAAAA] hover:text-black transition-colors"
                          aria-label="Remove"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>

                      <div className="text-[10.5px] text-[#777777] mt-1 flex items-center gap-2 font-mono">
                        <span>Size: <strong className="text-black">{item.size}</strong></span>
                        <span>•</span>
                        <span>{item.product.weight}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border border-[#EAEAEA] bg-white">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.size, item.quantity - 1)}
                          className="px-2 py-0.5 text-xs text-[#777] hover:text-black"
                        >
                          -
                        </button>
                        <span className="px-2 py-0.5 text-xs font-medium text-black min-w-[20px] text-center font-mono">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.size, item.quantity + 1)}
                          className="px-2 py-0.5 text-xs text-[#777] hover:text-black"
                        >
                          +
                        </button>
                      </div>

                      <span className="text-xs font-semibold text-black font-mono">
                        {new Intl.NumberFormat('id-ID', {
                          style: 'currency',
                          currency: 'IDR',
                          maximumFractionDigits: 0
                        }).format(item.product.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout */}
          {items.length > 0 && (
            <div className="p-6 border-t border-[#EAEAEA] bg-[#FAFAFA] space-y-4">
              <div className="space-y-1.5 text-xs text-[#555555]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-black font-mono">{subtotalFormatted}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping (Indonesia)</span>
                  <span className="text-emerald-700 font-semibold uppercase tracking-wider text-[9.5px]">
                    COMPLIMENTARY
                  </span>
                </div>
                <div className="flex justify-between text-sm pt-2 border-t border-[#EAEAEA] font-semibold text-black">
                  <span>Total</span>
                  <span className="font-editorial text-lg font-mono">{subtotalFormatted}</span>
                </div>
              </div>

              <button
                onClick={() => {
                  onClose();
                  onProceedToCheckout();
                }}
                className="w-full bg-black hover:bg-black/85 text-white text-[10px] tracking-[0.25em] uppercase font-normal py-4 px-6 transition-all flex items-center justify-center gap-2 group"
              >
                <span>PROCEED TO CHECKOUT</span>
                <ArrowRight size={13} className="transform group-hover:translate-x-1 transition-transform" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[9.5px] text-[#777777]">
                <ShieldCheck size={12} className="text-black" />
                <span>Encrypted 256-Bit Payment Gateway</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
