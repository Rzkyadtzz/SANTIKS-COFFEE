# Design System & Token Specification &mdash; Santiks Coffee & Calm

Dokumen ini adalah **source of truth untuk Design System** website **Santiks Coffee & Calm** setelah penyederhanaan alur Product Detail menjadi tampilan informasi murni (*Informational Product Detail*).

---

## 🎯 Filosofi Desain (Refined Visual Direction)

1. **Clean & Minimal**: Latar belakang bersih (pure white / off-white `#ffffff` / `#f8fafc`), menghapuskan *glassmorphism* berlebihan, blur, dan shadow tebal.
2. **Product-Focused & Ringkasan Menu**: Homepage terpusat pada penelusuran katalog menu tanpa distraksi section sekunder.
3. **Minimal Header Layout**:
   - **Desktop Header**: Menampilkan nama brand *Santiks Coffee* dan link navigasi *Menu Catalogue* secara minimalis tanpa tombol CTA sekunder.
   - **Mobile Header**: Menampilkan nama brand *Santiks Coffee* di kiri dan informasi lokasi singkat sekunder (*Mlati Norowito Gg. 2*) di kanan sebagai teks kontekstual berukuran kecil dan muted.
4. **Santiks Navy & Vibrant Blue Accent**: Brand anchor menggunakan Santiks Navy `#003370` dipadukan dengan aksen biru elektrik `#2563eb`.
5. **Signature Blue-Purple Gradient**: Gradient biru ke ungu (`linear-gradient(135deg, #003370 0%, #2563eb 55%, #6366f1 100%)`) digunakan pada kartu promo / featured *Must Try* dan bagian atas *Product Detail Sheet*.
6. **Category Image Tiles**: Navigasi kategori berbentuk tile gambar persegi rounded (`48px x 48px`, radius `12px`) dengan label di bawahnya.
7. **Soft Gray Product Cards**: Kartu produk menggunakan warna permukaan abu-abu netral lembut (`#f1f5f9`) dengan radius rounded besar (`20px`).
8. **Informational Product Detail Sheet (Flow 3)**: Modal / bottom sheet responsif dengan media top gradient, tombol kembali bulat, foto produk terpusat, dan lembaran putih rounded (`border-radius: 24px 24px 0 0`) yang menampilkan kategori, status badge, harga, judul, dan deskripsi produk tanpa tombol/CTA pemesanan.

---

## 🎨 Palet Warna & Token (`style.css`)

### Color Tokens
```css
--color-primary: #003370;          /* Santiks Navy Anchor */
--color-primary-hover: #00224d;
--color-blue-vibrant: #2563eb;     /* Vibrant UI Blue Accent */
--color-purple-accent: #6366f1;    /* Purple Accent */
--gradient-promo: linear-gradient(135deg, #003370 0%, #2563eb 55%, #6366f1 100%);

--color-bg: #ffffff;               /* Pure White */
--color-surface-card: #f1f5f9;     /* Soft Neutral Gray Card Surface */
--color-surface-white: #ffffff;
--color-border: #e2e8f0;

--color-text: #0f172a;             /* Near-black */
--color-text-muted: #64748b;       /* Medium Gray */
--color-text-light: #94a3b8;
```

### Radius Tokens
```css
--radius-sm: 8px;
--radius-md: 12px;
--radius-lg: 18px;
--radius-xl: 24px;
--radius-pill: 9999px;
```

---

## 🧩 Komponen Utama UI

### 1. App Header (`.app-header`)
- Solid white header sederhana.
- Desktop: Logo brand *Santiks Coffee* & link *Menu Catalogue*. Tanpa tombol CTA order redundant.
- Mobile: Nama brand (*Santiks Coffee*) di kiri, info lokasi ringkas (*Mlati Norowito Gg. 2*) di kanan. Teks lokasi menggunakan ukuran lebih kecil (`0.785rem`) dan warna muted (`--color-text-muted`).

### 2. Search Pill Bar (`.app-search-pill`)
- Soft gray pill background (`#f1f5f9`), rounded pill (`--radius-pill`), icon kaca pembesar di kiri, input placeholder *"Cari menu Santiks..."*.

### 3. Category Image Tiles (`.category-tile`)
- Container gambar produk representatif (`48px x 48px`, border radius `12px`), label kategori di bawah.
- State Aktif: Ring border biru `#003370`, teks biru tebal.

### 4. Featured Promo Banner (`.promo-card`)
- Kartu promo *Must Try* berlatar belakang gradient biru-ungu, typography putih, tombol CTA *"Detail Menu"*, dan foto produk lingkaran.

### 5. Food Card Component (`.food-card`)
- Surface kartu abu-abu netral lembut (`#f1f5f9`), rounded corners `20px`, foto produk dominan (rasio `1:1`), nama produk, harga dalam biru vibrant (`#2563eb`), dan link bersih `Detail`. Mengetuk kartu membuka *Product Detail Sheet*.

### 6. Informational Product Detail Sheet (`.product-detail-modal`)
- Adaptasi Flow 3 Figma (Tampilan Informasi Produk Murni):
  - Top Media Area: Background gradient `var(--gradient-promo)`, tombol kembali `<button class="product-detail-back-btn">`, foto produk lingkaran terpusat.
  - White Content Sheet: Surface putih rounded (`border-radius: 24px 24px 0 0`), meta row (kategori + status badge + harga), judul produk, dan deskripsi produk. Tanpa tombol/CTA pemesanan.
