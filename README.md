# MEMOEDJA — Contemporary Indonesian Fashion & Lifestyle Platform

> *"Honor confers a crown"*  
> Platform digital editorial & e-commerce kontemporer yang mereinterpretasi budaya Nusantara melalui perspektif desain modern dan konstruksi pakaian bermutu tinggi (*everyday garments*).

Mengacu pada benchmark estetika haute luxury **Christian Dior Fashion** ([dior.com/en_id/fashion](https://www.dior.com/en_id/fashion)) dan filosofi *The Row / Ralph Lauren through an Indonesian lens*.

---

## 🏛️ Fitur Utama Platform

1. **Haute Editorial Storefront**:
   - Tipografi klasik berwibawa (*Cormorant Garamond* & *Plus Jakarta Sans*) dengan *generous whitespace* dan tata letak asimetris.
   - Header minimalis khas luxury brand dengan switch mata uang, pencarian kilat, dan akses *Ops Matrix*.
2. **Prologue 01: Tarombo (Batak Heritage Narrative)**:
   - Storytelling kultural interaktif mengenai silsilah dan pencarian jati diri.
   - Penjelasan formula kreatif: `Past Language + Present Behavior + Shared Human Habit = Familiarity`.
   - Validasi budaya dari gelombang nostalgia modern (musik & fesyen).
3. **Savoir-Faire / Garment Anatomy Explorer**:
   - Modul eksplorasi konstruksi atelier: berat denim (13 Oz & 15 Oz), red-line selvedge ID, jahitan rantai *Union Special chainstitch*, kancing kuningan antik, dan saku utilitas.
4. **Editorial Lookbook & Product Grid**:
   - 5 SKU pembuka: *Selvedge Denim 13 Oz Straight Jeans*, *Denim 15 Oz Bootcut Jeans*, *Cotton Chore Jacket*, *Structured Canvas Shirt*, dan *Cotton Combed Henley Shirt*.
   - Filter kategori (*All, Denim, Outerwear, Tops*), preview multi-sudut pandang pada hover, dan spesifikasi detail.
5. **Interactive Luxury Bag & Checkout**:
   - Slide-out drawer cart dari sisi kanan dengan kalkulasi subtotal instan dalam Rupiah.
   - Formulir pengiriman ke seluruh Indonesia (JNE YES, SiCepat, Paxel).
   - Simulator pembayaran lokal Indonesia: **QRIS** (scan barcode interaktif), **BCA Virtual Account** (dengan fitur salin nomor VA), dan **Kartu Kredit**.
   - Tanda terima resmi pesanan (*Order Receipt*) dengan nomor order unik dan animasi konfeti.
6. **Internal Operations & Inventory Matrix Dashboard**:
   - Kontrol stok real-time per ukuran (28–36, S–XL) yang tersinkronisasi otomatis saat checkout berhasil.
   - Pelacak siklus tahapan produksi (*Fabric Sourcing $\rightarrow$ Cutting $\rightarrow$ Bulk Sewing $\rightarrow$ QC $\rightarrow$ Fulfillment*).
   - Pelacak metrik SOM (*Rp 13 Miliar, 10.000 pelanggan aktif*).

---

## 🚀 Panduan Menjalankan Proyek Secara Lokal

Pastikan Anda telah menginstal **Node.js** (v18+).

```bash
# 1. Masuk ke direktori proyek
cd C:\Users\arief\.gemini\antigravity\scratch\memoedja-web

# 2. Jalankan server pengembangan lokal (Dev Server)
npm run dev

# 3. Buka di browser:
# http://localhost:5173
```

---

## 🌐 Panduan Upload ke Hosting

Proyek ini telah dikonfigurasi agar menghasilkan build statis murni yang **super ringan, cepat, dan siap di-hosting di mana saja**.

### Langkah 1: Buat Bundle Siap Hosting (Build)
```bash
npm run build
```
Perintah ini akan membuat folder `dist/` yang berisi seluruh file HTML, CSS, JavaScript, dan aset web yang telah dioptimasi dan dikompresi.

---

### Opsi A: Hosting Gratis & Otomatis via Vercel (Sangat Direkomendasikan)
1. Buka [vercel.com](https://vercel.com) dan login.
2. Klik **Add New** $\rightarrow$ **Project**.
3. Hubungkan akun GitHub Anda dan pilih repository `memoedja-web` (atau jalankan perintah `npx vercel` langsung di terminal proyek ini).
4. Pengaturan build otomatis terdeteksi:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Klik **Deploy**. Website akan langsung aktif dengan domain HTTPS gratis (contoh: `memoedja.vercel.app`) dan CDN global berkecepatan tinggi!

---

### Opsi B: Drag & Drop via Netlify
1. Buka [app.netlify.com/drop](https://app.netlify.com/drop).
2. Tarik (*drag and drop*) folder `dist` yang ada di dalam `C:\Users\arief\.gemini\antigravity\scratch\memoedja-web\dist` langsung ke browser Anda.
3. Website akan langsung online dalam waktu kurang dari 10 detik!

---

### Opsi C: Web Hosting Tradisional / cPanel (Niagahoster, Hostinger, DomaiNesia, dll)
1. Buka File Manager di cPanel hosting Anda.
2. Masuk ke direktori `public_html/` (atau subdomain yang Anda siapkan).
3. Unggah seluruh isi file yang ada di dalam folder `dist/` (`index.html`, folder `assets/`, dll) ke dalam `public_html/`.
4. Website Memoedja Anda langsung dapat diakses lewat domain utama (contoh: `www.memoedja.com`).

---

## 👥 Tim Pendiri (The Founding Team)

- **Ken Koesumo** — Creative Director (Brand Direction, Visual & Creative System)
- **Farra Meilia** — Fashion Designer (Product Design, Silhouette & Garment Development)
- **Gustaviano Victor** — Chief of Operation (Supply Chain Discipline & Production Workflow)
- **Aristo Rafif** — Chief of Finance (Financial Planning, Unit Economics & Digital Strategy)
- **Kevin Jagar** — Chief of Marketing (Audience Growth, Cultural Liaison & Communication)
