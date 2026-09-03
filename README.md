# Santiks Coffee & Calm &mdash; Landing Page & Digital Menu

Halaman landing page dan menu digital modern untuk **Santiks Coffee & Calm** (Kedai Kopi di Kudus). Project ini mengusung pendekatan **mobile-first food-ordering app UX**, static zero-build architecture, serta siap dideploy langsung ke Vercel.

---

## 📌 Ringkasan Project

Website ini memberikan pengalaman browsing menu digital yang cepat, responsif, dan interaktif seperti aplikasi mobile native (GrabFood / ShopeeFood). Pengunjung dapat mencari produk secara real-time, menelusuri kategori menu, melihat rekomendasi unggulan, serta diarahkan ke kanal pemesanan online (WhatsApp, ShopeeFood, GrabFood) dan lokasi kedai (Google Maps).

---

## 🛠️ Tech Stack Utama

* **HTML5**: Semantik HTML5, ARIA accessibility, JSON-LD Structured Data, OpenGraph metadata.
* **CSS3**: Design Tokens (CSS Variables), Vanilla CSS, Flexbox/Grid responsive system, Glassmorphism, Bootstrap 5 Utility CSS.
* **Vanilla JavaScript ES6+**: Zero-framework, DOM interaction engine (Live search, Category filtering, Scroll category tracking, Drag scroll, Auto-badge decorator).
* **Progressive Web App (PWA)**: Web App Manifest (`site.webmanifest`) & Service Worker (`sw.js` v7) dengan strategi offline caching.
* **Hosting / Deployment**: Vercel Static Deployment (Zero-build process).

---

## 📂 Struktur Project

```text
Landing Page Santiks/
├── index.html          # Markup utama (SEO, OpenGraph, JSON-LD, daftar menu lengkap)
├── style.css           # Styling kustom (Design Tokens, responsive system, food app layout)
├── script.js           # Engine interaksi (Pencarian real-time, filter kategori, scroll tracking, drag scroll)
├── app.js              # Inisialisasi halaman, AOS animation fallback, micro-animations
├── sw.js               # Service Worker (Cache static & runtime, offline support, v7)
├── site.webmanifest    # Metadata PWA
├── README.md           # Dokumentasi teknis & arsitektur project
├── DESIGN.md           # Source of truth Design System
├── SKILL.md            # Aturan implementasi & contract JavaScript DOM
└── assets/             # Gambar menu, hero background, dan favicon
```

---

## 📐 Arsitektur UI & Tata Letak

1. **Desktop Navbar (`.desktop-navbar`)**: Navigation bar melayang dengan efek glassmorphism, brand logo, menu link, dan tombol CTA WhatsApp.
2. **Mobile App Header (`.mobile-app-header`)**: Header ringkas ala aplikasi mobile dengan konteks lokasi store (*Mlati Norowito, Kudus*), indikator status buka, serta ikon pencarian & WhatsApp.
3. **Hero Promo Banner (`.hero-section`)**: Banner selamat datang gaya aplikasi kuliner modern dengan tajuk *"Speciality Coffee & Artisan Meals"*.
4. **App Search Bar (`.app-search-bar`)**: Form pencarian berbentuk rounded pill dengan pencarian teks real-time instan dan tombol bersihkan pencarian (`X`).
5. **Category Chips Navigation (`.category-pills-row`)**: Barisan chip kategori horizontal dengan dukungan *drag scroll* tanpa sengaja terklik.
6. **Food Card Catalogue Grid (`#menuGrid`)**: Grid card produk makanan & minuman dengan rasio gambar 4:3, overlay badge (*Best Seller*, *Top Ordered*, *Most Popular*), harga tebal, dan tombol pemesanan cepat (`+`).
7. **Order Channels Section (`#order`)**: Kartu kanal pemesanan online (WhatsApp Direct, ShopeeFood, GrabFood).
8. **Store Location & Hours (`#lokasi`)**: Kartu informasi alamat kedai, jam operasional (10:00 - 22:00 WIB), media sosial, dan Google Maps.
9. **Mobile Bottom Navigation (`.mobile-bottom-nav`)**: Navigation bar bawah melayang di perangkat mobile dengan tab *Home*, *Menu*, *Order*, dan *Lokasi*.

---

## 📱 Sistem Responsif & Breakpoint

```text
Mobile (Compact)   : < 576px
Large Mobile       : 576px – 767px
Tablet             : 768px – 1023px
Desktop            : 1024px – 1439px
Large Desktop      : >= 1440px (Max Container Width: 1360px)
```

---

## ✨ Fitur Utama

- **Pencarian Menu Real-Time**: Pencarian kata kunci menu instan tanpa reload halaman.
- **Navigasi Kategori Interaktif**: Chip kategori dengan indikator posisi scroll aktif otomatis saat di-scroll di ponsel.
- **Drag Scroll**: Geser kursor mouse atau touch swipe pada baris kategori.
- **Dynamic Badge Decorator**: Render otomatis badge unggulan pada item menu favorit.
- **Kanal Pemesanan WhatsApp Direct**: Tombol order cepat mengarahkan langsung ke WhatsApp kasir dengan pesan terisi nama produk.
- **PWA & Offline Support**: Caching asset otomatis via Service Worker `v7`.

---

## ⚡ Pengembangan & Pengujian Lokal

Karena project ini menggunakan arsitektur **zero-build static website**, Anda dapat menjalankannya langsung tanpa memasang `npm` / `node_modules`.

### Menggunakan Python Built-in Server:
```bash
python -m http.server 8000
```
Buka di browser: `http://localhost:8000`

### Menggunakan PHP Built-in Server / Laragon:
```bash
php -S localhost:8000
```

---

## 🚀 Deployment (Vercel Static)

Project ini siap dideploy ke Vercel tanpa proses build:

- **Framework Preset**: `Other`
- **Build Command**: *(Kosongkan)*
- **Output Directory**: `.`
- **Root Directory**: `.`

---

## 🎨 Referensi Desain

UI redesign ini terinspirasi oleh sistem UI/UX dari Figma Community:
- **Design Reference**: [Food Ordering App - Community](https://www.figma.com/design/PZukqy9x6lu43iJFsZfW1O/Food-Ordering-App--Community-?node-id=0-1&t=A3J1V2ZK6QJsEhUL-1)

*Catatan: Figma digunakan sebagai referensi pola interaksi, hierarki visual, dan estetika layout. Seluruh identitas brand, data menu, harga, deskripsi, dan link order tetap menggunakan data resmi Santiks Coffee & Calm.*
