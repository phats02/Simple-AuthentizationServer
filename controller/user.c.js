const e = require('express')

exports.login = async (req, res, next) => {
    res.render('login', {
        title: 'Login'
    })
}
exports.OAuth2 = async (req, res, next) => {
    res.redirect('http://localhost:3113/oauth2')
}
exports.getOAuth2 = async (req, res, next) => {
    const token=req.query.token
    res.cookie('jwt', token, { maxAge: 60*60*60, httpOnly: true,secure:false});
    return res.redirect('/home')
}
exports.logout=async(req,res,next)=>{
    res.cookie('jwt','',{ maxAge:1, httpOnly: true, })
    res.redirect('/')
}