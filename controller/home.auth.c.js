const e = require('express')
const homeM = require('../models/home.auth.m')
var jwt = require('jsonwebtoken');
const { as } = require('pg-promise');
const { user } = require('../configs/cnStr');

exports.login = async (req, res, next) => {
    res.render('auth/signin', {
        title: 'Log in',
        error:(req.query.error) ? 'username or password incorrect':''
    })
}
exports.regist = async (req, res, next) => {
    res.render('auth/regist', {
        title: "Register"
    })
}
exports.createACC = (req, res, next) => {
    homeM.createAccount(req.body).then((result) => {
        if (result == -1) {
            res.render('auth/regist', {
                title: 'Log in',
                error: "username is exists"
            })
        }
        else {
            req.login(req.body, function(err) {
                if (err) { return next(err); }
                res.redirect('/home');
              });
        }
    })

}
exports.checkLogin = (req, res, next) => {
    homeM.checkSignIn(req.body).then((result) => {
        if (result == 1) {
            req.session.user = req.body.username
            res.render('home', {
                account: req.session.user,
                title: 'Home',
                success:1
            })
        }
        else {
            res.render('signin', {
                title: 'Log in',
                error:"username or password incorrect"
            })
        }
    })
}
exports.home = async (req, res, next) => {
    if (req.isAuthenticated()) {
        const user=await homeM.getInformationAccount(req.user)
        res.render('auth/home', {
            account: req.user,
            title: 'Home',
            success:1,
            user:user
        })
    }
    else {
        res.redirect('/login')
    }
}
exports.logout = (req, res, next) => {
    req.session.user = null
    res.redirect('/login')
}
exports.sendAuth=async (req,res,next)=>{
    const user=await homeM.getInformationAccount(req.session.passport.user)
    let payload={'username':user.Username,'FullName':user.FullName,"Address":user.Address,"liveTime":req.body['live-time']}
    const token = jwt.sign(payload, process.env.SECRET_KEY)
    res.redirect('http://localhost:20157/auth/callback?token='+token)   
}
exports.checkUserName=async(req,res,next)=>{
    const username=req.query.username
    const rs=await homeM.checkUsername(username)
    res.json(rs)
}