import React from "react";
import { Link } from "react-router-dom";

function Navegacion({ onLogout }) {
  const nombreUsuario = localStorage.getItem("nombreUsuario");

  return (
    <nav className="navbar navbar-dark bg-dark p-3">
      <Link to="/" className="navbar-brand">Inicio</Link>
      <div>
        {nombreUsuario && (
          <>
            <Link to="/ListaProductos" className="btn btn-light mx-2">Productos</Link>
            <Link to="/CrearUsuarios" className="btn btn-light mx-2">Registrar Usuario</Link>
            <Link to="/ListaUsuario" className="btn btn-light mx-2">Lista Usuarios</Link>
            <Link to="/AñadirProducto" className="btn btn-light mx-2">Añadir Producto</Link>
            <span className="text-white me-2">Hola, {nombreUsuario}</span>
            <button onClick={onLogout} className="btn btn-danger">Logout</button>
          </>
        )}
        {!nombreUsuario && (
          <Link to="/login" className="btn btn-light">Login</Link>
        )}
      </div>
    </nav>
  );
}

export default Navegacion;
