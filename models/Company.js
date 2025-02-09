const mongoose = require('mongoose');

const CompanySchema = new mongoose.Schema({
  name: { type: String, required: true },
  taxId: { type: String, unique: true }, // Registro único de contribuyentes (RUC)
  address: { type: String, required: true },
  phone: { type: String },
  email: { type: String },
  logo: { type: String }, // URL o ruta del logo de la empresa
  // Configuraciones generales de la urbanización o condominio
  settings: {
    commonAreas: [{ type: String }],
    currency: { type: String, default: 'USD' },
    timezone: { type: String },
    notificationPreferences: {
      email: { type: Boolean, default: false },
      inApp: { type: Boolean, default: false },
    },
  },
  tenant: { type: mongoose.Schema.Types.ObjectId, ref: 'Tenant', required: true }, // Relación con Tenant
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
}, { timestamps: true }); // 👈 timestamps maneja automáticamente `createdAt` y `updatedAt`

module.exports = mongoose.model('Company', CompanySchema);
