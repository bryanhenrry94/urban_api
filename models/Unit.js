const mongoose = require('mongoose');

const UnitSchema = new mongoose.Schema({
    tenant: { type: mongoose.Schema.Types.ObjectId, ref: 'Tenant', required: true },
    type: { type: String, enum: ["house", "apartment"] },
    name: { type: String, required: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Propietario (usuario)
    residents: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
        default: null, // Permitir null en lugar de [],
        sparse: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Unit', UnitSchema);
