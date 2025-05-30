const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");

// Esquema del usuario
const usuarioSchema = new Schema(
  {
    nombre: String,
    apellido: String,
    edad: Number,
    telefono: String,
    correo: {
      type: String,
      required: true,
      unique: true,
    },

    // 🔒 Agregado: nombre de usuario único para login
    username: {
      type: String,
      required: true,
      unique: true,
    },

    // 🔒 Agregado: contraseña del usuario
    password: {
      type: String,
      required: true,
    },

    // 🧑‍💼 Agregado: rol del usuario (admin o user)
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

// 🔐 Agregado: hash automático de la contraseña antes de guardar
usuarioSchema.pre("save", async function (next) {
  // Solo encripta si la contraseña fue modificada o es nueva
  if (!this.isModified("password")) return next();

  try {
    // Generar "sal" y hashear contraseña
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Exportar modelo
module.exports = model("Usuario", usuarioSchema);
