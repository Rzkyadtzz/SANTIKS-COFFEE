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
```

### Radius Tokens
```css
--radius-sm: 8px;
--radius-md: 12px;
--radius-lg: 16px;
--radius-xl: 20px;
--radius-pill: 9999px;
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

### 2. Search Pill Bar (`.app-search-pill`) & Sticky Container (`.search-section`)
- Soft neutral gray pill background (`#F5F4F4`), rounded pill (`--radius-pill`), icon search abu-abu muted di kiri, input placeholder *"Cari menu Santiks..."*, no shadow.
- **Sticky Behavior**: Sticky during scroll (`position: sticky`, `top: var(--header-height)`), tetap terlihat (*remains visible for fast menu discovery*), berlatar belakang putih solid `#FFFFFF` dengan subtle separator border (`1px solid var(--color-border)`).
- Category navigation tiles tetap mengikuti normal document flow.

### 3. Category Image Tiles (`.category-tile`)
- Container gambar produk representatif (`54px x 54px`, border radius `12px`), label kategori di bawah.
- **State Aktif**: Border `2px solid #0088FF`, label warna `#0088FF` font-weight 600.
- **State Non-Aktif**: Border transparan, label warna `#8E8E93` font-weight 400.
- **Desktop vs Mobile Hierarchy**:
  - **Desktop (≥ 992px)**: Category Image Tiles menjadi konteks navigasi kategori utama. Subsection heading kategori berulang beserta item count (`.menu-category-heading`) di dalam katalog disembunyikan (`display: none;`) demi katalog yang compact, bersih, dan fokus pada kartu produk.
  - **Mobile (< 992px)**: Subsection heading kategori dan badge jumlah item dipertahankan dalam alur single-feed.

### 4. Featured Promo Banner (`.promo-card`)
- Kartu promo *Must Try* berlatar belakang gradient vibrant `#0088FF → #6155F5`, typography putih bersih, tag badge semi-transparan yang proporsional, harga `Rp 20k`, dan foto produk rounded.
- Card itself membuka Product Detail Sheet saat diklik/ditap tanpa tombol perantara (*no detail CTA button*).

### 5. Food Card Component (`.food-card`)
- Surface kartu abu-abu netral lembut (`#F5F4F4`), flat tanpa box-shadow berat, rounded corners `20px`.
- Hierarchy minimalis murni:
  - Product Image (rasio `1:1`)
  - Product Name (font-weight 600)
  - Price (warna ungu khas Figma `#6155F5`)
- **Card Interaction**: Card itself opens Product Detail Sheet saat diklik/ditap (lengkap dengan keyboard accessibility `Enter`/`Space` dan `focus-visible` outline).
- Tanpa tombol perantara (*no detail CTA button*, no Pesan/WhatsApp, no Add to Cart).

### 6. Informational Product Detail Sheet (`.product-detail-modal`)
- Adaptasi Flow 3 Figma (Tampilan Informasi Produk Murni):
  - **Top Media Area**: Background gradient `var(--gradient-promo)` (`#0088FF → #6155F5`), tombol kembali lingkaran putih transparan `<button class="product-detail-back-btn">`, foto produk lingkaran terpusat.
  - **White Content Sheet**: Surface putih rounded (`border-radius: 20px 20px 0 0`), meta row (kategori pill biru + status badge + harga ungu `#6155F5`), judul produk, dan deskripsi produk. Tanpa tombol/CTA pemesanan.
