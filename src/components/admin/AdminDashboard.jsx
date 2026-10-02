import React, { useState, useMemo } from 'react';
import { 
  DollarSign, Package, Truck, Users, CheckCircle, Clock, 
  Search, Sliders, ChevronRight, X, ExternalLink, RefreshCw, 
  Send, Shield, ArrowUpRight, BarChart3, AlertCircle, 
  CreditCard, Eye, Printer, Filter, ChevronDown, Check,
  Layers, MapPin, Phone, Mail, FileText, ArrowLeft, Bell,
  TrendingUp, TrendingDown, ArrowDownRight, Sparkles, Moon, Sun
} from 'lucide-react';
import { PRODUCTS, PRODUCTION_STAGES } from '../../data/products';

// ── Horizon UI User Roles & Multi-User Accounts ──
const USERS = [
  { 
    id: 1, 
    name: 'Ken Koesumo', 
    email: 'ken@memoedja.com', 
    role: 'SUPER_ADMIN', 
    roleLabel: 'Super Admin',
    title: 'Creative Director / Owner',
    avatar: 'KK',
    bgBadge: 'bg-[#4318FF]/10 text-[#4318FF]'
  },
  { 
    id: 2, 
    name: 'Aristo Rafif', 
    email: 'aristo@memoedja.com', 
    role: 'FINANCE', 
    roleLabel: 'Finance (CFO)',
    title: 'Chief Financial Officer',
    avatar: 'AR',
    bgBadge: 'bg-[#05CD99]/10 text-[#05CD99]'
  },
  { 
    id: 3, 
    name: 'Gustaviano Victor', 
    email: 'gustaviano@memoedja.com', 
    role: 'OPERATIONS', 
    roleLabel: 'Operations (COO)',
    title: 'Chief Operating Officer',
    avatar: 'GV',
    bgBadge: 'bg-[#3399FF]/10 text-[#3399FF]'
  },
  { 
    id: 4, 
    name: 'Farra Meilia', 
    email: 'farra@memoedja.com', 
    role: 'STAFF', 
    roleLabel: 'Atelier Staff',
    title: 'Lead Garment Designer',
    avatar: 'FM',
    bgBadge: 'bg-[#FFB547]/10 text-[#FFB547]'
  }
];

// ── Orders Mock Data ──
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
  const [currentUser, setCurrentUser] = useState(USERS[0]); // Default Ken Koesumo (Super Admin)
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'orders' | 'logistics' | 'inventory' | 'finance' | 'users' | 'docs'
  const [orders, setOrders] = useState(INITIAL_ORDERS);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderFilter, setOrderFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [stockState, setStockState] = useState(PRODUCTS);
  const [waybillInput, setWaybillInput] = useState('');
  const [notifyWa, setNotifyWa] = useState(true);

  // Biteship Live Calculator Widget State
  const [calcDest, setCalcDest] = useState('Bandung');
  const [calcWeight, setCalcWeight] = useState(1);
  const [isCalculating, setIsCalculating] = useState(false);
  const [calcResult, setCalcResult] = useState(null);

  // ── Sales Pie Chart & Google Analytics State ──
  const [pieMode, setPieMode] = useState('category'); // 'category' | 'payment'
  const [activePieHover, setActivePieHover] = useState(null);
  const [gaId, setGaId] = useState(() => (typeof window !== 'undefined' ? localStorage.getItem('memoedja_ga_id') || 'G-MEMOEDJA26' : 'G-MEMOEDJA26'));
  const [gaSaved, setGaSaved] = useState(false);

  const salesByCategory = [
    { label: 'Selvedge Denim 13oz', percentage: 38, value: 1475000, color: '#4318FF', units: 2 },
    { label: 'Denim 15oz Bootcut', percentage: 26, value: 998000, color: '#05CD99', units: 1 },
    { label: 'Cotton Chore Jacket', percentage: 18, value: 699000, color: '#FFB547', units: 1 },
    { label: 'Canvas Shirt', percentage: 11, value: 549000, color: '#3399FF', units: 1 },
    { label: 'Henley Shirt', percentage: 7, value: 329000, color: '#868CFF', units: 1 }
  ];

  const salesByPayment = [
    { label: 'QRIS (GoPay / BCA)', percentage: 62, value: 2410000, color: '#05CD99', units: 3 },
    { label: 'Virtual Account (BCA/Mandiri)', percentage: 28, value: 1090000, color: '#4318FF', units: 2 },
    { label: 'Credit Card (3D Secure)', percentage: 10, value: 390000, color: '#FFB547', units: 1 }
  ];

  const handleSaveGaId = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('memoedja_ga_id', gaId);
      if (window.gtag) {
        window.gtag('config', gaId, { send_page_view: true });
      }
    }
    setGaSaved(true);
    setTimeout(() => setGaSaved(false), 2000);
  };

  if (!isOpen) return null;

  // Filter Orders
  const filteredOrders = useMemo(() => {
    return orders.filter((o) => {
      if (orderFilter === 'PAID' && (o.payment_status !== 'PAID' || o.fulfillment_status === 'SHIPPED' || o.fulfillment_status === 'DELIVERED')) return false;
      if (orderFilter === 'SHIPPED' && o.fulfillment_status !== 'SHIPPED') return false;
      if (orderFilter === 'PENDING' && o.payment_status !== 'PENDING') return false;
      if (orderFilter === 'DELIVERED' && o.fulfillment_status !== 'DELIVERED') return false;

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

  const totalUnits = useMemo(() => {
    return stockState.reduce((sum, p) => sum + Object.values(p.stockPerSize).reduce((a, b) => a + b, 0), 0);
  }, [stockState]);

  // Handler: Stock Delta
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
    <div className="fixed inset-0 z-50 bg-[#F4F7FE] text-[#2B3674] flex font-sans overflow-hidden animate-fade-in">
      
      {/* ═══════════════════════════════════════════════════════════
          HORIZON UI SIGNATURE SIDEBAR (White, Rounded, Clean)
         ═══════════════════════════════════════════════════════════ */}
      <aside className="w-72 bg-white m-4 mr-0 rounded-[24px] shadow-[0px_18px_40px_rgba(112,144,176,0.08)] flex flex-col justify-between p-6 shrink-0 z-20">
        <div>
          {/* Brand Logo & Studio Mark */}
          <div className="pb-8 pt-2 px-2 border-b border-[#F4F7FE] flex items-center justify-between">
            <div>
              <h1 className="font-serif text-xl tracking-[0.25em] font-bold text-[#1B2559] uppercase">
                MEMOEDJA
              </h1>
              <span className="text-[10px] font-sans font-semibold tracking-wider text-[#A3AED0] uppercase block">
                HORIZON OPS MATRIX
              </span>
            </div>
            <span className="w-2.5 h-2.5 rounded-full bg-[#05CD99] animate-pulse" title="System Live" />
          </div>

          {/* Nav Items */}
          <nav className="mt-6 space-y-1.5">
            {[
              { id: 'overview', label: 'Main Dashboard', icon: BarChart3 },
              { id: 'orders', label: 'Orders & Fulfillment', icon: Package, badge: needShippingCount > 0 ? needShippingCount : null },
              { id: 'logistics', label: 'Biteship Logistics', icon: Truck },
              { id: 'inventory', label: 'Stock & Atelier Matrix', icon: Layers },
              { id: 'finance', label: 'Midtrans Finance', icon: CreditCard, roleRestricted: ['SUPER_ADMIN', 'FINANCE'] },
              { id: 'users', label: 'Team Roles (RBAC)', icon: Users, roleRestricted: ['SUPER_ADMIN'] },
              { id: 'docs', label: 'System Documentation', icon: FileText }
            ].map((tab) => {
              if (tab.roleRestricted && !tab.roleRestricted.includes(currentUser.role)) {
                return null;
              }
              const isActive = activeTab === tab.id;
              const Icon = tab.icon;

              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center justify-between px-4 py-3.5 rounded-[16px] text-sm font-semibold transition-all relative ${
                    isActive
                      ? 'bg-[#4318FF] text-white shadow-[0px_10px_20px_rgba(67,24,255,0.24)]'
                      : 'text-[#A3AED0] hover:text-[#2B3674] hover:bg-[#F4F7FE]'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <Icon size={18} className={isActive ? 'text-white' : 'text-[#A3AED0]'} />
                    <span>{tab.label}</span>
                  </div>

                  {tab.badge && (
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                      isActive ? 'bg-white text-[#4318FF]' : 'bg-[#FFB547] text-white'
                    }`}>
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Horizon UI Floating Card */}
        <div className="bg-gradient-to-br from-[#868CFF] to-[#4318FF] rounded-[20px] p-5 text-white shadow-[0px_18px_40px_rgba(67,24,255,0.28)] relative overflow-hidden">
          <div className="absolute -right-4 -bottom-4 w-20 h-20 rounded-full bg-white/10 blur-xs" />
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] font-mono tracking-wider font-bold uppercase bg-white/20 px-2 py-0.5 rounded-full">
              LIVE ATELIER
            </span>
          </div>
          <h4 className="font-bold text-sm leading-tight">Tarombo Drop 01</h4>
          <p className="text-[11px] text-white/80 mt-1 leading-snug">
            All services connected to Midtrans & Biteship Sandbox.
          </p>
          <button
            onClick={onClose}
            className="mt-3.5 w-full py-2 bg-white text-[#4318FF] font-bold text-xs rounded-xl shadow-xs hover:bg-neutral-100 transition-colors flex items-center justify-center gap-1.5"
          >
            <ArrowLeft size={13} />
            <span>Storefront View</span>
          </button>
        </div>
      </aside>

      {/* ═══════════════════════════════════════════════════════════
          HORIZON UI MAIN CONTENT & FLOATING NAVBAR
         ═══════════════════════════════════════════════════════════ */}
      <div className="flex-1 flex flex-col overflow-hidden p-4">
        
        {/* Floating Horizon Topbar */}
        <header className="h-20 bg-white/80 backdrop-blur-md rounded-[20px] px-6 flex items-center justify-between shadow-[0px_18px_40px_rgba(112,144,176,0.08)] shrink-0 z-10 mb-5">
          {/* Breadcrumbs */}
          <div>
            <div className="text-xs font-semibold text-[#707EAE]">
              <span>Pages</span> / <span className="capitalize">{activeTab}</span>
            </div>
            <h2 className="text-xl font-bold text-[#1B2559] capitalize">
              {activeTab === 'overview' ? 'Main Dashboard' : activeTab}
            </h2>
          </div>

          {/* Right Controls: Search, Notification, & Multi-Role Profile */}
          <div className="flex items-center gap-3 bg-[#F4F7FE] p-2 rounded-[30px]">
            {/* Search Input */}
            <div className="flex items-center gap-2 bg-white px-3.5 py-2 rounded-[30px] w-56 text-xs text-[#2B3674] shadow-xs">
              <Search size={14} className="text-[#A3AED0]" />
              <input
                type="text"
                placeholder="Search orders..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent outline-none w-full text-xs text-[#2B3674] placeholder:text-[#A3AED0]"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="text-[#A3AED0] hover:text-[#2B3674]">
                  <X size={12} />
                </button>
              )}
            </div>

            {/* Notification Bell */}
            <div className="relative p-2 text-[#A3AED0] hover:text-[#2B3674] cursor-pointer">
              <Bell size={18} />
              {needShippingCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#EE5D50]" />
              )}
            </div>

            {/* Multi-Role Switcher Dropdown */}
            <div className="flex items-center gap-2 bg-white pl-2 pr-3 py-1.5 rounded-[30px] shadow-xs">
              <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#868CFF] to-[#4318FF] text-white flex items-center justify-center font-bold text-xs">
                {currentUser.avatar}
              </div>
              <div className="flex flex-col">
                <select
                  value={currentUser.id}
                  onChange={(e) => {
                    const u = USERS.find((x) => x.id === parseInt(e.target.value));
                    if (u) setCurrentUser(u);
                  }}
                  className="bg-transparent text-xs font-bold text-[#2B3674] outline-none cursor-pointer pr-1"
                >
                  {USERS.map((u) => (
                    <option key={u.id} value={u.id} className="text-[#2B3674]">
                      {u.name} ({u.roleLabel})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white text-[#A3AED0] hover:text-[#EE5D50] hover:bg-red-50 flex items-center justify-center shadow-xs transition-colors"
              title="Close to Storefront"
            >
              <X size={16} />
            </button>
          </div>
        </header>

        {/* Scrollable Workspace */}
        <main className="flex-1 overflow-y-auto space-y-6 pr-1 pb-4">

          {/* ═══════════════════════════════════════════════════
              TAB 1: HORIZON UI MAIN METRICS DASHBOARD
             ═══════════════════════════════════════════════════ */}
          {activeTab === 'overview' && (
            <div className="space-y-6 animate-fade-in">
              {/* 4 Horizon UI Iconic Metric Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                
                {/* Metric 1: Revenue */}
                <div className="bg-white rounded-[20px] p-5 shadow-[0px_18px_40px_rgba(112,144,176,0.08)] flex items-center gap-4 hover:shadow-[0px_18px_40px_rgba(112,144,176,0.16)] transition-all">
                  <div className="w-14 h-14 rounded-full bg-[#F4F7FE] text-[#4318FF] flex items-center justify-center shrink-0">
                    <DollarSign size={24} />
                  </div>
                  <div>
                    <span className="text-[#A3AED0] text-xs font-medium uppercase tracking-wide">
                      Gross Revenue
                    </span>
                    <div className="text-[#1B2559] text-2xl font-bold tracking-tight">
                      Rp {totalOmset.toLocaleString('id-ID')}
                    </div>
                    <div className="flex items-center gap-1 text-[11px] font-bold text-[#05CD99] mt-0.5">
                      <ArrowUpRight size={13} />
                      <span>+24.5%</span>
                      <span className="text-[#A3AED0] font-normal ml-0.5">since last month</span>
                    </div>
                  </div>
                </div>

                {/* Metric 2: Pending Shipping */}
                <div className="bg-white rounded-[20px] p-5 shadow-[0px_18px_40px_rgba(112,144,176,0.08)] flex items-center gap-4 hover:shadow-[0px_18px_40px_rgba(112,144,176,0.16)] transition-all">
                  <div className="w-14 h-14 rounded-full bg-[#FFF7EC] text-[#FFB547] flex items-center justify-center shrink-0">
                    <Package size={24} />
                  </div>
                  <div>
                    <span className="text-[#A3AED0] text-xs font-medium uppercase tracking-wide">
                      Need Dispatch
                    </span>
                    <div className="text-[#1B2559] text-2xl font-bold tracking-tight">
                      {needShippingCount} Orders
                    </div>
                    <div className="flex items-center gap-1 text-[11px] font-bold text-[#FFB547] mt-0.5">
                      <Clock size={12} />
                      <span>Biteship Pickup Ready</span>
                    </div>
                  </div>
                </div>

                {/* Metric 3: AOV */}
                <div className="bg-white rounded-[20px] p-5 shadow-[0px_18px_40px_rgba(112,144,176,0.08)] flex items-center gap-4 hover:shadow-[0px_18px_40px_rgba(112,144,176,0.16)] transition-all">
                  <div className="w-14 h-14 rounded-full bg-[#EBF3FF] text-[#3399FF] flex items-center justify-center shrink-0">
                    <BarChart3 size={24} />
                  </div>
                  <div>
                    <span className="text-[#A3AED0] text-xs font-medium uppercase tracking-wide">
                      Avg Order Value
                    </span>
                    <div className="text-[#1B2559] text-2xl font-bold tracking-tight">
                      Rp {aov.toLocaleString('id-ID')}
                    </div>
                    <div className="flex items-center gap-1 text-[11px] font-bold text-[#05CD99] mt-0.5">
                      <CheckCircle size={12} />
                      <span>Target Rp 650K Achieved</span>
                    </div>
                  </div>
                </div>

                {/* Metric 4: Total Stock */}
                <div className="bg-white rounded-[20px] p-5 shadow-[0px_18px_40px_rgba(112,144,176,0.08)] flex items-center gap-4 hover:shadow-[0px_18px_40px_rgba(112,144,176,0.16)] transition-all">
                  <div className="w-14 h-14 rounded-full bg-[#F3E8FF] text-[#868CFF] flex items-center justify-center shrink-0">
                    <Layers size={24} />
                  </div>
                  <div>
                    <span className="text-[#A3AED0] text-xs font-medium uppercase tracking-wide">
                      Garment Inventory
                    </span>
                    <div className="text-[#1B2559] text-2xl font-bold tracking-tight">
                      {totalUnits} Units
                    </div>
                    <div className="flex items-center gap-1 text-[11px] font-bold text-[#4318FF] mt-0.5">
                      <span>5 SKU Curated</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* ═══════════════════════════════════════════════════
                  NEW: SALES PIE CHART & GOOGLE ANALYTICS SECTION
                 ═══════════════════════════════════════════════════ */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* 1. SALES PIE CHART (DONUT) CARD */}
                <div className="lg:col-span-7 bg-white rounded-[20px] p-6 shadow-[0px_18px_40px_rgba(112,144,176,0.08)] flex flex-col justify-between">
                  <div>
                    {/* Header with Mode Toggle */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#F4F7FE] gap-3">
                      <div>
                        <h3 className="text-lg font-bold text-[#1B2559]">Sales Distribution (Pie Chart)</h3>
                        <p className="text-xs text-[#A3AED0]">Analisis proporsi penjualan garmen & channel pembayaran</p>
                      </div>

                      {/* Horizon UI Toggle Pills */}
                      <div className="flex items-center gap-1 bg-[#F4F7FE] p-1 rounded-xl">
                        <button
                          onClick={() => setPieMode('category')}
                          className={`text-xs px-3 py-1.5 rounded-lg font-bold transition-all ${
                            pieMode === 'category'
                              ? 'bg-white text-[#4318FF] shadow-xs'
                              : 'text-[#A3AED0] hover:text-[#2B3674]'
                          }`}
                        >
                          By Garment
                        </button>
                        <button
                          onClick={() => setPieMode('payment')}
                          className={`text-xs px-3 py-1.5 rounded-lg font-bold transition-all ${
                            pieMode === 'payment'
                              ? 'bg-white text-[#4318FF] shadow-xs'
                              : 'text-[#A3AED0] hover:text-[#2B3674]'
                          }`}
                        >
                          By Payment
                        </button>
                      </div>
                    </div>

                    {/* Donut Chart & Legend Display */}
                    <div className="pt-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                      {/* SVG Donut Chart Visual */}
                      <div className="md:col-span-5 flex items-center justify-center relative">
                        <svg className="w-48 h-48 -rotate-90 transform" viewBox="0 0 200 200">
                          {/* Background Track Circle */}
                          <circle
                            cx="100"
                            cy="100"
                            r="65"
                            fill="transparent"
                            stroke="#F4F7FE"
                            strokeWidth="24"
                          />
                          {/* Render Donut Slices */}
                          {(() => {
                            let cumulativePercent = 0;
                            const currentList = pieMode === 'category' ? salesByCategory : salesByPayment;
                            const circumference = 2 * Math.PI * 65; // ~408.4

                            return currentList.map((slice, idx) => {
                              const strokeDasharray = `${(slice.percentage / 100) * circumference} ${circumference}`;
                              const strokeDashoffset = -((cumulativePercent / 100) * circumference);
                              cumulativePercent += slice.percentage;

                              const isHovered = activePieHover === idx;

                              return (
                                <circle
                                  key={idx}
                                  cx="100"
                                  cy="100"
                                  r="65"
                                  fill="transparent"
                                  stroke={slice.color}
                                  strokeWidth={isHovered ? "28" : "24"}
                                  strokeDasharray={strokeDasharray}
                                  strokeDashoffset={strokeDashoffset}
                                  strokeLinecap="round"
                                  className="transition-all duration-300 cursor-pointer"
                                  onMouseEnter={() => setActivePieHover(idx)}
                                  onMouseLeave={() => setActivePieHover(null)}
                                />
                              );
                            });
                          })()}
                        </svg>

                        {/* Center Metric Text */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
                          <span className="text-[11px] font-bold text-[#A3AED0] uppercase">
                            {activePieHover !== null
                              ? (pieMode === 'category' ? salesByCategory[activePieHover].percentage : salesByPayment[activePieHover].percentage) + '%'
                              : 'TOTAL'}
                          </span>
                          <span className="text-lg font-bold text-[#1B2559]">
                            {activePieHover !== null
                              ? 'Rp ' + ((pieMode === 'category' ? salesByCategory[activePieHover].value : salesByPayment[activePieHover].value) / 1000).toLocaleString('id-ID') + 'K'
                              : 'Rp ' + (totalOmset / 1000000).toFixed(1) + 'M'}
                          </span>
                          <span className="text-[9px] font-bold text-[#4318FF] uppercase">
                            {activePieHover !== null
                              ? (pieMode === 'category' ? salesByCategory[activePieHover].label.split(' ')[0] : salesByPayment[activePieHover].label.split(' ')[0])
                              : 'SALES'}
                          </span>
                        </div>
                      </div>

                      {/* Interactive Legend Table */}
                      <div className="md:col-span-7 space-y-2.5">
                        {(pieMode === 'category' ? salesByCategory : salesByPayment).map((slice, idx) => (
                          <div
                            key={idx}
                            onMouseEnter={() => setActivePieHover(idx)}
                            onMouseLeave={() => setActivePieHover(null)}
                            className={`flex items-center justify-between p-2 rounded-xl transition-all cursor-pointer ${
                              activePieHover === idx ? 'bg-[#F4F7FE]' : 'hover:bg-[#F4F7FE]/50'
                            }`}
                          >
                            <div className="flex items-center gap-2.5">
                              <span
                                className="w-3 h-3 rounded-full shrink-0 shadow-xs"
                                style={{ backgroundColor: slice.color }}
                              />
                              <span className="text-xs font-bold text-[#1B2559] truncate max-w-[140px]">
                                {slice.label}
                              </span>
                            </div>

                            <div className="text-right font-mono text-xs">
                              <span className="font-bold text-[#1B2559] mr-2">{slice.percentage}%</span>
                              <span className="text-[#A3AED0] text-[11px]">
                                Rp {slice.value.toLocaleString('id-ID')}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-[#F4F7FE] flex items-center justify-between text-xs text-[#A3AED0]">
                    <span>Metrik diupdate otomatis dari log pesanan</span>
                    <span className="font-bold text-[#4318FF] font-mono">Real-time Attribution</span>
                  </div>
                </div>

                {/* 2. GOOGLE ANALYTICS 4 (GA4) INTEGRATION & FUNNEL CARD */}
                <div className="lg:col-span-5 bg-white rounded-[20px] p-6 shadow-[0px_18px_40px_rgba(112,144,176,0.08)] flex flex-col justify-between">
                  <div>
                    {/* Header */}
                    <div className="flex items-center justify-between pb-4 border-b border-[#F4F7FE]">
                      <div>
                        <h3 className="text-lg font-bold text-[#1B2559]">Google Analytics 4</h3>
                        <p className="text-xs text-[#A3AED0]">Global Site Tag & E-Commerce Event Pipeline</p>
                      </div>
                      <span className="text-[10px] font-bold uppercase bg-[#05CD99]/10 text-[#05CD99] px-2.5 py-1 rounded-full flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#05CD99] animate-pulse" />
                        <span>Connected</span>
                      </span>
                    </div>

                    {/* GA4 Measurement ID Config Form */}
                    <div className="mt-4 space-y-3">
                      <div>
                        <label className="text-[11px] font-bold text-[#2B3674] uppercase block mb-1">
                          GA4 Measurement ID
                        </label>
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            value={gaId}
                            onChange={(e) => setGaId(e.target.value)}
                            placeholder="G-XXXXXXXXXX"
                            className="bg-[#F4F7FE] border-none rounded-xl px-3.5 py-2 text-xs font-mono font-bold text-[#2B3674] outline-none w-full focus:ring-2 focus:ring-[#4318FF]/20"
                          />
                          <button
                            onClick={handleSaveGaId}
                            className="px-3.5 py-2 bg-[#4318FF] hover:bg-[#3311CC] text-white text-xs font-bold rounded-xl transition-colors shrink-0 shadow-xs"
                          >
                            {gaSaved ? 'Saved!' : 'Save ID'}
                          </button>
                        </div>
                      </div>

                      {/* E-Commerce Funnel Tracking Pipeline */}
                      <div className="pt-2">
                        <span className="text-[11px] font-bold text-[#2B3674] uppercase block mb-2">
                          E-Commerce Conversion Funnel
                        </span>
                        
                        <div className="space-y-2 text-xs font-mono">
                          <div className="flex items-center justify-between p-2 rounded-xl bg-[#F4F7FE]">
                            <span className="text-[#707EAE]">1. page_view (Storefront Traffic)</span>
                            <span className="font-bold text-[#1B2559]">1,842</span>
                          </div>
                          <div className="flex items-center justify-between p-2 rounded-xl bg-[#F4F7FE]">
                            <span className="text-[#707EAE]">2. view_item (Detail Modal Click)</span>
                            <span className="font-bold text-[#1B2559]">920 (49.9%)</span>
                          </div>
                          <div className="flex items-center justify-between p-2 rounded-xl bg-[#F4F7FE]">
                            <span className="text-[#707EAE]">3. add_to_cart (Bag Conversion)</span>
                            <span className="font-bold text-[#4318FF]">248 (26.9%)</span>
                          </div>
                          <div className="flex items-center justify-between p-2 rounded-xl bg-[#F4F7FE]">
                            <span className="text-[#707EAE]">4. begin_checkout (Checkout Form)</span>
                            <span className="font-bold text-[#FFB547]">62 (25.0%)</span>
                          </div>
                          <div className="flex items-center justify-between p-2 rounded-xl bg-[#05CD99]/10 text-[#05CD99]">
                            <span className="font-bold">5. purchase (Midtrans Settlement)</span>
                            <span className="font-bold">16 (25.8%)</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-[#F4F7FE] flex items-center justify-between text-xs">
                    <span className="text-[#A3AED0]">Overall Conversion Rate:</span>
                    <span className="font-bold text-[#05CD99] font-mono text-sm">2.6% (Healthy)</span>
                  </div>
                </div>

              </div>

              {/* Middle Section: Recent Orders Table + Biteship Quick Rate Checker */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Recent Orders Card */}
                <div className="lg:col-span-8 bg-white rounded-[20px] p-6 shadow-[0px_18px_40px_rgba(112,144,176,0.08)]">
                  <div className="flex items-center justify-between pb-5 border-b border-[#F4F7FE]">
                    <div>
                      <h3 className="text-lg font-bold text-[#1B2559]">Recent Orders</h3>
                      <p className="text-xs text-[#A3AED0]">Real-time transactional feed from Midtrans</p>
                    </div>
                    <button
                      onClick={() => setActiveTab('orders')}
                      className="text-xs font-bold text-[#4318FF] hover:underline flex items-center gap-1 bg-[#F4F7FE] px-3 py-1.5 rounded-xl"
                    >
                      <span>View All ({orders.length})</span>
                      <ChevronRight size={14} />
                    </button>
                  </div>

                  <div className="divide-y divide-[#F4F7FE] mt-2">
                    {orders.slice(0, 4).map((ord) => (
                      <div key={ord.id} className="py-4 flex items-center justify-between hover:bg-[#F4F7FE]/50 px-2 rounded-xl transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-[#F4F7FE] flex items-center justify-center font-bold text-xs text-[#4318FF]">
                            {ord.courier_name.substring(0, 2)}
                          </div>
                          <div>
                            <span className="font-bold text-sm text-[#1B2559] block">{ord.customer_name}</span>
                            <span className="text-xs text-[#A3AED0] font-mono">{ord.id} • {ord.courier_name} ({ord.courier_service})</span>
                          </div>
                        </div>

                        <div className="text-right">
                          <span className="font-bold text-sm text-[#1B2559] block">
                            Rp {ord.total_amount.toLocaleString('id-ID')}
                          </span>
                          <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                            ord.payment_status === 'PAID'
                              ? 'bg-[#05CD99]/10 text-[#05CD99]'
                              : 'bg-[#FFB547]/10 text-[#FFB547]'
                          }`}>
                            {ord.payment_status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Biteship Rate Testing Card */}
                <div className="lg:col-span-4 bg-white rounded-[20px] p-6 shadow-[0px_18px_40px_rgba(112,144,176,0.08)] flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between pb-4 border-b border-[#F4F7FE]">
                      <div>
                        <h3 className="text-lg font-bold text-[#1B2559]">Biteship Live Test</h3>
                        <p className="text-[11px] text-[#A3AED0]">Origin: Kebayoran Baru, Jaksel (12190)</p>
                      </div>
                      <span className="text-[10px] font-bold uppercase bg-[#EBF3FF] text-[#3399FF] px-2 py-0.5 rounded-full">
                        Aggregator
                      </span>
                    </div>

                    <div className="mt-4 space-y-3 text-xs">
                      <div>
                        <label className="text-[11px] font-bold text-[#2B3674] uppercase block mb-1">
                          Destination City / Area
                        </label>
                        <input
                          type="text"
                          value={calcDest}
                          onChange={(e) => setCalcDest(e.target.value)}
                          placeholder="e.g. Bandung / Surabaya / Medan"
                          className="w-full bg-[#F4F7FE] border-none rounded-xl px-3.5 py-2.5 text-[#2B3674] font-medium outline-none focus:ring-2 focus:ring-[#4318FF]/20"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-bold text-[#2B3674] uppercase block mb-1">
                          Package Weight (Kg)
                        </label>
                        <input
                          type="number"
                          min="1"
                          max="20"
                          value={calcWeight}
                          onChange={(e) => setCalcWeight(e.target.value)}
                          className="w-full bg-[#F4F7FE] border-none rounded-xl px-3.5 py-2.5 text-[#2B3674] font-medium outline-none focus:ring-2 focus:ring-[#4318FF]/20"
                        />
                      </div>

                      <button
                        onClick={handleRunBiteshipTest}
                        disabled={isCalculating}
                        className="w-full py-3 bg-[#4318FF] text-white font-bold text-xs rounded-xl shadow-[0px_10px_20px_rgba(67,24,255,0.24)] hover:bg-[#3311CC] transition-colors flex items-center justify-center gap-2 mt-2"
                      >
                        {isCalculating ? (
                          <>
                            <RefreshCw size={14} className="animate-spin" />
                            <span>Querying Couriers...</span>
                          </>
                        ) : (
                          <span>Calculate Rates</span>
                        )}
                      </button>

                      {/* Result Pills */}
                      {calcResult && (
                        <div className="pt-2 space-y-2 border-t border-[#F4F7FE] animate-fade-in text-[11px]">
                          {calcResult.map((res, idx) => (
                            <div key={idx} className="flex items-center justify-between p-2.5 rounded-xl bg-[#F4F7FE]">
                              <div>
                                <span className="font-bold text-[#1B2559]">{res.courier}</span>
                                <span className="text-[#A3AED0] ml-1">({res.service})</span>
                                <span className="block text-[10px] text-[#A3AED0]">{res.etd}</span>
                              </div>
                              <span className="font-bold text-[#05CD99]">
                                Rp {res.price.toLocaleString('id-ID')}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#F4F7FE] text-[11px] text-[#A3AED0] flex items-center justify-between">
                    <span>Coverage: 34 Provinces</span>
                    <span className="text-[#05CD99] font-bold">API Active</span>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* ═══════════════════════════════════════════════════
              TAB 2: ORDERS & FULFILLMENT MANAGEMENT
             ═══════════════════════════════════════════════════ */}
          {activeTab === 'orders' && (
            <div className="space-y-5 animate-fade-in">
              {/* Filter Pills */}
              <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3 rounded-[20px] shadow-[0px_18px_40px_rgba(112,144,176,0.06)]">
                <div className="flex flex-wrap gap-2">
                  {[
                    { key: 'ALL', label: 'All Orders' },
                    { key: 'PAID', label: 'Need Packing' },
                    { key: 'SHIPPED', label: 'In Transit (Shipped)' },
                    { key: 'PENDING', label: 'Awaiting Payment' },
                    { key: 'DELIVERED', label: 'Delivered' }
                  ].map((f) => (
                    <button
                      key={f.key}
                      onClick={() => setOrderFilter(f.key)}
                      className={`text-xs px-4 py-2 rounded-xl font-bold transition-all ${
                        orderFilter === f.key
                          ? 'bg-[#4318FF] text-white shadow-[0px_8px_16px_rgba(67,24,255,0.24)]'
                          : 'text-[#A3AED0] hover:text-[#2B3674] hover:bg-[#F4F7FE]'
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>

                <span className="text-xs font-bold text-[#A3AED0] px-3 font-mono">
                  Showing {filteredOrders.length} records
                </span>
              </div>

              {/* Horizon Table Card */}
              <div className="bg-white rounded-[24px] p-6 shadow-[0px_18px_40px_rgba(112,144,176,0.08)] overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-[#F4F7FE] text-[#A3AED0] uppercase text-[11px] font-bold">
                        <th className="pb-4">Invoice & Date</th>
                        <th className="pb-4">Customer & WhatsApp</th>
                        <th className="pb-4">Garment Items</th>
                        <th className="pb-4">Courier</th>
                        <th className="pb-4">Total Amount</th>
                        <th className="pb-4">Payment</th>
                        <th className="pb-4">Fulfillment</th>
                        <th className="pb-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F4F7FE]">
                      {filteredOrders.length === 0 ? (
                        <tr>
                          <td colSpan="8" className="py-8 text-center text-[#A3AED0] font-medium text-xs">
                            No orders found matching the filter criteria.
                          </td>
                        </tr>
                      ) : (
                        filteredOrders.map((ord) => (
                          <tr key={ord.id} className="hover:bg-[#F4F7FE]/40 transition-colors">
                            <td className="py-4">
                              <span className="font-bold text-[#1B2559] block font-mono text-sm">{ord.id}</span>
                              <span className="text-[11px] text-[#A3AED0] font-mono">{ord.created_at}</span>
                            </td>

                            <td className="py-4">
                              <div className="font-bold text-[#1B2559] text-sm">{ord.customer_name}</div>
                              <a
                                href={`https://wa.me/${ord.customer_phone.replace(/^0/, '62')}`}
                                target="_blank"
                                rel="noreferrer"
                                className="text-[11px] text-[#05CD99] font-bold hover:underline inline-flex items-center gap-1 font-mono mt-0.5"
                              >
                                <span>{ord.customer_phone}</span>
                                <ExternalLink size={10} />
                              </a>
                            </td>

                            <td className="py-4 space-y-1">
                              {ord.items.map((it, idx) => (
                                <div key={idx} className="flex items-center gap-2">
                                  <img src={it.img} alt={it.name} className="w-7 h-8 object-cover rounded-md" />
                                  <span className="text-[#2B3674] text-xs">
                                    {it.name} <strong className="font-mono text-[#4318FF]">({it.size} x{it.quantity})</strong>
                                  </span>
                                </div>
                              ))}
                            </td>

                            <td className="py-4 font-mono text-xs">
                              <span className="font-bold text-[#1B2559]">{ord.courier_name}</span>
                              <span className="block text-[#A3AED0] text-[10px]">{ord.courier_service}</span>
                              <span className="text-[#707EAE] text-[10px]">Rp {ord.shipping_cost.toLocaleString('id-ID')}</span>
                            </td>

                            <td className="py-4 font-mono font-bold text-sm text-[#1B2559]">
                              Rp {ord.total_amount.toLocaleString('id-ID')}
                              <span className="block text-[10px] text-[#A3AED0] font-normal">{ord.payment_type}</span>
                            </td>

                            <td className="py-4">
                              <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase ${
                                ord.payment_status === 'PAID'
                                  ? 'bg-[#05CD99]/10 text-[#05CD99]'
                                  : 'bg-[#FFB547]/10 text-[#FFB547]'
                              }`}>
                                {ord.payment_status}
                              </span>
                            </td>

                            <td className="py-4">
                              {ord.waybill_number ? (
                                <div>
                                  <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#EBF3FF] text-[#3399FF] uppercase">
                                    {ord.fulfillment_status}
                                  </span>
                                  <span className="block font-mono text-[11px] text-[#2B3674] font-semibold mt-1">
                                    {ord.waybill_number}
                                  </span>
                                </div>
                              ) : (
                                <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold text-[#A3AED0] bg-[#F4F7FE]">
                                  {ord.payment_status === 'PAID' ? 'NEEDS WAYBILL' : 'AWAITING PAYMENT'}
                                </span>
                              )}
                            </td>

                            <td className="py-4 text-right">
                              <button
                                onClick={() => {
                                  setSelectedOrder(ord);
                                  setWaybillInput(ord.waybill_number || '');
                                }}
                                className="px-4 py-2 bg-[#F4F7FE] hover:bg-[#4318FF] hover:text-white text-[#4318FF] rounded-xl text-xs font-bold transition-all shadow-xs"
                              >
                                Manage Order
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

          {/* ═══════════════════════════════════════════════════
              TAB 3: BITESHIP LOGISTICS HUB
             ═══════════════════════════════════════════════════ */}
          {activeTab === 'logistics' && (
            <div className="space-y-6 animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="bg-white rounded-[20px] p-6 shadow-[0px_18px_40px_rgba(112,144,176,0.08)] space-y-2">
                  <span className="text-[#A3AED0] text-xs font-bold uppercase tracking-wider">WAREHOUSE ORIGIN</span>
                  <div className="text-base font-bold text-[#1B2559]">Senopati Atelier HQ</div>
                  <p className="text-xs text-[#707EAE]">
                    Kebayoran Baru, Jakarta Selatan, DKI Jakarta 12190
                  </p>
                  <span className="text-xs text-[#05CD99] font-bold block pt-1">
                    ✓ Verified Biteship Geolocation
                  </span>
                </div>

                <div className="bg-white rounded-[20px] p-6 shadow-[0px_18px_40px_rgba(112,144,176,0.08)] space-y-2">
                  <span className="text-[#A3AED0] text-xs font-bold uppercase tracking-wider">SUPPORTED COURIERS</span>
                  <div className="text-base font-bold text-[#1B2559]">JNE • SiCepat • J&T • Anteraja</div>
                  <p className="text-xs text-[#707EAE]">
                    Regular, Express (YES), Cargo & Instant Courier Enabled.
                  </p>
                  <span className="text-xs text-[#3399FF] font-bold block pt-1">
                    ✓ Aggregator Live API
                  </span>
                </div>

                <div className="bg-white rounded-[20px] p-6 shadow-[0px_18px_40px_rgba(112,144,176,0.08)] space-y-2">
                  <span className="text-[#A3AED0] text-xs font-bold uppercase tracking-wider">WHATSAPP DISPATCH</span>
                  <div className="text-base font-bold text-[#05CD99]">Automated Concierge</div>
                  <p className="text-xs text-[#707EAE]">
                    Customers receive live tracking URL upon waybill registration.
                  </p>
                  <span className="text-xs text-[#A3AED0] block pt-1">
                    Powered by Fonnte / Wablas API
                  </span>
                </div>
              </div>

              {/* Ready to Pickup Table */}
              <div className="bg-white rounded-[24px] p-6 shadow-[0px_18px_40px_rgba(112,144,176,0.08)]">
                <h3 className="text-lg font-bold text-[#1B2559] mb-4">
                  Courier Pickup Queue
                </h3>

                <div className="divide-y divide-[#F4F7FE]">
                  {orders.filter((o) => o.payment_status === 'PAID').map((ord) => (
                    <div key={ord.id} className="py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-sm font-bold text-[#1B2559]">{ord.id}</span>
                          <span className="text-xs font-bold bg-[#EBF3FF] text-[#3399FF] px-2.5 py-0.5 rounded-full uppercase">
                            {ord.courier_name} {ord.courier_service}
                          </span>
                        </div>
                        <span className="text-xs text-[#2B3674] block font-medium">{ord.customer_name} — {ord.address_detail}</span>
                        <span className="text-xs text-[#A3AED0] font-mono">
                          {ord.items.map((i) => `${i.name} (${i.size})`).join(', ')}
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        {ord.waybill_number ? (
                          <span className="text-xs font-mono font-bold text-[#05CD99] bg-[#05CD99]/10 px-3.5 py-2 rounded-xl">
                            Waybill: {ord.waybill_number}
                          </span>
                        ) : (
                          <button
                            onClick={() => {
                              setSelectedOrder(ord);
                              setWaybillInput('');
                            }}
                            className="px-4 py-2 bg-[#4318FF] text-white font-bold text-xs rounded-xl shadow-xs hover:bg-[#3311CC] transition-colors"
                          >
                            Generate Waybill
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ═══════════════════════════════════════════════════
              TAB 4: STOCK & ATELIER PIPELINE
             ═══════════════════════════════════════════════════ */}
          {activeTab === 'inventory' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center justify-between bg-white p-5 rounded-[20px] shadow-[0px_18px_40px_rgba(112,144,176,0.06)]">
                <div>
                  <h3 className="text-lg font-bold text-[#1B2559]">Garment Inventory Matrix</h3>
                  <p className="text-xs text-[#A3AED0]">Real-time stock per sizing for Tarombo Drop 01</p>
                </div>
                <span className="text-xs font-bold bg-[#F4F7FE] text-[#4318FF] px-3.5 py-2 rounded-xl font-mono">
                  Total Units: {totalUnits} Pcs
                </span>
              </div>

              {/* 5 SKU Product Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {stockState.map((product) => (
                  <div key={product.id} className="bg-white rounded-[20px] p-5 shadow-[0px_18px_40px_rgba(112,144,176,0.08)] flex flex-col justify-between">
                    <div className="flex items-start gap-4">
                      <img src={product.primaryImage} alt={product.name} className="w-20 h-24 object-cover rounded-xl shrink-0" />
                      <div>
                        <span className="text-[10px] font-bold font-mono text-[#A3AED0] uppercase">{product.id} • {product.badge}</span>
                        <h4 className="font-bold text-base text-[#1B2559] mt-0.5">{product.name}</h4>
                        <span className="text-xs font-bold text-[#4318FF] font-mono block mt-1">{product.priceFormatted}</span>
                        <span className="text-xs text-[#707EAE] block mt-0.5">{product.fabric} ({product.weight})</span>
                      </div>
                    </div>

                    {/* Sizing Controller */}
                    <div className="mt-5 pt-4 border-t border-[#F4F7FE] flex flex-wrap items-center gap-2">
                      {product.sizes.map((sz) => {
                        const count = product.stockPerSize[sz] || 0;
                        return (
                          <div key={sz} className="bg-[#F4F7FE] rounded-xl p-2 text-center flex-1 min-w-[64px]">
                            <span className="text-[10px] font-bold text-[#A3AED0] block uppercase">{sz}</span>
                            <div className="flex items-center justify-center gap-1.5 mt-1">
                              <button
                                onClick={() => handleStockDelta(product.id, sz, -1)}
                                className="w-5 h-5 rounded-md bg-white hover:bg-neutral-200 text-[#2B3674] font-bold text-xs flex items-center justify-center shadow-xs"
                              >
                                -
                              </button>
                              <span className={`font-mono text-xs font-bold ${count < 15 ? 'text-[#FFB547]' : 'text-[#1B2559]'}`}>
                                {count}
                              </span>
                              <button
                                onClick={() => handleStockDelta(product.id, sz, 1)}
                                className="w-5 h-5 rounded-md bg-white hover:bg-neutral-200 text-[#2B3674] font-bold text-xs flex items-center justify-center shadow-xs"
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

              {/* Production Batch Stages */}
              <div className="bg-white rounded-[24px] p-6 shadow-[0px_18px_40px_rgba(112,144,176,0.08)] space-y-4">
                <h3 className="text-lg font-bold text-[#1B2559]">Production Batch Pipeline</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {PRODUCTION_STAGES.map((stg) => (
                    <div key={stg.id} className="p-4 bg-[#F4F7FE] rounded-2xl space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-[#A3AED0] font-mono">{stg.date}</span>
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                          stg.status === 'Completed' ? 'bg-[#05CD99]/10 text-[#05CD99]' : stg.status === 'In Progress' ? 'bg-[#3399FF]/10 text-[#3399FF]' : 'bg-neutral-200 text-[#707EAE]'
                        }`}>
                          {stg.status}
                        </span>
                      </div>
                      <h4 className="font-bold text-sm text-[#1B2559]">{stg.name}</h4>
                      <div className="w-full bg-white h-2 rounded-full overflow-hidden shadow-inner">
                        <div className="bg-[#4318FF] h-full rounded-full transition-all" style={{ width: `${stg.progress}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ═══════════════════════════════════════════════════
              TAB 5: MIDTRANS FINANCIAL RECONCILIATION
             ═══════════════════════════════════════════════════ */}
          {activeTab === 'finance' && (currentUser.role === 'SUPER_ADMIN' || currentUser.role === 'FINANCE') && (
            <div className="space-y-6 animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="bg-white rounded-[20px] p-6 shadow-[0px_18px_40px_rgba(112,144,176,0.08)] space-y-1">
                  <span className="text-[#A3AED0] text-xs font-bold uppercase">GROSS MIDTRANS TRANSACTIONS</span>
                  <div className="text-2xl font-bold text-[#1B2559]">Rp {totalOmset.toLocaleString('id-ID')}</div>
                  <span className="text-xs text-[#05CD99] font-bold">100% SHA-512 Validated</span>
                </div>

                <div className="bg-white rounded-[20px] p-6 shadow-[0px_18px_40px_rgba(112,144,176,0.08)] space-y-1">
                  <span className="text-[#A3AED0] text-xs font-bold uppercase">ESTIMATED GATEWAY MDR (1.5%)</span>
                  <div className="text-2xl font-bold text-[#707EAE]">Rp {Math.round(totalOmset * 0.015).toLocaleString('id-ID')}</div>
                  <span className="text-xs text-[#A3AED0]">Standard Midtrans Fee</span>
                </div>

                <div className="bg-white rounded-[20px] p-6 shadow-[0px_18px_40px_rgba(112,144,176,0.08)] space-y-1">
                  <span className="text-[#A3AED0] text-xs font-bold uppercase">NET CORPORATE PAYOUT</span>
                  <div className="text-2xl font-bold text-[#05CD99]">Rp {Math.round(totalOmset * 0.985).toLocaleString('id-ID')}</div>
                  <span className="text-xs text-[#707EAE]">BCA Memoedja Corporate</span>
                </div>
              </div>

              {/* Payment Methods Breakdown */}
              <div className="bg-white rounded-[24px] p-6 shadow-[0px_18px_40px_rgba(112,144,176,0.08)] space-y-4">
                <h3 className="text-lg font-bold text-[#1B2559]">Payment Method Analytics</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  <div className="p-4 bg-[#F4F7FE] rounded-2xl space-y-1">
                    <span className="text-[#707EAE] font-bold uppercase">QRIS (GoPay / BCA Mobile)</span>
                    <div className="text-xl font-bold text-[#1B2559]">62% Volume</div>
                    <span className="text-[#05CD99] font-bold">Instant Settlement</span>
                  </div>
                  <div className="p-4 bg-[#F4F7FE] rounded-2xl space-y-1">
                    <span className="text-[#707EAE] font-bold uppercase">Virtual Account (BCA / Mandiri)</span>
                    <div className="text-xl font-bold text-[#1B2559]">28% Volume</div>
                    <span className="text-[#3399FF] font-bold">Auto-Reconciled</span>
                  </div>
                  <div className="p-4 bg-[#F4F7FE] rounded-2xl space-y-1">
                    <span className="text-[#707EAE] font-bold uppercase">Credit Card (Visa / Mastercard)</span>
                    <div className="text-xl font-bold text-[#1B2559]">10% Volume</div>
                    <span className="text-[#868CFF] font-bold">3D Secure Verified</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ═══════════════════════════════════════════════════
              TAB 6: TEAM PERMISSIONS & RBAC
             ═══════════════════════════════════════════════════ */}
          {activeTab === 'users' && currentUser.role === 'SUPER_ADMIN' && (
            <div className="space-y-6 animate-fade-in">
              <div className="bg-white rounded-[24px] p-6 shadow-[0px_18px_40px_rgba(112,144,176,0.08)] divide-y divide-[#F4F7FE]">
                <div className="pb-4">
                  <h3 className="text-lg font-bold text-[#1B2559]">Internal Team Role-Based Access</h3>
                  <p className="text-xs text-[#A3AED0]">Manage user permissions for Memoedja operations</p>
                </div>

                {USERS.map((u) => (
                  <div key={u.id} className="py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#868CFF] to-[#4318FF] text-white flex items-center justify-center font-bold text-xs">
                        {u.avatar}
                      </div>
                      <div>
                        <div className="font-bold text-sm text-[#1B2559]">{u.name}</div>
                        <span className="text-xs text-[#A3AED0]">{u.email} • {u.title}</span>
                      </div>
                    </div>
                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${u.bgBadge}`}>
                      {u.roleLabel}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ═══════════════════════════════════════════════════
              TAB 7: EMBEDDED DOCUMENTATION & GUIDES
             ═══════════════════════════════════════════════════ */}
          {activeTab === 'docs' && (
            <div className="bg-white rounded-[24px] p-8 shadow-[0px_18px_40px_rgba(112,144,176,0.08)] space-y-6 text-xs text-[#2B3674] leading-relaxed">
              <div className="border-b border-[#F4F7FE] pb-4">
                <h3 className="text-xl font-bold text-[#1B2559]">Shared Hosting (cPanel) Deployment Architecture</h3>
                <p className="text-xs text-[#A3AED0]">No Node.js daemon required — Native PHP 8.x + MySQL + Static React SPA</p>
              </div>

              <div>
                <h4 className="font-bold text-sm text-[#1B2559] mb-1">1. Routing Structure (.htaccess)</h4>
                <p className="text-[#707EAE]">
                  Requests are seamlessly delegated: frontend URLs are routed to <code className="bg-[#F4F7FE] text-[#4318FF] px-1.5 py-0.5 rounded font-mono font-bold">index.html</code> (HTML5 History Mode), while <code className="bg-[#F4F7FE] text-[#4318FF] px-1.5 py-0.5 rounded font-mono font-bold">/api/*</code> requests execute native PHP scripts directly without framework overhead.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-sm text-[#1B2559] mb-1">2. Zero Trust Security & Anti-Abuse</h4>
                <p className="text-[#707EAE]">
                  Item prices are strictly validated on the server. The Midtrans Snap token generation verifies gross amounts against official prices, and the webhook listener validates SHA-512 cryptographic signatures.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-sm text-[#1B2559] mb-1">3. Automated GitHub Actions Deployer</h4>
                <p className="text-[#707EAE]">
                  Pushes to <code className="bg-[#F4F7FE] text-[#4318FF] px-1.5 py-0.5 rounded font-mono font-bold">main</code> trigger automatic Vite compilation and FTPS synchronization to cPanel <code className="bg-[#F4F7FE] text-[#4318FF] px-1.5 py-0.5 rounded font-mono font-bold">public_html</code> via <code className="bg-[#F4F7FE] text-[#4318FF] px-1.5 py-0.5 rounded font-mono font-bold">.github/workflows/deploy-cpanel.yml</code>.
                </p>
              </div>
            </div>
          )}

        </main>
      </div>

      {/* ═══════════════════════════════════════════════════════════
          HORIZON UI ORDER MANAGEMENT SLIDE-OVER DRAWER
         ═══════════════════════════════════════════════════════════ */}
      {selectedOrder && (
        <div className="fixed inset-0 z-60 bg-black/40 backdrop-blur-xs flex justify-end animate-fade-in">
          <div className="w-full max-w-lg bg-white h-full p-8 flex flex-col justify-between overflow-y-auto shadow-2xl">
            <div className="space-y-6">
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-[#F4F7FE]">
                <div>
                  <span className="text-[10px] font-bold text-[#A3AED0] uppercase">Order Details</span>
                  <h3 className="font-mono text-lg font-bold text-[#1B2559]">{selectedOrder.id}</h3>
                </div>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="w-8 h-8 rounded-full bg-[#F4F7FE] text-[#A3AED0] hover:text-[#2B3674] flex items-center justify-center transition-colors"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Status Badges */}
              <div className="flex items-center gap-2">
                <span className={`text-xs font-bold px-3 py-1 rounded-full uppercase ${
                  selectedOrder.payment_status === 'PAID'
                    ? 'bg-[#05CD99]/10 text-[#05CD99]'
                    : 'bg-[#FFB547]/10 text-[#FFB547]'
                }`}>
                  {selectedOrder.payment_status}
                </span>

                <span className="text-xs font-bold px-3 py-1 rounded-full uppercase bg-[#EBF3FF] text-[#3399FF]">
                  {selectedOrder.fulfillment_status}
                </span>
              </div>

              {/* Customer Box */}
              <div className="p-4 bg-[#F4F7FE] rounded-2xl space-y-2 text-xs">
                <span className="text-[10px] font-bold text-[#A3AED0] uppercase block">RECIPIENT INFORMATION</span>
                <div className="font-bold text-sm text-[#1B2559]">{selectedOrder.customer_name}</div>
                <div className="flex items-center gap-2 text-[#707EAE]">
                  <span>{selectedOrder.customer_email}</span>
                  <span>•</span>
                  <a
                    href={`https://wa.me/${selectedOrder.customer_phone.replace(/^0/, '62')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#05CD99] font-bold hover:underline inline-flex items-center gap-1 font-mono"
                  >
                    <Phone size={11} />
                    <span>{selectedOrder.customer_phone}</span>
                  </a>
                </div>
                <p className="text-[#2B3674] font-medium leading-relaxed pt-2 border-t border-white/60">
                  <MapPin size={12} className="inline mr-1 text-[#4318FF]" />
                  {selectedOrder.address_detail}
                </p>
              </div>

              {/* Garments List */}
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-[#A3AED0] uppercase block">ORDERED ITEMS</span>
                {selectedOrder.items.map((it, idx) => (
                  <div key={idx} className="p-3 bg-[#F4F7FE] rounded-2xl flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img src={it.img} alt={it.name} className="w-10 h-12 object-cover rounded-lg" />
                      <div>
                        <div className="font-bold text-xs text-[#1B2559]">{it.name}</div>
                        <span className="text-[11px] font-mono text-[#A3AED0]">Size: {it.size} • Qty: {it.quantity}x</span>
                      </div>
                    </div>
                    <span className="font-mono text-xs font-bold text-[#1B2559]">
                      Rp {(it.price * it.quantity).toLocaleString('id-ID')}
                    </span>
                  </div>
                ))}
              </div>

              {/* Pricing breakdown */}
              <div className="p-4 bg-[#F4F7FE] rounded-2xl text-xs font-mono space-y-1.5">
                <div className="flex justify-between text-[#707EAE]">
                  <span>Subtotal:</span>
                  <span>Rp {selectedOrder.subtotal_amount.toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between text-[#707EAE]">
                  <span>Shipping ({selectedOrder.courier_name} {selectedOrder.courier_service}):</span>
                  <span>Rp {selectedOrder.shipping_cost.toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between text-[#1B2559] font-bold text-sm pt-2 border-t border-white/60">
                  <span>Grand Total:</span>
                  <span className="text-[#05CD99]">Rp {selectedOrder.total_amount.toLocaleString('id-ID')}</span>
                </div>
              </div>

              {/* Waybill Input */}
              <div className="p-4 bg-[#F4F7FE] rounded-2xl space-y-2.5">
                <label className="text-[10px] font-bold text-[#2B3674] uppercase block">
                  Biteship Waybill / Courier Resi
                </label>
                <input
                  type="text"
                  placeholder="e.g. JNE88291029312 / SCP9928192"
                  value={waybillInput}
                  onChange={(e) => setWaybillInput(e.target.value)}
                  className="w-full bg-white border-none rounded-xl p-3 text-xs font-mono text-[#2B3674] font-bold outline-none focus:ring-2 focus:ring-[#4318FF]/20"
                />

                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="waNotifyCheck"
                    checked={notifyWa}
                    onChange={(e) => setNotifyWa(e.target.checked)}
                    className="rounded text-[#4318FF] focus:ring-[#4318FF]"
                  />
                  <label htmlFor="waNotifyCheck" className="text-xs text-[#707EAE] cursor-pointer">
                    Send WhatsApp dispatch message with tracking link
                  </label>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-6 border-t border-[#F4F7FE] flex gap-3">
              <button
                onClick={() => setSelectedOrder(null)}
                className="flex-1 py-3 rounded-xl bg-[#F4F7FE] text-[#707EAE] font-bold text-xs hover:bg-neutral-200 transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => handleSaveWaybill(selectedOrder.id)}
                className="flex-1 py-3 rounded-xl bg-[#4318FF] text-white font-bold text-xs shadow-[0px_10px_20px_rgba(67,24,255,0.24)] hover:bg-[#3311CC] transition-colors"
              >
                Save & Dispatch
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
