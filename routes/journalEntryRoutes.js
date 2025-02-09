const express = require('express');

const {
    createJournalEntry,
    getJournalEntry,
    getJournalEntries,
    updateJournalEntry,
    deleteJournalEntry } = require('../controllers/journalEntryController');

const router = express.Router();

const { verifyToken } = require('../middlewares/authMiddleware');
const { tenantMiddleware } = require('../middlewares/tenantMiddleware');

router.post('/', [verifyToken, tenantMiddleware], createJournalEntry);
router.get('/', [verifyToken, tenantMiddleware], getJournalEntries);
router.get('/:_id', [verifyToken, tenantMiddleware], getJournalEntry);
router.put('/:_id', [verifyToken, tenantMiddleware], updateJournalEntry);
router.delete('/:_id', [verifyToken, tenantMiddleware], deleteJournalEntry);

module.exports = router;