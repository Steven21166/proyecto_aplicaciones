const { Schema, model } = require('mongoose');

const productoSchema = new Schema(
  {
    nombre: {
      type: String,
      required: true,
      trim: true,
    },
    categoria: {
      type: String,
      required: true,
      trim: true,
    },
    precio: {
      type: String,
      required: true,
      trim: true,
    },
    stock: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model('Producto', productoSchema);
