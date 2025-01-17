const Payment = require('../models/Payment');

exports.getPayment = async (req, res) => {
    try {
        const { _id } = req.params;

        const payment = await Payment.findOne({ _id });
        res.status(201).json({ status: "ok", message: 'Payment find successfully', data: payment });
    } catch (err) {
        res.status(400).json({ status: 'error', message: `Error finding perperties: ${err.message}`, data: null });
    }
};

exports.getPayments = async (req, res) => {
    try {
        const payments = await Payment.findOne({ _id });
        res.status(201).json({ status: "ok", message: 'Payments find successfully', data: payments });
    } catch (err) {
        res.status(400).json({ status: 'error', message: `Error finding perperties: ${err.message}`, data: null });
    }
};


exports.createPayment = async (req, res) => {
    try {
        const { body } = req;

        // create Payment
        const payment = new Payment(body);
        await payment.save();

        res.status(201).json({ status: "ok", message: 'Payment created successfully', data: payment });
    } catch (err) {
        res.status(400).json({ status: 'error', message: `Error finding perperties: ${err.message}`, data: null });
    }
}