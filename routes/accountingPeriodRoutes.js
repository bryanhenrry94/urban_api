const express = require('express');

const {
    createAccountingPeriod,
    getAccountingPeriods,
    getAccountingPeriod,
    updateAccountingPeriod,
    deleteAccountingPeriod,
} = require('../controllers/accountingPeriodController');

const router = express.Router();

const { verifyToken } = require('../middlewares/authMiddleware');
const { tenantMiddleware } = require('../middlewares/tenantMiddleware');

router.post('/', [verifyToken, tenantMiddleware], createAccountingPeriod);
router.get('/', [verifyToken, tenantMiddleware], getAccountingPeriods);
router.get('/:_id', [verifyToken, tenantMiddleware], getAccountingPeriod);
router.put('/:_id', [verifyToken, tenantMiddleware], updateAccountingPeriod);
router.delete('/:_id', [verifyToken, tenantMiddleware], deleteAccountingPeriod);

module.exports = router;