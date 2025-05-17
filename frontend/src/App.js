import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Ajusta el puerto si tu backend escucha en otro
    axios.get('http://localhost:3001/api/usuarios')
      .then(res => {
        setUsuarios(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError('No se pudo cargar la lista de usuarios');
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Cargando usuarios…</p>;
  if (error)   return <p>Error: {error}</p>;

  return (
    <div className="App">
      <header className="App-header">
        <h1>Usuarios desde el Backend</h1>
        <ul>
          {usuarios.map(user => (
            <li key={user._id || user.id}>
              {user.nombre || user.name}
            </li>
          ))}
        </ul>
      </header>
    </div>
  );
}

export default App;

