const mongoose = require('mongoose');

const ChartAccountSchema = new mongoose.Schema({
    tenant: { type: mongoose.Schema.Types.ObjectId, ref: 'Tenant', required: true },
    code: { type: String, required: true },
    name: { type: String, required: true },
    type: { type: String, enum: ["asset", "liability", "equity", "income", "expense"], required: true },
    level: { type: Number, required: true },
    parent_account: { type: mongoose.Schema.Types.ObjectId, ref: 'ChartAccount', required: false },
}, {
    timestamps: true,
    collection: 'chart_accounts'
});

module.exports = mongoose.model('ChartAccount', ChartAccountSchema);
