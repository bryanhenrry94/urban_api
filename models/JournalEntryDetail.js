const mongoose = require('mongoose');

// 📌 Modelo de Comprobante Contable Detalle (JournalEntryDetail)
const JournalEntryDetailSchema = new mongoose.Schema({
    tenant: { type: mongoose.Schema.Types.ObjectId, ref: "Tenant", required: true },
    journalEntry: { type: mongoose.Schema.Types.ObjectId, ref: "JournalEntry", required: true },
    ledgerAccount: { type: mongoose.Schema.Types.ObjectId, ref: "LedgerAccount", required: true },
    costCenter: { type: mongoose.Schema.Types.ObjectId, ref: "CostCenter", default: null },
    debit: { type: Number, required: true },
    credit: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now }
});

const JournalEntryDetail = mongoose.model("JournalEntryDetail", JournalEntryDetailSchema);

// populate sub_accounts
JournalEntryDetailSchema.pre('find', function () {
    this.populate('ledgerAccount');
});

JournalEntryDetailSchema.pre('findOne', function () {
    this.populate('ledgerAccount');
});


module.exports = JournalEntryDetail;