const mongoose = require('mongoose');

const JournalEntrySchema = new mongoose.Schema({
    tenant: { type: mongoose.Schema.Types.ObjectId, ref: "Tenant", required: true },
    reference: { type: String, required: true, unique: true },
    description: { type: String },
    date: { type: Date, required: true },
    details: [{ type: mongoose.Schema.Types.ObjectId, ref: "JournalEntryDetail" }],
    createdAt: { type: Date, default: Date.now }
});

const JournalEntry = mongoose.model("JournalEntry", JournalEntrySchema);

module.exports = JournalEntry;
