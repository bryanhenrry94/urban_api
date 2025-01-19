const express = require('express');
const { getProperties, getProperty, createProperty, updateProperty, deleteProperty } = require('../controllers/propertyController');
const { verifyToken } = require('../middlewares/authMiddleware');
const { tenantMiddleware } = require('../middlewares/tenantMiddleware');
const router = express.Router();

router.get('/', [verifyToken, tenantMiddleware], getProperties);
router.get('/:_id', [verifyToken, tenantMiddleware], getProperty);
router.post('/', [verifyToken, tenantMiddleware], createProperty);
router.put('/:_id', [verifyToken, tenantMiddleware], updateProperty);
router.delete('/:_id', [verifyToken, tenantMiddleware], deleteProperty);

module.exports = router;
