const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".site-nav");
const year = document.querySelector("#year");

if (year) {
  year.textContent = new Date().getFullYear();
}

menuButton?.addEventListener("click", () => {
  const open = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!open));
  nav?.classList.toggle("open", !open);
});

nav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menuButton?.setAttribute("aria-expanded", "false");
    nav?.classList.remove("open");
  });
});

document.querySelectorAll("img[data-fallback]").forEach((img) => {
  const showFallback = () => {
    img.dataset.missing = "true";
    const fallback = img.nextElementSibling;
    fallback?.classList.add("visible");
  };

  if (img.complete && img.naturalWidth === 0) {
    showFallback();
  } else {
    img.addEventListener("error", showFallback, { once: true });
  }
});

const lightbox = document.querySelector("#image-lightbox");
const lightboxImage = lightbox?.querySelector("img");
const lightboxCaption = document.querySelector("#lightbox-caption");
const lightboxClose = lightbox?.querySelector(".lightbox-close");

const openLightbox = (img) => {
  if (!lightbox || !lightboxImage || img.dataset.missing === "true") {
    return;
  }

  lightboxImage.src = img.currentSrc || img.src;
  lightboxImage.alt = img.alt;
  if (lightboxCaption) {
    lightboxCaption.textContent = img.alt || "installation screenshot";
  }

  if (typeof lightbox.showModal === "function") {
    lightbox.showModal();
  } else {
    lightbox.setAttribute("open", "");
  }
};

document.querySelectorAll(".install-shot img[data-enlarge]").forEach((img) => {
  img.addEventListener("click", () => openLightbox(img));
  img.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openLightbox(img);
    }
  });
});

lightboxClose?.addEventListener("click", () => {
  lightbox?.close();
});

lightbox?.addEventListener("click", (event) => {
  const rect = lightbox.getBoundingClientRect();
  const outside =
    event.clientX < rect.left ||
    event.clientX > rect.right ||
    event.clientY < rect.top ||
    event.clientY > rect.bottom;

  if (outside) {
    lightbox.close();
  }
});
