const express = require('express');
const { getPayments, getPayment, createPayment } = require('../controllers/paymentController');
const router = express.Router();

router.get('/', getPayments)
router.get('/:_id', getPayment);
router.get('/', createPayment)

module.exports = router;
