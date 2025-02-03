const mongoose = require('mongoose');

const CompanySchema = new mongoose.Schema({
  name: { type: String, required: true },
  identification: { type: String, unique: true }, // Registro Único de Contribuyentes
  address: { type: String, required: true },
  phone: { type: String },
  email: { type: String },
  logo: { type: String }, // Ruta o URL para el logo de la empresa
  settings: {
    commonAreas: [{ type: String }],
    currency: { type: String, default: 'USD' },
    timezone: { type: String },
    notificationPreferences: {
      email: [{ type: Boolean, default: false }],
      inApp: { type: Boolean, default: false },
    },
  },
  tenant: { type: mongoose.Schema.Types.ObjectId, ref: 'Tenant', required: true },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Company', CompanySchema);
