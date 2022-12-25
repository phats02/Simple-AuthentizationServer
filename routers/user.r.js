const app = require('express')
const router = app.Router()
const userC = require("../controller/user.c")
const passport = require("passport")

router.get('/login',userC.login)
router.get('/auth2/local',userC.OAuth2)
router.get('/auth/callback',userC.getOAuth2)
module.exports = router