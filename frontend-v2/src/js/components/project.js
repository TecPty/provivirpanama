export function initProject() {
  const tabs = document.querySelectorAll('.models__tab');
  const models = document.querySelectorAll('.model-detail');

  // Floor plan modal
  const modal = document.createElement('div');
  modal.className = 'floor-plan-modal';
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-modal', 'true');
  modal.setAttribute('aria-label', 'Planta arquitectónica');
  modal.innerHTML = `
    <div class="floor-plan-modal__inner">
      <button class="floor-plan-modal__close" aria-label="Cerrar planta">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M1 1l12 12M13 1L1 13" stroke="#333" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </button>
      <img class="floor-plan-modal__img" src="" alt="Planta arquitectónica">
    </div>
  `;
  document.body.appendChild(modal);

  const modalImg = modal.querySelector('.floor-plan-modal__img');
  const closeBtn = modal.querySelector('.floor-plan-modal__close');

  function openModal(src) {
    modalImg.src = src;
    modal.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('[data-floor-plan]').forEach(btn => {
    btn.addEventListener('click', () => openModal(btn.dataset.floorPlan));
  });
  closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

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
