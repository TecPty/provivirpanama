export function initProject() {
  const tabs = document.querySelectorAll('.models__tab');
  const models = document.querySelectorAll('.model-detail');

  if (!tabs.length || !models.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const modelId = tab.getAttribute('data-model');

      // Update tabs
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      // Update models
      models.forEach(m => {
        m.classList.remove('active');
        if (m.id === `model-${modelId}`) {
          m.classList.add('active');
        }
      });
    });
  });

  // Carousel logic — one instance per model
  models.forEach(model => {
    const slides = Array.from(model.querySelectorAll('.gallery-slide'));
    const dots   = Array.from(model.querySelectorAll('.gallery-dot'));
    const prevBtn = model.querySelector('.gallery-btn.prev');
    const nextBtn = model.querySelector('.gallery-btn.next');

    if (!slides.length) return;

    let current = 0;

    function goTo(index) {
      slides[current].classList.remove('active');
      if (dots[current]) dots[current].classList.remove('active');
      current = (index + slides.length) % slides.length;
      slides[current].classList.add('active');
      if (dots[current]) dots[current].classList.add('active');
    }

    nextBtn?.addEventListener('click', () => goTo(current + 1));
    prevBtn?.addEventListener('click', () => goTo(current - 1));
    dots.forEach((dot, i) => dot.addEventListener('click', () => goTo(i)));
  });
}
