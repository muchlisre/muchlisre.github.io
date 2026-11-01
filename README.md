# Muchlis (@muchlisre) — GitHub Pages & Katalog Produk HTML Gemini

Halaman profil resmi untuk **Muchlis (@muchlisre)** beserta halaman khusus **Produk Gemini (`produk.html`)** untuk menampilkan daftar aplikasi atau halaman interaktif satu-file (`.html`) yang dibuat menggunakan Google Gemini lengkap dengan thumbnail.

## Struktur File

- `index.html` — Halaman profil utama & cuplikan produk unggulan.
- `produk.html` — Halaman khusus **Daftar Produk HTML Gemini** lengkap dengan thumbnail, pencarian, filter kategori, dan fitur tambah HTML (dilindungi Passkey SHA-256).
- `produk-data.js` — Pusat data produk (`PRODUK_BAWAAN`) dan konfigurasi komponen kartu beserta thumbnail.
- `produk/` — Folder tempat menyimpan file `.html` hasil generate dari Gemini:
  - `produk/contoh-gemini.html`
  - `produk/catatan-ai.html`

## Cara Menambahkan Produk HTML & Thumbnail

### 1. Langsung dari Halaman `produk.html` (Cepat / Uji Coba)
1. Buka halaman `produk.html` lalu klik tombol **"Tambah HTML Gemini"** (masukkan Passkey pemilik).
2. Isi nama produk, kategori, deskripsi, **URL Gambar Thumbnail** (opsional — jika dikosongkan akan otomatis menampilkan *Live Preview* halaman HTML sebagai thumbnail), lalu tempel kode HTML dari Gemini.
3. Klik **"Simpan & Tampilkan"**.

### 2. Permanen untuk Semua Pengunjung GitHub Pages
1. Simpan kode HTML dari Gemini ke dalam folder `produk/`, misalnya `produk/nama-aplikasi.html`.
2. Buka `produk-data.js` dan tambahkan item baru ke dalam `PRODUK_BAWAAN`:
   ```js
   {
     id: 'nama-aplikasi',
     title: 'Nama Aplikasi Gemini',
     category: 'Tools AI',
     description: 'Deskripsi singkat aplikasi.',
     url: 'produk/nama-aplikasi.html',
     thumbnail: '', // Kosongkan untuk otomatis Live Thumbnail HTML, atau isi path/URL gambar
     date: '2026',
     featured: true
   }
   ```
3. Commit dan push ke GitHub.
