import React, { useState } from 'react';
import { X, Sliders, Layers, Package, TrendingUp, AlertTriangle, CheckCircle2, Clock } from 'lucide-react';
import { PRODUCTION_STAGES } from '../data/products';

export default function InventoryManager({
  isOpen,
  onClose,
  products,
  onUpdateStock
}) {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState("stock"); // "stock" | "production" | "economics"

  // Calculate total inventory units
  const totalUnits = products.reduce((acc, p) => {
    const pTotal = Object.values(p.stockPerSize || {}).reduce((sum, val) => sum + val, 0);
    return acc + pTotal;
  }, 0);

  const totalInventoryValue = products.reduce((acc, p) => {
    const pTotal = Object.values(p.stockPerSize || {}).reduce((sum, val) => sum + val, 0);
    return acc + pTotal * p.price;
  }, 0);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 md:p-6 animate-fade-in">
      <div className="relative bg-[#FAF8F5] w-full max-w-5xl rounded-sm shadow-2xl border border-[#DDD6CB] overflow-hidden my-auto max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-[#EAE5DC] flex items-center justify-between bg-[#121212] text-white">
          <div className="flex items-center gap-3">
            <Sliders size={20} className="text-[#8C4A32]" />
            <div>
              <span className="text-[9px] tracking-[0.3em] uppercase text-[#C4BCB3] block">
                INTERNAL OPERATIONS & SUPPLY CHAIN
              </span>
              <h3 className="font-editorial text-2xl font-light tracking-wide text-white">
                Memoedja Inventory & Production Matrix
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-[#C4BCB3] hover:text-white p-2 transition-colors"
            aria-label="Close Ops Matrix"
          >
            <X size={20} />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-[#EAE5DC] bg-[#F2EDE4] px-6 text-xs tracking-wider uppercase font-semibold">
          <button
            onClick={() => setActiveTab("stock")}
            className={`py-3 px-4 border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === "stock"
                ? "border-[#8C4A32] text-[#121212] bg-[#FAF8F5]"
                : "border-transparent text-[#7A7268] hover:text-[#121212]"
            }`}
          >
            <Package size={14} />
            <span>Stock Matrix per SKU ({totalUnits} Units)</span>
          </button>
          <button
            onClick={() => setActiveTab("production")}
            className={`py-3 px-4 border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === "production"
                ? "border-[#8C4A32] text-[#121212] bg-[#FAF8F5]"
                : "border-transparent text-[#7A7268] hover:text-[#121212]"
            }`}
          >
            <Layers size={14} />
            <span>Production Lifecycle & Stages</span>
          </button>
          <button
            onClick={() => setActiveTab("economics")}
            className={`py-3 px-4 border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === "economics"
                ? "border-[#8C4A32] text-[#121212] bg-[#FAF8F5]"
                : "border-transparent text-[#7A7268] hover:text-[#121212]"
            }`}
          >
            <TrendingUp size={14} />
            <span>Unit Economics & SOM Progress</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 overflow-y-auto flex-1">
          {activeTab === "stock" && (
            <div className="space-y-6">
              {/* Summary KPIs */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 bg-white border border-[#DDD6CB] rounded-sm">
                  <span className="text-[10px] tracking-wider uppercase text-[#777] block">Total Ready Stock</span>
                  <strong className="text-2xl font-editorial text-[#121212]">{totalUnits} Pcs</strong>
                  <span className="text-[10px] text-emerald-700 block mt-1">✓ Prologue Drop 01 Allocation</span>
                </div>
                <div className="p-4 bg-white border border-[#DDD6CB] rounded-sm">
                  <span className="text-[10px] tracking-wider uppercase text-[#777] block">Inventory Capital</span>
                  <strong className="text-2xl font-editorial text-[#8C4A32]">
                    {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(totalInventoryValue)}
                  </strong>
                  <span className="text-[10px] text-[#777] block mt-1">Valuasi Retail Pasar</span>
                </div>
                <div className="p-4 bg-white border border-[#DDD6CB] rounded-sm">
                  <span className="text-[10px] tracking-wider uppercase text-[#777] block">Production Lead</span>
                  <strong className="text-2xl font-editorial text-[#121212]">Gustaviano Victor</strong>
                  <span className="text-[10px] text-[#777] block mt-1">Chief of Operation</span>
                </div>
              </div>

              {/* SKU Stock Matrix Table */}
              <div className="bg-white border border-[#DDD6CB] rounded-sm overflow-hidden">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-[#F7F3EB] border-b border-[#DDD6CB] text-[#555] text-[10px] uppercase tracking-wider">
                      <th className="p-3">Garment / SKU</th>
                      <th className="p-3">Category</th>
                      <th className="p-3">Retail Price</th>
                      <th className="p-3">Sizes & Live Stock Adjuster</th>
                      <th className="p-3 text-right">Total SKU</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#EAE5DC]">
                    {products.map((p) => {
                      const skuTotal = Object.values(p.stockPerSize || {}).reduce((a, b) => a + b, 0);
                      return (
                        <tr key={p.id} className="hover:bg-[#FAF8F5]">
                          <td className="p-3">
                            <div className="font-semibold text-[#121212]">{p.name}</div>
                            <span className="text-[10px] text-[#888] font-mono">{p.id} • {p.weight}</span>
                          </td>
                          <td className="p-3 text-[#555]">{p.category}</td>
                          <td className="p-3 font-semibold text-[#121212]">{p.priceFormatted}</td>
                          <td className="p-3">
                            <div className="flex flex-wrap gap-2 items-center">
                              {p.sizes.map((sz) => {
                                const count = p.stockPerSize?.[sz] || 0;
                                return (
                                  <div
                                    key={sz}
                                    className="inline-flex items-center gap-1.5 px-2 py-1 bg-[#FAF8F5] border border-[#DDD6CB] rounded text-[11px]"
                                  >
                                    <span className="font-bold text-[#555]">{sz}:</span>
                                    <span className={`font-mono font-bold ${count <= 5 ? "text-amber-700" : "text-[#121212]"}`}>
                                      {count}
                                    </span>
                                    <button
                                      type="button"
                                      onClick={() => onUpdateStock(p.id, sz, count - 1)}
                                      className="text-[#999] hover:text-black px-1"
                                      title="Kurangi stok"
                                    >
                                      -
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => onUpdateStock(p.id, sz, count + 1)}
                                      className="text-[#999] hover:text-black px-1"
                                      title="Tambah stok"
                                    >
                                      +
                                    </button>
                                  </div>
                                );
                              })}
                            </div>
                          </td>
                          <td className="p-3 text-right font-mono font-bold text-[#121212]">
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
            <div className="space-y-6">
              <div className="p-4 bg-[#F7F3EB] border border-[#DDD6CB] rounded-sm text-xs text-[#555] leading-relaxed">
                <strong>Alur Disiplin Produksi Memoedja:</strong> Memastikan setiap batch pakaian diproduksi dengan presisi teknis jahitan, koordinasi vendor konveksi terpercaya di Bandung & Solo, serta pengujian QC fisik sebelum pengiriman ke tangan pembeli.
              </div>

              <div className="space-y-3">
                {PRODUCTION_STAGES.map((st, i) => (
                  <div key={st.id} className="p-4 bg-white border border-[#DDD6CB] rounded-sm flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                        st.status === "Completed" ? "bg-emerald-100 text-emerald-800" : st.status === "In Progress" ? "bg-amber-100 text-amber-800" : "bg-stone-100 text-stone-500"
                      }`}>
                        0{i + 1}
                      </div>
                      <div>
                        <div className="font-semibold text-xs text-[#121212]">{st.name}</div>
                        <div className="text-[10px] text-[#777] flex items-center gap-2">
                          <Clock size={11} />
                          <span>{st.date}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 w-1/3">
                      <div className="w-full bg-[#EAE5DD] h-2 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${st.status === "Completed" ? "bg-emerald-600" : "bg-[#8C4A32]"}`}
                          style={{ width: `${st.progress}%` }}
                        />
                      </div>
                      <span className="text-[11px] font-mono font-bold text-[#121212] min-w-[36px] text-right">
                        {st.progress}%
                      </span>
                    </div>

                    <span className={`text-[10px] uppercase tracking-wider font-bold px-2.5 py-1 rounded ${
                      st.status === "Completed" ? "bg-emerald-50 text-emerald-700" : st.status === "In Progress" ? "bg-amber-50 text-amber-700" : "bg-stone-100 text-stone-600"
                    }`}>
                      {st.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "economics" && (
            <div className="space-y-6">
              <div className="p-6 bg-white border border-[#DDD6CB] rounded-sm">
                <span className="text-[10px] uppercase tracking-widest text-[#8C4A32] font-bold block mb-1">
                  BUSINESS MODEL & UNIT ECONOMICS (SLIDE 9)
                </span>
                <h4 className="font-editorial text-2xl text-[#121212] mb-3">
                  SOM Target: Rp 13 Miliar (3-Year Realistic Capture)
                </h4>
                <div className="p-4 bg-[#F7F3EB] rounded font-mono text-xs text-[#333] mb-4">
                  10.000 Active Customers × 2 Annual Purchases × Rp 650.000 AOV = <strong>Rp 13.000.000.000</strong>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                  <div className="p-3 bg-[#FAF8F5] border border-[#E0D8CB] rounded">
                    <span className="text-[10px] uppercase text-[#777] block">TAM (Indonesia Apparel)</span>
                    <strong className="text-base text-[#121212]">± Rp 192 Triliun</strong>
                    <p className="text-[9px] text-[#888] mt-1">BPS Household Clothing Report</p>
                  </div>
                  <div className="p-3 bg-[#FAF8F5] border border-[#E0D8CB] rounded">
                    <span className="text-[10px] uppercase text-[#777] block">SAM (Contemporary Premium)</span>
                    <strong className="text-base text-[#121212]">± Rp 12 Triliun</strong>
                    <p className="text-[9px] text-[#888] mt-1">Jabodetabek & Bali Urbanites</p>
                  </div>
                  <div className="p-3 bg-[#FAF8F5] border border-[#E0D8CB] rounded">
                    <span className="text-[10px] uppercase text-[#777] block">Target SOM Share</span>
                    <strong className="text-base text-[#8C4A32]">&lt; 0.15% of SAM</strong>
                    <p className="text-[9px] text-[#888] mt-1">Fokus pada Loyalitas Komunitas</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
