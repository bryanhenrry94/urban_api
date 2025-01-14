const mongoose = require('mongoose');

const PersonSchema = new mongoose.Schema({
  name: { type: String, required: true },
  idType: { type: String, enum: ['cedula', 'ruc'], required: true }, // Tipo de identificación
  idNumber: { type: String, required: true }, // Cédula o RUC
  email: { type: String, unique: true },
  phone: { type: String },
  address: { type: String },
  roles: [{
    type: String,
    enum: ['customer', 'supplier', 'employee'],
    required: true
  }],
  companyName: { type: String },  // Solo si es cliente o proveedor
  logo: { type: String },  // URL o ruta del logo si es relevante
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
  createdAt: { type: Date, default: Date.now }, // Fecha de creación del registro
});

module.exports = mongoose.model('Person', PersonSchema);
