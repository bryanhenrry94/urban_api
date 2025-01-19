const express = require('express');
const { createResident, getResidents, getResident, updateResident, deleteResident } = require('../controllers/residentController');

const { verifyToken } = require('../middlewares/authMiddleware');
const { tenantMiddleware } = require('../middlewares/tenantMiddleware');

const router = express.Router();

router.post('/', [verifyToken, tenantMiddleware], createResident);
router.get('/', [verifyToken, tenantMiddleware], getResidents)
router.get('/:_id', [verifyToken, tenantMiddleware], getResident);
router.put('/:_id', [verifyToken, tenantMiddleware], updateResident);
router.delete('/:_id', [verifyToken, tenantMiddleware], deleteResident);

module.exports = router;
