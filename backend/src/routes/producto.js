// src/routes/producto.js
const { Router } = require('express');
const router = Router();

const { getProduct, addProduct, getProducto, deleteProduct, updateProduct } = require('../controller/productocontroller');
const { verificarToken, verificarAdmin } = require('../middlewares/auth'); // <-- Importa correctamente

router.route('/')
    .get(getProduct)
    .post(verificarToken, verificarAdmin, addProduct); // <-- Usa verificarToken y verificarAdmin

router.route('/:id')
    .get(getProducto)
    .delete(verificarToken, verificarAdmin, deleteProduct)
    .put(verificarToken, verificarAdmin, updateProduct);

module.exports = router;
