// src/controller/productocontroller.js
const Producto = require('../models/Producto');

const productoCtrl = {};

// Función para obtener productos
productoCtrl.getProduct = async (req, res) => {
  try {
    const productos = await Producto.find();
    res.json(productos);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener productos', error: error.message });
  }
};

// Función para agregar productos
productoCtrl.addProduct = async (req, res) => {
  const { nombre, categoria, precio, stock } = req.body;
  try {
    const newProduct = new Producto({ nombre, categoria, precio, stock });
    await newProduct.save();
    res.status(201).json({ message: 'Producto creado', producto: newProduct });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear el producto', error: error.message });
  }
};

// Función para obtener un solo producto
productoCtrl.getProducto = async (req, res) => {
  try {
    const producto = await Producto.findById(req.params.id);
    if (!producto) {
      return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }
    res.json(producto);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener el producto', error: error.message });
  }
};

// Función para eliminar un producto
productoCtrl.deleteProduct = async (req, res) => {
  try {
    const producto = await Producto.findByIdAndDelete(req.params.id);
    if (!producto) {
      return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }
    res.json({ message: 'Producto eliminado' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar el producto', error: error.message });
  }
};

// Función para actualizar un producto
productoCtrl.updateProduct = async (req, res) => {
  const { nombre, categoria, precio, stock } = req.body;
  try {
    const producto = await Producto.findByIdAndUpdate(
      req.params.id,
      { nombre, categoria, precio, stock },
      { new: true }  // Devuelve el producto actualizado
    );
    if (!producto) {
      return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }
    res.json({ message: 'Producto actualizado', producto });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar el producto', error: error.message });
  }
};

module.exports = productoCtrl;
