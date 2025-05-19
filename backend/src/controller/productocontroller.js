const productoCtrl = {}

const Producto = require ('../models/Producto')

productoCtrl.getProduct = async (req, res) => {
    const productos = await Producto.find()
    res.json(productos)
}

productoCtrl.addProduct = async (req, res) => {
    const {nombre, idcategoria, precio, stock} = req.body;
    const newProduct = new Producto({
        nombre : nombre, 
        idcategoria: idcategoria,
        precio : precio,
        stock : stock,
    })
    await newProduct.save();
    res.json({message: 'El producto ha sido añadido'})
}

productoCtrl.getProducto = async(req, res) => {
    const producto = await Producto.findById(req.params.id)
    res.json(producto) 
}

productoCtrl.deleteProduct = async(req, res) => {
    await Producto.findByIdAndDelete(req.params.id)
    res.json({message: 'El producto ha sido eliminado'})
}

productoCtrl.updateProduct = async(req, res) => {
    const {nombre, idcategoria, precio, stock} = req.body;
    await Producto.findByIdAndUpdate(req.params.id, {
        nombre,
        idcategoria,
        precio,
        stock
    })
    res.json({message: 'El producto ha sido actualizado'})
}

module.exports = productoCtrl;