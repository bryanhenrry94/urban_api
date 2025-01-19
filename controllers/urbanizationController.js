const Urbanization = require('../models/Urbanization.js');
const crypto = require('crypto');

const createUrbanization = async (req, res) => {
    try {
        const { body, tenantId } = req;
        // Asigna Tenant
        body.tenantId = tenantId;
        // create urbanization
        const urbanization = new Urbanization(body);
        await urbanization.save();

        res.status(201).json({ status: 'ok', message: 'Urbanization created successfully', data: urbanization });
    } catch (err) {
        res.status(400).json({ status: 'error', message: `Error creating urbanization: ${err.message}`, data: null });
    }
};

const getUrbanization = async (req, res) => {
    try {
        const { _id } = req.params;
        const { tenantId } = req;

        const urbanization = await Urbanization.findOne({ _id, tenantId });
        res.status(201).json({ status: 'ok', message: 'Urbanization found successfully', data: urbanization });
    } catch (err) {
        res.status(400).json({ status: 'error', message: `Error finding urbanization: ${err.message}`, data: null });
    }
};

const getUrbanizations = async (req, res) => {
    try {
        const { tenantId } = req;

        const urbanizations = await Urbanization.find({ tenantId });
        res.status(201).json({ status: 'ok', message: 'Urbanizations found successfully', data: urbanizations });
    } catch (err) {
        res.status(400).json({ status: 'error', message: `Error finding urbanizations: ${err.message}`, data: null });
    }
};

const updateUrbanization = async (req, res) => {
    try {
        const { _id } = req.params;
        const { body, tenantId } = req;

        const urbanization = await Urbanization.findByIdAndUpdate({ _id, tenantId }, body, { new: true });

        res.status(200).json({ status: 'ok', message: 'Urbanization updated successfully', data: urbanization });
    } catch (err) {
        res.status(400).json({ status: 'error', message: `Error updating urbanization: ${err.message}`, data: null });
    }
};

const deleteUrbanization = async (req, res) => {
    try {
        const { _id } = req.params;
        const { tenantId } = req;

        await Urbanization.findByIdAndDelete({ _id, tenantId });

        res.status(200).json({ status: 'ok', message: 'Urbanization deleted successfully', data: null });
    } catch (err) {
        res.status(400).json({ status: 'error', message: `Error deleting urbanization: ${err.message}`, data: null });
    }
};

module.exports = { createUrbanization, getUrbanization, getUrbanizations, updateUrbanization, deleteUrbanization };