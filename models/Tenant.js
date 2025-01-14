const mongoose = require("mongoose");

const tenantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    domain: {
        type: String, // Dominio único del tenant (e.g., cliente1.miapp.com)
        required: true,
        unique: true,
    },
    settings: {
        theme: {
            primaryColor: { type: String, default: "#0000FF" },
            logoUrl: { type: String },
        },
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Tenant = mongoose.model("Tenant", tenantSchema);

module.exports = Tenant;
