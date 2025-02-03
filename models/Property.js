const mongoose = require('mongoose');

const PropertySchema = new mongoose.Schema({
    urbanizationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Urbanization', required: true },
    unitType: { type: String, enum: ['house', 'apartment', 'studio', 'duplex', 'townhouse', 'penthouse', 'villa', 'flat'], default: 'house', required: true },
    unitNumber: { type: String, required: true },
    ownershipType: {
        type: String,
        enum: ['owner-occupied', 'tenant-occupied'],
        required: true,
        default: 'owner-occupied'
    }, // Define si la propiedad está ocupada por el propietario o inquilino.
    residents: {
        type: [{
            name: { type: String, required: true }, // Nombre del residente
            subname: { type: String, required: true }, // Apellido del residente
            identification: { type: String, required: true, unique: true }, // Identificación única
            email: { type: String, required: true, unique: true }, // Email único
            phoneNumber: { type: String }, // Número de teléfono (opcional)
            emergencyContact: { type: String }, // Contacto de emergencia (opcional)
            notes: { type: String }, // Notas adicionales (opcional)
        }],
        default: []
    },
    billing: {
        invoices: [{
            invoiceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Invoice', required: true },
        }],
        paymentMethods: [{
            paymentMethod: { type: String, required: true },
            accountNumber: { type: String, required: true },
            accountHolder: { type: String, required: true },
            bankName: { type: String, required: true },
        }],
    },
    electronicInvoiceEnabled: { type: Boolean, default: false },
    ownerBillingInfo: {
        nameOrBusinessName: { type: String },
        taxId: { type: String },
        billingAddress: { type: String },
        email: { type: String },
        phoneNumber: { type: String },
    },
    tenant: { type: mongoose.Schema.Types.ObjectId, ref: 'Tenant', required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
}, { timestamps: true });

module.exports = mongoose.model('Property', PropertySchema);
