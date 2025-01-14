const mongoose = require('mongoose');

const ClientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  apiKey: { type: String, required: true, unique: true },
  phone: { type: String },
  logo: { type: String }, // Ruta o URL del logo
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Client', ClientSchema);
