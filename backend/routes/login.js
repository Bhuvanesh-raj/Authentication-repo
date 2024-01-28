const express=require("express");
const Router=express.Router();
const Users=require("../models/mongodatabase");
const md5=require("md5");
const Login=Router.route("/");
const jwt=require("jsonwebtoken");

Login.post(async (req,res)=>{
    const {username,password}=req.body;
    const hashedpassword=md5(password);
    try{
        const responce=await Users.find({username,password:hashedpassword});
        if(responce.length){
            const roles=Object.values(responce[0].roles);
            const accesstoken=jwt.sign({
                "userInfo":{
                    username:username,
                    roles:roles
                }
            }
            ,process.env.ACCESS_TOKEN,
            {
                expiresIn:'500s'
            }
            );
            const refreshtoken=jwt.sign({
                "username":username
            },
            process.env.REFRESH_TOKEN,
            {
                expiresIn:"1d"
            });
            res.cookie('jwt',refreshtoken,{httpOnly:true,maxAge:24*60*60*1000});
            res.json({accesstoken});
        }
        else{
            res.sendStatus(401);
        }
    }   
    catch(e){
        console.log("error occured while fetching data+: ")
        res.sendStatus(401);
    }
});

module.exports=Router;