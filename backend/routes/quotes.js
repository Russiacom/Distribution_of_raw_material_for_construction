const express = require('express');
const router = express.Router();
const { createQuote } = require('../controllers/quotesController');

router.post('/', createQuote);

module.exports = router;
