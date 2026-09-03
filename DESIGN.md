# Design System & Token Specification &mdash; Santiks Coffee & Calm

Dokumen ini adalah **source of truth untuk Design System** website **Santiks Coffee & Calm** setelah koreksi arah visual berbasis *Minimal Product-Focused UI/UX*.

---

## 🎯 Filosofi Desain (Refined Visual Direction)

1. **Clean & Minimal**: Latar belakang bersih (pure white / off-white `#ffffff` / `#f8fafc`), menghapuskan *glassmorphism* berlebihan, blur, dan shadow tebal.
2. **Food-Focused Photography**: Foto produk menjadi focal point utama tanpa terdistraksi dekorasi berlebihan.
3. **Santiks Navy & Vibrant Blue Accent**: Brand anchor menggunakan Santiks Navy `#003370` dipadukan dengan aksen biru elektrik `#2563eb`.
4. **Signature Blue-Purple Gradient**: Gradient biru ke ungu (`linear-gradient(135deg, #003370 0%, #2563eb 55%, #6366f1 100%)`) digunakan secara terbatas pada kartu promo / featured *Must Try*.
5. **Category Image Tiles**: Navigasi kategori berbentuk tile gambar persegi rounded (`48px x 48px`, radius `12px`) dengan label di bawahnya.
6. **Soft Gray Product Cards**: Kartu produk menggunakan warna permukaan abu-abu netral lembut (`#f1f5f9`) dengan radius rounded besar (`20px`).

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
- Desktop: Logo brand *Santiks Coffee*, menu link (*Menu*, *Order*, *Lokasi*), dan tombol *Order WhatsApp*.
- Mobile: Nama brand (*Santiks Coffee*) di kiri, info lokasi ringkas (*Mlati Norowito Gg. 2*) di kanan. Tanpa icon berlebihan.

### 2. Search Pill Bar (`.app-search-pill`)
- Soft gray pill background (`#f1f5f9`), rounded pill (`--radius-pill`), icon kaca pembesar di kiri, input placeholder *"Search menu..."*.

### 3. Category Image Tiles (`.category-tile`)
- Container gambar produk representatif (`48px x 48px`, border radius `12px`), label kategori di bawah.
- State Aktif: Ring border biru `#003370`, teks biru tebal.

### 4. Featured Promo Banner (`.promo-card`)
- Kartu promo *Must Try* berlatar belakang gradient biru-ungu, typography putih, tombol CTA *"Pesan via WhatsApp"*, dan foto produk lingkaran.

### 5. Food Card Component (`.food-card`)
- Surface kartu abu-abu netral lembut (`#f1f5f9`), rounded corners `20px`, foto produk dominan (rasio `1:1`), nama produk, harga dalam biru vibrant (`#2563eb`), dan link bersih `Pesan`. Tanpa tombol '+' fiktif.
