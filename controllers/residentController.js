const Resident = require('../models/Resident.js');
const crypto = require('crypto');

const createResident = async (req, res) => {
    try {
        const { body, tenant } = req;
        // Asigna Tenant
        body.tenant = tenant;
        // create resident
        const resident = new Resident(body);
        await resident.save();

        res.status(201).json({ status: 'ok', message: 'Resident created successfully', data: resident });
    } catch (err) {
        res.status(400).json({ status: 'error', message: `Error creating resident: ${err.message}`, data: null });
    }
};

const getResident = async (req, res) => {
    try {
        const { _id } = req.params;
        const { tenant } = req;

        const resident = await Resident.findOne({ _id, tenant });
        res.status(201).json({ status: 'ok', message: 'Resident found successfully', data: resident });
    } catch (err) {
        res.status(400).json({ status: 'error', message: `Error finding resident: ${err.message}`, data: null });
    }
};

const getResidents = async (req, res) => {
    try {
        const { tenant } = req;

        const residents = await Resident.find({ tenant })
            .populate({ path: 'urbanizationId', as: 'Urbanization' })
            .populate({ path: 'userId', as: 'Usuario' })
            .populate({ path: 'propertyId', as: 'Property' });

        res.status(201).json({ status: 'ok', message: 'Urbanizations found successfully', data: residents });
    } catch (err) {
        res.status(400).json({ status: 'error', message: `Error finding residents: ${err.message}`, data: null });
    }
};

const updateResident = async (req, res) => {
    try {
        const { _id } = req.params;
        const { body, tenant } = req;

        const resident = await Resident.findByIdAndUpdate({ _id, tenant }, body, { new: true });

        res.status(200).json({ status: 'ok', message: 'Resident updated successfully', data: resident });
    } catch (err) {
        res.status(400).json({ status: 'error', message: `Error updating resident: ${err.message}`, data: null });
    }
};

const deleteResident = async (req, res) => {
    try {
        const { _id } = req.params;
        const { tenant } = req;

        await Resident.findByIdAndDelete({ _id, tenant });

        res.status(200).json({ status: 'ok', message: 'Resident deleted successfully', data: null });
    } catch (err) {
        res.status(400).json({ status: 'error', message: `Error deleting resident: ${err.message}`, data: null });
    }
};

module.exports = { createResident, getResident, getResidents, updateResident, deleteResident };