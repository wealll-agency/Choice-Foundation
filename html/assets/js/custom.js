document.addEventListener("DOMContentLoaded", function () {
  // ==========================================
  // Initialize Swiper
  // ==========================================
  const heroSwiper = new Swiper(".heroSwiper", {
    speed: 1200,
    parallax: true,
    effect: "fade",
    fadeEffect: {
      crossFade: true,
    },
    loop: true,
    autoplay: {
      delay: 6000,
      disableOnInteraction: false,
    },
    navigation: {
      nextEl: "#heroNext",
      prevEl: "#heroPrev",
    },
    on: {
      init: function () {
        updateProgress(this);
      },
      autoplayTimeLeft(s, time, progress) {
        const progressBar = document.getElementById("heroProgressBar");
        if (progressBar) {
          progressBar.style.width = (1 - progress) * 100 + "%";
        }
      },
      slideChange: function () {
        updateProgress(this);
      },
    },
  });

  function updateProgress(swiper) {
    const currentNum = document.getElementById("heroCurrentNum");
    if (currentNum) {
      // realIndex is 0-based
      let realIndex = swiper.realIndex + 1;
      currentNum.innerHTML = `<div class="dot"></div> 0${realIndex}`;
    }
  }

  // ==========================================
  // Search Overlay Logic
  // ==========================================
  const searchBtn = document.getElementById("searchBtn");
  const searchOverlay = document.getElementById("searchOverlay");
  const searchCloseBtn = document.getElementById("searchCloseBtn");
  const searchInput = document.querySelector(".search-input");

  if (searchBtn && searchOverlay && searchCloseBtn) {
    searchBtn.addEventListener("click", function (e) {
      e.preventDefault();
      searchOverlay.classList.add("active");
      setTimeout(() => {
        if (searchInput) searchInput.focus();
      }, 300);
    });

    searchCloseBtn.addEventListener("click", function (e) {
      e.preventDefault();
      searchOverlay.classList.remove("active");
    });

    // Close on ESC key
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && searchOverlay.classList.contains("active")) {
        searchOverlay.classList.remove("active");
      }
    });
  }

  // ==========================================
  // Mobile Menu Logic
  // ==========================================
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
  const mobileMenuOverlay = document.getElementById("mobileMenuOverlay");
  const mobileMenuClose = document.getElementById("mobileMenuClose");

  if (mobileMenuBtn && mobileMenuOverlay && mobileMenuClose) {
    mobileMenuBtn.addEventListener("click", (e) => {
      e.preventDefault();
      mobileMenuOverlay.classList.add("active");
      document.body.style.overflow = "hidden"; // Prevent scrolling
    });

    mobileMenuClose.addEventListener("click", (e) => {
      e.preventDefault();
      mobileMenuOverlay.classList.remove("active");
      document.body.style.overflow = "";
    });
  }

  // ==========================================
  // Event Countdown Logic
  // ==========================================
  // Target date: 26 October 2026
  const countDownDate = new Date("Oct 26, 2026 00:00:00").getTime();

  const countdownInterval = setInterval(function () {
    const now = new Date().getTime();
    const distance = countDownDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    const daysEl = document.getElementById("cd-days");
    const hoursEl = document.getElementById("cd-hours");
    const minutesEl = document.getElementById("cd-minutes");
    const secondsEl = document.getElementById("cd-seconds");

    if (daysEl && hoursEl && minutesEl && secondsEl) {
      daysEl.innerHTML = days < 10 ? "0" + days : days;
      hoursEl.innerHTML = hours < 10 ? "0" + hours : hours;
      minutesEl.innerHTML = minutes < 10 ? "0" + minutes : minutes;
      secondsEl.innerHTML = seconds < 10 ? "0" + seconds : seconds;
    }

    if (distance < 0) {
      clearInterval(countdownInterval);
      if (daysEl) {
        daysEl.innerHTML = "00";
        hoursEl.innerHTML = "00";
        minutesEl.innerHTML = "00";
        secondsEl.innerHTML = "00";
      }
    }
  }, 1000);

  // ==========================================
  // Gallery Filtering Logic (Classic)
  // ==========================================
  const filterBtns = document.querySelectorAll(".filter-btn");
  const galleryItems = document.querySelectorAll(".gallery-item");

  if (filterBtns.length > 0 && galleryItems.length > 0) {
    filterBtns.forEach((btn) => {
      btn.addEventListener("click", function () {
        filterBtns.forEach((b) => b.classList.remove("active"));
        this.classList.add("active");

        const filterValue = this.getAttribute("data-filter");

        galleryItems.forEach((item) => {
          if (
            filterValue === "*" ||
            item.classList.contains(filterValue.substring(1)) ||
            item.classList.contains("gallery-link-box")
          ) {
            item.classList.remove("hidden");
            item.style.opacity = "0";
            setTimeout(() => {
              item.style.opacity = "1";
            }, 50);
          } else {
            item.classList.add("hidden");
            item.style.opacity = "0";
          }
        });
      });
    });
  }

  // ==========================================
  // Custom CSS Grid Filtering & GLightbox
  // ==========================================
  const galleryGrid =
    document.querySelector(".pure-css-gallery-grid") ||
    document.querySelector("#galleryGrid");
  if (galleryGrid) {
    const filterButtons = document.querySelectorAll(".gallery-filter-btn");
    const gridItems = document.querySelectorAll(".pure-css-gallery-item");

    filterButtons.forEach((button) => {
      button.addEventListener("click", function () {
        filterButtons.forEach((btn) => btn.classList.remove("active"));
        this.classList.add("active");

        const filterValue = this.getAttribute("data-filter").replace(".", "");

        gridItems.forEach((item) => {
          item.style.transition = "all 0.4s ease";

          if (filterValue === "*" || item.classList.contains(filterValue)) {
            item.style.display = "block";
            void item.offsetWidth;
            item.style.transform = "scale(1)";
            item.style.opacity = "1";
          } else {
            item.style.transform = "scale(0.8)";
            item.style.opacity = "0";
            setTimeout(() => {
              if (!item.classList.contains("active-filter")) {
                item.style.display = "none";
              }
            }, 400);
          }
        });
      });
    });

    // Initialize GLightbox
    const lightbox = GLightbox({
      selector: ".glightbox",
      touchNavigation: true,
      loop: true,
      autoplayVideos: true,
    });
  }
});
