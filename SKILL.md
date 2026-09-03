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
   - Gradient Biru $\to$ Ungu (`linear-gradient(135deg, #003370 0%, #2563eb 55%, #6366f1 100%)`) hanya digunakan pada kartu promo / featured.
2. **Category Image Tiles**: Navigasi kategori berupa tile gambar persegi rounded (`48px x 48px`, radius `12px`) dengan label di bawah.
3. **No Decorative Bloat**:
   - **HAPUS** glassmorphism berlebihan, blur, shadow tebal, dan floating glass card.
   - **HAPUS** mobile bottom navigation yang tidak diperlukan.
   - **HAPUS** hero landing page raksasa / onboarding splash screen.
   - **HAPUS** tombol `+` (Add to Cart fiktif). Gunakan tombol / link `Pesan` langsung ke WhatsApp.

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

---

## 🚫 Rules: DO & DON'T

### DO:
- Gunakan token warna & radius dari CSS `:root`.
- Pastikan foto produk Santiks menjadi focal point visual utama.
- Setiap update asset CSS/JS kritis wajib memperbarui `CACHE_VERSION` di `sw.js` (saat ini versi `v8`).

### DON'T:
- Jangan menambahkan framework SPA (React/Vue/Next.js) atau build system baru.
- Jangan menambahkan fitur fiktif (Cart, Account, Favorite, Review, Rating bintang fiktif).
- Jangan mengubah data produk, harga, deskripsi, atau link order Santiks asli.
