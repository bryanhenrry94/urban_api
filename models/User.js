const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  country: { type: String },
  phone: { type: String },
  role: { type: String, enum: ['owner', 'admin', 'user', 'guard'], default: 'admin' },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  tenant: { type: mongoose.Schema.Types.ObjectId, ref: 'Tenant' },
  company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
  subscription: { type: mongoose.Schema.Types.ObjectId, ref: 'Subscription' },
  codeOTP: { type: String },
  onboardingCompleted: { type: Boolean, default: false },
  property: { type: mongoose.Schema.Types.ObjectId, ref: 'Property', default: null },
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
