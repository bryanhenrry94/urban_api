const express = require('express');
const { createInvoice, getInvoices, getInvoice, updateInvoice, deleteInvoice } = require('../controllers/invoiceController');
const router = express.Router();

router.post('/', createInvoice);
router.get('/', getInvoices)
router.get('/:_id', getInvoice);
router.put('/:_id', updateInvoice);
router.delete('/:_id', deleteInvoice);

module.exports = router;
