const mongoose = require('mongoose');

const FiscalSettingSchema = new mongoose.Schema({
    urbanizationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Urbanization', required: true },
    companyIdFiscal: { type: String, required: true },
    companyName: { type: String, required: true },
    companyAddress: { type: String, required: true },
    defaultTaxRate: { type: Number, required: true },
    fiscalRegime: { type: String, required: true },
    electronicInvoiceEnabled: { type: Boolean, default: false },
    digitalSignature: {
        certificateFile: { type: String },
        certificatePassword: { type: String },
        certificateExpiration: { type: Date },
    },
    tenantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Tenant' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('FiscalSetting', FiscalSettingSchema);