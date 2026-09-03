# Santiks Coffee & Calm &mdash; Landing Page & Digital Menu

Halaman landing page dan menu digital untuk **Santiks Coffee & Calm** (Kedai Kopi di Kudus). Project ini mengusung pendekatan **minimal, clean, product-focused UI/UX**, static zero-build architecture, serta siap dideploy langsung ke Vercel.

---

## 📌 Ringkasan Project

Website ini memberikan pengalaman browsing menu digital yang cepat, responsif, dan intuitif. Pengunjung dapat mencari produk secara real-time, menelusuri kategori menu via tile gambar, melihat rekomendasi *Must Try*, serta membuka **Detail Menu (Flow 3)** untuk melihat informasi detail produk (deskripsi, kategori, harga, dan badge).

---

## 🔄 Alur Pengguna (User Flow)

```text
[ Menu Catalogue ]
        ↓
 [ Pilih Produk ]
        ↓
 [ Detail Menu ]  <-- Informational Product Detail (Flow 3)
```

---

## 🛠️ Tech Stack Utama

* **HTML5**: Semantik HTML5, ARIA accessibility, JSON-LD Structured Data, OpenGraph metadata.
* **CSS3**: Design Tokens (CSS Variables), Soft Neutral Card Surfaces, Blue-Purple Gradient Accent, Clean Modal Sheet.
* **Vanilla JavaScript ES6+**: DOM interaction engine (Live search, Category filtering, Category headings, Product Detail Sheet engine).
* **Progressive Web App (PWA)**: Web App Manifest (`site.webmanifest`) & Service Worker (`sw.js` v12) dengan strategi offline caching.
* **Hosting / Deployment**: Vercel Static Deployment (Zero-build process).

---

## 📂 Struktur Project

```text
Landing Page Santiks/
├── index.html          # Markup utama (Catalogue, Search, Category Tiles, Informational Product Detail Sheet)
├── style.css           # Styling kustom (Design Tokens, Product Detail Sheet, soft-gray cards)
├── script.js           # Engine interaksi (Search, Filter, Product Detail Modal Handler)
├── app.js              # Inisialisasi halaman & AOS animation fallback
├── sw.js               # Service Worker (Cache static & runtime, offline support, v12)
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
           [ Search Pill Bar (Real-Time Live Search) ]
                               ↓
          [ Category Navigation Tiles (Image + Label) ]
                               ↓
        [ Featured Must Try Card (Blue-Purple Gradient) ]
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

UI ini berbasis referensi visual dari Figma Community:
- **Design Reference**: [Food Ordering App - Community](https://www.figma.com/design/PZukqy9x6lu43iJFsZfW1O/Food-Ordering-App--Community-?node-id=0-1&t=A3J1V2ZK6QJsEhUL-1)

*Catatan: Seluruh identitas brand, data menu, harga, deskripsi, dan metadata tetap menggunakan data resmi Santiks Coffee & Calm.*
