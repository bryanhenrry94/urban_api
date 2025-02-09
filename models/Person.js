const mongoose = require('mongoose');

const PersonSchema = new mongoose.Schema(
  {
    tenant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tenant',
      required: true
    },
    type: {
      type: String,
      required: true,
      trim: true
    },
    name: {
      type: String,
      trim: true
    },
    surname: {
      type: String,
      trim: true
    },
    numberId: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    email: {
      type: String,
      lowercase: true,
      trim: true,
      unique: true,
      sparse: true, // Permite valores nulos sin afectar unicidad
      validate: {
        validator: v => !v || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
        message: props => `${props.value} is not a valid email!`
      }
    },
    phone: {
      type: String,
      trim: true
    },
    address: {
      type: String,
      trim: true
    },
    roles: {
      type: [{ type: String, enum: ['owner', 'resident', 'visitor', 'security', 'client', 'supplier', 'employee'] }],
      required: true
    },
    companyName: {
      type: String,
      trim: true,
      validate: {
        validator: function (v) {
          return !(v && !this.roles.includes('client') && !this.roles.includes('supplier'));
        },
        message: "Company name is only required for clients or suppliers."
      }
    }
  },
  {
    timestamps: true // Agrega createdAt y updatedAt automáticamente
  }
);

module.exports = mongoose.model('Person', PersonSchema);
