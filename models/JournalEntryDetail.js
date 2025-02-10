const mongoose = require('mongoose');

const JournalEntryDetailSchema = new mongoose.Schema({
    tenant: { type: mongoose.Schema.Types.ObjectId, ref: "Tenant", required: true },
    journal_entry: { type: mongoose.Schema.Types.ObjectId, ref: "JournalEntry", required: true },
    account: { type: mongoose.Schema.Types.ObjectId, ref: "ChartAccount", required: true },
    debit: { type: Number, required: true },
    credit: { type: Number, required: true },
    cost_center: { type: mongoose.Schema.Types.ObjectId, ref: "CostCenter", default: null },
    createdAt: { type: Date, default: Date.now }
}, {
    timestamps: true,
    collection: 'journal_entries_details'
});

const JournalEntryDetail = mongoose.model("JournalEntryDetail", JournalEntryDetailSchema);

// populate sub_accounts
JournalEntryDetailSchema.pre('find', function () {
    this.populate('ChartAccount');
});

JournalEntryDetailSchema.pre('findOne', function () {
    this.populate('ChartAccount');
});


module.exports = JournalEntryDetail;