import React, { useState } from 'react';
import { 
  DollarSign, Package, Truck, Users, CheckCircle, Clock, 
  Search, Sliders, ChevronRight, X, ExternalLink, RefreshCw, Send, Shield
} from 'lucide-react';
import { PRODUCTS, PRODUCTION_STAGES } from '../../data/products';

// Data Role & Pengguna Default
const ROLES = {
  SUPER_ADMIN: { label: 'Super Admin', color: 'bg-purple-100 text-purple-800 border-purple-200' },
  FINANCE: { label: 'Finance (CFO)', color: 'bg-emerald-100 text-emerald-800 border-emerald-200' },
  OPERATIONS: { label: 'Operations (COO)', color: 'bg-blue-100 text-blue-800 border-blue-200' },
  STAFF: { label: 'Atelier Staff', color: 'bg-neutral-100 text-neutral-800 border-neutral-200' }
};

const USERS = [
  { id: 1, name: 'Ken Koesumo', email: 'ken@memoedja.com', role: 'SUPER_ADMIN', title: 'Creative Director' },
  { id: 2, name: 'Aristo Rafif', email: 'aristo@memoedja.com', role: 'FINANCE', title: 'Chief Financial Officer' },
  { id: 3, name: 'Gustaviano Victor', email: 'gustaviano@memoedja.com', role: 'OPERATIONS', title: 'Chief Operating Officer' },
  { id: 4, name: 'Farra Meilia', email: 'farra@memoedja.com', role: 'STAFF', title: 'Lead Designer' }
];

// Mock Pesanan Awal
const INITIAL_ORDERS = [
  {
    id: 'MMDJ-20261001-9821A',
    customer_name: 'Dimas Arya',
    customer_email: 'dimas.arya@gmail.com',
    customer_phone: '081288992211',
    address_detail: 'Jl. Senopati No. 42, Kebayoran Baru, Jakarta Selatan 12190',
    courier_name: 'JNE',
    courier_service: 'YES',
    shipping_cost: 24000,
    subtotal_amount: 1388000,
    total_amount: 1412000,
    payment_status: 'PAID',
    fulfillment_status: 'PACKING',
    waybill_number: '',
    created_at: '2 jam yang lalu',
    items: [
      { name: 'Selvedge Denim 13 Oz Straight Jeans', size: '32', quantity: 1, price: 689000 },
      { name: 'Cotton Chore Jacket', size: 'L', quantity: 1, price: 699000 }
    ]
  },
  {
    id: 'MMDJ-20261001-7712B',
    customer_name: 'Nathalia Siregar',
    customer_email: 'nathalia@siregar.id',
    customer_phone: '081399881122',
    address_detail: 'Jl. Riau No. 12, Bandung, Jawa Barat 40115',
    courier_name: 'SiCepat',
    courier_service: 'SIUNTUNG',
    shipping_cost: 15000,
    subtotal_amount: 749000,
    total_amount: 764000,
    payment_status: 'PAID',
    fulfillment_status: 'SHIPPED',
    waybill_number: 'SCP-9928172641',
    created_at: '1 hari yang lalu',
    items: [
      { name: 'Denim 15 Oz Bootcut Jeans', size: '30', quantity: 1, price: 749000 }
    ]
  },
  {
    id: 'MMDJ-20261001-4451C',
    customer_name: 'Budi Santoso',
    customer_email: 'budi.santoso@yahoo.com',
    customer_phone: '085711223344',
    address_detail: 'Jl. Darmo No. 88, Wonokromo, Surabaya 60241',
    courier_name: 'J&T Express',
    courier_service: 'EZ',
    shipping_cost: 18000,
    subtotal_amount: 329000,
    total_amount: 347000,
    payment_status: 'PENDING',
    fulfillment_status: 'UNFULFILLED',
    waybill_number: '',
    created_at: '3 jam yang lalu',
    items: [
      { name: 'Cotton Combed Henley Shirt', size: 'XL', quantity: 1, price: 329000 }
    ]
  }
];

export default function AdminDashboard({ isOpen, onClose }) {
  const [currentUser, setCurrentUser] = useState(USERS[0]); // Default Ken Koesumo (Super Admin)
  const [activeTab, setActiveTab] = useState('orders'); // 'overview' | 'orders' | 'inventory' | 'finance' | 'users'
  const [orders, setOrders] = useState(INITIAL_ORDERS);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderFilter, setOrderFilter] = useState('ALL');
  const [waybillInput, setWaybillInput] = useState('');
  const [notifyWa, setNotifyWa] = useState(true);
  const [stockState, setStockState] = useState(PRODUCTS);

  if (!isOpen) return null;

  // Filter orders
  const filteredOrders = orders.filter((o) => {
    if (orderFilter === 'ALL') return true;
    if (orderFilter === 'PAID') return o.payment_status === 'PAID' && o.fulfillment_status !== 'SHIPPED';
    if (orderFilter === 'SHIPPED') return o.fulfillment_status === 'SHIPPED';
    if (orderFilter === 'PENDING') return o.payment_status === 'PENDING';
    return true;
  });

  // Financial stats
  const totalOmset = orders
    .filter((o) => o.payment_status === 'PAID')
    .reduce((sum, o) => sum + o.total_amount, 0);

  const totalPaidOrders = orders.filter((o) => o.payment_status === 'PAID').length;
  const aov = totalPaidOrders > 0 ? Math.round(totalOmset / totalPaidOrders) : 0;

  // Handler: Update Resi / Waybill
  const handleSaveWaybill = (orderId) => {
    if (!waybillInput.trim()) return;

    setOrders((prev) =>
      prev.map((ord) => {
        if (ord.id === orderId) {
          return {
            ...ord,
            waybill_number: waybillInput.trim(),
            fulfillment_status: 'SHIPPED'
          };
        }
        return ord;
      })
    );

    if (notifyWa && selectedOrder) {
      const waNumber = selectedOrder.customer_phone.replace(/^0/, '62');
      const waMsg = encodeURIComponent(
        `Halo ${selectedOrder.customer_name}, pesanan Memoedja #${selectedOrder.id} Anda telah dikirim via ${selectedOrder.courier_name} dengan No. Resi: ${waybillInput.trim()}. Terima kasih atas apresiasi Anda!`
      );
      window.open(`https://wa.me/${waNumber}?text=${waMsg}`, '_blank');
    }

    alert(`Resi ${waybillInput} berhasil disimpan!`);
    setWaybillInput('');
    setSelectedOrder(null);
  };

  // Handler: Update Stock
  const handleStockChange = (productId, size, delta) => {
    setStockState((prev) =>
      prev.map((p) => {
        if (p.id === productId) {
          const current = p.stockPerSize[size] || 0;
          return {
            ...p,
            stockPerSize: {
              ...p.stockPerSize,
              [size]: Math.max(0, current + delta)
            }
          };
        }
        return p;
      })
    );
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div className="bg-[#FAF9F5] border border-neutral-300 w-full max-w-7xl rounded-lg shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Top Bar: Header & User Role Switcher */}
        <div className="bg-[#111111] text-white px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-neutral-800">
          <div className="flex items-center gap-3">
            <span className="font-serif text-xl tracking-[0.2em] uppercase font-light text-white">
              MEMOEDJA
            </span>
            <span className="text-[10px] font-mono tracking-widest uppercase bg-neutral-800 text-neutral-300 px-2 py-0.5 rounded border border-neutral-700">
              ATELIER OPS MATRIX
            </span>
          </div>

          {/* User Role Switcher (Simulasi Multi-Role User Bertingkat) */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-xs">
              <span className="text-[11px] text-neutral-400 font-mono hidden sm:inline">User Login:</span>
              <select
                value={currentUser.id}
                onChange={(e) => {
                  const u = USERS.find((x) => x.id === parseInt(e.target.value));
                  if (u) setCurrentUser(u);
                }}
                className="bg-neutral-800 text-white text-xs px-2.5 py-1.5 rounded border border-neutral-700 outline-none font-medium cursor-pointer"
              >
                {USERS.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.name} — {ROLES[u.role].label}
                  </option>
                ))}
              </select>
              <span className={`text-[10px] px-2 py-0.5 rounded font-mono font-semibold border ${ROLES[currentUser.role].color}`}>
                {ROLES[currentUser.role].label}
              </span>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 text-neutral-400 hover:text-white transition-colors"
              aria-label="Tutup Dashboard"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white border-b border-neutral-200 px-6 flex items-center justify-between overflow-x-auto">
          <div className="flex gap-6 text-xs font-mono tracking-wider uppercase">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-3.5 border-b-2 font-medium transition-all ${
                activeTab === 'overview'
                  ? 'border-black text-black'
                  : 'border-transparent text-neutral-500 hover:text-black'
              }`}
            >
              Overview & Omset
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`py-3.5 border-b-2 font-medium transition-all flex items-center gap-2 ${
                activeTab === 'orders'
                  ? 'border-black text-black'
                  : 'border-transparent text-neutral-500 hover:text-black'
              }`}
            >
              <span>Pesanan ({orders.length})</span>
              {orders.filter((o) => o.payment_status === 'PAID' && !o.waybill_number).length > 0 && (
                <span className="bg-amber-500 text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {orders.filter((o) => o.payment_status === 'PAID' && !o.waybill_number).length}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab('inventory')}
              className={`py-3.5 border-b-2 font-medium transition-all ${
                activeTab === 'inventory'
                  ? 'border-black text-black'
                  : 'border-transparent text-neutral-500 hover:text-black'
              }`}
            >
              Stok & Produksi
            </button>

            {/* Tab Khusus Finance & Super Admin */}
            {(currentUser.role === 'SUPER_ADMIN' || currentUser.role === 'FINANCE') && (
              <button
                onClick={() => setActiveTab('finance')}
                className={`py-3.5 border-b-2 font-medium transition-all ${
                  activeTab === 'finance'
                    ? 'border-black text-black'
                    : 'border-transparent text-neutral-500 hover:text-black'
                }`}
              >
                Rekonsiliasi Midtrans
              </button>
            )}

            {/* Tab Khusus Super Admin */}
            {currentUser.role === 'SUPER_ADMIN' && (
              <button
                onClick={() => setActiveTab('users')}
                className={`py-3.5 border-b-2 font-medium transition-all ${
                  activeTab === 'users'
                    ? 'border-black text-black'
                    : 'border-transparent text-neutral-500 hover:text-black'
                }`}
              >
                Hak Akses Tim (4)
              </button>
            )}
          </div>
        </div>

        {/* Dashboard Main Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">

          {/* TAB 1: OVERVIEW METRICS */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded border border-neutral-200">
                  <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase block mb-1">
                    TOTAL OMSET LUNAS
                  </span>
                  <div className="text-2xl font-serif text-black font-semibold">
                    Rp {totalOmset.toLocaleString('id-ID')}
                  </div>
                  <span className="text-[10px] text-emerald-600 font-mono mt-1 block">
                    ✓ Terverifikasi Midtrans Snap
                  </span>
                </div>

                <div className="bg-white p-5 rounded border border-neutral-200">
                  <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase block mb-1">
                    PESANAN PERLU DIKIRIM
                  </span>
                  <div className="text-2xl font-serif text-amber-600 font-semibold">
                    {orders.filter((o) => o.payment_status === 'PAID' && !o.waybill_number).length} Paket
                  </div>
                  <span className="text-[10px] text-neutral-400 font-mono mt-1 block">
                    Menunggu Resi Biteship
                  </span>
                </div>

                <div className="bg-white p-5 rounded border border-neutral-200">
                  <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase block mb-1">
                    AVERAGE ORDER VALUE (AOV)
                  </span>
                  <div className="text-2xl font-serif text-black font-semibold">
                    Rp {aov.toLocaleString('id-ID')}
                  </div>
                  <span className="text-[10px] text-neutral-400 font-mono mt-1 block">
                    Target Deck: Rp 650.000
                  </span>
                </div>

                <div className="bg-white p-5 rounded border border-neutral-200">
                  <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase block mb-1">
                    TOTAL UNIT GARMEN
                  </span>
                  <div className="text-2xl font-serif text-black font-semibold">
                    {stockState.reduce((sum, p) => sum + Object.values(p.stockPerSize).reduce((a, b) => a + b, 0), 0)} Pcs
                  </div>
                  <span className="text-[10px] text-neutral-400 font-mono mt-1 block">
                    5 SKU Koleksi Tarombo
                  </span>
                </div>
              </div>

              {/* Status Logistik Biteship Live Summary */}
              <div className="bg-white p-6 rounded border border-neutral-200">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-serif text-lg font-medium text-black">
                      Integrasi Logistik Biteship
                    </h3>
                    <p className="text-xs text-neutral-500 font-light">
                      Origin Gudang: Senopati, Kebayoran Baru, Jakarta Selatan (12190)
                    </p>
                  </div>
                  <span className="text-[10px] font-mono bg-blue-50 text-blue-700 px-3 py-1 rounded border border-blue-200 uppercase font-semibold">
                    BITESHIP LIVE READY
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
                  <div className="p-3 bg-neutral-50 rounded border border-neutral-200">
                    <span className="text-neutral-500 block mb-1">KURIR TERSEDIA:</span>
                    <span className="font-semibold text-black">JNE • SiCepat • J&T • Anteraja</span>
                  </div>
                  <div className="p-3 bg-neutral-50 rounded border border-neutral-200">
                    <span className="text-neutral-500 block mb-1">MODE API:</span>
                    <span className="font-semibold text-emerald-600">Sandbox Test (Free Simulation)</span>
                  </div>
                  <div className="p-3 bg-neutral-50 rounded border border-neutral-200">
                    <span className="text-neutral-500 block mb-1">NOTIFIKASI WHATSAPP:</span>
                    <span className="font-semibold text-black">Otomatis Kirim Resi ke Customer</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ORDER MANAGEMENT */}
          {activeTab === 'orders' && (
            <div className="space-y-4">
              {/* Filter Tabs */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-neutral-200">
                <div className="flex gap-2">
                  {[
                    { key: 'ALL', label: 'Semua Pesanan' },
                    { key: 'PAID', label: 'Perlu Dikirim (Lunas)' },
                    { key: 'SHIPPED', label: 'Telah Dikirim' },
                    { key: 'PENDING', label: 'Menunggu Bayar' }
                  ].map((tab) => (
                    <button
                      key={tab.key}
                      onClick={() => setOrderFilter(tab.key)}
                      className={`text-xs px-3 py-1.5 rounded font-mono uppercase transition-colors ${
                        orderFilter === tab.key
                          ? 'bg-black text-white font-semibold'
                          : 'bg-white text-neutral-600 hover:bg-neutral-100 border border-neutral-200'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Table of Orders */}
              <div className="bg-white rounded border border-neutral-200 overflow-x-auto shadow-xs">
                <table className="w-full text-left text-xs">
                  <thead className="bg-neutral-100/70 border-b border-neutral-200 text-neutral-500 font-mono uppercase text-[10px]">
                    <tr>
                      <th className="p-3.5">Invoice ID</th>
                      <th className="p-3.5">Pembeli</th>
                      <th className="p-3.5">Item & Ukuran</th>
                      <th className="p-3.5">Kurir & Ongkir</th>
                      <th className="p-3.5">Total Bayar</th>
                      <th className="p-3.5">Status Pembayaran</th>
                      <th className="p-3.5">Status Pengiriman</th>
                      <th className="p-3.5 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-100 font-sans">
                    {filteredOrders.map((ord) => (
                      <tr key={ord.id} className="hover:bg-neutral-50/80 transition-colors">
                        <td className="p-3.5 font-mono font-medium text-black">
                          {ord.id}
                          <span className="block text-[10px] text-neutral-400 font-normal">{ord.created_at}</span>
                        </td>
                        <td className="p-3.5">
                          <div className="font-medium text-black">{ord.customer_name}</div>
                          <a
                            href={`https://wa.me/${ord.customer_phone.replace(/^0/, '62')}`}
                            target="_blank"
                            rel="noreferrer"
                            className="text-[11px] text-emerald-600 hover:underline flex items-center gap-1 font-mono"
                          >
                            <span>{ord.customer_phone}</span>
                            <ExternalLink size={10} />
                          </a>
                        </td>
                        <td className="p-3.5">
                          {ord.items.map((it, idx) => (
                            <div key={idx} className="text-[11px] text-neutral-700">
                              • {it.name} <span className="font-mono text-neutral-500 font-semibold">(Size {it.size} x{it.quantity})</span>
                            </div>
                          ))}
                        </td>
                        <td className="p-3.5 font-mono text-[11px]">
                          <span className="font-semibold text-black">{ord.courier_name}</span> ({ord.courier_service})
                          <span className="block text-neutral-400">Rp {ord.shipping_cost.toLocaleString('id-ID')}</span>
                        </td>
                        <td className="p-3.5 font-mono font-semibold text-black">
                          Rp {ord.total_amount.toLocaleString('id-ID')}
                        </td>
                        <td className="p-3.5">
                          <span
                            className={`inline-block px-2 py-0.5 rounded text-[10px] font-mono font-semibold uppercase ${
                              ord.payment_status === 'PAID'
                                ? 'bg-emerald-100 text-emerald-800'
                                : ord.payment_status === 'PENDING'
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {ord.payment_status}
                          </span>
                        </td>
                        <td className="p-3.5">
                          {ord.waybill_number ? (
                            <div>
                              <span className="inline-block px-2 py-0.5 rounded text-[10px] font-mono font-semibold uppercase bg-blue-100 text-blue-800">
                                SHIPPED
                              </span>
                              <span className="block font-mono text-[10px] text-neutral-500 mt-0.5">
                                {ord.waybill_number}
                              </span>
                            </div>
                          ) : (
                            <span className="inline-block px-2 py-0.5 rounded text-[10px] font-mono font-semibold uppercase bg-neutral-100 text-neutral-700">
                              {ord.payment_status === 'PAID' ? 'PERLU RESI' : 'MENUNGGU BAYAR'}
                            </span>
                          )}
                        </td>
                        <td className="p-3.5 text-right">
                          <button
                            onClick={() => {
                              setSelectedOrder(ord);
                              setWaybillInput(ord.waybill_number || '');
                            }}
                            className="px-3 py-1 bg-black text-white rounded text-[11px] font-mono hover:bg-neutral-800 transition-colors"
                          >
                            Kelola Resi
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: INVENTORY & ATELIER STAGES */}
          {activeTab === 'inventory' && (
            <div className="space-y-6">
              {/* Product SKU Stock Matrix */}
              <div className="bg-white rounded border border-neutral-200 p-6 shadow-xs">
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-neutral-200">
                  <div>
                    <h3 className="font-serif text-xl font-medium text-black">
                      Matriks Stok Garmen (Koleksi Tarombo)
                    </h3>
                    <p className="text-xs text-neutral-500 font-light">
                      Kelola ketersediaan stok fisik per ukuran. Perubahan tersimpan secara lokal & siap sync ke MySQL.
                    </p>
                  </div>
                  <span className="text-xs font-mono text-neutral-400">
                    Total: {stockState.reduce((sum, p) => sum + Object.values(p.stockPerSize).reduce((a, b) => a + b, 0), 0)} Pcs
                  </span>
                </div>

                <div className="space-y-6">
                  {stockState.map((product) => (
                    <div key={product.id} className="p-4 bg-neutral-50 rounded border border-neutral-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <img
                          src={product.primaryImage}
                          alt={product.name}
                          className="w-14 h-16 object-cover rounded border border-neutral-300"
                        />
                        <div>
                          <h4 className="font-serif text-base font-medium text-black">
                            {product.name}
                          </h4>
                          <span className="text-xs font-mono text-neutral-500">
                            {product.priceFormatted} • {product.weight}
                          </span>
                        </div>
                      </div>

                      {/* Size buttons with counter */}
                      <div className="flex flex-wrap items-center gap-3">
                        {product.sizes.map((sz) => {
                          const count = product.stockPerSize[sz] || 0;
                          return (
                            <div key={sz} className="bg-white border border-neutral-300 rounded px-3 py-1.5 text-center min-w-[70px]">
                              <span className="text-[10px] font-mono text-neutral-400 block">SIZE {sz}</span>
                              <div className="flex items-center justify-center gap-2 mt-0.5">
                                <button
                                  onClick={() => handleStockChange(product.id, sz, -1)}
                                  className="text-neutral-400 hover:text-black font-mono font-bold text-xs"
                                >
                                  -
                                </button>
                                <span className={`font-mono text-xs font-semibold ${count < 15 ? 'text-amber-600' : 'text-black'}`}>
                                  {count}
                                </span>
                                <button
                                  onClick={() => handleStockChange(product.id, sz, 1)}
                                  className="text-neutral-400 hover:text-black font-mono font-bold text-xs"
                                >
                                  +
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Production Batch Pipeline */}
              <div className="bg-white rounded border border-neutral-200 p-6 shadow-xs">
                <h3 className="font-serif text-xl font-medium text-black mb-4">
                  Tahapan Produksi Batch (Atelier Pipeline)
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {PRODUCTION_STAGES.map((stg) => (
                    <div key={stg.id} className="p-4 bg-neutral-50 rounded border border-neutral-200">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-mono text-neutral-400 uppercase">{stg.date}</span>
                        <span
                          className={`text-[9px] font-mono px-2 py-0.5 rounded font-semibold uppercase ${
                            stg.status === 'Completed'
                              ? 'bg-emerald-100 text-emerald-800'
                              : stg.status === 'In Progress'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-neutral-100 text-neutral-600'
                          }`}
                        >
                          {stg.status}
                        </span>
                      </div>
                      <h4 className="font-serif text-sm font-medium text-black">{stg.name}</h4>
                      <div className="w-full bg-neutral-200 h-1.5 rounded-full mt-3 overflow-hidden">
                        <div
                          className="bg-black h-full rounded-full transition-all"
                          style={{ width: `${stg.progress}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: FINANCE & MIDTRANS RECONCILIATION */}
          {activeTab === 'finance' && (currentUser.role === 'SUPER_ADMIN' || currentUser.role === 'FINANCE') && (
            <div className="bg-white rounded border border-neutral-200 p-6 shadow-xs space-y-6">
              <div className="border-b border-neutral-200 pb-4">
                <h3 className="font-serif text-xl font-medium text-black">
                  Rekonsiliasi Keuangan & Midtrans Settlement
                </h3>
                <p className="text-xs text-neutral-500 font-light">
                  Akses khusus divisi Finance (CFO: Aristo Rafif). Verifikasi dana masuk dari QRIS, Virtual Account, & Kartu Kredit.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-neutral-50 rounded border border-neutral-200">
                  <span className="text-[10px] font-mono text-neutral-500 uppercase block mb-1">TOTAL GROSS REVENUE</span>
                  <div className="text-xl font-mono font-bold text-black">
                    Rp {totalOmset.toLocaleString('id-ID')}
                  </div>
                </div>
                <div className="p-4 bg-neutral-50 rounded border border-neutral-200">
                  <span className="text-[10px] font-mono text-neutral-500 uppercase block mb-1">ESTIMASI FEE MIDTRANS (1.5%)</span>
                  <div className="text-xl font-mono font-bold text-neutral-600">
                    Rp {Math.round(totalOmset * 0.015).toLocaleString('id-ID')}
                  </div>
                </div>
                <div className="p-4 bg-neutral-50 rounded border border-neutral-200">
                  <span className="text-[10px] font-mono text-neutral-500 uppercase block mb-1">NET ESTIMASI CAIR KE REKENING</span>
                  <div className="text-xl font-mono font-bold text-emerald-600">
                    Rp {Math.round(totalOmset * 0.985).toLocaleString('id-ID')}
                  </div>
                </div>
              </div>

              <div className="p-4 bg-emerald-50 rounded border border-emerald-200 text-xs text-emerald-800 font-mono">
                ✓ SHA-512 Signature Verification aktif. Tidak ada transaksi fraudulent yang terdeteksi.
              </div>
            </div>
          )}

          {/* TAB 5: USERS & PERMISSIONS */}
          {activeTab === 'users' && currentUser.role === 'SUPER_ADMIN' && (
            <div className="bg-white rounded border border-neutral-200 p-6 shadow-xs space-y-4">
              <div className="border-b border-neutral-200 pb-4">
                <h3 className="font-serif text-xl font-medium text-black">
                  Manajemen Tim & Hak Akses Bertingkat (RBAC)
                </h3>
                <p className="text-xs text-neutral-500 font-light">
                  Daftar pengguna internal dengan pembagian hak akses sesuai divisi kerja Memoedja.
                </p>
              </div>

              <div className="divide-y divide-neutral-100">
                {USERS.map((usr) => (
                  <div key={usr.id} className="py-3 flex items-center justify-between">
                    <div>
                      <div className="font-medium text-black text-sm">{usr.name}</div>
                      <span className="text-xs text-neutral-400 font-mono">{usr.email} • {usr.title}</span>
                    </div>
                    <span className={`text-[10px] font-mono px-3 py-1 rounded font-semibold border ${ROLES[usr.role].color}`}>
                      {ROLES[usr.role].label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Kelola Resi & Kirim WhatsApp */}
        {selectedOrder && (
          <div className="fixed inset-0 z-60 bg-black/60 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg border border-neutral-300 max-w-lg w-full p-6 shadow-2xl space-y-4 animate-fade-in">
              <div className="flex items-center justify-between border-b border-neutral-200 pb-3">
                <h3 className="font-serif text-lg font-medium text-black">
                  Input Resi Pengiriman Biteship
                </h3>
                <button onClick={() => setSelectedOrder(null)} className="text-neutral-400 hover:text-black">
                  <X size={16} />
                </button>
              </div>

              <div className="text-xs space-y-2 bg-neutral-50 p-3 rounded border border-neutral-200 font-mono">
                <div><strong>Invoice:</strong> {selectedOrder.id}</div>
                <div><strong>Customer:</strong> {selectedOrder.customer_name} ({selectedOrder.customer_phone})</div>
                <div><strong>Kurir:</strong> {selectedOrder.courier_name} ({selectedOrder.courier_service})</div>
                <div className="text-neutral-600 truncate"><strong>Alamat:</strong> {selectedOrder.address_detail}</div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono uppercase text-neutral-600 block">
                  Nomor Resi (Waybill Tracking Number)
                </label>
                <input
                  type="text"
                  placeholder="Contoh: JNE88291029312 / SCP9928192"
                  value={waybillInput}
                  onChange={(e) => setWaybillInput(e.target.value)}
                  className="w-full text-xs font-mono p-2.5 border border-neutral-300 rounded focus:border-black outline-none"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="waCheck"
                  checked={notifyWa}
                  onChange={(e) => setNotifyWa(e.target.checked)}
                  className="rounded"
                />
                <label htmlFor="waCheck" className="text-xs text-neutral-700 cursor-pointer">
                  Kirim notifikasi otomatis ke WhatsApp customer setelah disimpan
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-neutral-200">
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="px-4 py-2 text-xs font-mono rounded border border-neutral-300 hover:bg-neutral-100"
                >
                  Batal
                </button>
                <button
                  onClick={() => handleSaveWaybill(selectedOrder.id)}
                  className="px-4 py-2 text-xs font-mono rounded bg-black text-white hover:bg-neutral-800 font-semibold"
                >
                  Simpan & Kirim Paket
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
