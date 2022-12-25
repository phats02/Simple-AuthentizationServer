const app = require('express')
const router = app.Router()
const chatC = require("../controller/chat.c")
const multer = require('multer')
var upload = multer({ storage: multer.memoryStorage({}) })

router.get('/',chatC.homePage)
module.exports = router
