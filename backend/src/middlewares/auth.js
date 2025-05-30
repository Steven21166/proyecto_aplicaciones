const jwt = require('jsonwebtoken');

const verificarToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];  // Bearer token

  if (!token) {
    return res.status(403).json({ mensaje: 'Token no proporcionado' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = decoded;  // Guarda el usuario decodificado
    next();  // Continúa al siguiente middleware
  } catch (err) {
    return res.status(401).json({ mensaje: 'Token inválido' });
  }
};

const verificarAdmin = (req, res, next) => {
  if (req.usuario.role !== 'admin') {
    return res.status(403).json({ mensaje: 'Acceso solo para administradores' });
  }
  next();
};

module.exports = { verificarToken, verificarAdmin };
