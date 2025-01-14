const Company = require('../models/Company.js');
const crypto = require('crypto');

// Función para generar una API Key única
function generateApiKey() {
    return crypto.randomBytes(32).toString('hex'); // Genera una clave de 64 caracteres
}

const createCompany = async (req, res) => {
    try {
        const { body } = req;

        // generate API key
        body.apiKey = generateApiKey();

        console.log('Data Body:', body);

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

        const company = await Company.findById({ _id });
        res.status(201).json({ status: 'ok', message: 'Company found successfully', data: company });
    } catch (err) {
        res.status(400).json({ status: 'error', message: `Error finding company: ${err.message}`, data: null });
    }
};

const getCompanies = async (req, res) => {
    try {
        const companies = await Company.find();
        res.status(201).json({ status: 'ok', message: 'Companies found successfully', data: companies });
    } catch (err) {
        res.status(400).json({ status: 'error', message: `Error finding companies: ${err.message}`, data: null });
    }
};

const updateCompany = async (req, res) => {
    try {
        const { _id } = req.params;
        const { body } = req;

        const company = await Company.findByIdAndUpdate(_id, body, { new: true });

        res.status(200).json({ status: 'ok', message: 'Company updated successfully', data: company });
    } catch (err) {
        res.status(400).json({ status: 'error', message: `Error updating company: ${err.message}`, data: null });
    }
};

const deleteCompany = async (req, res) => {
    try {
        const { _id } = req.params;

        await Company.findByIdAndDelete(_id);

        res.status(200).json({ status: 'ok', message: 'Company deleted successfully', data: null });
    } catch (err) {
        res.status(400).json({ status: 'error', message: `Error deleting company: ${err.message}`, data: null });
    }
};

module.exports = { createCompany, getCompany, getCompanies, updateCompany, deleteCompany };