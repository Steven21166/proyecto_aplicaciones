// createAdmin.js
require('dotenv').config();  // Para leer las variables del .env
const mongoose = require('mongoose');
const Usuario = require('./src/models/Usuario');  // ✅ Ruta correcta

const crearAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    const existeAdmin = await Usuario.findOne({ correo: 'admin@correo.com' });
    if (existeAdmin) {
      console.log('✅ El usuario administrador ya existe.');
      return process.exit(0);  // Salir sin error
    }

    // 🔒 NO hasheamos manualmente la contraseña — el modelo lo hace
    const admin = new Usuario({
      nombre: "Admin",
      apellido: "Principal",
      edad: 30,
      telefono: "0999999999",
      correo: "admin@correo.com",
      username: "admin",
      password: "admin123",  // Se hashea automáticamente por el pre('save')
      role: "admin",
    });

    await admin.save();
    console.log('🎉 Usuario administrador creado con éxito.');
    process.exit(0);
  } catch (err) {
    console.error('❌ Error al crear el admin:', err);
    process.exit(1);
  }
};

crearAdmin();
