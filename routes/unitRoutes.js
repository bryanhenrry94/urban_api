const express = require('express');
const { getUnits, getUnit, createUnit, updateUnit, deleteUnit } = require('../controllers/unitController');
const { verifyToken } = require('../middlewares/authMiddleware');
const { tenantMiddleware } = require('../middlewares/tenantMiddleware');
const router = express.Router();

router.get('/', [verifyToken, tenantMiddleware], getUnits);
router.get('/:_id', [verifyToken, tenantMiddleware], getUnit);
router.post('/', [verifyToken, tenantMiddleware], createUnit);
router.put('/:_id', [verifyToken, tenantMiddleware], updateUnit);
router.delete('/:_id', [verifyToken, tenantMiddleware], deleteUnit);

module.exports = router;
