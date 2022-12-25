const app = require('express')
const router = app.Router()
const homeC = require("../controller/home.auth.c")

const passport = require("passport")
router.get('/oauth2', homeC.home)
router.get('/login', homeC.login)
router.get('/register', homeC.regist)
router.post('/createACC', homeC.createACC)
router.post('/login', passport.authenticate('local', {
    successRedirect: '/home',
    failureRedirect: '/login?error=1'
}))

router.get('/home', homeC.home)
router.get('/logout', function (req, res, next) {
    req.logout(function (err) {
        if (err) { return next(err); }
        res.redirect('/login');
    })
})
router.post('/confirm',homeC.sendAuth)
router.get('/checkusername',homeC.checkUserName)
module.exports = router