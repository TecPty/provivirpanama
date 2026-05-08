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

  // Placeholder for gallery logic
  const nextBtns = document.querySelectorAll('.gallery-btn.next');
  const prevBtns = document.querySelectorAll('.gallery-btn.prev');

  nextBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      console.log('Next slide placeholder');
      // Here you would implement simple carousel logic if needed
    });
  });
}
