const API_URL = 'http://localhost:3000/api/leads';

export function initForm() {
  const form = document.getElementById('leadForm');
  const successEl = document.getElementById('formSuccess');
  const submitBtn = document.getElementById('submitBtn');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Honeypot check
    if (form.querySelector('[name="website"]')?.value) return;

    const data = {
      name: form.fullName.value.trim(),
      email: form.email.value.trim(),
      phone: form.phone.value.trim(),
      project: form.project.value,
      salary: form.salary.value,
    };

    // Basic validation
    if (!data.name || !data.email || !data.phone) {
      alert('Por favor completá los campos requeridos.');
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = 'Enviando...';

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error('Error en el servidor');

      form.style.display = 'none';
      successEl.classList.add('is-visible');

      // GTM event
      if (window.dataLayer) {
        window.dataLayer.push({ event: 'lead_submitted', project: data.project });
      }
    } catch (err) {
      console.error(err);
      alert('Ocurrió un error. Por favor intentá de nuevo.');
      submitBtn.disabled = false;
      submitBtn.textContent = 'Quiero más información';
    }
  });
}
