const express = require('express');
const { createCompany, getCompanies, getCompany, updateCompany, deleteCompany } = require('../controllers/companyController');
const router = express.Router();

router.get('/', getCompanies)
router.post('/', createCompany);
router.get('/:_id', getCompany);
router.put('/:_id', updateCompany);
router.delete('/:_id', deleteCompany);

module.exports = router;
