(function () {
  document.body.classList.add("js-enabled");

  var navToggle = document.querySelector("[data-nav-toggle]");
  var siteNav = document.getElementById("site-nav");
  var quickExit = document.getElementById("quick-exit");
  var year = document.getElementById("year");
  var prefersReducedMotion =
    window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var revealTargets = document.querySelectorAll(
    ".hero__content, .hero__media, .section, .path-card, .topic-card, .resource-card, .impact-card, .team-card, .gallery-card, .privacy-panel, .podcast-feature__card, .trust-story__figure, .podcast-feature__image"
  );
  var lastEscapeAt = 0;

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  revealTargets.forEach(function (element, index) {
    element.classList.add("reveal");
    element.style.setProperty("--reveal-delay", String((index % 6) * 55) + "ms");
  });

  if (!prefersReducedMotion) {
    document.body.classList.add("motion-enabled");
  }

  if (navToggle && siteNav) {
    navToggle.addEventListener("click", function () {
      var isOpen = siteNav.getAttribute("data-open") === "true";
      siteNav.setAttribute("data-open", String(!isOpen));
      navToggle.setAttribute("aria-expanded", String(!isOpen));
    });

    siteNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        siteNav.setAttribute("data-open", "false");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  function leaveSite() {
    window.location.replace("https://www.google.com/");
  }

  if (quickExit) {
    quickExit.addEventListener("click", leaveSite);
  }

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    revealTargets.forEach(function (element) {
      element.classList.add("is-visible");
    });
  } else {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        });
      },
      {
        threshold: 0.16,
        rootMargin: "0px 0px -8% 0px"
      }
    );

    revealTargets.forEach(function (element) {
      revealObserver.observe(element);
    });
  }

  window.addEventListener("keydown", function (event) {
    if (event.key !== "Escape") {
      return;
    }

    var now = Date.now();
    if (now - lastEscapeAt < 900) {
      leaveSite();
    }
    lastEscapeAt = now;
  });
})();
