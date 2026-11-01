/**
 * ============================================================================
 * DAFTAR PRODUK HTML DARI GEMINI (PERMANEN)
 * File ini digunakan bersama oleh `index.html` dan `produk.html`.
 *
 * Cara Menambahkan Produk Baru Secara Permanen:
 * 1. Simpan file HTML dari Gemini ke dalam folder `produk/` (misal: `produk/aplikasi-baru.html`)
 * 2. Tambahkan objek produk baru ke dalam array `PRODUK_BAWAAN` di bawah ini.
 * 3. Opsional: Isi `thumbnail` dengan path gambar (misal `'produk/thumb-1.png'` atau URL gambar).
 *    Jika `thumbnail` dikosongkan (`''`), sistem otomatis menampilkan Live Preview HTML sebagai thumbnail!
 * ============================================================================
 */
const PRODUK_BAWAAN = [
  {
    id: 'kalkulator-estimasi-proyek',
    title: 'Kalkulator Estimasi Proyek & Invoice',
    category: 'Bisnis & Produktivitas',
    description: 'Aplikasi interaktif dari Gemini untuk menghitung estimasi biaya pembuatan software, simulasi diskon, dan cetak ringkasan otomatis.',
    url: 'produk/contoh-gemini.html',
    thumbnail: '', // Kosongkan untuk otomatis menampilkan Live Preview HTML sebagai thumbnail, atau isi URL gambar
    date: 'Terbaru',
    featured: true
  },
  {
    id: 'generator-prompt-catatan-ai',
    title: 'Generator Prompt & Catatan AI',
    category: 'Tools AI',
    description: 'Tools penyusun prompt Gemini terstruktur untuk membantu pembuatan kode aplikasi, desain UI/UX, dan analisis bisnis.',
    url: 'produk/catatan-ai.html',
    thumbnail: '',
    date: '2026',
    featured: true
  }
];

const STORAGE_KEY = 'muchlis_gemini_custom_products_v1';

/**
 * ============================================================================
 * KONFIGURASI KEAMANAN PASSKEY (SALTED SHA-256 HASH)
 * Kode asli dienkripsi satu arah menggunakan SHA-256 + Salt (tidak disimpan teks biasa).
 * ============================================================================
 */
const PASSKEY_SALT = 'muchlis_passkey_v1:';
const ENCRYPTED_PASSKEY_HASH = 'c00fc288228b18e810daf8e9eb69b51e8bcad01af5e658205ca9f7aa6633b34c';
let pendingPasskeyAction = null;

function sha256Hash(ascii) {
  function rightRotate(value, amount) {
    return (value >>> amount) | (value << (32 - amount));
  }
  const mathPow = Math.pow;
  const maxWord = mathPow(2, 32);
  let i, j;
  let result = '';
  const words = [];
  const asciiBitLength = ascii.length * 8;
  let hash = (sha256Hash.h = sha256Hash.h || []);
  const k = (sha256Hash.k = sha256Hash.k || []);
  let primeCounter = k.length;
  const isComposite = {};
  for (let candidate = 2; primeCounter < 64; candidate++) {
    if (!isComposite[candidate]) {
      for (i = 0; i < 313; i += candidate) {
        isComposite[i] = candidate;
      }
      hash[primeCounter] = (mathPow(candidate, 0.5) * maxWord) | 0;
      k[primeCounter++] = (mathPow(candidate, 1 / 3) * maxWord) | 0;
    }
  }
  hash = sha256Hash.h.slice(0);
  ascii += '\x80';
  while ((ascii.length % 64) - 56) ascii += '\x00';
  for (i = 0; i < ascii.length; i++) {
    j = ascii.charCodeAt(i);
    if (j >> 8) return '';
    words[i >> 2] |= j << ((3 - (i % 4)) * 8);
  }
  words[words.length] = (asciiBitLength / maxWord) | 0;
  words[words.length] = asciiBitLength;
  for (j = 0; j < words.length; ) {
    const w = words.slice(j, (j += 16));
    const oldHash = hash;
    hash = hash.slice(0, 8);
    for (i = 0; i < 64; i++) {
      const w15 = w[i - 15], w2 = w[i - 2];
      const a = hash[0], e = hash[4];
      const temp1 =
        hash[7] +
        (rightRotate(e, 6) ^ rightRotate(e, 11) ^ rightRotate(e, 25)) +
        ((e & hash[5]) ^ (~e & hash[6])) +
        k[i] +
        (w[i] =
          i < 16
            ? w[i]
            : (w[i - 16] +
                (rightRotate(w15, 7) ^ rightRotate(w15, 18) ^ (w15 >>> 3)) +
                w[i - 7] +
                (rightRotate(w2, 17) ^ rightRotate(w2, 19) ^ (w2 >>> 10))) |
              0);
      const temp2 =
        (rightRotate(a, 2) ^ rightRotate(a, 13) ^ rightRotate(a, 22)) +
        ((a & hash[1]) ^ (a & hash[2]) ^ (hash[1] & hash[2]));
      hash = [(temp1 + temp2) | 0].concat(hash);
      hash[4] = (hash[4] + temp1) | 0;
    }
    for (i = 0; i < 8; i++) {
      hash[i] = (hash[i] + oldHash[i]) | 0;
    }
  }
  for (i = 0; i < 8; i++) {
    for (j = 3; j + 1; j--) {
      const b = (hash[i] >> (j * 8)) & 255;
      result += (b < 16 ? 0 : '') + b.toString(16);
    }
  }
  return result;
}

function getCustomProducts() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

function saveCustomProducts(list) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

function getAllProducts() {
  return [...getCustomProducts(), ...PRODUK_BAWAAN];
}

function escapeHtml(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function renderThumbnailBox(item) {
  const safeTitle = escapeHtml(item.title);
  if (item.thumbnail && item.thumbnail.trim() !== '') {
    return `
      <img
        src="${escapeHtml(item.thumbnail)}"
        alt="${safeTitle}"
        loading="lazy"
        class="w-full h-full object-cover object-top group-hover:scale-105 transition duration-500"
        onerror="this.style.display='none'; this.nextElementSibling.classList.remove('hidden');"
      />
      <div class="hidden w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950 p-4 text-center">
        <i data-lucide="layout" class="w-8 h-8 text-indigo-400 mb-2"></i>
        <span class="text-xs font-semibold text-slate-300 line-clamp-1">${safeTitle}</span>
      </div>
    `;
  }

  // Jika tidak ada gambar thumbnail khusus, tampilkan Live Mini-Preview dari halaman HTML Gemini
  if (item.url) {
    return `
      <div class="w-full h-full relative overflow-hidden bg-slate-950 select-none pointer-events-none">
        <iframe
          src="${escapeHtml(item.url)}"
          title="Thumbnail ${safeTitle}"
          loading="lazy"
          tabindex="-1"
          sandbox="allow-scripts allow-same-origin"
          class="border-0 origin-top-left"
          style="width: 285.7%; height: 285.7%; transform: scale(0.35);"
        ></iframe>
      </div>
    `;
  }

  if (item.htmlContent) {
    const encodedDoc = escapeHtml(item.htmlContent);
    return `
      <div class="w-full h-full relative overflow-hidden bg-slate-950 select-none pointer-events-none">
        <iframe
          srcdoc="${encodedDoc}"
          title="Thumbnail ${safeTitle}"
          loading="lazy"
          tabindex="-1"
          sandbox="allow-scripts"
          class="border-0 origin-top-left"
          style="width: 285.7%; height: 285.7%; transform: scale(0.35);"
        ></iframe>
      </div>
    `;
  }

  return `
    <div class="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950 p-4 text-center">
      <i data-lucide="sparkles" class="w-8 h-8 text-indigo-400 mb-2"></i>
      <span class="text-xs font-semibold text-slate-300 line-clamp-1">${safeTitle}</span>
    </div>
  `;
}

function renderProductCard(item, options = {}) {
  const isCustom = Boolean(item.isCustom);
  const allowDelete = options.allowDelete !== false;

  return `
    <article class="glass-card rounded-2xl overflow-hidden flex flex-col justify-between group">
      <div>
        <!-- Thumbnail Container (16:9) -->
        <div
          onclick="previewProduct('${item.id}')"
          class="relative aspect-video w-full bg-slate-950 border-b border-slate-800/80 overflow-hidden cursor-pointer"
        >
          ${renderThumbnailBox(item)}

          <!-- Top Badges Overlay -->
          <div class="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 pointer-events-none">
            <span class="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-slate-950/85 backdrop-blur-md text-indigo-300 border border-indigo-500/30 shadow">
              ${escapeHtml(item.category || 'HTML Gemini')}
            </span>
            ${isCustom ? `
              <span class="text-[11px] px-2 py-0.5 rounded-md bg-purple-950/90 backdrop-blur-md text-purple-300 border border-purple-500/40 shadow">
                Lokal Browser
              </span>
            ` : item.date ? `
              <span class="text-[11px] px-2.5 py-0.5 rounded-md bg-slate-950/80 backdrop-blur-md text-slate-300 border border-slate-700/60 font-mono">
                ${escapeHtml(item.date)}
              </span>
            ` : ''}
          </div>

          <!-- Hover Play Overlay -->
          <div class="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition duration-200 flex items-center justify-center">
            <span class="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-semibold shadow-lg transform translate-y-2 group-hover:translate-y-0 transition">
              <i data-lucide="maximize-2" class="w-3.5 h-3.5"></i>
              <span>Pratinjau Layar Penuh</span>
            </span>
          </div>
        </div>

        <!-- Card Content -->
        <div class="p-5 pb-3">
          <div class="flex items-start justify-between gap-2">
            <h3
              onclick="previewProduct('${item.id}')"
              class="text-base sm:text-lg font-bold text-white group-hover:text-indigo-300 transition leading-snug cursor-pointer"
            >
              ${escapeHtml(item.title)}
            </h3>
            ${isCustom && allowDelete ? `
              <button
                onclick="deleteCustomProduct('${item.id}')"
                class="p-1.5 rounded-lg hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 transition shrink-0"
                title="Hapus produk ini"
              >
                <i data-lucide="trash-2" class="w-4 h-4"></i>
              </button>
            ` : ''}
          </div>

          <p class="mt-2 text-xs sm:text-sm text-slate-400 leading-relaxed line-clamp-2">
            ${escapeHtml(item.description)}
          </p>
        </div>
      </div>

      <!-- Card Footer Actions -->
      <div class="px-5 pb-5 pt-3 flex items-center gap-2.5">
        <button
          onclick="previewProduct('${item.id}')"
          class="flex-1 inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white transition shadow-sm"
        >
          <i data-lucide="play" class="w-3.5 h-3.5"></i>
          <span>Jalankan Produk</span>
        </button>

        ${item.url ? `
          <a
            href="${escapeHtml(item.url)}"
            target="_blank"
            rel="noopener"
            class="inline-flex items-center justify-center gap-1 px-3 py-2 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-xs font-medium text-slate-300 hover:text-white transition"
            title="Buka di Tab Baru"
          >
            <span>Tab Baru</span>
            <i data-lucide="external-link" class="w-3.5 h-3.5"></i>
          </a>
        ` : `
          <button
            onclick="openCustomInNewTab('${item.id}')"
            class="inline-flex items-center justify-center gap-1 px-3 py-2 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-xs font-medium text-slate-300 hover:text-white transition"
            title="Buka di Tab Baru"
          >
            <span>Tab Baru</span>
            <i data-lucide="external-link" class="w-3.5 h-3.5"></i>
          </button>
        `}
      </div>
    </article>
  `;
}
