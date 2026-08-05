/*====================================================
                ECOSISTEMA SLIDER
            ====================================================*/

document.addEventListener("DOMContentLoaded", () => {
  const track = document.getElementById("ecosistemaTrack");

  const cards = document.querySelectorAll(".ecosistema-card");

  const prev = document.getElementById("prevSlide");

  const next = document.getElementById("nextSlide");

  const pagination = document.getElementById("ecosistemaPagination");

  let currentIndex = 0;

  let cardsPerView = getCardsPerView();

  let maxIndex = cards.length - cardsPerView;

  let autoplay;

  /*==================================*/

  function getCardsPerView() {
    if (window.innerWidth <= 768) {
      return 1;
    }

    if (window.innerWidth <= 1200) {
      return 2;
    }

    return 3;
  }

  /*==================================*/

  function renderDots() {
    pagination.innerHTML = "";

    maxIndex = cards.length - cardsPerView;

    for (let i = 0; i <= maxIndex; i++) {
      const dot = document.createElement("span");

      if (i === currentIndex) {
        dot.classList.add("active");
      }

      dot.addEventListener("click", () => {
        currentIndex = i;

        updateSlider();
      });

      pagination.appendChild(dot);
    }
  }

  /*==================================*/

  function updateSlider() {
    cardsPerView = getCardsPerView();

    maxIndex = cards.length - cardsPerView;

    if (currentIndex > maxIndex) {
      currentIndex = maxIndex;
    }

    if (currentIndex < 0) {
      currentIndex = 0;
    }

    const cardWidth = cards[0].offsetWidth;

    const gap = parseFloat(getComputedStyle(track).gap);

    const move = currentIndex * (cardWidth + gap);

    track.style.transform = `translateX(-${move}px)`;

    const dots = pagination.querySelectorAll("span");

    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === currentIndex);
    });
  }

  /*==================================*/

  next.addEventListener("click", () => {
    currentIndex++;

    if (currentIndex > maxIndex) {
      currentIndex = 0;
    }

    updateSlider();
  });

  prev.addEventListener("click", () => {
    currentIndex--;

    if (currentIndex < 0) {
      currentIndex = maxIndex;
    }

    updateSlider();
  });

  /*==================================
                        AUTOPLAY
                ==================================*/

  function startAutoplay() {
    autoplay = setInterval(() => {
      currentIndex++;

      if (currentIndex > maxIndex) {
        currentIndex = 0;
      }

      updateSlider();
    }, 5000);
  }

  function stopAutoplay() {
    clearInterval(autoplay);
  }

  track.addEventListener("mouseenter", stopAutoplay);

  track.addEventListener("mouseleave", startAutoplay);

  /*==================================
                        TOUCH
                ==================================*/

  let startX = 0;

  let endX = 0;

  track.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
  });

  track.addEventListener("touchend", (e) => {
    endX = e.changedTouches[0].clientX;

    const diff = startX - endX;

    if (diff > 50) {
      currentIndex++;
    }

    if (diff < -50) {
      currentIndex--;
    }

    if (currentIndex < 0) {
      currentIndex = maxIndex;
    }

    if (currentIndex > maxIndex) {
      currentIndex = 0;
    }

    updateSlider();
  });

  /*==================================
                        RESIZE
                ==================================*/

  window.addEventListener("resize", () => {
    cardsPerView = getCardsPerView();

    renderDots();

    updateSlider();
  });

  /*==================================*/

  renderDots();

  updateSlider();

  startAutoplay();
});
