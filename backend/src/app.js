const express = require('express')
const cors = require('cors')
const Usuario = require('./models/Usuario'); // 👈 AGREGAR ESTA LÍNEA
const bcrypt = require('bcryptjs');              // 👈 También necesario para comparar contraseñas

const app = express ();
 
//configuracion 
app.set('port', process.env.PORT || 4000 )

//middlewares
app.use(cors())
app.use(express.json())

//rutas

app.get('/debug/login', async (req, res) => {
  try {
    const user = await Usuario.findOne({ username: 'admin' });
    if (!user) {
      console.log('❌ Usuario admin no encontrado');
      return res.send('❌ No se encontró el usuario admin');
    }

    console.log('🔎 Usuario encontrado:', user);

    const match = await bcrypt.compare('admin123', user.password);
    if (!match) {
      console.log('❌ Contraseña incorrecta');
      return res.send('❌ La contraseña no coincide');
    }

    res.send('✅ Login exitoso con admin/admin123');
  } catch (err) {
    console.error('🔥 Error en el login de prueba:', err.message);
    console.error('📄 Stack:', err.stack);
    res.status(500).send('❌ Error del servidor');
  }
});


//ruta para la API de usuarios
app.use('/api/usuarios', require('./routes/usuario'))

//ruta para la API de productos
app.use('/api/productos', require('./routes/producto'))

//ruta para la API de categorias 
app.use('/api/categorias', require('./routes/categoria'))

module.exports = app;