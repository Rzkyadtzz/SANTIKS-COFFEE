# Santiks Coffee & Calm &mdash; Landing Page & Digital Menu

Halaman landing page dan menu digital untuk **Santiks Coffee & Calm** (Kedai Kopi di Kudus). Project ini mengusung pendekatan **minimal, clean, product-focused UI/UX**, static zero-build architecture, serta siap dideploy langsung ke Vercel.

---

## 📌 Ringkasan Project

Website ini memberikan pengalaman browsing menu digital yang cepat, responsif, dan intuitif. Pengunjung dapat mencari produk secara real-time, menelusuri kategori menu via tile gambar, melihat rekomendasi *Must Try*, serta diarahkan langsung ke kanal pemesanan online (WhatsApp Direct, ShopeeFood, GrabFood) dan lokasi kedai (Google Maps).

---

## 🛠️ Tech Stack Utama

* **HTML5**: Semantik HTML5, ARIA accessibility, JSON-LD Structured Data, OpenGraph metadata.
* **CSS3**: Design Tokens (CSS Variables), Soft Neutral Card Surfaces, Blue-Purple Gradient Accent, Clean Grid.
* **Vanilla JavaScript ES6+**: DOM interaction engine (Live search, Category filtering, Category headings, Drag scroll row).
* **Progressive Web App (PWA)**: Web App Manifest (`site.webmanifest`) & Service Worker (`sw.js` v8) dengan strategi offline caching.
* **Hosting / Deployment**: Vercel Static Deployment (Zero-build process).

---

## 📂 Struktur Project

```text
Landing Page Santiks/
├── index.html          # Markup utama (SEO, OpenGraph, JSON-LD, daftar menu lengkap)
├── style.css           # Styling kustom (Design Tokens, soft-gray cards, blue-purple gradient, clean header)
├── script.js           # Engine interaksi (Pencarian real-time, filter kategori, drag scroll)
├── app.js              # Inisialisasi halaman & AOS animation fallback
├── sw.js               # Service Worker (Cache static & runtime, offline support, v8)
├── site.webmanifest    # Metadata PWA
├── README.md           # Dokumentasi teknis & arsitektur project
├── DESIGN.md           # Source of truth Design System
├── SKILL.md            # Aturan implementasi & contract JavaScript DOM
└── assets/             # Gambar menu, hero background, dan favicon
```

---

## 📐 Arsitektur UI

```text
[ Solid Clean Header (Desktop / Mobile Location) ]
                       ↓
   [ Search Pill Bar (Real-Time Live Search) ]
                       ↓
  [ Category Navigation Tiles (Image + Label) ]
                       ↓
[ Featured Must Try Card (Blue-Purple Gradient) ]
                       ↓
 [ Popular Menu Catalogue (Soft Neutral Gray Cards) ]
                       ↓
[ Order Online Channels (WhatsApp, Shopee, Grab) ]
                       ↓
  [ Store Location & Information (Google Maps) ]
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

*Catatan: Seluruh identitas brand, data menu, harga, deskripsi, dan link order tetap menggunakan data resmi Santiks Coffee & Calm.*
