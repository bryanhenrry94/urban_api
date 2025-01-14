const Person = require('../models/Person.js');

const createPerson = async (req, res) => {
    try {
        const { body } = req;

        const person = new Person(body);
        await person.save();

        res.status(201).json({ status: 'ok', message: 'Person created successfully', data: person });
    } catch (err) {
        res.status(400).json({ status: 'error', message: `Error creating person: ${err.message}`, data: null });
    }
};

const getPeople = async (_, res) => {
    try {
        const people = await Person.find().populate({ path: 'companyId', as: 'Company' });
        
        res.status(201).json({ status: 'ok', message: 'People found successfully', data: people });
    } catch (err) {
        res.status(400).json({ status: 'error', message: `Error finding people: ${err.message}`, data: null });
    }
};

const getPerson = async (req, res) => {
    try {
        const { _id } = req.params;

        const person = await Person.findById({ _id });
        res.status(201).json({ status: 'ok', message: 'Person found successfully', data: person });
    } catch (err) {
        res.status(400).json({ status: 'error', message: `Error finding person: ${err.message}`, data: null });
    }
};

const updatePerson = async (req, res) => {
    try {
        const { _id } = req.params;
        const { body } = req;

        const person = await Person.findByIdAndUpdate(_id, body, { new: true });

        res.status(200).json({ status: 'ok', message: 'Person updated successfully', data: person });
    } catch (err) {
        res.status(400).json({ status: 'error', message: `Error updating person: ${err.message}`, data: null });
    }
};

const deletePerson = async (req, res) => {
    try {
        const { _id } = req.params;

        await Person.findByIdAndDelete(_id);

        res.status(200).json({ status: 'ok', message: 'Person deleted successfully', data: null });
    } catch (err) {
        res.status(400).json({ status: 'error', message: `Error deleting person: ${err.message}`, data: null });
    }
};

module.exports = { createPerson, getPerson, getPeople, updatePerson, deletePerson };