(function () {
  const navBtn = document.getElementById("nav-toggle");
  const navbar = document.querySelector(".container");
  if (!navBtn || !navbar) return;

  function closeNav() {
    navbar.classList.remove("nav-open");
    navBtn.setAttribute("aria-expanded", "false");
  }

  navBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    const isOpen = navbar.classList.toggle("nav-open");
    navBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  // Close when any link in the drawer is clicked
  navbar.querySelectorAll(".nav-drawer a, .content a").forEach((link) => {
    link.addEventListener("click", closeNav);
  });

  // Close on outside click
  document.addEventListener("click", (e) => {
    if (!navbar.contains(e.target)) closeNav();
  });
})();
