const pool = require('../config/database');

async function getProducts(req, res, next) {
  try {
    const q = `SELECT p.id, p.name, p.sku, p.description, p.unit_of_measure AS unit, p.base_price AS price, p.stock_quantity AS stock, c.name AS category
               FROM products p
               LEFT JOIN categories c ON p.category_id = c.id
               WHERE p.is_active = true
               ORDER BY p.name
               LIMIT 500`;
    const result = await pool.query(q);
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
}

async function getProductById(req, res, next) {
  try {
    const { id } = req.params;
    const q = `SELECT p.id, p.name, p.sku, p.description, p.unit_of_measure AS unit, p.base_price AS price, p.stock_quantity AS stock, c.name AS category
               FROM products p
               LEFT JOIN categories c ON p.category_id = c.id
               WHERE p.id = $1`;
    const result = await pool.query(q, [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Product not found' });
    res.json(result.rows[0]);
  } catch (err) {
    next(err);
  }
}

module.exports = { getProducts, getProductById };
