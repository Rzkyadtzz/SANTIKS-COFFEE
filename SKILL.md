---
name: santiks-ui-redesign-guidelines
description: Developer implementation rules, DOM contracts, and architectural guardrails for Santiks Coffee & Calm digital menu project.
---

# Santiks Coffee & Calm &mdash; Developer & AI Agent Skill & Guardrails

Dokumen ini berisi panduan implementasi teknis, aturan desain, dan **DOM contract antara HTML dan JavaScript** untuk pengembang atau AI Agent yang bekerja pada project ini.

---

## 🎯 Aturan Visual Utama (Refined Guidelines)

1. **Clean, Simple & Soft**:
   - Latar belakang utama: Putih / Off-white (`#ffffff` / `#f8fafc`).
   - Kartu produk & permukaan: Abu-abu netral lembut (`#f1f5f9`).
   - Latar belakang Navy Santiks (`#003370`) dipadukan dengan aksen Biru Vibrant (`#2563eb`).
   - Gradient Biru $\to$ Ungu (`linear-gradient(135deg, #003370 0%, #2563eb 55%, #6366f1 100%)`) digunakan pada kartu promo & top area Product Detail Sheet.
2. **Category Image Tiles**: Navigasi kategori berupa tile gambar persegi rounded (`48px x 48px`, radius `12px`) dengan label di bawah.
3. **Product Detail Sheet (Flow 3)**:
   - Mengetuk kartu produk pada katalog akan membuka **Product Detail Sheet / Modal**.
   - Menampilkan media top gradient, tombol kembali, foto produk, lembaran putih rounded, kategori, status badge, harga, deskripsi, dan tombol CTA utama *Pesan via WhatsApp*.
4. **Ringkasan Homepage & Order Flow**:
   - Homepage Santiks harus tetap ringkas dan terpusat pada **katalog menu**.
   - **DILARANG** menambahkan kembali section visual *Order Online* (WhatsApp Direct/ShopeeFood/GrabFood cards) atau section *Lokasi Kedai* pada homepage.
   - Pemesanan produk dilakukan dari **Detail Menu** melalui WhatsApp Direct.

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
| **Category Headings** | `[data-category-heading="..."]` | Dynamic category headings oleh JS |
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
| **Detail WhatsApp CTA** | `#productDetailWaBtn` | Target link WhatsApp order di Detail Sheet |

---

## 🚫 Rules: DO & DON'T

### DO:
- Gunakan data produk Santiks asli sebagai satu-satunya *source of truth*.
- Jaga agar homepage tetap ringkas (Header $\to$ Search $\to$ Category Tiles $\to$ Featured $\to$ Catalogue $\to$ Detail Sheet $\to$ Footer).
- Gunakan token warna & radius dari CSS `:root`.
- Pastikan foto produk Santiks menjadi focal point visual utama.
- Setiap update asset CSS/JS kritis wajib memperbarui `CACHE_VERSION` di `sw.js` (saat ini versi `v10`).

### DON'T:
- Jangan membuat kembali section *Order Online* atau *Lokasi Kedai* di homepage.
- Jangan membuat dua sumber data terpisah untuk kartu katalog dan detail menu.
- Jangan menambahkan rating bintang fiktif, quantity selector `[-] 1 [+]`, atau opsi ukuran palsu.
- Jangan menambahkan framework SPA (React/Vue/Next.js) atau build system baru.
- Jangan mengubah data produk, harga, deskripsi, atau link order Santiks asli.
