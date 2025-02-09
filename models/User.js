const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  tenant: { type: mongoose.Schema.Types.ObjectId, ref: 'Tenant' },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['owner', 'admin', 'resident', 'guard'], default: 'admin' },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  subscription: { type: mongoose.Schema.Types.ObjectId, ref: 'Subscription' },
  units: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Unit', default: [] }],
  profile: {
    name: { type: String },
    surname: { type: String },
    country: { type: String },
    phone: { type: String },
    avatarUrl: { type: String },
    documentId: { type: String }, // Número de identificación
    birthdate: { type: Date },
  },
  codeOTP: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Hash password before saving
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Hash password before updating
UserSchema.pre('findOneAndUpdate', async function (next) {
  const update = this.getUpdate();
  if (update.password) {
    update.password = await bcrypt.hash(update.password, 10);
  }
  next();
});

module.exports = mongoose.model('User', UserSchema);
