const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
  estado: {
    type: String,
    enum: ['Activo', 'Inactivo'],
    required: true,
    default: 'Activo',
  },
  codigoPrincipal: {
    type: String,
    required: true,
    unique: true,
  },
  codigoAuxiliar: {
    type: String,
  },
  categoria: {
    type: String,
    required: true,
  },
  nombre: {
    type: String,
    required: true,
  },
  tipo: {
    type: String,
    enum: ['Service', 'Product'],
    required: true,
  },
  medida: {
    type: String,
  },
  foto: {
    type: [String], // Array de URLs para fotos
    default: [],
  },
  descripcion: {
    type: String,
  },
  codigoCatalogo: {
    type: String,
  },
  precios: {
    PVP1: { type: Number, required: true },
    PVP2: { type: Number },
    PVP3: { type: Number },
    PVPDistribuidor: { type: Number },
    PVPManual: { type: Number },
  },
  IVA: {
    type: Number,
    required: true, // Porcentaje del IVA (por ejemplo, 12%)
  },
  cuentasContables: {
    ingreso: { type: String },
    costo: { type: String },
  },
  configuraciones: {
    ParaPOS: { type: Boolean, default: false },
    ParaControlStock: { type: Boolean, default: false },
    ManejaBalanza: { type: Boolean, default: false },
  },
  inventario: {
    stockActual: {
      type: Number,
      default: 0,
    },
    stockMinimo: {
      type: Number,
      default: 0,
    },
    stockMaximo: {
      type: Number,
      default: 0,
    },
  },
}, { timestamps: true });

// Middleware para manejar diferencias entre Producto y Servicio
ItemSchema.pre('save', function (next) {
  if (this.tipo === 'Servicio') {
    this.configuraciones.ParaControlStock = false;
    this.inventario = undefined; // Eliminar datos de inventario para servicios
  }
  next();
});

module.exports = mongoose.model('Item', ItemSchema);
