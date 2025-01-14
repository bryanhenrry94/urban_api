const mongoose = require('mongoose');

const ApiKeySchema = new mongoose.Schema({
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
  key: { type: String, required: true, unique: true },
  permissions: { type: [String], default: ['read', 'write'] }, // Ejemplo: permisos
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ApiKey', ApiKeySchema);
