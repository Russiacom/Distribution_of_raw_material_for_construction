const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Basic route for testing
app.get('/api/health', (req, res) => {
  res.json({
    status: 'API is running',
    timestamp: new Date(),
    port: PORT
  });
});

// API routes
const productsRouter = require('./routes/products');
const categoriesRouter = require('./routes/categories');
const locationsRouter = require('./routes/locations');
const quotesRouter = require('./routes/quotes');
const contactsRouter = require('./routes/contacts');

app.use('/api/products', productsRouter);
app.use('/api/categories', categoriesRouter);
app.use('/api/locations', locationsRouter);
app.use('/api/quotes', quotesRouter);
app.use('/api/contacts', contactsRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    error: 'Internal server error',
    message: err.message
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📍 Health check: http://localhost:${PORT}/api/health`);
});

module.exports = app;
