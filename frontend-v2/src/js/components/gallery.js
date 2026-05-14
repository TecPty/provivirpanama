export function initGallery() {
  const track = document.getElementById('galleryTrack');
  const dotsContainer = document.getElementById('galleryDots');
  if (!track || !dotsContainer) return;

  const slides = track.querySelectorAll('.about__gallery-slide');
  let current = 0;
  let timer;

  const prevBtn = document.getElementById('galleryPrev');
  const nextBtn = document.getElementById('galleryNext');

  // Build dots
  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'about__gallery-dot' + (i === 0 ? ' is-active' : '');
    dot.setAttribute('aria-label', `Imagen ${i + 1}`);
    dot.addEventListener('click', () => goTo(i));
    dotsContainer.appendChild(dot);
  });

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      goTo((current - 1 + slides.length) % slides.length);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      next();
    });
  }

  function goTo(index) {
    current = index;
    track.style.transform = `translateX(-${current * 100}%)`;
    dotsContainer.querySelectorAll('.about__gallery-dot').forEach((d, i) => {
      d.classList.toggle('is-active', i === current);
    });
  }

  function next() {
    goTo((current + 1) % slides.length);
  }

  // Auto-play
  const startAuto = () => { timer = setInterval(next, 5000); }; // Increased to 5s for better reading
  const stopAuto = () => clearInterval(timer);

  startAuto();
  track.closest('.about__gallery')?.addEventListener('mouseenter', stopAuto);
  track.closest('.about__gallery')?.addEventListener('mouseleave', startAuto);
}
