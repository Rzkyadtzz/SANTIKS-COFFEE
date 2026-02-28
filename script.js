// script.js (FINAL)
(() => {
  "use strict";

  // -----------------------------
  // 0) Helper
  // -----------------------------
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
  const prefersReduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  // -----------------------------
  // 1) Footer year
  // -----------------------------
  (() => {
    const yearEl = document.getElementById("y");
    if (yearEl) yearEl.textContent = String(new Date().getFullYear());
  })();

  // -----------------------------
  // 2) Auto ALT text from H3 (menu cards)
  //    - Set alt = title jika alt kosong / placeholder "Matcha"
  // -----------------------------
  (() => {
    const cards = $$(".menu-item .menu-card");
    if (!cards.length) return;

    cards.forEach((card) => {
      const title = $("h3", card)?.textContent?.trim();
      const img = $("img.menu-img", card);

      if (!img || !title) return;

      const currentAlt = (img.getAttribute("alt") || "").trim().toLowerCase();
      if (!currentAlt || currentAlt === "matcha") {
        img.setAttribute("alt", title);
      }
    });
  })();

  // -----------------------------
  // 3) Smooth scroll for internal anchors only
  //    - Works with fixed navbar offset
  // -----------------------------
  (() => {
    const navbar = document.querySelector(".navbar");
    const getOffset = () => (navbar ? navbar.offsetHeight : 0);

    $$('a[href^="#"]').forEach((a) => {
      a.addEventListener("click", (e) => {
        const href = a.getAttribute("href");
        if (!href || href === "#") return;

        // Jangan handle kalau ini modal trigger / atau anchor yang tidak ada
        const target = document.querySelector(href);
        if (!target) return;

        e.preventDefault();
        const top =
          target.getBoundingClientRect().top + window.scrollY - getOffset();
        window.scrollTo({ top, behavior: "smooth" });

        // Update URL hash (tanpa reload)
        history.pushState(null, "", href);
      });
    });
  })();

  // -----------------------------
  // 4) Navbar scrolled state
  // -----------------------------
  (() => {
    const nav = document.querySelector(".navbar");
    if (!nav) return;

    const toggle = () => {
      if (window.scrollY > 10) nav.classList.add("scrolled");
      else nav.classList.remove("scrolled");
    };

    toggle();
    window.addEventListener("scroll", toggle, { passive: true });
  })();

  // -----------------------------
  // 5) Animate items on view (IntersectionObserver)
  // -----------------------------
  (() => {
    const els = $$(".animate-item");
    if (!els.length) return;

    if (prefersReduced) {
      els.forEach((el) => el.classList.add("show"));
      return;
    }

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 },
    );

    els.forEach((el) => obs.observe(el));
  })();

  // -----------------------------
  // 6) Active nav link based on visible section
  // -----------------------------
  (() => {
    const sections = $$("section[id], header[id]");
    const navLinks = $$(".navbar .nav-link");
    if (!sections.length || !navLinks.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        // Cari entry yang paling "masuk" viewport
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (!visible) return;

        const id = `#${visible.target.id}`;
        navLinks.forEach((l) =>
          l.classList.toggle("active", l.getAttribute("href") === id),
        );
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0.1, 0.25, 0.5, 1] },
    );

    sections.forEach((s) => obs.observe(s));
  })();

  // -----------------------------
  // 7) Filter menu grid (fade in/out)
  // -----------------------------
  (() => {
    const buttons = $$("#filterPills [data-filter]");
    const items = $$("#menuGrid .menu-item");
    if (!buttons.length || !items.length) return;

    // Pastikan transisi opacity via CSS (lebih clean),
    // tapi ini tetap aman kalau CSS belum ada.
    const showItem = (el) => {
      el.classList.remove("d-none");
      el.style.opacity = "1";
      el.style.pointerEvents = "auto";
    };

    const hideItem = (el) => {
      el.style.opacity = "0";
      el.style.pointerEvents = "none";
      window.setTimeout(() => {
        el.classList.add("d-none");
        el.style.opacity = "";
        el.style.pointerEvents = "";
      }, 200);
    };

    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const f = btn.getAttribute("data-filter") || "all";

        buttons.forEach((b) => {
          const active = b === btn;
          b.classList.toggle("active", active);
          b.setAttribute("aria-pressed", active ? "true" : "false");
        });

        items.forEach((it) => {
          const match = f === "all" || it.dataset.category === f;
          if (match) showItem(it);
          else hideItem(it);
        });
      });
    });
  })();

  // -----------------------------
  // 8) Drag scroll horizontal rows
  //    - Prevent click after drag
  // -----------------------------
  (() => {
    const scrollers = $$("[data-drag-scroll]");
    if (!scrollers.length) return;

    scrollers.forEach((scroller) => {
      let isDown = false;
      let startX = 0;
      let scrollLeft = 0;
      let moved = false;

      scroller.addEventListener("pointerdown", (e) => {
        isDown = true;
        moved = false;
        scroller.setPointerCapture(e.pointerId);
        startX = e.clientX;
        scrollLeft = scroller.scrollLeft;
        scroller.classList.add("dragging");
      });

      scroller.addEventListener("pointermove", (e) => {
        if (!isDown) return;
        const dx = e.clientX - startX;
        if (Math.abs(dx) > 6) moved = true;
        scroller.scrollLeft = scrollLeft - dx;
      });

      const end = () => {
        isDown = false;
        scroller.classList.remove("dragging");
      };

      scroller.addEventListener("pointerup", end);
      scroller.addEventListener("pointercancel", end);
      scroller.addEventListener("mouseleave", end);

      // Kalau habis drag, cegah click agar tidak "kepencet"
      scroller.addEventListener(
        "click",
        (e) => {
          if (moved) {
            e.preventDefault();
            e.stopPropagation();
          }
        },
        true,
      );
    });
  })();

  // -----------------------------
  // 9) Menu Modal (click card -> open modal)
  //    FIX: ambil gambar dari <img src>, bukan background-image
  // -----------------------------
  (() => {
    const menuGrid = document.getElementById("menuGrid");
    if (!menuGrid) return;

    // Pastikan Bootstrap Modal tersedia
    if (typeof window.bootstrap === "undefined" || !window.bootstrap.Modal) {
      console.warn(
        "Bootstrap Modal tidak ditemukan. Pastikan bootstrap.bundle.min.js ter-load.",
      );
      return;
    }

    // Buat modal sekali saja
    if (!document.getElementById("menuModal")) {
      const modalHTML = `
        <div class="modal fade" id="menuModal" tabindex="-1" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content border-0 shadow-lg" style="border-radius: 20px; overflow: hidden;">
              <div id="modalImg" style="height: 250px; background-size: cover; background-position: center;"></div>
              <div class="modal-body p-4">
                <div class="d-flex justify-content-between align-items-start mb-2">
                  <h4 id="modalTitle" class="fw-bold mb-0"></h4>
                  <span id="modalPrice" class="badge bg-primary fs-6"></span>
                </div>
                <p id="modalDesc" class="text-secondary mb-4"></p>
                <div class="d-grid">
                  <button type="button" class="btn btn-brand py-2" data-bs-dismiss="modal">Tutup</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
      document.body.insertAdjacentHTML("beforeend", modalHTML);
    }

    const modalNode = document.getElementById("menuModal");
    const modal = new window.bootstrap.Modal(modalNode);

    const mImg = document.getElementById("modalImg");
    const mTitle = document.getElementById("modalTitle");
    const mPrice = document.getElementById("modalPrice");
    const mDesc = document.getElementById("modalDesc");

    const extractCardData = (card) => {
      const title = $("h3", card)?.textContent?.trim() || "";
      const price = $(".menu-price", card)?.textContent?.trim() || "";
      const desc = $("p", card)?.textContent?.trim() || "";

      // Ambil dari <img src> jika ada
      const imgEl = $("img.menu-img", card);
      let imgUrl = imgEl?.getAttribute("src") || "";

      // Fallback jika masih ada versi background-image
      if (!imgUrl) {
        const bgEl = $(".menu-img", card);
        const bg = bgEl?.style?.backgroundImage || "";
        const m = bg.match(/url\(["']?(.*?)["']?\)/i);
        if (m && m[1]) imgUrl = m[1];
      }

      return { title, price, desc, imgUrl };
    };

    menuGrid.addEventListener("click", (e) => {
      const card = e.target.closest(".menu-card");
      if (!card) return;

      const { title, price, desc, imgUrl } = extractCardData(card);

      // isi modal
      mTitle.textContent = title;
      mPrice.textContent = price;
      mDesc.textContent = desc;

      if (imgUrl) {
        mImg.style.backgroundImage = `url('${imgUrl}')`;
      } else {
        // fallback UI kalau gambar tidak ketemu
        mImg.style.backgroundImage = "none";
      }

      modal.show();
    });

    // Service Worker
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker
          .register("/sw.js")
          .catch((err) => console.error("SW gagal:", err));
      });
    }
    window.addEventListener("orientationchange", () => {
      setTimeout(() => window.dispatchEvent(new Event("resize")), 200);
    });
  })();
})();
