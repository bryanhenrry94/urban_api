const express = require('express');
const { getTenants, getTenant, createTenant, getTenantByDomain, getTenantByEmail } = require('../controllers/tenantController');
const router = express.Router();

router.get('/', getTenants)
router.get('/:_id', getTenant);
router.get('/email/:email', getTenantByEmail)
router.get('/domain/:domain', getTenantByDomain);
router.post('/', createTenant);

module.exports = router;
