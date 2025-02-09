const express = require('express');

const { createJournalEntryDetail,
    getJournalEntryDetail,
    getJournalEntryDetails,
    updateJournalEntryDetail,
    deleteJournalEntryDetail } = require('../controllers/journalEntryDetailController');

const router = express.Router();

router.post('/', createJournalEntryDetail);
router.get('/', getJournalEntryDetails);
router.get('/:id', getJournalEntryDetail);
router.put('/:id', updateJournalEntryDetail);
router.delete('/:id', deleteJournalEntryDetail);

module.exports = router;