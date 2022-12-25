const e = require('express')

exports.homePage= async(req,res,next)=>{
    res.render('chat/home',{
        title:"Chat",

    })
}