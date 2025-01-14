const express = require('express');
const { getItem, getItems, createItem } = require('../controllers/itemController');
const router = express.Router();

router.get('/:_id', getItem);
router.get('/', getItems)
router.post('/', createItem)

module.exports = router;
