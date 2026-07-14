const pool = require('../config/database');

async function getCategories(req, res, next) {
  try {
    const q = `SELECT id, name, description FROM categories ORDER BY name`;
    const result = await pool.query(q);
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
}

module.exports = { getCategories };
