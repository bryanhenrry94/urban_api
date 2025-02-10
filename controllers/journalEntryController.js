const JournalEntry = require('../models/JournalEntry');
const JournalEntryDetail = require('../models/JournalEntryDetail');
const AccountingPeriod = require('../models/AccountingPeriods');

const createJournalEntry = async (req, res) => {
    try {
        const { body, tenant } = req;
        const { date, description, details } = body;

        if (!date || !description) {
            return res.status(400).json({ status: "error", message: "Fecha y descripción son requeridos", data: null });
        }

        if (!details || details.length === 0) {
            return res.status(400).json({ status: "error", message: "Los detalles no pueden estar vacíos", data: null });
        }

        // Valida que el asiento este cuadrado
        const totalDebit = details.reduce((acc, { debit }) => acc + debit, 0);
        const totalCredit = details.reduce((acc, { credit }) => acc + credit, 0);

        if (totalDebit !== totalCredit) {
            return res.status(400).json({ status: "error", message: "El débito y el crédito deben ser iguales", data: null });
        }

        // Obtiene el periodo contable abierto por rango de fechas
        const currentPeriod = await AccountingPeriod.findOne({ tenant, status: 'open', start_date: { $lte: date }, end_date: { $gte: date } });

        if (!currentPeriod) {
            return res.status(400).json({ status: "error", message: "El periodo contable no existe o esta cerrado", data: null });
        }

        // Crear y guardar la cabecera
        const journalEntry = await JournalEntry.create({
            tenant,
            date,
            description,
            period: currentPeriod._id
        });

        // Preparar los detalles del asiento contable
        const journalEntryDetails = details.map(({ account, debit, credit, cost_center }) => ({
            tenant,
            account,
            debit: debit || 0,
            credit: credit || 0,
            cost_center: cost_center || null,
            journal_entry: journalEntry._id,
        }));

        // Insertar los detalles en paralelo con `insertMany`
        const insertedDetails = await JournalEntryDetail.insertMany(journalEntryDetails);

        // Extraer los _id de los detalles insertados
        const detailIds = insertedDetails.map(detail => detail._id);

        // Actualizar la cabecera con los IDs de los detalles
        await JournalEntry.findByIdAndUpdate(journalEntry._id, { details: detailIds });

        res.status(201).json({
            status: "ok",
            message: "Journal Entry created successfully",
            data: journalEntry
        });

    } catch (err) {
        res.status(400).json({
            status: "error",
            message: `Error al crear el asiento contable: ${err.message}`,
            data: null
        });
    }
};

const getJournalEntry = async (req, res) => {
    try {
        const { _id } = req.params;
        const { tenant } = req;

        const journalEntry = await JournalEntry.findOne({ _id, tenant }).populate('details');
        res.status(201).json({ status: 'ok', message: 'Journal Entry found successfully', data: journalEntry });
    } catch (err) {
        res.status(400).json({ status: 'error', message: `Error al encontrar el asiento contable: ${err.message}`, data: null });
    }
}

const getJournalEntries = async (req, res) => {
    try {
        const { tenant } = req;

        const journalEntries = await JournalEntry.find({ tenant }).populate({
            path: 'details',
            populate: { path: 'account cost_center' }
        });

        res.status(201).json({ status: 'ok', message: 'Journal Entries found successfully', data: journalEntries });
    } catch (err) {
        res.status(400).json({ status: 'error', message: `Error al encontrar los asientos contables: ${err.message}`, data: null });
    }
}

const updateJournalEntry = async (req, res) => {
    try {
        const { _id } = req.params;
        const { body, tenant } = req;
        const { date, description, details } = body;

        if (!date || !description) {
            return res.status(400).json({ status: "error", message: "Fecha y descripción son requeridos", data: null });
        }

        if (!details || details.length === 0) {
            return res.status(400).json({ status: "error", message: "Detalle no puede ser vacio", data: null });
        }

        // Obtiene el periodo contable abierto por rango de fechas
        const currentPeriod = await AccountingPeriod.findOne({ tenant, status: 'open', start_date: { $lte: date }, end_date: { $gte: date } });
        if (!currentPeriod) {
            return res.status(400).json({ status: "error", message: "El periodo contable no existe o esta cerrado", data: null });
        }

        // Valida que el asiento este cuadrado
        const totalDebit = details.reduce((acc, { debit }) => acc + debit, 0);
        const totalCredit = details.reduce((acc, { credit }) => acc + credit, 0);

        if (totalDebit !== totalCredit) {
            return res.status(400).json({ status: "error", message: "El débito y el crédito deben ser iguales", data: null });
        }

        // Actualizar la cabecera
        const journalEntry = await JournalEntry.findByIdAndUpdate(
            { _id, tenant },
            { date, description, period: currentPeriod._id },
            { new: true }
        );

        // Eliminar los detalles existentes
        await JournalEntryDetail.deleteMany({ journal_entry: journalEntry._id });

        // Preparar los nuevos detalles del asiento contable
        const journalEntryDetails = details.map(({ account, debit, credit, cost_center }) => ({
            tenant,
            account,
            debit: debit || 0,
            credit: credit || 0,
            cost_center: cost_center || null,
            journal_entry: journalEntry._id,
        }));

        // Insertar los nuevos detalles en paralelo con `insertMany`
        const insertedDetails = await JournalEntryDetail.insertMany(journalEntryDetails);

        // Extraer los _id de los detalles insertados
        const detailIds = insertedDetails.map(detail => detail._id);

        // Actualizar la cabecera con los IDs de los detalles
        await JournalEntry.findByIdAndUpdate(journalEntry._id, { details: detailIds });

        res.status(200).json({
            status: 'ok',
            message: 'Asiento contable actualizado con éxito',
            data: journalEntry
        });
    } catch (err) {
        res.status(400).json({
            status: 'error',
            message: `Error al actualizar el asiento contable: ${err.message}`,
            data: null
        });
    }
}

const deleteJournalEntry = async (req, res) => {
    try {
        const { _id } = req.params;
        const { tenant } = req;

        const journalEntry = await JournalEntry.findOne({ _id, tenant });

        if (!journalEntry) {
            return res.status(400).json({ status: 'error', message: 'Asiento contable no encontrado', data: false });
        }

        const periodoIsOpen = await AccountingPeriod.findOne({ tenant, _id: journalEntry.period, status: 'open' });
        if (!periodoIsOpen) {
            return res.status(400).json({ status: 'error', message: 'El periodo contable no existe o está cerrado', data: false });
        }

        // elimina detalle del asiento contable
        await JournalEntryDetail.deleteMany({ journal_entry: _id, tenant });
        // elimina el asiento contable
        await JournalEntry.findByIdAndDelete({ _id, tenant });

        res.status(200).json({ status: 'ok', message: 'Journal Entry deleted successfully', data: true });
    } catch (err) {
        res.status(400).json({ status: 'error', message: `Error al eliminar el asiento contable: ${err.message}`, data: false });
    }
}

module.exports = {
    createJournalEntry,
    getJournalEntry,
    getJournalEntries,
    updateJournalEntry,
    deleteJournalEntry
}
