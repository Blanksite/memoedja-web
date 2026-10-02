# Panduan Integrasi Auto-Deploy cPanel via GitHub Actions

Dengan skill ini, setiap kali Anda melakukan `git push origin main`, GitHub Action akan otomatis:
1. Menjalankan `npm run build` untuk mengkompilasi file React terbaru.
2. Mengumpulkan berkas frontend + PHP backend + `.htaccess`.
3. Mengunggahnya langsung ke folder `public_html` di hosting cPanel Anda via FTP.

---

## 3 Langkah Mudah Menghubungkan cPanel ke GitHub

### Langkah 1: Buat Akun FTP di cPanel
1. Buka dashboard cPanel Anda.
2. Cari menu **FTP Accounts**.
3. Buat akun baru:
   - **Log in**: `deployer` (atau nama lain)
   - **Domain**: domain Anda (misal `memoedja.com`)
   - **Password**: Buat password yang kuat.
   - **Directory**: **Wajib diisi `public_html/`** (jangan biarkan default `public_html/deployer`).
4. Klik **Create FTP Account**.

---

### Langkah 2: Masukkan 3 Rahasia (Secrets) di GitHub
1. Buka repositori GitHub Anda: [https://github.com/Blanksite/memoedja-web](https://github.com/Blanksite/memoedja-web)
2. Klik tab **Settings** $\rightarrow$ di menu kiri pilih **Secrets and variables** $\rightarrow$ **Actions**.
3. Klik tombol hijau **New repository secret**, tambahkan 3 variabel berikut:

| Name | Nilai (Value) | Contoh |
|:---|:---|:---|
| `CPANEL_FTP_SERVER` | Hostname / IP FTP server hosting Anda | `ftp.memoedja.com` atau `103.xxx.xxx.xxx` |
| `CPANEL_FTP_USERNAME` | Username FTP yang dibuat di Langkah 1 | `deployer@memoedja.com` |
| `CPANEL_FTP_PASSWORD` | Password akun FTP tersebut | `PasswordKuat123!` |

---

### Langkah 3: Selesai! Uji Coba Deployment
Sekarang, setiap kali Anda mengetik:
```bash
git push origin main
```
GitHub Actions akan otomatis bekerja di latar belakang. Anda dapat memantau status jalannya deployment di tab **Actions** pada repositori GitHub.
