const mongoose = require('mongoose');

const GuardSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    urbanizationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Urbanization', required: true },
    name: { type: String, required: true },
    tenantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Tenant' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Guard', GuardSchema);