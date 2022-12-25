const e = require('express')
const homeM = require('../models/home.m')
const db = require('../models/db');
const PER_PAGE=6
var jwt = require('jsonwebtoken');

function formatURL(url) {
    if (url[0] == '/') url = url.slice(1, url.length)
    var lastIndexMark = url.lastIndexOf('?')
    if (lastIndexMark != -1) url = url.slice(0, lastIndexMark)
    if (url[url.length - 1] == -1) url = url.slice(0, url.length - 1)
    return url
}
exports.home = async (req, res, next) => {
    try {
        const catgories = await homeM.getAllCatogories()
        res.render('home/home', {
            title: 'Home',
            categories: catgories,
            account: req.cookies ? jwt.decode(req.cookies.jwt).username : null
        })
    }
    catch (err) {
        next(err)
    }
}
exports.getProductsPage = async (req, res, next) => {
    try {
        const products=await homeM.getAllProducts(req.params.id,0,PER_PAGE)
        res.render('home/products', {
            title: 'Products',
            currentURL: formatURL(req.originalUrl),
            account: req.cookies ? jwt.decode(req.cookies.jwt).username : null

        })
    }
    catch(err){
        next(err)
    }
}
exports.getSizeCategory=async (req,res,next)=>{
    try{
        const size=await homeM.getSizeCategory(req.params.id)
        return res.json(size[0])
    }
    catch(err){

    }
}
exports.getProducts=async (req,res,next)=>{
    const products=await homeM.getAllProducts(req.params.id,req.query.page || 0,PER_PAGE)
    res.json(products)
}