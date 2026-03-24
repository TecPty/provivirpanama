const DEFAULT_PIPEDRIVE_BASE_URL = 'https://api.pipedrive.com/v1';

const toNullableNumber = (value) => {
  if (value === undefined || value === null || value === '') return undefined;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
};

const buildQuery = (params) => {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      searchParams.set(key, String(value));
    }
  });
  return searchParams.toString();
};

const isEnabled = () => {
  const token = process.env.PIPEDRIVE_API_TOKEN;
  const syncEnabled = (process.env.PIPEDRIVE_SYNC_ENABLED || 'true').toLowerCase() !== 'false';
  return Boolean(token) && syncEnabled;
};

const requestPipedrive = async ({ method = 'GET', path, body, timeoutMs = 12000 }) => {
  const token = process.env.PIPEDRIVE_API_TOKEN;
  const baseUrl = (process.env.PIPEDRIVE_BASE_URL || DEFAULT_PIPEDRIVE_BASE_URL).replace(/\/$/, '');

  if (!token) {
    throw new Error('PIPEDRIVE_API_TOKEN no configurado');
  }

  const separator = path.includes('?') ? '&' : '?';
  const url = `${baseUrl}${path}${separator}api_token=${encodeURIComponent(token)}`;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: body ? JSON.stringify(body) : undefined,
      signal: controller.signal
    });

    const payload = await response.json();

    if (!response.ok || payload.success === false) {
      const details = payload.error || payload.error_info || `HTTP ${response.status}`;
      throw new Error(`Pipedrive ${method} ${path} falló: ${details}`);
    }

    return payload;
  } finally {
    clearTimeout(timeout);
  }
};

const findPersonByEmail = async (email) => {
  if (!email) return null;

  const query = buildQuery({
    term: email,
    fields: 'email',
    exact_match: 1,
    limit: 1
  });

  const result = await requestPipedrive({ path: `/persons/search?${query}` });
  const firstItem = result?.data?.items?.[0]?.item;
  return firstItem?.id || null;
};

const createPerson = async ({ name, email, phone }) => {
  const personPayload = {
    name,
    email: email ? [{ value: email, primary: true }] : undefined,
    phone: phone ? [{ value: phone, primary: true }] : undefined
  };

  const result = await requestPipedrive({
    method: 'POST',
    path: '/persons',
    body: personPayload
  });

  return result?.data?.id || null;
};

const buildDealTitle = (leadData) => {
  const project = leadData.project || 'Proyecto sin especificar';
  return `${project} - ${leadData.name}`.slice(0, 255);
};

const createDeal = async ({ personId, leadData }) => {
  const dealPayload = {
    title: buildDealTitle(leadData),
    person_id: personId,
    pipeline_id: toNullableNumber(process.env.PIPEDRIVE_PIPELINE_ID),
    stage_id: toNullableNumber(process.env.PIPEDRIVE_STAGE_ID),
    user_id: toNullableNumber(process.env.PIPEDRIVE_OWNER_ID),
    org_id: toNullableNumber(process.env.PIPEDRIVE_ORG_ID)
  };

  const result = await requestPipedrive({
    method: 'POST',
    path: '/deals',
    body: dealPayload
  });

  return result?.data?.id || null;
};

const addLeadNote = async ({ dealId, personId, leadData }) => {
  const attributionLines = [
    `UTM source: ${leadData.utm_source || '-'}`,
    `UTM medium: ${leadData.utm_medium || '-'}`,
    `UTM campaign: ${leadData.utm_campaign || '-'}`,
    `UTM term: ${leadData.utm_term || '-'}`,
    `UTM content: ${leadData.utm_content || '-'}`,
    `gclid: ${leadData.gclid || '-'}`,
    `fbclid: ${leadData.fbclid || '-'}`
  ];

  const content = [
    '<strong>Lead recibido desde formulario web</strong>',
    `Mensaje: ${leadData.message || '-'}`,
    `Asesor: ${leadData.advisor || '-'}`,
    `Salario: ${leadData.salary || '-'}`,
    `Estabilidad laboral: ${leadData.employment || '-'}`,
    `Landing page: ${leadData.landing_page || '-'}`,
    `Referrer: ${leadData.referrer || '-'}`,
    '',
    '<strong>Attribution</strong>',
    ...attributionLines
  ].join('<br>');

  await requestPipedrive({
    method: 'POST',
    path: '/notes',
    body: {
      content,
      deal_id: dealId,
      person_id: personId
    }
  });
};

export const syncLeadToPipedrive = async (leadData) => {
  if (!isEnabled()) {
    return { synced: false, reason: 'disabled-or-missing-token' };
  }

  const personId = (await findPersonByEmail(leadData.email)) || (await createPerson(leadData));
  if (!personId) {
    throw new Error('No se pudo resolver person_id en Pipedrive');
  }

  const dealId = await createDeal({ personId, leadData });
  if (!dealId) {
    throw new Error('No se pudo crear deal en Pipedrive');
  }

  await addLeadNote({ dealId, personId, leadData });

  return {
    synced: true,
    personId,
    dealId
  };
};
