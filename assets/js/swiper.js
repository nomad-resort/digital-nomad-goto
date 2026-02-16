const gallerySwiper = new Swiper(".gallerySwiper", {
  slidesPerView: "auto",
  loop: true,
  centeredSlides: true,
  speed: 800,
  pagination: {
    el: ".gallerySwiper .swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".gallerySwiper .swiper-button-next",
    prevEl: ".gallerySwiper .swiper-button-prev",
  },
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
});

const voicesSwiper = new Swiper(".voicesSwiper", {
  slidesPerView: "auto",
  centeredSlides: true,
  spaceBetween: 16,
  speed: 600,
  pagination: {
    el: ".voicesSwiper .swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".voicesSwiper .swiper-button-next",
    prevEl: ".voicesSwiper .swiper-button-prev",
  },
});

// Set bl_voicesList height to smallest iframe
function setVoicesListHeight() {
  const voicesList = document.querySelector(".bl_voicesList");
  if (!voicesList) return;

  const iframes = voicesList.querySelectorAll("iframe");
  if (iframes.length === 0) return;

  const heights = Array.from(iframes).map((iframe) => iframe.offsetHeight);
  const minHeight = Math.min(...heights);

  if (minHeight > 0) {
    voicesList.querySelectorAll(":scope > *").forEach((item) => {
      item.style.height = `${minHeight}px`;
      item.style.overflowY = "auto";
    });
  }
}

// Add titles to Instagram iframes for accessibility
function setInstagramIframeTitles() {
  const iframes = document.querySelectorAll('iframe[id^="instagram-embed"]');
  iframes.forEach((iframe, index) => {
    iframe.title = `Instagram post ${index + 1}`;
  });
}

// Wait for Instagram embeds to load
window.addEventListener("load", () => {
  setTimeout(() => {
    setVoicesListHeight();
    setInstagramIframeTitles();
  }, 2000);
});
