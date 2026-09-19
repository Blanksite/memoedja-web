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
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF8F5] border-l border-[#E5DFD4] shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="p-6 border-b border-[#EAE5DC] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag size={18} className="text-[#121212]" />
              <h3 className="font-editorial text-xl font-medium tracking-wider uppercase text-[#121212]">
                SHOPPING BAG
              </h3>
              <span className="text-xs bg-[#EFE9DF] text-[#6B635A] px-2 py-0.5 rounded-full font-mono">
                {items.length}
              </span>
            </div>
            <button
              onClick={onClose}
              className="text-[#575048] hover:text-[#121212] p-1 transition-colors"
              aria-label="Close Bag"
            >
              <X size={20} />
            </button>
          </div>

          {/* Complimentary Shipping Banner */}
          <div className="bg-[#121212] text-[#E8E2D8] text-[10px] tracking-[0.2em] uppercase py-2.5 px-6 text-center">
            COMPLIMENTARY SHIPPING UNLOCKED ACROSS NUSANTARA
          </div>

          {/* Cart Item List */}
          <div className="p-6 overflow-y-auto flex-1 divide-y divide-[#EAE5DC]">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-16">
                <ShoppingBag size={48} className="text-[#DDD6CB] mb-4 stroke-1" />
                <h4 className="font-editorial text-2xl text-[#121212] mb-2 font-light">
                  Your bag is currently empty
                </h4>
                <p className="text-xs text-[#7A7268] max-w-xs mb-6 font-light">
                  Jelajahi rilisan pembuka Tarombo untuk melengkapi pakaian harian dengan karakter abadi.
                </p>
                <button
                  onClick={onClose}
                  className="bg-[#121212] hover:bg-[#8C4A32] text-white text-[10px] tracking-[0.25em] uppercase font-semibold py-3 px-6 transition-colors"
                >
                  DISCOVER TAROMBO
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div key={`${item.product.id}-${item.size}`} className="py-4 flex gap-4">
                  {/* Thumbnail */}
                  <div className="w-20 aspect-[3/4] bg-[#EAE5DD] rounded-sm overflow-hidden flex-shrink-0">
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
                        <h4 className="text-xs font-semibold text-[#121212] leading-snug">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(item.product.id, item.size)}
                          className="text-[#999] hover:text-rose-600 transition-colors"
                          aria-label="Remove item"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>

                      <div className="text-[11px] text-[#7A7268] mt-1 flex items-center gap-2">
                        <span>Size: <strong className="text-[#121212] font-mono">{item.size}</strong></span>
                        <span>•</span>
                        <span>{item.product.weight}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border border-[#DDD6CB] bg-white rounded-sm">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.size, item.quantity - 1)}
                          className="px-2 py-1 text-xs text-[#555] hover:text-black"
                        >
                          -
                        </button>
                        <span className="px-2 py-1 text-xs font-semibold text-[#121212] min-w-[24px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.size, item.quantity + 1)}
                          className="px-2 py-1 text-xs text-[#555] hover:text-black"
                        >
                          +
                        </button>
                      </div>

                      <span className="text-xs font-semibold text-[#121212]">
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

          {/* Footer Checkout Summary */}
          {items.length > 0 && (
            <div className="p-6 border-t border-[#EAE5DC] bg-[#F7F3EB] space-y-4">
              <div className="space-y-1.5 text-xs text-[#5A524A]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-[#121212]">{subtotalFormatted}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping (Indonesia Express)</span>
                  <span className="text-emerald-700 font-semibold uppercase tracking-wider text-[10px]">
                    COMPLIMENTARY
                  </span>
                </div>
                <div className="flex justify-between text-sm pt-2 border-t border-[#E5DFD4] font-semibold text-[#121212]">
                  <span>Total</span>
                  <span className="font-editorial text-lg">{subtotalFormatted}</span>
                </div>
              </div>

              <button
                onClick={() => {
                  onClose();
                  onProceedToCheckout();
                }}
                className="w-full bg-[#121212] hover:bg-[#8C4A32] text-white text-[11px] tracking-[0.25em] uppercase font-semibold py-4 px-6 transition-all shadow-md flex items-center justify-center gap-2 group"
              >
                <span>PROCEED TO CHECKOUT</span>
                <ArrowRight size={14} className="transform group-hover:translate-x-1 transition-transform" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-[#857C72] pt-1">
                <ShieldCheck size={13} className="text-[#8C4A32]" />
                <span>Encrypted 256-Bit Indonesian Payment Gateway</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
