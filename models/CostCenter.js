const mongoose = require('mongoose');

// 📌 Modelo de Centro de Costo (CostCenter)
const CostCenterSchema = new mongoose.Schema({
    tenant: { type: mongoose.Schema.Types.ObjectId, ref: "Tenant", required: true },
    name: { type: String, required: true },
    description: { type: String },
    createdAt: { type: Date, default: Date.now }
});

const CostCenter = mongoose.model("CostCenter", CostCenterSchema);

module.exports = CostCenter;