document.addEventListener('DOMContentLoaded', () => {
  const track = document.querySelector('.reviews-track');
  const prevBtn = document.querySelector('.carousel-btn.prev');
  const nextBtn = document.querySelector('.carousel-btn.next');
  
  if (!track || !prevBtn || !nextBtn) return;

  let currentIndex = 0;
  const slides = document.querySelectorAll('.Reviews_box');
  const totalSlides = slides.length;

  function updateCarousel() {
    // Двигаем ленту влево на ширину одного слайда * индекс
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    
    // Управление состоянием кнопок (опционально)
    prevBtn.style.opacity = currentIndex === 0 ? '0.5' : '1';
    nextBtn.style.opacity = currentIndex === totalSlides - 1 ? '0.5' : '1';
  }

  nextBtn.addEventListener('click', () => {
    if (currentIndex < totalSlides - 1) {
      currentIndex++;
    } else {
      currentIndex = 0; // Зацикливание: после последнего возвращаемся к первому
    }
    updateCarousel();
  });

  prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--;
    } else {
      currentIndex = totalSlides - 1; // Зацикливание: перед первым переходим к последнему
    }
    updateCarousel();
  });

  // Поддержка свайпов на мобильных устройствах
  let touchStartX = 0;
  let touchEndX = 0;
  const viewport = document.querySelector('.carousel-viewport');

  viewport.addEventListener('touchstart', e => touchStartX = e.changedTouches[0].screenX);
  viewport.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  });

  function handleSwipe() {
    const threshold = 50; // Минимальная дистанция свайпа
    if (touchStartX - touchEndX > threshold) {
      nextBtn.click(); // Свайп влево -> следующий
    } else if (touchEndX - touchStartX > threshold) {
      prevBtn.click(); // Свайп вправо -> предыдущий
    }
  }
});