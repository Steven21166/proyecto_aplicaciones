const {Schema, model} = require('mongoose')

const productoSchema = new Schema({
    nombre: String,
    idcategoria: Number,
    precio: String,
    stock: String
},

{
    timestamps: true
});

module.exports = model ('Producto', productoSchema)