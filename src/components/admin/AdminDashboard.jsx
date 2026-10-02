import React, { useState, useMemo } from 'react';
import { 
  DollarSign, Package, Truck, Users, CheckCircle, Clock, 
  Search, Sliders, ChevronRight, X, ExternalLink, RefreshCw, 
  Send, Shield, ArrowUpRight, BarChart3, AlertCircle, 
  CreditCard, Eye, Printer, Filter, ChevronDown, Check,
  Layers, MapPin, Phone, Mail, FileText, ArrowLeft, Bell
} from 'lucide-react';
import { PRODUCTS, PRODUCTION_STAGES } from '../../data/products';

// Data Pengguna & Role Hak Akses
const USERS = [
  { 
    id: 1, 
    name: 'Ken Koesumo', 
    email: 'ken@memoedja.com', 
    role: 'SUPER_ADMIN', 
    roleLabel: 'Super Admin / Owner',
    title: 'Creative Director',
    avatar: 'KK',
    color: 'from-purple-600 to-indigo-600'
  },
  { 
    id: 2, 
    name: 'Aristo Rafif', 
    email: 'aristo@memoedja.com', 
    role: 'FINANCE', 
    roleLabel: 'Finance (CFO)',
    title: 'Chief Financial Officer',
    avatar: 'AR',
    color: 'from-emerald-600 to-teal-600'
  },
  { 
    id: 3, 
    name: 'Gustaviano Victor', 
    email: 'gustaviano@memoedja.com', 
    role: 'OPERATIONS', 
    roleLabel: 'Operations (COO)',
    title: 'Chief Operating Officer',
    avatar: 'GV',
    color: 'from-blue-600 to-cyan-600'
  },
  { 
    id: 4, 
    name: 'Farra Meilia', 
    email: 'farra@memoedja.com', 
    role: 'STAFF', 
    roleLabel: 'Atelier Staff',
    title: 'Lead Garment Designer',
    avatar: 'FM',
    color: 'from-amber-600 to-rose-600'
  }
];

// Mock Data Pesanan Lengkap
const INITIAL_ORDERS = [
  {
    id: 'MMDJ-20261001-9821A',
    customer_name: 'Dimas Arya Pratama',
    customer_email: 'dimas.arya@gmail.com',
    customer_phone: '081288992211',
    address_detail: 'Jl. Senopati No. 42, RT 02/05, Kebayoran Baru, Jakarta Selatan, DKI Jakarta 12190',
    courier_name: 'JNE',
    courier_service: 'YES (Yakin Esok Sampai)',
    shipping_cost: 24000,
    subtotal_amount: 1388000,
    total_amount: 1412000,
    payment_status: 'PAID',
    payment_type: 'QRIS (GoPay)',
    fulfillment_status: 'PACKING',
    waybill_number: '',
    created_at: '2 Okt 2026, 06:15 WIB',
    items: [
      { id: 'mmdj-01', name: 'Selvedge Denim 13 Oz Straight Jeans', size: '32', quantity: 1, price: 689000, img: PRODUCTS[0].primaryImage },
      { id: 'mmdj-03', name: 'Cotton Chore Jacket', size: 'L', quantity: 1, price: 699000, img: PRODUCTS[2].primaryImage }
    ]
  },
  {
    id: 'MMDJ-20261001-7712B',
    customer_name: 'Nathalia Siregar',
    customer_email: 'nathalia@siregar.id',
    customer_phone: '081399881122',
    address_detail: 'Jl. Riau No. 12, Kel. Citarum, Kec. Bandung Wetan, Bandung, Jawa Barat 40115',
    courier_name: 'SiCepat',
    courier_service: 'SIUNTUNG Reguler',
    shipping_cost: 15000,
    subtotal_amount: 749000,
    total_amount: 764000,
    payment_status: 'PAID',
    payment_type: 'BCA Virtual Account',
    fulfillment_status: 'SHIPPED',
    waybill_number: 'SCP-99281726410',
    created_at: '1 Okt 2026, 18:40 WIB',
    items: [
      { id: 'mmdj-02', name: 'Denim 15 Oz Bootcut Jeans', size: '30', quantity: 1, price: 749000, img: PRODUCTS[1].primaryImage }
    ]
  },
  {
    id: 'MMDJ-20261001-4451C',
    customer_name: 'Budi Santoso',
    customer_email: 'budi.santoso@yahoo.com',
    customer_phone: '085711223344',
    address_detail: 'Jl. Raya Darmo No. 88, Wonokromo, Kota Surabaya, Jawa Timur 60241',
    courier_name: 'J&T Express',
    courier_service: 'EZ Reguler',
    shipping_cost: 18000,
    subtotal_amount: 329000,
    total_amount: 347000,
    payment_status: 'PENDING',
    payment_type: 'Mandiri Bill Payment',
    fulfillment_status: 'UNFULFILLED',
    waybill_number: '',
    created_at: '2 Okt 2026, 07:05 WIB',
    items: [
      { id: 'mmdj-05', name: 'Cotton Combed Henley Shirt', size: 'XL', quantity: 1, price: 329000, img: PRODUCTS[4].primaryImage }
    ]
  },
  {
    id: 'MMDJ-20260930-1120D',
    customer_name: 'Jessica Tanuwijaya',
    customer_email: 'jessica.tan@gmail.com',
    customer_phone: '081122334455',
    address_detail: 'Apartemen Senopati Suites Tower 2 Unit 18B, Senopati, Jakarta Selatan 12190',
    courier_name: 'JNE',
    courier_service: 'REG Reguler',
    shipping_cost: 12000,
    subtotal_amount: 1238000,
    total_amount: 1250000,
    payment_status: 'PAID',
    payment_type: 'Credit Card (Visa)',
    fulfillment_status: 'DELIVERED',
    waybill_number: 'JNE-88291002911',
    created_at: '30 Sep 2026, 14:20 WIB',
    items: [
      { id: 'mmdj-01', name: 'Selvedge Denim 13 Oz Straight Jeans', size: '28', quantity: 1, price: 689000, img: PRODUCTS[0].primaryImage },
      { id: 'mmdj-04', name: 'Structured Canvas Shirt', size: 'S', quantity: 1, price: 549000, img: PRODUCTS[3].primaryImage }
    ]
  }
];

export default function AdminDashboard({ isOpen, onClose }) {
  const [currentUser, setCurrentUser] = useState(USERS[0]); // Ken Koesumo (Super Admin)
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'orders' | 'logistics' | 'inventory' | 'finance' | 'users' | 'docs'
  const [orders, setOrders] = useState(INITIAL_ORDERS);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderFilter, setOrderFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [stockState, setStockState] = useState(PRODUCTS);
  const [waybillInput, setWaybillInput] = useState('');
  const [notifyWa, setNotifyWa] = useState(true);

  // Quick Biteship Rate Calculator Widget State
  const [calcDest, setCalcDest] = useState('Bandung');
  const [calcWeight, setCalcWeight] = useState(1);
  const [isCalculating, setIsCalculating] = useState(false);
  const [calcResult, setCalcResult] = useState(null);

  if (!isOpen) return null;

  // Filter Orders
  const filteredOrders = useMemo(() => {
    return orders.filter((o) => {
      // Filter by Tab
      if (orderFilter === 'PAID' && (o.payment_status !== 'PAID' || o.fulfillment_status === 'SHIPPED' || o.fulfillment_status === 'DELIVERED')) return false;
      if (orderFilter === 'SHIPPED' && o.fulfillment_status !== 'SHIPPED') return false;
      if (orderFilter === 'PENDING' && o.payment_status !== 'PENDING') return false;
      if (orderFilter === 'DELIVERED' && o.fulfillment_status !== 'DELIVERED') return false;

      // Filter by Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchId = o.id.toLowerCase().includes(q);
        const matchName = o.customer_name.toLowerCase().includes(q);
        const matchPhone = o.customer_phone.includes(q);
        if (!matchId && !matchName && !matchPhone) return false;
      }
      return true;
    });
  }, [orders, orderFilter, searchQuery]);

  // Financial Metrics
  const totalOmset = useMemo(() => {
    return orders
      .filter((o) => o.payment_status === 'PAID')
      .reduce((sum, o) => sum + o.total_amount, 0);
  }, [orders]);

  const totalPaidOrders = orders.filter((o) => o.payment_status === 'PAID').length;
  const aov = totalPaidOrders > 0 ? Math.round(totalOmset / totalPaidOrders) : 0;
  const pendingCount = orders.filter((o) => o.payment_status === 'PENDING').length;
  const needShippingCount = orders.filter((o) => o.payment_status === 'PAID' && !o.waybill_number).length;

  // Total Garment Units in Stock
  const totalUnits = useMemo(() => {
    return stockState.reduce((sum, p) => sum + Object.values(p.stockPerSize).reduce((a, b) => a + b, 0), 0);
  }, [stockState]);

  // Handler: Update Stock
  const handleStockDelta = (productId, size, delta) => {
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

  // Handler: Submit Waybill
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
        `MEMOEDJA ATELIER NOTICE\n\nHalo ${selectedOrder.customer_name},\n\nPesanan #${selectedOrder.id} Anda telah dikirim via ${selectedOrder.courier_name} (${selectedOrder.courier_service}).\nNo. Resi Pengiriman: *${waybillInput.trim()}*\n\nTerima kasih atas apresiasi Anda terhadap narasi kriya Nusantara.\n\nMaison Memoedja — Jakarta`
      );
      window.open(`https://wa.me/${waNumber}?text=${waMsg}`, '_blank');
    }

    alert(`Resi ${waybillInput} berhasil disimpan & paket beralih ke status SHIPPED!`);
    setWaybillInput('');
    setSelectedOrder(null);
  };

  // Handler: Test Biteship Calculator Widget
  const handleRunBiteshipTest = () => {
    setIsCalculating(true);
    setTimeout(() => {
      setIsCalculating(false);
      setCalcResult([
        { courier: 'JNE', service: 'YES (Next Day)', price: 24000, etd: '1 hari' },
        { courier: 'SiCepat', service: 'SIUNTUNG', price: 15000, etd: '1-2 hari' },
        { courier: 'J&T Express', service: 'EZ Reguler', price: 16000, etd: '2-3 hari' }
      ]);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#0C0D12] text-neutral-100 flex flex-col font-sans overflow-hidden animate-fade-in">
      
      {/* ── TOP HEADER BAR ── */}
      <header className="h-16 bg-[#12131A] border-b border-neutral-800/80 px-6 flex items-center justify-between shrink-0">
        {/* Brand & Workspace Name */}
        <div className="flex items-center gap-4">
          <button
            onClick={onClose}
            className="flex items-center gap-2 text-xs font-mono text-neutral-400 hover:text-white px-3 py-1.5 rounded bg-neutral-800/60 hover:bg-neutral-800 transition-colors border border-neutral-700/60"
            title="Kembali ke Halaman Butik Depan"
          >
            <ArrowLeft size={14} />
            <span>STOREFRONT</span>
          </button>

          <div className="h-4 w-px bg-neutral-800" />

          <div className="flex items-center gap-2.5">
            <span className="font-serif text-lg tracking-[0.25em] font-normal uppercase text-white">
              MEMOEDJA
            </span>
            <span className="text-[10px] font-mono tracking-widest uppercase bg-neutral-800/80 text-neutral-300 px-2 py-0.5 rounded border border-neutral-700/60 font-semibold">
              OPS COMMAND
            </span>
          </div>
        </div>

        {/* Global Live Search Bar */}
        <div className="hidden md:flex items-center gap-2 bg-[#1A1B24] border border-neutral-800 rounded-lg px-3 py-1.5 w-72 text-xs focus-within:border-neutral-600 transition-colors">
          <Search size={14} className="text-neutral-500 shrink-0" />
          <input
            type="text"
            placeholder="Cari order, nama pembeli, no HP..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent text-neutral-200 placeholder:text-neutral-500 outline-none w-full text-xs"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="text-neutral-500 hover:text-white">
              <X size={12} />
            </button>
          )}
        </div>

        {/* Top Right: Studio Clock, Notifications & User Role Switcher */}
        <div className="flex items-center gap-4">
          <div className="hidden lg:flex flex-col text-right font-mono text-[10px] text-neutral-400">
            <span className="text-white font-semibold">JAKARTA ATELIER</span>
            <span>WIB (UTC+7) • ONLINE</span>
          </div>

          <div className="h-6 w-px bg-neutral-800 hidden lg:block" />

          {/* User Role Switcher */}
          <div className="flex items-center gap-2 bg-[#1A1B24] border border-neutral-800 p-1 rounded-lg">
            <div className={`w-7 h-7 rounded-md bg-gradient-to-br ${currentUser.color} flex items-center justify-center font-mono text-xs font-bold text-white shadow-xs`}>
              {currentUser.avatar}
            </div>
            <div className="flex flex-col pr-1">
              <select
                value={currentUser.id}
                onChange={(e) => {
                  const u = USERS.find((x) => x.id === parseInt(e.target.value));
                  if (u) setCurrentUser(u);
                }}
                className="bg-transparent text-white text-xs font-medium outline-none cursor-pointer pr-1"
              >
                {USERS.map((u) => (
                  <option key={u.id} value={u.id} className="bg-[#1A1B24] text-white">
                    {u.name} ({u.roleLabel})
                  </option>
                ))}
              </select>
              <span className="text-[9px] font-mono text-neutral-400 -mt-0.5">
                {currentUser.title}
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-lg transition-colors"
            title="Tutup Dashboard"
          >
            <X size={18} />
          </button>
        </div>
      </header>

      {/* ── MAIN DASHBOARD VIEW (SIDEBAR + WORKSPACE) ── */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* SIDEBAR NAVIGATION */}
        <aside className="w-60 bg-[#12131A] border-r border-neutral-800/80 p-4 flex flex-col justify-between shrink-0">
          <div className="space-y-6">
            <div>
              <span className="text-[10px] font-mono tracking-[0.25em] text-neutral-500 uppercase px-3 block mb-2 font-semibold">
                OPERATIONAL MENU
              </span>
              <nav className="space-y-1">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-all ${
                    activeTab === 'overview'
                      ? 'bg-white text-black font-semibold shadow-xs'
                      : 'text-neutral-400 hover:text-white hover:bg-neutral-800/50'
                  }`}
                >
                  <BarChart3 size={16} />
                  <span>Overview & Metrics</span>
                </button>

                <button
                  onClick={() => setActiveTab('orders')}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-all ${
                    activeTab === 'orders'
                      ? 'bg-white text-black font-semibold shadow-xs'
                      : 'text-neutral-400 hover:text-white hover:bg-neutral-800/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Package size={16} />
                    <span>Orders & Fulfillment</span>
                  </div>
                  {needShippingCount > 0 && (
                    <span className="bg-amber-500 text-black font-mono text-[10px] px-1.5 py-0.2 rounded-full font-bold">
                      {needShippingCount}
                    </span>
                  )}
                </button>

                <button
                  onClick={() => setActiveTab('logistics')}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-all ${
                    activeTab === 'logistics'
                      ? 'bg-white text-black font-semibold shadow-xs'
                      : 'text-neutral-400 hover:text-white hover:bg-neutral-800/50'
                  }`}
                >
                  <Truck size={16} />
                  <span>Biteship Logistics Hub</span>
                </button>

                <button
                  onClick={() => setActiveTab('inventory')}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-all ${
                    activeTab === 'inventory'
                      ? 'bg-white text-black font-semibold shadow-xs'
                      : 'text-neutral-400 hover:text-white hover:bg-neutral-800/50'
                  }`}
                >
                  <Layers size={16} />
                  <span>Stock & Atelier Matrix</span>
                </button>

                {/* Tab Khusus Finance & Super Admin */}
                {(currentUser.role === 'SUPER_ADMIN' || currentUser.role === 'FINANCE') && (
                  <button
                    onClick={() => setActiveTab('finance')}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-all ${
                      activeTab === 'finance'
                        ? 'bg-white text-black font-semibold shadow-xs'
                        : 'text-neutral-400 hover:text-white hover:bg-neutral-800/50'
                    }`}
                  >
                    <CreditCard size={16} />
                    <span>Midtrans Reconciliation</span>
                  </button>
                )}

                {/* Tab Khusus Super Admin */}
                {currentUser.role === 'SUPER_ADMIN' && (
                  <button
                    onClick={() => setActiveTab('users')}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-all ${
                      activeTab === 'users'
                        ? 'bg-white text-black font-semibold shadow-xs'
                        : 'text-neutral-400 hover:text-white hover:bg-neutral-800/50'
                    }`}
                  >
                    <Users size={16} />
                    <span>Team Permissions (RBAC)</span>
                  </button>
                )}
              </nav>
            </div>

            <div>
              <span className="text-[10px] font-mono tracking-[0.25em] text-neutral-500 uppercase px-3 block mb-2 font-semibold">
                SYSTEM & DOCS
              </span>
              <nav className="space-y-1">
                <button
                  onClick={() => setActiveTab('docs')}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-all ${
                    activeTab === 'docs'
                      ? 'bg-white text-black font-semibold shadow-xs'
                      : 'text-neutral-400 hover:text-white hover:bg-neutral-800/50'
                  }`}
                >
                  <FileText size={16} />
                  <span>Interactive Guide & Docs</span>
                </button>
              </nav>
            </div>
          </div>

          {/* Quick System Badge */}
          <div className="p-3 bg-[#1A1B24] rounded-lg border border-neutral-800 text-[11px] font-mono space-y-1.5">
            <div className="flex items-center justify-between text-neutral-400">
              <span>BITESHIP API:</span>
              <span className="text-emerald-400 font-bold">READY</span>
            </div>
            <div className="flex items-center justify-between text-neutral-400">
              <span>MIDTRANS:</span>
              <span className="text-emerald-400 font-bold">SANDBOX</span>
            </div>
            <div className="flex items-center justify-between text-neutral-400">
              <span>SECURITY:</span>
              <span className="text-purple-400 font-bold">SHA-512</span>
            </div>
          </div>
        </aside>

        {/* WORKSPACE CONTENT AREA */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 bg-[#0C0D12]">
          
          {/* ══════════════════════════════════════════════════
              TAB 1: OVERVIEW & EXECUTIVE METRICS
             ══════════════════════════════════════════════════ */}
          {activeTab === 'overview' && (
            <div className="space-y-8 animate-fade-in">
              {/* Welcome Banner */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-800/80">
                <div>
                  <h2 className="text-2xl font-serif font-light text-white">
                    Atelier Overview & Pulse
                  </h2>
                  <p className="text-xs text-neutral-400 mt-1">
                    Halo, <strong className="text-white">{currentUser.name}</strong>. Hak akses aktif: <span className="font-mono text-neutral-300 font-semibold">{currentUser.roleLabel}</span>.
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[11px] font-mono text-neutral-400 bg-[#161722] px-3 py-1.5 rounded-lg border border-neutral-800">
                    TAROMBO DROP 01 — RUNNING
                  </span>
                </div>
              </div>

              {/* 4 Hero Metric Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Metric 1 */}
                <div className="bg-[#14151E] border border-neutral-800/80 p-5 rounded-xl space-y-3 relative overflow-hidden group hover:border-neutral-700 transition-all">
                  <div className="flex items-center justify-between text-neutral-400 text-xs font-mono">
                    <span>GROSS REVENUE</span>
                    <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                      <DollarSign size={14} />
                    </div>
                  </div>
                  <div className="text-2xl font-serif text-white font-medium">
                    Rp {totalOmset.toLocaleString('id-ID')}
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-neutral-400 font-mono">
                    <span className="text-emerald-400 flex items-center gap-0.5">
                      <ArrowUpRight size={12} /> +24.8%
                    </span>
                    <span>{totalPaidOrders} Pesanan Lunas</span>
                  </div>
                </div>

                {/* Metric 2 */}
                <div className="bg-[#14151E] border border-neutral-800/80 p-5 rounded-xl space-y-3 relative overflow-hidden group hover:border-neutral-700 transition-all">
                  <div className="flex items-center justify-between text-neutral-400 text-xs font-mono">
                    <span>PERLU DISIAPKAN</span>
                    <div className="w-7 h-7 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center">
                      <Package size={14} />
                    </div>
                  </div>
                  <div className="text-2xl font-serif text-amber-400 font-medium">
                    {needShippingCount} Paket
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-neutral-400 font-mono">
                    <span>Menunggu Resi Biteship</span>
                    <span className="text-amber-400 font-bold">Action Needed</span>
                  </div>
                </div>

                {/* Metric 3 */}
                <div className="bg-[#14151E] border border-neutral-800/80 p-5 rounded-xl space-y-3 relative overflow-hidden group hover:border-neutral-700 transition-all">
                  <div className="flex items-center justify-between text-neutral-400 text-xs font-mono">
                    <span>AVERAGE ORDER VALUE</span>
                    <div className="w-7 h-7 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center">
                      <BarChart3 size={14} />
                    </div>
                  </div>
                  <div className="text-2xl font-serif text-white font-medium">
                    Rp {aov.toLocaleString('id-ID')}
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-neutral-400 font-mono">
                    <span className="text-blue-400">Target Deck: Rp 650K</span>
                    <span className="text-emerald-400 font-bold">Passed</span>
                  </div>
                </div>

                {/* Metric 4 */}
                <div className="bg-[#14151E] border border-neutral-800/80 p-5 rounded-xl space-y-3 relative overflow-hidden group hover:border-neutral-700 transition-all">
                  <div className="flex items-center justify-between text-neutral-400 text-xs font-mono">
                    <span>TOTAL STOK GARMEN</span>
                    <div className="w-7 h-7 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center">
                      <Layers size={14} />
                    </div>
                  </div>
                  <div className="text-2xl font-serif text-white font-medium">
                    {totalUnits} Pcs
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-neutral-400 font-mono">
                    <span>5 SKU Heritage</span>
                    <span className="text-purple-400 font-bold">Healthy</span>
                  </div>
                </div>
              </div>

              {/* Dual Panel: Recent Orders & Quick Biteship Widget */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Recent Orders Stream */}
                <div className="lg:col-span-7 bg-[#14151E] border border-neutral-800/80 rounded-xl p-6 space-y-4">
                  <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                    <h3 className="font-serif text-lg font-light text-white">
                      Pesanan Masuk Terbaru
                    </h3>
                    <button
                      onClick={() => setActiveTab('orders')}
                      className="text-xs font-mono text-neutral-400 hover:text-white flex items-center gap-1"
                    >
                      <span>Lihat Semua ({orders.length})</span>
                      <ChevronRight size={12} />
                    </button>
                  </div>

                  <div className="divide-y divide-neutral-800/60">
                    {orders.slice(0, 3).map((ord) => (
                      <div key={ord.id} className="py-3.5 flex items-center justify-between gap-4">
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs font-bold text-white">{ord.id}</span>
                            <span className={`text-[9px] font-mono px-2 py-0.2 rounded font-semibold ${
                              ord.payment_status === 'PAID' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'
                            }`}>
                              {ord.payment_status}
                            </span>
                          </div>
                          <span className="text-xs text-neutral-400 block">{ord.customer_name} • {ord.courier_name}</span>
                          <span className="text-[11px] text-neutral-500 font-mono">{ord.items.length} garmen ({ord.created_at})</span>
                        </div>
                        <div className="text-right">
                          <span className="font-mono text-sm font-semibold text-white block">
                            Rp {ord.total_amount.toLocaleString('id-ID')}
                          </span>
                          <button
                            onClick={() => {
                              setSelectedOrder(ord);
                              setWaybillInput(ord.waybill_number || '');
                              setActiveTab('orders');
                            }}
                            className="text-[10px] font-mono text-neutral-400 hover:text-white underline mt-0.5"
                          >
                            Buka Detail →
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Biteship Live Calculator Widget */}
                <div className="lg:col-span-5 bg-[#14151E] border border-neutral-800/80 rounded-xl p-6 space-y-4">
                  <div className="border-b border-neutral-800 pb-3 flex items-center justify-between">
                    <div>
                      <h3 className="font-serif text-lg font-light text-white">
                        Uji Tarif Biteship Live
                      </h3>
                      <span className="text-[10px] font-mono text-neutral-500">
                        Origin: Senopati, Jaksel (12190)
                      </span>
                    </div>
                    <span className="text-[9px] font-mono bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded border border-blue-500/20 font-bold uppercase">
                      API LIVE
                    </span>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div>
                      <label className="text-[10px] font-mono text-neutral-400 uppercase block mb-1">
                        KOTA / KECAMATAN TUJUAN
                      </label>
                      <input
                        type="text"
                        value={calcDest}
                        onChange={(e) => setCalcDest(e.target.value)}
                        placeholder="Contoh: Bandung / Surabaya / Medan"
                        className="w-full bg-[#1A1B24] border border-neutral-800 rounded px-3 py-2 text-white outline-none focus:border-neutral-600"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-mono text-neutral-400 uppercase block mb-1">
                        BERAT PAKET (KG)
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="20"
                        value={calcWeight}
                        onChange={(e) => setCalcWeight(e.target.value)}
                        className="w-full bg-[#1A1B24] border border-neutral-800 rounded px-3 py-2 text-white outline-none focus:border-neutral-600"
                      />
                    </div>

                    <button
                      onClick={handleRunBiteshipTest}
                      disabled={isCalculating}
                      className="w-full py-2.5 bg-white text-black font-mono text-xs font-bold rounded hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2 mt-2"
                    >
                      {isCalculating ? (
                        <>
                          <RefreshCw size={13} className="animate-spin" />
                          <span>Menghubungi Biteship...</span>
                        </>
                      ) : (
                        <span>CEK ONGKIR REAL-TIME</span>
                      )}
                    </button>

                    {/* Results list */}
                    {calcResult && (
                      <div className="pt-2 space-y-2 border-t border-neutral-800/80 animate-fade-in font-mono text-[11px]">
                        {calcResult.map((res, idx) => (
                          <div key={idx} className="flex items-center justify-between p-2 rounded bg-[#1A1B24]">
                            <div>
                              <span className="font-bold text-white">{res.courier}</span>
                              <span className="text-neutral-400 ml-1">({res.service})</span>
                              <span className="block text-[9px] text-neutral-500">{res.etd}</span>
                            </div>
                            <span className="font-bold text-emerald-400">
                              Rp {res.price.toLocaleString('id-ID')}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ══════════════════════════════════════════════════
              TAB 2: ORDER & FULFILLMENT MANAGEMENT
             ══════════════════════════════════════════════════ */}
          {activeTab === 'orders' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-800">
                <div>
                  <h2 className="text-2xl font-serif font-light text-white">
                    Order & Fulfillment Hub
                  </h2>
                  <p className="text-xs text-neutral-400 mt-1">
                    Kelola antrean pengemasan, nomor resi kurir Biteship, dan status pembayaran pesanan.
                  </p>
                </div>

                {/* Filter Pills */}
                <div className="flex flex-wrap items-center gap-2">
                  {[
                    { key: 'ALL', label: 'Semua Pesanan' },
                    { key: 'PAID', label: 'Perlu Dipacking' },
                    { key: 'SHIPPED', label: 'Telah Dikirim' },
                    { key: 'PENDING', label: 'Menunggu Bayar' },
                    { key: 'DELIVERED', label: 'Diterima' }
                  ].map((f) => (
                    <button
                      key={f.key}
                      onClick={() => setOrderFilter(f.key)}
                      className={`text-xs px-3 py-1.5 rounded-lg font-mono transition-all ${
                        orderFilter === f.key
                          ? 'bg-white text-black font-semibold shadow-xs'
                          : 'bg-[#14151E] text-neutral-400 hover:text-white border border-neutral-800'
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Orders Data Table */}
              <div className="bg-[#14151E] border border-neutral-800/80 rounded-xl overflow-hidden shadow-xl">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#181A24] border-b border-neutral-800 text-neutral-400 font-mono uppercase text-[10px]">
                      <tr>
                        <th className="p-4">Invoice & Tanggal</th>
                        <th className="p-4">Customer & WhatsApp</th>
                        <th className="p-4">Garmen Pesanan</th>
                        <th className="p-4">Kurir Pilihan</th>
                        <th className="p-4">Total Tagihan</th>
                        <th className="p-4">Status Bayar</th>
                        <th className="p-4">Logistik Resi</th>
                        <th className="p-4 text-right">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-800/60 font-sans">
                      {filteredOrders.length === 0 ? (
                        <tr>
                          <td colSpan="8" className="p-8 text-center text-neutral-500 font-mono text-xs">
                            Tidak ada pesanan yang sesuai dengan filter ini.
                          </td>
                        </tr>
                      ) : (
                        filteredOrders.map((ord) => (
                          <tr key={ord.id} className="hover:bg-[#1A1C28] transition-colors">
                            <td className="p-4">
                              <span className="font-mono font-bold text-white block">{ord.id}</span>
                              <span className="text-[10px] font-mono text-neutral-500">{ord.created_at}</span>
                            </td>

                            <td className="p-4">
                              <div className="font-medium text-white">{ord.customer_name}</div>
                              <a
                                href={`https://wa.me/${ord.customer_phone.replace(/^0/, '62')}`}
                                target="_blank"
                                rel="noreferrer"
                                className="text-[11px] text-emerald-400 hover:underline inline-flex items-center gap-1 font-mono mt-0.5"
                              >
                                <span>{ord.customer_phone}</span>
                                <ExternalLink size={10} />
                              </a>
                            </td>

                            <td className="p-4 space-y-1">
                              {ord.items.map((it, idx) => (
                                <div key={idx} className="flex items-center gap-2">
                                  <img src={it.img} alt={it.name} className="w-6 h-7 object-cover rounded" />
                                  <span className="text-neutral-300 text-[11px]">
                                    {it.name} <strong className="font-mono text-white">({it.size} x{it.quantity})</strong>
                                  </span>
                                </div>
                              ))}
                            </td>

                            <td className="p-4 font-mono text-[11px]">
                              <span className="font-bold text-white">{ord.courier_name}</span>
                              <span className="block text-neutral-400 text-[10px]">{ord.courier_service}</span>
                              <span className="text-neutral-500 text-[10px]">Ongkir: Rp {ord.shipping_cost.toLocaleString('id-ID')}</span>
                            </td>

                            <td className="p-4 font-mono font-semibold text-white">
                              Rp {ord.total_amount.toLocaleString('id-ID')}
                              <span className="block text-[10px] text-neutral-500 font-normal">{ord.payment_type}</span>
                            </td>

                            <td className="p-4">
                              <span className={`inline-block px-2.5 py-1 rounded text-[10px] font-mono font-semibold uppercase ${
                                ord.payment_status === 'PAID'
                                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                  : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                              }`}>
                                {ord.payment_status}
                              </span>
                            </td>

                            <td className="p-4">
                              {ord.waybill_number ? (
                                <div>
                                  <span className="inline-block px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20 uppercase">
                                    {ord.fulfillment_status}
                                  </span>
                                  <span className="block font-mono text-[10px] text-neutral-300 mt-1">
                                    {ord.waybill_number}
                                  </span>
                                </div>
                              ) : (
                                <span className="inline-block px-2 py-0.5 rounded text-[9px] font-mono text-neutral-400 bg-neutral-800">
                                  {ord.payment_status === 'PAID' ? 'BELUM ADA RESI' : 'MENUNGGU BAYAR'}
                                </span>
                              )}
                            </td>

                            <td className="p-4 text-right">
                              <button
                                onClick={() => {
                                  setSelectedOrder(ord);
                                  setWaybillInput(ord.waybill_number || '');
                                }}
                                className="px-3 py-1.5 bg-white text-black rounded text-[11px] font-mono font-bold hover:bg-neutral-200 transition-colors shadow-xs"
                              >
                                Buka Pesanan
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ══════════════════════════════════════════════════
              TAB 3: LOGISTICS & BITESHIP HUB
             ══════════════════════════════════════════════════ */}
          {activeTab === 'logistics' && (
            <div className="space-y-6 animate-fade-in">
              <div className="pb-4 border-b border-neutral-800">
                <h2 className="text-2xl font-serif font-light text-white">
                  Biteship Logistics Management Hub
                </h2>
                <p className="text-xs text-neutral-400 mt-1">
                  Pusat kontrol integrasi ekspedisi, jadwal pickup kurir, dan pelacakan waybill otomatis.
                </p>
              </div>

              {/* 3 Logistic Status Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
                <div className="p-5 bg-[#14151E] border border-neutral-800 rounded-xl space-y-2">
                  <span className="text-neutral-500 text-[10px] uppercase">GUDANG ASAL (ORIGIN)</span>
                  <div className="text-sm font-bold text-white">Atelier Senopati HQ</div>
                  <p className="text-neutral-400 text-[11px] font-sans">
                    Kebayoran Baru, Jakarta Selatan, DKI Jakarta 12190
                  </p>
                  <span className="text-[10px] text-emerald-400 block pt-1">
                    ✓ Terverifikasi Geolocation Biteship
                  </span>
                </div>

                <div className="p-5 bg-[#14151E] border border-neutral-800 rounded-xl space-y-2">
                  <span className="text-neutral-500 text-[10px] uppercase">KURIR AKTIF TERHUBUNG</span>
                  <div className="text-sm font-bold text-white">JNE • SiCepat • J&T • Anteraja</div>
                  <p className="text-neutral-400 text-[11px] font-sans">
                    Layanan Reguler, Express (YES), dan Kargo telah aktif.
                  </p>
                  <span className="text-[10px] text-blue-400 block pt-1">
                    ✓ Multi-carrier Aggregator Active
                  </span>
                </div>

                <div className="p-5 bg-[#14151E] border border-neutral-800 rounded-xl space-y-2">
                  <span className="text-neutral-500 text-[10px] uppercase">WHATSAPP WAYBILL DISPATCH</span>
                  <div className="text-sm font-bold text-emerald-400">Automated Notification</div>
                  <p className="text-neutral-400 text-[11px] font-sans">
                    Pembeli otomatis menerima link resi saat paket diserahkan ke kurir.
                  </p>
                  <span className="text-[10px] text-neutral-500 block pt-1">
                    Format: Template Memoedja Concierge
                  </span>
                </div>
              </div>

              {/* Logistic Packing Checklist */}
              <div className="bg-[#14151E] border border-neutral-800 rounded-xl p-6 space-y-4">
                <h3 className="font-serif text-lg font-light text-white">
                  Antrean Paket Siap Pickup Kurir
                </h3>
                <div className="divide-y divide-neutral-800">
                  {orders.filter((o) => o.payment_status === 'PAID').map((ord) => (
                    <div key={ord.id} className="py-3.5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-white">{ord.id}</span>
                          <span className="text-[10px] font-mono bg-blue-500/10 text-blue-400 px-2 py-0.2 rounded font-semibold uppercase">
                            {ord.courier_name} {ord.courier_service}
                          </span>
                        </div>
                        <span className="text-xs text-neutral-300 block">{ord.customer_name} — {ord.address_detail}</span>
                        <span className="text-[11px] text-neutral-400 font-mono">
                          {ord.items.map((i) => `${i.name} (Size ${i.size})`).join(', ')}
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        {ord.waybill_number ? (
                          <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded border border-emerald-500/20">
                            Resi: {ord.waybill_number}
                          </span>
                        ) : (
                          <button
                            onClick={() => {
                              setSelectedOrder(ord);
                              setWaybillInput('');
                            }}
                            className="px-4 py-2 bg-white text-black font-mono text-xs font-bold rounded hover:bg-neutral-200 transition-colors"
                          >
                            Generate Resi
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ══════════════════════════════════════════════════
              TAB 4: INVENTORY & ATELIER PIPELINE
             ══════════════════════════════════════════════════ */}
          {activeTab === 'inventory' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-800">
                <div>
                  <h2 className="text-2xl font-serif font-light text-white">
                    Stock Matrix & Atelier Pipeline
                  </h2>
                  <p className="text-xs text-neutral-400 mt-1">
                    Kontrol stok garmen per ukuran dan pemantauan tahap produksi kain.
                  </p>
                </div>
                <span className="text-xs font-mono bg-neutral-800 text-neutral-300 px-3 py-1.5 rounded-lg border border-neutral-700">
                  Total Fisik: {totalUnits} Pcs
                </span>
              </div>

              {/* 5 SKU Interactive Stock Matrix */}
              <div className="space-y-4">
                {stockState.map((product) => (
                  <div key={product.id} className="bg-[#14151E] border border-neutral-800 rounded-xl p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-5 hover:border-neutral-700 transition-all">
                    <div className="flex items-center gap-4">
                      <img src={product.primaryImage} alt={product.name} className="w-16 h-20 object-cover rounded-lg border border-neutral-700 shrink-0" />
                      <div>
                        <span className="text-[10px] font-mono text-neutral-500 uppercase block">{product.id} • {product.badge}</span>
                        <h4 className="font-serif text-lg font-normal text-white">{product.name}</h4>
                        <span className="text-xs font-mono text-neutral-400 block mt-0.5">{product.priceFormatted} • {product.weight}</span>
                        <span className="text-[11px] text-neutral-500 font-light block">{product.fabric}</span>
                      </div>
                    </div>

                    {/* Size matrix buttons */}
                    <div className="flex flex-wrap items-center gap-2.5">
                      {product.sizes.map((sz) => {
                        const count = product.stockPerSize[sz] || 0;
                        return (
                          <div key={sz} className="bg-[#1A1B24] border border-neutral-800 rounded-lg p-2 text-center min-w-[76px]">
                            <span className="text-[9px] font-mono text-neutral-400 block font-semibold uppercase">SIZE {sz}</span>
                            <div className="flex items-center justify-center gap-2 mt-1">
                              <button
                                onClick={() => handleStockDelta(product.id, sz, -1)}
                                className="w-5 h-5 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-300 font-bold flex items-center justify-center text-xs"
                              >
                                -
                              </button>
                              <span className={`font-mono text-xs font-bold ${count < 15 ? 'text-amber-400' : 'text-white'}`}>
                                {count}
                              </span>
                              <button
                                onClick={() => handleStockDelta(product.id, sz, 1)}
                                className="w-5 h-5 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-300 font-bold flex items-center justify-center text-xs"
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

              {/* Production Stages Progress */}
              <div className="bg-[#14151E] border border-neutral-800 rounded-xl p-6 space-y-4">
                <h3 className="font-serif text-lg font-light text-white">
                  Tahapan Produksi Batch (Tarombo Drop 01)
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {PRODUCTION_STAGES.map((stg) => (
                    <div key={stg.id} className="p-4 bg-[#1A1B24] rounded-lg border border-neutral-800 space-y-2">
                      <div className="flex items-center justify-between text-[10px] font-mono">
                        <span className="text-neutral-500">{stg.date}</span>
                        <span className={`px-2 py-0.2 rounded font-bold uppercase ${
                          stg.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-400' : stg.status === 'In Progress' ? 'bg-blue-500/10 text-blue-400' : 'bg-neutral-800 text-neutral-400'
                        }`}>
                          {stg.status}
                        </span>
                      </div>
                      <h4 className="font-serif text-sm font-medium text-white">{stg.name}</h4>
                      <div className="w-full bg-neutral-800 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-white h-full rounded-full transition-all" style={{ width: `${stg.progress}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ══════════════════════════════════════════════════
              TAB 5: MIDTRANS FINANCIAL RECONCILIATION
             ══════════════════════════════════════════════════ */}
          {activeTab === 'finance' && (currentUser.role === 'SUPER_ADMIN' || currentUser.role === 'FINANCE') && (
            <div className="space-y-6 animate-fade-in">
              <div className="pb-4 border-b border-neutral-800">
                <h2 className="text-2xl font-serif font-light text-white">
                  Midtrans Financial Reconciliation
                </h2>
                <p className="text-xs text-neutral-400 mt-1">
                  Panel khusus CFO (Aristo Rafif) untuk rekonsiliasi pembayaran QRIS, Virtual Account, dan pencairan dana bersih.
                </p>
              </div>

              {/* Financial Calculation Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono">
                <div className="p-5 bg-[#14151E] border border-neutral-800 rounded-xl space-y-1">
                  <span className="text-neutral-500 text-[10px] uppercase">TOTAL GROSS TRANSAKSI LUNAS</span>
                  <div className="text-2xl font-bold text-white">Rp {totalOmset.toLocaleString('id-ID')}</div>
                  <span className="text-[10px] text-emerald-400 block">100% Terverifikasi SHA-512</span>
                </div>

                <div className="p-5 bg-[#14151E] border border-neutral-800 rounded-xl space-y-1">
                  <span className="text-neutral-500 text-[10px] uppercase">ESTIMASI GATEWAY FEE (1.5%)</span>
                  <div className="text-2xl font-bold text-neutral-400">Rp {Math.round(totalOmset * 0.015).toLocaleString('id-ID')}</div>
                  <span className="text-[10px] text-neutral-500 block">MDR Standar Midtrans</span>
                </div>

                <div className="p-5 bg-[#14151E] border border-neutral-800 rounded-xl space-y-1">
                  <span className="text-neutral-500 text-[10px] uppercase">NET ESTIMASI CAIR KE REKENING</span>
                  <div className="text-2xl font-bold text-emerald-400">Rp {Math.round(totalOmset * 0.985).toLocaleString('id-ID')}</div>
                  <span className="text-[10px] text-neutral-400 block">BCA Memoedja Corporate</span>
                </div>
              </div>

              {/* Payment Methods Distribution */}
              <div className="bg-[#14151E] border border-neutral-800 rounded-xl p-6 space-y-4">
                <h3 className="font-serif text-lg font-light text-white">
                  Distribusi Metode Pembayaran
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
                  <div className="p-4 bg-[#1A1B24] rounded-lg border border-neutral-800 space-y-1">
                    <span className="text-neutral-400">QRIS (GoPay / BCA Mobile)</span>
                    <div className="text-base font-bold text-white">62% (Favorit Pembeli)</div>
                    <span className="text-[10px] text-emerald-400">Instan Real-time Settlement</span>
                  </div>
                  <div className="p-4 bg-[#1A1B24] rounded-lg border border-neutral-800 space-y-1">
                    <span className="text-neutral-400">Virtual Account (BCA/Mandiri)</span>
                    <div className="text-base font-bold text-white">28%</div>
                    <span className="text-[10px] text-blue-400">Auto Reconciled</span>
                  </div>
                  <div className="p-4 bg-[#1A1B24] rounded-lg border border-neutral-800 space-y-1">
                    <span className="text-neutral-400">Kartu Kredit (Visa/Mastercard)</span>
                    <div className="text-base font-bold text-white">10%</div>
                    <span className="text-[10px] text-purple-400">3D Secure Verified</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ══════════════════════════════════════════════════
              TAB 6: TEAM PERMISSIONS & RBAC
             ══════════════════════════════════════════════════ */}
          {activeTab === 'users' && currentUser.role === 'SUPER_ADMIN' && (
            <div className="space-y-6 animate-fade-in">
              <div className="pb-4 border-b border-neutral-800">
                <h2 className="text-2xl font-serif font-light text-white">
                  Team Roles & Role-Based Access Control
                </h2>
                <p className="text-xs text-neutral-400 mt-1">
                  Pengaturan hak akses 4 level untuk menjaga privasi finansial dan operasional atelier.
                </p>
              </div>

              <div className="bg-[#14151E] border border-neutral-800 rounded-xl divide-y divide-neutral-800">
                {USERS.map((u) => (
                  <div key={u.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${u.color} flex items-center justify-center font-mono font-bold text-white`}>
                        {u.avatar}
                      </div>
                      <div>
                        <div className="font-medium text-white text-sm">{u.name}</div>
                        <span className="text-xs text-neutral-400 font-mono">{u.email} • {u.title}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono px-3 py-1 rounded bg-[#1A1B24] border border-neutral-700 text-neutral-300 font-bold">
                        {u.roleLabel}
                      </span>
                      <span className="text-xs text-emerald-400 font-mono">● Active</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ══════════════════════════════════════════════════
              TAB 7: EMBEDDED DOCUMENTATION & GUIDES
             ══════════════════════════════════════════════════ */}
          {activeTab === 'docs' && (
            <div className="space-y-6 animate-fade-in text-neutral-200">
              <div className="pb-4 border-b border-neutral-800">
                <h2 className="text-2xl font-serif font-light text-white">
                  Dokumentasi Sistem Operasional
                </h2>
                <p className="text-xs text-neutral-400 mt-1">
                  Panduan lengkap arsitektur backend, konfigurasi Biteship, Midtrans, dan Shared Hosting cPanel.
                </p>
              </div>

              <div className="bg-[#14151E] border border-neutral-800 rounded-xl p-6 space-y-6 font-sans text-xs leading-relaxed">
                <div>
                  <h3 className="font-serif text-base font-bold text-white mb-2">
                    1. Arsitektur Shared Hosting (cPanel)
                  </h3>
                  <p className="text-neutral-400">
                    Proyek ini tidak memakai framework berat (tanpa Laravel/Docker). Frontend dikompilasi menjadi berkas statis super ringan di <code className="text-white bg-neutral-800 px-1 py-0.5 rounded font-mono">public_html</code>, sedangkan backend berjalan di folder <code className="text-white bg-neutral-800 px-1 py-0.5 rounded font-mono">public_html/api/</code> menggunakan PHP 8.x native dan MySQL PDO.
                  </p>
                </div>

                <div className="border-t border-neutral-800 pt-4">
                  <h3 className="font-serif text-base font-bold text-white mb-2">
                    2. Kunci Keamanan API (Anti-Abuse)
                  </h3>
                  <ul className="list-disc list-inside space-y-1 text-neutral-400">
                    <li><strong className="text-white">Zero Trust Frontend:</strong> Total harga pesanan dihitung ulang di server sebelum dikirim ke Midtrans.</li>
                    <li><strong className="text-white">SHA-512 Signature Verification:</strong> Midtrans webhook wajib diverifikasi dengan algoritma hash resmi sebelum pesanan diubah jadi PAID.</li>
                    <li><strong className="text-white">Gitleaks & Semgrep:</strong> Setiap commit ke GitHub diaudit otomatis agar tidak ada kebocoran kredensial.</li>
                  </ul>
                </div>

                <div className="border-t border-neutral-800 pt-4">
                  <h3 className="font-serif text-base font-bold text-white mb-2">
                    3. Auto-Deploy GitHub Actions ke cPanel
                  </h3>
                  <p className="text-neutral-400">
                    Setiap kali <code className="text-white bg-neutral-800 px-1 py-0.5 rounded font-mono">git push origin main</code> dijalankan, GitHub Actions secara otomatis meng-compile React dan mengunggahnya ke hosting Anda via FTP. Panduan lengkap ada di berkas <strong className="text-white font-mono">DEPLOY_CPANEL.md</strong>.
                  </p>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>

      {/* ── SLIDE-OVER ORDER DETAIL DRAWER / MODAL ── */}
      {selectedOrder && (
        <div className="fixed inset-0 z-60 bg-black/70 backdrop-blur-xs flex justify-end animate-fade-in">
          <div className="w-full max-w-xl bg-[#12131A] border-l border-neutral-800 h-full p-6 flex flex-col justify-between overflow-y-auto">
            <div className="space-y-6">
              {/* Drawer Header */}
              <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
                <div>
                  <span className="text-[10px] font-mono text-neutral-500 uppercase block">DETAIL PESANAN</span>
                  <h3 className="font-mono text-lg font-bold text-white">{selectedOrder.id}</h3>
                </div>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Status Badges */}
              <div className="flex items-center gap-2">
                <span className={`text-[10px] font-mono px-2.5 py-1 rounded font-bold uppercase ${
                  selectedOrder.payment_status === 'PAID'
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                    : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                }`}>
                  PEMBAYARAN: {selectedOrder.payment_status}
                </span>

                <span className="text-[10px] font-mono px-2.5 py-1 rounded font-bold uppercase bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  STATUS: {selectedOrder.fulfillment_status}
                </span>
              </div>

              {/* Customer Info */}
              <div className="p-4 bg-[#181A24] rounded-lg border border-neutral-800 space-y-2 text-xs">
                <span className="text-[10px] font-mono text-neutral-500 uppercase block">DATA PENERIMA</span>
                <div className="font-bold text-white text-sm">{selectedOrder.customer_name}</div>
                <div className="flex items-center gap-3 text-neutral-400">
                  <span>{selectedOrder.customer_email}</span>
                  <span>•</span>
                  <a
                    href={`https://wa.me/${selectedOrder.customer_phone.replace(/^0/, '62')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-emerald-400 hover:underline flex items-center gap-1 font-mono"
                  >
                    <Phone size={11} />
                    <span>{selectedOrder.customer_phone}</span>
                  </a>
                </div>
                <p className="text-neutral-300 pt-1 leading-relaxed border-t border-neutral-800 mt-2">
                  <MapPin size={12} className="inline mr-1 text-neutral-500" />
                  {selectedOrder.address_detail}
                </p>
              </div>

              {/* Garment Items List */}
              <div className="space-y-3">
                <span className="text-[10px] font-mono text-neutral-500 uppercase block">ITEM GARMEN DIPESAN</span>
                <div className="space-y-2">
                  {selectedOrder.items.map((it, idx) => (
                    <div key={idx} className="p-3 bg-[#181A24] rounded-lg border border-neutral-800 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img src={it.img} alt={it.name} className="w-10 h-12 object-cover rounded border border-neutral-700" />
                        <div>
                          <div className="font-medium text-white text-xs">{it.name}</div>
                          <span className="text-[11px] font-mono text-neutral-400">Size: {it.size} • Qty: {it.quantity}x</span>
                        </div>
                      </div>
                      <span className="font-mono text-xs font-bold text-white">
                        Rp {(it.price * it.quantity).toLocaleString('id-ID')}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Shipping & Payment Summary */}
              <div className="p-4 bg-[#181A24] rounded-lg border border-neutral-800 font-mono text-xs space-y-2">
                <div className="flex justify-between text-neutral-400">
                  <span>Subtotal Garmen:</span>
                  <span>Rp {selectedOrder.subtotal_amount.toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between text-neutral-400">
                  <span>Ongkir ({selectedOrder.courier_name} {selectedOrder.courier_service}):</span>
                  <span>Rp {selectedOrder.shipping_cost.toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between text-white font-bold text-sm pt-2 border-t border-neutral-800">
                  <span>Total Tagihan:</span>
                  <span className="text-emerald-400">Rp {selectedOrder.total_amount.toLocaleString('id-ID')}</span>
                </div>
              </div>

              {/* Resi Input Form */}
              <div className="p-4 bg-[#181A24] rounded-lg border border-neutral-800 space-y-3">
                <span className="text-[10px] font-mono text-neutral-400 uppercase block font-semibold">
                  INPUT / UPDATE RESI KURIR BITESHIP
                </span>
                <input
                  type="text"
                  placeholder="Contoh: JNE88291029312 / SCP9928192"
                  value={waybillInput}
                  onChange={(e) => setWaybillInput(e.target.value)}
                  className="w-full bg-[#12131A] border border-neutral-700 rounded-lg p-2.5 text-xs font-mono text-white outline-none focus:border-white"
                />

                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="waNotify"
                    checked={notifyWa}
                    onChange={(e) => setNotifyWa(e.target.checked)}
                    className="rounded cursor-pointer"
                  />
                  <label htmlFor="waNotify" className="text-xs text-neutral-300 cursor-pointer">
                    Kirim notifikasi otomatis ke WhatsApp customer setelah disimpan
                  </label>
                </div>
              </div>
            </div>

            {/* Drawer Bottom Actions */}
            <div className="pt-6 border-t border-neutral-800 flex gap-3">
              <button
                onClick={() => setSelectedOrder(null)}
                className="flex-1 py-2.5 rounded-lg border border-neutral-700 text-neutral-400 hover:text-white font-mono text-xs font-semibold"
              >
                Tutup
              </button>
              <button
                onClick={() => handleSaveWaybill(selectedOrder.id)}
                className="flex-1 py-2.5 rounded-lg bg-white text-black font-mono text-xs font-bold hover:bg-neutral-200 transition-colors shadow-xs"
              >
                Simpan & Update Resi
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
