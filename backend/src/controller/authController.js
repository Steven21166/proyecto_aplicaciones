const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
  const { username, password } = req.body;

  // 🧪 Agrega logs para depurar
  console.log('📥 Body recibido en login:', req.body);
  console.log('🛂 Username recibido:', username);
  console.log('🔐 Password recibido:', password);

  try {
    // Buscar usuario por nombre de usuario
    const user = await Usuario.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Comparar contraseñas (la ingresada y la guardada encriptada)
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    // Verificar que el usuario sea administrador
    if (user.role !== 'admin') {
      return res.status(403).json({ message: 'Acceso no autorizado' });
    }

    // Generar token JWT
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET, // Asegúrate de tener esta variable en tu .env
      { expiresIn: '1h' }
    );

    // Enviar token y rol
    res.json({
      token,
      role: user.role,
      username: user.username,
      nombreCompleto: `${user.nombre} ${user.apellido}`, // 👈 Nuevo campo agregado
    });



  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error del servidor' });
  }
};

module.exports = { login };
