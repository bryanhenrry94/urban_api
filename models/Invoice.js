const mongoose = require('mongoose');

const InvoiceSchema = new mongoose.Schema({
  urbanizationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Urbanization', required: true },
  propertyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Property', required: true },
  issuedTo: [{
    personId: { type: mongoose.Schema.Types.ObjectId, ref: 'Person', required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
  }],
  items: [{
    description: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    total: { type: Number, required: true },
  }],
  subtotal: { type: Number, required: true },
  tax: { type: Number, required: true }, // IVA (12% en Ecuador)
  total: { type: Number, required: true },
  paid: { type: Number, default: 0 },
  balance: { type: Number, default: 0 },
  paymentHistory: [{
    paymentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Payment', required: true },
    amount: { type: Number, required: true },
    paymentMethod: { type: String, required: true },
    reference: { type: String },
    paymentDate: { type: Date, default: Date.now },
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  }],
  status: { type: String, enum: ['draft', 'sent', 'paid'], default: 'draft' },
  issueDate: { type: Date, default: Date.now },
  authorizationCode: { type: String }, // Código de autorización SRI
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Invoice', InvoiceSchema);
