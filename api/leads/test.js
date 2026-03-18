import { execute } from '../../lib/mysql.js';

const setCors = (res) => {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
};

export default async function handler(req, res) {
  setCors(res);

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, error: 'Método no permitido' });
  }

  try {
    const ping = await execute('SELECT 1 AS ok');
    const leadsTable = await execute("SHOW TABLES LIKE 'leads'");

    return res.status(200).json({
      success: true,
      message: 'Database connection OK',
      test: ping[0] || { ok: 1 },
      leadsTableExists: leadsTable.length > 0
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message || 'Database connection failed'
    });
  }
}