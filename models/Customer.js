const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({
  company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true }, // Relación con la empresa que usa el sistema
  name: { type: String, required: true },
  email: { type: String },
  phone: { type: String },
  identification: { type: String, required: true }, // RUC o cédula de identificación
  address: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Customer', CustomerSchema);
