const mongoose = require('mongoose');

const LedgerAccountSchema = new mongoose.Schema({
    tenant: { type: mongoose.Schema.Types.ObjectId, ref: 'Tenant', required: true },
    code: { type: String, required: true },
    name: { type: String, required: true },
    type: { type: String, enum: ["asset", "liability", "equity", "income", "expense"], required: true },
    balance: { type: Number, default: 0 },
    level: { type: Number, required: true },
    parentAccount: { type: mongoose.Schema.Types.ObjectId, ref: 'LedgerAccount', required: false },
    created_at: { type: Date, default: Date.now, required: true },
    updated_at: { type: Date, required: false },
    description: { type: String, required: false },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' }
}, {
    timestamps: true,// Agrega createdAt y updatedAt automáticamente
    collection: 'ledgeraccounts'
});

// // populate sub_accounts
// LedgerAccountSchema.pre('find', function () {
//     this.populate('parentAccount');
// });

// LedgerAccountSchema.pre('findOne', function () {
//     this.populate('parentAccount');
// });

module.exports = mongoose.model('LedgerAccount', LedgerAccountSchema);
