const Invoice = require('../models/Invoice.js');

const createInvoice = async (req, res) => {
    try {
        const { body } = req;

        const invoice = new Invoice(body);
        await invoice.save();

        res.status(201).json({ status: 'ok', message: 'Invoice created successfully', data: invoice });
    } catch (err) {
        res.status(400).json({ status: 'error', message: `Error creating invoice: ${err.message}`, data: null });
    }
};

const getInvoices = async (_, res) => {
    try {
        const people = await Invoice.find();
        res.status(201).json({ status: 'ok', message: 'People found successfully', data: people });
    } catch (err) {
        res.status(400).json({ status: 'error', message: `Error finding people: ${err.message}`, data: null });
    }
};

const getInvoice = async (req, res) => {
    try {
        const { _id } = req.params;

        const invoice = await Invoice.findById({ _id });
        res.status(201).json({ status: 'ok', message: 'Invoice found successfully', data: invoice });
    } catch (err) {
        res.status(400).json({ status: 'error', message: `Error finding invoice: ${err.message}`, data: null });
    }
};

const updateInvoice = async (req, res) => {
    try {
        const { _id } = req.params;
        const { body } = req;

        const invoice = await Invoice.findByIdAndUpdate(_id, body, { new: true });

        res.status(200).json({ status: 'ok', message: 'Invoice updated successfully', data: invoice });
    } catch (err) {
        res.status(400).json({ status: 'error', message: `Error updating invoice: ${err.message}`, data: null });
    }
};

const deleteInvoice = async (req, res) => {
    try {
        const { _id } = req.params;

        await Invoice.findByIdAndDelete(_id);

        res.status(200).json({ status: 'ok', message: 'Invoice deleted successfully', data: null });
    } catch (err) {
        res.status(400).json({ status: 'error', message: `Error deleting invoice: ${err.message}`, data: null });
    }
};

module.exports = { createInvoice, getInvoices, getInvoice, updateInvoice, deleteInvoice };