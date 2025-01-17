const mongoose = require('mongoose');

const CompanySchema = new mongoose.Schema({
  name: { type: String, required: true },
  ruc: { type: String, required: true, unique: true }, // Registro Único de Contribuyentes
  address: { type: String },
  phone: { type: String },
  email: { type: String, required: true },
  logo: { type: String }, // Ruta o URL para el logo de la empresa
  settings: {
    commonAreas: [{ type: String }],
    currency: { type: String, default: 'USD' },
    timezone: { type: String },
    notificationPreferences: {
      email: [{ type: Boolean, default: true }],
      inApp: { type: Boolean, default: true },
    },
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Company', CompanySchema);
