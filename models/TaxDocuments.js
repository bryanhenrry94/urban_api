const mongoose = require('mongoose');

const TaxDocumentSchema = new mongoose.Schema({
    invoiceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Invoice', required: true },
    documentType: { type: String, required: true },
    documentNumber: { type: String, required: true },
    issueDate: { type: Date, required: true },
    authorizationCode: { type: String, required: true },
    xmlFile: { type: String, required: true },
    pdfFile: { type: String, required: true },
    status: { type: String, required: true, enum: ['draf', 'emit', 'rejected'] },
    tenant: { type: mongoose.Schema.Types.ObjectId, ref: 'Tenant' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('TaxDocument', TaxDocumentSchema);