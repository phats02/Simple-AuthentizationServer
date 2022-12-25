const db=require('./db.js')
var fs = require('fs')

module.exports={
    getAllCatogories: async()=>{
        const rs=await db.getAll("Categories")
        return rs
    },
    getAllProducts:async(CatId,page,PerPage)=>{
        const rs=await db.query(`Select * from "Products" where "Products"."CategoryID"=${CatId} order by "Products"."ProductID" offset ${page*PerPage} limit ${PerPage}`)
        return rs
    },
    getSizeCategory:async(CatId)=>{
        const rs=await db.query(`Select count("Products"."ProductID") as "size" from "Products" where "Products"."CategoryID"=${CatId}`)
        return rs
    }
}