---
name: santiks-ui-redesign-guidelines
description: Implementation rules, DOM contracts, and architectural guardrails for Santiks Coffee & Calm digital menu project.
---

# Santiks Coffee & Calm &mdash; Developer & AI Agent Skill & Guardrails

Dokumen ini berisi panduan implementasi teknis, aturan desain, dan **DOM contract antara HTML dan JavaScript** untuk pengembang atau AI Agent yang bekerja pada project ini di masa mendatang.

---

## 🎯 Prinsip Utama Project

1. **Preserve Santiks Brand Identity**: Brand color utama adalah `#003370` (Navy Blue).
2. **Mobile-First & App-Like**: Desain diutamakan untuk kenyamanan browsing menu di ponsel.
3. **Preserve Business Logic & Data**: Nama produk, harga, deskripsi, link WhatsApp, ShopeeFood, GrabFood, dan Google Maps adalah data asli yang tidak boleh diubah sembarangan.
4. **Zero-Build Architecture**: Tetap pertahankan arsitektur web statis tanpa bundler (React/Vue/Tailwind build).
5. **No Fake Functionality**: Jangan menambahkan tombol cart / favorite fiktif yang tidak didukung backend.

---

## 📜 JavaScript DOM Contract (Wajib Dipelihara)

Setiap perubahan markup HTML **WAJIB mempertahankan ID, Data Attributes, dan Selector berikut** agar logika JavaScript (`script.js` & `app.js`) tetap berfungsi normal:

### Selector & Element Contract:

| Element / Action | Required Selector / ID | Fungsi di JS |
| :--- | :--- | :--- |
| **Footer Year** | `#y` | Auto update tahun hak cipta |
| **Desktop Navbar** | `.desktop-navbar` atau `.navbar` | Track scroll state (`scrolled` class) |
| **Navbar Collapse** | `#navMain` | Collapse menu saat link diklik |
| **Menu Grid Container** | `#menuGrid` | Container item card & category headings |
| **Menu Item** | `#menuGrid .menu-item` | Selector filter & search menu |
| **Item Category Tag** | `data-category="..."` | Data filter kategori pada item card |
| **Filter Pills Container**| `#filterPills` | Group button filter kategori |
| **Filter Button** | `#filterPills [data-filter]` | Trigger filter kategori menu |
| **Search Toggle** | `#menuSearchToggle` | Quick scroll/focus ke search bar |
| **Search Form** | `#menuSearchBar` | Element form pencarian |
| **Search Input** | `#menuSearchInput` | Input pencarian menu real-time |
| **Search Clear Button** | `#menuSearchClear` | Tombol reset input pencarian |
| **Search Empty Text** | `#menuSearchEmpty` | Pesan jika menu tidak ditemukan |
| **Category Headings** | `[data-category-heading="..."]` | Dynamic category headings oleh JS |
| **Drag Scroll Row** | `[data-drag-scroll]` | Inisialisasi drag scroll mouse/touch |
| **Mobile Bottom Nav** | `.bottom-nav-item` | Tracking scroll indikator tab aktif |

---

## 🚫 Rules: DO & DON'T

### DO:
- Gunakan CSS Custom Properties (`var(--color-primary)`, `--radius-lg`, dll) dari `:root`.
- Pastikan gambar menggunakan atribut `loading="lazy"` dan `decoding="async"`.
- Setiap penambahan asset CSS/JS kritis harus diiringi dengan **update `CACHE_VERSION` di `sw.js`** (misal `v7`, `v8`).
- Pengujian tampilan wajib dilakukan pada viewport: `360px`, `390px`, `430px`, `768px`, `1024px`, `1440px`.

### DON'T:
- Jangan menambahkan framework SPA (React, Next.js, Vue, Svelte) atau build tool (Vite, Webpack).
- Jangan menghapus atribut `aria-*`, `role="search"`, atau tag aksesibilitas tanpa alasan teknis.
- Jangan mengubah hex color secara ad-hoc tanpa mendaftarkannya sebagai token di `:root`.
- Jangan merusak struktur manifest PWA (`site.webmanifest`) atau Service Worker (`sw.js`).
