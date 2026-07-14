const pool = require('../config/database');

async function createContact(req, res, next) {
  try {
    const { name, email, phone, company_name, subject, message, location_id } = req.body;
    if (!name || !email || !message) return res.status(400).json({ error: 'Missing required fields' });

    const q = `INSERT INTO contacts (name, email, phone, company_name, subject, message, location_id) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING id`;
    const result = await pool.query(q, [name, email, phone, company_name, subject, message, location_id]);
    res.status(201).json({ id: result.rows[0].id });
  } catch (err) {
    next(err);
  }
}

module.exports = { createContact };
