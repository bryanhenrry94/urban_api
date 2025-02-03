const mongoose = require('mongoose');

const PersonSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, validate: { validator: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), message: props => `${props.value} is not a valid email!` } },
  identification: { type: String, required: true },
  phone: { type: String },
  address: { type: String },
  roles: [{ type: String, enum: ['owner', 'resident', 'visitor'], required: true }],
  country: { type: String },
  companyName: { type: String },  // Solo si es cliente o proveedor
  tenant: { type: mongoose.Schema.Types.ObjectId, ref: 'Tenant' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Person', PersonSchema);