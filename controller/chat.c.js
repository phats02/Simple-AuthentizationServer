const e = require('express')
var jwt = require('jsonwebtoken');

exports.homePage= async(req,res,next)=>{
    res.render('chat/home',{
        title:"Chat",
        account: req.cookies ? jwt.decode(req.cookies.jwt).username : null
    })
}