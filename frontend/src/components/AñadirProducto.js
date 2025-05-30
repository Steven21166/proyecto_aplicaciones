import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const AñadirProducto = () => {
  const [nombre, setNombre] = useState("");
  const [categoria, setCategoria] = useState("");
  const [precio, setPrecio] = useState(""); // 👉 se mantiene como string
  const [stock, setStock] = useState("");   // 👉 se mantiene como string

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const obtenerProducto = async () => {
        try {
          const res = await axios.get(`http://localhost:3001/api/productos/${id}`);
          setNombre(res.data.nombre);
          setCategoria(res.data.categoria);
          setPrecio(res.data.precio);
          setStock(res.data.stock);
        } catch (error) {
          console.error("Error al obtener producto:", error);
          alert("Error al obtener producto: " + (error.response?.data?.mensaje || error.message));
        }
      };
      obtenerProducto();
    }
  }, [id]);

  const handleSubmit = async (e) => {
  e.preventDefault();

  const producto = {
    nombre,
    categoria,
    precio,
    stock,
  };

  const token = localStorage.getItem("token");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    if (id) {
      await axios.put(`http://localhost:3001/api/productos/${id}`, producto, config);
    } else {
      await axios.post("http://localhost:3001/api/productos", producto, config);
    }
    navigate("/ListaProductos");
  } catch (error) {
    console.error("Error al guardar producto:", error.response?.data || error.message);
    alert("Error al guardar producto: " + (error.response?.data?.mensaje || error.message));
  }
};


  return (
    <div className="d-flex justify-content-center align-items-center" style={{ marginTop: '80px' }}>
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
        <h3>{id ? "Editar Producto" : "Registrar Nuevo Producto"}</h3>

        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">Nombre:</label>
          <input
            type="text"
            className="form-control"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Ej: Manzana"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="categoria" className="form-label">Categoría:</label>
          <input
            type="text"
            className="form-control"
            id="categoria"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            placeholder="Ej: Frutas"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="precio" className="form-label">Precio:</label>
          <input
            type="text"
            className="form-control"
            id="precio"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
            placeholder="Ej: $0.50 * lb"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="stock" className="form-label">Stock:</label>
          <input
            type="text"
            className="form-control"
            id="stock"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            placeholder="Ej: 5 paquetes"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          {id ? "Actualizar Producto" : "Agregar Producto"}
        </button>
      </form>
    </div>
  );
};

export default AñadirProducto;
