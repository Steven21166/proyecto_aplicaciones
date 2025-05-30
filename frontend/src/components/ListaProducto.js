import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ListaProducto = () => {
  const [productos, setProductos] = useState([]);
  const isLoggedIn = !!localStorage.getItem('token');

  useEffect(() => {
    const obtenerProductos = async () => {
      const res = await axios.get('http://localhost:3001/api/productos');
      setProductos(res.data);
    };
    obtenerProductos();
  }, []);

  const eliminarProducto = async (id) => {
    if (!isLoggedIn) return;
    await axios.delete(`http://localhost:3001/api/productos/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  };

  return (
    <div className='row'>
      {productos.map((prod) => (
        <div className='col-md-4 p-2' key={prod._id}>
          <div className='card'>
            <div className='card-header'>
              <h5>{prod.nombre}</h5>
            </div>
            <div className='card-body'>
              <p><strong>Categoría:</strong> {prod.categoria}</p>
              <p><strong>Precio:</strong> {prod.precio}</p> {/* ✅ quitado el "$" */}
              <p><strong>Stock:</strong> {prod.stock}</p>
            </div>
            {isLoggedIn && (
              <div className='card-footer'>
                <button
                  className='btn btn-danger'
                  onClick={() => eliminarProducto(prod._id)}
                >
                  Eliminar
                </button>
                <Link className='btn btn-primary m-1' to={`/edit-producto/${prod._id}`}>
                  Editar
                </Link>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListaProducto;
