// app.js (CLEAN - no duplicates with script.js)
(() => {
  "use strict";

  const prefersReduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  // AOS (optional)
  document.addEventListener("DOMContentLoaded", () => {
    if (window.AOS && typeof window.AOS.init === "function") {
      window.AOS.init({
        duration: 500,
        easing: "ease-out",
        once: true,
        offset: 80,
        disable: () => prefersReduced,
      });
    }
  });

  // Hero parallax (optional)
  (function heroParallax() {
    const hero = document.querySelector(".hero");
    if (!hero || prefersReduced) return;

    // Hindari bentrok dengan background-attachment: fixed
    // (opsional) kamu bisa matikan fixed lewat CSS jika parallax aktif
    // hero.style.backgroundAttachment = "scroll";

    const speedBg = 0.3;
    const speedFg = 0.12;
    const container = hero.querySelector(".container");

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        const rect = hero.getBoundingClientRect();
        const vh = window.innerHeight;
        const inView = rect.bottom > 0 && rect.top < vh;

        if (inView) {
          const scrollY = Math.min(Math.max(-rect.top, 0), rect.height);
          hero.style.backgroundPosition = `center calc(50% + ${scrollY * speedBg}px)`;
          if (container)
            container.style.transform = `translateY(${scrollY * speedFg}px)`;
        }

        ticking = false;
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
  })();

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
