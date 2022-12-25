const app = require('express')
const router = app.Router()
const homeC = require("../controller/home.c")
const multer = require('multer')
var upload = multer({ storage: multer.memoryStorage({}) })

router.get('/', homeC.home)
router.get('/category/:id(\\d+)', homeC.getProductsPage)
router.get('/getsize/:id(\\d+)', homeC.getSizeCategory)
router.get('/getProducts/:id(\\d+)',homeC.getProducts)


module.exports = router
