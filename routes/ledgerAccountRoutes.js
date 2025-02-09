const express = require('express');

const { createLedgerAccount,
    getLedgerAccount,
    getLedgerAccounts,
    updateLedgerAccount,
    deleteLedgerAccount,
    getLedgerAccountsTree } = require('../controllers/ledgerAccountController');

const router = express.Router();

const { verifyToken } = require('../middlewares/authMiddleware');
const { tenantMiddleware } = require('../middlewares/tenantMiddleware');

router.post('/', [verifyToken, tenantMiddleware], createLedgerAccount);
router.get('/', [verifyToken, tenantMiddleware], getLedgerAccounts);
router.get('/tree', [verifyToken, tenantMiddleware], getLedgerAccountsTree);
router.get('/:_id', [verifyToken, tenantMiddleware], getLedgerAccount);
router.put('/:_id', [verifyToken, tenantMiddleware], updateLedgerAccount);
router.delete('/:_id', [verifyToken, tenantMiddleware], deleteLedgerAccount);

module.exports = router;