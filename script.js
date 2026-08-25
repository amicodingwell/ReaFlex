const header = document.querySelector(".site-header");
const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".site-nav");
const navLinks = document.querySelectorAll(".site-nav a");
const year = document.querySelector("#year");
const revealItems = document.querySelectorAll(".reveal");

if (year) {
  year.textContent = new Date().getFullYear();
}

const updateHeader = () => {
  header?.classList.toggle("scrolled", window.scrollY > 12);
};

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

const closeMenu = () => {
  if (!menuToggle || !nav) return;
  menuToggle.setAttribute("aria-expanded", "false");
  nav.classList.remove("open");
  document.body.classList.remove("menu-open");
};

menuToggle?.addEventListener("click", () => {
  if (!nav) return;

  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  nav.classList.toggle("open", !isOpen);
  document.body.classList.toggle("menu-open", !isOpen);
});

navLinks.forEach((link) => {
  link.addEventListener("click", closeMenu);
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 780) {
    closeMenu();
  }
});

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!reducedMotion && "IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -40px 0px",
    }
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("visible"));
}

/*
 * Screenshot lightbox
 *
 * The starter cards use placeholder graphics by default. Once you add real
 * screenshot files using the filenames in index.html, clicking them will open
 * those images in this lightbox.
 */
const lightbox = document.querySelector(".lightbox");
const lightboxImage = lightbox?.querySelector("img");
const lightboxCaption = lightbox?.querySelector("p");
const lightboxClose = lightbox?.querySelector(".lightbox-close");

const closeLightbox = () => {
  if (!lightbox) return;
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
};

document.querySelectorAll("[data-lightbox]").forEach((button) => {
  button.addEventListener("click", () => {
    const src = button.dataset.lightbox;
    const caption = button.dataset.caption || "";

    if (!src || !lightbox || !lightboxImage || !lightboxCaption) return;

    /*
     * If the image doesn't exist yet, don't open a broken-image modal.
     * Instead alert the site editor to the expected path.
     */
    const tester = new Image();

    tester.onload = () => {
      lightboxImage.src = src;
      lightboxImage.alt = caption;
      lightboxCaption.textContent = caption;
      lightbox.classList.add("open");
      lightbox.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    };

    tester.onerror = () => {
      window.alert(
        `Screenshot placeholder:\n\nAdd your image at:\n${src}\n\nThen this card will open it in the lightbox.`
      );
    };

    tester.src = src;
  });
});

lightboxClose?.addEventListener("click", closeLightbox);

lightbox?.addEventListener("click", (event) => {
  if (event.target === lightbox) {
    closeLightbox();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMenu();
    closeLightbox();
  }
});

document.querySelector("[data-demo-placeholder]")?.addEventListener("click", () => {
  window.alert(
    "Demo placeholder\n\nAdd assets/video/demo.mp4 or paste a YouTube embed into the Demo section of index.html."
  );
});
