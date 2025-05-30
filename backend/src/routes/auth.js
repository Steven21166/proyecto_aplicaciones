const express = require('express');
const router = express.Router();
const { login } = require('../controller/authController');

// Importa el controlador de registro de usuarios normales
const { register } = require('../controller/authUserController');

//Ruta para login de administrador
router.post('/login', login);

//Ruta para registro de usuarios comunes
router.post('/register-user', register);

module.exports = router;
