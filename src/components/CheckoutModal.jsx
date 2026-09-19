import React, { useState } from 'react';
import { X, CheckCircle, ShieldCheck, QrCode, CreditCard, Building2, Truck, Copy, Download, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function CheckoutModal({
  isOpen,
  onClose,
  items,
  onSuccessfulOrder
}) {
  if (!isOpen) return null;

  const [step, setStep] = useState(1); // 1: Shipping, 2: Payment, 3: Confirmation
  const [formData, setFormData] = useState({
    name: "Arya Pratama",
    phone: "081289123456",
    email: "arya.pratama@example.com",
    city: "Jakarta Selatan",
    address: "Jl. Senopati No. 42, Kebayoran Baru",
    courier: "JNE YES (Next Day)"
  });
  const [paymentMethod, setPaymentMethod] = useState("qris");
  const [copiedVA, setCopiedVA] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderId, setOrderId] = useState("");

  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const subtotalFormatted = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(subtotal);

  const handleSimulatePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      const randomOrderId = `MMDJ-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
      setOrderId(randomOrderId);
      setStep(3);

      // Trigger confetti celebration
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {
        // Fallback silently if canvas-confetti fails
      }

      // Notify parent to deduct inventory
      if (onSuccessfulOrder) {
        onSuccessfulOrder(items, randomOrderId);
      }
    }, 1200);
  };

  const handleCopyVA = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedVA(true);
    setTimeout(() => setCopiedVA(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
      <div className="relative bg-[#FAF8F5] w-full max-w-2xl rounded-sm shadow-2xl border border-[#DDD6CB] overflow-hidden my-auto max-h-[95vh] flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-[#EAE5DC] flex items-center justify-between bg-[#F4EFE6]">
          <div>
            <span className="text-[9px] tracking-[0.3em] uppercase text-[#8C4A32] font-semibold block">
              MEMOEDJA CHECKOUT
            </span>
            <h3 className="font-editorial text-2xl font-light text-[#121212]">
              {step === 1 && "Detail Pengiriman"}
              {step === 2 && "Pilih Metode Pembayaran"}
              {step === 3 && "Pesanan Dikonfirmasi"}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-[#6B635A] hover:text-[#121212] p-1.5 transition-colors"
            aria-label="Close Checkout"
          >
            <X size={20} />
          </button>
        </div>

        {/* Step Indicator */}
        <div className="grid grid-cols-3 text-center border-b border-[#EAE5DC] text-[10px] tracking-wider uppercase font-semibold">
          <div className={`py-2.5 ${step >= 1 ? "bg-[#121212] text-white" : "bg-[#F0EBE1] text-[#857C72]"}`}>
            1. Alamat
          </div>
          <div className={`py-2.5 ${step >= 2 ? "bg-[#121212] text-white" : "bg-[#F0EBE1] text-[#857C72]"}`}>
            2. Pembayaran
          </div>
          <div className={`py-2.5 ${step === 3 ? "bg-[#8C4A32] text-white" : "bg-[#F0EBE1] text-[#857C72]"}`}>
            3. Verifikasi
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 md:p-8 overflow-y-auto flex-1">
          {step === 1 && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] tracking-wider uppercase font-bold text-[#4A443D] mb-1">
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full p-2.5 text-xs bg-white border border-[#DDD6CB] rounded-sm focus:border-[#121212] outline-none"
                    placeholder="Contoh: Arya Pratama"
                  />
                </div>
                <div>
                  <label className="block text-[10px] tracking-wider uppercase font-bold text-[#4A443D] mb-1">
                    Nomor WhatsApp
                  </label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full p-2.5 text-xs bg-white border border-[#DDD6CB] rounded-sm focus:border-[#121212] outline-none"
                    placeholder="0812xxxxxxxx"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] tracking-wider uppercase font-bold text-[#4A443D] mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full p-2.5 text-xs bg-white border border-[#DDD6CB] rounded-sm focus:border-[#121212] outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] tracking-wider uppercase font-bold text-[#4A443D] mb-1">
                    Kota / Wilayah
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full p-2.5 text-xs bg-white border border-[#DDD6CB] rounded-sm focus:border-[#121212] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] tracking-wider uppercase font-bold text-[#4A443D] mb-1">
                    Layanan Kurir
                  </label>
                  <select
                    value={formData.courier}
                    onChange={(e) => setFormData({ ...formData, courier: e.target.value })}
                    className="w-full p-2.5 text-xs bg-white border border-[#DDD6CB] rounded-sm focus:border-[#121212] outline-none"
                  >
                    <option>JNE YES (Next Day) - Complimentary</option>
                    <option>SiCepat Best - Complimentary</option>
                    <option>Paxel Same Day (Jabodetabek) - Complimentary</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] tracking-wider uppercase font-bold text-[#4A443D] mb-1">
                  Alamat Pengiriman Lengkap
                </label>
                <textarea
                  rows={2}
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full p-2.5 text-xs bg-white border border-[#DDD6CB] rounded-sm focus:border-[#121212] outline-none"
                />
              </div>

              {/* Order Summary Mini Box */}
              <div className="p-4 bg-[#F2EDE4] rounded-sm border border-[#DDD6CB] flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#7A7268] block">
                    Total Pembayaran ({items.length} item)
                  </span>
                  <span className="font-editorial text-xl font-bold text-[#121212]">
                    {subtotalFormatted}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="bg-[#121212] hover:bg-[#8C4A32] text-white text-[10px] tracking-[0.2em] uppercase font-semibold py-3 px-6 transition-colors shadow-sm"
                >
                  Lanjut ke Pembayaran →
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              {/* Payment Methods Selection */}
              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod("qris")}
                  className={`p-3 rounded-sm border flex flex-col items-center gap-1.5 transition-all ${
                    paymentMethod === "qris"
                      ? "bg-white border-[#8C4A32] ring-1 ring-[#8C4A32]"
                      : "bg-[#F4EFE6] border-[#DDD6CB] hover:bg-white"
                  }`}
                >
                  <QrCode size={20} className={paymentMethod === "qris" ? "text-[#8C4A32]" : "text-[#666]"} />
                  <span className="text-[11px] font-bold text-[#121212]">QRIS</span>
                  <span className="text-[9px] text-[#777]">GoPay / OVO / Dana</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod("va")}
                  className={`p-3 rounded-sm border flex flex-col items-center gap-1.5 transition-all ${
                    paymentMethod === "va"
                      ? "bg-white border-[#8C4A32] ring-1 ring-[#8C4A32]"
                      : "bg-[#F4EFE6] border-[#DDD6CB] hover:bg-white"
                  }`}
                >
                  <Building2 size={20} className={paymentMethod === "va" ? "text-[#8C4A32]" : "text-[#666]"} />
                  <span className="text-[11px] font-bold text-[#121212]">Virtual Account</span>
                  <span className="text-[9px] text-[#777]">BCA / Mandiri / BNI</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod("cc")}
                  className={`p-3 rounded-sm border flex flex-col items-center gap-1.5 transition-all ${
                    paymentMethod === "cc"
                      ? "bg-white border-[#8C4A32] ring-1 ring-[#8C4A32]"
                      : "bg-[#F4EFE6] border-[#DDD6CB] hover:bg-white"
                  }`}
                >
                  <CreditCard size={20} className={paymentMethod === "cc" ? "text-[#8C4A32]" : "text-[#666]"} />
                  <span className="text-[11px] font-bold text-[#121212]">Kartu Kredit</span>
                  <span className="text-[9px] text-[#777]">Visa / Mastercard</span>
                </button>
              </div>

              {/* Payment Details Container */}
              <div className="p-6 bg-white border border-[#DDD6CB] rounded-sm text-center">
                {paymentMethod === "qris" && (
                  <div className="flex flex-col items-center">
                    <span className="text-[10px] tracking-widest uppercase font-bold text-[#121212] mb-1">
                      SCAN QRIS RESMI MEMOEDJA
                    </span>
                    <p className="text-[11px] text-[#777] mb-4">
                      Buka aplikasi BCA Mobile, GoPay, OVO, ShopeePay, atau Livin Mandiri Anda.
                    </p>
                    <div className="p-3 bg-[#FAF8F5] border border-[#DDD6CB] rounded-sm inline-block shadow-inner mb-3">
                      <img
                        src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=MEMOEDJA-SIMULATION-PAYMENT-OK"
                        alt="QRIS Barcode"
                        className="w-40 h-40"
                      />
                    </div>
                    <span className="text-[11px] font-mono text-[#8C4A32] font-semibold">
                      Total Tagihan: {subtotalFormatted}
                    </span>
                  </div>
                )}

                {paymentMethod === "va" && (
                  <div className="text-left space-y-4">
                    <div className="p-3 bg-[#FAF8F5] border border-[#DDD6CB] rounded">
                      <span className="text-[10px] uppercase text-[#777] block">Bank Tujuan</span>
                      <strong className="text-xs text-[#121212]">BCA Virtual Account (014)</strong>
                    </div>
                    <div className="p-3 bg-[#FAF8F5] border border-[#DDD6CB] rounded flex items-center justify-between">
                      <div>
                        <span className="text-[10px] uppercase text-[#777] block">Nomor Virtual Account</span>
                        <strong className="text-sm font-mono text-[#8C4A32]">8801 2948 1029 4812</strong>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleCopyVA("8801294810294812")}
                        className="text-[10px] uppercase tracking-wider bg-white border border-[#DDD6CB] px-3 py-1.5 rounded hover:bg-[#121212] hover:text-white transition-colors flex items-center gap-1"
                      >
                        <Copy size={12} />
                        <span>{copiedVA ? "Tersalin!" : "Salin"}</span>
                      </button>
                    </div>
                  </div>
                )}

                {paymentMethod === "cc" && (
                  <div className="text-left space-y-3">
                    <div>
                      <label className="block text-[10px] uppercase font-bold text-[#4A443D] mb-1">Nomor Kartu</label>
                      <input
                        type="text"
                        defaultValue="4111 2222 3333 4444"
                        className="w-full p-2 text-xs bg-[#FAF8F5] border border-[#DDD6CB] rounded"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] uppercase font-bold text-[#4A443D] mb-1">Expiry</label>
                        <input
                          type="text"
                          defaultValue="08/28"
                          className="w-full p-2 text-xs bg-[#FAF8F5] border border-[#DDD6CB] rounded"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase font-bold text-[#4A443D] mb-1">CVV</label>
                        <input
                          type="password"
                          defaultValue="891"
                          className="w-full p-2 text-xs bg-[#FAF8F5] border border-[#DDD6CB] rounded"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between gap-4 pt-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-xs tracking-wider uppercase text-[#6B635A] hover:text-[#121212]"
                >
                  ← Kembali ke Alamat
                </button>
                <button
                  type="button"
                  onClick={handleSimulatePayment}
                  disabled={isProcessing}
                  className="bg-[#121212] hover:bg-[#8C4A32] text-white text-[11px] tracking-[0.25em] uppercase font-semibold py-3.5 px-8 transition-colors shadow-md disabled:opacity-50 flex items-center gap-2"
                >
                  {isProcessing ? (
                    <span>Memverifikasi Pembayaran...</span>
                  ) : (
                    <span>Konfirmasi & Bayar Sekarang</span>
                  )}
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="text-center py-6 space-y-6">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle size={36} />
              </div>

              <div>
                <span className="text-[10px] tracking-[0.3em] uppercase text-[#8C4A32] font-semibold block mb-1">
                  ORDER CONFIRMED & IN PRODUCTION
                </span>
                <h3 className="font-editorial text-3xl font-light text-[#121212]">
                  Terima Kasih, {formData.name}
                </h3>
                <p className="text-xs text-[#6B635A] max-w-md mx-auto mt-2 font-light">
                  Pesanan pakaian Tarombo Anda telah terverifikasi secara resmi. Tim atelier kami sedang menyiapkan paket eksklusif Anda.
                </p>
              </div>

              {/* Official Receipt Card */}
              <div className="p-6 bg-white border border-[#DDD6CB] rounded-sm text-left max-w-lg mx-auto shadow-sm">
                <div className="flex items-center justify-between pb-3 border-b border-[#EAE5DC]">
                  <div>
                    <span className="text-[9px] uppercase text-[#777] block">Nomor Pesanan</span>
                    <strong className="text-sm font-mono text-[#121212]">#{orderId}</strong>
                  </div>
                  <span className="text-[10px] font-bold uppercase bg-emerald-50 text-emerald-800 px-2.5 py-1 rounded border border-emerald-200">
                    LUNAS / VERIFIED
                  </span>
                </div>

                <div className="py-4 space-y-2 text-xs border-b border-[#EAE5DC]">
                  <div className="text-[10px] uppercase font-bold text-[#857C72] mb-1">Rincian Item:</div>
                  {items.map((it) => (
                    <div key={`${it.product.id}-${it.size}`} className="flex justify-between text-[#333]">
                      <span>{it.quantity}x {it.product.name} (Size: {it.size})</span>
                      <span className="font-medium">
                        {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(it.product.price * it.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-3 flex justify-between items-center text-sm font-semibold text-[#121212]">
                  <span>Total Terbayar</span>
                  <span className="font-editorial text-lg text-[#8C4A32]">{subtotalFormatted}</span>
                </div>

                <div className="mt-4 pt-3 border-t border-dashed border-[#DDD6CB] text-[10px] text-[#777]">
                  Kurir: {formData.courier} • Estimasi Tiba: 2-3 Hari Kerja di {formData.city}
                </div>
              </div>

              <div className="flex justify-center gap-4 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="bg-[#121212] hover:bg-[#8C4A32] text-white text-[11px] tracking-[0.25em] uppercase font-semibold py-3 px-8 transition-colors shadow-md"
                >
                  KEMBALI KE BRAND
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
