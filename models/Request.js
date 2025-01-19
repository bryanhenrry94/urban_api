const mongoose = require("mongoose");

const RequestSchema = new mongoose.Schema({
    residentId: { type: mongoose.Schema.Types.ObjectId, ref: "Resident", required: true },
    urbanizationId: { type: mongoose.Schema.Types.ObjectId, ref: "Urbanization", required: true },
    type: { type: String, required: true, enum: ["payment", "message", "alert"] },
    message: { type: String, required: true },
    status: { type: String, enum: ["pending", "accepted", "denied"], default: "pending" },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Request', PropertySchema);
