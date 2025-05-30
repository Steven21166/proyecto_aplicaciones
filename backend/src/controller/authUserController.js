// src/controllers/authUserController.js
const Usuario = require('../models/Usuario');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
  try {
    console.log('📥 Body recibido en /register-user:', req.body);

    const { username, password, nombre, apellido, edad, telefono, correo } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'Faltan campos requeridos' });
    }

    const existingUser = await Usuario.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Nombre de usuario ya está en uso' });
    }

    const newUser = new Usuario({
      username,
      password,
      nombre,
      apellido,
      edad,
      telefono,
      correo,
      role: 'user'
    });

    console.log('🛠 Guardando nuevo usuario:', newUser);

    await newUser.save();

    console.log('✅ Usuario guardado. Generando token...');

    const token = jwt.sign(
      { id: newUser._id, role: newUser.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    console.log('🪪 Token generado:', token);

    res.status(201).json({
      message: 'Usuario registrado exitosamente',
      token,
      role: newUser.role,
      username: newUser.username,
      nombreCompleto: `${newUser.nombre} ${newUser.apellido}`,
    });
  } catch (error) {
    console.error('🔥 Error al registrar usuario:', error.message);
    console.error('📄 Stack trace:', error.stack);
    res.status(500).json({ message: 'Error al registrar el usuario' });
  }
};

module.exports = { register };
