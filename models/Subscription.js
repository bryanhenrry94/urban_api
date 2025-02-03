const mongoose = require('mongoose');

const SubscriptionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  plan: { type: String, enum: ['essential', 'advanced', 'enterprise'], default: 'essential' },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  amount: { type: Number, required: true },
  currency: { type: String, required: true, default: 'USD' },
  paymentHistory: [{
    paymentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Payment', required: true },
    amount: { type: Number, required: true },
    currency: { type: String, required: true, default: 'USD' },
    paymentDate: { type: Date, required: true },
    status: { type: String, required: true, enum: ['pending', 'paid', 'failed'], default: 'paid' },
  }],
  renewalDate: { type: Date, required: true, default: Date.now },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  canceledAt: { type: Date, default: null },
}, { timestamps: true });

module.exports = mongoose.model('Subscription', SubscriptionSchema);
