# Design System & Token Specification &mdash; Santiks Coffee & Calm

Dokumen ini adalah **source of truth untuk Design System** website **Santiks Coffee & Calm** setelah dilakukan UI redesign berbasis *Food Ordering App UI/UX*.

---

## 🎯 Filosofi Desain

1. **Food-Focused & Appetizing**: Produk makanan & minuman menjadi focal point utama dengan foto tajam dan rasio konsisten.
2. **App-Like Experience**: Mengadopsi pola interaksi aplikasi mobile modern (top bar lokasi, bottom navigation, chip kategori melayang).
3. **Calm & Premium**: Menggunakan warna netral slate/light gray yang tenang dipadukan dengan aksen Navy utama brand.
4. **Accessible & Responsive**: Memenuhi standar keterbacaan tinggi, kontras WCAG 2.2 AA, dan penanganan gerakan *reduced motion*.

---

## 🎨 Identitas Brand & Palet Warna

- **Primary Brand Color**: `#003370` (Santiks Deep Navy) &mdash; Digunakan untuk tombol utama, chip aktif, harga, dan aksen brand.
- **Primary Hover**: `#00224d` (Dark Navy)
- **Primary Light Surface**: `rgba(0, 51, 112, 0.08)`
- **Accent Color**: `#f59e0b` (Amber Gold) &mdash; Digunakan untuk rating, bintang, dan badge mini.
- **Background Surface**: `#f4f6f9` (Soft Light Gray) &mdash; Memberikan kontras lembut pada kartu putih.
- **Card Surface**: `#ffffff` (Pure White)
- **Border Subtle**: `#e2e8f0` / `#f1f5f9`
- **Text Primary**: `#0f172a` (Dark Slate)
- **Text Muted**: `#64748b` (Slate Gray)

---

## 🔤 Tokens System (`style.css`)

### Color Tokens
```css
--color-primary: #003370;
--color-primary-hover: #00224d;
--color-primary-light: rgba(0, 51, 112, 0.08);
--color-accent: #f59e0b;
--color-bg: #f4f6f9;
--color-surface: #ffffff;
--color-border: #e2e8f0;
--color-text: #0f172a;
--color-text-muted: #64748b;
```

### Radius Tokens
```css
--radius-xs: 6px;
--radius-sm: 10px;
--radius-md: 14px;
--radius-lg: 18px;
--radius-xl: 24px;
--radius-pill: 9999px;
```

### Shadow Tokens
```css
--shadow-xs: 0 1px 3px rgba(15, 23, 42, 0.05);
--shadow-sm: 0 2px 8px rgba(15, 23, 42, 0.06);
--shadow-md: 0 8px 24px rgba(0, 51, 112, 0.08);
--shadow-lg: 0 16px 36px rgba(0, 51, 112, 0.12);
```

### Spacing System
```css
--space-1: 0.25rem; /* 4px */
--space-2: 0.5rem;  /* 8px */
--space-3: 0.75rem; /* 12px */
--space-4: 1rem;    /* 16px */
--space-5: 1.5rem;  /* 24px */
--space-6: 2rem;    /* 32px */
--space-7: 3rem;    /* 48px */
```

---

## 🧩 Dokumentasi Komponen UI

### 1. Mobile App Header (`.mobile-app-header`)
- **Fungsi**: Header aplikasi mobile serasa native app.
- **Elemen**: Avatar kedai kopi, nama store (*Santiks Coffee*), dot indikator status buka (hijau), alamat lokasi ringkas, serta ikon quick action (Search & WhatsApp).

### 2. Search Interface (`.app-search-bar`)
- **Fungsi**: Form pencarian menu real-time.
- **Elemen**: Ikon kaca pembesar, input teks rounded pill (`--radius-pill`), tombol bersihkan (`#menuSearchClear`).
- **State**: Default, Focus (ring highlight `#003370`), Searching, Empty State (`#menuSearchEmpty`).

### 3. Category Chip Navigation (`.category-chip`)
- **Fungsi**: Pill navigasi kategori horizontal.
- **State**:
  - `default`: Background putih, border tipis, teks abu-abu gelap.
  - `hover`: Elevated border `#003370`, teks Navy.
  - `active`: Solid Navy `#003370`, teks putih, shadow halus.

### 4. Food Card Component (`.food-card`)
- **Media**: Container gambar rasio `4:3`, `object-fit: cover`, inner radius `18px`.
- **Badges Overlay**:
  - `Best Seller`: Red badge (`#ef4444`)
  - `Top Ordered`: Amber badge (`#f59e0b`)
  - `Most Popular`: Navy badge (`#003370`)
- **Content**: Nama menu (Bold), deskripsi singkat (line-clamp 2 baris), harga tebal (`.menu-price`), tombol order cepat (`+`).

### 5. Mobile Bottom Navigation (`.mobile-bottom-nav`)
- **Fungsi**: Navigation bar melayang di bagian bawah layar ponsel.
- **Destinasi Tab**: `Home`, `Menu`, `Order`, `Lokasi`.
- **State**: Tab aktif menyala dengan warna brand Navy `#003370`.

---

## ♿ Aksesibilitas & Motion Rules

- **Contrast**: WCAG 2.2 AA compliant.
- **Focus Visible**: Indikator outline yang jelas pada tombol dan input.
- **Motion**: Memiliki adaptor `@media (prefers-reduced-motion: reduce)` yang mematikan animasi transisi berat bagi pengguna dengan gangguan sensivitas visual.
