import React, { useEffect, useState } from "react";

function ListaUsuario() {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const res = await fetch("http://localhost:3001/api/usuarios/", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await res.json();
        console.log("Respuesta del backend:", data);
        if (res.ok) {
          setUsuarios(data);
        } else {
          console.error(data.mensaje || "Error al cargar usuarios");
        }
      } catch (err) {
        console.error("Error de conexión", err);
      }
    };

    fetchUsuarios();
  }, []);

  return (
    <div className="container mt-5">
      <h3>Lista de Usuarios</h3>
      <table className="table table-bordered table-hover mt-3">
        <thead className="thead-dark">
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Edad</th>
            <th>Teléfono</th>
            <th>Correo</th>
            <th>Rol</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <tr key={usuario._id}>
              <td>{usuario.nombre}</td>
              <td>{usuario.apellido}</td>
              <td>{usuario.edad}</td>
              <td>{usuario.telefono}</td>
              <td>{usuario.correo}</td>
              <td>{usuario.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListaUsuario;
