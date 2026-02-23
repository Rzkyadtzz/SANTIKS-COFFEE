// script.js
(() => {
  const yearEl = document.getElementById("y");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
(() => {
  const navbar = document.querySelector(".navbar");
  const getOffset = () => (navbar ? navbar.offsetHeight : 0);
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const id = a.getAttribute("href");
      if (!id || id === "#") return;
      const el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      const top = el.getBoundingClientRect().top + window.scrollY - getOffset();
      window.scrollTo({ top, behavior: "smooth" });
      history.pushState(null, "", id);
    });
  });
})();
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
(() => {
  const prefersReduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  const els = document.querySelectorAll(".animate-item");
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
(() => {
  const sections = [...document.querySelectorAll("section[id], header[id]")];
  const navLinks = [...document.querySelectorAll(".navbar .nav-link")];
  if (!sections.length || !navLinks.length) return;
  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = `#${entry.target.id}`;
          navLinks.forEach((l) =>
            l.classList.toggle("active", l.getAttribute("href") === id),
          );
        }
      });
    },
    { rootMargin: "-30% 0px -55% 0px", threshold: [0, 0.25, 0.5, 1] },
  );
  sections.forEach((s) => obs.observe(s));
})();
(() => {
  const buttons = document.querySelectorAll("#filterPills [data-filter]");
  const items = document.querySelectorAll("#menuGrid .menu-item");
  if (!buttons.length || !items.length) return;
  const fadeIn = (el) => {
    el.classList.remove("d-none");
    el.style.opacity = 0;
    requestAnimationFrame(() => {
      el.style.opacity = 1;
    });
  };
  const fadeOut = (el) => {
    el.style.opacity = 0;
    setTimeout(() => {
      el.classList.add("d-none");
      el.style.opacity = "";
    }, 200);
  };
  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const f = btn.getAttribute("data-filter");
      buttons.forEach((b) => {
        b.classList.toggle("active", b === btn);
        b.setAttribute("aria-pressed", b === btn ? "true" : "false");
      });
      items.forEach((it) => {
        const match = f === "all" || it.dataset.category === f;
        if (match) fadeIn(it);
        else fadeOut(it);
      });
    });
  });
})();
(() => {
  const scrollers = document.querySelectorAll("[data-drag-scroll]");
  scrollers.forEach((scroller) => {
    let isDown = false,
      startX = 0,
      scrollLeft = 0,
      moved = false;
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
      if (Math.abs(dx) > 3) moved = true;
      scroller.scrollLeft = scrollLeft - dx;
    });
    const end = () => {
      isDown = false;
      scroller.classList.remove("dragging");
    };
    scroller.addEventListener("pointerup", end);
    scroller.addEventListener("pointercancel", end);
    scroller.addEventListener("mouseleave", end);
  });
})();
(() => {
  const menuGrid = document.getElementById("menuGrid");
  if (!menuGrid) return;
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
  const modalEl = new bootstrap.Modal(document.getElementById("menuModal"));
  const mImg = document.getElementById("modalImg");
  const mTitle = document.getElementById("modalTitle");
  const mPrice = document.getElementById("modalPrice");
  const mDesc = document.getElementById("modalDesc");
  menuGrid.addEventListener("click", (e) => {
    const card = e.target.closest(".menu-card");
    if (!card) return;
    // Ambil data dari elemen kartu
    const imgUrl = card
      .querySelector(".menu-img")
      .style.backgroundImage.replace(/url\(['"]?(.*?)['"]?\)/i, "$1");
    const title = card.querySelector("h3").innerText;
    const price = card.querySelector(".menu-price").innerText;
    const desc = card.querySelector("p").innerText;
    // Isi konten modal
    mImg.style.backgroundImage = `url('${imgUrl}')`;
    mTitle.innerText = title;
    mPrice.innerText = price;
    mDesc.innerText = desc;
    modalEl.show();
  });
})();
