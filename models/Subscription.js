const mongoose = require('mongoose');

const SubscriptionSchema = new mongoose.Schema({
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
  plan: { type: String, enum: ['free', 'premium'], default: 'premium' },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  paymentHistory: [{
    paymentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Payment', required: true },
    amount: { type: Number, required: true },
    currency: { type: String, required: true, default: 'USD' },
    paymentDate: { type: Date, required: true },
    status: { type: String, required: true, enum: ['pending', 'paid', 'failed'], default: 'paid' },
  }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
}, { timestamps: true });

module.exports = mongoose.model('Subscription', SubscriptionSchema);
