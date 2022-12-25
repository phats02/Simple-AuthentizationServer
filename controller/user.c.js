const e = require('express')

exports.login=async(req,res,next)=>{
    res.render('login',{
        title:'Login'
    })
}
exports.OAuth2=async(req,res,next)=>{
    res.redirect('http://localhost:3113/oauth2')
}
exports.getOAuth2=async(req,res,next)=>{
    console.log(req.query)
}