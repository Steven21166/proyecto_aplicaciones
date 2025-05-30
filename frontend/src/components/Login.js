// src/components/Login.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login({ onLogin }) {
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:3001/api/usuarios/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ correo, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("nombreUsuario", data.usuario.nombre);
        if (onLogin) onLogin(); // ✅ solo si se pasó la prop
        navigate("/ListaProductos");
      } else {
        setError(data.mensaje || "Error al iniciar sesión");
      }
    } catch (err) {
      setError("Error de conexión con el servidor");
      console.error(err);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <form onSubmit={handleSubmit} className="bg-white p-4 shadow rounded">
        <h3 className="mb-3">Iniciar sesión</h3>

        <div className="mb-3">
          <label>Correo electrónico:</label>
          <input
            type="email"
            className="form-control"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label>Contraseña:</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {error && <div className="text-danger mb-3">{error}</div>}

        <button className="btn btn-primary w-100" type="submit">
          Iniciar Sesión
        </button>
      </form>
    </div>
  );
}

export default Login;
