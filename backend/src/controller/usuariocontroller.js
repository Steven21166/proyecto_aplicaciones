const usuarioCtrl = {};
const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Obtener todos los usuarios
usuarioCtrl.getUsu = async (req, res) => {
  const usuarios = await Usuario.find();
  res.json(usuarios);
};

// Crear usuario (puede ser usado para cargar admin desde Mongo)
usuarioCtrl.createUsu = async (req, res) => {
  const { nombre, apellido, correo, telefono, edad, password, rol } = req.body;
  const newUsu = new Usuario({
    nombre,
    apellido,
    correo,
    telefono,
    edad,
    password, // el modelo debe tener un pre-save para hashear
    rol
  });
  await newUsu.save();
  res.json({ message: "El usuario ha sido creado" });
};

// Obtener usuario por ID
usuarioCtrl.getUsuario = async (req, res) => {
  const usuario = await Usuario.findById(req.params.id);
  res.json(usuario);
};

// Eliminar usuario
usuarioCtrl.deleteUsu = async (req, res) => {
  await Usuario.findByIdAndDelete(req.params.id);
  res.json({ message: 'Usuario eliminado' });
};

// Actualizar usuario
usuarioCtrl.updateUsu = async (req, res) => {
  const { nombre, apellido, correo, telefono, edad } = req.body;
  await Usuario.findByIdAndUpdate(req.params.id, {
    nombre,
    apellido,
    correo,
    telefono,
    edad
  });
  res.json({ message: 'El usuario ha sido actualizado' });
};

// Login (único método que necesitas activo ahora)
usuarioCtrl.login = async (req, res) => {
  const { correo, password } = req.body;

  try {
    const usuario = await Usuario.findOne({ correo });
    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    const passwordValida = await bcrypt.compare(password, usuario.password);
    if (!passwordValida) {
      return res.status(401).json({ mensaje: 'Contraseña incorrecta' });
    }

    const token = jwt.sign(
      { id: usuario._id, nombre: usuario.nombre, role: usuario.role },
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    );

    res.json({
      token,
      usuario: {
        id: usuario._id,
        nombre: usuario.nombre,
        rol: usuario.rol
      }
    });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al iniciar sesión', error: error.message });
  }
};

module.exports = usuarioCtrl;
