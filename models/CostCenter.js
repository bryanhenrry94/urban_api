const mongoose = require('mongoose');

// 📌 Modelo de Centro de Costo (CostCenter)
const CostCenterSchema = new mongoose.Schema({
    tenant: { type: mongoose.Schema.Types.ObjectId, ref: "Tenant", required: true },
    name: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
}, {
    timestamps: true,
    collection: 'cost_centers'
});

const CostCenter = mongoose.model("CostCenter", CostCenterSchema);

module.exports = CostCenter;