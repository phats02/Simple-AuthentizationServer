const e = require('express')
const homeM = require('../models/home.m')
var jwt = require('jsonwebtoken');

function formatURL(url) {
    if (url[0] == '/') url = url.slice(1, url.length)
    var lastIndexMark = url.lastIndexOf('?')
    if (lastIndexMark != -1) url = url.slice(0, lastIndexMark)
    if (url[url.length - 1] == -1) url = url.slice(0, url.length - 1)
    return url
}
exports.home = async (req, res, next) => {
    homeM.getAllCatogories().then((result) => {
        var noti = ""
        switch (req.query.noti) {
            case "edit_success":
                noti = "Chỉnh sửa Catagory thành công"
                break;
            case "create_success":
                noti = "Thêm Catagory thành công"
                break
            case "delete_success":
                noti = "Xoá Catagory thành công"
                break
        }
        res.render('home/home', {
            title: 'Home',
            categories: result,
            noti: noti,
            account: req.cookies ? jwt.decode(req.cookies.jwt).user:null
        })
    })
}