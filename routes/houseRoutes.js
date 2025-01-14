const express = require('express');
const { getHouse, getHouses, createHouse } = require('../controllers/houseController.js');
const { tenantMiddleware } = require("../middlewares/tenantMiddleware.js");
const { verifyToken } = require("../middlewares/authMiddleware.js");

const router = express.Router();

router.get('/:_id', getHouse);
router.get('/', [verifyToken, tenantMiddleware], getHouses);
router.post('/', createHouse);

module.exports = router;
