const express = require('express');
const router = express.Router();

// ✅ Importar el middleware de verificación de token
const { verificarToken, verificarAdmin } = require("../middlewares/auth");

const usuarioController = require('../controller/usuariocontroller');

// ✅ Rutas públicas (sin token)
router.post('/login', usuarioController.login);
//router.post('/registrar', usuarioController.register); // Si aún no existe, coméntala

// ✅ Rutas protegidas (requieren token de admin)
router.get('/', verificarToken, verificarAdmin, usuarioController.getUsu);  // Aquí se usa verificarToken en lugar de verifyToken
router.post('/', usuarioController.createUsu);  // Lo mismo aquí
router.get('/:id', verificarToken, verificarAdmin, usuarioController.getUsuario);  // Y aquí
router.delete('/:id', verificarToken, verificarAdmin, usuarioController.deleteUsu);  // Aquí también
router.put('/:id', verificarToken, verificarAdmin, usuarioController.updateUsu);  // Y aquí

module.exports = router;
