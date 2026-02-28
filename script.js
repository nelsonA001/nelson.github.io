/* ═══════════════════════════════════════════════════════════════
   NAVBAR – mobile toggle
═══════════════════════════════════════════════════════════════ */
(function () {
  const navBtn = document.getElementById("nav-toggle");
  const navbar = document.querySelector(".container");
  if (!navBtn || !navbar) return;

  navBtn.addEventListener("click", () => {
    const isOpen = navbar.classList.toggle("nav-open");
    navBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  // Close nav when a link is clicked on mobile
  navbar.querySelectorAll(".content a").forEach((link) => {
    link.addEventListener("click", () => {
      navbar.classList.remove("nav-open");
      navBtn.setAttribute("aria-expanded", "false");
    });
  });
})();

/* ═══════════════════════════════════════════════════════════════
   FAQ – accordion toggle
═══════════════════════════════════════════════════════════════ */
document.addEventListener("DOMContentLoaded", () => {
  const triggers = document.querySelectorAll(".faq-trigger");

  triggers.forEach((btn) => {
    btn.addEventListener("click", () => {
      const item = btn.closest(".faq-item");
      if (!item) return;

      const isOpen = item.classList.contains("open");

      // Close all open items first (accordion behaviour)
      document.querySelectorAll(".faq-item.open").forEach((el) => {
        el.classList.remove("open");
        el.querySelector(".faq-trigger").setAttribute("aria-expanded", "false");
      });

      // If this one was closed, open it now
      if (!isOpen) {
        item.classList.add("open");
        btn.setAttribute("aria-expanded", "true");
      }
    });

    // Keyboard support
    btn.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        btn.click();
      }
    });
  });
});

/* ═══════════════════════════════════════════════════════════════
   LOGO CAROUSEL – seamless infinite scroll
═══════════════════════════════════════════════════════════════ */
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".company-logos").forEach((container) => {
    if (container.querySelector(".company-logos-track")) return;

    const imgs = Array.from(container.querySelectorAll("img"));
    if (!imgs.length) return;

    const track = document.createElement("div");
    track.className = "company-logos-track";
    imgs.forEach((img) => track.appendChild(img));
    container.appendChild(track);

    // Duplicate for seamless loop
    imgs.forEach((img) => {
      const clone = img.cloneNode(true);
      clone.setAttribute("aria-hidden", "true");
      track.appendChild(clone);
    });

    const updateDuration = () => {
      const seqWidth = track.scrollWidth / 2 || 1;
      const visible = container.clientWidth || seqWidth;
      const duration = Math.max(8, (seqWidth / visible) * 22);
      track.style.animationDuration = duration + "s";
    };
    updateDuration();
    window.addEventListener("resize", updateDuration);
  });
});

/* ═══════════════════════════════════════════════════════════════
   SCROLL FADE-IN – IntersectionObserver
═══════════════════════════════════════════════════════════════ */
document.addEventListener("DOMContentLoaded", () => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("fade-in-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08, rootMargin: "0px 0px -40px 0px" },
  );

  document
    .querySelectorAll(
      "section, .card, .case-card, .faq-item, .feature-text, .feature-image, .contact-info, .contact-form-wrap",
    )
    .forEach((el) => {
      el.classList.add("fade-in");
      observer.observe(el);
    });
});
