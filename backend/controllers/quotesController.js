const pool = require('../config/database');

function generateQuoteNumber() {
  const ts = Date.now();
  return `Q-${ts}`;
}

async function createQuote(req, res, next) {
  try {
    const { customer_id, location_id, items, delivery_method, delivery_location, notes } = req.body;
    if (!customer_id || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'Invalid quote payload' });
    }

    // compute subtotal
    let subtotal = 0;
    for (const it of items) {
      subtotal += Number(it.unit_price || 0) * Number(it.quantity || 0);
    }
    const tax_amount = 0;
    const shipping_cost = 0;
    const total_amount = subtotal + tax_amount + shipping_cost;

    const quote_number = generateQuoteNumber();
    const q = `INSERT INTO quotes (quote_number, customer_id, location_id, subtotal, tax_amount, shipping_cost, total_amount, delivery_method, delivery_location, notes, quote_status)
               VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,'draft') RETURNING id`;
    const result = await pool.query(q, [quote_number, customer_id, location_id, subtotal, tax_amount, shipping_cost, total_amount, delivery_method, delivery_location, notes]);
    const quoteId = result.rows[0].id;

    // insert items
    const insertItemQ = `INSERT INTO quote_items (quote_id, product_id, quantity, unit_price, line_total) VALUES ($1,$2,$3,$4,$5)`;
    for (const it of items) {
      const lineTotal = Number(it.unit_price || 0) * Number(it.quantity || 0);
      await pool.query(insertItemQ, [quoteId, it.product_id, it.quantity, it.unit_price, lineTotal]);
    }

    res.status(201).json({ quote_number, id: quoteId, total_amount });
  } catch (err) {
    next(err);
  }
}

module.exports = { createQuote };
