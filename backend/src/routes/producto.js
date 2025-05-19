const {Router} = require ('express')
const router = Router()

const {getProduct, addProduct, getProducto, deleteProduct, updateProduct} = require('../controller/productocontroller')

router.route('/')
    .get(getProduct)
    .post(addProduct)

router.route('/:id')
    .get(getProducto)
    .delete(deleteProduct)
    .put(updateProduct)

module.exports = router;
