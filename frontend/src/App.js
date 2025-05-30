import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Navegacion from './components/Navegacion';
import ListaProducto from './components/ListaProducto';
import ListaUsuario from './components/ListaUsuario';
import CrearUsuarios from './components/CrearUsuarios';
import AñadirProducto from './components/AñadirProducto';
import Inicio from './components/Inicio';

function App() {
  const handleLogin = () => {
    console.log("Sesión iniciada");
    // Aquí puedes hacer algo más, como actualizar estado global si lo necesitas
  };

  const handleLogout = () => {
    localStorage.removeItem("nombreUsuario");
    window.location.href = "/";
  };

  return (
    <>
      <Navegacion onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/ListaProductos" element={<ListaProducto />} />
        <Route path="/ListaUsuario" element={<ListaUsuario />} />
        <Route path="/CrearUsuarios" element={<CrearUsuarios />} />
        <Route path="/AñadirProducto" element={<AñadirProducto />} />
      </Routes>
    </>
  );
}

export default App;
