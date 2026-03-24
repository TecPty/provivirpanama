import { execute, getLeadColumns } from '../../lib/mysql.js';
import { syncLeadToPipedrive } from '../../lib/pipedrive.js';

const setCors = (res) => {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
};

const normalizeBody = (req) => {
  if (!req.body) return {};
  if (typeof req.body === 'string') {
    try {
      return JSON.parse(req.body);
    } catch {
      return {};
    }
  }
  return req.body;
};

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const isValidPhone = (phone) => /^(\+507)?[\s-]?\d{4}[\s-]?\d{4}$/.test(phone);

const clean = (value, max = 255) => {
  if (value === null || value === undefined) return null;
  const text = String(value).trim();
  if (!text) return null;
  return text.slice(0, max);
};

const getClientIp = (req) => {
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string' && forwarded.length > 0) {
    return forwarded.split(',')[0].trim().slice(0, 45);
  }
  return null;
};

export default async function handler(req, res) {
  setCors(res);

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Método no permitido' });
  }

  const body = normalizeBody(req);

  if (body.website) {
    return res.status(200).json({ success: true, message: 'Gracias por tu interés.' });
  }

  const name = clean(body.name, 255);
  const email = clean(body.email, 255);
  const phone = clean(body.phone, 50);
  const advisor = clean(body.advisor, 100);
  const project = clean(body.project, 255);
  const salary = clean(body.salary, 100);
  const employment = clean(body.employment, 100);
  const message = clean(body.message, 2000);

  if (!name || name.length < 2) {
    return res.status(400).json({ success: false, error: 'Nombre inválido' });
  }

  if (!email || !isValidEmail(email)) {
    return res.status(400).json({ success: false, error: 'Email inválido' });
  }

  if (!phone || !isValidPhone(phone)) {
    return res.status(400).json({ success: false, error: 'Teléfono inválido' });
  }

  if (!salary) {
    return res.status(400).json({ success: false, error: 'Salario mensual inválido' });
  }

  if (!project) {
    return res.status(400).json({ success: false, error: 'Ubicación de proyecto inválida' });
  }

  const propertyId = Number.isInteger(Number(body.property_id)) && Number(body.property_id) > 0
    ? Number(body.property_id)
    : null;

  const baseMessage = message || `Lead web - Ubicación de proyecto: ${project}. Salario mensual: ${salary}.`;
  const composedMessage = advisor
    ? `${baseMessage}\n\nAsesor de preferencia: ${advisor}`
    : baseMessage;

  const candidateValues = {
    name,
    email,
    phone,
    message: composedMessage,
    salary,
    employment_status: employment,
    project_name: project,
    property_id: propertyId,
    source: 'website',
    utm_source: clean(body.utm_source, 100),
    utm_medium: clean(body.utm_medium, 100),
    utm_campaign: clean(body.utm_campaign, 100),
    utm_term: clean(body.utm_term, 100),
    utm_content: clean(body.utm_content, 100),
    utm_id: clean(body.utm_id, 100),
    gclid: clean(body.gclid, 255),
    fbclid: clean(body.fbclid, 255),
    ttclid: clean(body.ttclid, 255),
    msclkid: clean(body.msclkid, 255),
    landing_page: clean(body.landing_page, 2000),
    referrer: clean(body.referrer, 2000),
    ip_address: getClientIp(req),
    user_agent: clean(req.headers['user-agent'], 2000)
  };

  try {
    const availableColumns = await getLeadColumns();

    const insertColumns = Object.keys(candidateValues).filter(
      (column) => availableColumns.has(column) && candidateValues[column] !== undefined
    );

    if (!insertColumns.includes('email')) {
      return res.status(500).json({ success: false, error: 'La tabla leads no tiene columna email' });
    }

    const placeholders = insertColumns.map(() => '?').join(', ');
    const values = insertColumns.map((column) => candidateValues[column]);

    const result = await execute(
      `INSERT INTO leads (${insertColumns.join(', ')}) VALUES (${placeholders})`,
      values
    );

    let crmSync = { synced: false, reason: 'not-attempted' };
    try {
      crmSync = await syncLeadToPipedrive({
        name,
        email,
        phone,
        message: composedMessage,
        advisor,
        salary,
        employment,
        project,
        utm_source: candidateValues.utm_source,
        utm_medium: candidateValues.utm_medium,
        utm_campaign: candidateValues.utm_campaign,
        utm_term: candidateValues.utm_term,
        utm_content: candidateValues.utm_content,
        gclid: candidateValues.gclid,
        fbclid: candidateValues.fbclid,
        landing_page: candidateValues.landing_page,
        referrer: candidateValues.referrer
      });
    } catch (crmError) {
      console.error('Pipedrive sync failed:', crmError.message);
      crmSync = { synced: false, reason: 'sync-error' };
    }

    return res.status(201).json({
      success: true,
      message: 'Gracias por tu interés. Te contactaremos pronto.',
      leadId: result.insertId || null,
      crmSynced: crmSync.synced === true
    });
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ success: false, error: 'Este email ya está registrado' });
    }

    return res.status(500).json({
      success: false,
      error: 'Error al procesar tu solicitud',
      details: error.message
    });
  }
}