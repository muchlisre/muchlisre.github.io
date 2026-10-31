# Muchlis (@muchlisre) — GitHub Pages & Katalog Produk HTML Gemini

Halaman profil resmi untuk **Muchlis (@muchlisre)** beserta menu **Produk Gemini** untuk menampilkan aplikasi atau halaman interaktif satu-file (`.html`) yang dibuat menggunakan Google Gemini.

## Struktur Folder

- `index.html` — Halaman utama profil & katalog produk HTML Gemini.
- `produk/` — Folder tempat menyimpan file `.html` hasil generate dari Gemini.
  - `produk/contoh-gemini.html` — Contoh aplikasi HTML interaktif dari Gemini.

## Cara Menambahkan Produk HTML dari Gemini

Ada **2 cara** untuk menambahkan HTML dari Gemini:

### 1. Langsung dari Halaman Web (Cepat / Uji Coba)
1. Buka halaman utama (`index.html`).
2. Klik tombol **"Tambah HTML Gemini"** di pojok kanan atas.
3. Isi nama produk, kategori, deskripsi, lalu **paste kode HTML dari Gemini**.
4. Klik **"Simpan & Tampilkan"** untuk langsung menjalankan atau klik **"Unduh sebagai file .html"**.

### 2. Permanen untuk Semua Pengunjung GitHub Pages
1. Simpan kode HTML dari Gemini ke dalam folder `produk/`, misalnya `produk/nama-aplikasi.html`.
2. Buka `index.html` dan cari bagian `const PRODUK_BAWAAN = [...]`.
3. Tambahkan item baru ke dalam daftar:
   ```js
   {
     id: 'nama-aplikasi',
     title: 'Nama Aplikasi Gemini',
     category: 'Tools AI',
     description: 'Deskripsi singkat aplikasi.',
     url: 'produk/nama-aplikasi.html',
     date: '2026'
   }
   ```
4. Commit dan push ke GitHub.
