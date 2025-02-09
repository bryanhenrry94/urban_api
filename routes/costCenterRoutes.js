const express = require('express');

const {
    createCostCenter,
    getCostCenter,
    getCostCenters,
    updateCostCenter,
    deleteCostCenter
} = require('../controllers/costCenterController');

const { verifyToken } = require('../middlewares/authMiddleware');
const { tenantMiddleware } = require('../middlewares/tenantMiddleware');

const router = express.Router();

router.post('/', [verifyToken, tenantMiddleware], createCostCenter);
router.get('/', [verifyToken, tenantMiddleware], getCostCenters);
router.get('/:_id', [verifyToken, tenantMiddleware], getCostCenter);
router.put('/:_id', [verifyToken, tenantMiddleware], updateCostCenter);
router.delete('/:_id', [verifyToken, tenantMiddleware], deleteCostCenter);

module.exports = router;