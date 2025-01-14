const mongoose = require('mongoose');

const HouseSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['House', 'Apartment'],
        required: true,
        default: 'House',
    },
    block: {
        type: String,
    },
    lot: {
        type: String,
    },
    apartmentNumber: {
        type: String,
    },
    address: {
        type: String,
        required: true,
    },
    pictures: {
        type: [String], // Array de URLs para fotos
        default: [],
    },
    description: {
        type: String,
    },
    monthlyFee: {
        type: Number,
        required: true, // Valor de la cuota mensual
    },

}, { timestamps: true });

module.exports = mongoose.model('House', HouseSchema);
