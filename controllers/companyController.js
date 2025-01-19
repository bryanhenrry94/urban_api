const Company = require('../models/Company.js');
const crypto = require('crypto');

// Función para generar una API Key única
function generateApiKey() {
    return crypto.randomBytes(32).toString('hex'); // Genera una clave de 64 caracteres
}

const createCompany = async (req, res) => {
    try {
        const { body, tenantId } = req;
        // generate API key
        body.apiKey = generateApiKey();
        // Asigna Tenant
        body.tenantId = tenantId;
        // create company
        const company = new Company(body);
        await company.save();

        res.status(201).json({ status: 'ok', message: 'Company created successfully', data: company });
    } catch (err) {
        res.status(400).json({ status: 'error', message: `Error creating company: ${err.message}`, data: null });
    }
};

const getCompany = async (req, res) => {
    try {
        const { _id } = req.params;
        const { tenantId } = req;

        const company = await Company.findOne({ _id, tenantId });
        res.status(201).json({ status: 'ok', message: 'Company found successfully', data: company });
    } catch (err) {
        res.status(400).json({ status: 'error', message: `Error finding company: ${err.message}`, data: null });
    }
};

const getCompanies = async (req, res) => {
    try {
        const { tenantId } = req;

        const companies = await Company.find({ tenantId });
        res.status(201).json({ status: 'ok', message: 'Companies found successfully', data: companies });
    } catch (err) {
        res.status(400).json({ status: 'error', message: `Error finding companies: ${err.message}`, data: null });
    }
};

const updateCompany = async (req, res) => {
    try {
        const { _id } = req.params;
        const { body, tenantId } = req;

        const company = await Company.findByIdAndUpdate({ _id, tenantId }, body, { new: true });

        res.status(200).json({ status: 'ok', message: 'Company updated successfully', data: company });
    } catch (err) {
        res.status(400).json({ status: 'error', message: `Error updating company: ${err.message}`, data: null });
    }
};

const deleteCompany = async (req, res) => {
    try {
        const { _id } = req.params;
        const { tenantId } = req;

        await Company.findByIdAndDelete({ _id, tenantId });

        res.status(200).json({ status: 'ok', message: 'Company deleted successfully', data: null });
    } catch (err) {
        res.status(400).json({ status: 'error', message: `Error deleting company: ${err.message}`, data: null });
    }
};

module.exports = { createCompany, getCompany, getCompanies, updateCompany, deleteCompany };