import React, { useState } from 'react';
import { X, CheckCircle, ShieldCheck, QrCode, CreditCard, Building2, Copy } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function CheckoutModal({
  isOpen,
  onClose,
  items,
  onSuccessfulOrder
}) {
  if (!isOpen) return null;

  const [step, setStep] = useState(1);
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

      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {}

      if (onSuccessfulOrder) {
        onSuccessfulOrder(items, randomOrderId);
      }
    }, 1000);
  };

  const handleCopyVA = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedVA(true);
    setTimeout(() => setCopiedVA(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
      <div className="relative bg-[#FFFFFF] w-full max-w-2xl border border-[#EAEAEA] shadow-2xl overflow-hidden my-auto max-h-[95vh] flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-[#EAEAEA] flex items-center justify-between bg-[#FFFFFF]">
          <div>
            <span className="text-[9px] tracking-[0.3em] uppercase text-[#777777] block font-mono">
              MEMOEDJA CHECKOUT
            </span>
            <h3 className="font-editorial text-2xl font-light text-black">
              {step === 1 && "Detail Pengiriman"}
              {step === 2 && "Metode Pembayaran"}
              {step === 3 && "Pesanan Dikonfirmasi"}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-[#777777] hover:text-black p-1 transition-colors"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        {/* Step Indicator */}
        <div className="grid grid-cols-3 text-center border-b border-[#EAEAEA] text-[9.5px] tracking-wider uppercase font-medium">
          <div className={`py-2.5 ${step >= 1 ? "bg-black text-white" : "bg-[#FAFAFA] text-[#888888]"}`}>
            1. Alamat
          </div>
          <div className={`py-2.5 ${step >= 2 ? "bg-black text-white" : "bg-[#FAFAFA] text-[#888888]"}`}>
            2. Pembayaran
          </div>
          <div className={`py-2.5 ${step === 3 ? "bg-black text-white" : "bg-[#FAFAFA] text-[#888888]"}`}>
            3. Verifikasi
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 md:p-8 overflow-y-auto flex-1 bg-[#FFFFFF]">
          {step === 1 && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[9.5px] tracking-wider uppercase font-semibold text-black mb-1">
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full p-2.5 text-xs bg-white border border-[#EAEAEA] focus:border-black outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[9.5px] tracking-wider uppercase font-semibold text-black mb-1">
                    WhatsApp
                  </label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full p-2.5 text-xs bg-white border border-[#EAEAEA] focus:border-black outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[9.5px] tracking-wider uppercase font-semibold text-black mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full p-2.5 text-xs bg-white border border-[#EAEAEA] focus:border-black outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[9.5px] tracking-wider uppercase font-semibold text-black mb-1">
                    Kota / Wilayah
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full p-2.5 text-xs bg-white border border-[#EAEAEA] focus:border-black outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[9.5px] tracking-wider uppercase font-semibold text-black mb-1">
                    Kurir
                  </label>
                  <select
                    value={formData.courier}
                    onChange={(e) => setFormData({ ...formData, courier: e.target.value })}
                    className="w-full p-2.5 text-xs bg-white border border-[#EAEAEA] focus:border-black outline-none"
                  >
                    <option>JNE YES (Next Day) - Complimentary</option>
                    <option>SiCepat Best - Complimentary</option>
                    <option>Paxel Same Day - Complimentary</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[9.5px] tracking-wider uppercase font-semibold text-black mb-1">
                  Alamat Lengkap
                </label>
                <textarea
                  rows={2}
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full p-2.5 text-xs bg-white border border-[#EAEAEA] focus:border-black outline-none"
                />
              </div>

              <div className="p-4 bg-[#FAFAFA] border border-[#EAEAEA] flex items-center justify-between">
                <div>
                  <span className="text-[9px] uppercase tracking-wider text-[#777777] block font-mono">
                    Total ({items.length} item)
                  </span>
                  <span className="font-editorial text-xl font-bold text-black font-mono">
                    {subtotalFormatted}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="bg-black hover:bg-black/85 text-white text-[9.5px] tracking-[0.2em] uppercase font-normal py-3 px-6 transition-colors"
                >
                  Lanjut ke Pembayaran →
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod("qris")}
                  className={`p-3 border flex flex-col items-center gap-1.5 transition-all ${
                    paymentMethod === "qris" ? "bg-[#FAFAFA] border-black" : "bg-white border-[#EAEAEA] hover:border-black"
                  }`}
                >
                  <QrCode size={18} className="text-black" />
                  <span className="text-[10.5px] font-medium text-black">QRIS</span>
                  <span className="text-[8.5px] text-[#777777]">GoPay / OVO</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod("va")}
                  className={`p-3 border flex flex-col items-center gap-1.5 transition-all ${
                    paymentMethod === "va" ? "bg-[#FAFAFA] border-black" : "bg-white border-[#EAEAEA] hover:border-black"
                  }`}
                >
                  <Building2 size={18} className="text-black" />
                  <span className="text-[10.5px] font-medium text-black">Virtual Account</span>
                  <span className="text-[8.5px] text-[#777777]">BCA / Mandiri</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod("cc")}
                  className={`p-3 border flex flex-col items-center gap-1.5 transition-all ${
                    paymentMethod === "cc" ? "bg-[#FAFAFA] border-black" : "bg-white border-[#EAEAEA] hover:border-black"
                  }`}
                >
                  <CreditCard size={18} className="text-black" />
                  <span className="text-[10.5px] font-medium text-black">Kartu Kredit</span>
                  <span className="text-[8.5px] text-[#777777]">Visa / Master</span>
                </button>
              </div>

              <div className="p-6 bg-[#FAFAFA] border border-[#EAEAEA] text-center">
                {paymentMethod === "qris" && (
                  <div className="flex flex-col items-center">
                    <span className="text-[9.5px] tracking-widest uppercase font-semibold text-black mb-1">
                      SCAN QRIS RESMI
                    </span>
                    <p className="text-[10.5px] text-[#777777] mb-3">
                      Buka aplikasi BCA Mobile, GoPay, OVO, ShopeePay, atau Livin Mandiri.
                    </p>
                    <div className="p-2 bg-white border border-[#EAEAEA] inline-block mb-3">
                      <img
                        src="https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=MEMOEDJA-SIMULATION-PAYMENT-OK"
                        alt="QRIS Barcode"
                        className="w-36 h-36"
                      />
                    </div>
                    <span className="text-[11px] font-mono text-black font-semibold">
                      Total Tagihan: {subtotalFormatted}
                    </span>
                  </div>
                )}

                {paymentMethod === "va" && (
                  <div className="text-left space-y-3">
                    <div className="p-3 bg-white border border-[#EAEAEA]">
                      <span className="text-[9px] uppercase text-[#777777] block font-mono">Bank</span>
                      <strong className="text-xs text-black">BCA Virtual Account (014)</strong>
                    </div>
                    <div className="p-3 bg-white border border-[#EAEAEA] flex items-center justify-between">
                      <div>
                        <span className="text-[9px] uppercase text-[#777777] block font-mono">Nomor VA</span>
                        <strong className="text-sm font-mono text-black">8801 2948 1029 4812</strong>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleCopyVA("8801294810294812")}
                        className="text-[9.5px] uppercase tracking-wider bg-white border border-[#CCCCCC] px-3 py-1 hover:bg-black hover:text-white transition-colors flex items-center gap-1"
                      >
                        <Copy size={11} />
                        <span>{copiedVA ? "Tersalin" : "Salin"}</span>
                      </button>
                    </div>
                  </div>
                )}

                {paymentMethod === "cc" && (
                  <div className="text-left space-y-3">
                    <div>
                      <label className="block text-[9.5px] uppercase font-semibold text-black mb-1">Nomor Kartu</label>
                      <input
                        type="text"
                        defaultValue="4111 2222 3333 4444"
                        className="w-full p-2 text-xs bg-white border border-[#EAEAEA]"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[9.5px] uppercase font-semibold text-black mb-1">Exp</label>
                        <input
                          type="text"
                          defaultValue="08/28"
                          className="w-full p-2 text-xs bg-white border border-[#EAEAEA]"
                        />
                      </div>
                      <div>
                        <label className="block text-[9.5px] uppercase font-semibold text-black mb-1">CVV</label>
                        <input
                          type="password"
                          defaultValue="891"
                          className="w-full p-2 text-xs bg-white border border-[#EAEAEA]"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between gap-4 pt-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-xs uppercase text-[#777777] hover:text-black"
                >
                  ← Kembali
                </button>
                <button
                  type="button"
                  onClick={handleSimulatePayment}
                  disabled={isProcessing}
                  className="bg-black hover:bg-black/85 text-white text-[10px] tracking-[0.2em] uppercase font-normal py-3.5 px-8 transition-colors disabled:opacity-50"
                >
                  {isProcessing ? "Memverifikasi..." : "Konfirmasi & Bayar"}
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="text-center py-6 space-y-6">
              <div className="w-14 h-14 bg-[#FAFAFA] border border-[#EAEAEA] text-black rounded-full flex items-center justify-center mx-auto">
                <CheckCircle size={32} />
              </div>

              <div>
                <span className="text-[9.5px] tracking-[0.3em] uppercase text-[#777777] font-mono block mb-1">
                  ORDER CONFIRMED
                </span>
                <h3 className="font-editorial text-3xl font-light text-black">
                  Terima Kasih, {formData.name}
                </h3>
                <p className="text-xs text-[#666666] max-w-md mx-auto mt-2 font-light">
                  Pesanan pakaian Tarombo Anda telah terverifikasi secara resmi.
                </p>
              </div>

              <div className="p-6 bg-[#FAFAFA] border border-[#EAEAEA] text-left max-w-lg mx-auto">
                <div className="flex items-center justify-between pb-3 border-b border-[#EAEAEA]">
                  <div>
                    <span className="text-[9px] uppercase text-[#777777] block font-mono">No. Pesanan</span>
                    <strong className="text-sm font-mono text-black">#{orderId}</strong>
                  </div>
                  <span className="text-[9.5px] font-semibold uppercase bg-black text-white px-2 py-0.5 font-mono">
                    LUNAS
                  </span>
                </div>

                <div className="py-4 space-y-2 text-xs border-b border-[#EAEAEA]">
                  {items.map((it) => (
                    <div key={`${it.product.id}-${it.size}`} className="flex justify-between text-black">
                      <span>{it.quantity}x {it.product.name} ({it.size})</span>
                      <span className="font-mono">
                        {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(it.product.price * it.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-3 flex justify-between items-center text-sm font-semibold text-black">
                  <span>Total</span>
                  <span className="font-editorial text-lg font-mono">{subtotalFormatted}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="bg-black hover:bg-black/85 text-white text-[10px] tracking-[0.25em] uppercase font-normal py-3 px-8 transition-colors"
              >
                KEMBALI KE BRAND
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
