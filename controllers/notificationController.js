const Notification = require('../models/Notification');

exports.getNotification = async (req, res) => {
    try {
        const { _id } = req.params;

        const notification = await Notification.findById({ _id });
        res.status(201).json({ status: 'ok', message: 'Notification find successfully', data: notification });
    } catch (err) {
        res.status(400).json({ status: 'error', message: `Error finding notification: ${err.message}`, data: null });
    }
};

exports.getNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find();
        res.status(201).json({ status: 'ok', message: 'Notifications find successfully', data: notification });
    } catch (err) {
        res.status(400).json({ status: 'error', message: `Error finding notification: ${err.message}`, data: null });
    }
};

exports.createNotification = async (req, res) => {
    try {
        const { body } = req;

        // create Notification
        const notification = new Notification(body);
        await notification.save();

        res.status(201).json({ message: 'Notification created successfully', notification });
    } catch (err) {
        res.status(400).json({ message: 'Error creating Notification', error: err.message });
    }
}