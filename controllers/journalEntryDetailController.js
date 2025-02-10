const JournalEntryDetail = require('../models/JournalEntryDetail');

const createJournalEntryDetail = async (req, res) => {
    try {
        const { body, tenant } = req;
        body.tenant = tenant;

        const journalEntryDetail = new JournalEntryDetail(body);
        await journalEntryDetail.save();

        res.status(201).json({ status: 'ok', message: 'Journal Entry Detail created successfully', data: journalEntryDetail });
    } catch (err) {
        res.status(400).json({ status: 'error', message: `Error creating journal entry detail: ${err.message}`, data: null });
    }
}

const getJournalEntryDetail = async (req, res) => {
    try {
        const { _id } = req.params;
        const { tenant } = req;

        const journalEntryDetail = await JournalEntryDetail.findOne({ _id, tenant });
        res.status(201).json({ status: 'ok', message: 'Journal Entry Detail found successfully', data: journalEntryDetail });
    } catch (err) {
        res.status(400).json({ status: 'error', message: `Error finding journal entry detail: ${err.message}`, data: null });
    }
}

const getJournalEntryDetails = async (req, res) => {
    try {
        const { tenant } = req;

        const journalEntryDetails = await JournalEntry

        Detail.find({ tenant });
        res.status(201).json({ status: 'ok', message: 'Journal Entry Details found successfully', data: journalEntryDetails });
    }
    catch (err) {
        res.status(400).json({ status: 'error', message: `Error finding journal entry details: ${err.message}`, data: null });
    }
}

const updateJournalEntryDetail = async (req, res) => {
    try {
        const { _id } = req.params;
        const { body, tenant } = req;

        const journalEntryDetail = await JournalEntryDetail.findByIdAndUpdate({ _id, tenant }, body, { new: true });

        res.status(200).json({ status: 'ok', message: 'Journal Entry Detail updated successfully', data: journalEntryDetail });
    } catch (err) {
        res.status(400).json({ status: 'error', message: `Error updating journal entry detail: ${err.message}`, data: null });
    }
}

const deleteJournalEntryDetail = async (req, res) => {
    try {
        const { _id } = req.params;
        const { tenant } = req;

        await JournalEntryDetail.findByIdAndDelete({ _id, tenant });

        res.status(200).json({ status: 'ok', message: 'Journal Entry Detail deleted successfully', data: null });
    }
    catch (err) {
        res.status(400).json({ status: 'error', message: `Error deleting journal entry detail: ${err.message}`, data: null });
    }
}

module.exports = {
    createJournalEntryDetail,
    getJournalEntryDetail,
    getJournalEntryDetails,
    updateJournalEntryDetail,
    deleteJournalEntryDetail
}