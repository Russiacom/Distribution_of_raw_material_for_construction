const express = require('express');
const router = express.Router();
const { createContact } = require('../controllers/contactsController');

router.post('/', createContact);

module.exports = router;
