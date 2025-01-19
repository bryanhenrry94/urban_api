const express = require('express');
const { createCompany, getCompanies, getCompany, updateCompany, deleteCompany } = require('../controllers/companyController');

const { verifyToken } = require('../middlewares/authMiddleware');
const { tenantMiddleware } = require('../middlewares/tenantMiddleware');

const router = express.Router();

router.get('/', [verifyToken, tenantMiddleware], getCompanies)
router.post('/', [verifyToken, tenantMiddleware], createCompany);
router.get('/:_id', [verifyToken, tenantMiddleware], getCompany);
router.put('/:_id', [verifyToken, tenantMiddleware], updateCompany);
router.delete('/:_id', [verifyToken, tenantMiddleware], deleteCompany);

module.exports = router;
