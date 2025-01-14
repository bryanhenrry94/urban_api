const mongoose = require('mongoose');

const CompanySchema = new mongoose.Schema({
  name: { type: String, required: true },
  ruc: { type: String, required: true, unique: true }, // Registro Único de Contribuyentes
  address: { type: String },
  phone: { type: String },
  email: { type: String, required: true },
  logo: { type: String }, // Ruta o URL para el logo de la empresa
  apiKey: { type: String, unique: true, required: true }, // Clave para autenticación de terceros
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Company', CompanySchema);
