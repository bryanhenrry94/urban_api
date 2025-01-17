const express = require('express');
const { getProperties, getProperty, createProperty } = require('../controllers/propertyController');
// const { verifyToken } = require("../middlewares/authMiddleware.js");
const router = express.Router();

router.get('/', getProperties);
router.get('/:_id', getProperty);
router.post('/', createProperty);

module.exports = router;
