const AccountingPeriod = require('../models/AccountingPeriods');
const JournalEntry = require('../models/JournalEntry');

const createAccountingPeriod = async (req, res) => {
    try {
        const { body, tenant } = req;
        body.tenant = tenant;

        const accountingPeriod = new AccountingPeriod(body);
        await accountingPeriod.save();
        res.status(201).json({ status: 'ok', message: 'Period created successfully', data: accountingPeriod });
    } catch (error) {
        res.status(400).json({ status: 'error', message: `Error creating Period: ${error.message}`, data: null });
    }
}

const getAccountingPeriods = async (req, res) => {
    try {
        const { tenant } = req;
        const accountingPeriods = await AccountingPeriod
            .find({ tenant })

        res.status(200).json({ status: 'ok', message: 'Periods found successfully', data: accountingPeriods });
    }
    catch (error) {
        res.status(400).json({ status: 'error', message: `Error finding Periods: ${error.message}`, data: null });
    }
}

const getAccountingPeriod = async (req, res) => {
    try {
        const { _id } = req.params;
        const { tenant } = req;
        const accountingPeriod = await AccountingPeriod.findOne({ _id, tenant })
        res.status(200).json({ status: 'ok', message: 'Period found successfully', data: accountingPeriod });
    }
    catch (error) {
        res.status(400).json({ status: 'error', message: `Error finding Period: ${error.message}`, data: null });
    }
}

const updateAccountingPeriod = async (req, res) => {
    try {
        const { _id } = req.params;
        const { body } = req;
        const accountingPeriod = await AccountingPeriod.findOneAndUpdate({ _id }, body, { new: true });
        res.status(200).json({ status: 'ok', message: 'Period updated successfully', data: accountingPeriod });
    }
    catch (error) {
        res.status(400).json({ status: 'error', message: `Error updating Period: ${error.message}`, data: null });
    }
}

const deleteAccountingPeriod = async (req, res) => {
    try {
        const { _id } = req.params;

        // valida que no tenga asientos contables asociados
        const hasJournalEntries = await JournalEntry.exists({ period: _id });
        if (hasJournalEntries) {
            return res.status(400).json({ status: 'error', message: 'Periodo tiene asientos contables asociados', data: null });
        }

        await AccountingPeriod.deleteOne({ _id });
        res.status(200).json({ status: 'ok', message: 'Period deleted successfully', data: null });
    }
    catch (error) {
        res.status(400).json({ status: 'error', message: `Error deleting Period: ${error.message}`, data: null });
    }
}

module.exports = {
    createAccountingPeriod,
    getAccountingPeriod,
    getAccountingPeriods,
    updateAccountingPeriod,
    deleteAccountingPeriod
}
