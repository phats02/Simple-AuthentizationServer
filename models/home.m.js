const db=require('./db.js')
var fs = require('fs')

module.exports={
    getAllCatogories: async()=>{
        const rs=await db.getAll("Categories")
        return rs
    }
}