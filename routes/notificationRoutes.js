const express = require('express');
const { getNotification, createNotification, getNotifications } = require('../controllers/notificationController');
const router = express.Router();

router.get('/:_id', getNotification);
router.get('/', getNotifications)
router.post('/', createNotification)

module.exports = router;
