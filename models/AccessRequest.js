const mongoose = require('mongoose');

const AccessRequestSchema = new mongoose.Schema({
    urbanizationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Urbanization', required: true },
    residentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Resident', required: true },
    visitor: {
        name: { type: String, required: true },
        vehiclePlate: { type: String },
    },
    accessCode: { type: String, required: true },
    status: { type: String, enum: ["pending", "accepted", "denied"], default: "pending" },
    entryTime: { type: Date },
    exitTime: { type: Date },
    tenantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Tenant' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('AccessRequest', AccessRequestSchema);