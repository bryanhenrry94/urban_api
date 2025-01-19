const express = require('express');
const { createPerson, getPersons, getPerson, updatePerson, deletePerson } = require('../controllers/personController');
const { verifyToken } = require('../middlewares/authMiddleware');
const { tenantMiddleware } = require('../middlewares/tenantMiddleware');
const router = express.Router();

router.post('/', [verifyToken, tenantMiddleware], createPerson);
router.get('/', [verifyToken, tenantMiddleware], getPersons)
router.get('/:_id', [verifyToken, tenantMiddleware], getPerson);
router.put('/:_id', [verifyToken, tenantMiddleware], updatePerson);
router.delete('/:_id', [verifyToken, tenantMiddleware], deletePerson);

module.exports = router;
