const {Router} = require('express')
const router = Router()

const {getCategoria, addCategoria, getCategorias, deleteCategoria, updateCategoria} = require ('../controller/categoriacontroller')

router.route ('/')
    .get(getCategoria)
    .post(addCategoria)

router.route ('/:id')
    .get(getCategorias)
    .delete(deleteCategoria)
    .put(updateCategoria)

module.exports = router;