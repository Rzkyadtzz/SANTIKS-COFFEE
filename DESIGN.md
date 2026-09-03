# Design System & Token Specification &mdash; Santiks Coffee & Calm

Dokumen ini adalah **source of truth untuk Design System** website **Santiks Coffee & Calm** berdasarkan **visual refinement dari screenshot referensi Figma** dan confirmed color tokens.

> [!NOTE]
> Desain ini diadaptasikan dari screenshot referensi Figma (*Adapted from the provided Figma reference screenshot*). Tidak menggunakan klaim ekstraksi node presisi atau pixel-perfect extraction karena akses data node Figma terstruktur tidak tersedia di environment.

---

## 🎯 Filosofi Desain (Visual Direction)

1. **Clean & Minimal**: Latar belakang bersih (`#FFFFFF`), menghapuskan *glassmorphism* berlebihan, blur, dan shadow tebal.
2. **Product-Focused**: Homepage terpusat pada penelusuran katalog menu, pencarian, dan kategori tanpa distraksi section sekunder.
3. **Minimal Header Layout**:
   - **Desktop Header**: Menampilkan nama brand *Santiks Coffee* dan link navigasi *Menu Catalogue* secara minimalis tanpa tombol CTA sekunder.
   - **Mobile Header**: Menampilkan nama brand *Santiks* di kiri (bold 700) dengan sub-judul *Coffee & Calm* (muted 400), dan informasi lokasi (*Mlati Norowito Gg. 2*) di kanan menggunakan warna biru UI (`#0088FF`, semibold 600).
4. **Confirmed Color Hierarchy**:
   - **Brand Navy Anchor**: `#003370` (`--color-brand`) digunakan khusus untuk identitas brand utama Santiks.
   - **Figma UI Blue**: `#0088FF` (`--color-ui-blue`) digunakan untuk active category border & label, lokasi mobile header, interaktivitas, dan link aksen.
   - **Figma UI Purple**: `#6155F5` (`--color-ui-purple`) digunakan untuk harga produk pada kartu menu dan detail sheet, serta sisi ungu pada gradient promo.
5. **Signature Promo Gradient**: Gradient linier vibrant (`linear-gradient(110deg, #0088FF 0%, #6155F5 100%)`) digunakan pada kartu promo / featured *Must Try* dan top area *Product Detail Sheet*.
6. **Category Image Tiles**: Navigasi kategori berbentuk tile gambar persegi rounded (`54px x 54px`, radius `12px`) dengan label di bawahnya.
   - **Active State**: Border `2px solid #0088FF`, background putih, label warna `#0088FF` (font-weight 600).
   - **Inactive State**: Border transparan/subtle, label warna abu-abu muted `#8E8E93` (font-weight 400).
7. **Soft Neutral Gray Product Cards**: Kartu produk menggunakan warna permukaan abu-abu netral lembut (`#F5F4F4` / `--color-surface-soft`) dengan radius rounded moderat (`20px`), flat styling tanpa drop-shadow tebal, dan harga berwarna ungu `#6155F5`.
8. **Informational Product Detail Sheet**: Modal / bottom sheet responsif dengan media top gradient (`#0088FF → #6155F5`), tombol kembali bulat, foto produk terpusat, dan lembaran putih rounded (`border-radius: 20px 20px 0 0`) yang menampilkan kategori (pill biru), status badge, harga (`#6155F5`), judul, dan deskripsi produk tanpa tombol/CTA pemesanan.

---

## 🎨 Palet Warna & Token (`style.css`)

### Color Tokens
```css
--color-brand: #003370;          /* Santiks Brand Navy Anchor */
--color-brand-hover: #00224d;
--color-primary: var(--color-brand);
--color-primary-hover: var(--color-brand-hover);

--color-ui-blue: #0088FF;        /* Figma Primary UI Blue */
--color-ui-purple: #6155F5;      /* Figma Purple Accent & Price */
--color-blue-vibrant: var(--color-ui-blue);
--color-purple-accent: var(--color-ui-purple);

--gradient-promo: linear-gradient(110deg, #0088FF 0%, #6155F5 100%);
--gradient-btn: linear-gradient(110deg, #0088FF 0%, #6155F5 100%);

--color-bg: #FFFFFF;             /* Pure White */
--color-surface: #FFFFFF;
--color-surface-soft: #F5F4F4;   /* Soft Neutral Gray Surface */
--color-surface-card: var(--color-surface-soft);
--color-border: #E8E8E8;

--color-text: #1A1E26;           /* High Contrast Neutral Dark */
--color-text-muted: #8E8E93;     /* Muted Gray */
--color-text-light: #B0B0B8;

/* Merchandising Badge Tokens */
--badge-best-seller: #ef4444;    /* Coral Red */
--badge-top-ordered: #f59e0b;    /* Warm Gold */
--badge-most-popular: #003370;   /* Santiks Navy Brand */
```

### Radius Tokens
```css
--radius-sm: 8px;
--radius-md: 12px;
--radius-lg: 16px;
--radius-xl: 20px;
--radius-pill: 9999px;
```

### Motion Tokens
```css
--motion-fast: 160ms;            /* Micro-interactions, category switching, quick feedback */
--motion-normal: 200ms;          /* Modal, drawer, and standard UI transitions */
```

### Typography Hierarchy (Font Weights)
- **Brand Name**: 700
- **Section Heading**: 600–700
- **Product Name**: 600
- **Product Price**: 600–700
- **Body & Descriptions**: 400
- **Muted Text & Subtitles**: 400
- **Badges**: 600

---

## 🧩 Komponen Utama UI

### 1. App Header (`.app-header`)
- Solid white header sederhana.
- Desktop: Logo brand *Santiks* & link *Menu Catalogue*. Tanpa tombol CTA order redundant.
- Mobile: Nama brand (*Santiks*, bold 700) di kiri dengan subtitle *Coffee & Calm* (muted 400), dan info lokasi ringkas (*Mlati Norowito Gg. 2*) di kanan dalam warna `--color-ui-blue` (`#0088FF`, semibold 600).

### 2. Search Pill Bar (`.app-search-pill`) & Container (`.search-section`)
- Soft neutral gray pill background (`#F5F4F4`), rounded pill (`--radius-pill`), icon search abu-abu muted di kiri, input placeholder *"Cari menu Santiks..."*, no shadow.
- **Normal Document Flow**: Search berada dalam alur dokumen normal (`position: static`), tidak sticky dan tidak fixed. Search ikut tergulir saat pengguna menggulir halaman.

### 3. Category Image Tiles (`.category-tile`)
- Container gambar produk representatif (`54px x 54px`, border radius `12px`), label kategori di bawah.
- **Micro-interaction & Transition**:
  - `transition: border-color var(--motion-fast) ease, background-color var(--motion-fast) ease, transform var(--motion-fast) ease;`
  - **Hover**: Subtle `transform: translateY(-1px);`, border `rgba(0, 136, 255, 0.4)`.
  - **State Aktif**: Border `2px solid #0088FF`, background `#FFFFFF`, subtle scale `transform: scale(1.02);`, label warna `#0088FF` font-weight 600.
  - **State Non-Aktif**: Border transparan, background `--color-surface-soft`, label warna `#8E8E93` font-weight 400.
- **Horizontal Row Auto-Centering**: Saat tile dipilih pada mobile, baris kategori bergeser secara halus (`filterPills.scrollTo`) agar tile aktif selalu terlihat di viewport tanpa mengganggu touch gesture drag-scroll.
- **Desktop vs Mobile Hierarchy**:
  - **Desktop (≥ 992px)**: Category Image Tiles menjadi konteks navigasi kategori utama. Subsection heading kategori berulang beserta item count (`.menu-category-heading`) di dalam katalog disembunyikan (`display: none;`) demi katalog yang compact, bersih, dan fokus pada kartu produk.
  - **Mobile (< 992px)**: Subsection heading kategori dan badge jumlah item dipertahankan dalam alur single-feed.

### 4. Featured Promo Banner (`.featured-promo-section` & `.promo-card`)
- Kartu promo *Must Try* berlatar belakang gradient vibrant `#0088FF → #6155F5`, typography putih bersih, tag badge semi-transparan yang proporsional, harga `Rp 20k`, dan foto produk rounded.
- Card itself membuka Product Detail Sheet saat diklik/ditap tanpa tombol perantara (*no detail CTA button*).
- **Responsive Display**:
  - **Mobile & Tablet (< 992px)**: Ditampilkan di atas katalog menu sebagai rekomendasi cepat.
  - **Desktop (≥ 992px)**: Disembunyikan (`display: none;`) demi pengalaman katalog yang langsung, rapi, dan compact.

### 5. Food Card Component (`.food-card`)
- Surface kartu abu-abu netral lembut (`#F5F4F4`), flat tanpa box-shadow berat, rounded corners `20px`.
- Hierarchy minimalis murni:
  - Product Image (rasio `1:1`)
  - Product Name (font-weight 600)
  - Price (warna ungu khas Figma `#6155F5`)
- **Card Interaction**: Card itself opens Product Detail Sheet saat diklik/ditap (lengkap dengan keyboard accessibility `Enter`/`Space` dan `focus-visible` outline).
- Tanpa tombol perantara (*no detail CTA button*, no Pesan/WhatsApp, no Add to Cart).

#### Product Status Badge & Photo Border
- **Supported Badges**:
  - `Best Seller`: Token `--badge-best-seller: #ef4444`, ikon `bi-award-fill`.
  - `Top Ordered`: Token `--badge-top-ordered: #f59e0b`, ikon `bi-hand-thumbs-up-fill`.
  - `Most Popular`: Token `--badge-most-popular: var(--color-brand)` (`#003370`), ikon `bi-star-fill`.
- **Rules & Behavior**:
  - **Category-Independent**: Status dapat muncul pada produk di kategori mana pun (Must Try, Signature Coffee, Coffee Milk, Milkbased, Mocktail, Tea Series, Sparkling Series, Other, Manual Brew, Snacks, Main Course, Pastry, Pasta).
  - **Product Image Border**: Produk yang memiliki badge mendapatkan matching colored border (`2px solid`) pada container foto (`.food-card-media`), bukan pada seluruh kartu.
  - **No Accent Border Without Badge**: Produk tanpa status badge menggunakan styling gambar normal (`border: 2px solid transparent`).
  - **Visible Text**: Badge text tetap terlihat (`[ BEST SELLER ]`, `[ TOP ORDERED ]`, `[ MOST POPULAR ]`) untuk menjamin aksesibilitas dan readability.
  - **Category Navigation Isolation**: Category Image Tiles pada navigation bar tidak terpengaruh oleh badge border dan tetap menggunakan state aktif `#0088FF`.

### 6. Informational Product Detail Sheet (`.product-detail-modal`)
- Adaptasi Flow 3 Figma (Tampilan Informasi Produk Murni):
  - **Top Media Area**: Background gradient `var(--gradient-promo)` (`#0088FF → #6155F5`), tombol kembali lingkaran putih transparan `<button class="product-detail-back-btn">`, foto produk lingkaran terpusat.
  - **White Content Sheet**: Surface putih rounded (`border-radius: 20px 20px 0 0`), meta row (kategori pill biru + status badge + harga ungu `#6155F5`), judul produk, dan deskripsi produk. Tanpa tombol/CTA pemesanan.

### 7. Category Switching & Motion System
- **Duration**: 140–200ms (`--motion-fast: 160ms`, total feel pergantian ±220ms).
- **Active Tile Transition**: Perpindahan status aktif yang halus pada border, background, dan scale (`scale(1.02)`) tanpa lonjakan visual.
- **Product Grid Transition**:
  - Grid fade-out singkat (`opacity: 0.35; transform: translateY(3px);` 60ms) saat kategori berganti.
  - Kartu hasil kategori baru muncul bersamaan dengan fade-in & subtle translate (`opacity: 0 → 1; translateY(5px) → 0;` 160ms ease-out via `@keyframes categoryFadeIn`).
  - Tanpa delay/stagger panjang, menjaga pergantian kategori tetap cepat, ringan, dan instan.
- **Reduced Motion Support**:
  - Penuh mendukung `@media (prefers-reduced-motion: reduce)`.
  - Animasi transform dan transition dinonaktifkan, pergeseran scroll berlangsung seketika (`behavior: "auto"`).
