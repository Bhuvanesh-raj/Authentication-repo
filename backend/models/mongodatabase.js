const mongoose=require("mongoose");

const UserSchema=mongoose.Schema({
    username:String,
    password:String,
    roles:Array
})

const users=new mongoose.model("users",UserSchema);

module.exports=users;