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
  // 2) Smooth scroll for internal anchors only
  //    - Works with fixed navbar offset
  // -----------------------------
  (() => {
    const navbar = document.querySelector(".navbar");
    const navMain = document.getElementById("navMain");
    const getOffset = () => (navbar ? navbar.offsetHeight : 0);
    const closeMobileNav = () => {
      if (!navMain || !navMain.classList.contains("show")) return;

      if (window.bootstrap?.Collapse) {
        window.bootstrap.Collapse.getOrCreateInstance(navMain).hide();
        return;
      }

      navMain.classList.remove("show");
    };

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
        window.scrollTo({
          top,
          behavior: prefersReduced ? "auto" : "smooth",
        });
        closeMobileNav();

        // Update URL hash (tanpa reload)
        history.pushState(null, "", href);
      });
    });
  })();

  // -----------------------------
  // 3) Navbar scrolled state
  // -----------------------------
  (() => {
    const nav = document.querySelector(".navbar");
    if (!nav) return;
    let isScrolled = false;
    let ticking = false;

    const applyState = () => {
      const nextScrolled = window.scrollY > 10;
      if (nextScrolled !== isScrolled) {
        nav.classList.toggle("scrolled", nextScrolled);
        isScrolled = nextScrolled;
      }
      ticking = false;
    };

    const toggle = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(applyState);
    };

    applyState();
    window.addEventListener("scroll", toggle, { passive: true });
  })();

  // -----------------------------
  // 4) Animate items on view (IntersectionObserver)
  // -----------------------------
  (() => {
    const els = $$(".animate-item");
    if (!els.length) return;
    els.forEach((el) => el.classList.add("show"));
  })();

  // -----------------------------
  // 5) Active nav link based on visible section
  // -----------------------------
  (() => {
    const sections = $$("section[id], header[id], #highlight");
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
  // 6) Filter menu grid (sliding pill and staggered entrance)
  // -----------------------------
  (() => {
    const menuGrid = document.getElementById("menuGrid");
    const menuSection = document.getElementById("menu");
    const filterPills = document.getElementById("filterPills");
    const buttons = $$("#filterPills [data-filter]");
    const items = $$("#menuGrid .menu-item");
    if (!buttons.length || !items.length) return;

    const searchToggle = document.getElementById("menuSearchToggle");
    const searchBar = document.getElementById("menuSearchBar");
    const searchInput = document.getElementById("menuSearchInput");
    const searchClear = document.getElementById("menuSearchClear");
    const searchEmpty = document.getElementById("menuSearchEmpty");
    const mobileMenuQuery = window.matchMedia("(max-width: 767.98px)");
    const hideTimers = new WeakMap();
    const normalizeText = (value) => value.toLowerCase().trim();
    let searchQuery = "";
    let scrollTicking = false;

    const categoryOrder = new Map(
      buttons.map((btn, index) => [btn.getAttribute("data-filter"), index]),
    );
    const highlightBadges = new Map([
      ["Butterscotch", {
        icon: "bi-award-fill",
        label: "Best Seller",
        type: "best-seller",
      }],
      ["Mix Platter", {
        icon: "bi-hand-thumbs-up-fill",
        label: "Top Ordered",
        type: "top-ordered",
      }],
      ["Caramelo", {
        icon: "bi-star-fill",
        label: "Most Popular",
        type: "most-popular",
      }],
      ["Red Velvet", {
        icon: "bi-star-fill",
        label: "Most Popular",
        type: "most-popular",
      }],
      ["Chicken Katsu Sambal Matah", {
        icon: "bi-star-fill",
        label: "Most Popular",
        type: "most-popular",
      }],
      ["Matcha", {
        icon: "bi-star-fill",
        label: "Most Popular",
        type: "most-popular",
      }],
      ["Palm Sugar (Aren)", {
        icon: "bi-star-fill",
        label: "Most Popular",
        type: "most-popular",
      }],
      ["Americano", {
        icon: "bi-star-fill",
        label: "Most Popular",
        type: "most-popular",
      }],
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

        const titleRow = $(".card-body .d-flex.align-items-start", item);
        if (!titleRow) return;

        const badgeEl = document.createElement("span");
        badgeEl.className = `scroll-menu-badge scroll-menu-badge-${badge.type}`;

        const iconEl = document.createElement("i");
        iconEl.className = `bi ${badge.icon}`;
        iconEl.setAttribute("aria-hidden", "true");

        const textEl = document.createElement("span");
        textEl.textContent = badge.label;

        badgeEl.append(iconEl, textEl);
        titleRow.before(badgeEl);
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

        const categoryItems = items.filter(
          (item) => item.dataset.category === category,
        );
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

      // Ensure layout contains the element
      el.classList.remove("d-none");

      // Stagger animation
      const timer = window.setTimeout(() => {
        void el.offsetWidth; // force layout recalculation
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
      }, 400); // Match CSS transition duration
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
      const topbar = $(".mobile-menu-topbar");
      const pillsWrapper = $(".filter-pills-wrapper");
      const activeSearchBar = searchBar?.classList.contains("is-open")
        ? searchBar
        : null;
      const topbarHeight = topbar?.offsetParent ? topbar.offsetHeight : 0;
      const pillsHeight = pillsWrapper?.offsetParent ? pillsWrapper.offsetHeight : 0;
      const searchHeight = activeSearchBar?.offsetParent
        ? activeSearchBar.offsetHeight + 10
        : 0;

      return topbarHeight + searchHeight + pillsHeight + 18;
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

        if (rect.top <= offset + 28) {
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
          delay += 40; // 40ms stagger increment
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
        searchEmpty.hidden = true;
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
          delay += 32;
          visibleCount += 1;
        } else {
          hideItem(item);
        }
      });

      updateCategoryHeadingsForSearch(matchCounts);
      searchEmpty.hidden = visibleCount > 0;
    };

    const clearSearch = ({ keepOpen = true } = {}) => {
      if (searchInput) searchInput.value = "";
      searchQuery = "";
      menuSection?.classList.remove("is-searching");
      searchEmpty.hidden = true;
      resetCategoryHeadings();

      if (!keepOpen) {
        searchBar?.classList.remove("is-open");
        searchToggle?.classList.remove("is-active");
        searchToggle?.setAttribute("aria-expanded", "false");
      }

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
            clearSearch({ keepOpen: false });
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

    searchToggle?.addEventListener("click", () => {
      const isOpen = searchBar?.classList.toggle("is-open");

      searchToggle.classList.toggle("is-active", Boolean(isOpen));
      searchToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");

      if (isOpen) {
        window.setTimeout(() => searchInput?.focus(), 80);
        return;
      }

      clearSearch({ keepOpen: false });
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
  // 7) Drag scroll horizontal rows
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
        if (Math.abs(dx) > 8) {
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

      // Prevent click after dragging, but allow regular clicking
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
  // 8) Service worker + orientation refresh
  // -----------------------------
  (() => {
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker
          .register("/sw.js")
          .catch((err) => console.error("SW gagal:", err));
      });
    }

    window.addEventListener("orientationchange", () => {
      window.setTimeout(() => window.dispatchEvent(new Event("resize")), 200);
    });
  })();
})();
