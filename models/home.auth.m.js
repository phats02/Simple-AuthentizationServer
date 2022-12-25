const db=require('./db.js')
const bcrypt = require('bcrypt');
const saltRounds = 10;
module.exports={
    getall:async ()=>{
        const rs=await db.getAll("Users")
        return rs
    },
    createAccount:async (body)=>{ 
        const user=await db.getOne("Users","Username",body.Username)
        if (user) return -1;
        var pwHashed=await bcrypt.hash(body.Password, saltRounds)
        body.Password=pwHashed
        const maxID=await db.query(`select MAX("Users"."UserID") as "maxID" from "Users"`)
        body["UserID"]=(maxID[0]['maxID']) ? parseInt(maxID[0]['maxID'])+1:1
        const rs=await db.insert("Users",body)
        if (rs) return 1
    },
    checkSignIn:async (body)=>{
        const user=await db.getOne("Users","Username",body.Username)
        if (!user) return -1;
        return await bcrypt.compare(body.Password, user.Password)
    },
    getInformationAccount:async (username)=>{
        const rs=await db.getOne("Users","Username",username)
        return rs
    },
    checkUsername:async(username)=>{
        const rs=await db.getOne("Users","Username",username)
        return (rs ==null)
    }
}