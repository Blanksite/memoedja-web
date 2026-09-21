import React, { useState } from 'react';
import { X, Sliders, Layers, Package, TrendingUp, Clock } from 'lucide-react';
import { PRODUCTION_STAGES } from '../data/products';

export default function InventoryManager({
  isOpen,
  onClose,
  products,
  onUpdateStock
}) {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState("stock");

  const totalUnits = products.reduce((acc, p) => {
    const pTotal = Object.values(p.stockPerSize || {}).reduce((sum, val) => sum + val, 0);
    return acc + pTotal;
  }, 0);

  const totalInventoryValue = products.reduce((acc, p) => {
    const pTotal = Object.values(p.stockPerSize || {}).reduce((sum, val) => sum + val, 0);
    return acc + pTotal * p.price;
  }, 0);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 md:p-6 animate-fade-in">
      <div className="relative bg-[#FFFFFF] w-full max-w-5xl border border-[#EAEAEA] shadow-2xl overflow-hidden my-auto max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-[#EAEAEA] flex items-center justify-between bg-black text-white">
          <div className="flex items-center gap-3">
            <Sliders size={18} className="text-white" />
            <div>
              <span className="text-[8.5px] tracking-[0.3em] uppercase text-[#AAAAAA] block font-mono">
                INTERNAL OPERATIONS & SUPPLY CHAIN
              </span>
              <h3 className="font-editorial text-2xl font-light text-white">
                Memoedja Inventory & Production Matrix
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-[#AAAAAA] hover:text-white p-2 transition-colors"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        {/* Tab Nav */}
        <div className="flex border-b border-[#EAEAEA] bg-[#FAFAFA] px-6 text-xs tracking-wider uppercase font-medium">
          <button
            onClick={() => setActiveTab("stock")}
            className={`py-3 px-4 border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === "stock"
                ? "border-black text-black bg-white"
                : "border-transparent text-[#777777] hover:text-black"
            }`}
          >
            <Package size={13} />
            <span>Stock Matrix ({totalUnits} Units)</span>
          </button>
          <button
            onClick={() => setActiveTab("production")}
            className={`py-3 px-4 border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === "production"
                ? "border-black text-black bg-white"
                : "border-transparent text-[#777777] hover:text-black"
            }`}
          >
            <Layers size={13} />
            <span>Production Stages</span>
          </button>
          <button
            onClick={() => setActiveTab("economics")}
            className={`py-3 px-4 border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === "economics"
                ? "border-black text-black bg-white"
                : "border-transparent text-[#777777] hover:text-black"
            }`}
          >
            <TrendingUp size={13} />
            <span>Unit Economics & SOM</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1 bg-[#FFFFFF]">
          {activeTab === "stock" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 bg-[#FAFAFA] border border-[#EAEAEA]">
                  <span className="text-[9.5px] uppercase text-[#777777] block font-mono">Total Ready Stock</span>
                  <strong className="text-2xl font-editorial text-black">{totalUnits} Pcs</strong>
                  <span className="text-[9.5px] text-emerald-700 block mt-1">✓ Drop 01 Allocation</span>
                </div>
                <div className="p-4 bg-[#FAFAFA] border border-[#EAEAEA]">
                  <span className="text-[9.5px] uppercase text-[#777777] block font-mono">Inventory Capital</span>
                  <strong className="text-2xl font-editorial text-black font-mono">
                    {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(totalInventoryValue)}
                  </strong>
                  <span className="text-[9.5px] text-[#777777] block mt-1">Retail Value</span>
                </div>
                <div className="p-4 bg-[#FAFAFA] border border-[#EAEAEA]">
                  <span className="text-[9.5px] uppercase text-[#777777] block font-mono">Production Lead</span>
                  <strong className="text-2xl font-editorial text-black">Gustaviano Victor</strong>
                  <span className="text-[9.5px] text-[#777777] block mt-1">Chief of Operation</span>
                </div>
              </div>

              {/* Table */}
              <div className="bg-white border border-[#EAEAEA] overflow-hidden">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-[#FAFAFA] border-b border-[#EAEAEA] text-[#666666] text-[9.5px] uppercase font-mono">
                      <th className="p-3">Garment</th>
                      <th className="p-3">Category</th>
                      <th className="p-3">Price</th>
                      <th className="p-3">Sizes & Live Stock</th>
                      <th className="p-3 text-right">Total SKU</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#EAEAEA]">
                    {products.map((p) => {
                      const skuTotal = Object.values(p.stockPerSize || {}).reduce((a, b) => a + b, 0);
                      return (
                        <tr key={p.id} className="hover:bg-[#FAFAFA]">
                          <td className="p-3">
                            <div className="font-medium text-black">{p.name}</div>
                            <span className="text-[9.5px] text-[#777777] font-mono">{p.id} • {p.weight}</span>
                          </td>
                          <td className="p-3 text-[#555555]">{p.category}</td>
                          <td className="p-3 font-medium text-black font-mono">{p.priceFormatted}</td>
                          <td className="p-3">
                            <div className="flex flex-wrap gap-2 items-center">
                              {p.sizes.map((sz) => {
                                const count = p.stockPerSize?.[sz] || 0;
                                return (
                                  <div
                                    key={sz}
                                    className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-white border border-[#EAEAEA] text-[11px]"
                                  >
                                    <span className="font-semibold text-[#555]">{sz}:</span>
                                    <span className="font-mono font-bold text-black">{count}</span>
                                    <button
                                      type="button"
                                      onClick={() => onUpdateStock(p.id, sz, count - 1)}
                                      className="text-[#999] hover:text-black px-1"
                                    >
                                      -
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => onUpdateStock(p.id, sz, count + 1)}
                                      className="text-[#999] hover:text-black px-1"
                                    >
                                      +
                                    </button>
                                  </div>
                                );
                              })}
                            </div>
                          </td>
                          <td className="p-3 text-right font-mono font-bold text-black">
                            {skuTotal} pcs
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "production" && (
            <div className="space-y-4">
              {PRODUCTION_STAGES.map((st, i) => (
                <div key={st.id} className="p-4 bg-[#FAFAFA] border border-[#EAEAEA] flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 border border-black flex items-center justify-center font-mono text-xs text-black">
                      0{i + 1}
                    </div>
                    <div>
                      <div className="font-medium text-xs text-black">{st.name}</div>
                      <div className="text-[10px] text-[#777777] flex items-center gap-2">
                        <Clock size={11} />
                        <span>{st.date}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 w-1/3">
                    <div className="w-full bg-[#EAEAEA] h-1.5 overflow-hidden">
                      <div
                        className="h-full bg-black"
                        style={{ width: `${st.progress}%` }}
                      />
                    </div>
                    <span className="text-[10.5px] font-mono font-bold text-black min-w-[32px] text-right">
                      {st.progress}%
                    </span>
                  </div>

                  <span className="text-[9.5px] uppercase font-mono tracking-wider font-semibold text-black">
                    {st.status}
                  </span>
                </div>
              ))}
            </div>
          )}

          {activeTab === "economics" && (
            <div className="p-6 bg-[#FAFAFA] border border-[#EAEAEA] space-y-4">
              <span className="text-[9.5px] uppercase tracking-widest text-[#777777] font-mono block">
                UNIT ECONOMICS (SLIDE 9)
              </span>
              <h4 className="font-editorial text-2xl text-black">
                SOM Target: Rp 13 Miliar (3-Year Capture)
              </h4>
              <div className="p-3 bg-white border border-[#EAEAEA] font-mono text-xs text-black">
                10.000 Pelanggan Aktif × 2 Transaksi/Tahun × Rp 650.000 AOV = <strong>Rp 13.000.000.000</strong>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
