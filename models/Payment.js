const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true }, // Relación con la empresa que usa el sistema
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Relación con el usuario que registra el cliente
  invoiceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Invoice' }, // Relación con la factura del cliente
  amount: { type: Number, required: true }, // Monto de la compra
  currency: { type: String, required: true }, // Moneda de la compra (USD, EUR, etc.)
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  paymentMethod: { type: String, required: true }, // Método de pago (efectivo, tarjeta de crédito, transferencia, etc.)
  paymentDate: { type: Date, default: Date.now },
  description: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Payment', PaymentSchema);
