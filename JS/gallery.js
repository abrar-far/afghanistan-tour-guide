const galleryItems = Array.from(
  document.querySelectorAll("#galleryGrid .gwrap"),
);
const lightbox = document.getElementById("lightbox");

if (galleryItems.length > 0 && lightbox instanceof HTMLDialogElement) {
  const lightboxImage = document.getElementById("lightboxImage");
  const lightboxCaption = document.getElementById("lightboxCaption");
  const closeButton = document.getElementById("lightboxClose");
  const previousButton = document.getElementById("lightboxPrevious");
  const nextButton = document.getElementById("lightboxNext");
  let currentImageIndex = 0;

  function showImage(index) {
    currentImageIndex = (index + galleryItems.length) % galleryItems.length;
    const selectedItem = galleryItems[currentImageIndex];
    const selectedImage = selectedItem.querySelector("img");

    lightboxImage.src = selectedImage.src;
    lightboxImage.alt = selectedImage.alt;
    lightboxCaption.textContent = selectedItem.dataset.caption;
  }

  function openLightbox(index) {
    showImage(index);
    lightbox.showModal();
  }

  function closeLightbox() {
    if (lightbox.open) {
      lightbox.close();
    }
  }

  galleryItems.forEach((item, index) => {
    item.addEventListener("click", () => openLightbox(index));
  });

  closeButton.addEventListener("click", closeLightbox);
  previousButton.addEventListener("click", () =>
    showImage(currentImageIndex - 1),
  );
  nextButton.addEventListener("click", () => showImage(currentImageIndex + 1));

  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });

  lightbox.addEventListener("cancel", (event) => {
    event.preventDefault();
    closeLightbox();
  });

  lightbox.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
      showImage(currentImageIndex + 1);
    } else if (event.key === "ArrowRight") {
      showImage(currentImageIndex - 1);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && lightbox.open) {
      closeLightbox();
    }
  });
}
