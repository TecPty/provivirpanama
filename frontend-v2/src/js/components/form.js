const API_URL = 'http://localhost:3000/api/leads';

const PIPEDRIVE_WEBFORMS = {
  home: 'https://webforms.pipedrive.com/f/6ctNlqQVpCFIo4FUtaCHokvKuC8KF2Yngi5Qc6EvZcVg19U1lPgHb8QQPUdZT7TORZ',
  'ciudad-del-este': {
    cordoba: 'https://webforms.pipedrive.com/f/c6zzUqyvsGCxpXonZLP1eJK6kMWfx9D2lyc19EKo6NMXkoiRxCC5hU1OuDkyLlS7l1',
    granada: 'https://webforms.pipedrive.com/f/czEPd8L41J3l8wz0yP1pXy4fsHzgKPQy60GabTicePOzAInCqX8XnllN7qoyaBCg3p'
  },
  'villas-del-este': {
    roble: 'https://webforms.pipedrive.com/f/6xMNS4Zf2J5QZZaelwnm7clRl7mFEqlbBXx28qjt7xeHOZVjEY676andXp0PpCIc6L',
    cerezo: 'https://webforms.pipedrive.com/f/6GZFZfhGnl9tZwZtGQZd25QK3TKKndCaO1Te1a2fYjcJs8ZsX8vhq9742Aobakd1JN'
  },
  'villas-del-oeste': {
    olivo: 'https://webforms.pipedrive.com/f/72j3kRLxABgS3VfKK4bJQylmGdfcfZsx6mNYP1d6vSFyw0pxs5N1crS4QmSHfOzQvV',
    caoba: 'https://webforms.pipedrive.com/f/c5hLwXq7Y0yiQtBUCUhbXqTPQxGOTw5B73C5OE8C7dwE8TMDbuaHBc1i2069McQ7VF',
    tulipan: 'https://webforms.pipedrive.com/f/cehN1gTq1tGBMR4Ro8Z259GNYAaig6dWEI5Q5mQ4N3X21vT9EQuZPosx9LOmAO5gOv'
  }
};

const resolvePageKey = (pathname) => {
  if (pathname === '/' || pathname === '/index.html') return 'home';
  if (pathname.includes('/proyectos/ciudad-del-este')) return 'ciudad-del-este';
  if (pathname.includes('/proyectos/villas-del-este')) return 'villas-del-este';
  if (pathname.includes('/proyectos/villas-del-oeste')) return 'villas-del-oeste';
  return null;
};

const getActiveModel = () => {
  return document.querySelector('.models__tab.active')?.dataset.model || null;
};

const mountPipedriveWebform = (form, webformUrl) => {
  if (!webformUrl) return;

  form.classList.add('cta-form__embedded-host');
  form.innerHTML = `
    <iframe
      class="cta-form__iframe"
      src="${webformUrl}"
      title="Formulario de contacto"
      loading="lazy"
      referrerpolicy="no-referrer-when-downgrade"
      allow="clipboard-write"
    ></iframe>
  `;
};

const initPipedriveWebforms = (form) => {
  const pageKey = resolvePageKey(window.location.pathname);
  if (!pageKey || !PIPEDRIVE_WEBFORMS[pageKey]) return false;

  const pageForms = PIPEDRIVE_WEBFORMS[pageKey];

  const resolveUrl = () => {
    if (typeof pageForms === 'string') return pageForms;
    const activeModel = getActiveModel();
    if (activeModel && pageForms[activeModel]) return pageForms[activeModel];
    return pageForms[Object.keys(pageForms)[0]];
  };

  mountPipedriveWebform(form, resolveUrl());

  if (typeof pageForms === 'object') {
    document.querySelectorAll('.models__tab').forEach((tab) => {
      tab.addEventListener('click', () => {
        // Espera al siguiente frame para leer el estado "active" actualizado.
        window.requestAnimationFrame(() => {
          mountPipedriveWebform(form, resolveUrl());
        });
      });
    });
  }

  return true;
};

export function initForm() {
  const form = document.getElementById('leadForm');
  const successEl = document.getElementById('formSuccess');
  const submitBtn = document.getElementById('submitBtn');
  if (!form) return;

  if (initPipedriveWebforms(form)) {
    return;
  }

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
