const JournalEntry = require('../models/JournalEntry');
const JournalEntryDetail = require('../models/JournalEntryDetail');

const createJournalEntry = async (req, res) => {
    try {
        const { body, tenant } = req;
        const { date, reference, description, details } = body;

        if (!details || details.length === 0) {
            return res.status(400).json({ status: "error", message: "Los detalles no pueden estar vacíos", data: null });
        }

        // Valida que el asiento este cuadrado
        const totalDebit = details.reduce((acc, { debit }) => acc + debit, 0);
        const totalCredit = details.reduce((acc, { credit }) => acc + credit, 0);

        if (totalDebit !== totalCredit) {
            return res.status(400).json({ status: "error", message: "El débito y el crédito deben ser iguales", data: null });
        }

        // valida referencias unicas
        const existReference = await JournalEntry.findOne({ reference, tenant });

        if (existReference) {
            return res.status(400).json({ status: "error", message: `Ya existe un registro con la referencia ${reference}`, data: null });
        }

        // Crear y guardar la cabecera
        const journalEntry = await JournalEntry.create({
            tenant,
            date,
            reference,
            description
        });

        // Preparar los detalles del asiento contable
        const journalEntryDetails = details.map(({ ledgerAccount, debit, credit, costCenter }) => ({
            tenant,
            ledgerAccount,
            debit: debit || 0,
            credit: credit || 0,
            costCenter: costCenter || null,
            journalEntry: journalEntry._id,
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
            populate: { path: 'ledgerAccount costCenter' }
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
        const { date, reference, description, details } = body;

        if (!details || details.length === 0) {
            return res.status(400).json({ status: "error", message: "Detalle no puede ser vacio", data: null });
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
            { date, reference, description },
            { new: true }
        );

        // Eliminar los detalles existentes
        await JournalEntryDetail.deleteMany({ journalEntry: journalEntry._id });

        // Preparar los nuevos detalles del asiento contable
        const journalEntryDetails = details.map(({ ledgerAccount, debit, credit, costCenter }) => ({
            tenant,
            ledgerAccount,
            debit: debit || 0,
            credit: credit || 0,
            costCenter: costCenter || null,
            journalEntry: journalEntry._id,
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

        await JournalEntry.findByIdAndDelete({ _id, tenant });

        res.status(200).json({ status: 'ok', message: 'Journal Entry deleted successfully', data: null });
    } catch (err) {
        res.status(400).json({ status: 'error', message: `Error al eliminar el asiento contable: ${err.message}`, data: null });
    }
}

module.exports = {
    createJournalEntry,
    getJournalEntry,
    getJournalEntries,
    updateJournalEntry,
    deleteJournalEntry
}
