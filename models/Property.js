const mongoose = require('mongoose');

const PropertySchema = new mongoose.Schema({
    urbanizationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Urbanization', required: true },
    unitType: { type: String, enum: ['house', 'apartment', 'studio', 'duplex', 'townhouse', 'penthouse', 'villa', 'flat'], default: 'house', required: true },
    unitNumber: { type: String, required: true },
    residents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Resident' }],
    tenantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Tenant', required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
}, { timestamps: true });

module.exports = mongoose.model('Property', PropertySchema);
