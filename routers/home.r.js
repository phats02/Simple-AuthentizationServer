const app = require('express')
const router = app.Router()
const homeC = require("../controller/home.c")
const multer = require('multer')
var upload = multer({ storage: multer.memoryStorage({}) })

router.get('/', homeC.home)

module.exports = router
