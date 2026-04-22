// app.js (CLEAN - no duplicates with script.js)
(() => {
  "use strict";

  const prefersReduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  // AOS dimatikan untuk mengurangi jank saat scroll.
  document.addEventListener("DOMContentLoaded", () => {
    window.requestAnimationFrame(() => {
      document.body.classList.add("page-ready");
    });

    if (window.AOS && typeof window.AOS.init === "function") {
      window.AOS.init({
        duration: prefersReduced ? 0 : 550,
        easing: "ease-out-cubic",
        once: true,
        offset: 48,
        disable: prefersReduced,
      });
    } else {
      document.querySelectorAll("[data-aos]").forEach((el) => {
        el.removeAttribute("data-aos");
        el.removeAttribute("data-aos-delay");
      });
    }

    if (window.AOS && typeof window.AOS.refreshHard === "function") {
      window.AOS.refreshHard();
    }
  });

  // Button pulse (optional)
  (function buttonPulse() {
    document.addEventListener("click", (e) => {
      const btn = e.target.closest(".btn");
      if (!btn || prefersReduced) return;

      // Web Animations API tersedia di browser modern
      if (typeof btn.animate !== "function") return;

      btn.animate(
        [
          { transform: "scale(1)" },
          { transform: "scale(0.96)" },
          { transform: "scale(1)" },
        ],
        { duration: 160, easing: "ease-out" },
      );
    });
  })();
})();
