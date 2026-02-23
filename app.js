// app.js
document.addEventListener("DOMContentLoaded", () => {
  if (window.AOS && typeof AOS.init === "function") {
    AOS.init({
      duration: 500, // 0.5 detik durasi animasi
      easing: "ease-out",
      once: true, // Animasi hanya berjalan satu kali saat scroll
      offset: 80,
      disable: () =>
        window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    });
  }
});
(function navbarScroll() {
  const nav = document.querySelector(".navbar");
  if (!nav) return;
  const toggle = () => {
    if (window.scrollY > 10) nav.classList.add("scrolled");
    else nav.classList.remove("scrolled");
  };
  toggle();
  window.addEventListener("scroll", toggle, { passive: true });
})();

(function heroParallax() {
  const hero = document.querySelector(".hero");
  if (!hero) return;
  const prefersReduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  if (prefersReduced) return;
  const speedBg = 0.3; // Kecepatan gerak latar belakang
  const speedFg = 0.12; // Kecepatan gerak konten (container)
  const container = hero.querySelector(".container");
  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const rect = hero.getBoundingClientRect();
      const vh = window.innerHeight;
      // Hanya jalankan jika elemen hero sedang terlihat di layar
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

(function buttonPulse() {
  document.addEventListener("click", (e) => {
    const btn = e.target.closest(
      ".btn, .btn-brand, .btn-platform, .btn-feedback",
    );
    if (!btn) return;
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

(function smoothScroll() {
  if ("scrollBehavior" in document.documentElement.style) return;
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");
      if (!href || href === "#") return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      const offsetTop =
        target.getBoundingClientRect().top + window.scrollY - 64;
      window.scrollTo({ top: offsetTop, behavior: "smooth" });
    });
  });
})();
