const express=require("express")
const router=express.Router();
const Register=router.route("/");
const md5=require("md5");
const Users=require("../models/mongodatabase");


Register.post((req,res)=>{
    const {username,password,roles}=req.body;
    const obj=new Users({
        username:username,
        password:md5(password),
        roles:roles
    })
    obj.save();
    res.send("success!!");
})
.get((req,res)=>{
    res.json({
        name:"bhuvanesh raj"
    })
})



module.exports=router;