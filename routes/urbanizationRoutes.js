const express = require('express');
const { createUrbanization, getUrbanizations, getUrbanization, updateUrbanization, deleteUrbanization } = require('../controllers/urbanizationController');

const { verifyToken } = require('../middlewares/authMiddleware');
const { tenantMiddleware } = require('../middlewares/tenantMiddleware');

const router = express.Router();

router.post('/', [verifyToken, tenantMiddleware], createUrbanization);
router.get('/', [verifyToken, tenantMiddleware], getUrbanizations)
router.get('/:_id', [verifyToken, tenantMiddleware], getUrbanization);
router.put('/:_id', [verifyToken, tenantMiddleware], updateUrbanization);
router.delete('/:_id', [verifyToken, tenantMiddleware], deleteUrbanization);

module.exports = router;
