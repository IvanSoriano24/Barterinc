// routes/quote.routes.js
const express = require('express');
const router = express.Router();
const quoteController = require('../controllers/quote.controller');
const { verifyToken } = require('../middlewares/auth.middleware');

router.post('/investor', quoteController.quoteInvestor);
router.post('/lender', quoteController.quoteLender);

module.exports = router;
