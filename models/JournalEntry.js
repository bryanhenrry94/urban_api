const mongoose = require('mongoose');

const JournalEntrySchema = new mongoose.Schema({
    tenant: { type: mongoose.Schema.Types.ObjectId, ref: "Tenant", required: true },
    date: { type: Date, required: true },
    description: { type: String },
    period: { type: mongoose.Schema.Types.ObjectId, ref: "AccountingPeriod", required: true },
    details: [{ type: mongoose.Schema.Types.ObjectId, ref: "JournalEntryDetail" }],
    createdAt: { type: Date, default: Date.now }
}, {
    timestamps: true,
    collection: 'journal_entries'
});

const JournalEntry = mongoose.model("JournalEntry", JournalEntrySchema);

module.exports = JournalEntry;
