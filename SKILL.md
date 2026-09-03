---
name: santiks-ui-redesign-guidelines
description: Developer implementation rules, DOM contracts, and architectural guardrails for Santiks Coffee & Calm digital menu project.
---

# Santiks Coffee & Calm &mdash; Developer & AI Agent Skill & Guardrails

Dokumen ini berisi panduan implementasi teknis, aturan desain, dan **DOM contract antara HTML dan JavaScript** untuk pengembang atau AI Agent yang bekerja pada project ini. Visual UI diadaptasikan dari screenshot referensi Figma (*Adapted from the provided Figma reference screenshot*).

---

## 🎯 Aturan Visual Utama (Refined Guidelines)

1. **Clean, Simple & Soft Surfaces**:
   - Latar belakang utama: Putih murni (`#FFFFFF`).
   - Kartu produk & search bar: Abu-abu netral lembut (`#F5F4F4` / `--color-surface-soft`).
   - Brand Anchor: Navy Santiks (`#003370` / `--color-brand`) digunakan untuk branding & identitas dasar.
   - Primary UI Blue: `#0088FF` (`--color-ui-blue`) untuk active category, link aksen, dan lokasi mobile header.
   - UI Purple: `#6155F5` (`--color-ui-purple`) untuk harga produk dan gradient promo.
   - Signature Gradient: `linear-gradient(110deg, #0088FF 0%, #6155F5 100%)` untuk promo card & top area Product Detail Sheet.
2. **Minimal Header Layout**:
   - **Desktop Header**: Menampilkan nama brand dan link navigasi *Menu Catalogue*. Dilarang menambahkan tombol CTA Order di header desktop.
   - **Mobile Header**: Menampilkan nama brand di kiri (bold 700) dengan subtitle muted (400), dan lokasi (*Mlati Norowito Gg. 2*) di kanan dalam warna `#0088FF` (semibold 600).
3. **Category Image Tiles**: Navigasi kategori berupa tile gambar persegi rounded (`54px x 54px`, radius `12px`) dengan label di bawah.
   - State aktif: border `2px solid #0088FF`, label warna `#0088FF` (font-weight 600).
   - State non-aktif: border transparan, label abu-abu muted `#8E8E93` (font-weight 400).
4. **Informational Product Detail Sheet (Flow 3)**:
   - Mengetuk kartu produk pada katalog akan membuka **Product Detail Sheet / Modal**.
   - Menampilkan media top gradient (`#0088FF → #6155F5`), tombol kembali, foto produk, lembaran putih rounded, kategori (pill biru), status badge, harga (`#6155F5`), judul, dan deskripsi produk.
   - **Informational Only**: Dilarang menambahkan tombol ordering/Pesan via WhatsApp, Add to Cart, Buy Now, atau fitur pemesanan pengganti di Product Detail Sheet.
5. **Ringkasan Homepage & User Flow**:
   - User flow: `Menu Catalogue` $\to$ `Detail Menu` (Informational Detail).
   - Homepage Santiks harus tetap ringkas dan terpusat pada **katalog menu**.
   - **DILARANG** menambahkan kembali section visual *Order Online* atau section *Lokasi Kedai* pada homepage.

---

## 📜 JavaScript DOM Contract (Wajib Dipelihara)

| Element / Action | Required Selector / ID | Fungsi di JS |
| :--- | :--- | :--- |
| **Footer Year** | `#y` | Auto update tahun hak cipta |
| **Header** | `.app-header` | Sticky offset scroll |
| **Menu Grid Container** | `#menuGrid` | Container item card & category headings |
| **Menu Item** | `#menuGrid .menu-item` | Selector filter & search menu |
| **Item Category Tag** | `data-category="..."` | Data filter kategori pada item card |
| **Filter Pills Container**| `#filterPills` | Group category tiles |
| **Category Tile Button** | `#filterPills [data-filter]` | Trigger filter kategori menu |
| **Search Form** | `#menuSearchBar` | Element form pencarian |
| **Search Input** | `#menuSearchInput` | Input pencarian menu real-time |
| **Search Clear Button** | `#menuSearchClear` | Tombol reset input pencarian |
| **Search Empty Text** | `#menuSearchEmpty` | Pesan jika menu tidak ditemukan |
| **Category Headings** | `[data-category-heading="..."]` | Dynamic category headings oleh JS (tampil di mobile; disembunyikan di desktop) |
| **Drag Scroll Row** | `[data-drag-scroll]` | Inisialisasi drag scroll mouse/touch |
| **Product Detail Modal**| `#productDetailModal` | Container Modal Sheet Product Detail |
| **Open Detail Trigger** | `[data-open-detail-card]` | Trigger pembuka Detail Menu pada card |
| **Close Detail Trigger**| `[data-close-detail]` | Tombol/backdrop penutup Detail Menu |
| **Detail Image Target** | `#productDetailImg` | Target gambar produk di Detail Sheet |
| **Detail Category** | `#productDetailCategory` | Target nama kategori di Detail Sheet |
| **Detail Status Badge**| `#productDetailBadge` | Target badge status (e.g. Best Seller) |
| **Detail Price** | `#productDetailPrice` | Target harga di Detail Sheet |
| **Detail Title** | `#productDetailTitle` | Target nama produk di Detail Sheet |
| **Detail Description** | `#productDetailDesc` | Target deskripsi produk di Detail Sheet |

---

## 🚫 Rules: DO & DON'T

### DO:
- Keep search sticky and accessible during scrolling (`position: sticky`, `top: var(--header-height)`).
- Open Product Detail directly from product card interaction (`[data-open-detail-card]` click & keyboard `Enter`/`Space`).
- Keep cards minimal: Product Image $\to$ Product Name $\to$ Price tanpa tombol perantara.
- Gunakan `#0088FF` untuk primary Figma-style UI blue (active category, active label, mobile location, interactive hover).
- Gunakan `#6155F5` untuk purple accent & harga produk (`.menu-price`, `.product-detail-price`).
- Gunakan permukaan netral abu-abu lembut `#F5F4F4` (`--color-surface-soft`) untuk card dan search bar.
- Jaga typography tetap proporsional (Brand: 700, Section: 600–700, Product: 600, Price: 600, Body: 400).
- Gunakan dan gunakan ulang token CSS resmi dari `:root`.
- Buka Detail Menu dari katalog sebagai tampilan informasi produk murni.
- Tampilkan data produk Santiks asli (kategori, harga, deskripsi, foto, badge).
- Jaga agar homepage tetap ringkas (Header $\to$ Sticky Search $\to$ Category Tiles $\to$ Featured $\to$ Catalogue $\to$ Detail Sheet $\to$ Footer).
- Sembunyikan category subsection headings dan item count di desktop (`min-width: 992px`) agar katalog compact.
- Setiap update asset CSS/JS kritis wajib memperbarui `CACHE_VERSION` di `sw.js` (saat ini versi `v15`).

### DON'T:
- Dilarang menambahkan tombol "Detail Menu" / "Detail" kembali ke UI.
- Dilarang menambahkan tombol ordering CTA (WhatsApp, Pesan, Add to Cart, Buy Now, Checkout).
- Dilarang menambahkan category bar/tiles ke dalam sticky stack kecuali diminta secara eksplisit.
- Jangan menggunakan varian biru arbitrer atau mengembalikan `#2563EB` sebagai primary reference blue.
- Jangan menggunakan berbagai warna ungu acak (gunakan `#6155F5`).
- Jangan overuse `#003370` sebagai UI border/accent (gunakan khusus untuk Santiks brand anchor).
- Dilarang membuat klaim "pixel-perfect Figma extraction" atau "exact Figma match" jika data node terstruktur tidak tersedia.
- Dilarang menambahkan tombol direct order pada product card.
- Jangan membuat kembali section *Order Online* atau *Lokasi Kedai* di homepage.
- Jangan membuat dua sumber data terpisah untuk kartu katalog dan detail menu.
- Jangan menambahkan rating bintang fiktif, quantity selector `[-] 1 [+]`, atau opsi ukuran palsu.
- Jangan menambahkan framework SPA (React/Vue/Next.js) atau build system baru.
- Jangan mengubah data produk, harga, deskripsi, atau metadata bisnis Santiks asli.
