const mongoose = require('mongoose');

const AccountingPeriodSchema = new mongoose.Schema({
    tenant: { type: mongoose.Schema.Types.ObjectId, ref: 'Tenant', required: true },
    name: { type: String, required: true },
    start_date: { type: Date, required: true },
    end_date: { type: Date, required: true },
    status: { type: String, enum: ["open", "closed"], required: true },
}, {
    timestamps: true,
    collection: 'accounting_periods'
});

module.exports = mongoose.model('AccountingPeriod', AccountingPeriodSchema);
