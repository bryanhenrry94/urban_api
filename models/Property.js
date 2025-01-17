const mongoose = require('mongoose');

const PropertySchema = new mongoose.Schema({
    companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
    name: { type: String, required: true },
    address: { type: String, required: true },
    owner: {
        personId: { type: mongoose.Schema.Types.ObjectId, ref: 'Person', required: true },
        name: { type: String, required: true },
        email: { type: String, required: true },
    },
    residents: [{
        personId: { type: mongoose.Schema.Types.ObjectId, ref: 'Person', required: true },
        name: { type: String, required: true },
        email: { type: String, required: true },
    }],
    type: { type: String, enum: ['owned', 'rented'], required: true, default: 'owned' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
}, { timestamps: true });

module.exports = mongoose.model('Property', PropertySchema);
