# Santiks Coffee & Calm &mdash; Landing Page & Digital Menu

Halaman landing page dan menu digital untuk **Santiks Coffee & Calm** (Kedai Kopi di Kudus). Project ini mengusung pendekatan **minimal, clean, product-focused UI/UX**, static zero-build architecture, serta siap dideploy langsung ke Vercel.

---

## 📌 Ringkasan Project

Website ini memberikan pengalaman browsing menu digital yang cepat, responsif, dan intuitif. Pengunjung dapat mencari produk secara real-time melalui **Sticky Search Bar** yang tetap terlihat dan mudah diakses saat scroll, menelusuri kategori menu via tile gambar, melihat rekomendasi _Must Try_, serta membuka **Detail Menu (Flow 3)** langsung melalui interaksi klik/tap pada kartu produk (informational detail: deskripsi, kategori, harga, dan status badge tanpa tombol perantara redundant).

Desain visual disempurnakan berdasarkan screenshot referensi Figma (_Adapted from the provided Figma reference screenshot_) dengan keselarasan warna terkonfirmasi.

---

## 🎨 Sistem Warna (Design Tokens)

- **Santiks Brand Navy**: `#003370` (`--color-brand`) &mdash; Anchor identitas brand Santiks.
- **UI Blue**: `#0088FF` (`--color-ui-blue`) &mdash; Kategori aktif, link aksen, teks lokasi mobile header.
- **UI Purple**: `#6155F5` (`--color-ui-purple`) &mdash; Harga produk pada menu card & detail sheet, sisi ungu gradient promo.
- **Promo Gradient**: `linear-gradient(110deg, #0088FF 0%, #6155F5 100%)` &mdash; Kartu promo _Must Try_ & media top detail sheet.
- **Soft Neutral Surface**: `#F5F4F4` (`--color-surface-soft`) &mdash; Permukaan kartu produk & search bar yang lembut dan bersih.

---

## 🔄 Alur Pengguna (User Flow)

```text
[ Menu Catalogue ]
        ↓
  [ Tap Card ]    <-- Interaksi kartu produk langsung membuka Detail Menu (tanpa tombol tambahan)
        ↓
 [ Detail Menu ]  <-- Informational Product Detail (Flow 3)
```

---

## 🛠️ Tech Stack Utama

- **HTML5**: Semantik HTML5, ARIA accessibility, keyboard navigation card trigger (`Enter` / `Space`), JSON-LD Structured Data, OpenGraph metadata.
- **CSS3**: Design Tokens (CSS Variables), Sticky Search Bar (`position: sticky`), Soft Neutral Card Surfaces (`#F5F4F4`), Vibrant Blue-Purple Gradient (`#0088FF → #6155F5`), Clean Modal Sheet.
- **Vanilla JavaScript ES6+**: DOM interaction engine (Sticky header height sync, Live search, Category filtering, Category headings, Product Detail Sheet engine).
- **Progressive Web App (PWA)**: Web App Manifest (`site.webmanifest`) & Service Worker (`sw.js` v14) dengan strategi offline caching.
- **Hosting / Deployment**: Vercel Static Deployment (Zero-build process).

---

## 📂 Struktur Project

```text
Landing Page Santiks/
├── index.html          # Markup utama (Catalogue, Search, Category Tiles, Informational Product Detail Sheet)
├── style.css           # Styling kustom (Design Tokens, Product Detail Sheet, soft-gray cards)
├── script.js           # Engine interaksi (Search, Filter, Product Detail Modal Handler)
├── app.js              # Inisialisasi halaman & AOS animation fallback
├── sw.js               # Service Worker (Cache static & runtime, offline support, v14)
├── site.webmanifest    # Metadata PWA
├── README.md           # Dokumentasi teknis & arsitektur project
├── DESIGN.md           # Source of truth Design System
├── SKILL.md            # Aturan implementasi & contract JavaScript DOM
└── assets/             # Gambar menu, hero background, dan favicon
```

---

## 📐 Arsitektur UI (Informational Product Detail Flow)

```text
[ Desktop Header: Brand & Menu Link | Mobile Header: Brand & Contextual Short Location ]
                               ↓
         [ Sticky Search Pill Bar (Real-Time Live Search - Fixed on Scroll) ]
                               ↓
          [ Category Navigation Tiles (Image + Label - Document Flow) ]
                               ↓
        [ Featured Must Try Card (Vibrant Blue-Purple Gradient) ]
                               ↓
         [ Popular Menu Catalogue (Soft Neutral Gray Cards) ]
                               ↓
          [ Product Detail Sheet (Informational View: Image, Title, Price, Desc) ]
                               ↓
                            [ Footer ]
```

---

## ⚡ Pengujian Lokal

Karena project ini menggunakan arsitektur **zero-build static website**, Anda dapat menjalankannya langsung tanpa memasang Node.js / `npm`.

### Menggunakan Python Built-in Server:

```bash
python -m http.server 8000
```

Buka di browser: `http://localhost:8000`

---

## 🎨 Referensi Desain

Visualisasi UI diadaptasikan dari referensi screenshot desain Figma Community:

- **Design Reference**: [Food Ordering App - Community](https://www.figma.com/design/PZukqy9x6lu43iJFsZfW1O/Food-Ordering-App--Community-?node-id=0-1&t=A3J1V2ZK6QJsEhUL-1)
- **Status Adaptasi**: _Visual refinement adapted from the provided Figma reference screenshot and confirmed color values._

_Catatan: Seluruh identitas brand, data menu, harga, deskripsi, dan metadata tetap menggunakan data resmi Santiks Coffee & Calm._

---

## Documentation

- [Product Requirements](./PRD.md)
- [Design System](./DESIGN.md)
- [Implementation Rules](./SKILL.md)
