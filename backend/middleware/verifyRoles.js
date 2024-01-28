
const verifyRoles=(...allowedRoles)=>{
    return (req,res)=>{
        const AllowedRoles=[...allowedRoles];
        console.log(AllowedRoles);
        console.log("verifying roles");
        const userroles=req.role;
        const result=userroles.map((userrole)=>  AllowedRoles.includes(userrole)).find((val)=>val===true);
        if(!result) return res.sendStatus(401);
        res.send("The use has permission to access this site");
    }   
}

module.exports=verifyRoles;