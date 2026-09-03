# Product Requirements Document (PRD)

# Santiks Coffee & Calm — Digital Menu

**Dokumen:** Product Requirements Document (PRD)  
**Produk:** Santiks Coffee & Calm — Landing Page & Digital Menu  
**Status:** Current Production Baseline  
**Arsitektur:** Static Website / Progressive Web App (PWA) / Zero-Build Deployment  
**Baseline Git Commit:** `6cce978`  
**Baseline Commit Message:** `refactor: remove detail buttons and keep menu search sticky`  
**Service Worker Cache Version:** `v16`  
**Bahasa Antarmuka (UI):** Bahasa Indonesia  
**Referensi Visual:** Food Ordering App — Community (Figma)  
**Tautan Referensi:** [Food Ordering App - Community](https://www.figma.com/design/PZukqy9x6lu43iJFsZfW1O/Food-Ordering-App--Community-?node-id=0-1&t=A3J1V2ZK6QJsEhUL-1)  
**Disclaimer Referensi:** _Adapted from the provided Figma reference screenshot._

---

## 1. Ringkasan & Tujuan Produk (Product Purpose)

Santiks Coffee & Calm Digital Menu adalah **mobile-first digital food & beverage menu catalogue** yang dirancang untuk memberikan pengalaman penemuan menu (_menu discovery_) yang cepat, bersih, responsif, dan intuitif langsung dari peramban (browser) pengguna tanpa proses instalasi yang rumit.

Produk ini dirancang khusus sebagai **katalog digital informasional**, bukan aplikasi pemesanan transaksi (_e-commerce / food delivery app_). Seluruh interaksi berfokus pada:

- Eksplorasi menu yang menyenangkan dan cepat,
- Akses pencarian menu real-time yang cepat dan intuitif di bagian atas katalog dalam alur dokumen normal (_normal document flow_),
- Penelusuran berbasis kategori melalui tile gambar visual (_Category Image Tiles_),
- Focal point visual yang kuat pada fotografi produk asli Santiks,
- Penyajian informasi detail produk yang jernih dan murni informasional melalui kartu produk.

---

## 2. Latar Belakang & Evolusi Produk (Background)

Versi awal landing page mengusung pola landing page kafe konvensional dengan berbagai section tambahan seperti hero banner berukuran besar, form pemesanan online langsung, tautan WhatsApp checkout, integrasi platform pihak ketiga (ShopeeFood/GrabFood), blok peta lokasi kedai, serta komponen navigasi yang berat (_heavy glassmorphism_ dan _bottom navigation bar_).

Melalui proses evaluasi berkelanjutan, arsitektur UI disederhanakan secara radikal agar menyerupai kesederhanaan dan kepraktisan **modern digital menu application**:

1. Menghilangkan elemen transaksional fiktif/redundant (keranjang, checkout, order direct WhatsApp).
2. Memusatkan seluruh halaman utama pada **katalog produk langsung** (_Homepage = Menu Catalogue_).
3. Mengadaptasi pola visual dari referensi Figma yang dikonfirmasi oleh pengguna (Flow 3: Informational Product Detail Sheet).
4. Menghilangkan seluruh tombol perantara tambahan (_Detail Menu button_ dan _Detail button_) pada kartu produk sehingga kartu produk itu sendiri menjadi pemicu utama interaksi.
5. Menempatkan bilah pencarian secara prominent di bagian atas katalog dalam alur dokumen normal (_normal document flow_) yang responsif.

---

## 3. Problem Statement

1. **Efisiensi Pengunjung**: Pelanggan di meja kedai atau calon pembeli membutuhkan akses menu yang instan tanpa harus mengunduh file PDF besar atau membuka aplikasi marketplace yang berat.
2. **Kemudahan Menemukan Menu**: Pengunjung sering kesulitan menemukan menu tertentu jika daftar menu panjang dan tidak dilengkapi pencarian yang mudah dijangkau.
3. **Kejelasan Informasi Produk**: Pengunjung ingin membaca deskripsi racikan, harga pasti, dan rekomendasi (_Must Try / Best Seller_) tanpa terganggu oleh alur checkout fiktif atau tombol perantara yang tidak diperlukan.

---

## 4. Product Goals

1. **Menu Discovery yang Cepat**: Pengguna dapat menemukan menu yang dicari dalam hitungan detik melalui live search atau filter kategori visual.
2. **Search Mudah Diakses**: Bilah pencarian (_Cari menu Santiks..._) tampil prominent di bagian atas katalog dalam alur dokumen normal (_normal document flow_) yang ikut tergulir secara alami saat scroll.
3. **Category Browsing Sederhana**: Kategori menu ditampilkan berupa tile gambar (_Image Tiles_) dengan interaksi geser horizontal (_drag scroll / touch swipe_) yang nyaman di mobile.
4. **Product Photography First**: Foto produk asli Santiks menjadi pusat perhatian visual utama (_focal point_).
5. **Detail Menu Murni Informasional**: Mengetuk/mengklik kartu produk langsung membuka sheet detail produk untuk membaca deskripsi, harga, dan status badge tanpa tombol perantara.
6. **Mobile-First Experience**: Tata letak, target sentuh (_touch targets_), dan hierarki visual dioptimalkan penuh untuk kenyamanan navigasi satu tangan di smartphone.
7. **Performa Ringan & Bebas Framework**: Mempertahankan performa tinggi tanpa framework JavaScript berat (Zero-build Vanilla JS).
8. **Integritas Data Asli**: Menjaga 100% keaslian nama menu, harga, kategori, foto, dan data bisnis resmi Santiks Coffee & Calm.
9. **Dukungan PWA & Offline Access**: Pengguna dapat memasang website ke layar utama (A2HS) dan mengakses menu melalui offline cache Service Worker.
10. **Aksesibilitas & SEO Terpelihara**: Markup semantik, navigasi keyboard (`Enter`/`Space`), serta metadata bisnis (JSON-LD LocalBusiness) tetap utuh.

---

## 5. Non-Goals (Batasan Ruang Lingkup)

Fitur-fitur berikut **secara tegas BUKAN bagian dari produk** dan dilarang ditambahkan tanpa instruksi baru:

- ❌ Sistem keranjang belanja (_Shopping Cart_).
- ❌ Alur pembayaran atau checkout (_Checkout System / Payment Gateway_).
- ❌ Tombol pemesanan langsung WhatsApp (_WhatsApp Ordering CTA_).
- ❌ Pengatur jumlah pesanan (_Quantity Selector [-] 1 [+]_).
- ❌ Sistem akun atau profil pelanggan (_Customer Authentication / Login / Register_).
- ❌ Fitur favorit atau wishlist (_Favorite / Wishlist_).
- ❌ Ulasan pelanggan atau sistem rating bintang fiktif (_Reviews & Fake Star Ratings_).
- ❌ Opsi varian rasa, topping, atau ukuran gelas fiktif (_Fake Product Options_).
- ❌ Sistem loyalty / poin reward (_Loyalty Rewards_).
- ❌ Point of Sale (POS) atau manajemen inventaris kasir (_Inventory Management_).

---

## 6. Target Pengguna (Target Users)

### A. Pengunjung Kedai (Dine-in / On-site Customers)

- **Karakteristik:** Berada di kedai Santiks, mengakses website melalui pemindaian QR code meja menggunakan smartphone.
- **Kebutuhan:** Membuka menu instan, mencari kopi/makanan favorit dengan cepat, membaca detail komposisi, dan melihat harga resmi.

### B. Calon Pelanggan (Prospective Customers)

- **Karakteristik:** Mengakses website melalui link bio media sosial (Instagram/TikTok) sebelum mengunjungi kedai.
- **Kebutuhan:** Mengeksplorasi variasi menu, melihat rekomendasi _Must Try_, dan mengetahui kisaran harga.

### C. Pengguna Desktop / Laptop

- **Karakteristik:** Pengunjung yang membuka menu melalui komputer pribadi atau tablet layar besar.
- **Kebutuhan:** Navigasi katalog dalam grid responsif yang rapi, pencarian cepat, dan tampilan visual yang tidak pecah.

---

## 7. Core User Flows (Alur Pengguna)

### 7.1 Alur Jelajah Menu Utama (Browse Flow)

```text
Buka Website (Homepage)
         ↓
Header & Sticky Search Bar
         ↓
Pilih Kategori (Category Image Tiles)
         ↓
Lihat Rekomendasi (Featured / Must Try)
         ↓
Gulir Katalog Menu (Menu Catalogue Grid)
         ↓
Klik / Tap Product Card
         ↓
Tampil Detail Menu (Informational Product Detail Sheet)
```

### 7.2 Alur Pencarian Cepat (Live Search Flow)

```text
User mengetik kata kunci pada "Cari menu Santiks..."
         ↓
Real-time filtering langsung menyaring kartu menu di DOM
         ↓
Kartu yang cocok tetap tampil; kartu yang tidak cocok disembunyikan
         ↓
Jika tidak ada kecocokan, tampil pesan ramah "Menu tidak ditemukan"
         ↓
User dapat menekan tombol (X) untuk mereset pencarian seketika
```

### 7.3 Alur Navigasi Kategori (Category Filter Flow)

```text
User menekan/menggeser salah satu Category Image Tile
         ↓
Tile terpilih mendapatkan status aktif (Border & Label: #0088FF)
         ↓
Daftar katalog menampilkan heading dinamis dan item sesuai kategori
         ↓
Bilah pencarian tetap berada di atas daftar hasil filter dalam alur dokumen normal
```

### 7.4 Alur Buka Detail Produk (Product Detail Interaction Flow)

```text
User mengetuk area Product Card (atau fokus via Tab + tekan Enter/Space)
         ↓
Product Detail Modal Sheet meluncur naik (Mobile Bottom Sheet / Desktop Modal)
         ↓
Data produk (Foto, Kategori, Status Badge, Harga #6155F5, Judul, Deskripsi) ditampilkan
         ↓
User menutup detail melalui tombol kembali (arrow-left), klik backdrop, atau tombol Escape
```

---

## 8. Arsitektur Informasi (Information Architecture)

### 8.1 Struktur Halaman Utama (Homepage)

```text
1. Header (.app-header) [Sticky: top 0, z-index 1030]
   ├── Brand Title: Santiks (Bold 700)
   ├── Brand Subtitle: Coffee & Calm (Muted 400)
   ├── Desktop Nav: Menu Catalogue (Smooth Scroll Anchor)
   └── Mobile Location Info: Mlati Norowito Gg. 2 (Contextual Informational Text)

2. Search Bar (.search-section) [Normal Document Flow, position: static]
   └── Search Pill: Search Icon + Input "Cari menu Santiks..." + Reset Clear Button (X)

3. Category Image Tiles (.category-section) [Document Flow]
   └── Drag-scroll container dengan tile gambar persegi rounded (54x54px) & label kategori

4. Featured Promo Banner (.featured-promo-section) [Mobile/Tablet Only (< 992px), Hidden on Desktop]
   └── Promo Card: Gradient Background (#0088FF → #6155F5) + Badge + Title + Price + Image

5. Menu Catalogue (.menu-catalogue-section) [Document Flow]
   ├── Section Heading: Popular Menu
   └── Menu Grid Container (#menuGrid)
       └── Responsive Food Cards (Image 1:1 → Title → Price)

6. Footer (.app-footer)
   └── Social Media Links (Instagram, TikTok) & Dynamic Copyright Year
```

### 8.2 Struktur Product Detail Sheet (.product-detail-modal) [z-index 2000]

```text
1. Top Media Area (.product-detail-media)
   ├── Back Button (.product-detail-back-btn): Lingkaran putih transparan + arrow icon
   ├── Background Gradient: linear-gradient(110deg, #0088FF 0%, #6155F5 100%)
   └── Circular Centered Product Image Wrapper
2. White Content Sheet (.product-detail-sheet)
   ├── Metadata Row: Category Pill (Biru) + Status Badge (Merah/Kuning) + Price (Ungu #6155F5)
   ├── Product Title: Nama menu resmi (Bold 700)
   └── Product Description: Penjelasan racikan & cita rasa resmi Santiks
```

---

## 9. Sistem Desain Visual & Warna Terkonfirmasi (Design Tokens)

### 9.1 Nilai Warna Terkonfirmasi Pengguna

| Token CSS              | Kode Hex  | Peran & Penggunaan                                                       |
| :--------------------- | :-------- | :----------------------------------------------------------------------- |
| `--color-brand`        | `#003370` | Brand Anchor Santiks (Navy) untuk logo dan identitas dasar               |
| `--color-ui-blue`      | `#0088FF` | Primary UI Blue (Active category tile, label aktif, aksen lokasi header) |
| `--color-ui-purple`    | `#6155F5` | Primary UI Purple (Harga produk `.menu-price`, sisi ungu gradient)       |
| `--color-bg`           | `#FFFFFF` | Latar belakang halaman utama & background wrapper sticky search          |
| `--color-surface-soft` | `#F5F4F4` | Permukaan netral kartu produk (`.food-card`) dan search pill bar         |
| `--color-border`       | `#E8E8E8` | Garis pemisah halus (header border, sticky search divider)               |
| `--color-text`         | `#1A1E26` | Warna tipografi utama (kontras tinggi, nyaman dibaca)                    |
| `--color-text-muted`   | `#8E8E93` | Teks keterangan sekunder, subtitle, dan label non-aktif                  |

### 9.2 Gradient Resmi

```css
--gradient-promo: linear-gradient(110deg, #0088ff 0%, #6155f5 100%);
```

Digunakan secara konsisten pada kartu rekomendasi _Must Try_ dan latar media atas _Product Detail Modal_.

### 9.3 Disclaimer Referensi Figma

> **Pemberitahuan:** Akses data node terstruktur langsung dari Figma (_Structured API / Inspect Node_) **TIDAK TERSEDIA** pada lingkungan pengembangan. Seluruh implementasi visual merupakan **adaptasi visual (_visual refinement_) berdasarkan screenshot referensi Figma** yang disediakan oleh pengguna dengan kode warna `#0088FF` dan `#6155F5` yang telah diverifikasi secara eksplisit. Dokumentasi dilarang mengklaim implementasi sebagai "pixel-perfect Figma extraction".

---

## 10. Persyaratan Komponen UI (Component Requirements)

### 10.1 App Header

- **Desktop:** Menampilkan brand Santiks dan tautan navigasi sederhana _Menu Catalogue_. Bebas dari tombol CTA pemesanan.
- **Mobile:** Menampilkan nama brand _Santiks_ (bold 700) di kiri dengan subtitle _Coffee & Calm_ (muted 400), serta teks lokasi _Mlati Norowito Gg. 2_ di kanan dalam warna `#0088FF` (semibold 600) murni sebagai informasi kontekstual.
- **Positioning:** Sticky di posisi `top: 0` dengan `z-index: 1030` dan pembatas bawah `1px solid var(--color-border)`.

### 10.2 Search Bar (Normal Document Flow)

- **Placeholder:** _"Cari menu Santiks..."_
- **Positioning:** `position: static;` dalam alur dokumen normal (_normal document flow_) pada seluruh viewport. Tidak lagi sticky atau fixed; ikut tergulir secara alami saat pengguna menggulir halaman ke bawah.
- **Visual:** Bentuk pill abu-abu netral lembut (`#F5F4F4`), ikon pencarian di kiri, tombol reset (X) saat ada kata kunci, tanpa shadow tebal.
- **Fungsionalitas:** Real-time live filtering terhadap judul dan deskripsi katalog menu.

### 10.3 Category Navigation Tiles

- **Format:** Image Tiles persegi rounded (`54px x 54px`, radius `12px`) dengan label teks kategori di bawah gambar.
- **State Aktif:** Border `2px solid #0088FF`, label warna `#0088FF` font-weight 600.
- **State Non-Aktif:** Border transparan, label warna abu-abu `#8E8E93` font-weight 400.
- **Interaksi:** Geser horizontal halus di mobile dengan dukungan drag-scroll via mouse pada desktop.
- **Kategori Terdaftar (13 Kategori Asli):** Must Try, Signature Coffee, Coffee Milk, Milkbased, Mocktail, Tea Series, Sparkling Series, Other, Manual Brew, Snacks, Main Course, Pastry, Pasta.
- **Perilaku Desktop vs Mobile:** Pada desktop (≥ 992px), Category Image Tiles berfungsi sebagai navigasi kategori utama; subsection heading kategori berulang dan badge item count (`.menu-category-heading`) di dalam katalog disembunyikan (`display: none;`) demi tampilan katalog yang compact dan bebas whitespace berlebih. Pada mobile (< 992px), subsection heading dan badge item count tetap dipertahankan.

### 10.4 Featured / Must Try Promo Card

- **Visual:** Latar belakang gradient vibrant `#0088FF → #6155F5`, typography putih bersih, status tag proporsional (`Best Seller #1`), harga (`Rp 20k`), dan foto produk rounded.
- **Interaksi:** Tidak memiliki tombol _Detail Menu_. Kartu promo itu sendiri memiliki contract `[data-open-detail-card]` dan membuka Detail Menu saat diklik/ditap.
- **Perilaku Responsif:**
  - **Mobile & Tablet (< 992px):** Ditampilkan sebagai kartu promo unggulan di atas katalog.
  - **Desktop (≥ 992px):** Disembunyikan (`display: none;`) secara menyeluruh beserta heading dan subtitlenya agar katalog desktop terasa ringkas, padat, dan langsung menuju Popular Menu.

### 10.5 Product Cards (Katalog Menu)

- **Struktur Final Sederhana:**
  ```text
  Product Image (Rasio 1:1)
          ↓
  Product Name (Font-weight 600)
          ↓
  Price (#6155F5, Font-weight 600)
  ```
- **Ketiadaan Tombol:** Bebas dari tombol _Detail_, _Pesan_, _Lihat_, _Add to Cart_, atau tautan WhatsApp.
- **Interaksi:** Area kartu secara keseluruhan berfungsi sebagai trigger pembuka Product Detail (`[data-open-detail-card]`).
- **Aksesibilitas:** Memiliki atribut `role="button"`, `tabindex="0"`, event listener `click`, dan listener keyboard `Enter` serta `Space` dengan indikator fokus `focus-visible`.

### 10.6 Product Detail Modal Sheet

- **Fungsi:** Tampilan informasi detail produk murni (_Informational Product Detail View_).
- **Struktur:** Tombol kembali lingkaran putih → Media gradient atas → Foto produk lingkaran → Lembaran putih rounded → Kategori pill & Status badge → Harga ungu `#6155F5` → Judul produk → Deskripsi racikan.
- **Batasan Mutlak:** Dilarang menambahkan tombol ordering, CTA WhatsApp, kuantitas pesanan, checkout, varian palsu, atau rating fiktif.

---

## 11. Persyaratan Fungsional JavaScript & DOM Contract

### 11.1 Lingkup Kerja JavaScript (Vanilla ES6+)

1. **Live Search Engine:** Melakukan pencarian real-time case-insensitive terhadap judul menu (`.food-title`) dan deskripsi (`.food-desc`), menyembunyikan item yang tidak cocok, dan menampilkan empty state jika nihil.
2. **Category Filtering Engine:** Menangani penyaringan menu berdasarkan atribut `data-category`, pengurutan item, dan pembuatan heading kategori dinamis.
3. **Product Detail Engine:** Mengekstraksi data produk langsung dari DOM kartu terpilih dan menampilkannya ke modal sheet tanpa memuat data dari sumber luar yang terpisah.
4. **Card Keyboard Interaction:** Menangani event keyboard `Enter` dan `Space` pada elemen ber-atribut `[data-open-detail-card]`.
5. **Drag Scroll Engine:** Menyediakan interaksi drag-and-swipe mouse pada baris tile kategori.
6. **Smooth Scroll Navigation:** Menavigasikan anchor link dengan kompensasi tinggi sticky header.
7. **Service Worker Registration:** Mendaftarkan file `sw.js` saat halaman selesai dimuat.

### 11.2 High-Level DOM Contract

Pengembang dan AI Agent wajib memelihara selector contract berikut agar interaksi HTML dan JavaScript tidak terputus:

- Search: `#menuSearchBar`, `#menuSearchInput`, `#menuSearchClear`, `#menuSearchEmpty`
- Filter Kategori: `#filterPills`, `#filterPills [data-filter]`
- Katalog Menu: `#menuGrid`, `#menuGrid .menu-item`, `[data-category]`, `[data-drag-scroll]`
- Product Detail Trigger: `[data-open-detail-card]`, `[data-close-detail]`
- Product Detail Modal Targets: `#productDetailModal`, `#productDetailImg`, `#productDetailCategory`, `#productDetailBadge`, `#productDetailPrice`, `#productDetailTitle`, `#productDetailDesc`

_(Detail arsitektur teknis lengkap DOM contract didokumentasikan pada `SKILL.md`)._

---

## 12. Integritas Data Produk & Bisnis (Data Integrity)

Seluruh data berikut merupakan aset nyata milik **Santiks Coffee & Calm** dan dilindungi dari modifikasi spekulatif:

- seluruh menu Santiks yang tersedia pada source saat ini, harga resmi, kategori, dan deskripsi produk asli.
- Seluruh aset foto produk asli di folder `assets/img/`.
- Nama bisnis (_Santiks Coffee & Calm_), nomor telepon (+6285182332802), dan alamat kedai (_Mlati Norowito Gg. 2 No.81, Kudus, Indonesia_).
- Dilarang mengganti konten menu asli dengan data fiktif dari template Figma (misal: burger, sushi, pizza non-Santiks).

---

## 13. SEO & Structured Data

Meskipun bagian fisik lokasi dan jam buka disederhanakan dari tampilan homepage, metadata SEO tetap dipertahankan penuh:

- Tag semantik HTML5 (`<header>`, `<main>`, `<section>`, `<article>`, `<footer>`).
- Metadata OpenGraph dan Twitter Card untuk pratinjau tautan media sosial.
- Skema terstruktur JSON-LD `CafeOrCoffeeShop` yang memuat nama bisnis, alamat fisik lengkap, nomor kontak resmi, dan tautan media sosial resmi.

---

## 14. Progressive Web App (PWA) & Service Worker

- **Web App Manifest:** `site.webmanifest` mendefinisikan identitas PWA (nama aplikasi, icon berbagai resolusi, theme color `#003370`, background color `#FFFFFF`, dan mode display `standalone`).
- **Service Worker (`sw.js`):** Mengelola pre-caching aset statis inti (HTML, CSS, JS, manifest, favicon) dan runtime caching untuk gambar produk guna mendukung akses cepat dan mode offline.
- **Cache Version Baseline Saat Ini:** **`v16`**.
- **Aturan Cache Bump:** Versi cache hanya dinaikkan ketika file statis runtime (`index.html`, `style.css`, `script.js`) mengalami perubahan fungsional. Perubahan pada file dokumentasi markdown **TIDAK MEMERLUKAN** kenaikan cache version.

---

## 15. Kebutuhan Responsif & Layout

- **Prinsip Mobile-First:** Tata letak dirancang untuk kenyamanan layar smartphone (320px – 480px) lalu diskalakan ke tablet dan desktop.
- **Grid Susunan Kartu:**
  - **Mobile (< 768px):** 2 kolom (`col-6`) untuk memaksimalkan kepadatan visual katalog.
  - **Tablet (768px – 991px):** 3–4 kolom (`col-md-4`).
  - **Desktop (≥ 992px):** 4 kolom (`col-lg-3`) dalam kontainer terpusat (_centered max-width container_).
- **Overflow Control:** Tidak ada horizontal overflow pada viewport di luar kontainer geser kategori yang memang dirancang untuk scroll horizontal.

---

## 16. Aksesibilitas (Accessibility) & Performa

### 16.1 Aksesibilitas

- Hierarki heading semantik (`h1` brand, `h2` nama section, `h3` nama produk).
- Seluruh gambar produk dilengkapi atribut `alt` deskriptif.
- Seluruh pemicu interaktif memiliki target sentuh memadai (minimal `44px x 44px` atau padding proporsional).
- Dukungan keyboard navigation penuh pada kartu produk (`tabindex="0"`, `role="button"`, pemicu tombol `Enter` / `Space`, dan outline `focus-visible`).
- Menghormati preferensi pengguna `prefers-reduced-motion: reduce` dengan mematikan transisi berat dan smooth scrolling.

### 16.2 Performa (Zero-Build Performance)

- Tidak menggunakan framework runtime yang berat (React/Vue/Angular).
- Pemuatan gambar non-kritis menggunakan atribut `loading="lazy"` dan `decoding="async"`.
- Format gambar modern terkompresi (`.webp`).
- CSS bersih tanpa efek shadow berat atau filter blur berlebihan.

---

## 17. Batasan Teknis (Technical Constraints)

1. **Static Zero-Build Deployment:** Aplikasi harus dapat langsung dideploy ke platform hosting statis (Vercel) tanpa langkah `npm install` atau `npm run build`.
2. **Larangan Migrasi Framework:** Dilarang memigrasikan basis kode ke React, Next.js, Vue, Svelte, Tailwind CLI, atau backend Node.js tanpa arahan requirement baru dari pemilik project.
3. **Stack Tetap:** HTML5, CSS3, Bootstrap 5.3 (via CDN), Vanilla JavaScript ES6+, Service Worker, Web App Manifest.

---

## 18. Pembagian Tanggung Jawab Berkas (File Responsibilities)

| Nama File          | Tanggung Jawab Utama                                                                                      |
| :----------------- | :-------------------------------------------------------------------------------------------------------- |
| `index.html`       | Markup semantik, konten katalog menu, struktur modal detail, metadata SEO & JSON-LD                       |
| `style.css`        | Design tokens, layout responsif, sticky search styling, styling kartu, modal sheet                        |
| `script.js`        | Logika interaksi DOM (live search, filter kategori, drag scroll, product detail engine, keyboard trigger) |
| `app.js`           | Inisialisasi tambahan dan fallback animasi AOS                                                            |
| `sw.js`            | Lifecycle cache Service Worker, strategi offline caching (Baseline: `v14`)                                |
| `site.webmanifest` | Konfigurasi instalasi PWA, icon, dan warna tema                                                           |
| `PRD.md`           | Sumber kebenaran kebutuhan produk (_Product Requirements: WHAT & WHY_)                                    |
| `DESIGN.md`        | Sumber kebenaran sistem desain visual (_Design System: HOW IT LOOKS_)                                     |
| `SKILL.md`         | Panduan teknis implementasi AI & Pengembang (_Guardrails & DOM Contract_)                                 |
| `README.md`        | Pengenalan project, panduan setup lokal, dan navigasi dokumentasi                                         |

---

## 19. Ekosistem & Tanggung Jawab Dokumentasi

Dokumentasi project dikelola secara terstruktur dengan pembagian tugas yang jelas:

- **`PRD.md`**: Menjawab **APA (WHAT)** produk ini, **MENGAPA (WHY)** keputusan produk diambil, siapa penggunanya, ruang lingkup fitur, serta kriteria penerimaan.
- **`DESIGN.md`**: Menjawab **BAGAIMANA (HOW)** visual produk dirancang, spesifikasi warna, tipografi, radius, elevasi, dan batas adaptasi referensi Figma.
- **`SKILL.md`**: Menjawab **BAGAIMANA PENGEMBANG / AI (HOW TO IMPLEMENT)** harus bekerja dengan aman, aturan teknis DOs & DON'Ts, serta kontrak ketat elemen DOM.
- **`README.md`**: Dokumen gerbang utama untuk orientasi pengembang, ringkasan fitur, alur pengguna, dan tautan menuju dokumentasi lengkap.

---

## 20. Arsip Komponen yang Dihapus (Removed Components)

Komponen-komponen berikut telah dihapus dari antarmuka dan **DILARANG DIKEMBALIKAN** ke dalam kode:

1. _Oversized landing hero section_
2. _Heavy glassmorphism navigation_
3. _Mobile bottom navigation bar_
4. _Order Online section_
5. _WhatsApp Direct order section_
6. _ShopeeFood cards & links_
7. _GrabFood cards & links_
8. _Physical location section & operating hours block_
9. _Google Maps CTA button_
10. _Desktop header WhatsApp order CTA_
11. _Pesan via WhatsApp Product Detail CTA_
12. _Featured "Detail Menu" CTA button_
13. _Product Card "Detail" & "Pesan" CTA buttons_

---

## 21. Kriteria Penerimaan (Acceptance Criteria)

### A. Halaman Utama (Homepage)

- [x] Header minimalis tanpa tombol order WhatsApp.
- [x] Header mobile menyertakan teks lokasi ringkas (_Mlati Norowito Gg. 2_) sebagai konteks.
- [x] Bilah pencarian (_Cari menu Santiks..._) berada dalam alur dokumen normal (tidak sticky/fixed).
- [x] Kartu promo _Must Try_ tersembunyi pada desktop (≥ 992px) dan tetap tampil pada mobile (< 992px).
- [x] Kategori menu **tidak ikut sticky** dan mengalir di normal document flow.
- [x] Kategori aktif ditandai dengan border dan teks `#0088FF`.
- [x] Kartu promo _Must Try_ mobile menggunakan gradient `#0088FF → #6155F5`.
- [x] Harga produk menggunakan warna aksen ungu `#6155F5`.
- [x] Tidak ada tombol atau section pemesanan transaksional di homepage.

### B. Kartu Produk (Product Cards)

- [x] Tidak ada tombol "Detail Menu", "Detail", atau "Pesan".
- [x] Mengetuk/mengklik kartu produk langsung membuka Product Detail Sheet.
- [x] Kartu produk dapat difokuskan melalui keyboard (`Tab`) dan dibuka dengan `Enter` atau `Space`.
- [x] Tampilan kartu bersih: Foto Produk (1:1) → Nama Produk → Harga.

### C. Detail Menu (Product Detail Sheet)

- [x] Menampilkan data produk asli (Foto, Kategori, Badge, Harga, Judul, Deskripsi).
- [x] Murni bersifat informasional (tanpa tombol pemesanan WhatsApp, cart, atau checkout).
- [x] Bebas dari rating bintang palsu, kuantitas pesanan, atau opsi varian fiktif.
- [x] Dapat ditutup dengan mudah via tombol kembali, klik backdrop, atau tombol `Escape`.

### D. Arsitektur & Dokumentasi

- [x] Arsitektur static zero-build tanpa framework SPA eksternal.
- [x] Service Worker terdaftar dengan cache baseline `v16`.
- [x] Metadata SEO dan structured data JSON-LD tetap utuh.
- [x] Seluruh dokumentasi (`PRD.md`, `README.md`, `DESIGN.md`, `SKILL.md`) berada dalam status sinkron.

---

## 22. Rencana Peningkatan Masa Depan (Future Enhancements)

Peningkatan berikut merupakan ide eksplorasi teknis non-transaksional yang dapat diimplementasikan di masa mendatang melalui spesifikasi baru:

- **Externalisasi Data Menu ke JSON:** Memisahkan data 59 menu ke file `menu.json` agar pembaruan harga atau item baru lebih mudah dikelola.
- **Headless CMS / Admin Dashboard Ringan:** Integrasi sheet atau CMS statis untuk kemudahan pengelolaan menu oleh staf kedai.
- **Indikator Ketersediaan Menu (Sold Out / Available):** Menampilkan badge status ketersediaan item secara real-time.
- **Informasi Alergen & Dietary Notes:** Menambahkan keterangan vegetarian, gluten-free, atau kandungan susu pada detail produk.
- **Peningkatan Prompt PWA A2HS:** Notifikasi banner kustom yang elegan untuk mengajak pengunjung memasang PWA.
- **Audit Aksesibilitas & Performa Berkala:** Audit Lighthouse reguler untuk memastikan skor performa, SEO, dan aksesibilitas mendekati 100.

---

## 23. Prinsip-Prinsip Produk (Product Principles)

1. **Menu First:** Menu makanan dan minuman adalah bintang utama website. Kurangi semua kebisingan visual yang menghalangi eksplorasi menu.
2. **Search Always Reachable:** Pencarian menu harus selalu siap sedia di ujung jari pengguna saat mereka sedang menelusuri halaman.
3. **Product Photography Focus:** Tampilkan foto sajian asli Santiks dengan pencahayaan dan resolusi terbaik.
4. **No Fake Functionality:** Jangan pernah menyajikan tombol pesanan, rating, atau varian yang sebenarnya tidak berfungsi.
5. **Preserve Santiks Data:** Jaga keaslian identitas brand, nama produk, harga, dan resep racikan khas Santiks.
6. **Mobile-First Simplicity:** Prioritaskan kesederhanaan penggunaan satu tangan pada layar ponsel.
7. **Approved Colors Consistency:** Gunakan `#003370` (brand), `#0088FF` (UI blue), dan `#6155F5` (purple) sesuai fungsinya.
8. **Zero-Build Architecture:** Pertahankan kesederhanaan tanpa dependensi kompilasi yang rapuh.
9. **Documentation Matches Reality:** Dokumentasi harus selalu merefleksikan kode sumber aktual, bukan angan-angan desain.
10. **Detail Menu is Informational:** Detail produk adalah buku cerita rasa dan informasi menu, bukan kasir pembayaran.

---

## 24. Definisi Selesai (Definition of Done)

Setiap tugas pengembangan atau perbaikan fitur dianggap **SELESAI (DONE)** apabila memenuhi formula:

$$\text{Done} = \text{Requirement} + \text{Implementation} + \text{Source Cleanup} + \text{DOM Contract Sync} + \text{PWA Consideration} + \text{Docs Sync} + \text{Git Review}$$

Rincian:

1. **Requirement:** Memenuhi secara presisi instruksi yang diminta tanpa melakukan redesign di luar lingkup.
2. **Implementation:** Kode berfungsi sempurna di perangkat target (mobile dan desktop).
3. **Source Cleanup:** Tidak meninggalkan kode usang (_dead CSS/JS_), wrapper kosong, atau sisa tombol yang tidak terpakai.
4. **DOM Contract Sync:** Kontrak selector antara HTML dan JavaScript tetap utuh.
5. **PWA Consideration:** Cache version dinaikkan jika ada perubahan aset statis kritis.
6. **Docs Sync:** `PRD.md`, `README.md`, `DESIGN.md`, dan `SKILL.md` disinkronkan secara konsisten.
7. **Git Review:** Riwayat commit bersih dengan pesan commit yang terstruktur dan deskriptif.
