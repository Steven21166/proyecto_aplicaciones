const express = require('express')
const cors = require('cors')

const app = express ();
 
//configuracion 
app.set('port', process.env.PORT || 4000 )

//middlewares
app.use(cors())
app.use(express.json())

//rutas

app.get('/',(req, res)=>{
    res.send('Bienvenido a mi API red full');
})

//ruta para la API de usuarios
app.use('/api/usuarios', require('./routes/usuario'))

//ruta para la API de productos
app.use('/api/productos', require('./routes/producto'))

//ruta para la API de categorias 
app.use('/api/categorias', require('./routes/categoria'))

module.exports = app;