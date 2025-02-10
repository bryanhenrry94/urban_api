const express = require('express');

const { createAccount,
    getAccount,
    getAccounts,
    getAccountsTree,
    updateAccount,
    deleteAccount,
    createMultipleAccounts,
} = require('../controllers/ChartAccountController');

const router = express.Router();

const { verifyToken } = require('../middlewares/authMiddleware');
const { tenantMiddleware } = require('../middlewares/tenantMiddleware');

router.post('/', [verifyToken, tenantMiddleware], createAccount);
router.get('/', [verifyToken, tenantMiddleware], getAccounts);
router.get('/tree', [verifyToken, tenantMiddleware], getAccountsTree);
router.get('/:_id', [verifyToken, tenantMiddleware], getAccount);
router.put('/:_id', [verifyToken, tenantMiddleware], updateAccount);
router.delete('/:_id', [verifyToken, tenantMiddleware], deleteAccount);
router.post('/upload', [verifyToken, tenantMiddleware], createMultipleAccounts);

module.exports = router;