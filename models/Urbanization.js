const mongoose = require('mongoose');

const UrbanizationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    address: { type: String },
    services: [{
        name: { type: String },
        frequency: { type: String },
        rate: { type: Number },
    }],
    tenantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Tenant', required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Urbanization', UrbanizationSchema);
