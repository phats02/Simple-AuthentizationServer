const app = require('express')
const router = app.Router()
const homeC = require("../controller/home.c")
router.get('/', homeC.home)
router.get('/category/:id(\\d+)', homeC.getProductsPage)
router.get('/getsize/:id(\\d+)', homeC.getSizeCategory)
router.get('/getProducts/:id(\\d+)',homeC.getProducts)

module.exports = router
