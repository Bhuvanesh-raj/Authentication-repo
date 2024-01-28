const dotenv=require("dotenv").config();
const express=require("express");
const app=express();
const mongoose=require("mongoose");
const PORT=process.env.PORT || 3600;
const cors=require("cors");
const verifyJWT = require("./middleware/verifyJWT");
const verifyRoles = require("./middleware/verifyRoles");
const rolesList=require("./config/rolesList");

app.use(cors());



mongoose.connect(process.env.MONGO_URL).then(()=>console.log("db connected successfully")).catch(()=>console.log("err occured"));
app.use(express.json());
app.use("/register",require("./routes/register"));
app.use("/login",require("./routes/login"));

app.use(verifyJWT);  
const demo= (req,res)=>{
    console.log("the user has permissions for "+Object.values(req.role));
    res.send(`USER:${req.user} ${req.role}`);
    // res.send(req.body);
};
app.get("/testingtoken",(verifyRoles(rolesList.admin,rolesList.student)))

app.get("/",(req,res)=>{
    res.send(
        "hello there"
        )
}
)

app.listen(PORT,()=>{
    console.log(rolesList);
    console.log(`server started at Port ${PORT}`)
})




