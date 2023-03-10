const app = require('express')
const router = app.Router()
const userC = require("../controller/user.c")
const passport = require("passport")

router.get('/login',userC.login)
router.get('/auth2/local',userC.OAuth2)
router.get('/auth/callback',userC.getOAuth2)
router.get('/logout',userC.logout)
router.get('/',passport.authenticate('jwt', {
    successRedirect: '/home',
    failureRedirect: '/login'
}))
module.exports = router