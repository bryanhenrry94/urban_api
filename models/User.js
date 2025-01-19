const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['owner', 'admin', 'user', 'guard'], default: 'admin' },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  urbanizationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Urbanization', default: null },
  residentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Resident', default: null },
  tenantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Tenant' },
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
