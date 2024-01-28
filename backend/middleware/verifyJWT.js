const jwt=require("jsonwebtoken");
const dotenv=require("dotenv").config();

const verifyJWT=(req,res,next)=>{
    const authHeader=req.headers.authorization || req.headers.Authorization;
    // console.log(authHeader);
    if(!authHeader) res.sendStatus(401);
    else{
        const token=authHeader.split(" ")[1];
        jwt.verify(token,process.env.ACCESS_TOKEN,(err,decoded)=>{
            if(err) return res.sendStatus(403) //invalid token
            // console.log(decoded.userInfo.username);

            req.user=decoded.userInfo.username;
            req.role=decoded.userInfo.roles;
            // res.send(`${decoded.username} is authorized!!`);
            next();
        })
    }
}

module.exports=verifyJWT;