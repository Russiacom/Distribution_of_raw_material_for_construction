const pool = require('../config/database');

async function getLocations(req, res, next) {
  try {
    const q = `SELECT id, name, address, city, state_province AS state, postal_code AS postal, country, latitude, longitude, phone, email, location_type AS type, is_active
               FROM locations
               WHERE is_active = true
               ORDER BY name`;
    const result = await pool.query(q);
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
}

module.exports = { getLocations };
