const app = require('express')
const router = app.Router()
const chatC = require("../controller/chat.c")

router.get('/',chatC.homePage)
module.exports = router
