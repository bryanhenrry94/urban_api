const CostCenter = require('../models/CostCenter.js');

const createCostCenter = async (req, res) => {
    try {
        const { body, tenant } = req;
        // create cost center
        body.tenant = tenant;
        const costCenter = new CostCenter(body);
        await costCenter.save();

        res.status(201).json({ status: 'ok', message: 'Cost Center created successfully', data: costCenter });
    } catch (err) {
        res.status(400).json({ status: 'error', message: `Error creating cost center: ${err.message}`, data: null });
    }
}

const getCostCenter = async (req, res) => {
    try {
        const { _id } = req.params;
        const { tenant } = req;

        const costCenter = await CostCenter.findOne({ _id, tenant });
        res.status(201).json({ status: 'ok', message: 'Cost Center found successfully', data: costCenter });
    } catch (err) {
        res.status(400).json({ status: 'error', message: `Error finding cost center: ${err.message}`, data: null });
    }
}

const getCostCenters = async (req, res) => {
    try {
        const { tenant } = req;

        const costCenters = await CostCenter.find({ tenant });
        res.status(201).json({ status: 'ok', message: 'Cost Centers found successfully', data: costCenters });
    } catch (err) {
        res.status(400).json({ status: 'error', message: `Error finding cost centers: ${err.message}`, data: null });
    }
}

const updateCostCenter = async (req, res) => {
    try {
        const { _id } = req.params;
        const { body, tenant } = req;

        const costCenter = await CostCenter.findByIdAndUpdate({ _id, tenant }, body, { new: true });

        res.status(200).json({ status: 'ok', message: 'Cost Center updated successfully', data: costCenter });
    } catch (err) {
        res.status(400).json({ status: 'error', message: `Error updating cost center: ${err.message}`, data: null });
    }
}

const deleteCostCenter = async (req, res) => {
    try {
        const { _id } = req.params;
        const { tenant } = req;

        await CostCenter.findByIdAndDelete({ _id, tenant });

        res.status(200).json({ status: 'ok', message: 'Cost Center deleted successfully', data: null });
    } catch (err) {
        res.status(400).json({ status: 'error', message: `Error deleting cost center: ${err.message}`, data: null });
    }
}

module.exports = {
    createCostCenter,
    getCostCenter,
    getCostCenters,
    updateCostCenter,
    deleteCostCenter
};