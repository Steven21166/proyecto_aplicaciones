const categoriaCtrl = {}

const Categoria = require ('../models/Categoria')

categoriaCtrl.getCategoria = async (req, res) => {
    const categorias = await Categoria.find()
    res.json(categorias)
}

categoriaCtrl.addCategoria = async (req, res) => {
    const {idCategoria, nombre, descripcion} = req.body;
    const newCategoria = new Categoria ({
        idCategoria: idCategoria,
        nombre : nombre,
        descripcion : descripcion
    })
    await newCategoria.save();
    res.json({message: 'Categoría agregada'})
}

categoriaCtrl.getCategorias = async (req, res) => {
    const categoria = await Categoria.findById (req.params.id)
    res.json(categoria)
}

categoriaCtrl.deleteCategoria = async (req, res) => {
    await Categoria.findByIdAndDelete (req.params.id)
    res.json ({message: 'Categoría eliminada'})
}

categoriaCtrl.updateCategoria = async (req, res) => {
    const {idCategoria, nombre, descripcion} = req.body;
    await Categoria.findByIdAndUpdate (req.params.id, {
        idCategoria,
        nombre,
        descripcion
    })
    res.json ({message: 'La categoria ha sido modificada'})
}

module.exports = categoriaCtrl;


