const {Schema, model} = require('mongoose')

const categoriaSchema = new Schema({
    idCategoria: Number,
    nombre: String,
    descripcion: String
},

{
    timestamps: true
});

module.exports = model ('Categoria', categoriaSchema) 