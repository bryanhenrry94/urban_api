const mongoose = require('mongoose');

const ResidentSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    urbanization: { type: mongoose.Schema.Types.ObjectId, ref: 'Urbanization', required: true },
    property: { type: mongoose.Schema.Types.ObjectId, ref: 'Property', required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    tenant: { type: mongoose.Schema.Types.ObjectId, ref: 'Tenant', required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
}, { timestamps: true });

module.exports = mongoose.model('Resident', ResidentSchema);
