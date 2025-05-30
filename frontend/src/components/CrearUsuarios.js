import React, { useState } from "react";

function CrearUsuarios() {
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    edad: "",
    telefono: "",
    username: "",
    password: "",
    role: "user",
  });

  const [mensaje, setMensaje] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3001/api/usuarios/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        setMensaje("Usuario registrado exitosamente.");
        setForm({
          nombre: "",
          apellido: "",
          edad: "",
          telefono: "",
          username: "",
          password: "",
          role: "user",
        });
      } else {
        setMensaje(data.mensaje || "Error al registrar.");
      }
    } catch (err) {
      console.error(err);
      setMensaje("Error de conexión.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{marginTop: '80px'}}>
      
      {mensaje && <div className="alert alert-info">{mensaje}</div>}
      <form
        onSubmit={handleSubmit}
        style={{
          border: "1px solid #ccc",
          padding: "30px",
          borderRadius: "10px",
          width: "100%",
          maxWidth: "500px",
          backgroundColor: "#f9f9f9",
        }}
      >
        <h3>Registrar Nuevo Usuario</h3>
        <input
          className="form-control mb-2"
          name="nombre"
          value={form.nombre}
          onChange={handleChange}
          placeholder="Nombre"
          required
        />
        <input
          className="form-control mb-2"
          name="apellido"
          value={form.apellido}
          onChange={handleChange}
          placeholder="Apellido"
          required
        />
        <input
          className="form-control mb-2"
          name="edad"
          type="number"
          value={form.edad}
          onChange={handleChange}
          placeholder="Edad"
          required
        />
        <input
          className="form-control mb-2"
          name="telefono"
          value={form.telefono}
          onChange={handleChange}
          placeholder="Teléfono"
          required
        />
        <input
          className="form-control mb-2"
          name="username"
          value={form.username}
          onChange={handleChange}
          placeholder="Correo electrónico"
          required
        />
        <input
          className="form-control mb-2"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Contraseña"
          required
        />
        <select
          className="form-control mb-3"
          name="role"
          value={form.role}
          onChange={handleChange}
        >
          <option value="user">Usuario</option>
          <option value="admin">Administrador</option>
        </select>
        <button className="btn btn-success w-100">Registrar</button>
      </form>
    </div>
  );
}

export default CrearUsuarios;
