// script.js (REFINED - Clean UI Engine + Product Detail Sheet)
(() => {
  "use strict";

  // -----------------------------
  // 0) Helpers & Motion Check
  // -----------------------------
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
  const prefersReduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  // -----------------------------
  // 1) Footer year auto update
  // -----------------------------
  (() => {
    const yearEl = document.getElementById("y");
    if (yearEl) yearEl.textContent = String(new Date().getFullYear());
  })();

  // -----------------------------
  // 2) Smooth scroll for internal anchors
  // -----------------------------
  (() => {
    const header = document.querySelector(".app-header");
    const getOffset = () => (header ? header.offsetHeight : 0);

    $$('a[href^="#"]').forEach((a) => {
      a.addEventListener("click", (e) => {
        const href = a.getAttribute("href");
        if (!href || href === "#") return;

        const target = document.querySelector(href);
        if (!target) return;

        e.preventDefault();
        const top =
          target.getBoundingClientRect().top + window.scrollY - getOffset();
        window.scrollTo({
          top: Math.max(0, top),
          behavior: prefersReduced ? "auto" : "smooth",
        });
        history.pushState(null, "", href);
      });
    });
  })();

  // -----------------------------
  // 3) Filter menu grid & live search engine
  // -----------------------------
  (() => {
    const menuGrid = document.getElementById("menuGrid");
    const menuSection = document.getElementById("menu");
    const filterPills = document.getElementById("filterPills");
    const buttons = $$("#filterPills [data-filter]");
    const items = $$("#menuGrid .menu-item");
    if (!buttons.length || !items.length) return;

    const searchBar = document.getElementById("menuSearchBar");
    const searchInput = document.getElementById("menuSearchInput");
    const searchClear = document.getElementById("menuSearchClear");
    const searchEmpty = document.getElementById("menuSearchEmpty");
    const mobileMenuQuery = window.matchMedia("(max-width: 991.98px)");
    const hideTimers = new WeakMap();
    const normalizeText = (value) => value.toLowerCase().trim();
    let searchQuery = "";
    let scrollTicking = false;

    const categoryOrder = new Map(
      buttons.map((btn, index) => [btn.getAttribute("data-filter"), index]),
    );

    const highlightBadges = new Map([
      ["Butterscotch", { icon: "bi-award-fill", label: "Best Seller", type: "best-seller" }],
      ["Mix Platter", { icon: "bi-hand-thumbs-up-fill", label: "Top Ordered", type: "top-ordered" }],
      ["Caramelo", { icon: "bi-star-fill", label: "Most Popular", type: "most-popular" }],
      ["Red Velvet", { icon: "bi-star-fill", label: "Most Popular", type: "most-popular" }],
      ["Chicken Katsu Sambal Matah", { icon: "bi-star-fill", label: "Most Popular", type: "most-popular" }],
      ["Matcha", { icon: "bi-star-fill", label: "Most Popular", type: "most-popular" }],
      ["Palm Sugar (Aren)", { icon: "bi-star-fill", label: "Most Popular", type: "most-popular" }],
      ["Americano", { icon: "bi-star-fill", label: "Most Popular", type: "most-popular" }],
    ]);

    items.forEach((item, index) => {
      item.dataset.originalOrder = String(index);
    });

    const decorateHighlightBadges = () => {
      items.forEach((item) => {
        if (item.dataset.category === "musttry") return;

        const title = $("h3", item)?.textContent.replace(/\s+/g, " ").trim();
        const badge = title ? highlightBadges.get(title) : null;
        if (!badge || $(".scroll-menu-badge", item)) return;

        const mediaCol = $(".food-card-media", item);
        if (!mediaCol) return;

        const badgeEl = document.createElement("span");
        badgeEl.className = `scroll-menu-badge scroll-menu-badge-${badge.type}`;

        const iconEl = document.createElement("i");
        iconEl.className = `bi ${badge.icon}`;
        iconEl.setAttribute("aria-hidden", "true");

        const textEl = document.createElement("span");
        textEl.textContent = badge.label;

        badgeEl.append(iconEl, textEl);
        mediaCol.appendChild(badgeEl);
      });
    };

    const sortMenuItemsByCategory = () => {
      if (!menuGrid) return;
      items.sort((a, b) => {
        const orderA = categoryOrder.get(a.dataset.category) ?? Number.MAX_SAFE_INTEGER;
        const orderB = categoryOrder.get(b.dataset.category) ?? Number.MAX_SAFE_INTEGER;
        if (orderA !== orderB) return orderA - orderB;
        return Number(a.dataset.originalOrder) - Number(b.dataset.originalOrder);
      });
      items.forEach((item) => menuGrid.appendChild(item));
    };

    const buildCategoryHeadings = () => {
      if (!menuGrid) return;
      buttons.forEach((btn) => {
        const category = btn.getAttribute("data-filter");
        if (!category || category === "all") return;

        const categoryItems = items.filter((item) => item.dataset.category === category);
        const firstItem = categoryItems[0];
        if (!firstItem) return;

        let heading = $(`[data-category-heading="${category}"]`, menuGrid);
        if (!heading) {
          heading = document.createElement("div");
          heading.className = "menu-category-heading col-12";
          heading.dataset.categoryHeading = category;
          firstItem.before(heading);
        }

        const title = btn.getAttribute("aria-label") || btn.textContent.trim();
        heading.dataset.categoryTitle = title;
        heading.dataset.categoryCount = String(categoryItems.length);
        heading.innerHTML = `
          <h3>${title}</h3>
          <span data-category-count>${categoryItems.length} item</span>
        `;
      });

      items.forEach((item) => {
        const category = item.dataset.category || "";
        const label =
          buttons
            .find((btn) => btn.getAttribute("data-filter") === category)
            ?.getAttribute("aria-label") ||
          buttons
            .find((btn) => btn.getAttribute("data-filter") === category)
            ?.textContent.trim() ||
          "";

        item.dataset.searchText = normalizeText(`${item.textContent} ${label}`);
      });
    };

    const showItem = (el, delay) => {
      const pendingHide = hideTimers.get(el);
      if (pendingHide) {
        window.clearTimeout(pendingHide);
        hideTimers.delete(el);
      }
      el.classList.remove("d-none");
      const timer = window.setTimeout(() => {
        void el.offsetWidth;
        el.classList.add("filtered-show");
        el.style.pointerEvents = "auto";
        hideTimers.delete(el);
      }, delay);
      hideTimers.set(el, timer);
    };

    const hideItem = (el) => {
      const pendingHide = hideTimers.get(el);
      if (pendingHide) {
        window.clearTimeout(pendingHide);
        hideTimers.delete(el);
      }
      el.classList.remove("filtered-show");
      el.style.pointerEvents = "none";
      const timer = window.setTimeout(() => {
        el.classList.add("d-none");
        hideTimers.delete(el);
      }, 300);
      hideTimers.set(el, timer);
    };

    const centerActiveButton = (selectedBtn) => {
      if (!filterPills || !selectedBtn) return;
      const targetLeft =
        selectedBtn.offsetLeft -
        (filterPills.clientWidth - selectedBtn.offsetWidth) / 2;
      filterPills.scrollTo({
        left: Math.max(0, targetLeft),
        behavior: prefersReduced ? "auto" : "smooth",
      });
    };

    const setActiveButton = (selectedBtn) => {
      buttons.forEach((btn) => {
        const active = btn === selectedBtn;
        btn.classList.toggle("active", active);
        btn.setAttribute("aria-pressed", active ? "true" : "false");
      });
    };

    const showAllItems = () => {
      items.forEach((item) => {
        const pendingHide = hideTimers.get(item);
        if (pendingHide) {
          window.clearTimeout(pendingHide);
          hideTimers.delete(item);
        }
        item.classList.remove("d-none");
        item.classList.add("filtered-show");
        item.style.pointerEvents = "auto";
      });
    };

    const setCategoryHeadingCount = (heading, count) => {
      const countEl = $("[data-category-count]", heading);
      if (!countEl) return;
      countEl.textContent = `${count} item`;
    };

    const resetCategoryHeadings = () => {
      $$("[data-category-heading]", menuGrid).forEach((heading) => {
        heading.classList.remove("d-none");
        setCategoryHeadingCount(
          heading,
          Number(heading.dataset.categoryCount || 0),
        );
      });
    };

    const updateCategoryHeadingsForSearch = (matchCounts) => {
      $$("[data-category-heading]", menuGrid).forEach((heading) => {
        const category = heading.dataset.categoryHeading;
        const count = matchCounts.get(category) || 0;
        heading.classList.toggle("d-none", count === 0);
        setCategoryHeadingCount(heading, count);
      });
    };

    const getMobileStickyOffset = () => {
      const header = $(".app-header");
      return (header?.offsetHeight || 60) + 20;
    };

    const scrollToCategory = (category) => {
      const heading = $(`[data-category-heading="${category}"]`);
      const target = heading || items.find((item) => item.dataset.category === category);
      if (!target) return;

      const targetTop =
        target.getBoundingClientRect().top + window.scrollY - getMobileStickyOffset();

      window.scrollTo({
        top: Math.max(0, targetTop),
        behavior: prefersReduced ? "auto" : "smooth",
      });
    };

    const updateActiveCategoryFromScroll = () => {
      if (!mobileMenuQuery.matches || searchQuery) return;

      const offset = getMobileStickyOffset();
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
      const headings = $$("[data-category-heading]", menuGrid);
      let activeCategory = "";
      let activeItem = null;

      headings.forEach((heading) => {
        const rect = heading.getBoundingClientRect();
        if (rect.top <= offset + 32) {
          activeCategory = heading.dataset.categoryHeading;
        } else if (!activeCategory && rect.top < viewportHeight * 0.45) {
          activeCategory = heading.dataset.categoryHeading;
        }
      });

      for (const item of items) {
        const rect = item.getBoundingClientRect();
        if (rect.bottom > offset + 8 && rect.top < viewportHeight * 0.62) {
          activeItem = item;
          break;
        }
      }

      if (!activeItem) {
        activeItem = items.find((item) => item.getBoundingClientRect().top > offset);
      }

      activeCategory = activeCategory || activeItem?.dataset.category;
      const activeBtn = buttons.find(
        (btn) => btn.getAttribute("data-filter") === activeCategory,
      );

      if (activeBtn && !activeBtn.classList.contains("active")) {
        setActiveButton(activeBtn);
        centerActiveButton(activeBtn);
      }
    };

    const requestMobileActiveUpdate = () => {
      if (!mobileMenuQuery.matches || searchQuery || scrollTicking) return;
      scrollTicking = true;
      window.requestAnimationFrame(() => {
        updateActiveCategoryFromScroll();
        scrollTicking = false;
      });
    };

    const applyFilter = (selectedBtn) => {
      const filter = selectedBtn?.getAttribute("data-filter") || "all";
      setActiveButton(selectedBtn);
      resetCategoryHeadings();

      let delay = 0;
      items.forEach((item) => {
        const match = filter === "all" || item.dataset.category === filter;
        if (match) {
          showItem(item, delay);
          delay += 20;
        } else {
          hideItem(item);
        }
      });

      centerActiveButton(selectedBtn);
    };

    const applySearch = (value) => {
      searchQuery = normalizeText(value);
      const hasQuery = searchQuery.length > 0;
      const matchCounts = new Map();
      let delay = 0;
      let visibleCount = 0;

      menuSection?.classList.toggle("is-searching", hasQuery);

      if (!hasQuery) {
        if (searchEmpty) searchEmpty.hidden = true;
        resetCategoryHeadings();
        syncMenuMode();
        return;
      }

      items.forEach((item) => {
        const text = item.dataset.searchText || normalizeText(item.textContent);
        const match = text.includes(searchQuery);

        if (match) {
          const category = item.dataset.category || "";
          matchCounts.set(category, (matchCounts.get(category) || 0) + 1);
          showItem(item, delay);
          delay += 20;
          visibleCount += 1;
        } else {
          hideItem(item);
        }
      });

      updateCategoryHeadingsForSearch(matchCounts);
      if (searchEmpty) searchEmpty.hidden = visibleCount > 0;
    };

    const clearSearch = () => {
      if (searchInput) searchInput.value = "";
      searchQuery = "";
      menuSection?.classList.remove("is-searching");
      if (searchEmpty) searchEmpty.hidden = true;
      resetCategoryHeadings();
      syncMenuMode();
    };

    const syncMenuMode = () => {
      const activeBtn = buttons.find((btn) => btn.classList.contains("active")) || buttons[0];

      if (searchQuery) {
        applySearch(searchInput?.value || searchQuery);
        return;
      }

      if (mobileMenuQuery.matches) {
        showAllItems();
        resetCategoryHeadings();
        updateActiveCategoryFromScroll();
        return;
      }

      applyFilter(activeBtn);
    };

    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        if (mobileMenuQuery.matches) {
          if (searchQuery) {
            clearSearch();
          }
          setActiveButton(btn);
          centerActiveButton(btn);
          scrollToCategory(btn.getAttribute("data-filter"));
          return;
        }
        applyFilter(btn);
      });
    });

    searchBar?.addEventListener("submit", (event) => {
      event.preventDefault();
      const firstVisible = items.find((item) => !item.classList.contains("d-none"));
      if (!firstVisible) return;

      const targetTop =
        firstVisible.getBoundingClientRect().top +
        window.scrollY -
        getMobileStickyOffset();

      window.scrollTo({
        top: Math.max(0, targetTop),
        behavior: prefersReduced ? "auto" : "smooth",
      });
    });

    searchInput?.addEventListener("input", () => {
      applySearch(searchInput.value);
    });

    searchClear?.addEventListener("click", () => {
      clearSearch();
      searchInput?.focus();
    });

    decorateHighlightBadges();
    sortMenuItemsByCategory();
    buildCategoryHeadings();

    window.addEventListener("scroll", requestMobileActiveUpdate, { passive: true });
    window.addEventListener("resize", syncMenuMode);

    if (mobileMenuQuery.addEventListener) {
      mobileMenuQuery.addEventListener("change", syncMenuMode);
    }

    syncMenuMode();
  })();

  // -----------------------------
  // 4) Product Detail Sheet Engine (Flow 3)
  // -----------------------------
  (() => {
    const modal = document.getElementById("productDetailModal");
    if (!modal) return;

    const imgEl = document.getElementById("productDetailImg");
    const categoryEl = document.getElementById("productDetailCategory");
    const badgeEl = document.getElementById("productDetailBadge");
    const priceEl = document.getElementById("productDetailPrice");
    const titleEl = document.getElementById("productDetailTitle");
    const descEl = document.getElementById("productDetailDesc");
    const waBtn = document.getElementById("productDetailWaBtn");

    const categoryNames = {
      musttry: "Must Try",
      signature: "Signature Coffee",
      coffeemilk: "Coffee Milk",
      milkbased: "Milkbased",
      mocktail: "Mocktail",
      sparkling: "Sparkling Series",
      tea: "Tea Series",
      other: "Other Drinks",
      manual: "Manual Brew",
      snack: "Snacks",
      maincourse: "Main Course",
      pastry: "Pastry",
      pasta: "Pasta",
    };

    const openModal = (data) => {
      if (!data) return;

      if (imgEl) {
        imgEl.src = data.imgSrc || "assets/img/bg1.webp";
        imgEl.alt = data.title || "Product";
      }

      if (titleEl) titleEl.textContent = data.title || "";
      if (priceEl) priceEl.textContent = data.price || "";

      if (categoryEl) {
        const catLabel = categoryNames[data.category] || data.category || "Santiks";
        categoryEl.textContent = catLabel;
      }

      if (badgeEl) {
        if (data.badge) {
          badgeEl.textContent = data.badge;
          badgeEl.hidden = false;
        } else {
          badgeEl.hidden = true;
        }
      }

      if (descEl) {
        if (data.desc && data.desc.trim()) {
          descEl.textContent = data.desc.trim();
          descEl.hidden = false;
        } else {
          descEl.textContent = "Nikmati sajian spesial khas racikan Santiks Coffee & Calm.";
          descEl.hidden = false;
        }
      }

      if (waBtn) {
        const waText = encodeURIComponent(`Halo Santiks, saya ingin order ${data.title}`);
        waBtn.href = `https://wa.me/6285182332802?text=${waText}`;
        waBtn.setAttribute("aria-label", `Pesan ${data.title} melalui WhatsApp`);
      }

      modal.classList.add("is-open");
      modal.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    };

    const closeModal = () => {
      modal.classList.remove("is-open");
      modal.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    };

    // Attach click handler on food cards
    $$("[data-open-detail-card]").forEach((card) => {
      card.addEventListener("click", (e) => {
        // Avoid double trigger if clicking WhatsApp direct link
        if (e.target.closest("a[href^='https://wa.me']")) return;

        const menuItem = card.closest(".menu-item");
        const title = $("h3", card)?.textContent.trim() || "";
        const price = $(".menu-price, .promo-price", card)?.textContent.trim() || "";
        const desc = $(".food-desc, .promo-text", card)?.textContent.trim() || "";
        const imgSrc = $("img", card)?.src || "";
        const category = menuItem?.dataset.category || "musttry";
        const badge = $(".scroll-menu-badge, .promo-tag", card)?.textContent.trim() || "";

        openModal({ title, price, desc, imgSrc, category, badge });
      });
    });

    // Close listeners
    $$("[data-close-detail]", modal).forEach((btn) => {
      btn.addEventListener("click", closeModal);
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modal.classList.contains("is-open")) {
        closeModal();
      }
    });
  })();

  // -----------------------------
  // 5) Drag scroll for category tiles row
  // -----------------------------
  (() => {
    const scrollers = $$("[data-drag-scroll]");
    if (!scrollers.length) return;

    scrollers.forEach((scroller) => {
      let isDown = false;
      let startX = 0;
      let scrollLeft = 0;
      let moved = false;

      const onPointerDown = (e) => {
        if (e.pointerType === "mouse" && e.button !== 0) return;
        isDown = true;
        moved = false;
        startX = e.clientX;
        scrollLeft = scroller.scrollLeft;
        scroller.classList.add("dragging");

        document.addEventListener("pointermove", onPointerMove);
        document.addEventListener("pointerup", onPointerUp);
        document.addEventListener("pointercancel", onPointerUp);
      };

      const onPointerMove = (e) => {
        if (!isDown) return;
        const dx = e.clientX - startX;
        if (Math.abs(dx) > 6) {
          moved = true;
        }
        scroller.scrollLeft = scrollLeft - dx;
      };

      const onPointerUp = () => {
        isDown = false;
        scroller.classList.remove("dragging");
        document.removeEventListener("pointermove", onPointerMove);
        document.removeEventListener("pointerup", onPointerUp);
        document.removeEventListener("pointercancel", onPointerUp);
      };

      scroller.addEventListener("pointerdown", onPointerDown);

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
  // 6) Service worker registration
  // -----------------------------
  (() => {
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker
          .register("/sw.js")
          .catch((err) => console.error("ServiceWorker registration failed:", err));
      });
    }
  })();
})();
