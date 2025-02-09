const Unit = require('../models/Unit');

exports.getUnit = async (req, res) => {
    try {
        const { _id } = req.params;
        const { tenant } = req;

        const unit = await Unit.findById({ _id, tenant });
        res.status(201).json({ status: 'ok', message: 'Unit find successfully', data: unit });
    } catch (err) {
        res.status(400).json({ status: 'error', message: `Error finding perperties: ${err.message}`, data: null });
    }
};

exports.getUnits = async (req, res) => {
    try {
        const { tenant } = req;

        const units = await Unit.find({ tenant }).populate({ path: 'residents', model: 'User' });
        res.status(201).json({ status: 'ok', message: 'Units find successfully', data: units });
    } catch (err) {
        res.status(400).json({ status: 'error', message: `Error finding perperties: ${err.message}`, data: null });
    }
};

exports.createUnit = async (req, res) => {
    try {
        const { body, tenant } = req;

        // create Unit
        body.tenant = tenant;
        body.residents = Array.isArray(body.residents) ? body.residents : []; // Garantizar que sea un array

        const unit = new Unit(body);
        await unit.save();

        res.status(201).json({ status: 'ok', message: 'Unit created successfully', data: unit });
    } catch (err) {
        res.status(400).json({ status: 'error', message: `Error creatind unit: ${err.message}`, data: null });
    }
}

exports.updateUnit = async (req, res) => {
    try {
        const { _id } = req.params;
        const { body, tenant } = req;

        const unit = await Unit.findByIdAndUpdate({ _id, tenant }, body, { new: true });

        res.status(200).json({ status: 'ok', message: 'Unit updated successfully', data: unit });
    } catch (err) {
        res.status(400).json({ status: 'error', message: `Error updating unit: ${err.message}`, data: null });
    }
};

exports.deleteUnit = async (req, res) => {
    try {
        const { _id } = req.params;
        const { tenant } = req;

        await Unit.findByIdAndDelete({ _id, tenant });

        res.status(200).json({ status: 'ok', message: 'Unit deleted successfully', data: null });
    } catch (err) {
        res.status(400).json({ status: 'error', message: `Error deleting unit: ${err.message}`, data: null });
    }
};